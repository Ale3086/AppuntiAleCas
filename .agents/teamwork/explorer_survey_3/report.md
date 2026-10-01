# Comprehensive Investigation Report: Wikilinks, Tags, Graph View & Verification Scripts

**Working Directory**: `c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas\.agents\teamwork\explorer_survey_3`  
**Explorer**: Links and Tags Explorer  
**Date**: 2026-09-30  
**Status**: Completed  

---

## 1. Executive Summary

This investigation analyzed all 156 markdown files and 105 non-markdown assets within the `content/` directory of the Obsidian vault configured for Quartz publishing. The key findings are:

- **Frontmatter & Tags Gap**: Out of 156 markdown notes, **133 files (85.3%) completely lack YAML frontmatter**. Only **12 files (7.7%)** currently contain a `tags:` property in their frontmatter, and all 12 are located inside `TEMP/Sistemi e reti/` using flat, non-hierarchical tags. Currently, **0 files** have `draft: true`.
- **Graph View Disconnection**: Inter-note connectivity is currently extremely sparse: **142 out of 156 notes (91.0%)** have zero incoming or outgoing inter-note links in the graph view.
- **Wikilink Health**: Across the vault, there are **244 total wikilink references** (79 inter-note/asset links, 65 media embeds `![[]]`, and 165 intra-note section anchors `[[#heading]]`). When properly excluding code fences (which contain JavaScript nested arrays like `[[1,[2]]`), there are **zero broken links** in the vault. All 79 target notes/assets exist, and all 165 internal anchors match existing markdown headings.
- **Service Pages & Draft Candidates**: Exactly **55 files** qualify for `draft: true` under Requirement R3: 43 `index.md` / MOC service pages and 12 files located inside `TEMP/Sistemi e reti/`.
- **Content Notes**: Exactly **101 non-draft content notes** require hierarchical YAML tags (`tags: [materia/argomento, tipologia/concetto]`). A 100% comprehensive taxonomy has been formulated and tested across all 101 notes with zero unclassified files and zero orphan tags.
- **Verification Scripts**: Full functional specifications and working prototype scripts (`check_links.py` and `check_tags.py`) were authored and validated using only the Python standard library (no `pip install` required).

---

## 2. Vault Inventory & Directory Breakdown

The vault `content/` root contains 44 distinct subdirectories organized by subject:

| Macro-Topic Folder | Total MD Files | Content Notes (Non-Draft) | Service / MOC (`index.md`) | TEMP Files | Assets / Media |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Root (`content/`)** | 1 | 0 | 1 (`index.md`) | 0 | 0 |
| **Informatica** | 41 | 32 | 9 | 0 | 0 |
| **Inglese** | 61 | 38 | 23 | 0 | 13 |
| **Matematica** | 7 | 6 | 1 | 0 | 14 |
| **Sistemi e reti** | 15 | 12 | 3 | 0 | 25 |
| **TEMP/Sistemi e reti**| 12 | 0 | 0 | 12 | 0 |
| **TIPSIT** | 19 | 13 | 6 | 0 | 12 |
| **Zimmagini** | 0 | 0 | 0 | 0 | 41 |
| **TOTAL** | **156** | **101** | **43** | **12** | **105** |

---

## 3. Analysis of Tags & Frontmatter

### 3.1 Frontmatter Status
- **Files with Frontmatter**: 23 / 156 (14.7%)
  - 11 `index.md` files have minimal frontmatter (`title`, `description`).
  - 12 notes in `TEMP/Sistemi e reti/` have frontmatter with flat `tags:`.
- **Files without Frontmatter**: 133 / 156 (85.3%).
- **Files with `draft: true`**: 0 / 156 (0%).

### 3.2 Existing YAML Tags (Flat & Localized)
The 12 notes in `TEMP/Sistemi e reti/` contain 33 distinct flat tags:
- Most frequent: `sistemi-e-reti` (12), `automi` (5), `riconoscitore-sequenze` (2), `teoria-dei-sistemi` (2).
- Single-use tags (29 tags): `architettura-dei-calcolatori`, `hardware`, `cpu`, `memorie`, `moore`, `mealy`, `fsm`, `diagrammi-di-stato`, `segnali`, `telecomunicazioni`, `analogico-digitale`, `canale-di-comunicazione`, `multiplazione`, `commutazione`, `protocolli`, `elettronica-digitale`, `porte-logiche`, `algebra-booleana`, `classificazione`, `reti-informatiche`, `topologie-di-rete`, `lan-wan`, `overlapping`, `cablaggio-strutturato`, `norme-iso-osi`, `impianti-di-rete`, `rack`, `tabelle-di-transizione`, `sintesi-automi`.

*Limitation*: These tags are flat (no `/`), exclusively confined to `TEMP/`, and create isolated, un-nested clusters in Quartz.

### 3.3 Existing Inline Tags in Note Bodies
A few notes contain inline `#tags` at the end of the text:
- `#HTML`: 17 occurrences in `Informatica/HTML/html/*`
- `#Linguaggio_HTML`: 10 occurrences in `Informatica/HTML/html/*`
- `#JavaScript`: 7 occurrences in `Informatica/HTML/javaScript/*`
- `#Linguaggio_cpp`: 4 occurrences in `Informatica/Cpp/*`
- `#Librerie_cpp`: 4 occurrences in `Informatica/Cpp/Librerie/*`

*Limitation*: Inline tags are unstructured, uncoordinated with YAML frontmatter, and bypass Quartz's property indexing configured in `quartz.config.yaml` (`note-properties`). They should be migrated into structured frontmatter tags during refactoring.

---

## 4. Wikilink Analysis & Graph Connectivity

### 4.1 Wikilink Breakdown
Across all 156 markdown files:
- **Total Wikilinks**: 244
- **Media / Attachment Embeds (`![[...]]`)**: 65
  - Examples: `![[Pasted image 20260428183553.png|697]]`, `![[retta_es1_disegno.png]]`, `![[Sorting_bubblesort_anim.gif|683]]`
  - Targets exist in `Zimmagini/`, local `Zimmagini` subfolders, or subject directories.
- **Intra-Note Anchor Links (`[[#heading]]`)**: 165
  - Extensively used in `Informatica/HTML/html/Senza nome.md` (39 links), `Informatica/HTML/javaScript/7 DOM.md` (25 links), `Informatica/Cpp/Librerie/string.md` (16 links), `Informatica/Cpp/Librerie/vector.md` (14 links).
  - All 165 internal anchors resolve to valid headings within the note.
- **Inter-Note Links**: 79
  - Connecting `index.md` files to module notes, or between related notes (e.g. in `TIPSIT/index.md` linking to sub-module indexes `[[Sistemi operativi/index|...]]`).

### 4.2 Critical Discovery: Code Fences & False Broken Links
In `Informatica/HTML/javaScript/2 Strutture dati.md`, standard JavaScript code examples contain nested arrays:
- Line 218: `[[1,[2]],[3]].flat(Infinity)`
- Line 243: `Object.entries({a:1, b:2}) // [["a",1],["b",2]]`
- Line 297: `Object.fromEntries([["a", 1], ["b", 2]])`

If a regex parser blindly searches for `\[\[...\]\]` without stripping fenced code blocks (```` ```...``` ````) or inline code (`` `...` ``), it misidentifies `[[1,[2]]` and `[["a", 1]]` as broken wikilinks.  
**Requirement for `check_links.py`**: Fenced code blocks and inline code MUST be stripped before regex link extraction.

### 4.3 Link Resolution in Quartz & Obsidian
Quartz is configured with:
```yaml
- source: "@quartz-community/crawl-links"
  enabled: true
  options:
    markdownLinkResolution: shortest
```
Resolution logic:
1. Exact match relative to `content/`.
2. Relative match relative to current note folder (e.g., in `TIPSIT/index.md`, link `[[Sistemi operativi/index]]` resolves to `TIPSIT/Sistemi operativi/index.md`).
3. Shortest match across vault: matches filename stem anywhere in vault if unique.

When evaluated with this standard pipeline, **zero broken links** exist in the current vault.

### 4.4 Graph View Topology
- **Isolated Nodes**: 142 / 156 (91.0%)
- **Connected Nodes**: 14 / 156 (9.0%)
- **Current State**: The vault is an archipelago of disconnected notes. Notes rely on folder hierarchies rather than network links.
- **Solution via Requirement R3**: Injecting the dual-axis hierarchical tag taxonomy (`tags: [materia/argomento, tipologia/concetto]`) will connect all 101 content notes into a dense, navigable network where every note connects to both its topic cluster and its functional type cluster.

---

## 5. Hierarchical Tag Taxonomy Proposal

### 5.1 Architecture: Dual-Axis Taxonomy
To fulfill R3 without orphan tags, every content note receives at least two hierarchical tags along two complementary axes:

```
tags:
  - materia/<macro-argomento>/<sotto-argomento>   # AXIS 1: Subject Domain
  - tipologia/<natura-pedagogica>                 # AXIS 2: Pedagogical Role
  - concetto/<entita-chiave>                      # AXIS 3: Optional Cross-Cutting Concept
```

### 5.2 Axis 1: `materia/...` (Subject Taxonomy)

| Tag Path | Subject Scope | Sample Notes |
| :--- | :--- | :--- |
| `informatica/cpp/sintassi` | C++ language fundamentals, variables, pointers, structs | `Le variabili`, `Gli array`, `Puntatori`, `Gestione dei file` |
| `informatica/cpp/librerie` | C++ Standard Template Library (STL) headers | `vector`, `string`, `iostream`, `algorithm` |
| `informatica/cpp/algoritmi` | Classic algorithms in C++ | `Bubble sort`, `Insertion sort`, `Selection Sort` |
| `informatica/cpp/teoria` | General programming concepts & language characteristics | `Caratteristiche` |
| `informatica/web/html` | HTML5 semantic elements, forms, media, structure | `1 Struttura Base HTML`, `7 Form HTML e input`, `Senza nome` |
| `informatica/web/javascript` | Modern JS (ES6+), DOM, async, OOP, data structures | `1 Fondamentali`, `2 Strutture dati`, `4 Asincrono`, `7 DOM` |
| `inglese/certificazione/listening` | Cambridge/IELTS Listening exam sections | `For multiple choice 1`, `For text completion` |
| `inglese/certificazione/reading` | Reading & Use of English exam strategies | `For multiple-choice gap-fill`, `For transformation with key word` |
| `inglese/certificazione/speaking` | Speaking exam tasks & interaction guidelines | `For only you`, `For you and candidate 2` |
| `inglese/certificazione/guida` | General certification guides & level criteria | `Competenze richieste per ogni livello`, `Cosa devi fare` |
| `inglese/grammatica` | English grammar explanations & rules | `Verb Tenses`, `Conditionals`, `Passive voice` |
| `inglese/vocabolario/personal-life` | Thematic vocabulary: Personal life | `Family and Life Stages`, `Health and Illnesses` |
| `inglese/vocabolario/work-education` | Thematic vocabulary: Career, study, technology | `Work and Careers`, `Technology and Internet` |
| `inglese/vocabolario/society-world` | Thematic vocabulary: Global issues, environment | `Environment and Nature`, `Crime and Law` |
| `inglese/vocabolario/leisure-travel` | Thematic vocabulary: Travel, airport, media | `Travel and Airport`, `Media, Books and TV` |
| `inglese/vocabolario/word-formation` | Morphological rules & affixes | `Prefixes and Suffixes`, `Compound Words` |
| `matematica/geometria-analitica` | Cartesian geometry, lines, conics | `01 - La Retta`, `02 - Le Coniche`, `05 - Ellisse e Iperbole` |
| `matematica/trigonometria` | Goniometric circle, trigonometric formulas | `03 - Goniometria e Trigonometria` |
| `matematica/algebra` | Equations, inequalities, radicals | `04 - Disequazioni`, `06 - Algebra e Irrazionali` |
| `sistemi-e-reti/cablaggio` | Structured cabling, twisted pairs, crimping, standards | `Categorie di cavi`, `Il cavo di rete e crimpaggio`, `Normativa 11801` |
| `sistemi-e-reti/topologie` | Network topologies, Ethernet, LAN/MAN | `Tipologia e Topologia reti`, `Le reti Ethernet` |
| `sistemi-e-reti/iso-osi` | ISO/OSI 7-layer stack, protocol access methods | `Modello ISO-OSI 11801`, `Tecniche acceso al canale casuali` |
| `sistemi-e-reti/dispositivi` | Switches, routers, central network appliances | `Apparati centrali`, `Comandi di uno switch CISCO` |
| `tipsit/multimedialita` | Signals, ADC, raster/vector graphics, video codecs | `1. Teoria dei Segnali`, `2. Digitalizzazione Immagini`, `3. Compressione` |
| `tipsit/sistemi-operativi` | OS architecture, kernel vs shell, rings, system calls | `1. Ruolo del SO`, `2. Kernel e Shell`, `3. Modello a Ring` |
| `tipsit/numerazione-binaria` | Positional notation, binary conversions, 2's complement | `1. Sistemi di numerazione`, `2. Operazioni`, `3. Numeri con segno` |
| `tipsit/filesystem` | Shell and terminal commands (Linux & Windows) | `Guida comandi Linux`, `Guida comandi Windows` |
| `tipsit/sicurezza` | Error detection and correction codes | `Codici di sicurezza` |

### 5.3 Axis 2: `tipologia/...` (Pedagogical / Structural Nature)

| Typology Tag | Pedagogical Intent | Volume in Content Notes |
| :--- | :--- | :---: |
| `tipologia/reference` | Cheat-sheet, exhaustive syntax tables, API function lists | 30 notes |
| `tipologia/teoria` | Conceptual exposition, architecture, models | 22 notes |
| `tipologia/strategie` | Exam methods, step-by-step solving heuristics | 17 notes |
| `tipologia/vocabolario` | Thematic glossaries, lexical tables, collocations | 14 notes |
| `tipologia/guida-pratica`| Terminal command walk-throughs, configuration manuals | 7 notes |
| `tipologia/esercizi` | Formula cheat-sheets with fully worked exercises | 7 notes |
| `tipologia/algoritmo` | Pseudocode, procedural logic, complexity analysis | 3 notes |
| `tipologia/sintesi` | Concept maps, module synthesis, overarching summaries | 1 note |
| **Total Notes Tagged** | | **101 notes (100%)** |

### 5.4 Service Pages & TEMP Rules (`draft: true`)
Per R3, service and temporary pages must not contaminate published search and graph views:
- **All 43 `index.md` files**: Marked with `draft: true`.
- **All 12 notes in `TEMP/Sistemi e reti/`**: Marked with `draft: true`.
- **All scripts and non-markdown files**: Ignored or marked as draft.

---

## 6. Verification Scripts Architecture & Specifications

### 6.1 `check_links.py` Specification
- **Purpose**: Verify that zero broken wikilinks exist across the entire vault.
- **Execution**: `python check_links.py [--content-dir content]`
- **Pipeline**:
  1. Recursively scan `content/` for all `.md` files and asset files (`.png`, `.jpg`, `.pdf`, `.gif`, etc.).
  2. Index all files by full relative path, filename, and stem.
  3. Pre-parse each note's markdown headings (`#`, `##`, etc.) into a heading registry.
  4. Strip code fences (```` ```...``` ````) and inline code (`` `...` ``) from note text.
  5. Extract all wikilinks: `[[target]]`, `[[target|alias]]`, `[[target#heading]]`, `[[#heading]]`, `![[embed]]`.
  6. Resolve links:
     - Pure internal anchors (`[[#heading]]`): verify against current note's headings.
     - Note/asset targets: resolve via exact path, relative folder path, or shortest stem match.
     - Anchors in target notes (`[[target#heading]]`): verify against target note's headings.
  7. Exit Code: `0` if zero broken links; `1` if any link fails (with file and line details).
- **Status**: Tested and verified on current vault -> **PASS (0 broken links)**.

### 6.2 `check_tags.py` Specification
- **Purpose**: Verify that 100% of non-draft markdown files contain a valid `tags:` YAML array.
- **Execution**: `python check_tags.py [--content-dir content] [--no-hierarchy]`
- **Pipeline**:
  1. Recursively scan `content/` for all `.md` files.
  2. Parse YAML frontmatter using a self-contained parser (no PyYAML requirement).
  3. Check draft status: if `draft: true` is present, record as draft and skip tag validation.
  4. For non-draft files:
     - Verify frontmatter exists (`---` delimiters).
     - Verify `tags:` key is present.
     - Verify `tags` is a non-empty list of strings.
     - Verify each tag contains at least one `/` (hierarchical tag requirement).
     - Verify at least two tags are present (representing both Subject and Typology).
  5. Exit Code: `0` if 100% of non-draft files pass; `1` if any non-draft file fails (with error messages).
- **Status**: Tested on current vault -> Currently flags 144 files missing frontmatter/tags, confirming strict detection accuracy.

---

## 7. Concrete Next Steps for Implementation Agents

1. **Frontmatter & Tag Injection (Phase 2)**:
   - For all 43 `index.md` files: inject/ensure `draft: true` in YAML frontmatter.
   - For all 12 notes in `TEMP/`: inject `draft: true` in YAML frontmatter.
   - For all 101 non-draft content notes: inject YAML frontmatter with `title`, `tags: [materia/..., tipologia/...]`.
2. **Move/Merge Cautions**:
   - When renaming or moving notes (e.g. merging redundant notes or restructuring folders), update all referencing wikilinks across the vault.
   - Run `python check_links.py` after every file operation to guarantee zero broken links.
3. **Quartz Build Verification**:
   - Run `node ./quartz/bootstrap-cli.mjs build` to confirm Quartz parses all frontmatter cleanly. (Successfully tested in task-55: 156 files parsed and emitted in 56s with 0 errors).
4. **Git Workflow**:
   - Ensure all changes are committed atomically on `refactor/quartz-prep` and documented in `CHANGELOG_RIORGANIZZAZIONE.md`.
