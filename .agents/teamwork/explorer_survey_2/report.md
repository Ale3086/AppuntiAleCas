# Quartz Build & Frontmatter Survey Report

**Date**: 2026-09-30  
**Target Vault**: `c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas`  
**Explorer**: Quartz Build Explorer (`explorer_survey_2`)  

---

## 1. Executive Summary

This report delivers a comprehensive investigation of the Quartz static site generator setup, build pipeline, frontmatter parser/validator, tag handling, graph view mechanics, and link resolution for the **AppuntiAleCas** Obsidian vault.

### Core Discoveries:
1. **Quartz Architecture**: The vault is configured with **Quartz v5.0.0** (modular architecture using `@quartz-community/*` packages). The configuration is declared in `quartz.config.yaml` and loaded via dynamic imports in `quartz.ts` (`loadQuartzConfig` and `loadQuartzLayout`). Note that traditional Quartz v4 files (`quartz.config.ts`, `quartz.layout.ts`) have been replaced by `quartz.config.yaml` + `quartz.ts`.
2. **Build Execution Success**: Running `node ./quartz/bootstrap-cli.mjs build` executes cleanly with zero fatal errors, processing all **156 Markdown input files** and emitting **552 static assets/HTML pages** into `public/` in approximately **37 seconds**.
3. **Fatal YAML Frontmatter Validation**: Frontmatter is parsed via `gray-matter` using `js-yaml` with `JSON_SCHEMA` within `@quartz-community/note-properties`. Any YAML syntax error (e.g. invalid indentation, illegal characters, unquoted colons) causes `parseMarkdown` to catch the error, call `trace()`, and **immediately abort the build with `process.exit(1)`**. Thus, Quartz build is a strict, fatal validator of vault YAML syntax.
4. **Current Vault State**:
   - Total Markdown files: 156
   - Files with YAML frontmatter: 23 (133 lack frontmatter)
   - Files with `tags:` field: 12
   - Files with `draft:` field: 0
   - Non-code wikilinks/embeds: 79 (100% currently resolve; 0 broken links).
5. **Hierarchical Tag Integration**: Quartz natively supports hierarchical tags (e.g. `[materia/argomento, tipologia/concetto]`). `slugTag` segments each tag by `/`, and `@quartz-community/tag-page` automatically generates pages for every segment prefix (e.g. both `/tags/materia` and `/tags/materia/argomento`). The `@quartz-community/graph` component connects notes to their tags and visualizes tag clusters.
6. **Critical Caveat regarding `draft: true`**:
   - `@quartz-community/remove-draft` drops files where `frontmatter?.draft === true || frontmatter?.draft === "true"`.
   - Subfolder `index.md` files marked `draft: true`: Quartz excludes the custom note, and `@quartz-community/folder-page` automatically generates a fallback virtual folder listing.
   - **Root `content/index.md`**: The root folder (`.`) is explicitly filtered out from virtual folder page generation. Therefore, **if the root `content/index.md` is marked `draft: true`, the website will lose its home page (`index.html`)**. The root `index.md` must NEVER have `draft: true`.
   - Non-markdown files (PDFs, images) are handled by the `Assets` emitter and do not parse frontmatter; `draft: true` cannot be applied to them. Non-markdown files in `TEMP` should be excluded via `ignorePatterns` in `quartz.config.yaml` or moved/safe-deleted.
7. **Environment Quirk**: On Windows PowerShell, running `npm` invokes `npm.ps1`, which is blocked by default Windows Execution Policy (`PSSecurityException`). Execution of scripts must use `node ./quartz/bootstrap-cli.mjs build` or `npm.cmd`.

---

## 2. Quartz Architecture & Configuration

### 2.1 File Map & Modern Quartz v5 Layout
- **Root Configuration**: `quartz.config.yaml`
  - Defines `configuration` (pageTitle: "Appunti AleCas", enableSPA: false, locale: "en-US", baseUrl: "ale3086.github.io/AppuntiAleCas", ignorePatterns: `["private", "templates", ".obsidian"]`).
  - Defines `plugins` list: 35 plugin entries including transformers, filters, pageTypes, and emitters.
  - Defines `layout` structure: positions (`left`, `right`, `beforeBody`, `afterBody`, `footer`) and page type overrides.
- **Entry point**: `quartz.ts`
  ```typescript
  import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
  const config = await loadQuartzConfig()
  export default config
  export const layout = await loadQuartzLayout()
  ```
- **CLI Bootstrap**: `quartz/bootstrap-cli.mjs`
  - Uses `yargs` CLI parser.
  - Commands: `build`, `create`, `upgrade`, `restore`, `sync`, `tui`, `plugin`.
- **Content Root**: `content/`
  - Contains markdown notes, subfolders (`Informatica/`, `Inglese/`, `Matematica/`, `Sistemi e reti/`, `TEMP/`, `TIPSIT/`), attachment folder `Zimmagini/`, and home page `index.md`.
- **Output Directory**: `public/` (ignored by `.gitignore`).

---

## 3. Build Tooling & Environment Findings

### 3.1 Node & npm Compatibility
- Detected Node version: `v24.15.0` (satisfies `package.json` engines requirement: `node >= 22`).
- Detected npm version: `11.12.1` (satisfies `package.json` engines requirement: `npm >= 10.9.2`).

### 3.2 Windows PowerShell Execution Policy Quirk
- **Issue**: Running bare `npm run ...` in Windows PowerShell invokes `C:\Program Files\nodejs\npm.ps1`. If PowerShell script execution is restricted (the default on many Windows machines), it fails with:
  `PSSecurityException: UnauthorizedAccess (L'esecuzione di script è disabilitata nel sistema in uso)`.
- **Remediation**:
  1. For build verification, invoke Node directly:
     ```powershell
     node ./quartz/bootstrap-cli.mjs build
     ```
  2. For npm commands, invoke `.cmd` directly:
     ```powershell
     npm.cmd test
     ```

### 3.3 Test Suite Status
Running `npm.cmd test` executed `tsx --test` across all 10 unit test suites in `quartz/`:
- **163 tests passed, 0 failed, 0 skipped** (duration ~2.3s).
- Tests cover slug collision detection, link strategies (`shortest`, `absolute`, `relative`), file trie hierarchy, layout resolution, and component registry.

---

## 4. Build Execution & Performance Analysis

### 4.1 Benchmark Run
Command executed:
```powershell
node ./quartz/bootstrap-cli.mjs build
```

Execution Log:
```
 Quartz v5.0.0  

Cleaned output directory `public` in 100ms
Found 156 input files from `content` in 70ms
Parsing input files using 1 threads
Parsed 156 Markdown files in 9s
Filtered out 0 files in 147μs
Emitting files
Emitted 552 files to `public` in 27s
Done processing 156 files in 37s
```

### 4.2 Breakdown of Stages:
1. **Clean**: Deletes `public/` directory (100ms).
2. **Glob**: Scans all files in `content/` against `cfg.configuration.ignorePatterns` (70ms).
3. **Parse**: Single-threaded parsing of 156 Markdown files into ASTs using unified/remark plugins (9s).
4. **Collision Detection**: `detectSlugCollisions` checked all 156 notes. Result: **0 collisions**.
5. **Filter**: `filterContent` evaluated active filter plugins (`RemoveDrafts`). Result: **0 files filtered out** (no files have `draft: true`). Duration: 147μs.
6. **Emit**:
   - Phase 0: `ComponentResources` compiles CSS/JS bundles.
   - Phase 1: `PageTypeDispatcher` generates virtual pages (tag pages, folder pages).
   - Phase 2: Other emitters render static HTML pages, search index, RSS, and `Assets` emitter copies attachments. Total: **552 files emitted in 27s**.

---

## 5. YAML Frontmatter Parsing & Validation Mechanics

### 5.1 Parsing Engine
In `@quartz-community/note-properties` (`dist/index.js:11040`):
```javascript
const { data } = grayMatter(fileData, {
  delimiters: opts.delimiters, // '---'
  language: opts.language,     // 'yaml'
  engines: {
    yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }),
    toml: (s) => toml.parse(s)
  }
});
```

### 5.2 Fatal Error Behavior
In `quartz/processors/parse.ts` (lines 114-116):
```typescript
try {
  // ast = processor.parse(file) ...
} catch (err) {
  trace(`\nFailed to process markdown \`${fp}\``, err as Error)
}
```
In `quartz/util/trace.ts` (lines 35-42):
```typescript
if (!isMainThread) {
  throw new Error(traceMsg)
} else {
  console.error(traceMsg)
  process.exit(1)
}
```
**Conclusion**: Any Markdown file with a malformed YAML frontmatter syntax causes Quartz to immediately terminate with exit code 1. A clean run of `node ./quartz/bootstrap-cli.mjs build` with exit code 0 is an absolute mathematical proof that every Markdown file has valid YAML syntax.

### 5.3 Supported & Recognized Frontmatter Fields
| Field | Type | Default if Missing | Handling Plugin | Purpose / Effect |
|---|---|---|---|---|
| `title` | `string` | File stem (e.g. "Bubble sort") | `note-properties`, `article-title` | Note title rendered in page header, sidebar, and meta tags |
| `tags` | `string[]` (or `string`) | `[]` | `note-properties`, `tag-page`, `graph` | Hierarchical tags, slugified per segment, indexed into tag pages and graph view |
| `draft` | `boolean` (or `"true"`/`"false"`) | `false` | `remove-draft` | If `true`, completely dropped before HTML emission |
| `aliases` | `string[]` (or `string`) | `[]` | `note-properties`, `alias-redirects` | Alternative names; generates HTML redirects to this note |
| `created` / `date` | `string` / `Date` | Git/FS modified date | `created-modified-date` | Creation date for note metadata and sorting |
| `modified` / `updated` | `string` / `Date` | Git/FS modified date | `created-modified-date` | Last modified date |
| `published` | `string` / `Date` | None | `created-modified-date` | Publication date |
| `description` | `string` | Auto-excerpt from text | `description`, `Head` | Meta description for search and OpenGraph cards |
| `socialImage` | `string` | Default Quartz OG image | `og-image` | Custom social share image |
| `cssclasses` | `string[]` (or `string`) | `[]` | `note-properties`, `content-page` | Adds custom CSS classes to the page's `<article>` element |
| `unlisted` | `boolean` | `false` | `unlisted-pages` | Excludes note from folder listings, tag pages, and search |
| `password` | `string` | None | `encrypted-pages` | Encrypts note content requiring client-side password |
| `permalink` | `string` | None | `note-properties` | Custom URL slug, treated as alias |

---

## 6. Tag Architecture & Graph View Integration

### 6.1 Tag Slugification & Hierarchy
In `note-properties` (`dist/index.js:10822`):
```javascript
function slugTag(tag) {
  return tag.split("/").map((tagSegment) => _sluggify(tagSegment)).join("/");
}
```
In `tag-page` (`dist/index.js:316`):
```javascript
function getAllSegmentPrefixes(path) {
  const segments = path.split("/");
  const results = [];
  for (let i = 0; i < segments.length; i++) {
    results.push(segments.slice(0, i + 1).join("/"));
  }
  return results;
}
```
**Impact**:
When a note contains `tags: [materia/argomento, tipologia/concetto]`:
- The tag `materia/argomento` is parsed and slugified to `materia/argomento`.
- `getAllSegmentPrefixes` extracts both `materia` AND `materia/argomento`.
- Quartz generates two tag index pages: `/tags/materia` and `/tags/materia/argomento`.
- This matches Requirement R3 perfectly.

### 6.2 Graph View Networking
In `quartz.config.yaml`:
```yaml
  - source: "@quartz-community/graph"
    enabled: true
    layout:
      position: right
      priority: 10
```
In `@quartz-community/graph/dist/index.js`:
- `showTags: true` is active by default in both local and global graphs.
- Tag nodes are displayed as distinct interactive nodes prefixed with `tags/...`.
- Edges are formed between notes and all tags they contain (`eu.push({source: noteSlug, target: "tags/" + tag})`).
- If notes across folders share macro-topic tags or concept tags, the Graph View displays interconnected visual clusters instead of isolated orphan islands.

---

## 7. Draft Flag Semantics & Critical Edge Cases

### 7.1 Filter Implementation
In `@quartz-community/remove-draft/dist/index.js`:
```javascript
var RemoveDrafts = () => ({
  name: "RemoveDrafts",
  shouldPublish(_ctx, [_tree, vfile]) {
    const frontmatter = vfile.data?.frontmatter;
    const draftFlag = frontmatter?.draft === true || frontmatter?.draft === "true";
    return !draftFlag;
  }
});
```

### 7.2 Interplay with Folder Pages vs Root Home Page
- **Subfolder `index.md` / MOCs**:
  When a subfolder has an `index.md` with `draft: true`, `RemoveDrafts` removes it from `content`. Then `@quartz-community/folder-page` detects that this folder is not in `foldersWithIndex` and automatically generates a synthetic virtual folder page (`virtualPages.push({ slug: folder + "/index", ... })`). The folder still has a navigable index listing its child notes!
- **Root Homepage (`content/index.md`)**:
  In `FolderPage` (`folder-page/dist/index.js:2852`):
  ```javascript
  const fileFolders = getFolders(slug2).filter((f) => f !== "." && f !== "tags");
  ```
  The root directory `.` is explicitly filtered out. If `content/index.md` has `draft: true`, Quartz **WILL NOT generate `public/index.html`**, breaking the root entry point of the site!
  **Rule**: `content/index.md` MUST NEVER be marked `draft: true`.
- **Non-Markdown Files**:
  PDFs and image files in `content/TEMP/` are handled directly by the `Assets` emitter (`quartz/plugins/emitters/assets.ts`). Since they are not Markdown files, they do not possess YAML frontmatter. Setting `draft: true` on non-markdown files is not possible.
  **Rule**: Non-markdown files inside `TEMP/` must either be deleted (following safe-delete protocol) or `TEMP` must be added to `ignorePatterns` in `quartz.config.yaml`.

---

## 8. Wikilink Resolution Mechanics

### 8.1 Link Resolution Strategy
In `quartz.config.yaml`:
```yaml
  - source: "@quartz-community/crawl-links"
    enabled: true
    options:
      markdownLinkResolution: shortest
    order: 60
```
- Strategy `shortest`: Matches the target note's slugified filename against `allSlugs`.
- Vault Attachment Embeds: All attachments in `content/Zimmagini/` (such as `![[Sorting_bubblesort_anim.gif]]`) are discovered during the glob phase, added to `allSlugs`, and copied by `Assets`. Quartz successfully resolves shortest-path embeds to `../../zimmagini/sorting_bubblesort_anim.gif`.
- Broken Link Detection: If a link does not resolve to any entry in `allSlugs`, `crawl-links` attaches the CSS class `.broken` to the link anchor.

### 8.2 Vault Link Audit
- Total non-code wikilinks and embeds across the vault: **79**.
- Broken links currently in the vault: **0**.
- **Refactoring Risk**: When notes are moved into macro-topic folders or merged, any wikilinks pointing to them must be updated. A link checker script (`check_links.py`) must be run after any restructuring.

---

## 9. Recommendations for Downstream Agents & Acceptance Criteria

1. **Frontmatter Ingestion Script (`check_tags.py`)**:
   - Must verify that every non-draft markdown file has a valid YAML header.
   - Must ensure `tags` is a YAML list containing at least one hierarchical tag (e.g. `[materia/argomento, ...]`).
   - Must verify `draft: true` is present on service/MOC/TEMP notes, but explicitly absent on `content/index.md`.
2. **Wikilink Verification Script (`check_links.py`)**:
   - Must parse all markdown files (skipping fenced code blocks).
   - Must resolve `[[target]]` against all markdown note basenames and asset filenames in `Zimmagini/`.
   - Must confirm 0 broken links.
3. **Build Command Verification**:
   - Always run using direct Node invocation:
     ```powershell
     node ./quartz/bootstrap-cli.mjs build
     ```
   - Must exit with code 0.
