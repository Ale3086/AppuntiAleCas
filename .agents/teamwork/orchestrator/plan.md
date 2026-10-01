# Project Execution Plan

## Objective
Reorganize, clean, and optimize the Obsidian vault for Quartz publishing, preserving existing structures while enriching tags for Graph View and tracking changes with atomic Git commits.

## Workflow Phases

### Phase 0: Survey & Mapping (3 Parallel Explorers)
- Explorer 1 (`teamwork_preview_explorer_survey_vault`):
  - Enumerate all folders, notes, cheat sheets, vocabulary, MOCs, temp files.
  - Assess current Git status, branches, remote tracking.
- Explorer 2 (`teamwork_preview_explorer_survey_quartz`):
  - Investigate Quartz installation, dependencies, `quartz.config.ts`, `node ./quartz/bootstrap-cli.mjs build`.
  - Document required frontmatter (title, tags, draft), formatting rules, and build constraints.
- Explorer 3 (`teamwork_preview_explorer_survey_links_tags`):
  - Investigate current wikilink conventions, tag usage, orphan tags, broken links.
  - Identify requirements for `check_links.py` and `check_tags.py`.

### Phase 1: Synthesis & Milestone Decomposition
- Merge survey reports into `PROJECT.md § Feature Inventory` and architecture.
- Define interface contracts, file ownership, and milestone schedule.
- Determine execution strategy (Dual Track: Verification vs Implementation).

### Phase 2: Dual Track Implementation & Verification Suite
- **Track 1 (E2E Verification)**:
  - Worker writes `check_links.py` and `check_tags.py` test harness.
  - Establish `TEST_READY.md`.
- **Track 2 (Implementation Track)**:
  - Milestone 1: Git branch `refactor/quartz-prep` initialization & `CHANGELOG_RIORGANIZZAZIONE.md`.
  - Milestone 2: Vault reorganization & note merging (safe delete tracking, macro-topic folders).
  - Milestone 3: Tag taxonomy generation & YAML frontmatter enrichment (`tags: [materia/argomento, ...]`, `draft: true`).
  - Milestone 4: Wikilink integrity update.

### Phase 3: Final Verification & Audit Gate
- Run `check_links.py` (0 broken links).
- Run `check_tags.py` (100% non-drafts tagged).
- Run `node ./quartz/bootstrap-cli.mjs build` (0 fatal errors).
- Verify git history (atomic commits on `refactor/quartz-prep`).
- Verify `CHANGELOG_RIORGANIZZAZIONE.md` and safe-delete list.
- Dispatch Reviewers, Challengers, and Forensic Auditor (`teamwork_preview_auditor`).
- Gate pass and final report to parent.
