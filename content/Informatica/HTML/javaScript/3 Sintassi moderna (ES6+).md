## Indice

- [[#Destructuring]]
- [[#Spread e Rest]]
- [[#Template literals]]
- [[#Optional chaining]]
- [[#Nullish coalescing]]
- [[#Shorthand properties]]
- [[#Computed properties]]
- [[#Moduli ES6]]

## Destructuring

Estrae valori da array o oggetti in variabili.

```js
// Array destructuring
const [a, b, c] = [1, 2, 3];
const [x, , z] = [1, 2, 3];          // salta il secondo
const [primo, ...resto] = [1, 2, 3]; // rest: resto = [2, 3]
const [p = 10, q = 20] = [1];        // default: q = 20

// Swap
let m = 1, n = 2;
[m, n] = [n, m];  // m=2, n=1

// Object destructuring
const { nome, eta } = { nome: "Alice", eta: 30 };
const { nome: n2, eta: e2 } = { nome: "Alice", eta: 30 }; // rinomina
const { nome: nome3 = "Anonimo", ruolo = "user" } = {};   // con default
const { a: { b: profondi } } = { a: { b: 42 } };          // annidato

// Rest in oggetti
const { nome: n3, ...altriCampi } = { nome: "Alice", eta: 30, città: "MI" };
// altriCampi = { eta: 30, città: "MI" }

// In parametri di funzione
function mostra({ nome, eta = 0 }) {
  console.log(nome, eta);
}
mostra({ nome: "Alice", eta: 30 });

// In cicli
const persone = [{ nome: "Alice" }, { nome: "Bob" }];
for (const { nome } of persone) {
  console.log(nome);
}
```

---

## Spread e Rest

`...` si comporta diversamente a seconda del contesto.

```js
// ── Spread: espande un iterabile ────────────────────────

// In array
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];         // [1, 2, 3, 4, 5]
const copia = [...arr1];              // shallow clone
const uniti = [...arr1, ...arr2];     // concat

// In oggetti
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 };      // { a:1, b:2, c:3 }
const override = { ...obj1, b: 99 }; // { a:1, b:99 }

// In chiamata di funzione
Math.max(...[1, 5, 3]); // 5
[].push(...[1, 2, 3]);

// Spread su stringa
[..."ciao"]  // ["c", "i", "a", "o"]

// ── Rest: raccoglie argomenti rimanenti ──────────────────

// In funzione
function somma(primo, ...altri) {
  return altri.reduce((acc, n) => acc + n, primo);
}
somma(1, 2, 3, 4); // 10

// In destructuring (vedi sezione Destructuring)
const [head, ...tail] = [1, 2, 3]; // tail = [2, 3]
const { a: _, ...senzaA } = { a: 1, b: 2, c: 3 };
```

---

## Template literals

```js
const nome = "Alice";
const eta = 30;

// Interpolazione
`Ciao, ${nome}!`
`${2 + 2}`
`${eta >= 18 ? "adulto" : "minore"}`
`${[1,2,3].map(x => x*2).join(", ")}`

// Multiriga (newline reali)
const html = `
  <div class="card">
    <h2>${nome}</h2>
  </div>
`;

// Tagged template
function sql(strings, ...values) {
  const query = strings.reduce((acc, str, i) =>
    acc + str + (values[i] !== undefined ? `$${i}` : ""), "");
  return { query, params: values };
}
const id = 5;
sql`SELECT * FROM utenti WHERE id = ${id}`;
// { query: "SELECT * FROM utenti WHERE id = $1", params: [5] }

// String.raw — backslash non interpretati
String.raw`C:\Users\nome`  // "C:\\Users\\nome"
```

---

## Optional chaining

`?.` accede a una proprietà o chiama una funzione solo se il valore a sinistra non è `null` o `undefined`. Restituisce `undefined` invece di sollevare un errore.

```js
const utente = {
  nome: "Alice",
  indirizzo: { città: "Milano" },
  saluta() { return "Ciao!"; }
};

// Senza optional chaining
utente && utente.indirizzo && utente.indirizzo.città  // "Milano"

// Con optional chaining
utente?.indirizzo?.città         // "Milano"
utente?.telefono?.numero         // undefined (non lancia errore)
utente?.saluta()                 // "Ciao!"
utente?.metodoInesistente?.()    // undefined
utente?.amici?.[0]               // undefined (bracket notation)

// Con nullish coalescing
utente?.telefono?.numero ?? "N/D"  // "N/D"
```

---

## Nullish coalescing

`??` restituisce il lato destro solo se il lato sinistro è `null` o `undefined` (non altri valori falsy come `0`, `""`, `false`).

```js
null ?? "default"       // "default"
undefined ?? "default"  // "default"
0 ?? "default"          // 0      — differenza da ||
"" ?? "default"         // ""     — differenza da ||
false ?? "default"      // false  — differenza da ||

// vs OR logico
0 || "default"          // "default" (0 è falsy)
"" || "default"         // "default" ("" è falsy)

// Assegnazione nullish
let x = null;
x ??= "valore";         // x = "valore" (solo se null/undefined)
let y = 0;
y ??= "valore";         // y = 0 (non cambia: 0 non è null/undefined)

// Assegnazione logica
let a = null;
a ||= "fallback";       // a = "fallback" (se falsy)
let b = 1;
b &&= 99;               // b = 99 (se truthy)
```

---

## Shorthand properties

```js
const nome = "Alice";
const eta = 30;

// Shorthand property (ES6)
const persona = { nome, eta };  // equivale a { nome: nome, eta: eta }

// Shorthand method
const obj = {
  saluta() {
    return "Ciao!";
  },
  // equivale a: saluta: function() { ... }
};

// Computed property
const campo = "nome";
const obj2 = { [campo]: "Alice" };  // { nome: "Alice" }

// Symbol come chiave
const id = Symbol("id");
const obj3 = { [id]: 1 };
obj3[id]; // 1
```

---

## Computed properties

```js
const prefisso = "get";
const nome = "Nome";

const obj = {
  [`${prefisso}${nome}`]() {    // getMe come metodo
    return "Alice";
  },
  [`campo_${1 + 1}`]: "valore", // "campo_2": "valore"
};

obj.getNome();   // "Alice"
obj.campo_2;     // "valore"

// Utile con variabili dinamiche
function creaOggetto(chiave, valore) {
  return { [chiave]: valore };
}
creaOggetto("colore", "rosso"); // { colore: "rosso" }
```

---

## Moduli ES6

Sistema di moduli nativo del browser (e Node.js con `.mjs` o `"type": "module"`).

```js
// ── Esportazione ────────────────────────────────────────

// math.js
export const PI = 3.14159;
export function somma(a, b) { return a + b; }
export class Vettore { constructor(x, y) { this.x = x; this.y = y; } }

// Export default (uno per file)
export default function moltiplica(a, b) { return a * b; }

// Rinominare in export
const interno = "valore";
export { interno as pubblico };

// Re-esportare da un altro modulo
export { somma } from "./utils.js";
export * from "./helpers.js";
export * as helpers from "./helpers.js";

// ── Importazione ────────────────────────────────────────

// Importazione named
import { PI, somma } from "./math.js";

// Rinominare in import
import { somma as aggiungi } from "./math.js";

// Import default
import moltiplica from "./math.js";

// Import default + named insieme
import moltiplica, { PI, somma } from "./math.js";

// Import tutto come namespace
import * as Math2 from "./math.js";
Math2.somma(1, 2);
Math2.default(3, 4); // default export

// Import dinamico (lazy, restituisce una Promise)
async function caricaModulo() {
  const { somma } = await import("./math.js");
  return somma(1, 2);
}

// Import con assert (meta)
import data from "./dati.json" assert { type: "json" };
```

---
#HTML #JavaScript