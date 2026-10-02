export {
  isFilePath,
  isFullSlug,
  isSimpleSlug,
  isRelativeURL,
  isAbsoluteURL,
  getFullSlug,
  simplifySlug,
  joinSegments,
  endsWith,
  trimSuffix,
  stripSlashes,
  getFileExtension,
  isFolderPath,
  getAllSegmentPrefixes,
  pathToRoot,
  resolveRelative,
  splitAnchor,
  slugTag,
  transformInternalLink,
  transformLink,
  normalizeHastElement,
} from "@quartz-community/utils"

import { slugifyFilePath as _slugifyFilePath, FilePath, FullSlug } from "@quartz-community/utils"

export function slugifyFilePath(fp: FilePath, excludeExt?: boolean): FullSlug {
  const normalized = String(fp).replace(/\\/g, "/")
  const segments = normalized.split("/")
  if (segments.length >= 2) {
    const filename = segments[segments.length - 1]
    const ext = filename.lastIndexOf(".") !== -1 ? filename.slice(filename.lastIndexOf(".")) : ""
    const base = filename.slice(0, filename.length - ext.length)
    if (/^_?index(\[.*\]|[\s_-].*)?$/i.test(base)) {
      segments[segments.length - 1] = "index" + ext
      return _slugifyFilePath(segments.join("/") as FilePath, excludeExt)
    }
  }
  return _slugifyFilePath(fp, excludeExt)
}

export type {
  FilePath,
  FullSlug,
  SimpleSlug,
  RelativeURL,
  TransformOptions,
} from "@quartz-community/utils"

// --- v5-specific exports below ---

export const QUARTZ = "quartz"

// from micromorph/src/utils.ts
// https://github.com/natemoo-re/micromorph/blob/main/src/utils.ts#L5
const _rebaseHtmlElement = (el: Element, attr: string, newBase: string | URL) => {
  const rebased = new URL(el.getAttribute(attr)!, newBase)
  el.setAttribute(attr, rebased.pathname + rebased.hash)
}
export function normalizeRelativeURLs(el: Element | Document, destination: string | URL) {
  el.querySelectorAll('[href=""], [href^="./"], [href^="../"]').forEach((item) => {
    _rebaseHtmlElement(item, "href", destination)
  })
  el.querySelectorAll('[src=""], [src^="./"], [src^="../"]').forEach((item) => {
    _rebaseHtmlElement(item, "src", destination)
  })
}
