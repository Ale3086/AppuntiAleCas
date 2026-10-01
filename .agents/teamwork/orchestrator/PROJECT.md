# Project: Quartz Vault Reorganization & Optimization

## Architecture
- **Vault Root**: `content/`
- **Main Macro-Topics**: `Informatica`, `Inglese`, `Matematica`, `Sistemi e reti`, `TIPSIT`
- **Asset Directory**: `content/Zimmagini/` (images, diagrams)
- **Staging / Temp Directory**: `content/TEMP/`
- **Publishing Engine**: Quartz v5.0.0 (`quartz.config.yaml`, `quartz/bootstrap-cli.mjs`)
- **Verification Harnesses**: `check_links.py`, `check_tags.py`, `node ./quartz/bootstrap-cli.mjs build`
- **Change Tracking**: Git branch `refactor/quartz-prep`, `CHANGELOG_RIORGANIZZAZIONE.md`

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| F1 | Git Branch Setup | Create and switch to branch `refactor/quartz-prep` | M1 | ORIGINAL_REQUEST §R1 |
| F2 | Atomic Conventional Commits | Atomic commits for each logical change with conventional messages | M1, M2, M3, M4 | ORIGINAL_REQUEST §R1 |
| F3 | Changelog Maintenance | Maintain `CHANGELOG_RIORGANIZZAZIONE.md` with action log, commit hashes, and file states | M1, M2, M3, M4 | ORIGINAL_REQUEST §R1 |
| F4 | Remote Branch Push | Automatically push `refactor/quartz-prep` to remote `origin` | M1, M2, M3, M4 | ORIGINAL_REQUEST §R1 |
| F5 | Special Note Format Preservation | Preserve existing format of vocabulary cards (`<details><summary>`), cheat sheets | M2 | ORIGINAL_REQUEST §R2 |
| F6 | Redundant Note Identification & Safe Merge | Identify monolithic duplicate (`Senza nome.md`) vs 10 split HTML notes, preserve data, track in Safe-Delete | M2 | ORIGINAL_REQUEST §R2, §R4 |
| F7 | Vault Cleaning & Encoding Fixes | Fix folder name encoding (`Digitalizzazione e Multimedialit`), fix typo (`Cerificazione`), link Matematica in root `index.md` | M2 | ORIGINAL_REQUEST §R2 |
| F8 | Macro-topic Vault Organization | Ensure clean structure across 5 macro-topics (`Informatica`, `Inglese`, `Matematica`, `Sistemi e reti`, `TIPSIT`) | M2 | ORIGINAL_REQUEST §R2 |
| F9 | Wikilink Integrity & Auto-Update | Automatically update all wikilinks (`[[...]]`) to preserve 0 broken links invariant | M2 | ORIGINAL_REQUEST §R2 |
| F10 | Hierarchical Tag Taxonomy | Structured 2-axis tag taxonomy (`materia/argomento`, `tipologia/concetto`) covering 100% of notes | M3 | ORIGINAL_REQUEST §R3 |
| F11 | YAML Frontmatter Enrichment | Add hierarchical `tags:` array to all 101 non-draft content notes; strip UTF-8 BOMs | M3 | ORIGINAL_REQUEST §R3 |
| F12 | Service Page Draft Flagging | Add `draft: true` to all 43 subfolder `index.md` and 12 `TEMP/` files; keep root `content/index.md` non-draft | M3 | ORIGINAL_REQUEST §R3 |
| F13 | Safe-Delete Logging | Register all deletion candidates (26 zero-byte stubs, duplicate `Senza nome.md`, unreferenced assets) in CHANGELOG with path, summary, technical reason | M2 | ORIGINAL_REQUEST §R4 |
| F14 | Wikilink Verification Tool | Script `check_links.py` at workspace root verifying 0 broken wikilinks | T1, M4 | ORIGINAL_REQUEST Acceptance |
| F15 | Tag Verification Tool | Script `check_tags.py` at workspace root verifying 100% non-draft notes have valid `tags:` array | T1, M4 | ORIGINAL_REQUEST Acceptance |
| F16 | Quartz Build Verification | `node ./quartz/bootstrap-cli.mjs build` runs with zero fatal errors | M4 | ORIGINAL_REQUEST Acceptance |
| F17 | Git History Audit | Verify atomic conventional commits on `refactor/quartz-prep` | M4 | ORIGINAL_REQUEST Acceptance |
| F18 | Changelog Verification | Verify `CHANGELOG_RIORGANIZZAZIONE.md` completeness with Safe-Delete section | M4 | ORIGINAL_REQUEST Acceptance |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| T1 | E2E Test Suite Setup | Author and verify `check_links.py` and `check_tags.py` at workspace root; establish `TEST_INFRA.md` & `TEST_READY.md` | Survey | DONE |
| M1 | Git Branch & CHANGELOG Init | Create/switch branch `refactor/quartz-prep`, initialize `CHANGELOG_RIORGANIZZAZIONE.md`, first atomic commit & push | Survey | DONE |
| M2 | Vault Reorganization & Safe-Delete | Clean UTF-8 BOMs, fix folder naming/typos, add Matematica to homepage, update wikilinks, document Safe-Delete candidates in CHANGELOG | M1 | DONE |
| M3 | Tag Taxonomy & Frontmatter Enrichment | Apply `draft: true` to 43 subfolder indexes and TEMP notes; apply hierarchical `tags:` to 101 content notes | M2 | DONE |
| M4 | Final E2E Verification & Gate | Run full test suite (`check_links.py`, `check_tags.py`, `node ./quartz/bootstrap-cli.mjs build`), push to remote, Reviewer, Challenger, and Forensic Auditor Gate | T1, M3 | DONE |

## Interface Contracts
### `check_links.py`
- Invocable via `python check_links.py --content-dir content`
- Strips fenced and inline code blocks before parsing wikilinks
- Returns exit code 0 when broken link count is 0; returns exit code 1 if any broken link is found.

### `check_tags.py`
- Invocable via `python check_tags.py --content-dir content`
- Distinguishes draft notes (`draft: true`) from substantive content notes
- For all non-draft `.md` files, verifies presence of valid YAML `tags:` array with at least 2 hierarchical tags (`materia/argomento`, `tipologia/concetto`)
- Returns exit code 0 if 100% non-draft files are compliant; returns exit code 1 otherwise.

### `CHANGELOG_RIORGANIZZAZIONE.md`
- Markdown structure tracking:
  - Header with purpose and branch name
  - "Cronologia Modifiche / Actions Log" table: Commit Hash, Timestamp, Action, Target Files, Details
  - "Procedura Safe-Delete (Candidati all'Eliminazione)" table: File Path, Tipologia / Contenuto, Dimensione, Backlinks, Motivazione Tecnica

## Code Layout
- `content/`: Vault markdown source and subfolders
- `content/Zimmagini/`: Images and diagram assets
- `content/TEMP/`: Staging / draft material
- `check_links.py`: Link verification script at project root
- `check_tags.py`: Tag verification script at project root
- `CHANGELOG_RIORGANIZZAZIONE.md`: Project change log at project root
- `.agents/teamwork/`: Team coordination, logs, state files
