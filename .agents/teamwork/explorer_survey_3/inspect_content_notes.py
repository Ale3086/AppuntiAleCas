from pathlib import Path
import json

content_dir = Path("content")
all_md = sorted(content_dir.rglob("*.md"))

content_notes = []
for p in all_md:
    rel = p.relative_to(content_dir).as_posix()
    if p.name.lower() == "index.md" or rel.startswith("TEMP/"):
        continue
    content_notes.append((rel, p.stem, p.parent.relative_to(content_dir).as_posix()))

print(f"Total non-draft content notes: {len(content_notes)}")

# Let's inspect notes grouped by directory
dir_groups = {}
for rel, stem, parent in content_notes:
    if parent not in dir_groups:
        dir_groups[parent] = []
    dir_groups[parent].append(stem)

for parent, stems in sorted(dir_groups.items()):
    print(f"\nFolder: {parent} ({len(stems)} notes)")
    for s in stems:
        print(f"  - {s}")
