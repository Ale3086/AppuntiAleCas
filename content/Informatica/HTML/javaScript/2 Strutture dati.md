## Indice

- [[#String]]
- [[#Number]]
- [[#Array]]
- [[#Object]]
- [[#Map]]
- [[#Set]]
- [[#WeakMap e WeakSet]]
- [[#Date]]
- [[#JSON]]

## String

Le stringhe sono immutabili. I metodi restituiscono sempre una nuova stringa.

```js
const s = "  Hello, World!  ";

// Proprietà
s.length          // 18

// Accesso ai caratteri
s[0]              // " "
s.at(-1)          // " " (indice negativo: dall'ultima)
s.charAt(2)       // "H"
s.charCodeAt(2)   // 72
String.fromCharCode(72) // "H"

// Ricerca
s.includes("World")        // true
s.startsWith("  Hello")    // true
s.endsWith("!  ")          // true
s.indexOf("l")             // 4 (prima occorrenza)
s.lastIndexOf("l")         // 10 (ultima occorrenza)
s.search(/world/i)         // 9 (regex, restituisce indice)
s.match(/l+/g)             // ["ll", "l"] (tutte le occorrenze)
s.matchAll(/l/g)           // iteratore di tutti i match con info

// Trasformazione
s.toUpperCase()            // "  HELLO, WORLD!  "
s.toLowerCase()            // "  hello, world!  "
s.trim()                   // "Hello, World!" (rimuove spazi)
s.trimStart()              // "Hello, World!  "
s.trimEnd()                // "  Hello, World!"
s.replace("World", "JS")   // "  Hello, JS!  " (prima occorrenza)
s.replaceAll("l", "L")     // "  HeLLo, WorLd!  "
s.replace(/l/g, "L")       // "  HeLLo, WorLd!  " (regex globale)

// Estrazione
s.slice(2, 7)              // "Hello"
s.slice(-3)                // "  " + "!" = ultimi 3 char
s.substring(2, 7)          // "Hello" (come slice ma no indici negativi)
s.split(", ")              // ["  Hello", "World!  "]
s.split("")                // array di caratteri

// Costruzione
"ha".repeat(3)             // "hahaha"
"5".padStart(4, "0")       // "0005"
"5".padEnd(4, "0")         // "5000"
["a", "b", "c"].join("-")  // "a-b-c"

// Template literal
const nome = "Alice";
const età = 30;
`Ciao, ${nome}! Hai ${età} anni.`   // interpolazione
`${2 + 2}`                          // "4"
`${età >= 18 ? "adulto" : "minore"}` // espressione ternaria
// Multiriga
const multiriga = `
  Prima riga
  Seconda riga
`;

// Tagged template literal
function evidenzia(strings, ...values) {
  return strings.reduce((acc, str, i) =>
    acc + str + (values[i] !== undefined ? `<b>${values[i]}</b>` : ""), "");
}
evidenzia`Ciao ${nome}, hai ${età} anni`; // "Ciao <b>Alice</b>, hai <b>30</b> anni"

// Caratteri speciali
"\n"   // newline
"\t"   // tab
"\\"   // backslash
"\'"   // apice
"\""   // virgolette
"\u0041" // "A" (Unicode escape)
"\u{1F600}" // emoji Unicode
```

---

## Number

```js
// Letterali
42          // intero
3.14        // decimale
1_000_000   // separatore visivo (ES2021)
0xff        // 255 in esadecimale
0o17        // 15 in ottale
0b1010      // 10 in binario
1e3         // 1000 (notazione scientifica)
1.5e-2      // 0.015

// Costanti
Number.MAX_SAFE_INTEGER   // 9007199254740991
Number.MIN_SAFE_INTEGER   // -9007199254740991
Number.MAX_VALUE          // ~1.79e+308
Number.MIN_VALUE          // ~5e-324 (più piccolo positivo)
Number.POSITIVE_INFINITY  // Infinity
Number.NEGATIVE_INFINITY  // -Infinity
Number.EPSILON            // ~2.22e-16 (più piccola differenza tra due numeri)
Number.NaN                // NaN

// Metodi dell'istanza
(3.14159).toFixed(2)       // "3.14" (stringa, arrotondato)
(1234.5).toFixed(0)        // "1235"
(12345.6).toExponential(2) // "1.23e+4"
(3.14159).toPrecision(4)   // "3.142"
(255).toString(16)          // "ff" (esadecimale)
(255).toString(2)           // "11111111" (binario)

// Metodi statici
Number.isNaN(NaN)          // true
Number.isFinite(42)        // true
Number.isInteger(42.0)     // true
Number.isSafeInteger(9007199254740991) // true
Number.parseInt("42px")    // 42
Number.parseFloat("3.14x") // 3.14

// Math
Math.round(4.5)    // 5
Math.ceil(4.1)     // 5
Math.floor(4.9)    // 4
Math.trunc(4.9)    // 4 (rimuove decimali senza arrotondare)
Math.abs(-5)       // 5
Math.max(1, 5, 3)  // 5
Math.min(1, 5, 3)  // 1
Math.pow(2, 10)    // 1024
Math.sqrt(16)      // 4
Math.cbrt(27)      // 3 (radice cubica)
Math.log(Math.E)   // 1
Math.log2(8)       // 3
Math.log10(1000)   // 3
Math.random()      // float casuale [0, 1)
Math.PI            // 3.14159...
Math.E             // 2.71828...
Math.sign(-5)      // -1
Math.hypot(3, 4)   // 5 (ipotenusa)
Math.clamp         // non esiste nativamente — usare: Math.min(Math.max(val, min), max)

// Numero casuale in un range
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
randomInt(1, 6); // dado da 1 a 6

// Precisione float — problema noto
0.1 + 0.2 === 0.3         // false
Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON // true (confronto sicuro)
```

---

## Array

Gli array sono oggetti con indici numerici. I metodi sono divisi in mutanti (modificano l'array) e non mutanti (restituiscono uno nuovo).

```js
// Creazione
const a = [1, 2, 3];
const b = new Array(3);          // [empty × 3]
const c = Array.from("abc");     // ["a", "b", "c"]
const d = Array.from({length: 5}, (_, i) => i * 2); // [0, 2, 4, 6, 8]
const e = Array.of(1, 2, 3);    // [1, 2, 3]

// Proprietà
a.length  // 3

// Accesso
a[0]      // 1
a.at(-1)  // 3 (indice negativo)

// ── Metodi MUTANTI ──────────────────────────────────────

// Aggiunta / rimozione
a.push(4)           // aggiunge in fondo, restituisce new length → 4
a.pop()             // rimuove dall'ultimo, restituisce l'elemento
a.unshift(0)        // aggiunge in cima, restituisce new length
a.shift()           // rimuove il primo, restituisce l'elemento

// splice(start, deleteCount, ...items) — rimuove e/o inserisce
a.splice(1, 1)          // rimuove 1 elemento a indice 1
a.splice(1, 0, 99)      // inserisce 99 a indice 1 senza rimuovere
a.splice(1, 2, 10, 20)  // rimuove 2 e inserisce 10, 20

// Ordinamento
a.sort()                        // ordine lessicografico (default)
a.sort((x, y) => x - y)         // ordine numerico crescente
a.sort((x, y) => y - x)         // ordine numerico decrescente
a.sort((x, y) => x.localeCompare(y)) // ordine alfabetico locale

a.reverse()         // inverte l'array in-place
a.fill(0)           // riempie tutto con 0
a.fill(0, 2, 4)     // riempie dall'indice 2 al 3 con 0
a.copyWithin(0, 3)  // copia dal'indice 3 in poi all'inizio

// ── Metodi NON MUTANTI ──────────────────────────────────

// Iterazione con trasformazione
[1,2,3].map(x => x * 2)               // [2, 4, 6]
[1,2,3,4].filter(x => x % 2 === 0)    // [2, 4]
[1,2,3].reduce((acc, x) => acc + x, 0) // 6
[1,2,3].reduceRight((acc, x) => acc + x, 0) // 6 (da destra)
[[1,2],[3,4]].flat()                   // [1, 2, 3, 4]
[[1,[2]],[3]].flat(Infinity)           // [1, 2, 3] (profondità illimitata)
[1,2,3].flatMap(x => [x, x * 2])      // [1, 2, 2, 4, 3, 6]

// Ricerca
[1,2,3].find(x => x > 1)              // 2 (primo che soddisfa)
[1,2,3].findIndex(x => x > 1)         // 1
[1,2,3].findLast(x => x < 3)          // 2
[1,2,3].findLastIndex(x => x < 3)     // 1
[1,2,3].includes(2)                    // true
[1,2,3].indexOf(2)                     // 1 (-1 se non trovato)
[1,2,3].lastIndexOf(2)                 // 1

// Verifica
[1,2,3].every(x => x > 0)             // true (tutti soddisfano)
[1,2,3].some(x => x > 2)              // true (almeno uno)

// Costruzione
[1,2].concat([3,4], [5])              // [1, 2, 3, 4, 5]
[1,2,3].slice(1, 2)                   // [2]
[1,2,3].slice(-1)                     // [3]
[1,2,3].join(" - ")                   // "1 - 2 - 3"
[...new Set([1,1,2,3])].sort()        // [1, 2, 3] (deduplica)

// Conversione
Array.from(new Set([1, 2, 2, 3]))     // [1, 2, 3]
Object.entries({a:1, b:2})            // [["a",1],["b",2]]

// Iteratori
[...["a","b","c"].keys()]             // [0, 1, 2]
[...["a","b","c"].values()]           // ["a", "b", "c"]
[...["a","b","c"].entries()]          // [[0,"a"],[1,"b"],[2,"c"]]

// Metodi nuovi (ES2023+)
[1,2,3].toReversed()                  // [3, 2, 1] — non mutante
[3,1,2].toSorted((a,b) => a - b)     // [1, 2, 3] — non mutante
[1,2,3].toSpliced(1, 1, 99)          // [1, 99, 3] — non mutante
[1,2,3].with(1, 99)                   // [1, 99, 3] — sostituisce all'indice
```

---

## Object

```js
// Creazione
const persona = { nome: "Alice", eta: 30 };
const vuoto = {};
const conProto = Object.create({ saluta() { return "Ciao"; } });

// Accesso
persona.nome          // "Alice" (dot notation)
persona["eta"]        // 30 (bracket notation — utile con chiavi dinamiche)
const chiave = "nome";
persona[chiave]       // "Alice"

// Modifica
persona.eta = 31;
persona.città = "Milano";     // aggiunge proprietà
delete persona.città;         // rimuove proprietà

// Verifica
"nome" in persona             // true (anche ereditato)
persona.hasOwnProperty("nome") // true (solo proprietà proprie)
Object.hasOwn(persona, "nome") // true (moderno, preferibile)

// Iterazione
Object.keys(persona)          // ["nome", "eta"]
Object.values(persona)        // ["Alice", 30]
Object.entries(persona)       // [["nome","Alice"],["eta",30]]
for (const [k, v] of Object.entries(persona)) {
  console.log(k, v);
}

// Costruzione e copia
Object.assign({}, persona, { eta: 32 }) // shallow merge
const copia = { ...persona }            // shallow clone
const merge = { ...a, ...b }            // unisce due oggetti (b sovrascrive a)

// Creazione da entries
Object.fromEntries([["a", 1], ["b", 2]]) // { a: 1, b: 2 }
Object.fromEntries(new Map([["a", 1]]))   // { a: 1 }

// Congelamento e sigillatura
Object.freeze(persona)    // nessuna modifica, aggiunta o rimozione
Object.seal(persona)      // nessuna aggiunta/rimozione, ma modifica ok
Object.isFrozen(persona)  // true
Object.isSealed(persona)  // true

// Proprietà descrittori
Object.defineProperty(persona, "id", {
  value: 1,
  writable: false,       // non riassegnabile
  enumerable: false,     // non appare in for...in, Object.keys
  configurable: false,   // non cancellabile
});
Object.getOwnPropertyDescriptor(persona, "nome")
// { value: "Alice", writable: true, enumerable: true, configurable: true }

Object.defineProperties(persona, {
  a: { value: 1, writable: true },
  b: { value: 2, enumerable: true },
});

// Prototype
Object.getPrototypeOf(persona)    // Object.prototype
Object.setPrototypeOf(persona, null) // rimuove il prototipo (sconsigliato per perf)
```

---

## Map

Mappa chiave→valore. Le chiavi possono essere di qualsiasi tipo (anche oggetti). Mantiene l'ordine di inserimento.

```js
const map = new Map();

// Aggiunta
map.set("nome", "Alice");
map.set(42, "il numero");
map.set({ id: 1 }, "oggetto chiave");  // chiave oggetto

// Lettura
map.get("nome")     // "Alice"
map.get(42)         // "il numero"
map.has("nome")     // true
map.size            // 3

// Rimozione
map.delete("nome")  // true
map.clear()         // svuota tutto

// Iterazione
for (const [k, v] of map) { console.log(k, v); }
[...map.keys()]     // array delle chiavi
[...map.values()]   // array dei valori
[...map.entries()]  // array di [chiave, valore]
map.forEach((v, k) => console.log(k, v));

// Creazione da array
const m = new Map([["a", 1], ["b", 2]]);

// Conversione
Object.fromEntries(m)  // { a: 1, b: 2 }

// Map vs Object
// Map: qualsiasi tipo di chiave, mantiene ordine, .size, più performante per inserimenti/rimozioni frequenti
// Object: chiavi solo string/symbol, prototipo ereditato, JSON-serializzabile
```

---

## Set

Collezione di valori unici. Mantiene l'ordine di inserimento.

```js
const set = new Set([1, 2, 2, 3, 3]);
// Set(3) { 1, 2, 3 }

// Aggiunta / rimozione
set.add(4)       // aggiunge
set.delete(2)    // true
set.has(3)       // true
set.size         // 3
set.clear()      // svuota

// Iterazione
for (const v of set) { console.log(v); }
[...set]                   // converte in array
set.forEach(v => console.log(v));
[...set.values()]          // array dei valori
[...set.entries()]         // [[v, v], ...] (chiave = valore)

// Operazioni insiemistiche
const a = new Set([1, 2, 3]);
const b = new Set([2, 3, 4]);

const unione        = new Set([...a, ...b]);         // {1,2,3,4}
const intersezione  = new Set([...a].filter(x => b.has(x))); // {2,3}
const differenza    = new Set([...a].filter(x => !b.has(x))); // {1}
const simmetrica    = new Set([...a, ...b].filter(x => !(a.has(x) && b.has(x)))); // {1,4}

// Deduplica array
const unici = [...new Set([1, 1, 2, 3, 3])]; // [1, 2, 3]
```

---

## WeakMap e WeakSet

Come Map e Set, ma le chiavi (WeakMap) o i valori (WeakSet) devono essere oggetti e sono tenuti debolmente: se non ci sono altri riferimenti, il garbage collector li può rimuovere.

```js
// WeakMap — per dati privati associati a oggetti
const datiPrivati = new WeakMap();
class Persona {
  constructor(nome) {
    datiPrivati.set(this, { nome });
  }
  getNome() {
    return datiPrivati.get(this).nome;
  }
}

// Metodi: get, set, has, delete (no size, no iterazione)
const wm = new WeakMap();
let obj = {};
wm.set(obj, "dato");
wm.get(obj);   // "dato"
obj = null;    // ora obj è garbage collectable

// WeakSet — per tracciare oggetti senza impedire il GC
const visitati = new WeakSet();
function visita(nodo) {
  if (visitati.has(nodo)) return;
  visitati.add(nodo);
  // processa nodo...
}

// Metodi: add, has, delete (no size, no iterazione)
```

---

## Date

```js
// Creazione
const ora = new Date();                        // adesso
const data = new Date("2024-03-15");           // da stringa ISO
const data2 = new Date(2024, 2, 15);           // anno, mese (0-based!), giorno
const data3 = new Date(2024, 2, 15, 10, 30);   // + ore, minuti
const ts = new Date(0);                        // epoch (1 gen 1970)

// Getter
const d = new Date("2024-03-15T10:30:00");
d.getFullYear()    // 2024
d.getMonth()       // 2 (marzo, 0-based!)
d.getDate()        // 15 (giorno del mese)
d.getDay()         // 5 (venerdì, 0=domenica)
d.getHours()       // 10
d.getMinutes()     // 30
d.getSeconds()     // 0
d.getMilliseconds() // 0
d.getTime()        // timestamp in millisecondi

// Setter
d.setFullYear(2025);
d.setMonth(0);        // gennaio
d.setDate(1);
d.setHours(12);

// Comparazione
const a = new Date("2024-01-01");
const b = new Date("2024-06-01");
a < b        // true
a.getTime() - b.getTime()  // differenza in millisecondi

// Timestamp
Date.now()            // ms dall'epoch (senza creare oggetto)

// Formattazione
d.toISOString()         // "2024-03-15T10:30:00.000Z"
d.toLocaleDateString("it-IT")  // "15/3/2024"
d.toLocaleDateString("it-IT", { day:"2-digit", month:"long", year:"numeric" })
// "15 marzo 2024"
d.toLocaleTimeString("it-IT")  // "10:30:00"
d.toLocaleString("it-IT")      // "15/3/2024, 10:30:00"

// Intl.DateTimeFormat (più potente)
new Intl.DateTimeFormat("it-IT", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
}).format(d);
// "venerdì 15 marzo 2024"

// Calcoli
const domani = new Date(Date.now() + 24 * 60 * 60 * 1000);
const traUnMese = new Date(d);
traUnMese.setMonth(traUnMese.getMonth() + 1);
```

---

## JSON

Formato di serializzazione testo. Supporta: oggetti, array, stringhe, numeri, booleani, null. Non supporta: `undefined`, funzioni, `Date`, `Map`, `Set`, `Symbol`.

```js
// Serializzazione
JSON.stringify({ nome: "Alice", eta: 30 })
// '{"nome":"Alice","eta":30}'

JSON.stringify({ a: 1 }, null, 2)          // indentato con 2 spazi
JSON.stringify({ a: undefined, b: 1 })     // '{"b":1}' — undefined escluso
JSON.stringify([1, undefined, 3])          // '[1,null,3]' — undefined → null
JSON.stringify(new Date())                 // '"2024-03-15T10:30:00.000Z"'

// Replacer
JSON.stringify({ a: 1, b: 2, c: 3 }, ["a", "c"])  // '{"a":1,"c":3}'
JSON.stringify({ a: 1, b: "testo" }, (k, v) => typeof v === "string" ? undefined : v)
// '{"a":1}'

// Deserializzazione
JSON.parse('{"nome":"Alice","eta":30}')    // { nome: "Alice", eta: 30 }
JSON.parse('[1, 2, 3]')                    // [1, 2, 3]

// Reviver
JSON.parse('{"data":"2024-03-15"}', (k, v) => k === "data" ? new Date(v) : v)
// { data: Date object }

// Clonazione profonda (attenzione ai limiti)
const clone = JSON.parse(JSON.stringify(obj)); // perde Date, undefined, funzioni

// Metodo toJSON personalizzato
class Prodotto {
  constructor(nome, prezzo) {
    this.nome = nome;
    this.prezzo = prezzo;
  }
  toJSON() {
    return { nome: this.nome, prezzoFormattato: `€ ${this.prezzo}` };
  }
}
JSON.stringify(new Prodotto("Libro", 15)); // '{"nome":"Libro","prezzoFormattato":"€ 15"}'
```

---
#HTML #JavaScript