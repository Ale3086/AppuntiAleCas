## Indice

- [[#Callback]]
- [[#Promise]]
- [[#async e await]]
- [[#Fetch API]]

## Callback

Una funzione passata come argomento a un'altra funzione, chiamata al termine di un'operazione asincrona.

```js
// Callback semplice
function saluta(nome, callback) {
  const messaggio = `Ciao, ${nome}!`;
  callback(messaggio);
}
saluta("Alice", (msg) => console.log(msg));

// Pattern error-first (Node.js)
fs.readFile("file.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});

// Callback hell — problema da evitare
faiA((errA, risA) => {
  if (errA) return gestisci(errA);
  faiB(risA, (errB, risB) => {
    if (errB) return gestisci(errB);
    faiC(risB, (errC, risC) => {
      // ...sempre più annidato
    });
  });
});
```

---

## Promise

Rappresenta il completamento (o il fallimento) di un'operazione asincrona. Tre stati: `pending`, `fulfilled`, `rejected`.

```js
// Creazione
const p = new Promise((resolve, reject) => {
  const successo = true;
  if (successo) resolve("risultato");
  else          reject(new Error("errore"));
});

// Consumo
p
  .then(valore => console.log(valore))  // "risultato"
  .catch(err  => console.error(err))
  .finally(()  => console.log("finito"));

// Concatenamento (.then restituisce una nuova Promise)
fetch("/api/utente")
  .then(res  => res.json())
  .then(data => data.nome)
  .then(nome => `Ciao, ${nome}!`)
  .catch(err => console.error(err));

// Creazione rapida
Promise.resolve(42)          // Promise già risolta con 42
Promise.reject(new Error())  // Promise già rigettata

// Combinatori
Promise.all([p1, p2, p3])
// Attende tutte; rigetta se anche solo una rigetta

Promise.allSettled([p1, p2, p3])
// Attende tutte; non rigetta mai; restituisce [{status, value|reason}]

Promise.race([p1, p2, p3])
// Risolve/rigetta con la prima che si completa

Promise.any([p1, p2, p3])
// Risolve con la prima che si risolve; rigetta solo se tutte rigettano (AggregateError)

// Esempio Promise.allSettled
const risultati = await Promise.allSettled([
  fetch("/api/a"),
  fetch("/api/b"),
]);
risultati.forEach(r => {
  if (r.status === "fulfilled") console.log(r.value);
  else console.error(r.reason);
});
```

---

## async e await

Sintassi per scrivere codice asincrono in modo sincrono. Una funzione `async` restituisce sempre una Promise.

```js
// Dichiarazione
async function caricaDati() {
  const risposta = await fetch("/api/dati");  // attende la Promise
  const json = await risposta.json();
  return json;
}

// Arrow async
const carica = async () => {
  const res = await fetch("/api");
  return res.json();
};

// Gestione errori
async function sicuro() {
  try {
    const res = await fetch("/api");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Errore:", err.message);
    return null;
  }
}

// Await in parallelo
async function parallelo() {
  // Sbagliato: sequenziale (lento)
  const a = await fetchA();
  const b = await fetchB();

  // Corretto: parallelo
  const [a2, b2] = await Promise.all([fetchA(), fetchB()]);
  return { a2, b2 };
}

// Top-level await (nei moduli ES6)
const dati = await fetch("/api/dati").then(r => r.json());

// for await...of (stream / iterabili asincroni)
async function leggiStream(stream) {
  for await (const chunk of stream) {
    console.log(chunk);
  }
}
```

---

## Fetch API

Interfaccia per richieste HTTP. Restituisce una Promise.

```js
// GET base
const res = await fetch("https://api.example.com/utenti");
const dati = await res.json();

// Verifica HTTP status
if (!res.ok) throw new Error(`Errore HTTP: ${res.status}`);

// POST con JSON
const res2 = await fetch("/api/utenti", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer TOKEN",
  },
  body: JSON.stringify({ nome: "Alice", eta: 30 }),
});

// PUT / PATCH / DELETE
await fetch(`/api/utenti/${id}`, { method: "DELETE" });
await fetch(`/api/utenti/${id}`, {
  method: "PATCH",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ eta: 31 }),
});

// Form data (upload file)
const formData = new FormData();
formData.append("file", fileInput.files[0]);
formData.append("nome", "documento");
await fetch("/api/upload", { method: "POST", body: formData });

// Opzioni di fetch
fetch(url, {
  method: "GET",                // GET POST PUT PATCH DELETE HEAD OPTIONS
  headers: {},                  // oggetto o Headers
  body: null,                   // string, FormData, Blob, ArrayBuffer…
  mode: "cors",                 // cors no-cors same-origin
  credentials: "same-origin",   // omit same-origin include
  cache: "default",             // no-store no-cache reload force-cache
  redirect: "follow",           // follow error manual
  referrerPolicy: "strict-origin-when-cross-origin",
  signal: controller.signal,    // AbortSignal per cancellare la richiesta
});

// AbortController — cancellare una richiesta
const controller = new AbortController();
setTimeout(() => controller.abort(), 5000); // timeout 5s
try {
  const res = await fetch("/api/lenta", { signal: controller.signal });
} catch (err) {
  if (err.name === "AbortError") console.log("Richiesta annullata");
}

// Leggere la risposta
res.json()        // Promise<object>
res.text()        // Promise<string>
res.blob()        // Promise<Blob>
res.arrayBuffer() // Promise<ArrayBuffer>
res.formData()    // Promise<FormData>
res.headers.get("Content-Type")
res.status        // 200
res.statusText    // "OK"
res.ok            // true se status 200-299
res.url           // URL finale (dopo redirect)
```

---
#HTML #JavaScript