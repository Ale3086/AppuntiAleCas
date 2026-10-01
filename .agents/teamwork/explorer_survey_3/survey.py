import os
import re
import json
from pathlib import Path
from collections import defaultdict, Counter

CONTENT_DIR = Path(r"c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas\content")

def parse_frontmatter(text):
    """Simple YAML frontmatter parser for basic keys (tags, draft, title, aliases, etc.)"""
    if not text.startswith("---"):
        return None, text
    parts = text.split("---", 2)
    if len(parts) < 3:
        return None, text
    fm_text = parts[1]
    body = parts[2]
    
    fm = {}
    lines = fm_text.splitlines()
    i = 0
    while i < len(lines):
        line = lines[i]
        stripped = line.strip()
        if not stripped or stripped.startswith("#"):
            i += 1
            continue
        if ":" in line:
            key, val = line.split(":", 1)
            key = key.strip()
            val = val.strip()
            
            # Check for list
            if val == "":
                # multiline list
                items = []
                i += 1
                while i < len(lines) and (lines[i].startswith("  -") or lines[i].startswith("\t-") or lines[i].strip().startswith("- ")):
                    item = lines[i].strip().lstrip("-").strip().strip("\"'")
                    items.append(item)
                    i += 1
                fm[key] = items
                continue
            elif val.startswith("[") and val.endswith("]"):
                # inline list [a, b, c]
                inner = val[1:-1].strip()
                if not inner:
                    fm[key] = []
                else:
                    items = [x.strip().strip("\"'") for x in inner.split(",")]
                    fm[key] = items
            elif val.lower() == "true":
                fm[key] = True
            elif val.lower() == "false":
                fm[key] = False
            else:
                fm[key] = val.strip("\"'")
        i += 1
    return fm, body

# Collect all files in content
all_files = list(CONTENT_DIR.rglob("*"))
md_files = [f for f in all_files if f.is_file() and f.suffix == ".md"]
asset_files = [f for f in all_files if f.is_file() and f.suffix != ".md"]

print(f"Total markdown files in content: {len(md_files)}")
print(f"Total asset files in content: {len(asset_files)}")

# Index of available targets
# In Quartz with shortest resolution:
# Target can match filename without .md, filename with .md, relative path, etc.
# Let's map target names to possible candidate paths
file_by_name = defaultdict(list)
file_by_stem = defaultdict(list)
file_by_relpath = {}

for f in all_files:
    if f.is_file():
        rel = f.relative_to(CONTENT_DIR).as_posix()
        file_by_relpath[rel] = f
        file_by_name[f.name.lower()].append(f)
        file_by_stem[f.stem.lower()].append(f)

# Extract wikilinks regex
# Matches [[...]] and ![[...]]
WIKILINK_RE = re.compile(r'(!)?\[\[([^\]|#]+)(?:#([^\]|]+))?(?:\|([^\]]+))?\]\]')
# Inline tags regex: #tag (excluding inside code blocks or url anchors)
INLINE_TAG_RE = re.compile(r'(?<!\S)#([a-zA-Z0-9_\-\/]+)(?!\S)')

file_stats = {}
all_links = []
broken_links = []
valid_links = []
all_fm_tags = Counter()
all_inline_tags = Counter()
files_without_fm = []
files_without_tags = []
files_with_draft_true = []
files_with_draft_false = []

graph_out = defaultdict(set)
graph_in = defaultdict(set)

for md_path in md_files:
    rel_path = md_path.relative_to(CONTENT_DIR).as_posix()
    try:
        content = md_path.read_text(encoding="utf-8")
    except Exception as e:
        content = md_path.read_text(encoding="latin-1")
        
    fm, body = parse_frontmatter(content)
    has_fm = fm is not None
    is_draft = fm.get("draft", False) if fm else False
    if is_draft:
        files_with_draft_true.append(rel_path)
    else:
        files_with_draft_false.append(rel_path)
        
    fm_tags = []
    if fm and "tags" in fm:
        raw_tags = fm["tags"]
        if isinstance(raw_tags, list):
            fm_tags = raw_tags
        elif isinstance(raw_tags, str):
            fm_tags = [raw_tags]
            
    for t in fm_tags:
        all_fm_tags[t] += 1
        
    if not has_fm:
        files_without_fm.append(rel_path)
    if not fm_tags:
        files_without_tags.append(rel_path)

    # Clean body: remove code blocks before finding inline tags
    body_no_code = re.sub(r'```.*?```', '', body, flags=re.DOTALL)
    body_no_code = re.sub(r'`[^`]+`', '', body_no_code)
    
    inline_tags = INLINE_TAG_RE.findall(body_no_code)
    for it in inline_tags:
        # Ignore markdown headers if any slipped past (e.g. # Header with no space was caught if (?<!\S) matched)
        # Actually (?<!\S)#([a-zA-Z0-9_\-\/]+) requires a non-space char directly after #
        # In Italian / English, sometimes #1 or hex color #fff appears
        if not re.match(r'^[0-9a-fA-F]{3,6}$', it) and not it.isdigit():
            all_inline_tags[it] += 1

    # Find wikilinks in content (or body)
    wikilinks = WIKILINK_RE.findall(content)
    # wikilink tuple: (is_embed, target, heading, alias)
    file_links = []
    for is_embed, target, heading, alias in wikilinks:
        target_clean = target.strip()
        link_info = {
            "source": rel_path,
            "target_raw": target_clean,
            "is_embed": bool(is_embed),
            "heading": heading.strip() if heading else None,
            "alias": alias.strip() if alias else None
        }
        file_links.append(link_info)
        all_links.append(link_info)
        
        # Check resolution
        # 1. exact relpath match (with or without .md)
        target_resolved = None
        if target_clean in file_by_relpath:
            target_resolved = file_by_relpath[target_clean]
        elif (target_clean + ".md") in file_by_relpath:
            target_resolved = file_by_relpath[target_clean + ".md"]
        else:
            # 2. shortest match by stem or name
            cand_stem = file_by_stem.get(target_clean.lower(), [])
            cand_name = file_by_name.get(target_clean.lower(), [])
            candidates = cand_stem or cand_name
            if candidates:
                # shortest relative path
                candidates_sorted = sorted(candidates, key=lambda c: len(c.relative_to(CONTENT_DIR).parts))
                target_resolved = candidates_sorted[0]
                
        if target_resolved:
            valid_links.append((rel_path, target_clean, target_resolved.relative_to(CONTENT_DIR).as_posix()))
            dest_rel = target_resolved.relative_to(CONTENT_DIR).as_posix()
            graph_out[rel_path].add(dest_rel)
            graph_in[dest_rel].add(rel_path)
        else:
            broken_links.append((rel_path, target_clean, heading, alias))
            
    file_stats[rel_path] = {
        "has_fm": has_fm,
        "is_draft": is_draft,
        "fm_tags": fm_tags,
        "inline_tags": inline_tags,
        "wikilinks_count": len(wikilinks)
    }

print("\n--- SUMMARY ---")
print(f"Files without frontmatter: {len(files_without_fm)}")
print(f"Files without frontmatter tags: {len(files_without_tags)}")
print(f"Files with draft=true: {len(files_with_draft_true)}")
print(f"Total wikilinks: {len(all_links)}")
print(f"Valid wikilinks: {len(valid_links)}")
print(f"Broken wikilinks: {len(broken_links)}")

print("\n--- BROKEN LINKS ---")
for src, tgt, h, a in broken_links:
    print(f"Source: {src} -> Target: [[{tgt}{('#'+h) if h else ''}{('|'+a) if a else ''}]]")

print("\n--- FRONTMATTER TAGS (Total distinct: {}) ---".format(len(all_fm_tags)))
for tag, count in all_fm_tags.most_common():
    print(f"  {tag}: {count}")

print("\n--- INLINE TAGS (Top 25) ---")
for tag, count in all_inline_tags.most_common(25):
    print(f"  #{tag}: {count}")

# Check connectivity
all_nodes = set(f.relative_to(CONTENT_DIR).as_posix() for f in md_files)
isolated_nodes = [node for node in all_nodes if len(graph_out[node]) == 0 and len(graph_in[node]) == 0]
leaf_nodes = [node for node in all_nodes if len(graph_out[node]) == 0 and len(graph_in[node]) > 0]
sink_nodes = [node for node in all_nodes if len(graph_out[node]) > 0 and len(graph_in[node]) == 0]

print(f"\n--- GRAPH VIEW CONNECTIVITY ---")
print(f"Total markdown nodes: {len(all_nodes)}")
print(f"Isolated nodes (0 in, 0 out): {len(isolated_nodes)} ({len(isolated_nodes)/len(all_nodes)*100:.1f}%)")
print(f"Nodes with outgoing links: {len([n for n in all_nodes if len(graph_out[n]) > 0])}")
print(f"Nodes with incoming links: {len([n for n in all_nodes if len(graph_in[n]) > 0])}")

with open(r"c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas\.agents\teamwork\explorer_survey_3\survey_data.json", "w", encoding="utf-8") as f:
    json.dump({
        "files_without_fm": files_without_fm,
        "files_without_tags": files_without_tags,
        "files_with_draft_true": files_with_draft_true,
        "broken_links": broken_links,
        "fm_tags": dict(all_fm_tags),
        "inline_tags": dict(all_inline_tags),
        "isolated_nodes": isolated_nodes,
        "file_stats": file_stats
    }, f, indent=2)
