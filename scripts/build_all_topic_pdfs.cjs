const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const root = path.resolve(__dirname, "..");
const contentRoot = path.join(root, "content");
const publicRoot = path.join(root, "public");

// Trova Chrome o Edge
let browserPath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
if (!fs.existsSync(browserPath)) {
    browserPath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
}
if (!fs.existsSync(browserPath)) {
    console.error("Neither Edge nor Chrome was found!");
    process.exit(1);
}
console.log("Using browser for PDF generation:", browserPath);

// Stili CSS di stampa accademica e moderna
const printStyles = `
<style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=IBM+Plex+Mono:wght@400;600&display=swap');
    
    body {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        line-height: 1.6;
        color: #1e293b;
        background-color: #ffffff;
        max-width: 900px;
        margin: 0 auto;
        padding: 2rem 2.5rem;
    }
    
    .cover-page {
        text-align: center;
        padding: 5rem 1rem 4rem;
        page-break-after: always;
        border-bottom: 3px solid #6366f1;
        margin-bottom: 3rem;
    }
    .cover-title {
        font-size: 2.8rem;
        font-weight: 800;
        color: #1e1b4b;
        margin-bottom: 1rem;
    }
    .cover-subtitle {
        font-size: 1.3rem;
        color: #4f46e5;
        font-weight: 600;
        margin-bottom: 2rem;
    }
    .cover-desc {
        font-size: 1.05rem;
        color: #64748b;
        max-width: 700px;
        margin: 0 auto 3rem;
    }
    .cover-badge {
        display: inline-block;
        background: #eef2ff;
        color: #4338ca;
        padding: 0.5rem 1.2rem;
        border-radius: 9999px;
        font-weight: 600;
        font-size: 0.95rem;
        border: 1px solid #c7d2fe;
    }
    
    .chapter-container {
        margin-bottom: 2.5rem;
    }
    
    h1 {
        color: #1e1b4b;
        font-size: 2.1rem;
        border-bottom: 2px solid #e0e7ff;
        padding-bottom: 0.5rem;
        margin-top: 1.5rem;
    }
    h2 {
        color: #312e81;
        font-size: 1.5rem;
        margin-top: 2rem;
        border-bottom: 1px solid #f1f5f9;
        padding-bottom: 0.3rem;
    }
    h3 {
        color: #4338ca;
        font-size: 1.25rem;
        margin-top: 1.5rem;
    }
    h4 {
        color: #475569;
        font-size: 1.1rem;
    }
    
    img {
        max-width: 100%;
        height: auto;
        display: block;
        margin: 1.5rem auto;
        border-radius: 8px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        border: 1px solid #e2e8f0;
    }
    
    table {
        width: 100%;
        border-collapse: collapse;
        margin: 1.5rem 0;
        font-size: 0.95rem;
    }
    th, td {
        border: 1px solid #cbd5e1;
        padding: 0.75rem 1rem;
        text-align: left;
    }
    th {
        background-color: #f8fafc;
        font-weight: 700;
        color: #1e293b;
    }
    tr:nth-child(even) {
        background-color: #f8fafc;
    }
    
    blockquote.callout {
        border-left: 4px solid #6366f1;
        background-color: #f5f7ff;
        padding: 1rem 1.25rem;
        border-radius: 0 8px 8px 0;
        margin: 1.5rem 0;
    }
    .callout-title {
        font-weight: 700;
        color: #312e81;
        margin-bottom: 0.5rem;
    }
    
    pre, code {
        font-family: 'IBM Plex Mono', monospace;
    }
    code:not(pre code) {
        background-color: #f1f5f9;
        color: #0f172a;
        padding: 0.2rem 0.4rem;
        border-radius: 4px;
        font-size: 0.9em;
    }
    pre {
        background-color: #0f172a;
        color: #f8fafc;
        padding: 1.25rem;
        border-radius: 8px;
        overflow-x: auto;
        font-size: 0.9rem;
    }
    
    .note-properties, .breadcrumb-container, .content-meta, .toc, .backlinks {
        display: none !important;
    }
    
    .text-highlight {
        background-color: rgba(255, 224, 102, 0.45);
        color: #1a1a1a;
        padding: 0.12em 0.35em;
        border-radius: 4px;
        font-weight: 600;
        border-bottom: 2px solid #fbc02d;
    }
    
    @media print {
        body {
            padding: 0;
            max-width: 100%;
        }
        .chapter-container {
            page-break-inside: avoid;
        }
        h1, h2 {
            page-break-after: avoid;
        }
        img, table, pre {
            page-break-inside: avoid;
        }
    }
</style>
`;

function scanTopics(dir) {
    let list = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    let mdNotes = [];
    let subDirs = [];
    let indexFile = null;
    
    for (const ent of entries) {
        if (ent.name.startsWith(".") || ent.name === "Zimmagini" || ent.name === "node_modules") continue;
        if (ent.isDirectory()) {
            subDirs.push(path.join(dir, ent.name));
        } else if (ent.name.endsWith(".md")) {
            if (ent.name.startsWith("_index_") || ent.name === "index.md") {
                indexFile = ent.name;
            } else {
                mdNotes.push(ent.name);
            }
        }
    }
    
    if (mdNotes.length > 0 && indexFile) {
        list.push({
            dir: dir,
            relDir: path.relative(contentRoot, dir).replace(/\\/g, "/"),
            folderName: path.basename(dir),
            indexFile: indexFile,
            notes: mdNotes.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }))
        });
    }
    
    for (const sub of subDirs) {
        list = list.concat(scanTopics(sub));
    }
    return list;
}

function slugify(name) {
    return name
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
}

function sanitizePdfName(folderName) {
    return folderName
        .replace(/[\s\/\\:*\?"<>|]+/g, "_")
        .replace(/^_+|_+$/g, "") + "_completo.pdf";
}

const topics = scanTopics(contentRoot);
console.log(`\n========================================`);
console.log(`Found ${topics.length} topic folders to process.`);
console.log(`========================================\n`);

let processedCount = 0;

for (const t of topics) {
    console.log(`\nProcessing [${t.relDir}] (${t.notes.length} notes)...`);
    const pdfFileName = sanitizePdfName(t.folderName);
    const pdfContentPath = path.join(t.dir, pdfFileName);
    
    // Risolvi il percorso equivalente in public in modo dinamico
    let publicTopicDir = publicRoot;
    for (const seg of t.relDir.split("/")) {
        if (!fs.existsSync(publicTopicDir)) {
            publicTopicDir = null;
            break;
        }
        const children = fs.readdirSync(publicTopicDir);
        const segClean = seg.toLowerCase().replace(/[^a-z0-9]/g, "");
        const matched = children.find(c => {
            const cClean = c.toLowerCase().replace(/[^a-z0-9]/g, "");
            return cClean === segClean;
        });
        if (matched) {
            publicTopicDir = path.join(publicTopicDir, matched);
        } else {
            publicTopicDir = null;
            break;
        }
    }
    const pdfPublicPath = publicTopicDir ? path.join(publicTopicDir, pdfFileName) : null;
    
    // Trova i corrispondenti file HTML generati da Quartz in public
    let combinedBody = "";
    let foundHtmlCount = 0;
    
    if (publicTopicDir && fs.existsSync(publicTopicDir)) {
        const publicFiles = fs.readdirSync(publicTopicDir).filter(f => f.endsWith(".html") && !f.startsWith("index") && !f.includes("og-image"));
        
        for (const note of t.notes) {
            const noteBase = note.replace(/\.md$/, "");
            const noteClean = noteBase.toLowerCase().replace(/[^a-z0-9]/g, "");
            
            // Cerca match esatto sui caratteri alfanumerici
            let matchedHtml = publicFiles.find(f => {
                const fClean = f.replace(/\.html$/, "").toLowerCase().replace(/[^a-z0-9]/g, "");
                return fClean === noteClean;
            });
            
            // Fallback: cerca inclusione parziale
            if (!matchedHtml) {
                matchedHtml = publicFiles.find(f => {
                    const fClean = f.replace(/\.html$/, "").toLowerCase().replace(/[^a-z0-9]/g, "");
                    return fClean.includes(noteClean.substring(0, 15)) || noteClean.includes(fClean.substring(0, 15));
                });
            }
            
            if (matchedHtml) {
                foundHtmlCount++;
                const htmlContent = fs.readFileSync(path.join(publicTopicDir, matchedHtml), "utf8");
                const articleMatch = htmlContent.match(/<article[\s\S]*?<\/article>/i);
                if (articleMatch) {
                    let content = articleMatch[0];
                    // Risolvi i percorsi delle immagini in percorsi file:/// assoluti
                    content = content.replace(/<img[^>]+src="([^">]+)"/gi, (fullImg, src) => {
                        let localImgPath = "";
                        if (src.toLowerCase().includes("zimmagini")) {
                            const imgFile = decodeURIComponent(src.split(/zimmagini[\/\\]/i).pop());
                            const zDir = path.join(t.dir, "Zimmagini");
                            if (fs.existsSync(zDir)) {
                                const found = fs.readdirSync(zDir).find(f => f.toLowerCase() === imgFile.toLowerCase());
                                if (found) {
                                    localImgPath = "file:///" + path.join(zDir, found).replace(/\\/g, "/");
                                }
                            }
                        }
                        if (localImgPath) {
                            return fullImg.replace(src, localImgPath);
                        }
                        return fullImg;
                    });
                    
                    combinedBody += `
                    <div class="chapter-container">
                        ${content}
                    </div>
                    <div style="page-break-after: always; margin: 3rem 0; border-bottom: 2px dashed #cbd5e1;"></div>
                    `;
                }
            }
        }
    }
    
    // Se non troviamo abbastanza HTML in public, usiamo un fallback generico o procediamo
    if (combinedBody.trim().length > 0) {
        const fullDocHtml = `<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="utf-8">
    <title>${t.folderName} - Raccolta Completa Appunti</title>
    ${printStyles}
</head>
<body>
    <div class="cover-page">
        <div class="cover-title">${t.folderName}</div>
        <div class="cover-subtitle">Raccolta Completa: ${t.notes.length} Lezioni ed Esercizi</div>
        <div class="cover-desc">
            Documento consolidato con testo integrale, tabelle, formule e tutti gli schemi visivi.
            Formattato appositamente per l'ingestione e lo studio su Google NotebookLM.
        </div>
        <div class="cover-badge">✨ Fonte Unica per Google NotebookLM</div>
    </div>
    ${combinedBody}
</body>
</html>`;
        
        const tempHtmlPath = path.join(t.dir, `_temp_${pdfFileName}.html`);
        fs.writeFileSync(tempHtmlPath, fullDocHtml, "utf8");
        
        // Stampa PDF con Edge/Chrome
        const fileUrl = "file:///" + tempHtmlPath.replace(/\\/g, "/");
        const args = [
            "--headless=new",
            "--disable-gpu",
            "--no-pdf-header-footer",
            `--print-to-pdf=${pdfContentPath}`,
            fileUrl
        ];
        
        const res = spawnSync(browserPath, args);
        try { fs.unlinkSync(tempHtmlPath); } catch (e) {}
        
        if (fs.existsSync(pdfContentPath)) {
            const sz = fs.statSync(pdfContentPath).size;
            console.log(`  -> Generated PDF (${(sz / 1024).toFixed(1)} KB): ${pdfFileName}`);
            if (fs.existsSync(publicTopicDir)) {
                fs.copyFileSync(pdfContentPath, pdfPublicPath);
            }
        } else {
            console.warn(`  -> Failed to generate PDF for ${t.folderName}`);
        }
    } else {
        console.warn(`  -> No HTML content extracted for ${t.folderName}`);
    }
    
    // Aggiorna l'index con la scheda NotebookLM
    const indexPath = path.join(t.dir, t.indexFile);
    let indexContent = fs.readFileSync(indexPath, "utf8");
    
    const cardRegex = /<div class="notebooklm-box">[\s\S]*?<\/div>(\s*<\/div>)?/i;
    const cardHtml = `<div class="notebooklm-box">
  <div class="notebooklm-header">🧠 Studio con Google NotebookLM</div>
  <p class="notebooklm-desc">
    Esporta l'intero modulo (<strong>${t.notes.length} lezioni complete + tutti gli schemi e immagini</strong>) in un unico file pronto per l'analisi multimodale di Google NotebookLM:
  </p>
  <div class="notebooklm-actions">
    <a href="${pdfFileName}" download class="btn-notebooklm btn-notebooklm-primary">
      📥 Scarica PDF con Immagini (Fonte Unica per NotebookLM)
    </a>
  </div>
</div>`;
    
    if (cardRegex.test(indexContent)) {
        indexContent = indexContent.replace(cardRegex, cardHtml);
    } else {
        // Inserisci sotto al primo titolo H1
        const h1Match = indexContent.match(/^# [^\r\n]+/m);
        if (h1Match) {
            const h1 = h1Match[0];
            indexContent = indexContent.replace(h1, `${h1}\n\n${cardHtml}`);
        } else {
            // Inserisci dopo il frontmatter o in cima
            const fmMatch = indexContent.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n/);
            if (fmMatch) {
                indexContent = indexContent.replace(fmMatch[0], `${fmMatch[0]}\n${cardHtml}\n\n`);
            } else {
                indexContent = `${cardHtml}\n\n${indexContent}`;
            }
        }
    }
    
    fs.writeFileSync(indexPath, indexContent, "utf8");
    console.log(`  -> Updated index: ${t.indexFile}`);
    processedCount++;
}

console.log(`\n========================================`);
console.log(`Successfully processed and updated ${processedCount} topics!`);
console.log(`========================================\n`);
