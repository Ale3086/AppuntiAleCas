const fs = require("fs");
const path = require("path");

const targets = [
  "node_modules/@quartz-community/utils/dist/path.js",
  "node_modules/@quartz-community/utils/dist/index.js",
  "node_modules/@quartz-community/crawl-links/dist/index.js",
  "node_modules/@quartz-community/obsidian-flavored-markdown/dist/index.js",
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

    const highlightOrig = `              if (opts.highlight) {
                node2.value = node2.value.replace(
                  /==((?!=).+?)==/g,
                  \`<span class="text-highlight">$1</span>\`
                );
              }`;

    const highlightOldPatched = `              if (opts.highlight) {
                node2.value = node2.value.replace(
                  /==((?!=).+?)==/g,
                  (_match, inner) => {
                    const formatted = inner
                      .replace(/\\*\\*(.+?)\\*\\*/g, "<strong>$1</strong>")
                      .replace(/(?<!\\*)\\*([^*]+)\\*(?!\\*)/g, "<em>$1</em>");
                    return \`<span class="text-highlight">\${formatted}</span>\`;
                  }
                );
              }`;

    const highlightReplacement = `              if (opts.highlight) {
                node2.value = node2.value.replace(
                  /==((?!=).+?)==/g,
                  (_match, inner) => {
                    const formatted = inner
                      .replace(/\\*\\*(.+?)\\*\\*/g, "<strong>$1</strong>")
                      .replace(/(?<!\\*)\\*([^*]+)\\*(?!\\*)/g, "<em>$1</em>");
                    let colorClass = "";
                    let dataAttr = "";
                    const trimmed = formatted.trim();
                    if (trimmed.startsWith("🔴") || trimmed.startsWith("❌")) { colorClass = " hl-red"; dataAttr = ' data-highlight-color="🔴"'; }
                    else if (trimmed.startsWith("🟠")) { colorClass = " hl-orange"; dataAttr = ' data-highlight-color="🟠"'; }
                    else if (trimmed.startsWith("🟡")) { colorClass = " hl-yellow"; dataAttr = ' data-highlight-color="🟡"'; }
                    else if (trimmed.startsWith("🟢") || trimmed.startsWith("✅")) { colorClass = " hl-green"; dataAttr = ' data-highlight-color="🟢"'; }
                    else if (trimmed.startsWith("🔵")) { colorClass = " hl-blue"; dataAttr = ' data-highlight-color="🔵"'; }
                    else if (trimmed.startsWith("🟣")) { colorClass = " hl-purple"; dataAttr = ' data-highlight-color="🟣"'; }
                    else if (trimmed.startsWith("💡") || trimmed.startsWith("⭐")) { colorClass = " hl-gold"; dataAttr = ' data-highlight-color="💡"'; }
                    else if (trimmed.startsWith("🔥")) { colorClass = " hl-pink"; dataAttr = ' data-highlight-color="🔥"'; }
                    else if (trimmed.startsWith("📌") || trimmed.startsWith("⚡")) { colorClass = " hl-cyan"; dataAttr = ' data-highlight-color="📌"'; }
                    else if (trimmed.startsWith("⚠️")) { colorClass = " hl-amber"; dataAttr = ' data-highlight-color="⚠️"'; }
                    return \`<span class="text-highlight\${colorClass}"\${dataAttr}>\${formatted}</span>\`;
                  }
                );
              }`;

    if (content.includes(highlightOrig)) {
      content = content.replaceAll(highlightOrig, highlightReplacement);
      modified = true;
    } else if (content.includes(highlightOldPatched)) {
      content = content.replaceAll(highlightOldPatched, highlightReplacement);
      modified = true;
    }

    const astHighlightOrig = `                const highlightNode = node2;
                const text6 = highlightNode.children?.map(getLiteralValue).join("") ?? "";
                parent.children[index2] = {
                  type: "html",
                  value: \`<span class="text-highlight">\${text6}</span>\`
                };`;

    const astHighlightOldPatched = `                const highlightNode = node2;
                const text6 = highlightNode.children?.map(getLiteralValue).join("") ?? "";
                const formatted = text6
                  .replace(/\\*\\*(.+?)\\*\\*/g, "<strong>$1</strong>")
                  .replace(/(?<!\\*)\\*([^*]+)\\*(?!\\*)/g, "<em>$1</em>");
                parent.children[index2] = {
                  type: "html",
                  value: \`<span class="text-highlight">\${formatted}</span>\`
                };`;

    const astHighlightReplacement = `                const highlightNode = node2;
                const text6 = highlightNode.children?.map(getLiteralValue).join("") ?? "";
                const formatted = text6
                  .replace(/\\*\\*(.+?)\\*\\*/g, "<strong>$1</strong>")
                  .replace(/(?<!\\*)\\*([^*]+)\\*(?!\\*)/g, "<em>$1</em>");
                let colorClass = "";
                let dataAttr = "";
                const trimmed = formatted.trim();
                if (trimmed.startsWith("🔴") || trimmed.startsWith("❌")) { colorClass = " hl-red"; dataAttr = ' data-highlight-color="🔴"'; }
                else if (trimmed.startsWith("🟠")) { colorClass = " hl-orange"; dataAttr = ' data-highlight-color="🟠"'; }
                else if (trimmed.startsWith("🟡")) { colorClass = " hl-yellow"; dataAttr = ' data-highlight-color="🟡"'; }
                else if (trimmed.startsWith("🟢") || trimmed.startsWith("✅")) { colorClass = " hl-green"; dataAttr = ' data-highlight-color="🟢"'; }
                else if (trimmed.startsWith("🔵")) { colorClass = " hl-blue"; dataAttr = ' data-highlight-color="🔵"'; }
                else if (trimmed.startsWith("🟣")) { colorClass = " hl-purple"; dataAttr = ' data-highlight-color="🟣"'; }
                else if (trimmed.startsWith("💡") || trimmed.startsWith("⭐")) { colorClass = " hl-gold"; dataAttr = ' data-highlight-color="💡"'; }
                else if (trimmed.startsWith("🔥")) { colorClass = " hl-pink"; dataAttr = ' data-highlight-color="🔥"'; }
                else if (trimmed.startsWith("📌") || trimmed.startsWith("⚡")) { colorClass = " hl-cyan"; dataAttr = ' data-highlight-color="📌"'; }
                else if (trimmed.startsWith("⚠️")) { colorClass = " hl-amber"; dataAttr = ' data-highlight-color="⚠️"'; }
                parent.children[index2] = {
                  type: "html",
                  value: \`<span class="text-highlight\${colorClass}"\${dataAttr}>\${formatted}</span>\`
                };`;

    if (content.includes(astHighlightOrig)) {
      content = content.replaceAll(astHighlightOrig, astHighlightReplacement);
      modified = true;
    } else if (content.includes(astHighlightOldPatched)) {
      content = content.replaceAll(astHighlightOldPatched, astHighlightReplacement);
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
