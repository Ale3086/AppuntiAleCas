const fs = require("fs");
const path = require("path");

const targets = [
  "node_modules/@quartz-community/utils/dist/path.js",
  "node_modules/@quartz-community/utils/dist/index.js",
  "node_modules/@quartz-community/crawl-links/dist/index.js",
];

for (const target of targets) {
  const fullPath = path.resolve(target);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, "utf-8");
    let modified = false;

    if (content.includes("/^index(\\[.*\\]|[\\s_-].*)?$/i")) {
      content = content.replaceAll("/^index(\\[.*\\]|[\\s_-].*)?$/i", "/^_?index(\\[.*\\]|[\\s_-].*)?$/i");
      modified = true;
    }

    const origPattern = `  if (segments.length >= 2 && segments[segments.length - 1] === segments[segments.length - 2]) {
    segments[segments.length - 1] = "index";
    slug = segments.join("/");
  }`;
    const newReplacement = `  if (segments.length >= 2) {
    const last = segments[segments.length - 1];
    if (last === segments[segments.length - 2] || /^_?index(\\[.*\\]|[\\s_-].*)?$/i.test(last)) {
      segments[segments.length - 1] = "index";
      slug = segments.join("/");
    }
  }`;

    if (content.includes(origPattern)) {
      content = content.replaceAll(origPattern, newReplacement);
      modified = true;
    }

    const crawlOrig = `        const parts = slug2.split("/");
        const fileName = parts.at(-1);
        return targetCanonical === fileName;
      });
      if (matchingFileNames.length === 1) {
        const matchedSlug = matchingFileNames[0];
        return resolveRelative(effectiveSrc, matchedSlug) + targetAnchor;
      }`;

    const crawlReplacement = `        const parts = slug2.split("/");
        const fileName = parts.at(-1);
        if (targetCanonical === fileName) return true;
        if (fileName === "index" && parts.length >= 2) {
          const folderPart = parts.at(-2);
          if (folderPart === targetCanonical) return true;
          const indexMatch = targetCanonical.match(/^_?index(?:\\[(.*)\\]|[\\s_-](.*))?$/i);
          if (indexMatch) {
            const targetFolder = indexMatch[1] || indexMatch[2];
            if (targetFolder && targetFolder === folderPart) return true;
          }
        }
        return false;
      });
      if (matchingFileNames.length >= 1) {
        let matchedSlug = matchingFileNames[0];
        if (matchingFileNames.length > 1) {
          const commonLen = (a, b) => {
            let i = 0;
            while (i < a.length && i < b.length && a[i] === b[i]) i++;
            return i;
          };
          matchingFileNames.sort((a, b) => commonLen(b, effectiveSrc) - commonLen(a, effectiveSrc));
          matchedSlug = matchingFileNames[0];
        }
        return resolveRelative(effectiveSrc, matchedSlug) + targetAnchor;
      }`;

    if (content.includes(crawlOrig)) {
      content = content.replaceAll(crawlOrig, crawlReplacement);
      modified = true;
    }

    if (modified) {
      fs.writeFileSync(fullPath, content, "utf-8");
      console.log(`[patch-utils] Successfully patched: ${target}`);
    } else {
      console.log(`[patch-utils] Already up to date: ${target}`);
    }
  }
}
