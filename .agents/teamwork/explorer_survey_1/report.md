# Vault Structure & Git Status Survey Report

**Survey Conducted:** 2026-09-30  
**Target Vault:** `c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas\content`  
**Working Directory:** `c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas\.agents\teamwork\explorer_survey_1`  
**Parent Agent:** `b5f6e973-66fb-4f1c-a7b0-ce880e3009d2`

---

## Executive Summary

The vault contains **261 total files** (156 markdown notes, 86 images, 18 PDFs, 1 `.gitattributes`) across 48 folders. The vault is actively built with **Quartz v5.0.0**, which successfully emits 552 output pages in ~38s.

Key survey findings:
1. **0 Broken Wikilinks**: Currently, all cross-note and image wikilinks resolve properly under Quartz's `shortest` link resolution setting.
2. **Tag Deficit**: Only **12 out of 156 notes** (7.7%) currently have frontmatter tags (all located in `TEMP/Sistemi e reti/`). 92.3% of notes lack tags completely, leaving the Quartz Graph View severely disconnected.
3. **Draft Status**: Exactly **0 notes** currently have `draft: true`, violating Requirement R3 which requires service pages (43 `index.md` files) and `TEMP/` files to be flagged as drafts.
4. **26 Zero-Byte Notes**: 26 completely empty `.md` files exist in the vault (20 in `Inglese/Cerificazione Inglese`, 4 in `Informatica/Cpp`, 2 in `Sistemi e reti`). Independent verification confirmed **0 backlinks** point to any of these 26 files.
5. **Exact Monolithic Duplicate**: `Informatica/HTML/html/Senza nome.md` (33 KB, 1,234 lines) is a 100% duplicate of the 10 modular files `1 Struttura Base HTML.md` through `10 Attributi HTML.md`.
6. **UTF-8 BOM Anomaly**: 39 recently generated `index.md` files contain UTF-8 BOM (`\xef\xbb\xbf`), which interferes with standard frontmatter parsing.
7. **Encoding / Typo Glitches**:
   - `content/TIPSIT/Digitalizzazione e Multimedialit` contains a corrupted UTF-8 replacement character (`\ufffd`).
   - `content/Inglese/Cerificazione Inglese` contains a spelling error (`Cerificazione` missing 't').
   - `content/index.md` omits `Matematica` from the homepage subject list.

---

## 1. Directory Tree & Note Inventory

### 1.1 Global File Distribution

| Category | File Count | Details |
| :--- | :--- | :--- |
| **Markdown Notes (`.md`)** | 156 | 43 index/MOC files, 14 vocabulary files, 23 cheat sheets/references, 12 TEMP notes, 64 general topic notes |
| **Images** | 86 | 63 `.png`, 14 `.jpg`, 3 `.jpeg`, 4 `.gif`, 2 `.webp` (68 in `Zimmagini/`, 12 in `TIPSIT/Zimmagini/`, 6 in `TEMP/TEMPT2/`) |
| **PDF Documents** | 18 | 1 in `TIPSIT/...`, 12 in `TEMP/Sistemi e reti/`, 5 in `TEMP/TPSIT/` |
| **Config / Metadata** | 1 | `.gitattributes` in `content/` |
| **Total Files** | **261** | |

### 1.2 Breakdown by Macro-Folder

```
content/
├── <root>                  (2 files: index.md, .gitattributes)
├── Informatica/            (41 files, all .md)
│   ├── Cpp/                (18 files: 6 core, 5 libraries, 4 algorithms, 3 index)
│   └── HTML/               (22 files: 10 html modules, 7 js modules, 1 monolithic duplicate, 4 index)
├── Inglese/                (61 files, all .md)
│   ├── Cerificazione .../  (35 files: 20 zero-byte stubs, 15 index files)
│   ├── Teoria/             (5 files: 4 grammar notes, 1 index)
│   └── Vocabulary/         (20 files: 14 rich vocabulary notes, 6 index)
├── Matematica/             (7 files, all .md: 6 analytical geometry/algebra notes, 1 index)
├── Sistemi e reti/         (15 files, all .md)
│   ├── Cablaggio .../      (5 files: 4 stubs, 1 index)
│   └── Modello ISO-OSI/    (9 files: 6 notes, 2 zero-byte stubs, 1 index)
├── TIPSIT/                 (32 files: 19 .md, 12 .png, 1 .pdf)
│   ├── Codici di .../      (1 file: index.md)
│   ├── Digitalizzazione... (6 files: 5 theory notes, 1 index)
│   ├── FileSystem/         (3 files: 2 terminal guides, 1 index)
│   ├── Operazioni coi...   (5 files: 3 theory notes, 1 index, 1 pdf)
│   ├── Sistemi operativi/  (4 files: 3 theory notes, 1 index)
│   └── Zimmagini/          (12 png diagrams)
├── Zimmagini/              (68 image files)
└── TEMP/                   (35 files: 12 .md, 17 .pdf, 6 .png)
    ├── Sistemi e reti/     (12 .md notes, 12 .pdf originals)
    ├── TEMPT2/             (6 .png screenshots)
    └── TPSIT/              (5 .pdf scanned homeworks)
```

---

## 2. Note Classification & Formats

### 2.1 Vocabulary Notes (14 files)
- **Location:** `content/Inglese/Vocabulary/` across 5 thematic categories:
  - `01. Personal Life/`: `Family and Life Stages.md`, `Food and Restaurants.md`, `Health and Illnesses.md`, `Personality and Feelings.md`
  - `02. Work and Education/`: `Education and Learning.md`, `Technology and Internet.md`, `Work and Careers.md`
  - `03. Society and World/`: `Crime and Law.md`, `Environment and Nature.md`, `Politics and Society.md`
  - `04. Leisure and Travel/`: `Media, Books and TV.md`, `Travel and Airport.md`
  - `05. Word Formation/`: `Compound Words.md`, `Prefixes and Suffixes.md`
- **Format:** Interactive `<details><summary>` accordion flashcards with `<b style="color: #569cd6;">` highlights and bilingual translations.
- **Requirement R2 Compliance:** This formatting is clean, functional, and must be preserved verbatim. Frontmatter tags should be added at the top without altering the HTML structure.

### 2.2 Cheat Sheets, Formula Sheets & Reference Guides (23 files)
- **C++ Standard Libraries (4 files):** `algorithm.md`, `iostream.md`, `string.md`, `vector.md` in `Informatica/Cpp/Librerie/`. Formatted with internal index anchors (`[[#func]]`), syntax tables, and C++ code blocks.
- **Sorting Algorithms (3 files):** `Bubble sort.md`, `Insertion sort.md`, `Selection Sort.md` in `Informatica/Cpp/Teoria/Algoritmi di ordinamento/`.
- **Web Reference Guides (17 files):**
  - HTML (10 files): `1 Struttura Base HTML.md` to `10 Attributi HTML.md`
  - JavaScript (7 files): `1 Fondamentali.md` to `7 DOM.md`
- **Terminal Command Guides (2 files):** `Guida ai comandi terminali Linux.md` (12.7 KB), `Guida ai comandi terminali Windows.md` (11.1 KB) in `TIPSIT/FileSystem/`.
- **Mathematics Formulae & Theory (6 files):** `01 - La Retta.md` through `06 - Algebra e Irrazionali.md` in `Matematica/`. Formatted with LaTeX formulas (`$$ ... $$`), color styling (`\color{#4da6ff}x`), and Obsidian callouts (`[!info]`, `[!tip]`, `[!abstract]`).

### 2.3 Service Pages & MOCs (43 files)
- Exactly 43 `index.md` files exist across the directory tree.
- Most currently consist of 4 lines:
  ```yaml
  ---
  title: ...
  description: ...
  ---
  ```
- **Crucial Finding:** 39 of these files currently have a UTF-8 BOM (`\xef\xbb\xbf`) header.
- **Action Required by R3:** All 43 index files must receive `draft: true` in their YAML frontmatter.

### 2.4 Temporary & Staging Notes (12 files)
- Located in `content/TEMP/Sistemi e reti/`.
- High quality notes covering: Computer architecture, Moore state machines, finite state automata, analog/digital signals, system properties, communication channels, logic gates & boolean algebra, network topologies, sequence recognizers, structured cabling, transition tables.
- **Action Required by R3:** Must be marked `draft: true` while inside `TEMP/`, or merged into main subject folders if promoted.

### 2.5 Non-Markdown Assets (105 files)
- **65 Referenced Images:** Successfully resolved via shortest wikilinks (`![[image.ext]]`).
- **21 Unreferenced Images:**
  - 6 PNG screenshots in `TEMP/TEMPT2/`
  - 4 unused math diagrams in `Zimmagini/` (`math_coniche.png`, `math_diseq.png`, `math_gonio.png`, `math_retta.png`)
  - 11 legacy pasted images in `Zimmagini/`
- **18 PDFs:**
  - 1 referenced: `TIPSIT/Operazioni coi binari e conversioni/InfograficaConversioni_e_OperazioniBinarie.pdf`
  - 17 unreferenced in `TEMP/` (12 in `TEMP/Sistemi e reti/`, 5 in `TEMP/TPSIT/`)

---

## 3. Git Status & Workflow Assessment

### Current State
- **Branch:** `main` (synchronized with `origin/main`)
- **Remote:** `https://github.com/Ale3086/AppuntiAleCas.git`
- **Working Tree:** Clean (untracked `.agents/` directory only)
- **Recent Git Log:**
  - `0ac4cfb` feat: add missing index files for new folders and new notes
  - `f77a765` fix: disable SPA for breadcrumbs, hide properties via CSS, add folder descriptions
  - `f066226` fix: convert all standard markdown images to wikilinks to fix broken relative paths
  - `be58d48` fix: set markdownLinkResolution to shortest to properly resolve wikilinks to zimmagini
  - `bebac42` fix: revert trailing slashes from homepage now that absolute linking is enabled

### Alignment with Requirement R1
- Implementer must create and checkout branch `refactor/quartz-prep`:
  `git checkout -b refactor/quartz-prep`
- Every logical operation must be committed atomically with conventional commit messages (`feat:`, `fix:`, `refactor:`, `docs:`, `chore:`).
- `CHANGELOG_RIORGANIZZAZIONE.md` must be maintained at the workspace root.
- Automatic push to `origin/refactor/quartz-prep`.

---

## 4. Redundant Notes & Candidates for Safe-Delete / Merging

In accordance with **R2** (Content Refactoring & Unification) and **R4** (Safe-Delete Procedure), the following candidates have been identified:

### 4.1 Candidate 1: Full Monolithic Duplicate
- **File:** `content/Informatica/HTML/html/Senza nome.md`
- **Size / Lines:** 33,115 bytes / 1,234 lines
- **Summary:** Complete HTML reference document with table of contents and 10 chapters.
- **Technical Reason:** The note was split into 10 modular notes (`1 Struttura Base HTML.md` through `10 Attributi HTML.md`). Retaining both creates 33 KB of duplicate content, redundant search indexing, and 165 internal anchor links.
- **Recommended Action:** Safe-delete candidate for `CHANGELOG_RIORGANIZZAZIONE.md`.

### 4.2 Candidate 2: 26 Zero-Byte Placeholder Notes
All 26 notes have **0 bytes** and **0 backlinks**:
1. `content/Informatica/Cpp/Gli array.md` (0 B)
2. `content/Informatica/Cpp/Le funzioni e procedure.md` (0 B)
3. `content/Informatica/Cpp/Puntatori.md` (0 B)
4. `content/Informatica/Cpp/Teoria/Caratteristiche.md` (0 B)
5. `content/Sistemi e reti/Modello ISO-OSI/Collegamenti LAN e MAN.md` (0 B)
6. `content/Sistemi e reti/Modello ISO-OSI/Standard basi cablaggio.md` (0 B)
7. `content/Inglese/Cerificazione Inglese/Competenze richieste per ogni livello.md` (0 B)
8. `content/Inglese/Cerificazione Inglese/Cosa devi fare nella prova.md` (0 B)
9. `content/Inglese/Cerificazione Inglese/Introduzione.md` (0 B)
10. `content/Inglese/Cerificazione Inglese/Speaking/Senza nome.md` (0 B)
11-14. `content/Inglese/Cerificazione Inglese/Speaking/Strategie/` (4 files: `For only you.md`, `For you and candidate 2.md`, `For you and the interviewer.md`, `For you, candidate 2 and the interviewer.md`) (0 B each)
15-22. `content/Inglese/Cerificazione Inglese/Reading/Strategie/` (8 files: `For multiple matching.md`, `For multiple-choice gap-fill.md`, `For open gap-fill.md`, `For reading and multiple-choice comprehension.md`, `For reading and text comprehension.md`, `For trasformation with key word.md`, `For word formation gap-fill.md`, `Strategies for each gap.md`) (0 B each)
23-26. `content/Inglese/Cerificazione Inglese/Listening/Strategie/` (4 files: `For multiple choice 1.md`, `For multiple choice 2.md`, `For multiple matching.md`, `For text or sentence completion.md`) (0 B each)
- **Recommended Action:** List as deletion candidates in `CHANGELOG_RIORGANIZZAZIONE.md`, or if user wishes to keep placeholders, add `draft: true` and a stub note body.

### 4.3 Candidate 3: Sub-100-Char Draft Stubs
- `content/Sistemi e reti/Cablaggio strutturato/Tipologie di cavi, i tipi di segnali e il canale di comunicazione.md` (58 bytes, 9 lines): Contains only 3 empty headers (`## I cavi`, `## I segnali`, `## Il canale di comunicazione`).
- `content/Sistemi e reti/Cablaggio strutturato/Normativa ISO-OSI 11801.md` (274 bytes): 2 lines of text + empty headers. Overlaps with `Sistemi e reti/Modello ISO-OSI/Modello ISO-OSI 11801.md`.
- `content/Sistemi e reti/Cablaggio strutturato/Tipologia e Topologia reti.md` (457 bytes): Fragmented notes superseded by `TEMP/Sistemi e reti/Reti informatiche - Tipologie e topologie.md`.
- **Recommended Action:** Merge into the comprehensive notes and record in `CHANGELOG_RIORGANIZZAZIONE.md`.

### 4.4 Candidate 4: Unreferenced Assets in Staging
- 17 unreferenced PDFs in `content/TEMP/` (5 in `TEMP/TPSIT/`, 12 in `TEMP/Sistemi e reti/`).
- 6 unreferenced PNG screenshots in `content/TEMP/TEMPT2/`.
- 11 unreferenced pasted images in `content/Zimmagini/`.
- **Recommended Action:** List in `CHANGELOG_RIORGANIZZAZIONE.md` under Safe-Delete or Archive.

---

## 5. Proposed Hierarchical Tag Taxonomy (R3)

To ensure a dense, functional Graph View without orphan tags, a 2-tier hierarchical taxonomy (`materia/argomento`, `tipologia/concetto`) is proposed:

```yaml
# Informatica
tags: [informatica/cpp, tipologia/teoria]
tags: [informatica/cpp/librerie, tipologia/riferimento]
tags: [informatica/cpp/algoritmi, tipologia/algoritmi-ordinamento]
tags: [informatica/web/html, tipologia/guida]
tags: [informatica/web/javascript, tipologia/guida]

# Inglese
tags: [inglese/grammatica, tipologia/teoria]
tags: [inglese/vocabolario, tipologia/personal-life]
tags: [inglese/vocabolario, tipologia/work-education]
tags: [inglese/vocabolario, tipologia/society-world]
tags: [inglese/vocabolario, tipologia/leisure-travel]
tags: [inglese/vocabolario, tipologia/word-formation]
tags: [inglese/certificazione, tipologia/strategie]

# Matematica
tags: [matematica/geometria-analitica, tipologia/formule]
tags: [matematica/trigonometria, tipologia/formule]
tags: [matematica/algebra, tipologia/esercizi]

# Sistemi e reti
tags: [sistemi-e-reti/cablaggio-strutturato, tipologia/standard]
tags: [sistemi-e-reti/modello-iso-osi, tipologia/architettura]
tags: [sistemi-e-reti/segnali, tipologia/telecomunicazioni]
tags: [sistemi-e-reti/topologie-reti, tipologia/infrastruttura]

# TIPSIT
tags: [tipsit/digitalizzazione-multimedialita, tipologia/teoria]
tags: [tipsit/operazioni-binarie, tipologia/esercizi]
tags: [tipsit/sistemi-operativi, tipologia/architettura]
tags: [tipsit/filesystem, tipologia/guida-comandi]
```

---

## 6. Structural & Encoding Remediation Plan

1. **Folder Name Repair:**
   - Rename `content/TIPSIT/Digitalizzazione e Multimedialit` -> `content/TIPSIT/Digitalizzazione e Multimedialità` (fixing `\ufffd`).
   - Rename `content/Inglese/Cerificazione Inglese` -> `content/Inglese/Certificazione Inglese` (fixing typo).
2. **Homepage (`content/index.md`) Update:**
   - Add navigation card for `Matematica` (`## 📐 [Matematica](Matematica/)`).
3. **BOM Removal:**
   - Strip UTF-8 BOM (`\xef\xbb\xbf`) from all 39 index files and save as clean UTF-8.
4. **Draft Flagging:**
   - Add `draft: true` to all 43 `index.md` files and any notes remaining in `TEMP/`.
5. **Tagging Automation:**
   - Apply hierarchical YAML tags to 100% of non-draft markdown notes.
