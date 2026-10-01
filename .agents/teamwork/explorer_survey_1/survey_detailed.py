import os
import re
import json
from pathlib import Path
from collections import defaultdict

CONTENT_DIR = Path(r"c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas\content")

def parse_frontmatter(text):
    if text.startswith("---"):
        parts = text.split("---", 2)
        if len(parts) >= 3:
            return parts[1], parts[2]
    return None, text

def main():
    report = {}
    
    # 1. Enumerate all files
    all_files = {}
    md_files = {}
    non_md_files = {}
    
    for p in CONTENT_DIR.rglob("*"):
        if p.is_file():
            rel = p.relative_to(CONTENT_DIR)
            rel_str = str(rel).replace("\\", "/")
            all_files[rel_str] = {
                "path": rel_str,
                "ext": p.suffix.lower(),
                "size": p.stat().st_size,
                "parts": rel.parts
            }
            if p.suffix.lower() == ".md":
                md_files[rel_str] = all_files[rel_str]
            else:
                non_md_files[rel_str] = all_files[rel_str]
                
    # 2. File breakdown by folder
    folder_stats = defaultdict(lambda: {"total": 0, "md": 0, "non_md": 0, "exts": defaultdict(int), "subdirs": set()})
    for rel_str, info in all_files.items():
        parts = info["parts"]
        top = parts[0] if len(parts) > 1 else "<root>"
        folder_stats[top]["total"] += 1
        if info["ext"] == ".md":
            folder_stats[top]["md"] += 1
        else:
            folder_stats[top]["non_md"] += 1
        folder_stats[top]["exts"][info["ext"]] += 1
        if len(parts) > 2:
            folder_stats[top]["subdirs"].add(parts[1])
            
    # 3. Read and inspect all markdown notes
    link_regex = re.compile(r'!?\[\[(.*?)\]\]')
    md_notes_info = {}
    all_targets = set()
    for rel_str, info in all_files.items():
        all_targets.add(Path(rel_str).name.lower())
        all_targets.add(Path(rel_str).stem.lower())
        all_targets.add(rel_str.lower())
        
    broken_links = []
    zero_byte_notes = []
    stub_notes = []
    
    for rel_str, info in md_files.items():
        full_path = CONTENT_DIR / rel_str
        raw_text = full_path.read_text(encoding="utf-8", errors="replace")
        fm_raw, body = parse_frontmatter(raw_text)
        
        # Tags & Draft
        tags = []
        is_draft = False
        title = None
        if fm_raw:
            in_tags = False
            for line in fm_raw.splitlines():
                ls = line.strip()
                if ls.startswith("tags:"):
                    in_tags = True
                    rest = ls[5:].strip()
                    if rest.startswith("[") and rest.endswith("]"):
                        in_tags = False
                        tags.extend([t.strip().strip("'\"") for t in rest[1:-1].split(",") if t.strip()])
                elif in_tags:
                    if ls.startswith("- "):
                        tags.append(ls[2:].strip().strip("'\""))
                    elif ls and not ls.startswith("#"):
                        in_tags = False
                if ls.startswith("draft:"):
                    if "true" in ls.lower():
                        is_draft = True
                if ls.startswith("title:"):
                    title = ls[6:].strip().strip("'\"")
                    
        # Find links
        links = []
        for m in link_regex.finditer(body):
            raw_link = m.group(1).split("|")[0].split("#")[0].strip()
            links.append(raw_link)
            # check link validity
            target_norm = raw_link.replace("\\", "/").lower()
            target_stem = Path(raw_link).stem.lower()
            target_name = Path(raw_link).name.lower()
            if not (target_norm in all_targets or target_stem in all_targets or target_name in all_targets):
                broken_links.append({"source": rel_str, "link": raw_link})
                
        note_type = "general"
        if rel_str.lower().endswith("index.md") or rel_str.lower() == "index.md":
            note_type = "index"
        elif "vocabulary" in rel_str.lower():
            note_type = "vocabulary"
        elif any(k in rel_str.lower() for k in ["cheat", "formul", "riassunt"]):
            note_type = "cheatsheet"
        elif "temp" in rel_str.lower():
            note_type = "temp"
            
        if info["size"] == 0:
            zero_byte_notes.append(rel_str)
        elif len(body.strip()) < 100:
            stub_notes.append({"path": rel_str, "size": info["size"], "chars": len(body.strip()), "body": body.strip()})
            
        md_notes_info[rel_str] = {
            "title": title or Path(rel_str).stem,
            "has_fm": fm_raw is not None,
            "tags": tags,
            "draft": is_draft,
            "type": note_type,
            "size": info["size"],
            "body_len": len(body.strip()),
            "links": links
        }
        
    # Check images references
    image_files = {r: info for r, info in non_md_files.items() if info["ext"] in [".png", ".jpg", ".jpeg", ".gif", ".webp"]}
    referenced_images = set()
    for rel_str, note in md_notes_info.items():
        for l in note["links"]:
            l_lower = Path(l).name.lower()
            for img_path in image_files:
                if Path(img_path).name.lower() == l_lower or img_path.lower() == l.lower():
                    referenced_images.add(img_path)
                    
    unreferenced_images = [img for img in image_files if img not in referenced_images]
    
    # Check PDF references
    pdf_files = {r: info for r, info in non_md_files.items() if info["ext"] == ".pdf"}
    referenced_pdfs = set()
    for rel_str, note in md_notes_info.items():
        for l in note["links"]:
            l_lower = Path(l).name.lower()
            for pdf_path in pdf_files:
                if Path(pdf_path).name.lower() == l_lower or pdf_path.lower() == l.lower():
                    referenced_pdfs.add(pdf_path)
    unreferenced_pdfs = [p for p in pdf_files if p not in referenced_pdfs]

    out = {
        "folder_stats": {k: {"total": v["total"], "md": v["md"], "non_md": v["non_md"], "exts": dict(v["exts"]), "subdirs": sorted(list(v["subdirs"]))} for k, v in folder_stats.items()},
        "zero_byte_notes": zero_byte_notes,
        "stub_notes": stub_notes,
        "broken_links": broken_links,
        "unreferenced_images_count": len(unreferenced_images),
        "unreferenced_images_sample": unreferenced_images[:10],
        "unreferenced_pdfs": unreferenced_pdfs,
        "referenced_pdfs": list(referenced_pdfs),
        "md_stats": {
            "total_md": len(md_files),
            "with_frontmatter": sum(1 for n in md_notes_info.values() if n["has_fm"]),
            "with_tags": sum(1 for n in md_notes_info.values() if len(n["tags"]) > 0),
            "with_draft": sum(1 for n in md_notes_info.values() if n["draft"]),
            "index_notes": sum(1 for n in md_notes_info.values() if n["type"] == "index"),
            "vocab_notes": sum(1 for n in md_notes_info.values() if n["type"] == "vocabulary"),
            "cheatsheet_notes": sum(1 for n in md_notes_info.values() if n["type"] == "cheatsheet"),
            "temp_notes": sum(1 for n in md_notes_info.values() if n["type"] == "temp"),
        }
    }
    
    with open(r"c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas\.agents\teamwork\explorer_survey_1\survey_data.json", "w", encoding="utf-8") as f:
        json.dump(out, f, indent=2)
        
    print("Survey data dumped to survey_data.json successfully.")
    print("Summary:")
    print("MD total:", len(md_files))
    print("Zero-byte notes count:", len(zero_byte_notes))
    print("Stub notes count (<100 chars):", len(stub_notes))
    print("Broken links count:", len(broken_links))
    print("Unreferenced images:", len(unreferenced_images), "of", len(image_files))
    print("Unreferenced PDFs:", len(unreferenced_pdfs), "of", len(pdf_files))

if __name__ == "__main__":
    main()
