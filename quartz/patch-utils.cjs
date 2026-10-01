const fs = require("fs");
const path = require("path");

const targets = [
  "node_modules/@quartz-community/utils/dist/path.js",
  "node_modules/@quartz-community/utils/dist/index.js",
  "node_modules/@quartz-community/crawl-links/dist/index.js",
];

const searchStr = `  const segments = slug.split("/");
  if (segments.length >= 2 && segments[segments.length - 1] === segments[segments.length - 2]) {
    segments[segments.length - 1] = "index";
    slug = segments.join("/");
  }`;

const searchStrSlug2 = `  const segments = slug2.split("/");
  if (segments.length >= 2 && segments[segments.length - 1] === segments[segments.length - 2]) {
    segments[segments.length - 1] = "index";
    slug2 = segments.join("/");
  }`;

const replaceStr = `  const segments = slug.split("/");
  if (segments.length >= 2) {
    const last = segments[segments.length - 1];
    if (last === segments[segments.length - 2] || /^index(\\[.*\\]|[\\s_-].*)?$/i.test(last)) {
      segments[segments.length - 1] = "index";
      slug = segments.join("/");
    }
  }`;

const replaceStrSlug2 = `  const segments = slug2.split("/");
  if (segments.length >= 2) {
    const last = segments[segments.length - 1];
    if (last === segments[segments.length - 2] || /^index(\\[.*\\]|[\\s_-].*)?$/i.test(last)) {
      segments[segments.length - 1] = "index";
      slug2 = segments.join("/");
    }
  }`;

for (const target of targets) {
  const fullPath = path.resolve(target);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, "utf-8");
    let modified = false;
    if (content.includes(searchStr)) {
      content = content.replace(searchStr, replaceStr);
      modified = true;
    }
    if (content.includes(searchStrSlug2)) {
      content = content.replace(searchStrSlug2, replaceStrSlug2);
      modified = true;
    }
    if (modified) {
      fs.writeFileSync(fullPath, content, "utf-8");
      console.log(`[patch-utils] Patched ${target}`);
    } else {
      console.log(`[patch-utils] Already patched or pattern not found in ${target}`);
    }
  }
}
