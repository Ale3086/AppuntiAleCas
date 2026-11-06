const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const WebSocket = require("ws");

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// SHARED CSS FOR 560px GALAXY WATCH ULTRA NATIVE WIDTH
const watchCss = `
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@800;900&family=Inter:wght@800;900&display=swap');

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
        font-family: 'Inter', -apple-system, sans-serif;
        background-color: #000000;
        color: #ffffff;
        padding: 10px;
        width: 580px;
        margin: 0 auto;
        -webkit-font-smoothing: antialiased;
    }

    /* TOP HEADER */
    .top-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #0d111a;
        border: 2px solid #ff5500;
        border-radius: 10px;
        padding: 8px 12px;
        margin-bottom: 8px;
        box-shadow: 0 0 12px rgba(255, 85, 0, 0.3);
    }
    .top-title {
        font-size: 1.15rem;
        font-weight: 900;
        color: #ffffff;
        letter-spacing: -0.5px;
    }
    .top-badge {
        background: #ff5500;
        color: #000;
        font-family: 'JetBrains Mono', monospace;
        font-weight: 900;
        font-size: 0.8rem;
        padding: 3px 8px;
        border-radius: 6px;
    }

    /* SECTION HEADER */
    .sec-banner {
        font-size: 1.02rem;
        font-weight: 900;
        letter-spacing: 0.3px;
        padding: 6px 10px;
        border-radius: 8px;
        margin-top: 10px;
        margin-bottom: 6px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .sb-orange { background: #ff5500; color: #000; }
    .sb-purple { background: #c084fc; color: #000; }
    .sb-green  { background: #10b981; color: #000; }
    .sb-cyan   { background: #00e5ff; color: #000; }
    .sb-yellow { background: #fbbf24; color: #000; }

    /* ENTRY ROW */
    .row {
        display: flex;
        align-items: center;
        background: #0d121d;
        border: 1.5px solid #1f293d;
        border-radius: 8px;
        padding: 5px 8px;
        margin-bottom: 5px;
        gap: 8px;
    }
    .row:last-child { margin-bottom: 0; }

    /* BADGE (LEFT) */
    .b {
        font-family: 'JetBrains Mono', monospace;
        font-weight: 900;
        font-size: 0.86rem;
        padding: 3px 7px;
        border-radius: 6px;
        white-space: nowrap;
        min-width: 145px;
        max-width: 145px;
        text-align: center;
        flex-shrink: 0;
    }
    .b-orange { background: #ff5500; color: #000; }
    .b-purple { background: #c084fc; color: #000; }
    .b-green  { background: #10b981; color: #000; }
    .b-cyan   { background: #00e5ff; color: #000; }
    .b-yellow { background: #fbbf24; color: #000; }

    /* TRIGGER (RIGHT - MAX 3-4 WORDS) */
    .t {
        font-size: 0.95rem;
        font-weight: 800;
        color: #f1f5f9;
        line-height: 1.18;
        letter-spacing: -0.2px;
    }
    .t em { color: #00e5ff; font-style: normal; font-weight: 900; }
    .t strong { color: #fbbf24; }
    .t alert { color: #ff4d4d; font-weight: 900; }

    /* 4 NONNI SUB-GRID */
    .nonni-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 6px;
        margin-bottom: 6px;
    }
    .nonno-card {
        background: #0d121d;
        border: 1.5px solid #ff5500;
        border-radius: 8px;
        padding: 6px 8px;
    }
    .nonno-kin { font-size: 0.68rem; font-weight: 900; color: #ff5500; text-transform: uppercase; }
    .nonno-name { font-size: 0.9rem; font-weight: 900; color: #ffffff; }
    .nonno-loot { font-size: 0.85rem; font-weight: 800; color: #00e5ff; }

    .sub-box {
        background: #171507;
        border: 1.5px solid #fbbf24;
        border-radius: 6px;
        padding: 6px 10px;
        margin-bottom: 6px;
        font-size: 0.85rem;
        font-weight: 800;
        display: flex;
        justify-content: space-between;
    }
`;

// ==========================================
// PARTE 1 HTML: CARLO V, GUERRE D'ITALIA & RIFORMA
// ==========================================
const parte1Html = `<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="utf-8">
<title>Galaxy Ultra - Parte 1</title>
<style>
${watchCss}
@page { size: 590px 1750px; margin: 0; }
</style>
</head>
<body>

    <div class="top-header">
        <div class="top-title">⚡ GALAXY ULTRA • PARTE 1/2</div>
        <div class="top-badge">CARLO V &amp; RIFORMA</div>
    </div>

    <!-- CARLO V 4 NONNI -->
    <div class="sec-banner sb-orange">
        <span>👑 CARLO V &amp; I 4 NONNI (EREDITÀ)</span>
        <span style="font-size:0.75rem;">1519: 850k FUGGER</span>
    </div>

    <div class="nonni-grid">
        <div class="nonno-card">
            <div class="nonno-kin">👴 Nonno Paterno</div>
            <div class="nonno-name">Massimiliano I</div>
            <div class="nonno-loot">Austria + Corona SRI</div>
        </div>
        <div class="nonno-card">
            <div class="nonno-who" style="font-size:0.68rem; font-weight:900; color:#ff5500; text-transform:uppercase;">👵 Nonna Paterna</div>
            <div class="nonno-name">Maria Borgogna</div>
            <div class="nonno-loot">Fiandre + Paesi Bassi</div>
        </div>
        <div class="nonno-card">
            <div class="nonno-who" style="font-size:0.68rem; font-weight:900; color:#ff5500; text-transform:uppercase;">👵 Nonna Materna</div>
            <div class="nonno-name">Isabella Castiglia</div>
            <div class="nonno-loot">Spagna + Americhe (Potosí)</div>
        </div>
        <div class="nonno-card">
            <div class="nonno-kin">👴 Nonno Materno</div>
            <div class="nonno-name">Ferdinando Aragona</div>
            <div class="nonno-loot">Napoli, Sicilia, Sardegna</div>
        </div>
    </div>

    <div class="sub-box">
        <span style="color:#fbbf24;">GENITORI:</span>
        <span>Filippo il Bello + Giovanna la Pazza</span>
    </div>

    <div class="sub-box" style="border-color:#ff5500; background:#180a04;">
        <span style="color:#ff5500;">⚖️ 1556 ABDICAZIONE:</span>
        <span>Filippo II (Spagna/Italia) | Ferdinando I (SRI/Austria)</span>
    </div>

    <!-- GUERRE D'ITALIA -->
    <div class="sec-banner sb-orange" style="margin-top:8px;">
        <span>⚔️ GUERRE D'ITALIA (1494-1559)</span>
        <span style="font-size:0.75rem;">FRANCIA vs SPAGNA</span>
    </div>

    <div class="row"><span class="b b-orange">1494 Carlo VIII</span><span class="t">Scende in Italia, <em>apre le guerre</em></span></div>
    <div class="row"><span class="b b-orange">1525 Pavia</span><span class="t">Cattura Francesco I, <em>Milano agli Asburgo</em></span></div>
    <div class="row"><span class="b b-orange">1527 Sacco Roma</span><span class="t">12.000 Lanzichenecchi, <em>Clemente VII assediato</em></span></div>
    <div class="row"><span class="b b-orange">1529 Cambrai</span><span class="t">Pace Due Dame (Luisa Savoia / Margherita)</span></div>
    <div class="row"><span class="b b-orange">1530 Bologna</span><span class="t">Clemente VII incorona <em>Carlo V imperatore</em></span></div>
    <div class="row"><span class="b b-orange">1559 Cateau-Cambr.</span><span class="t"><strong>Egemonia Spagnola in Italia</strong> (MI, NA, Isole)</span></div>

    <!-- RIFORMA PROTESTANTE -->
    <div class="sec-banner sb-purple" style="margin-top:10px;">
        <span>✝️ RIFORMA: LUTERO &amp; CALVINO</span>
        <span style="font-size:0.75rem;">1517-1555</span>
    </div>

    <div class="row"><span class="b b-purple">1517 Wittenberg</span><span class="t">95 Tesi, <em>contro vendita indulgenze</em></span></div>
    <div class="row"><span class="b b-purple">Johann Tetzel</span><span class="t">Frate predicatore, <em>vendita indulgenze</em></span></div>
    <div class="row"><span class="b b-purple">4 Pilastri</span><span class="t"><strong>Fede, Scrittura, Sacerdozio, 2 Sacramenti</strong></span></div>
    <div class="row"><span class="b b-purple">1520 Scomunica</span><span class="t">Bolla <em>Exsurge Domine</em> (bruciata da Lutero)</span></div>
    <div class="row"><span class="b b-purple">1521 Worms</span><span class="t">Lutero non ritratta, <strong>bando imperiale</strong></span></div>
    <div class="row"><span class="b b-purple">Castello Wartburg</span><span class="t">Protetto da Federico Saggio, <em>Bibbia tedesco</em></span></div>
    <div class="row"><span class="b b-purple">Thomas Müntzer</span><span class="t">Guerra contadini, <strong>strage Frankenhausen (1525)</strong></span></div>
    <div class="row"><span class="b b-purple">Lega Smalcalda</span><span class="t">Principi protestanti <em>contro Carlo V (1531)</em></span></div>
    <div class="row"><span class="b b-purple">Calvino (Ginevra)</span><span class="t"><strong>Doppia Predestinazione</strong> + Lavoro sacro (<em>Beruf</em>)</span></div>
    <div class="row"><span class="b b-purple">Michele Serveto</span><span class="t">Antitrinitario, <strong>bruciato vivo al rogo (1553)</strong></span></div>
    <div class="row"><span class="b b-purple">1555 Augusta</span><span class="t"><strong>"Cuius regio eius religio"</strong> (<alert>NO CALVINISTI!</alert>)</span></div>
    <div class="row"><span class="b b-purple">Reservatum Eccles.</span><span class="t">Conversione dopo 1552: <em>perdita feudi</em></span></div>

</body>
</html>`;

// ==========================================
// PARTE 2 HTML: CONTRORIFORMA, TUDOR & SPAGNA/COLONIE
// ==========================================
const parte2Html = `<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="utf-8">
<title>Galaxy Ultra - Parte 2</title>
<style>
${watchCss}
@page { size: 590px 1750px; margin: 0; }
</style>
</head>
<body>

    <div class="top-header" style="border-color: #00e5ff;">
        <div class="top-title">⚡ GALAXY ULTRA • PARTE 2/2</div>
        <div class="top-badge" style="background:#00e5ff; color:#000;">TRENTO, TUDOR &amp; SPAGNA</div>
    </div>

    <!-- CONTRORIFORMA & TRENTO -->
    <div class="sec-banner sb-green">
        <span>🛡️ CONTRORIFORMA &amp; TRENTO</span>
        <span style="font-size:0.75rem;">1545-1563</span>
    </div>

    <div class="row"><span class="b b-green">Paolo III Farnese</span><span class="t">Papa che <em>apre il Concilio di Trento</em></span></div>
    <div class="row"><span class="b b-green">7 Sacramenti</span><span class="t">Tutti confermati + <strong>Transustanziazione</strong></span></div>
    <div class="row"><span class="b b-green">Vulgata Latina</span><span class="t">San Girolamo, <em>unica Bibbia ammessa</em></span></div>
    <div class="row"><span class="b b-green">Opere + Fede</span><span class="t">Salvezza per fede E <strong>opere buone</strong></span></div>
    <div class="row"><span class="b b-green">Obbligo Seminari</span><span class="t">Istruzione preti + <strong>obbligo residenza vescovi</strong></span></div>
    <div class="row"><span class="b b-green">Registri Parroco</span><span class="t">Battesimi, matrimoni, <em>Status Animarum</em></span></div>
    <div class="row"><span class="b b-green">Ignazio di Loyola</span><span class="t">Fonda i <strong>Gesuiti (1540)</strong>, Esercizi Spirituali</span></div>
    <div class="row"><span class="b b-green">4° Voto Gesuiti</span><span class="t">Cieca obbedienza al Papa (<em>perinde ac cadaver</em>)</span></div>
    <div class="row"><span class="b b-green">Missioni Gesuiti</span><span class="t">Collegi nobili, <em>Riduzioni Paraguay, Cina</em></span></div>
    <div class="row"><span class="b b-green">1542 Sant'Uffizio</span><span class="t">Tribunale Inquisizione Romana, <em>torture/roghi</em></span></div>
    <div class="row"><span class="b b-green">1559 Indice Libri</span><span class="t">Papa Paolo IV Carafa, <strong>censura totale</strong></span></div>

    <!-- INGHILTERRA DEI TUDOR -->
    <div class="sec-banner sb-cyan" style="margin-top:10px;">
        <span>👑 INGHILTERRA DEI TUDOR</span>
        <span style="font-size:0.75rem;">LONDRA &amp; ROTTE ATLANTICHE</span>
    </div>

    <div class="row"><span class="b b-cyan">1534 Supremazia</span><span class="t"><strong>Enrico VIII</strong> capo supremo Chiesa Anglicana</span></div>
    <div class="row"><span class="b b-cyan">Caterina Aragona</span><span class="t">Zia Carlo V, <em>Papa rifiuta divorzio</em></span></div>
    <div class="row"><span class="b b-cyan">Anna Bolena</span><span class="t">Seconda moglie, <em>madre Elisabetta, decapitata</em></span></div>
    <div class="row"><span class="b b-cyan">Tommaso Moro</span><span class="t">Umanista decapitato, <strong>rifiuta Atto Supremazia</strong></span></div>
    <div class="row"><span class="b b-cyan">La Gentry</span><span class="t">Nobiltà terriera arricchita <em>con terre Chiesa</em></span></div>
    <div class="row"><span class="b b-cyan">Edoardo VI (1549)</span><span class="t">Libro preghiere: <em>Book of Common Prayer</em></span></div>
    <div class="row"><span class="b b-cyan">Maria I Tudor</span><span class="t"><strong>Bloody Mary</strong>, moglie Filippo II, 300 roghi</span></div>
    <div class="row"><span class="b b-cyan">Maria Stuart</span><span class="t">Regina Scozia, cattolica, <strong>decapitata (1587)</strong></span></div>
    <div class="row"><span class="b b-cyan">Elisabetta I</span><span class="t">Età dell'oro, <em>sviluppo flotta, lana, teatro</em></span></div>
    <div class="row"><span class="b b-cyan">Francis Drake</span><span class="t">Corsaro della regina, <strong>attacca argento spagnolo</strong></span></div>
    <div class="row"><span class="b b-cyan">1588 Manica</span><span class="t"><strong>Invincibile Armata distrutta</strong> da brulotti e tempesta</span></div>
    <div class="row"><span class="b b-cyan">I Brulotti</span><span class="t">Navi incendiarie inglesi <em>gettate nel panico spagnolo</em></span></div>

    <!-- SPAGNA DI FILIPPO II & COLONIE -->
    <div class="sec-banner sb-yellow" style="margin-top:10px;">
        <span>🌎 FILIPPO II &amp; COLONIE AMERICANE</span>
        <span style="font-size:0.75rem;">MADRID &amp; POTOSÍ</span>
    </div>

    <div class="row"><span class="b b-yellow">Hernán Cortés</span><span class="t">Conquista <strong>Aztechi di Montezuma (1519-21)</strong></span></div>
    <div class="row"><span class="b b-yellow">Francisco Pizarro</span><span class="t">Stermina <strong>Inca di Atahualpa (1531-33)</strong></span></div>
    <div class="row"><span class="b b-yellow">Shock Biologico</span><span class="t"><alert>-90% indigeni morti</alert> per vaiolo e morbillo</span></div>
    <div class="row"><span class="b b-yellow">Encomienda</span><span class="t">Schiavitù feudale: <em>indigeni affidati al colono</em></span></div>
    <div class="row"><span class="b b-yellow">Potosí (miniera)</span><span class="t">Montagna argento Bolivia, <strong>estrazione mercurio</strong></span></div>
    <div class="row"><span class="b b-yellow">L'Asiento</span><span class="t">Monopolio della <em>tratta schiavi neri dall'Africa</em></span></div>
    <div class="row"><span class="b b-yellow">Las Casas</span><span class="t">Domenicano <strong>difensore indigeni</strong> (Brevísima relación)</span></div>
    <div class="row"><span class="b b-yellow">Sepúlveda</span><span class="t">Pro-conquista: <em>indios "schiavi per natura"</em></span></div>
    <div class="row"><span class="b b-yellow">Filippo II</span><span class="t">Capitale Madrid (Escorial), <strong>3 bancarotte statali</strong></span></div>
    <div class="row"><span class="b b-yellow">1571 Lepanto</span><span class="t"><strong>Lega Santa distrugge flotta ottomana</strong></span></div>
    <div class="row"><span class="b b-yellow">Duca d'Alba</span><span class="t">Spagna nei Paesi Bassi: <em>Tribunale dei Torbidi</em></span></div>
    <div class="row"><span class="b b-yellow">1581 Olanda</span><span class="t"><strong>Atto di Abiura</strong>: 7 Province Unite (Orange)</span></div>

</body>
</html>`;

async function renderCard(browserPath, htmlContent, tempHtmlName, outPngName, outPdfName) {
    const root = path.resolve(__dirname, "..");
    const topicContentDir = path.join(root, "content", "Storia", "Il Cinquecento");
    const topicPublicDir = path.join(root, "public", "storia", "il-cinquecento");

    const tempHtmlPath = path.join(topicPublicDir, tempHtmlName);
    fs.writeFileSync(tempHtmlPath, htmlContent, "utf8");

    const outPngContent = path.join(topicContentDir, outPngName);
    const outPngPublic = path.join(topicPublicDir, outPngName);
    const outPdfContent = path.join(topicContentDir, outPdfName);
    const outPdfPublic = path.join(topicPublicDir, outPdfName);

    const cdpPort = 9233 + Math.floor(Math.random() * 50);
    const proc = spawn(browserPath, [
        "--headless=new",
        `--remote-debugging-port=${cdpPort}`,
        "--disable-gpu",
        "--window-size=620,1600",
        "--no-first-run",
        "--no-default-browser-check"
    ]);

    await sleep(1500);

    const vRes = await fetch(`http://127.0.0.1:${cdpPort}/json/version`);
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

    await send("Page.enable");
    await send("Runtime.enable");

    const fileUrl = "file:///" + tempHtmlPath.replace(/\\/g, "/");
    await send("Page.navigate", { url: fileUrl });
    await sleep(1200);

    const metrics = await send("Page.getLayoutMetrics");
    const contentWidth = Math.ceil(metrics.contentSize.width);
    const contentHeight = Math.ceil(metrics.contentSize.height);
    console.log(`[${tempHtmlName}] metrics: width=${contentWidth}px, height=${contentHeight}px`);

    // Screenshot at 1.5x / 2x scale
    const screenshotData = await send("Page.captureScreenshot", {
        format: "png",
        captureBeyondViewport: true,
        clip: {
            x: 0,
            y: 0,
            width: contentWidth,
            height: contentHeight,
            scale: 2
        }
    });

    const pngBuffer = Buffer.from(screenshotData.data, "base64");
    fs.writeFileSync(outPngContent, pngBuffer);
    fs.writeFileSync(outPngPublic, pngBuffer);
    console.log(`Saved PNG: ${outPngContent} (${(pngBuffer.length / 1024).toFixed(1)} KB)`);

    // PDF Single Page exactly sized
    const paperWidthInches = (contentWidth / 96);
    const paperHeightInches = (contentHeight / 96) + 0.08;

    const pdfData = await send("Page.printToPDF", {
        printBackground: true,
        paperWidth: paperWidthInches,
        paperHeight: paperHeightInches,
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
        preferCSSPageSize: false
    });

    const pdfBuffer = Buffer.from(pdfData.data, "base64");
    fs.writeFileSync(outPdfContent, pdfBuffer);
    fs.writeFileSync(outPdfPublic, pdfBuffer);
    console.log(`Saved PDF: ${outPdfContent} (${(pdfBuffer.length / 1024).toFixed(1)} KB)`);

    ws.close();
    proc.kill();
    try { fs.unlinkSync(tempHtmlPath); } catch (e) {}
}

async function main() {
    let browserPath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
    if (!fs.existsSync(browserPath)) {
        browserPath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
    }

    console.log("=== GENERATING PARTE 1 (Carlo V & Riforma) ===");
    await renderCard(browserPath, parte1Html, "temp_part1.html", "Cinquecento_Watch_PARTE1.png", "Cinquecento_Watch_PARTE1.pdf");

    console.log("\n=== GENERATING PARTE 2 (Trento, Tudor & Spagna/Americhe) ===");
    await renderCard(browserPath, parte2Html, "temp_part2.html", "Cinquecento_Watch_PARTE2.png", "Cinquecento_Watch_PARTE2.pdf");

    // Copy Parte 1 as the default Cheatsheet_Watch for backwards compatibility
    const root = path.resolve(__dirname, "..");
    const topicContentDir = path.join(root, "content", "Storia", "Il Cinquecento");
    const topicPublicDir = path.join(root, "public", "storia", "il-cinquecento");
    fs.copyFileSync(path.join(topicContentDir, "Cinquecento_Watch_PARTE1.png"), path.join(topicContentDir, "Cinquecento_Cheatsheet_Watch.png"));
    fs.copyFileSync(path.join(topicContentDir, "Cinquecento_Watch_PARTE1.pdf"), path.join(topicContentDir, "Cinquecento_Cheatsheet_Watch.pdf"));
    fs.copyFileSync(path.join(topicPublicDir, "Cinquecento_Watch_PARTE1.png"), path.join(topicPublicDir, "cinquecento_cheatsheet_watch.png"));
    fs.copyFileSync(path.join(topicPublicDir, "Cinquecento_Watch_PARTE1.pdf"), path.join(topicPublicDir, "cinquecento_cheatsheet_watch.pdf"));

    console.log("\n========================================");
    console.log("ALL CARDS SUCCESSFULLY GENERATED!");
    console.log("========================================\n");
}

main().catch(err => {
    console.error("ERROR:", err);
    process.exit(1);
});
