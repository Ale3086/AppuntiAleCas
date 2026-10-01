from pathlib import Path
import json

content_dir = Path("content")
all_md = sorted(content_dir.rglob("*.md"))

notes_by_macro = {}

for p in all_md:
    rel = p.relative_to(content_dir).as_posix()
    is_index = p.name.lower() == "index.md"
    in_temp = rel.startswith("TEMP/")
    is_draft = is_index or in_temp
    
    parts = p.relative_to(content_dir).parts
    macro = parts[0]
    
    if macro not in notes_by_macro:
        notes_by_macro[macro] = {"drafts": [], "content_notes": []}
        
    entry = {
        "rel": rel,
        "name": p.stem,
        "parent": p.parent.relative_to(content_dir).as_posix()
    }
    
    if is_draft:
        notes_by_macro[macro]["drafts"].append(entry)
    else:
        notes_by_macro[macro]["content_notes"].append(entry)

print("Macro-Topic Content Distribution:")
for macro, d in sorted(notes_by_macro.items()):
    print(f"=== {macro} ===")
    print(f"  Content notes: {len(d['content_notes'])}, Drafts/Service: {len(d['drafts'])}")
    for note in d['content_notes']:
        print(f"    - {note['parent']} / {note['name']}")
