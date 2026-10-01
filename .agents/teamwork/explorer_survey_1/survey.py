import os
import re
from pathlib import Path
from collections import defaultdict

CONTENT_DIR = Path(r"c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas\content")

def parse_frontmatter(content):
    if content.startswith("---"):
        parts = content.split("---", 2)
        if len(parts) >= 3:
            return parts[1], parts[2]
    return None, content

def run_survey():
    all_files = []
    by_folder = defaultdict(list)
    by_ext = defaultdict(int)
    non_md_files = []
    md_files = []
    
    for root, dirs, files in os.walk(CONTENT_DIR):
        rel_root = os.path.relpath(root, CONTENT_DIR)
        for f in files:
            full_path = Path(root) / f
            rel_path = full_path.relative_to(CONTENT_DIR)
            ext = full_path.suffix.lower()
            size = full_path.stat().st_size
            by_ext[ext] += 1
            all_files.append((rel_path, ext, size))
            
            top_folder = rel_path.parts[0] if len(rel_path.parts) > 1 else "<root>"
            by_folder[top_folder].append((rel_path, ext, size))
            
            if ext == ".md":
                md_files.append((rel_path, full_path, size))
            else:
                non_md_files.append((rel_path, full_path, size))
                
    print(f"Total files in content: {len(all_files)}")
    print("\nFiles by extension:")
    for ext, count in sorted(by_ext.items(), key=lambda x: -x[1]):
        print(f"  {ext or '<no-ext>'}: {count}")
        
    print("\nFiles by top-level folder:")
    for folder, flist in sorted(by_folder.items()):
        md_count = sum(1 for _, ext, _ in flist if ext == ".md")
        non_md_count = len(flist) - md_count
        print(f"  {folder}: {len(flist)} total ({md_count} md, {non_md_count} other)")
        
    # Inspect subfolders in each top folder
    print("\nDetailed folder breakdown:")
    folder_subdirs = defaultdict(lambda: defaultdict(int))
    for rel_path, ext, size in all_files:
        parts = rel_path.parts
        if len(parts) == 1:
            folder_subdirs["<root>"]["."] += 1
        elif len(parts) == 2:
            folder_subdirs[parts[0]]["."] += 1
        else:
            folder_subdirs[parts[0]][parts[1]] += 1
    for top, subs in sorted(folder_subdirs.items()):
        print(f"  [{top}]")
        for sub, c in sorted(subs.items()):
            print(f"    {sub}: {c} files")

    # Frontmatter analysis
    print("\n--- FRONTMATTER ANALYSIS ---")
    files_with_fm = 0
    files_with_tags = 0
    files_with_draft = 0
    tag_counts = defaultdict(int)
    titles = {}
    content_hashes = defaultdict(list)
    link_pattern = re.compile(r'\[\[(.*?)\]\]')
    all_links = []
    
    notes_info = []
    
    for rel_path, full_path, size in md_files:
        try:
            text = full_path.read_text(encoding="utf-8", errors="replace")
        except Exception as e:
            text = ""
        fm_raw, body = parse_frontmatter(text)
        has_fm = fm_raw is not None
        has_tags = False
        has_draft = False
        tags_found = []
        title_val = None
        
        if has_fm:
            files_with_fm += 1
            for line in fm_raw.splitlines():
                line_s = line.strip()
                if line_s.startswith("tags:"):
                    has_tags = True
                    # simple extraction
                    rest = line_s[len("tags:"):].strip()
                    if rest.startswith("[") and rest.endswith("]"):
                        items = [t.strip().strip("'\"") for t in rest[1:-1].split(",") if t.strip()]
                        tags_found.extend(items)
                elif line_s.startswith("- ") and has_tags and not tags_found:
                    tags_found.append(line_s[2:].strip().strip("'\""))
                if line_s.startswith("draft:"):
                    if "true" in line_s.lower():
                        has_draft = True
                if line_s.startswith("title:"):
                    title_val = line_s[len("title:"):].strip().strip("'\"")
                    
        if has_tags:
            files_with_tags += 1
            for t in tags_found:
                tag_counts[t] += 1
        if has_draft:
            files_with_draft += 1
            
        links = link_pattern.findall(body)
        all_links.extend([(rel_path, l) for l in links])
        
        # Check note characteristics
        is_index = rel_path.name.lower() in ("index.md", "readme.md") or "indice" in rel_path.name.lower()
        is_temp = "temp" in [p.lower() for p in rel_path.parts]
        is_vocab = "vocab" in rel_path.name.lower() or "glossar" in rel_path.name.lower() or "dizionar" in rel_path.name.lower()
        is_cheatsheet = "cheat" in rel_path.name.lower() or "formul" in rel_path.name.lower() or "riassunt" in rel_path.name.lower()
        
        notes_info.append({
            "rel_path": str(rel_path),
            "size": size,
            "has_fm": has_fm,
            "has_tags": has_tags,
            "tags": tags_found,
            "has_draft": has_draft,
            "title": title_val or rel_path.stem,
            "links_count": len(links),
            "is_index": is_index,
            "is_temp": is_temp,
            "is_vocab": is_vocab,
            "is_cheatsheet": is_cheatsheet,
            "body_len": len(body.strip()),
            "lines": len(text.splitlines())
        })
        
    print(f"MD Files: {len(md_files)}")
    print(f"MD Files with Frontmatter: {files_with_fm}")
    print(f"MD Files with Tags: {files_with_tags}")
    print(f"MD Files with Draft: {files_with_draft}")
    print(f"Total unique tags currently: {len(tag_counts)}")
    print("Tags found:", dict(tag_counts))
    print(f"Total wikilinks found: {len(all_links)}")

    # Non-md files
    print("\nNon-markdown files:")
    for rel_path, full_path, size in non_md_files:
        print(f"  {rel_path} ({size} bytes)")
        
    # Empty or very small notes (< 100 bytes)
    print("\nVery small notes (< 100 chars body):")
    for n in notes_info:
        if n["body_len"] < 100:
            print(f"  {n['rel_path']} (chars: {n['body_len']}, size: {n['size']})")

    # Possible duplicate names (same filename stem in different directories)
    stem_map = defaultdict(list)
    for n in notes_info:
        stem = Path(n["rel_path"]).stem.lower()
        stem_map[stem].append(n["rel_path"])
    duplicates = {k: v for k, v in stem_map.items() if len(v) > 1}
    print(f"\nFilename stem collisions ({len(duplicates)}):")
    for stem, paths in duplicates.items():
        print(f"  '{stem}': {paths}")

if __name__ == "__main__":
    run_survey()
