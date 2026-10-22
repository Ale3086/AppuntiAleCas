const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const root = path.resolve(__dirname, "..");
const contentRoot = path.join(root, "content");
const publicRoot = path.join(root, "public");
const exportDir = path.join(root, "exports");

if (!fs.existsSync(exportDir)) {
    fs.mkdirSync(exportDir, { recursive: true });
}

// Trova Edge o Chrome
let browserPath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
if (!fs.existsSync(browserPath)) {
    browserPath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
}
if (!fs.existsSync(browserPath)) {
    console.error("Neither Edge nor Chrome was found for PDF generation.");
    process.exit(1);
}

// I 12 veri argomenti didattici
const topicModules = [
    { name: "Modello ISO-OSI", relDir: "Sistemi e reti/Modello ISO-OSI" },
    { name: "Cablaggio strutturato", relDir: "Sistemi e reti/Cablaggio strutturato" },
    { name: "Automi e Reti Logiche", relDir: "Sistemi e reti/Automi e Reti Logiche" },
    { name: "Teoria dei sistemi e Architettura", relDir: "Sistemi e reti/Teoria dei sistemi e Architettura" },
    { name: "Digitalizzazione e Multimedialità", relDir: "TIPSIT/Digitalizzazione e Multimedialità" },
    { name: "Operazioni coi binari e conversioni", relDir: "TIPSIT/Operazioni coi binari e conversioni" },
    { name: "Sistemi operativi", relDir: "TIPSIT/Sistemi operativi" },
    { name: "Java", relDir: "Informatica/Java" },
    { name: "Python", relDir: "Informatica/Python" },
    { name: "HTML", relDir: "Informatica/HTML/html" },
    { name: "JavaScript", relDir: "Informatica/HTML/javaScript" },
    { name: "Algoritmi di ordinamento", relDir: "Informatica/Cpp/Teoria/Algoritmi di ordinamento" }
];

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
    .chapter-container { margin-bottom: 2.5rem; }
    h1 { color: #1e1b4b; font-size: 2.1rem; border-bottom: 2px solid #e0e7ff; padding-bottom: 0.5rem; margin-top: 1.5rem; }
    h2 { color: #312e81; font-size: 1.5rem; margin-top: 2rem; border-bottom: 1px solid #f1f5f9; padding-bottom: 0.3rem; }
    h3 { color: #4338ca; font-size: 1.25rem; margin-top: 1.5rem; }
    h4 { color: #475569; font-size: 1.1rem; }
    img { max-width: 100%; height: auto; display: block; margin: 1.5rem auto; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border: 1px solid #e2e8f0; }
    table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; font-size: 0.95rem; }
    th, td { border: 1px solid #cbd5e1; padding: 0.75rem 1rem; text-align: left; }
    th { background-color: #f8fafc; font-weight: 700; color: #1e293b; }
    tr:nth-child(even) { background-color: #f8fafc; }
    blockquote.callout { border-left: 4px solid #6366f1; background-color: #f5f7ff; padding: 1rem 1.25rem; border-radius: 0 8px 8px 0; margin: 1.5rem 0; }
    .callout-title { font-weight: 700; color: #312e81; margin-bottom: 0.5rem; }
    pre, code { font-family: 'IBM Plex Mono', monospace; }
    code:not(pre code) { background-color: #f1f5f9; color: #0f172a; padding: 0.2rem 0.4rem; border-radius: 4px; font-size: 0.9em; }
    pre { background-color: #0f172a; color: #f8fafc; padding: 1.25rem; border-radius: 8px; overflow-x: auto; font-size: 0.9rem; }
    .note-properties, .breadcrumb-container, .content-meta, .toc, .backlinks, .notebooklm-box { display: none !important; }
    .text-highlight { background-color: rgba(255, 224, 102, 0.45); color: #1a1a1a; padding: 0.12em 0.35em; border-radius: 4px; font-weight: 600; border-bottom: 2px solid #fbc02d; }
    @media print {
        body { padding: 0; max-width: 100%; }
        .chapter-container { page-break-inside: avoid; }
        h1, h2 { page-break-after: avoid; }
        img, table, pre { page-break-inside: avoid; }
    }
</style>
`;

function sanitizePdfName(name) {
    return name.replace(/[\s\/\\:*\?"<>|]+/g, "_").replace(/^_+|_+$/g, "") + "_completo.pdf";
}

function generateTopicPdf(topic) {
    const fullTopicDir = path.join(contentRoot, ...topic.relDir.split("/"));
    if (!fs.existsSync(fullTopicDir)) {
        console.error(`Error: folder not found: ${fullTopicDir}`);
        return false;
    }

    const notes = fs.readdirSync(fullTopicDir)
        .filter(f => f.endsWith(".md") && !f.startsWith("_index_") && f !== "index.md")
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));

    console.log(`\nGenerazione PDF per: ${topic.name} (${notes.length} note)...`);

    // Risolvi publicTopicDir
    let publicTopicDir = publicRoot;
    for (const seg of topic.relDir.split("/")) {
        if (!fs.existsSync(publicTopicDir)) { publicTopicDir = null; break; }
        const children = fs.readdirSync(publicTopicDir);
        const segClean = seg.toLowerCase().replace(/[^a-z0-9]/g, "");
        const matched = children.find(c => c.toLowerCase().replace(/[^a-z0-9]/g, "") === segClean);
        if (matched) { publicTopicDir = path.join(publicTopicDir, matched); } else { publicTopicDir = null; break; }
    }

    if (!publicTopicDir || !fs.existsSync(publicTopicDir)) {
        console.warn(`Cartella public non trovata per ${topic.name}. Esegui prima "npm run quartz build".`);
        return false;
    }

    const publicFiles = fs.readdirSync(publicTopicDir).filter(f => f.endsWith(".html") && !f.startsWith("index") && !f.includes("og-image"));
    let combinedBody = "";

    for (const note of notes) {
        const noteClean = note.replace(/\.md$/, "").toLowerCase().replace(/[^a-z0-9]/g, "");
        let matchedHtml = publicFiles.find(f => f.replace(/\.html$/, "").toLowerCase().replace(/[^a-z0-9]/g, "") === noteClean);
        if (!matchedHtml) {
            matchedHtml = publicFiles.find(f => {
                const fClean = f.replace(/\.html$/, "").toLowerCase().replace(/[^a-z0-9]/g, "");
                return fClean.includes(noteClean.substring(0, 15)) || noteClean.includes(fClean.substring(0, 15));
            });
        }

        if (matchedHtml) {
            const htmlContent = fs.readFileSync(path.join(publicTopicDir, matchedHtml), "utf8");
            const articleMatch = htmlContent.match(/<article[\s\S]*?<\/article>/i);
            if (articleMatch) {
                let content = articleMatch[0];
                content = content.replace(/<img[^>]+src="([^">]+)"/gi, (fullImg, src) => {
                    let localImgPath = "";
                    if (src.toLowerCase().includes("zimmagini")) {
                        const imgFile = decodeURIComponent(src.split(/zimmagini[\/\\]/i).pop());
                        const zDir = path.join(fullTopicDir, "Zimmagini");
                        if (fs.existsSync(zDir)) {
                            const found = fs.readdirSync(zDir).find(f => f.toLowerCase() === imgFile.toLowerCase());
                            if (found) {
                                localImgPath = "file:///" + path.join(zDir, found).replace(/\\/g, "/");
                            }
                        }
                    }
                    return localImgPath ? fullImg.replace(src, localImgPath) : fullImg;
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

    if (combinedBody.trim().length === 0) {
        console.error(`Nessun contenuto estratto per ${topic.name}.`);
        return false;
    }

    const fullDocHtml = `<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="utf-8">
    <title>${topic.name} - Raccolta Completa Appunti</title>
    ${printStyles}
</head>
<body>
    <div class="cover-page">
        <div class="cover-title">${topic.name}</div>
        <div class="cover-subtitle">Raccolta Completa: ${notes.length} Lezioni ed Esercizi</div>
        <div class="cover-desc">
            Documento consolidato con testo integrale, tabelle, formule e tutti gli schemi visivi.
            Formattato appositamente per l'ingestione e lo studio su Google NotebookLM.
        </div>
        <div class="cover-badge">✨ Fonte Unica per Google NotebookLM</div>
    </div>
    ${combinedBody}
</body>
</html>`;

    const pdfFileName = sanitizePdfName(topic.name);
    const outPdfPath = path.join(exportDir, pdfFileName);
    const tempHtmlPath = path.join(exportDir, `_temp_${pdfFileName}.html`);
    fs.writeFileSync(tempHtmlPath, fullDocHtml, "utf8");

    const fileUrl = "file:///" + tempHtmlPath.replace(/\\/g, "/");
    const args = [
        "--headless=new",
        "--disable-gpu",
        "--no-pdf-header-footer",
        `--print-to-pdf=${outPdfPath}`,
        fileUrl
    ];

    spawnSync(browserPath, args);
    try { fs.unlinkSync(tempHtmlPath); } catch (e) {}

    if (fs.existsSync(outPdfPath)) {
        const sz = fs.statSync(outPdfPath).size;
        console.log(`✅ PDF Generato con successo: ${(sz / 1024).toFixed(1)} KB`);
        console.log(`   Percorso: ${outPdfPath}`);
        return true;
    } else {
        console.error(`❌ Errore durante la generazione del PDF per ${topic.name}`);
        return false;
    }
}

// Gestione argomenti da riga di comando
const arg = process.argv[2];

if (!arg) {
    console.log(`\n======================================================`);
    console.log(`  GENERATORE PDF PER GOOGLE NOTEBOOKLM`);
    console.log(`======================================================`);
    console.log(`Scegli quale argomento generare specificando il nome o numero:\n`);
    topicModules.forEach((t, i) => {
        console.log(`  [${i + 1}] ${t.name} (${t.relDir})`);
    });
    console.log(`  [all] Genera tutti i 12 argomenti`);
    console.log(`\nUso:`);
    console.log(`  npm run export-pdf -- 1`);
    console.log(`  npm run export-pdf -- "Modello ISO-OSI"`);
    console.log(`  npm run export-pdf -- all\n`);
    process.exit(0);
}

if (arg.toLowerCase() === "all") {
    console.log(`\nAvvio generazione per tutti i ${topicModules.length} argomenti...`);
    let success = 0;
    for (const t of topicModules) {
        if (generateTopicPdf(t)) success++;
    }
    console.log(`\nCompletato: ${success}/${topicModules.length} PDF generati nella cartella: ${exportDir}\n`);
} else {
    let matchedTopic = null;
    const num = parseInt(arg, 10);
    if (!isNaN(num) && num >= 1 && num <= topicModules.length) {
        matchedTopic = topicModules[num - 1];
    } else {
        const queryClean = arg.toLowerCase().replace(/[^a-z0-9]/g, "");
        matchedTopic = topicModules.find(t => t.name.toLowerCase().replace(/[^a-z0-9]/g, "").includes(queryClean));
    }

    if (!matchedTopic) {
        console.error(`Argomento "${arg}" non riconosciuto. Esegui "npm run export-pdf" per la lista.`);
        process.exit(1);
    }

    generateTopicPdf(matchedTopic);
}
