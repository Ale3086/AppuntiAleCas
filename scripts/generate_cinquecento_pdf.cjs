const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const WebSocket = require("ws");

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function unescapeHtml(html) {
    return html
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&");
}

async function main() {
    const root = path.resolve(__dirname, "..");
    const topicContentDir = path.join(root, "content", "Storia", "Il Cinquecento");
    const topicPublicDir = path.join(root, "public", "storia", "il-cinquecento");
    const zContentDir = path.join(topicContentDir, "Zimmagini");
    const zPublicDir = path.join(topicPublicDir, "zimmagini");

    console.log("Checking topicPublicDir:", topicPublicDir);
    if (!fs.existsSync(topicPublicDir)) {
        console.error("public dir not found! Run quartz build first.");
        process.exit(1);
    }

    const chapterOrder = [
        "01_guerre-d'italia-e-il-dominio-di-carlo-v.html",
        "02_riforma-protestante-e-la-frattura-religiosa.html",
        "03_controriforma-cattolica-e-concilio-di-trento.html",
        "04_l'inghilterra-dei-tudor---da-enrico-viii-a-elisabetta-i.html",
        "05_la-spagna-imperiale-di-filippo-ii-e-le-colonie-del-nuovo-mondo.html",
        "06_linea-del-tempo-e-rete-dei-collegamenti-del-cinquecento.html"
    ];

    // Read offline mermaid library
    const mermaidJsPath = path.join(__dirname, "mermaid.min.js");
    let mermaidJs = "";
    if (fs.existsSync(mermaidJsPath)) {
        mermaidJs = fs.readFileSync(mermaidJsPath, "utf8");
    } else {
        console.log("Downloading mermaid.min.js...");
        const res = await fetch("https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js");
        mermaidJs = await res.text();
        fs.writeFileSync(mermaidJsPath, mermaidJs, "utf8");
    }

    // Pre-cache Zimmagini files from both content and public
    const zFiles = [];
    if (fs.existsSync(zPublicDir)) {
        fs.readdirSync(zPublicDir).forEach(f => {
            zFiles.push({ name: f, fullPath: path.join(zPublicDir, f) });
        });
    }
    if (fs.existsSync(zContentDir)) {
        fs.readdirSync(zContentDir).forEach(f => {
            zFiles.push({ name: f, fullPath: path.join(zContentDir, f) });
        });
    }

    function findImageBase64(src) {
        const rawFilename = decodeURIComponent(src.split(/[/\\]/).pop());
        const cleanName = rawFilename.toLowerCase().replace(/[^a-z0-9]/g, "");

        const matched = zFiles.find(item => {
            const itemClean = item.name.toLowerCase().replace(/[^a-z0-9]/g, "");
            return itemClean === cleanName;
        });

        if (!matched || !fs.existsSync(matched.fullPath)) {
            console.warn("  [IMAGE WARNING] Image not found on disk:", rawFilename);
            return null;
        }

        const ext = path.extname(matched.fullPath).toLowerCase();
        let mime = "image/png";
        if (ext === ".jpg" || ext === ".jpeg") mime = "image/jpeg";
        else if (ext === ".webp") mime = "image/webp";
        else if (ext === ".svg") mime = "image/svg+xml";

        const buf = fs.readFileSync(matched.fullPath);
        return `data:${mime};base64,${buf.toString("base64")}`;
    }

    let combinedBody = "";
    let diagramCounter = 0;
    let imageCounter = 0;

    for (const chFile of chapterOrder) {
        const fullPath = path.join(topicPublicDir, chFile);
        if (!fs.existsSync(fullPath)) {
            console.warn("Chapter file missing:", chFile);
            continue;
        }

        const html = fs.readFileSync(fullPath, "utf8");
        const articleMatch = html.match(/<article[\s\S]*?<\/article>/i);
        if (!articleMatch) {
            console.warn("No <article> in:", chFile);
            continue;
        }

        let content = articleMatch[0];

        // 1. Process Mermaid blocks using robust regex
        content = content.replace(/<pre[^>]*>[\s\S]*?<code\b[^>]*?class="mermaid"[^>]*?data-clipboard="[^"]*">([\s\S]*?)<\/code>[\s\S]*?<\/pre>/gi, (match, mermaidCode) => {
            diagramCounter++;
            const cleanCode = unescapeHtml(mermaidCode).trim();
            return `<div class="mermaid-diagram" data-id="diag-${diagramCounter}">${cleanCode}</div>`;
        });

        // 2. Process all <img> tags to inline Base64
        content = content.replace(/<img\b([^>]*?)src="([^">]+)"([^>]*?)>/gi, (fullTag, before, src, after) => {
            const base64Uri = findImageBase64(src);
            if (base64Uri) {
                imageCounter++;
                return `<img ${before}src="${base64Uri}"${after}>`;
            }
            return fullTag;
        });

        combinedBody += `
        <div class="chapter-container">
            ${content}
        </div>
        <div style="page-break-after: always; margin: 3rem 0; border-bottom: 2px dashed #cbd5e1;"></div>
        `;
    }

    console.log(`Processed ${imageCounter} images into Base64 and prepared ${diagramCounter} Mermaid diagrams.`);

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
            max-width: 100% !important;
            height: auto !important;
            display: block;
            margin: 1.8rem auto;
            border-radius: 8px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            border: 1px solid #e2e8f0;
        }
        
        /* Box Mermaid Diagram */
        .mermaid-rendered-box {
            margin: 2rem auto;
            padding: 1.5rem;
            background: #f8fafc;
            border: 1px solid #cbd5e1;
            border-radius: 10px;
            text-align: center;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
            page-break-inside: avoid;
        }
        .mermaid-rendered-box svg {
            max-width: 100% !important;
            height: auto !important;
            display: inline-block;
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
        pre:not(.mermaid) {
            background-color: #0f172a;
            color: #f8fafc;
            padding: 1.25rem;
            border-radius: 8px;
            overflow-x: auto;
            font-size: 0.9rem;
        }
        
        .note-properties, .breadcrumb-container, .content-meta, .toc, .backlinks, .expand-button {
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
            img, table, pre, .mermaid-rendered-box {
                page-break-inside: avoid;
            }
        }
    </style>
    `;

    const fullHtml = `<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="utf-8">
    <title>Il Cinquecento - Raccolta Completa Appunti</title>
    ${printStyles}
    <script>${mermaidJs}</script>
</head>
<body>
    <div class="cover-page">
        <div class="cover-title">Il Cinquecento</div>
        <div class="cover-subtitle">Raccolta Completa: 6 Lezioni, Schemi Architetturali e Rete Logica</div>
        <div class="cover-desc">
            Documento consolidato con testo integrale, tabelle sinottiche, tutti i 22 schemi storici e i flowcharts dei collegamenti dinastici e geopolitici.
            Ottimizzato per lo studio approfondito e per l'ingestione multimodale su Google NotebookLM.
        </div>
        <div class="cover-badge">✨ Fonte Unica per Google NotebookLM</div>
    </div>
    ${combinedBody}

    <script>
        mermaid.initialize({
            startOnLoad: false,
            theme: 'default',
            flowchart: { curve: 'basis', htmlLabels: true },
            themeVariables: {
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                primaryColor: '#eef2ff',
                primaryBorderColor: '#6366f1',
                primaryTextColor: '#1e1b4b',
                lineColor: '#6366f1'
            }
        });

        window.addEventListener('DOMContentLoaded', async () => {
            const els = document.querySelectorAll('.mermaid-diagram');
            console.log('DOM ready, found mermaid diagrams:', els.length);
            for (let i = 0; i < els.length; i++) {
                const el = els[i];
                const code = el.textContent.trim();
                try {
                    const { svg } = await mermaid.render('mermaid-chart-' + i, code);
                    const box = document.createElement('div');
                    box.className = 'mermaid-rendered-box';
                    box.innerHTML = svg;
                    el.parentNode.replaceChild(box, el);
                    console.log('Successfully rendered diagram #' + i);
                } catch (e) {
                    console.error('Failed to render diagram #' + i, e);
                    const errBox = document.createElement('div');
                    errBox.className = 'mermaid-rendered-box';
                    errBox.style.color = '#dc2626';
                    errBox.innerHTML = '<em>[Schema logico Mermaid: rendering non riuscito]</em>';
                    el.parentNode.replaceChild(errBox, el);
                }
            }
            window.__MERMAID_DONE__ = true;
        });
    </script>
</body>
</html>`;

    const tempHtmlPath = path.join(topicPublicDir, "temp_cinquecento_consolidated.html");
    fs.writeFileSync(tempHtmlPath, fullHtml, "utf8");
    console.log("Saved consolidated HTML at:", tempHtmlPath);

    // Target PDFs
    const outPdfContent = path.join(topicContentDir, "Il_Cinquecento_completo.pdf");
    const outPdfPublic = path.join(topicPublicDir, "il_cinquecento_completo.pdf");

    // Launch Edge/Chrome with CDP
    let browserPath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
    if (!fs.existsSync(browserPath)) {
        browserPath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
    }

    const cdpPort = 9226;
    console.log(`Launching browser [${browserPath}] on port ${cdpPort}...`);
    const proc = spawn(browserPath, [
        "--headless=new",
        `--remote-debugging-port=${cdpPort}`,
        "--disable-gpu",
        "--no-first-run",
        "--no-default-browser-check"
    ]);

    await sleep(1500);

    const vRes = await fetch(`http://127.0.0.1:${cdpPort}/json/version`);
    const vData = await vRes.json();
    console.log("Connected to CDP:", vData.Browser);

    const newRes = await fetch(`http://127.0.0.1:${cdpPort}/json/new?about:blank`, { method: "PUT" });
    const pData = await newRes.json();
    const ws = new WebSocket(pData.webSocketDebuggerUrl);
    await new Promise(r => ws.on("open", r));

    let msgId = 1;
    function send(method, params = {}) {
        return new Promise((resolve, reject) => {
            const id = msgId++;
            const handler = (data) => {
                const msg = JSON.parse(data.toString());
                if (msg.id === id) {
                    ws.off("message", handler);
                    if (msg.error) reject(msg.error);
                    else resolve(msg.result);
                }
            };
            ws.on("message", handler);
            ws.send(JSON.stringify({ id, method, params }));
        });
    }

    // Forward browser console logs to terminal
    ws.on("message", (data) => {
        const msg = JSON.parse(data.toString());
        if (msg.method === "Runtime.consoleAPICalled") {
            const text = msg.params.args.map(a => a.value || JSON.stringify(a)).join(" ");
            console.log(`  [Browser Console] ${text}`);
        }
    });

    await send("Page.enable");
    await send("Runtime.enable");

    const fileUrl = "file:///" + tempHtmlPath.replace(/\\/g, "/");
    console.log("Navigating to consolidated HTML...");
    await send("Page.navigate", { url: fileUrl });

    // Wait for Mermaid rendering completion
    console.log("Waiting for Mermaid SVGs and images to render...");
    for (let i = 0; i < 60; i++) {
        await sleep(300);
        const evalRes = await send("Runtime.evaluate", {
            expression: "Boolean(window.__MERMAID_DONE__)",
            returnByValue: true
        });
        if (evalRes && evalRes.result && evalRes.result.value === true) {
            console.log("Mermaid rendering confirmed complete!");
            break;
        }
    }

    // Verify SVGs
    const svgCount = await send("Runtime.evaluate", {
        expression: "document.querySelectorAll('.mermaid-rendered-box svg').length",
        returnByValue: true
    });
    console.log(`Rendered Mermaid SVGs count: ${svgCount.result.value}`);

    // Verify Images
    const imgCheck = await send("Runtime.evaluate", {
        expression: `Array.from(document.querySelectorAll('img')).filter(img => img.complete && img.naturalWidth > 0).length`,
        returnByValue: true
    });
    console.log(`Successfully loaded and rendered Images count: ${imgCheck.result.value}`);

    await sleep(1000);

    console.log("Generating final PDF via CDP Page.printToPDF...");
    const pdfData = await send("Page.printToPDF", {
        printBackground: true,
        preferCSSPageSize: true,
        marginTop: 0.4,
        marginBottom: 0.4,
        marginLeft: 0.4,
        marginRight: 0.4
    });

    const pdfBuffer = Buffer.from(pdfData.data, "base64");
    fs.writeFileSync(outPdfContent, pdfBuffer);
    fs.writeFileSync(outPdfPublic, pdfBuffer);
    console.log(`\n========================================`);
    console.log(`SUCCESS! Generated PDF:`);
    console.log(`  Content: ${outPdfContent} (${(pdfBuffer.length / 1024 / 1024).toFixed(2)} MB)`);
    console.log(`  Public:  ${outPdfPublic} (${(pdfBuffer.length / 1024 / 1024).toFixed(2)} MB)`);
    console.log(`========================================\n`);

    ws.close();
    proc.kill();

    try { fs.unlinkSync(tempHtmlPath); } catch (e) {}
}

main().catch(err => {
    console.error("FATAL ERROR:", err);
    process.exit(1);
});
