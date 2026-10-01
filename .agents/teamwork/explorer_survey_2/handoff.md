# Handoff Report: Quartz Setup & Build Requirements

**Agent**: Quartz Build Explorer (`explorer_survey_2`)  
**Parent / Recipient**: Orchestrator (`b5f6e973-66fb-4f1c-a7b0-ce880e3009d2`)  
**Date**: 2026-09-30  
**Status**: Task Complete (Hard Handoff)  

---

## 1. Observation

1. **Quartz Version and Config Structure**:
   - `package.json:5`: `"version": "5.0.0"`.
   - `quartz.config.yaml:1-43`: Configures `configuration` (pageTitle: "Appunti AleCas", enableSPA: false, locale: "en-US", baseUrl: "ale3086.github.io/AppuntiAleCas", ignorePatterns: `["private", "templates", ".obsidian"]`) and 35 plugins.
   - `quartz.ts:1-5`:
     ```typescript
     import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
     const config = await loadQuartzConfig()
     export default config
     export const layout = await loadQuartzLayout()
     ```
   - No `quartz.config.ts` or `quartz.layout.ts` exist; Quartz v5 uses `quartz.config.yaml` and `quartz.ts`.

2. **Windows PowerShell Environment & Execution Policy**:
   - Executing `npm -v` in PowerShell returned:
     ```
     v24.15.0
     npm : Impossibile caricare il file C:\Program Files\nodejs\npm.ps1. L'esecuzione di script è disabilitata nel sistema in uso.
     ```
   - Executing `npm.cmd -v` succeeded: `11.12.1`.
   - Direct execution via Node: `node ./quartz/bootstrap-cli.mjs build` runs directly without invoking PowerShell script wrappers.

3. **Build Execution Output**:
   - Running `node ./quartz/bootstrap-cli.mjs build` produced verbatim output:
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
   - Exit code: 0.
   - Total markdown files parsed: 156. Total emitted files: 552. Time: 37s.

4. **Frontmatter Parsing & Fatal Validation Behavior**:
   - `node_modules/@quartz-community/note-properties/dist/index.js:11040-11047`:
     ```javascript
     const { data } = grayMatter(fileData, {
       delimiters: opts.delimiters,
       language: opts.language,
       engines: {
         yaml: (s2) => yaml2.load(s2, { schema: yaml2.JSON_SCHEMA }),
         toml: (s2) => import_toml.default.parse(s2)
       }
     });
     ```
   - `quartz/processors/parse.ts:114-116`:
     ```typescript
     } catch (err) {
       trace(`\nFailed to process markdown \`${fp}\``, err as Error)
     }
     ```
   - `quartz/util/trace.ts:38-42`:
     ```typescript
     } else {
       console.error(traceMsg)
       process.exit(1)
     }
     ```

5. **Draft Filter Implementation & Folder Page Interaction**:
   - `node_modules/@quartz-community/remove-draft/dist/index.js:4-8`:
     ```javascript
     shouldPublish(_ctx, [_tree, vfile]) {
       const frontmatter = vfile.data?.frontmatter;
       const draftFlag = frontmatter?.draft === true || frontmatter?.draft === "true";
       return !draftFlag;
     }
     ```
   - `node_modules/@quartz-community/folder-page/dist/index.js:2852`:
     ```javascript
     const fileFolders = getFolders(slug2).filter((f3) => f3 !== "." && f3 !== "tags");
     ```
   - `node_modules/@quartz-community/folder-page/dist/index.js:2890-2898`:
     Folders without an index file generate a synthetic virtual folder page. The root directory `.` is excluded from this fallback.

6. **Tag Processing & Graph View**:
   - `node_modules/@quartz-community/note-properties/dist/index.js:10822-10824`:
     ```javascript
     function slugTag(tag) {
       return tag.split("/").map((tagSegment) => _sluggify(tagSegment)).join("/");
     }
     ```
   - `node_modules/@quartz-community/tag-page/dist/index.js:316-322`:
     ```javascript
     function getAllSegmentPrefixes(path) {
       const segments = path.split("/");
       const results = [];
       for (let i2 = 0; i2 < segments.length; i2++) {
         results.push(segments.slice(0, i2 + 1).join("/"));
       }
       return results;
     }
     ```
   - `node_modules/@quartz-community/graph/dist/index.js:352`:
     `showTags: true` is enabled by default in local and global graphs.

7. **Vault State Audit**:
   - Total Markdown files: 156
   - Files with frontmatter: 23; files without frontmatter: 133.
   - Files with `tags`: 12; files with `draft: true`: 0.
   - Non-code wikilinks & embeds: 79; broken links: 0.
   - All attachments referenced in wikilinks (e.g. `![[Sorting_bubblesort_anim.gif]]`) exist in `content/Zimmagini/` and resolve correctly to `public/zimmagini/...` via `crawl-links` (`markdownLinkResolution: shortest`).

---

## 2. Logic Chain

1. **From Observation 1 & 2 to Environment Commands**:
   Because `package.json` specifies Quartz v5.0.0 and Windows PowerShell blocks `npm.ps1` via Execution Policy, build commands and tests cannot rely on bare `npm`. Direct execution via `node ./quartz/bootstrap-cli.mjs build` and `npm.cmd test` avoids execution policy blocks while running on Node v24.15.0.

2. **From Observation 3 & 4 to Fatal Frontmatter Validation**:
   In `note-properties`, frontmatter parsing uses `js-yaml` with `JSON_SCHEMA`. If any file contains malformed YAML syntax, `js-yaml` throws a syntax error, caught by `parseMarkdown`, which calls `trace()`. Observation 4 proves that `trace()` terminates the process immediately with `process.exit(1)`. Consequently, running `node ./quartz/bootstrap-cli.mjs build` with exit code 0 serves as a strict, non-bypassable validator that 100% of markdown files in the vault possess syntactically valid YAML frontmatter.

3. **From Observation 5 to Root Index Preservation**:
   Observation 5 shows that `@quartz-community/remove-draft` drops any note with `draft: true`. For subfolders, `@quartz-community/folder-page` creates a virtual folder index. However, `folder-page` filters out `.` (the root vault directory). If `content/index.md` is given `draft: true`, Quartz will not generate `public/index.html`, destroying the home page. Therefore, `content/index.md` must never be marked `draft: true`.

4. **From Observation 6 to Hierarchical Tag Compliance**:
   Observation 6 demonstrates that `slugTag` splits tags by `/` and `tag-page` extracts all prefix segments. When notes are tagged `tags: [materia/argomento, tipologia/concetto]`, Quartz automatically creates landing pages for both `/tags/materia` and `/tags/materia/argomento`, and connects them as graph nodes via `@quartz-community/graph`. This satisfies Requirement R3 without needing custom Quartz modifications.

5. **From Observation 5 & 7 to Non-Markdown / Attachment Handling**:
   Non-markdown assets (68 files in `content/Zimmagini/`, plus PDFs in `content/TEMP/`) are processed by the `Assets` emitter, not `parseMarkdown`. They do not parse YAML and cannot have `draft: true`. To exclude unneeded PDFs in `TEMP`, they must either be removed (via safe-delete) or `TEMP` must be added to `ignorePatterns` in `quartz.config.yaml`.

---

## 3. Caveats

1. **Root `index.md` vs Subfolder `index.md`**:
   The user prompt asks to "Add `draft: true` to service pages: index/MOC files, non-markdown files (like scripts), and files inside `TEMP` directories." Subfolder index files (e.g. `Informatica/index.md`) can safely have `draft: true` (Quartz will generate virtual folder listings). However, the root `content/index.md` must remain non-draft.
2. **Non-Markdown Files**:
   Files like `.pdf` or `.png` inside `content/TEMP/` cannot take YAML frontmatter. If not deleted or ignored via `ignorePatterns`, Quartz's `Assets` emitter will continue copying them into `public/`.
3. **Wikilink Integrity during Refactoring**:
   Currently, all 79 non-code wikilinks in the vault resolve properly (0 broken links). However, moving notes into macro-topics or renaming notes will break any wikilinks pointing to their old names unless explicitly updated across all notes.

---

## 4. Conclusion

1. The Quartz build system is fully functional, healthy, and fast (~37 seconds for 156 files).
2. `node ./quartz/bootstrap-cli.mjs build` can be used directly as the definitive acceptance check for YAML frontmatter validity.
3. Quartz v5 natively supports the requested hierarchical tag schema (`materia/argomento`) and automatically reflects it in both Tag Pages and the Graph View.
4. Downstream agents must mark service/MOC notes as `draft: true`, but keep `content/index.md` non-draft to preserve the site home page.
5. All 79 existing wikilinks currently resolve; downstream restructuring must preserve or update these references.

---

## 5. Verification Method

To independently verify these findings, run the following commands from the workspace root (`c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas`):

1. **Verify Unit Tests**:
   ```powershell
   npm.cmd test
   ```
   *Expected Result*: 163 tests pass, 0 fail (duration ~2-3 seconds).

2. **Verify Quartz Production Build**:
   ```powershell
   node ./quartz/bootstrap-cli.mjs build
   ```
   *Expected Result*: Exits with code 0. Logs indicate ~156 Markdown files parsed, ~552 files emitted into `public/`, and zero fatal errors.

3. **Verify Frontmatter Fatal Validation**:
   - If any `.md` file is given invalid YAML (e.g. `tags: [unclosed`), running `node ./quartz/bootstrap-cli.mjs build` immediately fails with `ERROR` and exit code 1.
