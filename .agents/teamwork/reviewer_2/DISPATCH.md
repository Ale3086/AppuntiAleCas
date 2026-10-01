# Dispatch Task: Reviewer 2 (Tag Taxonomy, Frontmatter Syntax & Quartz Build)

## Mandatory Context
- Requirements: `c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas\.agents\teamwork\ORIGINAL_REQUEST.md`
- Project Architecture & Milestones: `c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas\.agents\teamwork\PROJECT.md`
- Workspace Root: `c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas`
- Reviewer Working Directory: `c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas\.agents\teamwork\reviewer_2`
- Test Ready Spec: `c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas\TEST_READY.md`

## Objectives
1. Read `ORIGINAL_REQUEST.md`, `PROJECT.md`, and `TEST_READY.md`.
2. Verify Tag Taxonomy & Frontmatter (R3):
   - Confirm all 101 non-draft content notes contain valid hierarchical tags `[materia/argomento, tipologia/concetto]`.
   - Confirm 42 subfolder `index.md` and 12 `content/TEMP/` notes have `draft: true`.
   - Confirm root `content/index.md` remains non-draft and has navigation links to all 5 macro-topics (including `Matematica`).
   - Confirm 0 UTF-8 BOM headers exist.
3. Run the complete test suite:
   ```powershell
   python check_links.py --content-dir content
   python check_tags.py --content-dir content
   node ./quartz/bootstrap-cli.mjs build
   ```
4. Verify Quartz build output:
   - Zero fatal errors, exits with code 0.
   - Output contains emitted HTML pages, tag pages, and graph view data.
5. Conclude with an explicit verdict: `APPROVE` or `REQUEST_CHANGES`. Write `handoff.md` and notify parent via `send_message`.

## 2026-09-30T14:30:04Z
You are Reviewer 2 (Tag Taxonomy, Frontmatter Syntax & Quartz Build).
Your working directory is: `c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas\.agents\teamwork\reviewer_2`
Read `c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas\.agents\teamwork\ORIGINAL_REQUEST.md`, `c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas\.agents\teamwork\PROJECT.md`, and `c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas\.agents\teamwork\reviewer_2\DISPATCH.md`.
Examine tag taxonomy, YAML frontmatter syntax, draft flags, run check_links.py, check_tags.py, and node ./quartz/bootstrap-cli.mjs build.
Conclude with an explicit verdict: APPROVE or REQUEST_CHANGES in handoff.md, and notify parent via send_message.
