import sys
import re
import urllib.parse
from pathlib import Path

content = Path('content')
md_files = sorted(list(content.rglob('*.md')))
all_files = sorted(list(content.rglob('*')))
all_file_rels = {f.relative_to(content).as_posix(): f for f in all_files if f.is_file()}
stem_map = {}
name_map = {}
for rel in all_file_rels:
    stem = Path(rel).stem.lower()
    name = Path(rel).name.lower()
    stem_map.setdefault(stem, []).append(rel)
    name_map.setdefault(name, []).append(rel)

print(f'Total vault files: {len(all_file_rels)} (Markdown: {len(md_files)})')

# Extract and verify all wikilinks independently
broken_links = []
total_links = 0

for p in md_files:
    rel = p.relative_to(content).as_posix()
    txt = p.read_text(encoding='utf-8-sig', errors='replace')
    # strip code blocks
    clean_txt = re.sub(r'```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`\n]+`', '', txt)
    
    # find [[target#anchor|alias]]
    for m in re.finditer(r'(!)?\[\[([^\]|#\n]*)(?:#([^\]|\n]*))?(?:\|([^\]\n]*))?\]\]', clean_txt):
        target = urllib.parse.unquote(m.group(2).strip()) if m.group(2) else ""
        heading = urllib.parse.unquote(m.group(3).strip()) if m.group(3) else None
        
        if not target and not heading:
            continue
        if target.startswith(('http://', 'https://')):
            continue
            
        total_links += 1
        
        # Check target resolution
        if not target and heading:
            # Internal anchor in current note
            if heading.lower() not in txt.lower():
                broken_links.append((rel, m.group(0), f'Heading #{heading} not in note'))
            continue
            
        resolved = None
        if target in all_file_rels:
            resolved = target
        elif (target + '.md') in all_file_rels:
            resolved = target + '.md'
        else:
            parent = Path(rel).parent.as_posix()
            if parent != '.':
                cand = f'{parent}/{target}'
                if cand in all_file_rels:
                    resolved = cand
                elif (cand + '.md') in all_file_rels:
                    resolved = cand + '.md'
            if not resolved:
                cands = stem_map.get(target.lower(), []) or name_map.get(target.lower(), [])
                if cands:
                    resolved = cands[0]
                    
        if not resolved:
            broken_links.append((rel, m.group(0), f'Target not found: {target}'))

print(f'Total wikilinks verified independently: {total_links}')
if broken_links:
    print(f'FAILED: {len(broken_links)} broken links found: {broken_links[:5]}')
    sys.exit(1)
else:
    print('SUCCESS: Zero broken wikilinks detected independently!')
