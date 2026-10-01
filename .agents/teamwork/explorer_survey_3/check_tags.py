#!/usr/bin/env python3
"""
check_tags.py - Verifies YAML frontmatter and hierarchical tags for Quartz / Obsidian vault.
Acceptance Criterion: Confirms that 100% of non-draft markdown files contain a valid `tags:` YAML array.
Also validates hierarchical tag structure (e.g. materia/argomento, tipologia/concetto).
"""

import sys
import os
import re
import argparse
from pathlib import Path

def parse_frontmatter(text: str):
    """
    Parses YAML frontmatter without external dependencies.
    Returns (frontmatter_dict, body_text) or (None, text).
    """
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
                # list items on following lines
                items = []
                i += 1
                while i < len(lines):
                    next_line = lines[i]
                    next_strip = next_line.strip()
                    if next_strip.startswith("- "):
                        item = next_strip[2:].strip().strip("\"'")
                        items.append(item)
                        i += 1
                    elif not next_strip or next_strip.startswith("#"):
                        i += 1
                    else:
                        break
                fm[k] = items
                continue
            elif v.startswith("[") and v.endswith("]"):
                inner = v[1:-1].strip()
                if not inner:
                    fm[k] = []
                else:
                    items = [x.strip().strip("\"'") for x in inner.split(",") if x.strip()]
                    fm[k] = items
            elif v.lower() == "true":
                fm[k] = True
            elif v.lower() == "false":
                fm[k] = False
            else:
                fm[k] = v.strip("\"'")
        i += 1
    return fm, body

def check_tags(content_dir: Path, enforce_hierarchy: bool = True):
    all_md = sorted(content_dir.rglob("*.md"))
    
    total_files = len(all_md)
    draft_files = []
    non_draft_valid = []
    non_draft_invalid = []
    
    distinct_tags = set()
    
    for md_path in all_md:
        rel = md_path.relative_to(content_dir).as_posix()
        try:
            txt = md_path.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            txt = md_path.read_text(encoding="latin-1")
            
        fm, body = parse_frontmatter(txt)
        
        # Check if draft
        is_draft = False
        if fm and fm.get("draft") is True:
            is_draft = True
        # Also check R3 requirements: service pages (index.md) and TEMP files
        # Note: if a file is in TEMP or is index.md, R3 requires draft: true.
        
        if is_draft:
            draft_files.append(rel)
            continue
            
        # Non-draft note validation
        issues = []
        if fm is None:
            issues.append("Missing YAML frontmatter (no '---' block found)")
        else:
            if "tags" not in fm:
                issues.append("Missing 'tags' key in YAML frontmatter")
            else:
                tags = fm["tags"]
                if not isinstance(tags, list):
                    issues.append(f"'tags' must be a list/array, got {type(tags).__name__}")
                elif len(tags) == 0:
                    issues.append("'tags' array is empty")
                else:
                    for t in tags:
                        distinct_tags.add(t)
                        if enforce_hierarchy and "/" not in t:
                            issues.append(f"Tag '{t}' is not hierarchical (missing '/')")
                            
        if issues:
            non_draft_invalid.append((rel, issues))
        else:
            non_draft_valid.append(rel)
            
    return {
        "total_files": total_files,
        "draft_count": len(draft_files),
        "draft_files": draft_files,
        "valid_count": len(non_draft_valid),
        "invalid_count": len(non_draft_invalid),
        "invalid_files": non_draft_invalid,
        "distinct_tags": sorted(distinct_tags)
    }

def main():
    parser = argparse.ArgumentParser(description="Verify YAML tags on non-draft markdown files.")
    parser.add_argument("--content-dir", default="content", help="Path to content directory")
    parser.add_argument("--no-hierarchy", action="store_true", help="Do not require '/' in tags")
    args = parser.parse_args()
    
    content_path = Path(args.content_dir)
    if not content_path.exists():
        print(f"Error: Content directory '{content_path}' does not exist.", file=sys.stderr)
        sys.exit(2)
        
    res = check_tags(content_path, enforce_hierarchy=not args.no_hierarchy)
    
    print("================ YAML TAGS VERIFICATION ================")
    print(f"Content Directory: {content_path.resolve()}")
    print(f"Total Markdown Files: {res['total_files']}")
    print(f"Draft Files (skipped): {res['draft_count']}")
    print(f"Non-Draft Files Checked: {res['valid_count'] + res['invalid_count']}")
    print(f"  - Valid Tags:   {res['valid_count']}")
    print(f"  - Invalid/Missing Tags: {res['invalid_count']}")
    print(f"Distinct Tags in Vault: {len(res['distinct_tags'])}")
    print("=========================================================")
    
    if res['invalid_count'] > 0:
        print(f"\n[FAIL] {res['invalid_count']} non-draft file(s) failed tag verification:")
        for rel, issues in res['invalid_files']:
            print(f"  - {rel}: {'; '.join(issues)}")
        sys.exit(1)
    else:
        print("\n[PASS] 100% of non-draft markdown files contain valid hierarchical tags!")
        sys.exit(0)

if __name__ == "__main__":
    main()
