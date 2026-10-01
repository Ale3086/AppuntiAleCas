# Dispatch Task: Worker M3 (Tag Taxonomy & YAML Frontmatter Enrichment)

## Mandatory Context
- Requirements: `c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas\.agents\teamwork\ORIGINAL_REQUEST.md`
- Project Architecture & Milestones: `c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas\.agents\teamwork\PROJECT.md`
- Workspace Root: `c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas`
- Worker Working Directory: `c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas\.agents\teamwork\worker_m3`
- Verification Tools:
  - `python check_tags.py --content-dir content`
  - `python check_links.py --content-dir content`
  - `node ./quartz/bootstrap-cli.mjs build`
- Explorer 3 Taxonomy Reference:
  - `c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas\.agents\teamwork\explorer_survey_3\report.md`
  - `c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas\.agents\teamwork\explorer_survey_3\audit_results.json`

## Mandatory Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. An auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Objective & Tasks
1. Read `ORIGINAL_REQUEST.md`, `PROJECT.md`, and Explorer 3's taxonomy reference in `.agents/teamwork/explorer_survey_3/report.md`.
2. Apply `draft: true` to all service / draft pages:
   - Exactly 43 subfolder `index.md` files (e.g. `content/Informatica/index.md`, `content/Matematica/index.md`, etc.).
   - All 12 files in `content/TEMP/` (e.g. `content/TEMP/Sistemi e reti/*.md`).
   - CRITICAL CAVEAT: Root `content/index.md` MUST REMAIN NON-DRAFT (`draft: false` or omitted) to avoid Quartz dropping the website home page.
3. Inject the Dual-Axis Hierarchical Tag Taxonomy into all 101 non-draft content notes:
   - Format: `tags: [materia/argomento, tipologia/concetto]`
   - Axis 1 (`materia/...`): e.g. `informatica/cpp`, `informatica/html`, `informatica/javascript`, `inglese/vocabulary`, `inglese/grammar`, `matematica/geometria-analitica`, `sistemi-e-reti/modello-iso-osi`, `sistemi-e-reti/architettura`, `tipsit/sistemi-operativi`, `tipsit/multimedia`, etc.
   - Axis 2 (`tipologia/...`): e.g. `tipologia/concetto`, `tipologia/guida`, `tipologia/glossario`, `tipologia/teoria`, `tipologia/esercizio`, `tipologia/cheat-sheet`.
   - Ensure every note has valid YAML frontmatter delimiters (`---`) and clean syntax.
4. Execute all verification suites:
   ```powershell
   python check_tags.py --content-dir content
   python check_links.py --content-dir content
   node ./quartz/bootstrap-cli.mjs build
   ```
   All three commands MUST pass with exit code 0:
   - `check_tags.py`: 100% of non-draft markdown files contain valid tags, 0 invalid.
   - `check_links.py`: Zero broken wikilinks found.
   - `node ./quartz/bootstrap-cli.mjs build`: Clean build emitting ~552 files with zero fatal errors.
5. Stage and commit atomically on branch `refactor/quartz-prep`:
   ```powershell
   git add content/
   git commit -m "feat(tags): enrich frontmatter with hierarchical taxonomy and draft flags"
   git push origin refactor/quartz-prep
   ```
6. Update `CHANGELOG_RIORGANIZZAZIONE.md` Actions Log with this commit and details, commit and push:
   ```powershell
   git add CHANGELOG_RIORGANIZZAZIONE.md
   git commit -m "docs(changelog): record hierarchical taxonomy enrichment and draft tagging"
   git push origin refactor/quartz-prep
   ```
## 2026-09-30T11:27:57Z
You are Worker M3 (Tag Taxonomy & YAML Frontmatter Enrichment).
Your working directory is: `c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas\.agents\teamwork\worker_m3`
Read `c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas\.agents\teamwork\ORIGINAL_REQUEST.md` and `c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas\.agents\teamwork\worker_m3\DISPATCH.md`.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. An auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Execute the tasks:
1. Mark all 43 subfolder `index.md` files and 12 `content/TEMP/` notes with `draft: true` (preserve root `content/index.md` as non-draft!).
2. Enrich all 101 non-draft content notes with dual-axis hierarchical YAML tags (`tags: [materia/argomento, tipologia/concetto]`).
3. Run and verify `python check_tags.py --content-dir content` (100% compliant, exit code 0).
4. Run and verify `python check_links.py --content-dir content` (0 broken links, exit code 0).
5. Run and verify `node ./quartz/bootstrap-cli.mjs build` (0 fatal errors, exit code 0).
6. Atomic commits on branch `refactor/quartz-prep` and push to `origin`.
7. Update `CHANGELOG_RIORGANIZZAZIONE.md`.
8. Write `handoff.md` and notify parent via `send_message`.

## 2026-09-30T14:24:42Z
**Context**: Milestone M3 (Tag Taxonomy & YAML Frontmatter Enrichment)
**Content**: Heartbeat check: your progress.md showed check_tags.py and check_links.py passed and you launched Quartz build (task-105). Please provide a status update on the build, git commits, and changelog update.
**Action**: Reply with your current progress and status.
