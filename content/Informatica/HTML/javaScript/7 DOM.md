## Indice

- [[#Selezione elementi]]
- [[#Modifica elementi]]
- [[#Creazione e rimozione nodi]]
- [[#Classi e stili]]
- [[#Attributi]]
- [[#Traversal del DOM]]
- [[#Eventi]]
- [[#Event delegation]]
- [[#MutationObserver]]
- [[#IntersectionObserver]]
- [[#ResizeObserver]]
- [[#localStorage e sessionStorage]]
- [[#Cookies]]
- [[#URL e History API]]
- [[#setTimeout e setInterval]]
- [[#requestAnimationFrame]]
- [[#Clipboard API]]
- [[#Geolocation API]]
- [[#Notification API]]
- [[#Web Workers]]
- [[#Console]]
- [[#Clonazione oggetti]]
- [[#Debounce e throttle]]
- [[#Currying]]
- [[#Memoization]]

## Selezione elementi

```js
// Selettori moderni (restituiscono null se non trovato)
document.querySelector(".card")              // primo elemento
document.querySelector("#titolo h2")         // selettore CSS complesso
document.querySelectorAll(".card")           // NodeList (statica)
document.querySelectorAll("a[href^='https']") // attributo

// Selettori classici
document.getElementById("main")             // Element | null
document.getElementsByClassName("card")     // HTMLCollection (live)
document.getElementsByTagName("p")          // HTMLCollection (live)
document.getElementsByName("email")         // NodeList

// Dal contesto di un elemento
const container = document.querySelector(".container");
container.querySelector(".item")            // solo dentro container
container.querySelectorAll(".item")

// Controllo e cast
const el = document.querySelector(".card");
el instanceof HTMLElement  // true
el.matches(".card.attiva") // true/false
el.closest(".wrapper")     // primo antenato che corrisponde al selettore
```

---

## Modifica elementi

```js
const el = document.querySelector(".card");

// Testo
el.textContent = "Nuovo testo";          // solo testo, sicuro (no HTML)
el.textContent;                           // legge il testo (no tag)
el.innerText;                             // testo visibile (considera CSS)

// HTML
el.innerHTML = "<strong>Bold</strong>";  // interpreta HTML (attenzione XSS)
el.innerHTML;                             // legge l'HTML interno
el.outerHTML;                             // legge l'HTML dell'elemento + contenuto

// Metodo sicuro contro XSS
el.textContent = inputUtente;            // mai innerHTML con input utente

// Inserimento HTML sicuro (moderno)
el.insertAdjacentHTML("beforebegin", "<p>Prima dell'elemento</p>");
el.insertAdjacentHTML("afterbegin",  "<p>Primo figlio</p>");
el.insertAdjacentHTML("beforeend",   "<p>Ultimo figlio</p>");
el.insertAdjacentHTML("afterend",    "<p>Dopo l'elemento</p>");
el.insertAdjacentText("beforeend",   "testo sicuro");

// Proprietà specifiche degli input
const input = document.querySelector("input");
input.value;               // valore corrente
input.value = "nuovo";
input.checked;             // per checkbox/radio
input.disabled = true;
input.focus();
input.blur();
input.select();            // seleziona il testo
```

---

## Creazione e rimozione nodi

```js
// Creazione
const div   = document.createElement("div");
const testo = document.createTextNode("Ciao");
const clone = div.cloneNode(true);  // true = deep clone (con figli)

// Aggiunta
document.body.appendChild(div);           // in fondo al body
document.body.prepend(div);               // all'inizio del body
parent.insertBefore(div, riferimento);    // prima di un nodo
parent.append(div, "testo", altroEl);     // uno o più nodi/stringhe
parent.prepend("testo", div);

// Sostituzione e rimozione
parent.replaceChild(nuovo, vecchio);
el.replaceWith(nuovo);                    // sostituisce l'elemento stesso
el.remove();                              // rimuove l'elemento

// insertAdjacentElement
el.insertAdjacentElement("beforebegin", nuovo);
el.insertAdjacentElement("afterend", nuovo);

// DocumentFragment — minimizza i reflow
const frag = document.createDocumentFragment();
for (let i = 0; i < 100; i++) {
  const li = document.createElement("li");
  li.textContent = `Item ${i}`;
  frag.appendChild(li);
}
document.querySelector("ul").appendChild(frag); // un solo reflow
```

---

## Classi e stili

```js
const el = document.querySelector(".card");

// classList
el.classList.add("attiva");
el.classList.add("grande", "visibile");    // più classi
el.classList.remove("attiva");
el.classList.toggle("aperto");             // aggiunge se assente, rimuove se presente
el.classList.toggle("aperto", condizione); // forza aggiunta/rimozione
el.classList.contains("attiva");           // true/false
el.classList.replace("vecchia", "nuova");
el.className;                              // stringa con tutte le classi
el.className = "nuova lista classi";

// Stili inline
el.style.color = "red";
el.style.backgroundColor = "blue";         // camelCase
el.style.fontSize = "1.5rem";
el.style.cssText = "color: red; font-size: 1rem;"; // più stili in una volta
el.style.removeProperty("color");

// Stili calcolati (include CSS, non solo inline)
const computed = getComputedStyle(el);
computed.color;              // "rgb(255, 0, 0)"
computed.getPropertyValue("font-size"); // "24px"

// CSS custom properties (variabili CSS)
el.style.setProperty("--colore-testo", "#333");
getComputedStyle(el).getPropertyValue("--colore-testo"); // "#333"
document.documentElement.style.setProperty("--primario", "#4f46e5"); // globale
```

---

## Attributi

```js
const el = document.querySelector("a");

// getAttribute / setAttribute
el.getAttribute("href")           // valore come stringa
el.setAttribute("href", "/nuova") // imposta attributo
el.removeAttribute("target")      // rimuove
el.hasAttribute("disabled")       // true/false
el.toggleAttribute("disabled")    // aggiunge se assente, rimuove se presente

// Proprietà riflesse (più comodo per attributi standard)
el.href           // URL assoluto (diverso da getAttribute)
el.id
el.className
el.src
el.alt
el.disabled = true
el.checked = true

// dataset — attributi data-*
// <div data-utente-id="42" data-ruolo="admin">
el.dataset.utenteId  // "42" (camelCase automatico)
el.dataset.ruolo     // "admin"
el.dataset.nuovo = "valore"    // aggiunge data-nuovo="valore"
delete el.dataset.ruolo        // rimuove data-ruolo

// Attributi booleani
el.setAttribute("disabled", "")  // aggiunge disabled
el.removeAttribute("disabled")   // rimuove disabled
// equivalente a:
el.disabled = true;
el.disabled = false;
```

---

## Traversal del DOM

```js
const el = document.querySelector(".card");

// Genitori
el.parentElement           // genitore (Element)
el.parentNode              // genitore (Node, può essere document)
el.closest(".wrapper")     // antenato più vicino che corrisponde al selettore

// Figli
el.children                // HTMLCollection dei figli Element
el.childNodes              // NodeList di tutti i nodi (include testo, commenti)
el.firstElementChild       // primo figlio Element
el.lastElementChild        // ultimo figlio Element
el.childElementCount       // numero di figli Element

// Fratelli
el.nextElementSibling      // fratello successivo Element
el.previousElementSibling  // fratello precedente Element
el.nextSibling             // nodo successivo (include testo)
el.previousSibling         // nodo precedente (include testo)

// Dimensioni e posizione
el.getBoundingClientRect()
// { top, left, right, bottom, width, height, x, y }
el.offsetWidth             // larghezza incluso padding, no margin
el.offsetHeight
el.clientWidth             // larghezza incluso padding, no border
el.scrollWidth             // larghezza totale incluso overflow
el.scrollTop               // scroll verticale del contenuto
el.scrollLeft
window.scrollY             // scroll verticale della pagina
window.scrollX
el.scrollIntoView({ behavior: "smooth", block: "start" })
```

---

## Eventi

```js
const btn = document.querySelector("#btn");

// Aggiunta
btn.addEventListener("click", handler);
btn.addEventListener("click", handler, { once: true });     // una sola volta
btn.addEventListener("click", handler, { passive: true });  // per scroll (perf)
btn.addEventListener("click", handler, { capture: true });  // fase di cattura

// Rimozione (lo stesso handler, non una funzione anonima)
btn.removeEventListener("click", handler);

// Oggetto evento
function handler(event) {
  event.type;             // "click"
  event.target;           // elemento che ha scatenato l'evento
  event.currentTarget;    // elemento su cui è il listener
  event.preventDefault(); // blocca il comportamento default (es. submit, link)
  event.stopPropagation(); // blocca il bubbling
  event.stopImmediatePropagation(); // blocca anche i listener successivi

  // Mouse
  event.clientX / event.clientY    // rispetto al viewport
  event.pageX / event.pageY        // rispetto alla pagina
  event.offsetX / event.offsetY    // rispetto all'elemento
  event.button    // 0=sinistro 1=centrale 2=destro
  event.buttons   // bitmask dei tasti premuti
  event.altKey / event.ctrlKey / event.shiftKey / event.metaKey

  // Tastiera
  event.key       // "Enter", "ArrowUp", "a", "A"…
  event.code      // "KeyA", "Enter", "Space"…
  event.repeat    // true se tasto tenuto premuto
  event.isComposing // true durante input IME

  // Touch
  event.touches           // lista dei touch attivi
  event.changedTouches    // touch cambiati in questo evento
  event.targetTouches     // touch sull'elemento target

  // Form / input
  event.data              // carattere inserito (InputEvent)
  event.inputType         // "insertText", "deleteContentBackward"…
}

// Tipi di evento comuni
"click" "dblclick" "mousedown" "mouseup" "mousemove"
"mouseenter" "mouseleave" "mouseover" "mouseout"
"contextmenu"
"keydown" "keyup" "keypress"  // keypress deprecato
"focus" "blur" "focusin" "focusout"
"input" "change" "submit" "reset"
"scroll" "resize"
"load" "DOMContentLoaded" "unload" "beforeunload"
"touchstart" "touchmove" "touchend" "touchcancel"
"pointerdown" "pointermove" "pointerup"
"dragstart" "drag" "dragover" "drop" "dragend" "dragenter" "dragleave"
"transitionstart" "transitionend"
"animationstart" "animationend" "animationiteration"
"copy" "cut" "paste"
"online" "offline"
"popstate" "hashchange"
"error" "abort"
"visibilitychange"
"fullscreenchange"

// Evento custom
const evento = new CustomEvent("mioEvento", {
  detail: { dati: "payload" },
  bubbles: true,
  cancelable: true,
});
el.dispatchEvent(evento);
el.addEventListener("mioEvento", e => console.log(e.detail));
```

---

## Event delegation

Invece di mettere un listener su ogni figlio, se ne mette uno sul genitore sfruttando il bubbling.

```js
const lista = document.querySelector("ul");

lista.addEventListener("click", (event) => {
  const item = event.target.closest("li");  // trova il <li> più vicino
  if (!item || !lista.contains(item)) return;

  const id = item.dataset.id;
  console.log("Cliccato item:", id);
});

// Aggiungendo elementi dinamici non serve aggiungere listener
const nuovoItem = document.createElement("li");
nuovoItem.textContent = "Nuovo";
nuovoItem.dataset.id = "99";
lista.appendChild(nuovoItem); // gestito automaticamente
```

---

## MutationObserver

Osserva le modifiche al DOM senza polling.

```js
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.type === "childList") {
      mutation.addedNodes.forEach(n => console.log("Aggiunto:", n));
      mutation.removedNodes.forEach(n => console.log("Rimosso:", n));
    }
    if (mutation.type === "attributes") {
      console.log(`Attributo "${mutation.attributeName}" cambiato`);
      console.log("Valore precedente:", mutation.oldValue);
    }
    if (mutation.type === "characterData") {
      console.log("Testo cambiato");
    }
  }
});

observer.observe(document.body, {
  childList: true,           // nodi figli aggiunti/rimossi
  subtree: true,             // osserva tutti i discendenti
  attributes: true,          // cambiamenti agli attributi
  attributeOldValue: true,   // salva il valore precedente
  attributeFilter: ["class", "id"], // filtra attributi specifici
  characterData: true,       // cambiamenti al testo
  characterDataOldValue: true,
});

observer.disconnect(); // smette di osservare
const pending = observer.takeRecords(); // ottiene mutation non processate
```

---

## IntersectionObserver

Osserva quando un elemento entra o esce dal viewport (o da un altro elemento).

```js
const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.classList.add("visibile");
      console.log("Visibilità:", entry.intersectionRatio);
    }
  }
}, {
  root: null,               // null = viewport
  rootMargin: "0px 0px -100px 0px", // margini del root
  threshold: [0, 0.5, 1],  // callback al 0%, 50%, 100% di visibilità
});

document.querySelectorAll(".animato").forEach(el => observer.observe(el));
observer.unobserve(el);   // smette di osservare un elemento
observer.disconnect();    // smette di osservare tutti

// Lazy loading immagini
const imgObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      imgObserver.unobserve(img);
    }
  });
});
document.querySelectorAll("img[data-src]").forEach(img => imgObserver.observe(img));
```

---

## ResizeObserver

Osserva i cambiamenti di dimensione di un elemento.

```js
const observer = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const { width, height } = entry.contentRect;
    console.log(`${entry.target.id}: ${width}×${height}`);

    // Box size (considera padding e border)
    const [box] = entry.borderBoxSize;
    console.log("Border box:", box.inlineSize, box.blockSize);
  }
});

observer.observe(document.querySelector(".container"));
observer.observe(el, { box: "border-box" }); // "content-box" (default) o "border-box"
observer.unobserve(el);
observer.disconnect();
```

---

## localStorage e sessionStorage

Archiviazione dati nel browser. `localStorage` persiste tra sessioni, `sessionStorage` solo nella scheda corrente.

```js
// localStorage
localStorage.setItem("tema", "scuro");
localStorage.getItem("tema");           // "scuro"
localStorage.removeItem("tema");
localStorage.clear();                   // rimuove tutto
localStorage.length;                    // numero di chiavi
localStorage.key(0);                    // prima chiave

// Oggetti (serializzare in JSON)
const utente = { nome: "Alice", eta: 30 };
localStorage.setItem("utente", JSON.stringify(utente));
const salvato = JSON.parse(localStorage.getItem("utente") ?? "null");

// sessionStorage — stessa API di localStorage
sessionStorage.setItem("passo", "2");
sessionStorage.getItem("passo");   // "2"

// Evento storage (cross-tab, solo localStorage)
window.addEventListener("storage", (event) => {
  console.log(event.key);        // chiave modificata
  console.log(event.oldValue);   // valore precedente
  console.log(event.newValue);   // nuovo valore
  console.log(event.url);        // URL della tab che ha modificato
  console.log(event.storageArea); // localStorage o sessionStorage
});
```

---

## Cookies

```js
// Scrittura
document.cookie = "nome=Alice";
document.cookie = "tema=scuro; path=/; max-age=86400"; // scade in 1 giorno
document.cookie = "sessione=token; path=/; secure; samesite=Strict"; // solo HTTPS
document.cookie = `data=${encodeURIComponent(JSON.stringify({a:1}))}`;

// Attributi
// expires=DATE   — data scadenza (formato UTC)
// max-age=N      — secondi dalla creazione
// path=/         — percorso valido
// domain=.example.com — dominio e sottodomini
// secure         — solo HTTPS
// samesite=Strict|Lax|None — protezione CSRF
// httponly       — non accessibile via JS (solo server)

// Lettura (tutti in una stringa)
document.cookie; // "nome=Alice; tema=scuro"

// Parsing
function getCookie(nome) {
  return Object.fromEntries(
    document.cookie.split("; ").map(c => c.split("=").map(decodeURIComponent))
  )[nome] ?? null;
}
getCookie("tema"); // "scuro"

// Eliminazione (impostare scadenza nel passato)
document.cookie = "nome=; max-age=0; path=/";
```

---

## URL e History API

```js
// URL API
const url = new URL("https://example.com/percorso?q=test&pagina=2#sezione");
url.protocol     // "https:"
url.hostname     // "example.com"
url.host         // "example.com" (con porta se non standard)
url.port         // ""
url.pathname     // "/percorso"
url.search       // "?q=test&pagina=2"
url.hash         // "#sezione"
url.href         // URL completo

// URLSearchParams
url.searchParams.get("q")          // "test"
url.searchParams.get("pagina")     // "2"
url.searchParams.set("pagina", "3")
url.searchParams.append("filtro", "nuovo")
url.searchParams.delete("q")
url.searchParams.has("pagina")     // true
url.searchParams.toString()        // "pagina=3&filtro=nuovo"
for (const [k, v] of url.searchParams) { console.log(k, v); }

// History API
history.pushState({ id: 1 }, "", "/nuova-url");   // aggiunge voce
history.replaceState({ id: 2 }, "", "/altra-url"); // sostituisce voce corrente
history.back();       // indietro
history.forward();    // avanti
history.go(-2);       // 2 passi indietro
history.length;       // numero di voci nella history

// Evento popstate (tasto back/forward del browser)
window.addEventListener("popstate", (event) => {
  console.log("State:", event.state);
  console.log("URL:", location.href);
});

// location
location.href      // URL corrente
location.pathname  // "/percorso"
location.reload()  // ricarica la pagina
location.assign("/nuova")   // naviga
location.replace("/nuova")  // naviga senza aggiungere alla history
```

---

## setTimeout e setInterval

```js
// setTimeout — esegue una volta dopo N ms
const id = setTimeout(() => {
  console.log("Eseguito dopo 2 secondi");
}, 2000);
clearTimeout(id); // annulla

// setInterval — esegue ogni N ms
const idInterval = setInterval(() => {
  console.log("Ogni secondo");
}, 1000);
clearInterval(idInterval); // ferma

// setTimeout con argomenti
setTimeout((a, b) => console.log(a + b), 500, 1, 2);

// Timeout "zero" — mette in fondo alla coda degli eventi
setTimeout(() => console.log("dopo"), 0);
console.log("prima"); // "prima" → "dopo"

// Intervallo accurato con setTimeout ricorsivo
function eseguiOgni(ms, callback) {
  let id;
  function loop() {
    callback();
    id = setTimeout(loop, ms);
  }
  id = setTimeout(loop, ms);
  return () => clearTimeout(id); // restituisce funzione di stop
}

// Promise con timeout
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
await delay(1000); // attende 1 secondo
```

---

## requestAnimationFrame

Schedula una callback prima del prossimo frame del browser. Ideale per animazioni.

```js
let start = null;

function anima(timestamp) {
  if (!start) start = timestamp;
  const progresso = timestamp - start;
  const percentuale = Math.min(progresso / 1000, 1); // 1 secondo

  elemento.style.opacity = percentuale;

  if (percentuale < 1) {
    requestAnimationFrame(anima);
  }
}

const id = requestAnimationFrame(anima);
cancelAnimationFrame(id); // annulla

// Loop di animazione
let running = true;
function loop(ts) {
  if (!running) return;
  // disegna frame...
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
```

---

## Clipboard API

```js
// Copia testo (richiede gesto utente o permesso)
await navigator.clipboard.writeText("testo copiato");

// Leggi testo
const testo = await navigator.clipboard.readText();

// Copia contenuto ricco (HTML, immagini)
await navigator.clipboard.write([
  new ClipboardItem({
    "text/plain": new Blob(["testo"], { type: "text/plain" }),
    "text/html":  new Blob(["<b>testo</b>"], { type: "text/html" }),
  })
]);

// Metodo classico (fallback per browser vecchi)
function copiaClassico(testo) {
  const el = document.createElement("textarea");
  el.value = testo;
  el.style.position = "fixed";
  el.style.opacity = "0";
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy"); // deprecato ma compatibile
  document.body.removeChild(el);
}
```

---

## Geolocation API

```js
// Posizione singola
navigator.geolocation.getCurrentPosition(
  (pos) => {
    console.log(pos.coords.latitude);
    console.log(pos.coords.longitude);
    console.log(pos.coords.accuracy);     // metri
    console.log(pos.coords.altitude);     // null se non disponibile
    console.log(pos.coords.speed);        // m/s
    console.log(pos.coords.heading);      // gradi (0=Nord)
    console.log(pos.timestamp);           // ms dall'epoch
  },
  (err) => {
    console.error(err.code, err.message);
    // 1: PERMISSION_DENIED
    // 2: POSITION_UNAVAILABLE
    // 3: TIMEOUT
  },
  {
    enableHighAccuracy: true,  // GPS se disponibile
    timeout: 10000,            // ms
    maximumAge: 60000,         // usa cache se < 60s
  }
);

// Posizione continua
const watchId = navigator.geolocation.watchPosition(callback, errCallback, options);
navigator.geolocation.clearWatch(watchId);
```

---

## Notification API

```js
// Richiesta permesso
const permesso = await Notification.requestPermission();
// "granted" | "denied" | "default"

// Creazione notifica
if (permesso === "granted") {
  const notifica = new Notification("Titolo", {
    body: "Testo della notifica",
    icon: "/icon.png",
    badge: "/badge.png",
    image: "/preview.png",
    tag: "id-univoco",        // sostituisce notifiche con lo stesso tag
    requireInteraction: false, // resta fino al click se true
    silent: false,
    data: { id: 42 },         // dati personalizzati
    actions: [                // solo in Service Worker
      { action: "apri", title: "Apri" },
      { action: "chiudi", title: "Chiudi" },
    ],
  });

  notifica.addEventListener("click", () => window.focus());
  notifica.addEventListener("close", () => console.log("chiusa"));
  notifica.close(); // chiude dopo 5s
}
```

---

## Web Workers

Eseguono JavaScript in un thread separato (no DOM access).

```js
// ── Thread principale ────────────────────────────────────

const worker = new Worker("worker.js");

worker.postMessage({ tipo: "calcola", dati: [1, 2, 3] });

worker.addEventListener("message", (event) => {
  console.log("Risultato:", event.data);
});

worker.addEventListener("error", (event) => {
  console.error(event.message, event.filename, event.lineno);
});

worker.terminate(); // termina il worker

// Worker inline (senza file separato)
const blob = new Blob([`
  self.onmessage = (e) => {
    const risultato = e.data * 2;
    self.postMessage(risultato);
  };
`], { type: "application/javascript" });
const workerInline = new Worker(URL.createObjectURL(blob));

// ── worker.js ───────────────────────────────────────────

self.addEventListener("message", (event) => {
  const { tipo, dati } = event.data;
  if (tipo === "calcola") {
    const risultato = dati.reduce((a, b) => a + b, 0);
    self.postMessage(risultato);
  }
});

// Importare script nel worker
importScripts("utils.js", "lib.js");

// SharedWorker — condiviso tra più tab
const shared = new SharedWorker("shared-worker.js");
shared.port.postMessage("ciao");
shared.port.onmessage = (e) => console.log(e.data);
shared.port.start();
```

---

## Console

```js
// Output base
console.log("Messaggio normale");
console.info("Informazione");
console.warn("Avvertimento");
console.error("Errore");
console.debug("Debug (nascosto di default)");

// Formattazione
console.log("%s ha %d anni", "Alice", 30);    // stringa, numero
console.log("%c Testo colorato", "color: red; font-size: 1.5em;");
console.log("%o", oggetto);     // rappresentazione interattiva
console.log("%O", oggetto);     // proprietà dell'oggetto

// Tabella
console.table([{ nome: "Alice", eta: 30 }, { nome: "Bob", eta: 25 }]);
console.table({ a: 1, b: 2 });

// Raggruppamento
console.group("Gruppo");
console.log("dentro il gruppo");
console.groupCollapsed("Collassato");
console.log("nascosto di default");
console.groupEnd();
console.groupEnd();

// Timing
console.time("operazione");
// ... codice ...
console.timeLog("operazione"); // stampa il tempo corrente
console.timeEnd("operazione"); // stampa il tempo totale

// Contatore
console.count("click");     // click: 1
console.count("click");     // click: 2
console.countReset("click");

// Stack trace
console.trace("Da dove viene chiamato?");

// Assert (stampa errore se falso)
console.assert(1 === 1, "Non verrà stampato");
console.assert(1 === 2, "1 non è uguale a 2"); // stampa errore

// Clear
console.clear();
```

---

## Clonazione oggetti

```js
// Shallow clone (copia solo il primo livello)
const shallow1 = { ...originale };
const shallow2 = Object.assign({}, originale);

// Deep clone (copia tutti i livelli)
// JSON (perde: Date, undefined, funzioni, Symbol, Map, Set, RegExp)
const deep1 = JSON.parse(JSON.stringify(originale));

// structuredClone (ES2022) — supporta Date, Map, Set, ArrayBuffer, ecc.
const deep2 = structuredClone(originale);

// Cosa NON copia structuredClone: funzioni, Symbol, nodi DOM, prototype personalizzato
const deep3 = structuredClone({ data: new Date(), numeri: new Set([1,2,3]) });
// { data: Date, numeri: Set } — correttamente clonati

// Con trasferimento (move invece di copy per performance con grandi buffer)
const buffer = new ArrayBuffer(1024);
const trasferito = structuredClone({ buffer }, { transfer: [buffer] });
// ora buffer è "neutered" (trasferito, non più usabile)
```

---

## Debounce e throttle

```js
// Debounce — esegue solo dopo N ms dall'ultima chiamata
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

const cercaDebounced = debounce((q) => fetch(`/api?q=${q}`), 300);
input.addEventListener("input", e => cercaDebounced(e.target.value));

// Throttle — esegue al massimo una volta ogni N ms
function throttle(fn, interval) {
  let ultimo = 0;
  return function(...args) {
    const ora = Date.now();
    if (ora - ultimo >= interval) {
      ultimo = ora;
      return fn.apply(this, args);
    }
  };
}

const scrollThrottled = throttle(() => console.log(window.scrollY), 100);
window.addEventListener("scroll", scrollThrottled);

// Debounce con esecuzione immediata (opzionale)
function debounceLeading(fn, delay) {
  let timer;
  let eseguito = false;
  return function(...args) {
    if (!eseguito) { fn.apply(this, args); eseguito = true; }
    clearTimeout(timer);
    timer = setTimeout(() => { eseguito = false; }, delay);
  };
}
```

---

## Currying

Trasforma una funzione con N argomenti in una catena di funzioni ognuna con 1 argomento.

```js
// Currying manuale
function somma(a) {
  return function(b) {
    return a + b;
  };
}
const somma5 = somma(5);
somma5(3); // 8
somma(5)(3); // 8

// Utility curry generica
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function(...altri) {
      return curried.apply(this, args.concat(altri));
    };
  };
}

const moltiplica = curry((a, b, c) => a * b * c);
moltiplica(2)(3)(4);   // 24
moltiplica(2, 3)(4);   // 24
moltiplica(2)(3, 4);   // 24
moltiplica(2, 3, 4);   // 24

// Partial application
function partial(fn, ...preArgs) {
  return function(...args) {
    return fn(...preArgs, ...args);
  };
}
const doppio = partial(moltiplica, 2, 1);
doppio(5); // 10
```

---

## Memoization

Cache dei risultati di funzioni pure costose.

```js
// Memoization semplice (chiave = primo argomento)
function memoize(fn) {
  const cache = new Map();
  return function(arg) {
    if (cache.has(arg)) return cache.get(arg);
    const risultato = fn.call(this, arg);
    cache.set(arg, risultato);
    return risultato;
  };
}

const fattorialeMemo = memoize(function fatt(n) {
  return n <= 1 ? 1 : n * fatt(n - 1);
});
fattorialeMemo(10); // calcola
fattorialeMemo(10); // dalla cache

// Memoization con chiave composta
function memoizeMulti(fn) {
  const cache = new Map();
  return function(...args) {
    const chiave = JSON.stringify(args);
    if (cache.has(chiave)) return cache.get(chiave);
    const risultato = fn.apply(this, args);
    cache.set(chiave, risultato);
    return risultato;
  };
}

// Con WeakMap (per oggetti — garbage collectable)
function memoizeOggetto(fn) {
  const cache = new WeakMap();
  return function(obj) {
    if (cache.has(obj)) return cache.get(obj);
    const risultato = fn.call(this, obj);
    cache.set(obj, risultato);
    return risultato;
  };
}
```

--- 
#HTML #JavaScript