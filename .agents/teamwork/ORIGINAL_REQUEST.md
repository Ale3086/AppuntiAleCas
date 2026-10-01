# Original User Request

## 2026-09-30T11:01:09Z

Reorganize, clean, and optimize the Obsidian vault for Quartz publishing, preserving existing structures while enriching tags for Graph View and tracking changes with atomic Git commits.

Working directory: `c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas`
Integrity mode: development

## Requirements

### R1. Git Workflow and Automations
- Create and switch to branch `refactor/quartz-prep`.
- Atomic commits for each logical change with conventional messages.
- Maintain a `CHANGELOG_RIORGANIZZAZIONE.md` file tracking actions and file states.
- Push to the remote branch automatically.

### R2. Content Refactoring and Unification
- Preserve the format of existing specific notes (vocabulary, cheat sheets).
- Merge redundant or highly complementary notes without losing data.
- Restructure unclear notes.
- Subdivide and organize the vault into macro-topic folders based on the current main folders (e.g., Matematica, TIPSIT, Inglese).
- Automatically update all wikilinks (`[[...]]`) to prevent broken links.

### R3. Graph View Networking and Tags
- Deduce macro-topics from current main folders to invent a structured, hierarchical tag taxonomy.
- Add these hierarchical YAML tags (`tags: [materia/argomento, tipologia/concetto]`) to all files to create a dense, functional Graph View without orphan tags.
- Add `draft: true` to service pages: index/MOC files, non-markdown files (like scripts), and files inside `TEMP` directories.

### R4. Safe-Delete Procedure
- Never delete files autonomously.
- List candidates for deletion in `CHANGELOG_RIORGANIZZAZIONE.md` with path, content summary, and technical reason.

## Acceptance Criteria

### Verification
- [ ] A script `check_links.py` (or similar) executes and confirms there are zero broken `[[wikilinks]]` across the vault.
- [ ] A script `check_tags.py` executes and confirms that 100% of non-draft markdown files contain a valid `tags:` YAML array.
- [ ] `node ./quartz/bootstrap-cli.mjs build` runs successfully with zero fatal errors, verifying all YAML frontmatter is valid.
- [ ] `git log` shows atomic commits following conventional commit syntax on the `refactor/quartz-prep` branch.
- [ ] `CHANGELOG_RIORGANIZZAZIONE.md` exists, contains a log of actions with commit hashes, and a specific "Safe-Delete" section.
