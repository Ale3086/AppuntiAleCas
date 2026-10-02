const fs = require("fs");
const path = require("path");

const DESCRIPTIONS = {
  // Macro materie
  "Informatica": "Lo studio del pensiero computazionale e della logica di programmazione: linguaggi C++, sviluppo Web (HTML, CSS, JS), algoritmi e strutture dati.",
  "Inglese": "Regole grammaticali complete, teoria dei tempi verbali, lessico tematico e preparazione intensiva per la certificazione linguistica Cambridge B2 First.",
  "Matematica": "Geometria analitica (retta, coniche, circonferenza, parabola, ellisse, iperbole), goniometria, trigonometria, disequazioni e algebra avanzata.",
  "Sistemi e reti": "Architettura delle reti di calcolatori, standard di cablaggio strutturato, apparati di rete e analisi approfondita dei 7 livelli del modello ISO-OSI.",
  "TIPSIT": "Tecnologie Informatiche e Progettazione: sistemi operativi, digitalizzazione multimediale, teoria dei segnali, conversioni binarie e comandi shell.",

  // Informatica subfolders
  "Cpp": "Programmazione in C++: gestione della memoria, puntatori, array, funzioni, struct, classi, librerie e algoritmi di ordinamento.",
  "HTML": "Sviluppo Web Frontend: struttura semantica delle pagine in HTML5, fogli di stile CSS3 e programmazione interattiva con JavaScript.",
  "Librerie": "Prontuario delle librerie standard di C++ (iostream, string, vector, algorithm) con funzioni, metodi e casi d'uso pratici.",
  "Teoria": "Concetti teorici del C++, architettura dei calcolatori e analisi computazionale degli algoritmi di ordinamento.",
  "Algoritmi di ordinamento": "Implementazione, funzionamento passo-passo e complessità computazionale di Bubble Sort, Insertion Sort e Selection Sort.",
  "html": "Elementi fondamentali dell'HTML5: metadati, tag di testo, link, form, tabelle, componenti multimediali e semantica del layout.",
  "javaScript": "Programmazione client-side con JS: fondamenti, strutture dati, sintassi moderna ES6+, programmazione asincrona, OOP e manipolazione del DOM.",

  // Inglese subfolders
  "Certificazione Inglese": "Guida strategica e materiale di preparazione per superare l'esame Cambridge B2 First nelle prove di Listening, Reading, Speaking e Writing.",
  "Listening": "Esercitazioni e tecniche pratiche per affrontare con successo le tracce audio della prova di comprensione orale.",
  "Listening/Esercizi": "Tracce audio ed esercizi guidati di comprensione orale Cambridge B2.",
  "Listening/Strategie": "Strategie specifiche per le domande a risposta multipla, completamento frasi e abbinamento dell'ascolto.",
  "Reading": "Tecniche di lettura rapida (skimming/scanning), Use of English, cloze test e trasformazioni grammaticali con parola chiave.",
  "Reading/Esercizi": "Testi ed esercizi pratici per allenarsi sulla prova di lettura e comprensione.",
  "Reading/Esercizi svolti": "Esercizi di lettura risolti e commentati con spiegazione delle risposte corrette.",
  "Reading/Strategie": "Metodi di risoluzione per multiple matching, open gap-fill, word formation e key word transformations.",
  "Speaking": "Preparazione alla prova orale: interazione con l'esaminatore, confronto a due tra candidati, descrizione di immagini e discussione collaborativa.",
  "Speaking/Esercizi": "Domande tipo, simulazioni d'esame e tracce per fare pratica di conversazione.",
  "Speaking/Strategie": "Frasari utili, connettivi logici e strategie per gestire le quattro parti dello Speaking test.",
  "Writing": "Modelli, regole di impaginazione e criteri di valutazione per essay (saggi argomentativi), email/lettere, articoli, report e recensioni.",
  "Writing/Esercizi": "Tracce ed esercizi pratici di scrittura per il B2 First.",
  "Writing/Esercizi svolti": "Composizioni svolte con punteggio massimo ed analisi degli errori tipici da evitare.",
  "Writing/Strategie": "Formule di apertura/chiusura, registro linguistico (formale vs informale) e pianificazione del testo.",
  "Teoria": "Regole grammaticali complete della lingua inglese: tempi verbali, conditionals, passive voice ed esercizi di consolidamento.",
  "Vocabulary": "Dizionario tematico strutturato con vocaboli, espressioni idiomatiche, traduzioni ed esempi d'uso per contesti reali.",
  "01. Personal Life": "Vocabolario su famiglia, relazioni interpersonali, personalità, emozioni, salute, alimentazione e vita quotidiana.",
  "02. Work and Education": "Lessico dedicato alla scuola, università, carriere lavorative, tecnologie digitali e mondo del lavoro.",
  "03. Society and World": "Terminologia per discutere di tematiche ambientali, ecologia, politica, legge, criminalità e società moderna.",
  "04. Leisure and Travel": "Parole ed espressioni per vacanze, aeroporto, trasporti, hotel, hobby, media, cinema e tempo libero.",
  "05. Word Formation": "Tavole riassuntive di prefissi, suffissi, nomi composti e regole di derivazione morfologica per la parte 3 di Use of English.",

  // Sistemi e reti subfolders
  "Cablaggio strutturato": "Normative ISO/IEC 11801, categorie di cavi Ethernet (rame e fibra ottica), topologie di rete e tecniche di attestazione/crimpaggio.",
  "Modello ISO-OSI": "I 7 livelli della pila ISO-OSI, incapsulamento PDU, apparati di rete (Switch, Router, Hub), reti Ethernet e comandi Cisco IOS.",

  // TIPSIT subfolders
  "Digitalizzazione e Multimedialità": "Teoria dei segnali, campionamento ADC (Nyquist-Shannon), raster vs vettoriale, modelli di colore (RGB/CMYK), compressione e video digitale.",
  "FileSystem": "Struttura gerarchica dei file system, gestione delle partizioni e guida pratica ai comandi terminali Linux (Bash) e Windows (PowerShell/CMD).",
  "Operazioni coi binari e conversioni": "Sistemi numerici posizionali (binario, ottale, esadecimale), algoritmi di conversione con virgola, aritmetica binaria e complemento a due.",
  "Sistemi operativi": "Architettura interna del sistema operativo: Kernel monolitico vs microkernel, Shell, modalità Ring (User/Kernel mode) e chiamate di sistema (System Call).",

  // File individuali di Informatica
  "Strutture di controllo e cicli": "Istruzioni condizionali (if, else if, else, switch-case) e cicli iterativi (while, do-while, for) con controlli logici e salti di flusso.",
  "Le variabili": "Dichiarazione, tipi primitivi, modificatori di tipo, costanti e allocazione delle variabili nello Stack.",
  "Gli array": "Vettori statici monodimensionali e bidimensionali (matrici), indicizzazione e scorrimento con cicli for.",
  "Le funzioni e procedure": "Modularizzazione del codice, prototipi, passaggio dei parametri per valore o riferimento (`&`) e ricorsione.",
  "Puntatori": "Concetto di indirizzo di memoria, operatore di dereferenziazione (`*`), aritmetica dei puntatori e gestione dinamica con `new`/`delete`.",
  "Le struct e le classi": "Definizione di strutture dati composte, modificatori di visibilità (`public`/`private`), costruttori e programmazione a oggetti.",
  "Gestione dei file": "Stream di input/output su file con `ifstream` e `ofstream`, lettura riga per riga e salvataggio di dati.",
  "algorithm": "Funzioni essenziali della STL per ordinamento (`std::sort`), ricerca binaria (`std::binary_search`), inversione e minimi/massimi.",
  "iostream": "Gestione del flusso standard di input/output in C++ con `std::cin`, `std::cout`, formattazione e manipolatori stream.",
  "string": "Metodi della classe `std::string`: concatenazione, ricerca di sottostringhe, lunghezza, comparazione e conversioni numeriche.",
  "vector": "Array dinamici della Standard Template Library: inserimento con `push_back`, iteratori, ridimensionamento e accesso sicuro con `at()`.",
  "Caratteristiche": "Panoramica delle caratteristiche fondanti del C++: efficienza, tipizzazione forte, compilazione diretta in linguaggio macchina.",
  "Algoritmi di ricerca": "Ricerca lineare su insiemi non ordinati e ricerca binaria (dicotomica) ad alta efficienza O(log n) con prerequisito di ordinamento.",
  "Bubble sort": "Algoritmo di ordinamento a bolle: logica di scambio adiacente, ottimizzazione con flag e complessità temporale O(n²).",
  "Insertion sort": "Ordinamento per inserimento: logica simile all'ordinamento di una mano di carte, ottimo per insiemi di dati quasi ordinati.",
  "Selection Sort": "Ordinamento per selezione: ricerca progressiva del valore minimo e posizionamento nell'indice corrente.",
  "css": "Fogli di stile a cascata: selettori CSS, Specificity, Box Model (margin, border, padding), Flexbox, CSS Grid e responsive design.",
  "1 Struttura Base HTML": "Lo scheletro di un documento HTML5: doctype, tag `html`, `head`, `body` e gerarchia degli elementi.",
  "2 Metadati HTML": "Tag `meta` essenziali per charset UTF-8, viewport responsive per dispositivi mobili, SEO e Open Graph per i social.",
  "3 Testo HTML": "Gerarchia dei titoli (`h1`-`h6`), paragrafi (`p`), formattazione semantica (`strong`, `em`, `blockquote`, `code`).",
  "4 Link HTML": "Collegamenti ipertestuali con il tag `<a>`, percorsi relativi e assoluti, attributo `target=\"_blank\"` e ancore interne.",
  "5 Media HTML": "Inclusione di immagini responsive (`<img>`, `picture`), audio (`<audio>`), video (`<video>`) e formati multimediali moderni.",
  "6 Liste e Tabelle HTML": "Liste ordinate (`ol`), non ordinate (`ul`), tabelle (`table`, `thead`, `tbody`, `tr`, `th`, `td`) e accessibilità.",
  "7 Form HTML e input": "Creazione di moduli interattivi: tag `form`, campi di input (`text`, `email`, `password`, `radio`, `checkbox`), pulsanti e validazione nativa.",
  "8 Layout e Semantica HTML": "Tag semantici HTML5 per la struttura della pagina: `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`.",
  "9 Componenti Interattivi HTML": "Elementi interattivi HTML5 nativi: `details`, `summary`, modali con `<dialog>` e menu a tendina.",
  "10 Attributi HTML": "Attributi globali fondamentali: `id`, `class`, `style`, `title`, `data-*` personalizzati e attributi di accessibilità ARIA.",
  "1 Fondamentali": "Tipi di dato primitivi, variabili (`let`, `const`), operatori logico-aritmetici, strutture di controllo (`if`, `switch`) e cicli.",
  "2 Strutture dati": "Oggetti letterali, array in JavaScript, metodi funzionali (`map`, `filter`, `reduce`), `Set` e `Map`.",
  "3 Sintassi moderna (ES6+)": "Destructuring di array e oggetti, Spread/Rest operator, Arrow functions, template literals e moduli `import`/`export`.",
  "4 Asincrono": "Gestione dell'asincronia in JS: Event Loop, Callback, Promises (`.then`/`.catch`) e sintassi moderna `async`/`await`.",
  "5 OOP": "Programmazione a oggetti moderna con classi ES6: costruttori, ereditarietà con `extends`, metodi statici e proprietà private (`#`).",
  "6 Errori": "Gestione robusta delle eccezioni in runtime tramite blocchi `try`, `catch`, `finally` e creazione di errori personalizzati con `throw new Error()`.",
  "7 DOM": "Document Object Model: selezione di elementi (`querySelector`), manipolazione delle classi CSS, gestione degli eventi (`addEventListener`) e rendering dinamico.",

  // File individuali di Inglese
  "Competenze richieste per ogni livello": "Quadro Europeo di Riferimento (QCER): differenze di livello da A1 a C2 e parametri di valutazione B2 First.",
  "Cosa devi fare nella prova": "Riepilogo della struttura del Cambridge B2: durata, punteggi, suddivisione delle sezioni e soglia di superamento.",
  "Introduzione": "Panoramica generale sul test Cambridge English: consigli pratici, gestione del tempo e preparazione mentale.",
  "For multiple choice 1": "Strategie pratiche per la Parte 1 del Listening: identificare lo scopo, l'opinione o il contesto in 8 brevi dialoghi indipendenti.",
  "For multiple choice 2": "Tecniche per la Parte 4 del Listening: comprendere un'intervista più lunga individuando dettagli specifici e sfumature di significato.",
  "For multiple matching": "Strategie per la Parte 3 del Listening: abbinare 5 speaker diversi con 8 possibili opzioni tematiche.",
  "For text or sentence completion": "Metodo per la Parte 2 del Listening: ascoltare un monologo e completare 10 frasi con 1-3 parole esatte della traccia audio.",
  "For multiple-choice gap-fill": "Risoluzione del Reading Parte 1: identificare collocazioni linguistiche fisse, phrasal verbs e sfumature di significato tra 4 opzioni.",
  "For open gap-fill": "Tecniche per il Reading Parte 2: identificare e inserire parole grammaticali mancanti (preposizioni, ausiliari, congiunzioni, pronomi).",
  "For word formation gap-fill": "Guida al Reading Parte 3: trasformare la parola radice usando prefissi e suffissi mantenendo coerenza con il testo.",
  "For trasformation with key word": "Metodologia per il Reading Parte 4: riformulare una frase usando tra 2 e 5 parole inclusa la parola chiave invariata.",
  "For reading and multiple-choice comprehension": "Strategie per il Reading Parte 5: leggere un testo lungo e rispondere a 6 domande a risposta multipla su toni, opinioni e dettagli.",
  "For reading and text comprehension": "Linee guida per affrontare la comprensione testuale globale, scartando i trabocchetti più comuni.",
  "Strategies for each gap": "Prontuario riassuntivo con trucchi ed esempi per ogni tipologia di gap negli esercizi d'esame.",
  "For only you": "Speaking Parte 2: come descrivere e confrontare due fotografie per 1 minuto senza esitazioni o silenzi imbarazzanti.",
  "For you and candidate 2": "Speaking Parte 3: discussione collaborativa di 2 minuti con un compagno su una mappa mentale con 5 idee correlate.",
  "For you and the interviewer": "Speaking Parte 1: rompere il ghiaccio rispondendo con naturalezza a domande su se stessi, studi, tempo libero e progetti futuri.",
  "For you, candidate 2 and the interviewer": "Speaking Parte 4: dibattito a tre su questioni più ampie e astratte collegate al tema trattato nella Parte 3.",
  "Conditionals": "Guida esaustiva ai quattro condizionali inglesi (Zero, First, Second, Third Conditional) e alle forme miste (Mixed Conditionals).",
  "Esercizi e Risorse": "Raccolta di link, piattaforme e fogli di lavoro interattivi per esercitarsi con la grammatica e il lessico.",
  "Passive voice": "Costruzione e trasformazione delle frasi dalla forma attiva a passiva in tutti i tempi verbali, compresi i verbi modali e la forma impersonale.",
  "Verb Tenses": "Tavola sinottica dei 12 tempi verbali inglesi (Present, Past, Future, Continuous, Perfect) con regole d'uso, parole spia ed esempi pratici.",
  "Family and Life Stages": "Lessico relativo ai gradi di parentela, tappe della vita (infanzia, adolescenza, vecchiaia) e relazioni affettive.",
  "Food and Restaurants": "Terminologia culinaria: metodi di cottura, ingredienti, sapori, ordinare al ristorante e descrivere una dieta.",
  "Health and Illnesses": "Parole ed espressioni per descrivere sintomi, malattie comuni, farmaci, visite mediche e stile di vita sano.",
  "Personality and Feelings": "Aggettivi per descrivere il carattere, la personalità positiva/negativa, emozioni passeggere e stati d'animo.",
  "Education and Learning": "Termini legati alla vita scolastica, esami, voti, materie, metodi di studio e percorsi universitari.",
  "Technology and Internet": "Vocaboli del mondo tecnologico: dispositivi hardware, software, social media, cybersecurity e intelligenza artificiale.",
  "Work and Careers": "Lessico professionale: professioni, candidature, colloqui, contratti, benefit, stipendi e ambiente di lavoro.",
  "Crime and Law": "Lessico giuridico: reati, processi in tribunale, investigazioni di polizia, pene detentive e forze dell'ordine.",
  "Environment and Nature": "Terminologia ecologica: cambiamento climatico, inquinamento, fonti di energia rinnovabile, riciclo e salvaguardia della fauna.",
  "Politics and Society": "Parole chiave su sistemi di governo, elezioni, democrazia, diritti umani, economia e questioni sociali contemporanee.",
  "Media, Books and TV": "Lessico sul giornalismo, generi letterari, serie televisive, cinema, streaming e informazione digitale.",
  "Travel and Airport": "Vocabolario indispensabile per viaggiare: procedure in aeroporto, hotel, mezzi di trasporto, bagagli e turismo.",
  "Compound Words": "Nomi e aggettivi composti più diffusi nella lingua inglese con regole di scrittura (uniti, staccati o con trattino).",
  "Prefixes and Suffixes": "Prefissi negativi (`un-`, `in-`, `dis-`) e suffissi per trasformare verbi in sostantivi o aggettivi in avverbi.",

  // File individuali di Matematica
  "01 - La Retta": "Studio della retta nel piano cartesiano: equazione esplicita e implicita, coefficiente angolare, parallelismo, perpendicolarità e fasci di rette.",
  "02 - Le Coniche (Parabola e Circonferenza)": "Luoghi geometrici nel piano: equazione della circonferenza (centro e raggio) e della parabola (vertice, fuoco, direttrice e tangenti).",
  "03 - Goniometria e Trigonometria": "Circonferenza goniometrica, funzioni seno/coseno/tangente, relazioni fondamentali, formule notevoli e teoremi sui triangoli rettangoli.",
  "04 - Disequazioni di II grado e Fratte": "Risoluzione algebrica e geometrica delle disequazioni di secondo grado, studio del segno dei fattori per disequazioni fratte e sistemi.",
  "05 - Ellisse e Iperbole": "Proprietà focali, equazioni canoniche riferite agli assi, calcolo di fuochi, vertici, eccentricità e asintoti dell'iperbole.",
  "06 - Algebra e Irrazionali": "Proprietà dei radicali, condizioni di esistenza, razionalizzazione di frazioni, equazioni e disequazioni irrazionali e con modulo.",

  // File individuali di Sistemi e Reti
  "Categorie di cavi": "Caratteristiche elettriche e limiti di velocità delle categorie di cavi Ethernet in rame (Cat5e, Cat6, Cat6a, Cat7, Cat8).",
  "Normativa ISO-OSI 11801": "Standard internazionali per la progettazione e la posa del cablaggio strutturato in edifici civili e commerciali.",
  "Tipologia e Topologia reti": "Classificazione delle reti per estensione geografica (PAN, LAN, MAN, WAN) e topologie fisiche/logiche (stella, anello, bus, maglia).",
  "Tipologie di cavi, i tipi di segnali e il canale di comunicazione": "Mezzi trasmissivi guidati (doppino ritorto UTP/STP, cavo coassiale, fibra ottica) e propagazione dei segnali elettrici e ottici.",
  "Apparati centrali": "Funzionamento di Repeater, Hub (livello 1), Switch (livello 2) e Router (livello 3) all'interno di un'architettura di rete.",
  "Collegamenti LAN e MAN": "Tecnologie e protocolli per interconnettere reti locali su scala urbana o di campus universitario.",
  "Comandi di uno switch CISCO": "Configurazione fondamentale di switch Cisco IOS da CLI: modalità enable, configurazione interfaccia, VLAN e visualizzazione delle tabelle MAC.",
  "Il cavo di rete e crimpaggio": "Standard di piedinatura T568A e T568B, crimpaggio dei connettori RJ45 e realizzazione di cavi diretti (*straight-through*) e incrociati (*crossover*).",
  "Le reti Ethernet": "Standard IEEE 802.3: formato del frame Ethernet, indirizzi MAC a 48 bit e protocollo di accesso al mezzo condiviso CSMA/CD.",
  "Modello ISO-OSI 11801": "Sintesi dei livelli ISO-OSI applicati alla normativa di cablaggio e trasmissione dati.",
  "Standard basi cablaggio": "Distanze massime consentite, armadi rack, patch panel e permutatori nel sottosistema di cablaggio orizzontale e dorsale.",
  "Tecniche acceso al canale casuali": "Protocolli di contesa del canale trasmissivo: ALOHA puro, Slotted ALOHA e Carrier Sense Multiple Access (CSMA).",

  // File individuali di TIPSIT
  "Codici di sicurezza": "Metodi di rilevazione e correzione degli errori nei flussi digitali: bit di parità, codici di Hamming e checksum.",
  "1. Teoria dei Segnali e Conversione Analogico-Digitale": "Segnali analogici vs digitali, teorema di Nyquist-Shannon, campionamento (tempo), quantizzazione (ampiezza) e codifica binaria.",
  "2. Digitalizzazione delle Immagini e Modelli di Colore": "Pixel, immagini raster vs vettoriali, profondità di colore, sintesi additiva RGB, sintesi sottrattiva CMYK e palette indicizzata.",
  "3. Caratteristiche Raster, Calcolo del Peso e Compressione": "Definizione vs Risoluzione (PPI/DPI), formule di calcolo del peso file in Byte/MB e compressione Lossless (RLE) vs Lossy (JPEG).",
  "4. Grafica Vettoriale e Video Digitale": "Primitive geometriche scalabili (SVG), framerate (FPS), calcolo del peso video non compresso, codec (H.264, AV1) e contenitori.",
  "Sintesi e Mappa Concettuale": "Tavola sinottica con tutte le formule matematiche per le verifiche scritte e glossario completo dei termini multimediali.",
  "Guida ai comandi terminali Linux": "Comandi essenziali di navigazione e gestione file in ambiente Bash (`ls`, `cd`, `mkdir`, `cp`, `mv`, `rm`, permessi `chmod`).",
  "Guida ai comandi terminali Windows": "Comandi per la gestione del file system da Prompt dei comandi (CMD) e PowerShell (`dir`, `cd`, `copy`, `move`, `del`, `New-Item`).",
  "1. Sistemi di numerazione e Conversioni di base": "Basi 2, 8, 10, 16, sviluppo polinomiale, metodo delle divisioni continue e moltiplicazioni successive per numeri con la virgola.",
  "2. Operazioni aritmetiche binarie": "Addizione binaria con riporto, sottrazione con prestito, moltiplicazione shift-and-add e divisione euclidea.",
  "3. Rappresentazione dei numeri con segno e Complemento a 2": "Rappresentazione in Modulo e Segno, Complemento a 1, algoritmo del Complemento a 2 e condizioni di overflow circuitale.",
  "1. Il Ruolo del Sistema Operativo": "Il sistema operativo come gestore e arbitro delle risorse hardware (CPU, RAM, I/O) e interfaccia semplificata verso l'utente.",
  "2. Kernel e Shell": "Architettura interna del SO: nucleo operativo (Kernel monolitico, microkernel) e interpreti di comandi (Shell CLI e GUI).",
  "3. Modello a Ring, User Mode e Kernel Mode": "Livelli di privilegio della CPU (Ring 0 vs Ring 3), separazione degli spazi di memoria e meccanismo delle chiamate di sistema (System Call)."
};

function cleanName(name) {
  return name.replace(/\.md$/, "");
}

function getDescription(key, dir = "") {
  const normalizedDir = dir.replace(/\\/g, "/");
  if (key === "Teoria") {
    if (normalizedDir.includes("Informatica") || normalizedDir.includes("Cpp")) {
      return "Concetti teorici del C++, architettura dei calcolatori e analisi computazionale degli algoritmi di ordinamento.";
    }
    if (normalizedDir.includes("Inglese")) {
      return "Regole grammaticali complete della lingua inglese: tempi verbali, conditionals, passive voice ed esercizi di consolidamento.";
    }
  }
  if (key === "Strategie") {
    if (normalizedDir.includes("Listening")) return "Strategie specifiche per le domande a risposta multipla, completamento frasi e abbinamento dell'ascolto.";
    if (normalizedDir.includes("Reading")) return "Metodi di risoluzione per multiple matching, open gap-fill, word formation e key word transformations.";
    if (normalizedDir.includes("Speaking")) return "Frasari utili, connettivi logici e strategie per gestire le quattro parti dello Speaking test.";
    if (normalizedDir.includes("Writing")) return "Formule di apertura/chiusura, registro linguistico (formale vs informale) e pianificazione del testo.";
  }
  if (key === "Esercizi") {
    if (normalizedDir.includes("Listening")) return "Tracce audio ed esercizi guidati di comprensione orale Cambridge B2.";
    if (normalizedDir.includes("Reading")) return "Testi ed esercizi pratici per allenarsi sulla prova di lettura e comprensione.";
    if (normalizedDir.includes("Speaking")) return "Domande tipo, simulazioni d'esame e tracce per fare pratica di conversazione.";
    if (normalizedDir.includes("Writing")) return "Tracce ed esercizi pratici di scrittura per il B2 First.";
  }
  if (key === "Esercizi svolti") {
    if (normalizedDir.includes("Reading")) return "Esercizi di lettura risolti e commentati con spiegazione delle risposte corrette.";
    if (normalizedDir.includes("Writing")) return "Composizioni svolte con punteggio massimo ed analisi degli errori tipici da evitare.";
  }
  if (DESCRIPTIONS[key]) return DESCRIPTIONS[key];
  const cleaned = cleanName(key);
  if (DESCRIPTIONS[cleaned]) return DESCRIPTIONS[cleaned];
  // Fallback
  return `Appunti e nozioni di approfondimento su ${cleaned}.`;
}

function processDirectory(dir, isRoot = false) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const subdirs = entries.filter(e => e.isDirectory() && !['TEMP', 'Zimmagini', '.git'].includes(e.name));
  
  // Recursively process subdirectories first
  for (const s of subdirs) {
    processDirectory(path.join(dir, s.name), false);
  }

  const folderName = path.basename(dir);

  if (isRoot) {
    // Root index.md
    console.log("Updating root index.md...");
    let content = `---
title: "Home Appunti"
cssclasses:
  - dashboard
---
# 📚 Appunti di AleCas
Benvenuto nel mio raccoglitore digitale di appunti scolastici. Questo spazio in continua evoluzione mi accompagnerà fino alla quinta superiore e oltre, fungendo da vero e proprio archivio personale per ripassare e consolidare le mie conoscenze. Usa la barra laterale o seleziona una materia qui sotto per esplorare!

---
## 💻 [[_index_Informatica|Informatica]]
${getDescription("Informatica", dir)}

## 🇬🇧 [[_index_Inglese|Inglese]]
${getDescription("Inglese", dir)}

## 📐 [[_index_Matematica|Matematica]]
${getDescription("Matematica", dir)}

## 🌐 [[_index_Sistemi e reti|Sistemi e reti]]
${getDescription("Sistemi e reti", dir)}

## ⚙️ [[_index_TIPSIT|TIPSIT]]
${getDescription("TIPSIT", dir)}
`;
    fs.writeFileSync(path.join(dir, "index.md"), content, "utf8");

    // Also remove any loose FolderName.md files from root if present
    for (const s of subdirs) {
      const looseFile = path.join(dir, `${s.name}.md`);
      if (fs.existsSync(looseFile)) {
        fs.unlinkSync(looseFile);
        console.log(`Deleted loose file at root: ${looseFile}`);
      }
    }
    return;
  }

  // Inside a folder: _index_folderName.md
  const indexFileName = `_index_${folderName}.md`;
  const indexPath = path.join(dir, indexFileName);

  // Remove previous bracket or un-underscored index if present
  const oldBracketIndex = path.join(dir, `index[${folderName}].md`);
  if (fs.existsSync(oldBracketIndex)) {
    fs.unlinkSync(oldBracketIndex);
    console.log(`Removed old bracket index: ${oldBracketIndex}`);
  }
  const oldSimpleIndex = path.join(dir, `index_${folderName}.md`);
  if (fs.existsSync(oldSimpleIndex)) {
    fs.unlinkSync(oldSimpleIndex);
    console.log(`Removed old simple index: ${oldSimpleIndex}`);
  }

  // Check if there are other files in this directory (excluding index*)
  const currentEntries = fs.readdirSync(dir, { withFileTypes: true });
  const mdFiles = currentEntries
    .filter(e => e.isFile() && e.name.endsWith('.md') && !e.name.startsWith('_index_') && !e.name.startsWith('index_') && !e.name.startsWith('index['))
    .map(e => e.name);

  // Remove any loose files with the same name as subfolders if present in this directory
  for (const s of subdirs) {
    const looseSub = path.join(dir, `${s.name}.md`);
    if (fs.existsSync(looseSub)) {
      fs.unlinkSync(looseSub);
      console.log(`Deleted loose file matching subfolder: ${looseSub}`);
    }
  }

  // Re-read mdFiles after cleaning loose files
  const finalMdFiles = fs.readdirSync(dir, { withFileTypes: true })
    .filter(e => e.isFile() && e.name.endsWith('.md') && !e.name.startsWith('_index_') && !e.name.startsWith('index_') && !e.name.startsWith('index['))
    .map(e => e.name);

  console.log(`Creating ${indexPath} with ${subdirs.length} subfolders and ${finalMdFiles.length} files...`);

  const currentFolderDesc = getDescription(folderName, dir);

  let content = `---
title: ${JSON.stringify(folderName)}
description: ${JSON.stringify(currentFolderDesc)}
---
# 📂 ${folderName}
${currentFolderDesc}

---
## 📌 Indice dei Contenuti
`;

  if (subdirs.length > 0) {
    content += `\n### 📁 Cartelle e Moduli\n`;
    for (const s of subdirs) {
      const subDesc = getDescription(s.name, dir);
      content += `- **[[_index_${s.name}|${s.name}]]**\n  ${subDesc}\n`;
    }
  }

  if (finalMdFiles.length > 0) {
    content += `\n### 📄 Note e Argomenti\n`;
    for (const f of finalMdFiles) {
      const baseName = cleanName(f);
      const fileDesc = getDescription(baseName);
      content += `- **[[${baseName}]]**\n  ${fileDesc}\n`;
    }
  }

  if (subdirs.length === 0 && finalMdFiles.length === 0) {
    content += `\n*Sezione in fase di espansione e aggiornamento degli appunti.*\n`;
  }

  fs.writeFileSync(indexPath, content, "utf8");
}

processDirectory("content", true);
console.log("All indexes generated successfully!");
