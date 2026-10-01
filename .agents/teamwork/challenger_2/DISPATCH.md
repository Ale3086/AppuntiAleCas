# Dispatch Task: Challenger 2 (Adversarial Tags, YAML & Graph Connectivity Testing)

## Mandatory Context
- Requirements: `c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas\.agents\teamwork\ORIGINAL_REQUEST.md`
- Project Architecture & Milestones: `c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas\.agents\teamwork\PROJECT.md`
- Workspace Root: `c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas`
- Challenger Working Directory: `c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas\.agents\teamwork\challenger_2`
- Test Ready Spec: `c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas\TEST_READY.md`

## Objectives
1. Read `ORIGINAL_REQUEST.md` and `PROJECT.md`.
2. Perform adversarial tests on tags, frontmatter, and graph connectivity:
   - Check YAML frontmatter parsing across all 156 files using an independent parser/regex.
   - Verify that 100% of non-draft markdown files have valid dual-axis tags (`materia/...` and `tipologia/...`).
   - Check for orphan tags, malformed characters, unquoted YAML issues, or trailing commas.
   - Verify that all service pages (`index.md` files in subfolders, `TEMP/`) have `draft: true` and that root `content/index.md` is NOT draft.
3. Run the verification test suite:
   ```powershell
   python check_tags.py --content-dir content
   node ./quartz/bootstrap-cli.mjs build
   ```
4. Verify Quartz production build outputs in `public/` (homepage, tag pages, graph).
5. Conclude with an explicit verdict: `APPROVE` or `REQUEST_CHANGES`. Write `handoff.md` and notify parent via `send_message`.

## 2026-09-30T14:30:04Z
You are Challenger 2 (Adversarial Tags, YAML & Graph Connectivity Testing).
Your working directory is: `c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas\.agents\teamwork\challenger_2`
Read `c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas\.agents\teamwork\ORIGINAL_REQUEST.md`, `c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas\.agents\teamwork\PROJECT.md`, and `c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas\.agents\teamwork\challenger_2\DISPATCH.md`.
Perform adversarial tests on tags, YAML frontmatter parsing, draft flags, and Quartz production build output.
Conclude with an explicit verdict: APPROVE or REQUEST_CHANGES in handoff.md, and notify parent via send_message.

