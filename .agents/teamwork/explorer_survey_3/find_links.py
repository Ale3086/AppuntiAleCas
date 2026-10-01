from pathlib import Path
import re

content_dir = Path("content")
# Match [[...]] or ![[...]]
pattern = re.compile(r'(!)?\[\[([^\]\n]+)\]\]')
CODE_BLOCK_RE = re.compile(r'```.*?```', re.DOTALL)
INLINE_CODE_RE = re.compile(r'`[^`\n]+`')

links_by_file = {}
total = 0
for p in sorted(content_dir.rglob("*.md")):
    txt = p.read_text(encoding="utf-8", errors="ignore")
    clean = CODE_BLOCK_RE.sub("", txt)
    clean = INLINE_CODE_RE.sub("", clean)
    m = list(pattern.finditer(clean))
    if m:
        rel = p.relative_to(content_dir).as_posix()
        links_by_file[rel] = [match.group(0) for match in m]
        total += len(m)

print(f"Total links found: {total}")
for f, lks in sorted(links_by_file.items()):
    print(f"{f} ({len(lks)} links):")
    for l in lks:
        print(f"   {l}")
