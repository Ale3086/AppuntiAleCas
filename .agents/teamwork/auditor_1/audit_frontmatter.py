#!/usr/bin/env python3
import os
import sys
import re
from pathlib import Path
from collections import Counter

sys.path.insert(0, str(Path(__file__).resolve().parents[3]))
from check_tags import parse_frontmatter, validate_tags, MATERIA_PREFIXES, TIPOLOGIA_PREFIXES

content_dir = Path("content")
md_files = sorted(content_dir.rglob("*.md"))

draft_notes = []
content_notes = []
tag_counter = Counter()
boms_found = []
malformed_yaml = []
validation_issues = []

for f in md_files:
    rel = f.relative_to(content_dir).as_posix()
    raw = f.read_bytes()
    if raw.startswith(b"\xef\xbb\xbf"):
        boms_found.append(rel)
    text = raw.decode("utf-8-sig", errors="replace")
    
    fm, body = parse_frontmatter(text)
    
    is_draft = False
    if fm and fm.get("draft") is True:
        is_draft = True
    elif "TEMP" in f.parts or rel.startswith("TEMP/"):
        is_draft = True
    elif f.name.lower() == "index.md":
        is_draft = True
        
    if is_draft:
        draft_notes.append((rel, fm))
    else:
        content_notes.append((rel, fm))
        if not fm:
            malformed_yaml.append((rel, "Missing frontmatter"))
        elif "tags" not in fm:
            malformed_yaml.append((rel, "Missing tags"))
        else:
            tags = fm["tags"]
            issues = validate_tags(tags)
            if issues:
                validation_issues.append((rel, issues))
            if isinstance(tags, list):
                for t in tags:
                    tag_counter[t] += 1

print(f"Total markdown files: {len(md_files)}")
print(f"Total draft/service notes: {len(draft_notes)}")
print(f"Total content notes: {len(content_notes)}")
print(f"BOMs found: {len(boms_found)}")
print(f"Malformed YAML / Missing tags: {len(malformed_yaml)}")
print(f"Validation issues in content notes: {len(validation_issues)}")
print(f"Distinct tags count: {len(tag_counter)}")

print("\n--- DISTINCT TAGS AND OCCURRENCES ---")
for t, c in sorted(tag_counter.items()):
    print(f"  {t}: {c}")

print("\n--- SAMPLE CONTENT NOTES (First 10) ---")
for rel, fm in content_notes[:10]:
    print(f"  {rel} -> title='{fm.get('title')}', tags={fm.get('tags')}")

print("\n--- SAMPLE CONTENT NOTES (Middle 10) ---")
for rel, fm in content_notes[45:55]:
    print(f"  {rel} -> title='{fm.get('title')}', tags={fm.get('tags')}")

print("\n--- SAMPLE CONTENT NOTES (Last 10) ---")
for rel, fm in content_notes[-10:]:
    print(f"  {rel} -> title='{fm.get('title')}', tags={fm.get('tags')}")

print("\n--- DRAFT NOTES AUDIT ---")
non_index_temp_drafts = [rel for rel, fm in draft_notes if not rel.endswith("index.md") and not rel.startswith("TEMP/")]
print(f"Draft notes outside index.md and TEMP: {len(non_index_temp_drafts)} ({non_index_temp_drafts})")
index_notes_draft_status = [(rel, fm.get('draft') if fm else None) for rel, fm in draft_notes if rel.endswith("index.md")]
print(f"Total index.md in draft notes: {len(index_notes_draft_status)}")
print(f"Root content/index.md draft status: is_draft={any(rel == 'index.md' for rel, _ in draft_notes)}")

# Check root index.md specifically
root_index = Path("content/index.md")
root_fm, _ = parse_frontmatter(root_index.read_text(encoding="utf-8-sig"))
print(f"Root content/index.md frontmatter: {root_fm}")
