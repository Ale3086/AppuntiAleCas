import os
import re
import sys
import json
from pathlib import Path
from collections import defaultdict, Counter

sys.stdout.reconfigure(encoding='utf-8')

CONTENT_DIR = Path(r"c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas\content")

# 1. Collect all files in content
all_files = list(CONTENT_DIR.rglob("*"))
md_files = [f for f in all_files if f.is_file() and f.suffix == ".md"]
asset_files = [f for f in all_files if f.is_file() and f.suffix != ".md"]

# Maps for resolution
rel_to_file = {}
stem_to_files = defaultdict(list)
name_to_files = defaultdict(list)

for f in all_files:
    if f.is_file():
        rel = f.relative_to(CONTENT_DIR).as_posix()
        rel_to_file[rel] = f
        stem_to_files[f.stem.lower()].append(rel)
        name_to_files[f.name.lower()].append(rel)

# 2. Check frontmatters and headings
def parse_frontmatter(text):
    if not text.startswith("---"):
        return None, text
    parts = text.split("---", 2)
    if len(parts) < 3:
        return None, text
    fm_raw = parts[1]
    body = parts[2]
    
    fm = {}
    lines = fm_raw.splitlines()
    i = 0
    while i < len(lines):
        line = lines[i]
        stripped = line.strip()
        if not stripped or stripped.startswith("#"):
            i += 1
            continue
        if ":" in line:
            k, v = line.split(":", 1)
            k = k.strip()
            v = v.strip()
            if v == "":
                # list items below
                items = []
                i += 1
                while i < len(lines) and (lines[i].startswith("  -") or lines[i].startswith("\t-") or lines[i].strip().startswith("- ")):
                    item = lines[i].strip().lstrip("-").strip().strip("\"'")
                    items.append(item)
                    i += 1
                fm[k] = items
                continue
            elif v.startswith("[") and v.endswith("]"):
                inner = v[1:-1].strip()
                if not inner:
                    fm[k] = []
                else:
                    fm[k] = [x.strip().strip("\"'") for x in inner.split(",")]
            elif v.lower() == "true":
                fm[k] = True
            elif v.lower() == "false":
                fm[k] = False
            else:
                fm[k] = v.strip("\"'")
        i += 1
    return fm, body

# Regular expressions
CODE_BLOCK_RE = re.compile(r'```.*?```', re.DOTALL)
INLINE_CODE_RE = re.compile(r'`[^`\n]+`')
# Obsidian wikilink syntax:
# !?[[ target (#heading)? (|alias)? ]]
# Note: target might contain spaces, accents, slashes, etc.
WIKILINK_RE = re.compile(r'(!)?\[\[([^\]|#\n]*)(?:#([^\]|\n]*))?(?:\|([^\]\n]*))?\]\]')
# Inline tag syntax: #tag or #materia/argomento (exclude pure numbers, hex colors, headers)
INLINE_TAG_RE = re.compile(r'(?<!\S)#([a-zA-Z0-9_\-\/]+)(?!\S)')
HEADING_RE = re.compile(r'^(#{1,6})\s+(.+)$', re.MULTILINE)

audit = {
    "total_md_files": len(md_files),
    "total_assets": len(asset_files),
    "files_by_dir": defaultdict(list),
    "frontmatter_stats": {
        "files_with_fm": 0,
        "files_without_fm": 0,
        "files_with_tags": 0,
        "files_without_tags": 0,
        "files_with_draft_true": 0,
        "draft_candidates": [] # index/MOC files, TEMP directory, etc.
    },
    "links": {
        "total_wikilinks": 0,
        "embed_links": 0,       # ![[...]]
        "internal_anchors": 0,  # [[#heading]]
        "note_links": 0,        # [[target]] or [[target#heading]]
        "valid_links": [],
        "broken_links": [],
        "broken_embeds": []
    },
    "tags": {
        "fm_tags": Counter(),
        "inline_tags": Counter(),
        "notes_with_inline_only": []
    },
    "graph": {
        "in_degree": defaultdict(int),
        "out_degree": defaultdict(int),
        "isolated": [],
        "connected_pairs": []
    }
}

file_headings = {}
file_data = {}

for f in md_files:
    rel = f.relative_to(CONTENT_DIR).as_posix()
    parent = f.parent.relative_to(CONTENT_DIR).as_posix()
    audit["files_by_dir"][parent].append(rel)
    
    txt = f.read_text(encoding="utf-8", errors="ignore")
    fm, body = parse_frontmatter(txt)
    
    # Check draft candidates
    is_index = f.name.lower() == "index.md" or "moc" in f.name.lower()
    in_temp = "TEMP/" in rel or rel.startswith("TEMP")
    if is_index or in_temp:
        audit["frontmatter_stats"]["draft_candidates"].append(rel)
        
    has_fm = fm is not None
    if has_fm:
        audit["frontmatter_stats"]["files_with_fm"] += 1
        if fm.get("draft") is True:
            audit["frontmatter_stats"]["files_with_draft_true"] += 1
        tags = fm.get("tags", [])
        if isinstance(tags, str):
            tags = [tags]
        if tags:
            audit["frontmatter_stats"]["files_with_tags"] += 1
            for t in tags:
                audit["tags"]["fm_tags"][t] += 1
        else:
            audit["frontmatter_stats"]["files_without_tags"] += 1
    else:
        audit["frontmatter_stats"]["files_without_fm"] += 1
        audit["frontmatter_stats"]["files_without_tags"] += 1
        tags = []

    # Headings
    headings = set()
    for m in HEADING_RE.finditer(txt):
        h = m.group(2).strip()
        headings.add(h)
        headings.add(h.lower())
    file_headings[rel] = headings

    # Clean body for tags and links
    clean_txt = CODE_BLOCK_RE.sub('', txt)
    clean_txt = INLINE_CODE_RE.sub('', clean_txt)
    
    # Inline tags
    inline_tags = []
    for m in INLINE_TAG_RE.finditer(clean_txt):
        tag_val = m.group(1)
        if not tag_val.isdigit() and not re.match(r'^[0-9a-fA-F]{3,6}$', tag_val):
            audit["tags"]["inline_tags"][tag_val] += 1
            inline_tags.append(tag_val)
            
    if not tags and inline_tags:
        audit["tags"]["notes_with_inline_only"].append((rel, inline_tags))

    file_data[rel] = {
        "fm": fm,
        "clean_txt": clean_txt,
        "tags": tags,
        "inline_tags": inline_tags
    }

# Now analyze all links
for rel, data in file_data.items():
    clean_txt = data["clean_txt"]
    for m in WIKILINK_RE.finditer(clean_txt):
        raw = m.group(0)
        is_embed = bool(m.group(1))
        target = m.group(2).strip() if m.group(2) else ""
        heading = m.group(3).strip() if m.group(3) else None
        alias = m.group(4).strip() if m.group(4) else None
        
        audit["links"]["total_wikilinks"] += 1
        if is_embed:
            audit["links"]["embed_links"] += 1
        
        # 1. Pure internal anchor [[#heading]]
        if not target and heading:
            audit["links"]["internal_anchors"] += 1
            if heading in file_headings[rel] or heading.lower() in file_headings[rel]:
                audit["links"]["valid_links"].append({"src": rel, "raw": raw, "type": "self_heading"})
            else:
                audit["links"]["broken_links"].append({
                    "src": rel,
                    "raw": raw,
                    "target": target,
                    "heading": heading,
                    "reason": f"Heading #{heading} not found in {rel}"
                })
            continue

        audit["links"]["note_links"] += 1
        # Resolve target
        target_rel = None
        # Rule A: direct exact relpath match
        if target in rel_to_file:
            target_rel = target
        elif (target + ".md") in rel_to_file:
            target_rel = target + ".md"
        else:
            # Rule B: relative to current note folder
            parent = Path(rel).parent.as_posix()
            if parent != ".":
                cand = f"{parent}/{target}"
                if cand in rel_to_file:
                    target_rel = cand
                elif (cand + ".md") in rel_to_file:
                    target_rel = cand + ".md"
            
            # Rule C: shortest match (by filename or stem)
            if not target_rel:
                cands = stem_to_files.get(target.lower(), []) or name_to_files.get(target.lower(), [])
                if cands:
                    target_rel = sorted(cands, key=lambda c: len(Path(c).parts))[0]
        
        if target_rel:
            audit["links"]["valid_links"].append({"src": rel, "raw": raw, "dest": target_rel, "type": "embed" if is_embed else "link"})
            if not is_embed:
                audit["graph"]["out_degree"][rel] += 1
                audit["graph"]["in_degree"][target_rel] += 1
                audit["graph"]["connected_pairs"].append((rel, target_rel))
        else:
            item = {"src": rel, "raw": raw, "target": target, "heading": heading, "reason": "Target not found"}
            if is_embed:
                audit["links"]["broken_embeds"].append(item)
            else:
                audit["links"]["broken_links"].append(item)

# Compute isolated nodes
all_md_rels = set(f.relative_to(CONTENT_DIR).as_posix() for f in md_files)
for r in all_md_rels:
    if audit["graph"]["in_degree"][r] == 0 and audit["graph"]["out_degree"][r] == 0:
        audit["graph"]["isolated"].append(r)

print(f"Total Markdown Files: {audit['total_md_files']}")
print(f"Total Assets: {audit['total_assets']}")
print(f"Files with Frontmatter: {audit['frontmatter_stats']['files_with_fm']}")
print(f"Files without Frontmatter: {audit['frontmatter_stats']['files_without_fm']}")
print(f"Files with Tags in Frontmatter: {audit['frontmatter_stats']['files_with_tags']}")
print(f"Files without Tags in Frontmatter: {audit['frontmatter_stats']['files_without_tags']}")
print(f"Files with draft: true: {audit['frontmatter_stats']['files_with_draft_true']}")
print(f"Draft Candidates (Index/MOC + TEMP): {len(audit['frontmatter_stats']['draft_candidates'])}")

print(f"\nWikilinks:")
print(f"  Total: {audit['links']['total_wikilinks']}")
print(f"  Embeds (![[...]]): {audit['links']['embed_links']}")
print(f"  Internal Anchors ([[#...]]): {audit['links']['internal_anchors']}")
print(f"  Note Links: {audit['links']['note_links']}")
print(f"  Valid Links: {len(audit['links']['valid_links'])}")
print(f"  Broken Links: {len(audit['links']['broken_links'])}")
print(f"  Broken Embeds: {len(audit['links']['broken_embeds'])}")

print(f"\nGraph Connectivity:")
print(f"  Isolated Notes: {len(audit['graph']['isolated'])} ({len(audit['graph']['isolated'])/len(all_md_rels)*100:.1f}%)")
print(f"  Connected Notes: {len(all_md_rels) - len(audit['graph']['isolated'])}")

print("\nBroken links detail:")
for b in audit['links']['broken_links']:
    print(f"  {b['src']} -> {b['raw']} ({b['reason']})")

print("\nBroken embeds detail:")
for b in audit['links']['broken_embeds']:
    print(f"  {b['src']} -> {b['raw']} ({b['reason']})")

# Write out full results to JSON
out_path = Path(r"c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas\.agents\teamwork\explorer_survey_3\audit_results.json")
with open(out_path, "w", encoding="utf-8") as f:
    json.dump({
        "total_md": audit['total_md_files'],
        "total_assets": audit['total_assets'],
        "fm_stats": audit['frontmatter_stats'],
        "links_stats": {
            "total": audit['links']['total_wikilinks'],
            "embeds": audit['links']['embed_links'],
            "internal_anchors": audit['links']['internal_anchors'],
            "valid": len(audit['links']['valid_links']),
            "broken_links": audit['links']['broken_links'],
            "broken_embeds": audit['links']['broken_embeds']
        },
        "tags": {
            "fm_tags": dict(audit['tags']['fm_tags']),
            "inline_tags": dict(audit['tags']['inline_tags']),
            "notes_with_inline_only": audit['tags']['notes_with_inline_only']
        },
        "graph": {
            "isolated_count": len(audit['graph']['isolated']),
            "isolated_files": audit['graph']['isolated'],
            "connected_count": len(all_md_rels) - len(audit['graph']['isolated'])
        },
        "draft_candidates": audit['frontmatter_stats']['draft_candidates']
    }, f, indent=2)
print(f"\nSaved full audit to {out_path}")
