# Test Infrastructure & Verification Suite

## Overview
This document specifies the end-to-end (E2E) verification infrastructure for the Quartz / Obsidian vault reorganization. The test suite guarantees link integrity, frontmatter schema compliance, hierarchical tag networking for the Graph View, and successful compilation by the Quartz publishing engine.

---

## 1. Test Harness Components

The automated verification suite consists of two standalone Python tools (standard library only, zero external dependencies) and the Quartz compilation engine:

### 1.1 `check_links.py` (Wikilink & Media Embed Integrity)
- **File**: `check_links.py` (workspace root)
- **Purpose**: Verifies all Obsidian/Quartz internal links (`[[...]]`), media embeds (`![[...] ]`), and section anchors (`[[#heading]]`, `[[note#heading]]`).
- **Sanitization**: Strips fenced code blocks (```` ``` ```` and `~~~`) and inline code (`...`) to prevent false positives on code array syntax (e.g. JavaScript multi-dimensional arrays `[[1, [2]], [3]]`).
- **Resolution Rules**: Follows Quartz `markdownLinkResolution: shortest`:
  1. Exact relative path from vault root (`content/`)
  2. Relative path from current note's directory
  3. Shortest unique match by stem or filename across all notes and assets
  4. Media embeds matched against image/pdf/asset files (e.g. in `content/Zimmagini/`)
  5. Section anchor verification against normalized and slugified note headings
- **Exit Codes**:
  - `0`: 100% of links resolve successfully (0 broken links).
  - `1`: One or more broken links or missing anchors detected.
  - `2`: Invalid directory or invocation arguments.

### 1.2 `check_tags.py` (Frontmatter & Hierarchical Tag Taxonomy)
- **File**: `check_tags.py` (workspace root)
- **Purpose**: Asserts that 100% of substantive content notes contain valid YAML frontmatter and hierarchical tags for Graph View networking.
- **Service / Draft Page Detection**:
  - Automatically identifies service, MOC, and staging pages:
    - Notes containing `draft: true` in YAML frontmatter.
    - Notes residing within `TEMP/` staging directories.
    - `index.md` service/MOC files (including subfolder index files and root `content/index.md`).
  - Draft and service notes are skipped from educational content tag enforcement.
- **Taxonomy Validation Rules**:
  - Non-draft markdown notes must contain a valid YAML `tags:` array.
  - Array must contain at least 2 hierarchical tags (`len >= 2`).
  - All tags must be hierarchical (contain `/`).
  - At least one tag must belong to the **materia** axis: prefix `materia/`, `informatica/`, `inglese/`, `matematica/`, `sistemi-e-reti/`, or `tipsit/`.
  - At least one tag must belong to the **tipologia** axis: prefix `tipologia/` (e.g. `tipologia/teoria`, `tipologia/reference`, `tipologia/esercizi`, `tipologia/guida-pratica`, `tipologia/vocabolario`, `tipologia/strategie`, `tipologia/algoritmo`, `tipologia/sintesi`).
- **Exit Codes**:
  - `0`: 100% of non-draft markdown files pass validation.
  - `1`: Any non-draft note lacks frontmatter or fails tag requirements.
  - `2`: Invalid directory or invocation arguments.

### 1.3 `node ./quartz/bootstrap-cli.mjs build` (Quartz Engine Build)
- **Purpose**: Compiles the entire markdown vault into production static HTML artifacts.
- **Validation**:
  - Validates markdown AST, component plugins, and frontmatter syntax.
  - Asserts zero fatal errors during build.

---

## 2. Verification Tiers & Matrix

| Tier | Verifier | Scope | Pass Criteria | Current Status (T1) |
|---|---|---|---|---|
| **Tier 1: Links** | `python check_links.py --content-dir content` | All wikilinks, embeds, anchors across `content/` | 0 broken links (Exit Code 0) | **PASS** (244 links verified, 0 broken) |
| **Tier 2: Tags** | `python check_tags.py --content-dir content` | All non-draft `.md` notes in `content/` | 100% compliance with dual-axis taxonomy (Exit Code 0) | **FAIL (Expected)**: 101 content notes lack tags prior to M3 |
| **Tier 3: Build** | `node ./quartz/bootstrap-cli.mjs build` | Full vault compilation | Clean build, 0 fatal errors (Exit Code 0) | **PASS** (156 files compiled to `public/`) |
| **Tier 4: Git & Log**| `git log`, `CHANGELOG_RIORGANIZZAZIONE.md` | Commit history & Safe-Delete register | Atomic conventional commits on `refactor/quartz-prep` | **PASS** (Atomic commits tracked with changelog) |

---

## 3. How to Run the Tests

### 3.1 Individual Verification Commands

Run wikilink verification:
```powershell
python check_links.py --content-dir content
```

Run tag and frontmatter verification:
```powershell
python check_tags.py --content-dir content
```

Run tag verification with verbose service/draft file output:
```powershell
python check_tags.py --content-dir content --verbose
```

Run Quartz build verification:
```powershell
node ./quartz/bootstrap-cli.mjs build
```

### 3.2 Full Verification Suite Pipeline (PowerShell)
```powershell
python check_links.py --content-dir content
if ($LASTEXITCODE -ne 0) { Write-Error "Wikilinks verification failed"; exit 1 }

python check_tags.py --content-dir content
if ($LASTEXITCODE -ne 0) { Write-Error "Tag verification failed"; exit 1 }

node ./quartz/bootstrap-cli.mjs build
if ($LASTEXITCODE -ne 0) { Write-Error "Quartz build failed"; exit 1 }

Write-Host "All verification tiers passed successfully!" -ForegroundColor Green
```

---

## 4. Milestone Progression & Invariants

1. **Milestone T1 (Current)**:
   - Test harness established at project root (`check_links.py`, `check_tags.py`, `TEST_INFRA.md`, `TEST_READY.md`).
   - `check_links.py` passes with exit code 0.
   - `check_tags.py` exits with 1, providing the exact failure report that Milestone M3 will resolve.
2. **Milestone M2 (Vault Reorganization)**:
   - Must preserve `check_links.py` exit code 0 by updating wikilinks during folder renames or file moves.
   - Populates Safe-Delete table in `CHANGELOG_RIORGANIZZAZIONE.md`.
3. **Milestone M3 (Tag Taxonomy & Frontmatter)**:
   - Flags 43 subfolder `index.md` files and 12 `TEMP/` files with `draft: true`.
   - Injects hierarchical tags (`[materia/argomento, tipologia/concetto]`) into all 101 content notes.
   - Brings `check_tags.py` to exit code 0.
4. **Milestone M4 (Final Gate)**:
   - Executes all verification tiers (`check_links.py`, `check_tags.py`, `node ./quartz/bootstrap-cli.mjs build`).
   - All tests must pass with exit code 0 before final delivery.
