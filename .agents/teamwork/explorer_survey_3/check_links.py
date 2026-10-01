#!/usr/bin/env python3
"""
check_links.py - Zero broken wikilinks verifier for Quartz / Obsidian vault.
Verifies all [[wikilinks]] (notes, aliases, anchors, media embeds).
Excludes code blocks (``` and `) from wikilink parsing.
"""

import sys
import os
import re
import argparse
from pathlib import Path
from collections import defaultdict

# Regex for code fences and inline code
CODE_BLOCK_RE = re.compile(r'```.*?```', re.DOTALL)
INLINE_CODE_RE = re.compile(r'`[^`\n]+`')

# Regex for Obsidian/Quartz wikilinks:
# !?[[ target (#heading)? (|alias)? ]]
WIKILINK_RE = re.compile(r'(!)?\[\[([^\]|#\n]*)(?:#([^\]|\n]*))?(?:\|([^\]\n]*))?\]\]')
HEADING_RE = re.compile(r'^(#{1,6})\s+(.+)$', re.MULTILINE)

def scan_vault(content_dir: Path):
    all_files = list(content_dir.rglob("*"))
    md_files = [f for f in all_files if f.is_file() and f.suffix.lower() == ".md"]
    asset_files = [f for f in all_files if f.is_file() and f.suffix.lower() != ".md"]
    
    # Resolution indices
    rel_to_file = {}
    stem_to_files = defaultdict(list)
    name_to_files = defaultdict(list)
    
    for f in all_files:
        if f.is_file():
            rel = f.relative_to(content_dir).as_posix()
            rel_to_file[rel] = f
            stem_to_files[f.stem.lower()].append(rel)
            name_to_files[f.name.lower()].append(rel)
            
    # Index headings for anchor verification
    file_headings = defaultdict(set)
    file_contents = {}
    for md in md_files:
        rel = md.relative_to(content_dir).as_posix()
        try:
            txt = md.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            txt = md.read_text(encoding="latin-1")
            
        file_contents[rel] = txt
        for m in HEADING_RE.finditer(txt):
            h = m.group(2).strip()
            file_headings[rel].add(h)
            file_headings[rel].add(h.lower())
            
    # Link verification
    total_links = 0
    embed_count = 0
    internal_anchor_count = 0
    note_link_count = 0
    
    broken_links = []
    
    for rel, txt in file_contents.items():
        # Strip code blocks to avoid false positives (e.g. JS arrays [[1,[2]]])
        clean_txt = CODE_BLOCK_RE.sub('', txt)
        clean_txt = INLINE_CODE_RE.sub('', clean_txt)
        
        for m in WIKILINK_RE.finditer(clean_txt):
            raw = m.group(0)
            is_embed = bool(m.group(1))
            target = m.group(2).strip() if m.group(2) else ""
            heading = m.group(3).strip() if m.group(3) else None
            alias = m.group(4).strip() if m.group(4) else None
            
            total_links += 1
            if is_embed:
                embed_count += 1
                
            # Case 1: Pure internal anchor [[#heading]]
            if not target and heading:
                internal_anchor_count += 1
                if heading not in file_headings[rel] and heading.lower() not in file_headings[rel]:
                    broken_links.append({
                        "source": rel,
                        "raw": raw,
                        "reason": f"Heading #{heading} not found in current note"
                    })
                continue
                
            # Case 2: Target link [[target]] or [[target#heading]] or ![[asset]]
            note_link_count += 1
            target_rel = None
            
            # Rule A: Exact relative path from content root
            if target in rel_to_file:
                target_rel = target
            elif (target + ".md") in rel_to_file:
                target_rel = target + ".md"
            else:
                # Rule B: Relative to current note's folder
                parent = Path(rel).parent.as_posix()
                if parent != ".":
                    cand = f"{parent}/{target}"
                    if cand in rel_to_file:
                        target_rel = cand
                    elif (cand + ".md") in rel_to_file:
                        target_rel = cand + ".md"
                        
                # Rule C: Shortest match by stem or filename across vault
                if not target_rel:
                    cands = stem_to_files.get(target.lower(), []) or name_to_files.get(target.lower(), [])
                    if cands:
                        target_rel = sorted(cands, key=lambda c: len(Path(c).parts))[0]
                        
            if not target_rel:
                broken_links.append({
                    "source": rel,
                    "raw": raw,
                    "reason": f"Target '{target}' not found in vault"
                })
            else:
                # If target found and heading specified, verify heading exists in target note
                if heading and target_rel.endswith(".md"):
                    if heading not in file_headings[target_rel] and heading.lower() not in file_headings[target_rel]:
                        broken_links.append({
                            "source": rel,
                            "raw": raw,
                            "reason": f"Heading #{heading} not found in target '{target_rel}'"
                        })

    return {
        "md_files_count": len(md_files),
        "asset_files_count": len(asset_files),
        "total_links": total_links,
        "embed_count": embed_count,
        "internal_anchor_count": internal_anchor_count,
        "note_link_count": note_link_count,
        "broken_links": broken_links
    }

def main():
    parser = argparse.ArgumentParser(description="Verify wikilinks in Obsidian/Quartz vault.")
    parser.add_argument("--content-dir", default="content", help="Path to content directory")
    args = parser.parse_args()
    
    content_path = Path(args.content_dir)
    if not content_path.exists():
        print(f"Error: Content directory '{content_path}' does not exist.", file=sys.stderr)
        sys.exit(2)
        
    res = scan_vault(content_path)
    
    print("================ WIKILINKS VERIFICATION ================")
    print(f"Vault Directory: {content_path.resolve()}")
    print(f"Markdown Files:  {res['md_files_count']}")
    print(f"Asset Files:     {res['asset_files_count']}")
    print(f"Total Wikilinks: {res['total_links']}")
    print(f"  - Note/Asset Links:     {res['note_link_count']}")
    print(f"  - Media Embeds (![[]]): {res['embed_count']}")
    print(f"  - Internal Anchors:     {res['internal_anchor_count']}")
    print(f"Broken Links:    {len(res['broken_links'])}")
    print("=========================================================")
    
    if res['broken_links']:
        print("\nBROKEN LINKS DETECTED:")
        for b in res['broken_links']:
            print(f"  [FAIL] {b['source']}: {b['raw']} -> {b['reason']}")
        sys.exit(1)
    else:
        print("\n[PASS] Zero broken wikilinks found! All links resolve successfully.")
        sys.exit(0)

if __name__ == "__main__":
    main()
