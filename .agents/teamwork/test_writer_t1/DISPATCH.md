# Dispatch Task: Test Writer T1 (E2E Test Suite Setup)

## Mandatory Context
- Requirements: `c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas\.agents\teamwork\ORIGINAL_REQUEST.md`
- Project Architecture & Milestones: `c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas\.agents\teamwork\PROJECT.md`
- Workspace Root: `c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas`
- Prototype Scripts:
  - `c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas\.agents\teamwork\explorer_survey_3\check_links.py`
  - `c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas\.agents\teamwork\explorer_survey_3\check_tags.py`
- Test Writer Working Directory: `c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas\.agents\teamwork\test_writer_t1`

## Mandatory Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. An auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Objective & Tasks
1. Read `ORIGINAL_REQUEST.md` and `PROJECT.md`.
2. Deploy the formal test scripts `check_links.py` and `check_tags.py` to the workspace root `c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas`:
   - `check_links.py`: Checks all wikilinks `[[...]]` across `content/`. Excludes triple-backtick and inline code blocks to prevent false positives on code arrays. Resolves links according to Quartz shortest/relative resolution rules. Exits with 0 if 0 broken links, exits with 1 if broken links are detected.
   - `check_tags.py`: Checks all markdown files in `content/`. Identifies service/draft pages (`draft: true` or inside `TEMP/` or `index.md`). For 100% of non-draft markdown files, asserts presence of valid YAML `tags:` array with at least 2 hierarchical tags matching `materia/...` and `tipologia/...`. Exits with 0 if 100% compliant, exits with 1 if any non-draft note lacks valid tags.
3. Test both scripts by executing:
   ```powershell
   python check_links.py --content-dir content
   python check_tags.py --content-dir content
   ```
   (Verify `check_links.py` passes with exit code 0; `check_tags.py` exits with 1 as expected prior to M3 tagging).
4. Create `TEST_INFRA.md` at workspace root detailing the test runner, tier coverage, and pass/fail semantics.
5. Create `TEST_READY.md` at workspace root signaling the test suite is ready.
6. Commit `check_links.py`, `check_tags.py`, `TEST_INFRA.md`, and `TEST_READY.md` to `refactor/quartz-prep`:
   ```powershell
   git add check_links.py check_tags.py TEST_INFRA.md TEST_READY.md
   git commit -m "test: establish e2e verification suite with check_links and check_tags"
   git push origin refactor/quartz-prep
   ```

7. Update `CHANGELOG_RIORGANIZZAZIONE.md` Actions Log with this commit.
8. Write `handoff.md` and report back via `send_message`.

## 2026-09-30T11:12:24Z
From: b5f6e973-66fb-4f1c-a7b0-ce880e3009d2
You are Test Writer T1.
Your working directory is: `c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas\.agents\teamwork\test_writer_t1`
Read `c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas\.agents\teamwork\ORIGINAL_REQUEST.md` and `c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas\.agents\teamwork\test_writer_t1\DISPATCH.md`.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. An auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Deploy and verify `check_links.py` and `check_tags.py` at workspace root.
Create `TEST_INFRA.md` and `TEST_READY.md`.
Stage, commit atomically with conventional commit message on `refactor/quartz-prep`, push to `origin`, and update `CHANGELOG_RIORGANIZZAZIONE.md`.
Write `handoff.md` and notify parent via `send_message`.
