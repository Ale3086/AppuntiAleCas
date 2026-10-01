# Dispatch Task: Worker M2 (Vault Reorganization, Encoding Cleanups, and Safe-Delete Cataloging)

## Mandatory Context
- Requirements: `c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas\.agents\teamwork\ORIGINAL_REQUEST.md`
- Project Architecture & Milestones: `c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas\.agents\teamwork\PROJECT.md`
- Workspace Root: `c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas`
- Worker Working Directory: `c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas\.agents\teamwork\worker_m2`

## Mandatory Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. An auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Objective & Detailed Tasks
1. Read `ORIGINAL_REQUEST.md` and `PROJECT.md`.
2. Strip UTF-8 BOM headers (`\xef\xbb\xbf` / `\ufeff`) from all index/markdown files in `content/` (approx 39 files identified in survey) by converting them to standard UTF-8 without BOM.
3. Fix folder name encoding & typos:
   - Fix `content/TIPSIT/Digitalizzazione e Multimedialit` (which has a corrupted trailing replacement char) -> standardize to `content/TIPSIT/Digitalizzazione e Multimedialità`.
   - Fix typo in `content/Inglese/Cerificazione Inglese` -> `content/Inglese/Certificazione Inglese`.
   - Update any wikilinks pointing to these directories or files within them across the entire vault.
4. Update root homepage `content/index.md`:
   - Add the missing navigation link to `Matematica` (`[[Matematica/index|Matematica]]`) so all 5 macro-topics (`Informatica`, `Inglese`, `Matematica`, `Sistemi e reti`, `TIPSIT`) are properly linked.
5. Safe-Delete Cataloging in `CHANGELOG_RIORGANIZZAZIONE.md`:
   - PER R4: DO NOT DELETE ANY FILES AUTONOMOUSLY. All candidate files must remain in place.
   - Fully populate the "2. Procedura Safe-Delete (Candidati all'Eliminazione)" table in `CHANGELOG_RIORGANIZZAZIONE.md` with:
     * 26 zero-byte placeholder files (path, content summary "File vuoto (0 byte)", size 0B, backlinks 0, technical reason).
     * `content/Informatica/HTML/html/Senza nome.md` (33KB monolithic duplicate of the 10 split HTML notes; path, content summary, size, backlinks, technical reason: duplicate content).
     * Unreferenced assets in `content/TEMP/` (17 PDFs, 6 PNGs in TEMPT2) and unreferenced images in `content/Zimmagini/`.
6. Run the link verifier to ensure zero broken wikilinks:
   ```powershell
   python check_links.py --content-dir content
   ```
   (Must output `[PASS] Zero broken wikilinks found! All links resolve successfully.` with exit code 0).
7. Stage, commit atomically on `refactor/quartz-prep`:
   ```powershell
   git add -A
   git commit -m "refactor(content): vault cleanup, encoding fixes, and safe-delete cataloging"
   git push origin refactor/quartz-prep
   ```
8. Update `CHANGELOG_RIORGANIZZAZIONE.md` Actions Log with this commit hash and details, commit and push:
   ```powershell
   git add CHANGELOG_RIORGANIZZAZIONE.md
   git commit -m "docs(changelog): record vault cleanup and safe-delete cataloging"
   git push origin refactor/quartz-prep
   ```
9. Write `handoff.md` with full evidence, commands, and results, and notify parent via `send_message`.

## 2026-09-30T11:19:33Z
You are Worker M2 (Vault Reorganization, Encoding Cleanups, and Safe-Delete Cataloging).
Your working directory is: `c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas\.agents\teamwork\worker_m2`
Read `c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas\.agents\teamwork\ORIGINAL_REQUEST.md` and `c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas\.agents\teamwork\worker_m2\DISPATCH.md`.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. An auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Execute the tasks:
1. Strip UTF-8 BOM headers from all markdown files in `content/`.
2. Fix folder name encoding (`content/TIPSIT/Digitalizzazione e Multimedialit` -> `Digitalizzazione e Multimedialità`) and typo (`content/Inglese/Cerificazione Inglese` -> `Certificazione Inglese`) and update any wikilinks.
3. Update `content/index.md` to link to `Matematica`.
4. Catalog all safe-delete candidates (26 zero-byte files, `Senza nome.md`, unreferenced assets) in `CHANGELOG_RIORGANIZZAZIONE.md`. DO NOT DELETE ANY FILES AUTONOMOUSLY.
5. Verify 0 broken wikilinks with `python check_links.py --content-dir content`.
6. Atomic commits and push to `origin/refactor/quartz-prep`.
7. Write `handoff.md` and notify parent via `send_message`.

