#!/usr/bin/env python3
"""
check_tags.py - Verifies YAML frontmatter and hierarchical tags for Quartz / Obsidian vault.

Acceptance Criteria:
- Identifies service/draft pages (`draft: true`, inside `TEMP/`, or `index.md`).
- Confirms 100% of non-draft markdown files contain a valid `tags:` YAML array.
- Asserts presence of at least 2 hierarchical tags matching `materia/...` and `tipologia/...`.
- Exits with 0 if 100% compliant, exits with 1 if any non-draft note lacks valid tags.
"""

import sys
import os
import re
import argparse
from pathlib import Path

MATERIA_PREFIXES = (
    "materia/",
    "informatica/",
    "inglese/",
    "matematica/",
    "sistemi-e-reti/",
    "sistemi e reti/",
    "tipsit/",
)

TIPOLOGIA_PREFIXES = (
    "tipologia/",
)

def parse_frontmatter(text: str):
    """
    Parses YAML frontmatter without external dependencies.
    Returns (frontmatter_dict, body_text) or (None, text).
    """
    text = text.lstrip("\ufeff")
    lines = text.splitlines()
    if not lines or lines[0].strip() != "---":
        return None, text
    
    closing_idx = -1
    for idx in range(1, len(lines)):
        if lines[idx].strip() == "---":
            closing_idx = idx
            break
            
    if closing_idx == -1:
        return None, text
        
    fm_lines = lines[1:closing_idx]
    body = "\n".join(lines[closing_idx + 1:])
    
    fm = {}
    i = 0
    while i < len(fm_lines):
        line = fm_lines[i]
        stripped = line.strip()
        if not stripped or stripped.startswith("#"):
            i += 1
            continue
        if ":" in line:
            k, v = line.split(":", 1)
            k = k.strip()
            v = v.strip()
            if v == "":
                # list items on following lines (block sequence)
                items = []
                i += 1
                while i < len(fm_lines):
                    next_line = fm_lines[i]
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
                # flow sequence
                inner = v[1:-1].strip()
                if not inner:
                    fm[k] = []
                else:
                    items = [x.strip().strip("\"'") for x in inner.split(",") if x.strip()]
                    fm[k] = items
            elif v.lower() in ("true", "yes"):
                fm[k] = True
            elif v.lower() in ("false", "no"):
                fm[k] = False
            else:
                fm[k] = v.strip("\"'")
        i += 1
    return fm, body

def is_service_or_draft(file_path: Path, rel_path: str, fm: dict) -> bool:
    """
    Identifies service/draft pages according to R3 / DISPATCH:
    - Files with 'draft: true' in frontmatter
    - Files inside 'TEMP/' directories
    - 'index.md' service / MOC files
    """
    if fm and fm.get("draft") is True:
        return True
    if "TEMP" in file_path.parts or rel_path.startswith("TEMP/"):
        return True
    if file_path.name.lower() == "index.md":
        return True
    return False

def validate_tags(tags: list) -> list:
    """
    Validates that tags list satisfies:
    1. tags is a list
    2. at least 2 hierarchical tags
    3. all tags contain '/'
    4. at least 1 tag matches materia/...
    5. at least 1 tag matches tipologia/...
    Returns list of issue descriptions (empty if valid).
    """
    issues = []
    if not isinstance(tags, list):
        return [f"'tags' must be a YAML array/list, got {type(tags).__name__}"]
    if len(tags) == 0:
        return ["'tags' array is empty"]
        
    non_hierarchical = [t for t in tags if not isinstance(t, str) or "/" not in t]
    if non_hierarchical:
        issues.append(f"Non-hierarchical tag(s) found (missing '/'): {', '.join(str(t) for t in non_hierarchical)}")
        
    if len(tags) < 2:
        issues.append(f"Expected at least 2 hierarchical tags, found {len(tags)}")
        
    has_materia = any(isinstance(t, str) and any(t.lower().startswith(p) for p in MATERIA_PREFIXES) for t in tags)
    if not has_materia:
        issues.append("Missing hierarchical materia tag (must start with materia/, informatica/, inglese/, matematica/, sistemi-e-reti/, or tipsit/)")
        
    has_tipologia = any(isinstance(t, str) and any(t.lower().startswith(p) for p in TIPOLOGIA_PREFIXES) for t in tags)
    if not has_tipologia:
        issues.append("Missing hierarchical tipologia tag (must start with tipologia/)")
        
    return issues

def check_tags(content_dir: Path):
    all_md = sorted(content_dir.rglob("*.md"))
    
    total_files = len(all_md)
    draft_files = []
    non_draft_valid = []
    non_draft_invalid = []
    
    distinct_tags = set()
    
    for md_path in all_md:
        rel = md_path.relative_to(content_dir).as_posix()
        try:
            txt = md_path.read_text(encoding="utf-8-sig")
        except UnicodeDecodeError:
            try:
                txt = md_path.read_text(encoding="utf-8")
            except UnicodeDecodeError:
                txt = md_path.read_text(encoding="latin-1")
            
        fm, body = parse_frontmatter(txt)
        
        # Identify service / draft pages
        if is_service_or_draft(md_path, rel, fm):
            draft_files.append(rel)
            continue
            
        # Non-draft content note validation
        issues = []
        if fm is None:
            issues.append("Missing YAML frontmatter (no '---' block found)")
        elif "tags" not in fm:
            issues.append("Missing 'tags' key in YAML frontmatter")
        else:
            tag_issues = validate_tags(fm["tags"])
            issues.extend(tag_issues)
            if isinstance(fm["tags"], list):
                for t in fm["tags"]:
                    distinct_tags.add(t)
                    
        if issues:
            non_draft_invalid.append((rel, issues))
        else:
            non_draft_valid.append(rel)
            
    return {
        "total_files": total_files,
        "draft_count": len(draft_files),
        "draft_files": draft_files,
        "valid_count": len(non_draft_valid),
        "valid_files": non_draft_valid,
        "invalid_count": len(non_draft_invalid),
        "invalid_files": non_draft_invalid,
        "distinct_tags": sorted(distinct_tags)
    }

def main():
    parser = argparse.ArgumentParser(description="Verify YAML tags on non-draft markdown files.")
    parser.add_argument("--content-dir", default="content", help="Path to content directory")
    parser.add_argument("--verbose", action="store_true", help="Print all valid and draft files")
    args = parser.parse_args()
    
    content_path = Path(args.content_dir)
    if not content_path.exists():
        print(f"Error: Content directory '{content_path}' does not exist.", file=sys.stderr)
        sys.exit(2)
        
    res = check_tags(content_path)
    
    print("================ YAML TAGS VERIFICATION ================")
    print(f"Content Directory:       {content_path.resolve()}")
    print(f"Total Markdown Files:    {res['total_files']}")
    print(f"Service / Draft Files:   {res['draft_count']}")
    print(f"Non-Draft Files Checked: {res['valid_count'] + res['invalid_count']}")
    print(f"  - Valid Tags:          {res['valid_count']}")
    print(f"  - Invalid/Missing:     {res['invalid_count']}")
    print(f"Distinct Tags in Vault:  {len(res['distinct_tags'])}")
    print("=========================================================")
    
    if args.verbose and res['draft_files']:
        print("\nSERVICE / DRAFT FILES (SKIPPED):")
        for df in res['draft_files']:
            print(f"  [DRAFT] {df}")
            
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
