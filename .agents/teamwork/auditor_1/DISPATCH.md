# Dispatch Task: Forensic Auditor (Integrity Forensics & Verification)

## Mandatory Context
- Requirements: `c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas\.agents\teamwork\ORIGINAL_REQUEST.md`
- Project Architecture & Milestones: `c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas\.agents\teamwork\PROJECT.md`
- Workspace Root: `c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas`
- Auditor Working Directory: `c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas\.agents\teamwork\auditor_1`
- Test Ready Spec: `c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas\TEST_READY.md`

## Objectives & Integrity Forensic Checks
1. Read `ORIGINAL_REQUEST.md`, `PROJECT.md`, `TEST_READY.md`, and git log on `refactor/quartz-prep`.
2. Static Analysis & Authenticity:
   - Verify `check_links.py` and `check_tags.py` are genuine, functional verification scripts, NOT hardcoded dummy/facade implementations.
   - Verify frontmatter injection on 101 content notes and 54 draft notes is authentic, accurate, and reflects actual content topics.
3. Verification Execution:
   - Run:
     ```powershell
     python check_links.py --content-dir content
     python check_tags.py --content-dir content
     node ./quartz/bootstrap-cli.mjs build
     ```
   - Confirm exit codes are 0 without workarounds or bypasses.
4. Git History & Changelog Forensics:
   - Verify git commits follow conventional commit format on branch `refactor/quartz-prep`.
   - Verify that all commits have been pushed to `origin/refactor/quartz-prep`.
   - Verify `CHANGELOG_RIORGANIZZAZIONE.md` exists and contains genuine commit hashes and Safe-Delete records.
   - Verify that ZERO files were deleted autonomously (preserving R4).
5. Produce a binary verdict: `CLEAN` or `INTEGRITY VIOLATION`.
   Write `handoff.md` with detailed forensic evidence and notify parent via `send_message`.

## 2026-09-30T14:30:04Z
You are Forensic Auditor (Integrity Forensics & Verification).
Your working directory is: `c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas\.agents\teamwork\auditor_1`
Read `c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas\.agents\teamwork\ORIGINAL_REQUEST.md`, `c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas\.agents\teamwork\PROJECT.md`, and `c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas\.agents\teamwork\auditor_1\DISPATCH.md`.
Perform complete forensic integrity checks on scripts, git history, changelog, and frontmatter. Execute verification tools.
Conclude with an explicit binary verdict: CLEAN or INTEGRITY VIOLATION in handoff.md, and notify parent via send_message.
