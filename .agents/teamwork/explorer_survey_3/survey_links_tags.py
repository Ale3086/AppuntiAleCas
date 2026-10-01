import os
import re
from pathlib import Path
from collections import defaultdict, Counter

CONTENT_DIR = Path(r"c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas\content")

# 1. Map all directories and files
dirs = defaultdict(list)
all_md = []
for p in sorted(CONTENT_DIR.rglob("*.md")):
    rel = p.relative_to(CONTENT_DIR).as_posix()
    all_md.append((rel, p))
    parent = p.parent.relative_to(CONTENT_DIR).as_posix()
    dirs[parent].append(rel)

print(f"Total Markdown Files: {len(all_md)}")
print(f"Total Directories with MD files: {len(dirs)}")

# Print directory breakdown
print("\nDirectory Breakdown:")
for d, files in sorted(dirs.items()):
    print(f"  [{d}]: {len(files)} files")

# 2. Extract actual headings from each file for anchor resolution
headings_by_file = defaultdict(set)
HEADING_RE = re.compile(r'^(#{1,6})\s+(.+)$', re.MULTILINE)

# Also check for code blocks
CODE_BLOCK_RE = re.compile(r'```.*?```', re.DOTALL)
INLINE_CODE_RE = re.compile(r'`[^`\n]+`')

# Wikilink pattern: !? [[ target (#heading)? (|alias)? ]]
WIKILINK_RE = re.compile(r'(!)?\[\[([^\]|#\n]+)(?:#([^\]|\n]+))?(?:\|([^\]\n]+))?\]\]')

all_links_found = []
link_targets_raw = Counter()

# Build index of stems and relative paths
stem_to_files = defaultdict(list)
rel_to_file = {}
name_to_files = defaultdict(list)

for rel, p in all_md:
    rel_to_file[rel] = p
    stem_to_files[p.stem.lower()].append(rel)
    name_to_files[p.name.lower()].append(rel)

# Also index non-md assets
for p in CONTENT_DIR.rglob("*"):
    if p.is_file() and p.suffix != ".md":
        rel = p.relative_to(CONTENT_DIR).as_posix()
        rel_to_file[rel] = p
        stem_to_files[p.stem.lower()].append(rel)
        name_to_files[p.name.lower()].append(rel)

for rel, p in all_md:
    try:
        txt = p.read_text(encoding="utf-8")
    except Exception:
        txt = p.read_text(encoding="latin-1")
    
    # Extract headings
    for match in HEADING_RE.finditer(txt):
        h_text = match.group(2).strip()
        headings_by_file[rel].add(h_text)
        # also slugified/lowercased
        headings_by_file[rel].add(h_text.lower())
    
    # Strip code blocks before looking for wikilinks
    clean_txt = CODE_BLOCK_RE.sub('', txt)
    clean_txt = INLINE_CODE_RE.sub('', clean_txt)
    
    for match in WIKILINK_RE.finditer(clean_txt):
        is_embed = bool(match.group(1))
        target = match.group(2).strip()
        heading = match.group(3).strip() if match.group(3) else None
        alias = match.group(4).strip() if match.group(4) else None
        
        link_targets_raw[target] += 1
        all_links_found.append({
            "source": rel,
            "is_embed": is_embed,
            "target": target,
            "heading": heading,
            "alias": alias,
            "raw": match.group(0)
        })

print(f"\nTotal Wikilinks outside code blocks: {len(all_links_found)}")

# Check link resolution
broken = []
resolved = []
anchor_mismatch = []

for lk in all_links_found:
    src = lk["source"]
    tgt = lk["target"]
    h = lk["heading"]
    
    # Resolution rules:
    # 1. Target is empty: self-link to heading [[#heading]]
    if not tgt and h:
        if h in headings_by_file[src] or h.lower() in headings_by_file[src]:
            resolved.append((src, lk, src))
        else:
            anchor_mismatch.append((src, lk, src))
        continue
    
    # 2. Exact match in rel_to_file
    target_rel = None
    if tgt in rel_to_file:
        target_rel = tgt
    elif (tgt + ".md") in rel_to_file:
        target_rel = tgt + ".md"
    else:
        # 3. Relative to source folder
        src_parent = Path(src).parent.as_posix()
        if src_parent != ".":
            cand = f"{src_parent}/{tgt}"
            if cand in rel_to_file:
                target_rel = cand
            elif (cand + ".md") in rel_to_file:
                target_rel = cand + ".md"
        
        # 4. Shortest stem/name match
        if not target_rel:
            cands = stem_to_files.get(tgt.lower(), []) or name_to_files.get(tgt.lower(), [])
            if cands:
                # pick shortest
                target_rel = sorted(cands, key=lambda c: len(Path(c).parts))[0]
    
    if target_rel:
        resolved.append((src, lk, target_rel))
        if h:
            if h not in headings_by_file[target_rel] and h.lower() not in headings_by_file[target_rel]:
                anchor_mismatch.append((src, lk, target_rel))
    else:
        broken.append((src, lk))

print(f"Resolved links: {len(resolved)}")
print(f"Broken links: {len(broken)}")
print(f"Anchor mismatches: {len(anchor_mismatch)}")

if broken:
    print("\n--- BROKEN LINKS DETAIL ---")
    for src, lk in broken:
        print(f"  In '{src}': {lk['raw']}")

if anchor_mismatch:
    print("\n--- ANCHOR MISMATCHES ---")
    for src, lk, tgt in anchor_mismatch:
        print(f"  In '{src}' -> target '{tgt}': heading #{lk['heading']} not found in target")
