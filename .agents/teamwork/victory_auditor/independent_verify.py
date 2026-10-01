import sys
import re
from pathlib import Path

content = Path('content')
md_files = sorted(list(content.rglob('*.md')))
print(f'Total markdown files: {len(md_files)}')

drafts = []
non_drafts = []

for p in md_files:
    rel = p.relative_to(content).as_posix()
    txt = p.read_text(encoding='utf-8-sig', errors='replace').replace('\r\n', '\n')
    is_draft = False
    
    # check draft in frontmatter
    fm_match = re.match(r'^---\s*\n(.*?)\n---\s*\n', txt, re.DOTALL)
    fm_txt = fm_match.group(1) if fm_match else ''
    
    if fm_match and re.search(r'^\s*draft\s*:\s*true\b', fm_txt, re.IGNORECASE | re.MULTILINE):
        is_draft = True
    if 'TEMP' in p.parts or rel.startswith('TEMP/'):
        is_draft = True
    if p.name.lower() == 'index.md' and rel != 'index.md':
        is_draft = True
        
    if is_draft:
        drafts.append(rel)
    else:
        non_drafts.append((rel, fm_txt))

print(f'Draft files count: {len(drafts)}')
print(f'Non-draft files count: {len(non_drafts)}')

# Check home page
home_fm = [fm for rel, fm in non_drafts if rel == 'index.md']
assert len(home_fm) == 1, 'Home index.md not found in non-drafts'
assert 'draft: true' not in home_fm[0].lower(), 'Home index.md must not be draft'
print('Root index.md is correctly NON-DRAFT.')

# Check every non-draft note (excluding root index.md which is service navigation)
notes = [(rel, fm) for rel, fm in non_drafts if rel != 'index.md']
print(f'Content notes to verify tags: {len(notes)}')

missing_tags = []
all_tags = set()

for rel, fm in notes:
    if not fm:
        missing_tags.append((rel, 'No frontmatter'))
        continue
    
    # Extract tags
    tag_list = []
    # flow style [a, b]
    flow_m = re.search(r'^\s*tags:\s*\[(.*?)\]', fm, re.MULTILINE)
    if flow_m:
        tag_list = [t.strip().strip('"\'') for t in flow_m.group(1).split(',') if t.strip()]
    else:
        # block style
        block_m = re.search(r'^\s*tags:\s*\n((?:\s*-\s*[^\n]+\n?)+)', fm, re.MULTILINE)
        if block_m:
            for l in block_m.group(1).splitlines():
                l_str = l.strip()
                if l_str.startswith('- '):
                    tag_list.append(l_str[2:].strip().strip('"\''))
        else:
            missing_tags.append((rel, 'No tags field found'))
            continue

    if len(tag_list) < 2:
        missing_tags.append((rel, f'Fewer than 2 tags: {tag_list}'))
    for t in tag_list:
        all_tags.add(t)
        if '/' not in t:
            missing_tags.append((rel, f'Non-hierarchical tag: {t}'))
            
    # Check dual-axis: materia and tipologia
    has_materia = any(t.startswith(('materia/', 'informatica/', 'inglese/', 'matematica/', 'sistemi-e-reti/', 'tipsit/')) for t in tag_list)
    has_tipologia = any(t.startswith('tipologia/') for t in tag_list)
    if not has_materia or not has_tipologia:
        missing_tags.append((rel, f'Missing dual-axis: materia={has_materia}, tipologia={has_tipologia}, tags={tag_list}'))

if missing_tags:
    print(f'FAILED: {len(missing_tags)} notes have tag issues: {missing_tags[:5]}')
    sys.exit(1)
else:
    print(f'SUCCESS: All {len(notes)} content notes have valid hierarchical tags across dual axes!')
    print(f'Distinct tags count: {len(all_tags)}')

# Check public/ directory output from Quartz build
pub = Path('public')
assert pub.exists() and pub.is_dir(), 'public/ does not exist!'
index_html = pub / 'index.html'
assert index_html.exists() and index_html.stat().st_size > 0, 'public/index.html is missing or empty!'
print(f'SUCCESS: Quartz public output verified. public/index.html size: {index_html.stat().st_size} bytes.')
