const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const root = path.resolve(__dirname, "..");
const topicContentDir = path.join(root, "content", "Sistemi e reti", "Modello ISO-OSI");
const topicPublicDir = path.join(root, "public", "sistemi-e-reti", "modello-iso-osi");

console.log("Checking topicPublicDir:", topicPublicDir);
if (!fs.existsSync(topicPublicDir)) {
    console.error("public dir not found! Run quartz build first.");
    process.exit(1);
}

// 1. Ordine dei capitoli
const chapterFiles = [
    "01_introduzione-alle-reti-informatiche.html",
    "02_paradigmi-di-rete---client-server-e-peer-to-peer.html",
    "03_tipologie-e-topologie-di-rete.html",
    "04_tecniche-di-commutazione---circuito-e-pacchetto.html",
    "05_indirizzamento-e-identificazione-nelle-reti.html",
    "06_apparati-di-rete.html",
    "07_il-modello-iso-osi-e-architettura-a-livelli.html",
    "08_le-reti-ethernet-e-standard-ieee-802.3.html",
    "09_tecniche-di-accesso-al-canale-casuali.html",
    "ripasso-finale-e-flashcard.html"
];

// Estrai stili CSS dal primo file HTML
const firstHtml = fs.readFileSync(path.join(topicPublicDir, chapterFiles[0]), "utf8");
const cssMatches = [...firstHtml.matchAll(/<link rel="stylesheet"[^>]+href="([^"]+)"|<link href="([^"]+)"[^>]+rel="stylesheet"/g)];
const cssLinks = cssMatches.map(m => m[1] || m[2]).filter(Boolean);

console.log("Found CSS links:", cssLinks.length);

let combinedBody = "";

for (const chFile of chapterFiles) {
    const fullPath = path.join(topicPublicDir, chFile);
    if (!fs.existsSync(fullPath)) {
        console.warn("File missing:", chFile);
        continue;
    }
    const html = fs.readFileSync(fullPath, "utf8");
    
    // Estrai il contenuto dell'articolo
    const articleMatch = html.match(/<article[\s\S]*?<\/article>/i);
    if (articleMatch) {
        let content = articleMatch[0];
        // Normalizza i percorsi delle immagini a percorsi relativi locali
        // ../../sistemi-e-reti/modello-iso-osi/zimmagini/... -> ./zimmagini/...
        content = content.replace(/(?:\.\.\/)+sistemi-e-reti\/modello-iso-osi\/zimmagini\//gi, "./zimmagini/");
        content = content.replace(/(?:\.\.\/)+static\//gi, "../../static/");
        
        combinedBody += `
        <div class="chapter-container">
            ${content}
        </div>
        <div style="page-break-after: always; margin: 3rem 0; border-bottom: 2px dashed #e2e8f0;"></div>
        `;
    }
}

// Genera un CSS embed per la stampa pulita
const printStyles = `
<style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=IBM+Plex+Mono:wght@400;600&display=swap');
    
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
    
    .note-properties, .breadcrumb-container, .content-meta {
        display: none !important;
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

const completeHtml = `<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="utf-8">
    <title>Modello ISO-OSI - Raccolta Completa Appunti</title>
    ${printStyles}
</head>
<body>
    <div class="cover-page">
        <div class="cover-title">Sistemi e Reti</div>
        <div class="cover-subtitle">Modulo Completo: Il Modello ISO-OSI e Fondamenti di Rete</div>
        <div class="cover-desc">
            Raccolta completa e sequenziale di tutti i 10 capitoli teorici, corredata di tutti i 22 schemi architetturali, topologie fisiche, grafici e tabelle comparative. Documento unificato ottimizzato per lo studio e per l'ingestione multimodale su Google NotebookLM.
        </div>
        <div class="cover-badge">✨ Raccolta Integrata per Google NotebookLM</div>
    </div>
    ${combinedBody}
</body>
</html>`;

const outHtmlPath = path.join(topicPublicDir, "raccolta-completa.html");
fs.writeFileSync(outHtmlPath, completeHtml, "utf8");
console.log("Written complete HTML to:", outHtmlPath);

// Ora compiliamo in PDF con Edge/Chrome headless
const outPdfPublic = path.join(topicPublicDir, "Modello_ISO-OSI_completo.pdf");
const outPdfContent = path.join(topicContentDir, "Modello_ISO-OSI_completo.pdf");

let browserPath = "C:\\Program Files (x86)\\Microsoft\Edge\\Application\\msedge.exe";
if (!fs.existsSync(browserPath)) {
    browserPath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
}

console.log("Using browser for PDF print:", browserPath);
const fileUrl = "file:///" + outHtmlPath.replace(/\\/g, "/");

const { spawnSync } = require("child_process");

try {
    const args = [
        "--headless=new",
        "--disable-gpu",
        "--no-pdf-header-footer",
        `--print-to-pdf=${outPdfPublic}`,
        fileUrl
    ];
    console.log("Executing PDF generation via spawnSync...");
    const res = spawnSync(browserPath, args, { stdio: "inherit" });
    if (res.error) console.error("Spawn error:", res.error);
    
    if (fs.existsSync(outPdfPublic)) {
        const stats = fs.statSync(outPdfPublic);
        console.log("SUCCESS! Generated PDF size:", stats.size, "bytes at", outPdfPublic);
        fs.copyFileSync(outPdfPublic, outPdfContent);
        console.log("Copied PDF to content dir:", outPdfContent);
    } else {
        console.error("PDF was not created at expected location.");
    }
} catch (err) {
    console.error("Error generating PDF:", err);
}
