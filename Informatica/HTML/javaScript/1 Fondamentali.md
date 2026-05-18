## Indice

- [[#Variabili]]
- [[#Tipi di dato]]
- [[#Operatori]]
- [[#Conversioni di tipo]]
- [[#Condizionali]]
- [[#Cicli]]
- [[#Funzioni]]
- [[#Arrow function]]
- [[#Scope e closures]]
- [[#Hoisting]]

## Variabili

`var` è function-scoped e soggetta a hoisting (evitare). `let` è block-scoped e riassegnabile. `const` è block-scoped e non riassegnabile (ma l'oggetto/array a cui punta è mutabile).

```js
var vecchio = "evitare";        // function-scoped, hoisting
let contatore = 0;              // block-scoped, riassegnabile
const PI = 3.14159;             // block-scoped, non riassegnabile

contatore = 1;                  // OK
// PI = 3;                      // TypeError

const persona = { nome: "Alice" };
persona.nome = "Bob";           // OK: la proprietà è mutabile
persona.eta = 30;               // OK: si può aggiungere
// persona = {};                // TypeError: non si può riassegnare

const arr = [1, 2, 3];
arr.push(4);                    // OK
// arr = [];                    // TypeError
```

---

## Tipi di dato

JavaScript ha 7 tipi primitivi e il tipo `object`.

```js
// Primitivi
let stringa   = "testo";          // string
let numero    = 42;               // number
let decimale  = 3.14;             // number (non c'è un tipo float separato)
let grande    = 9007199254740993n; // bigint
let booleano  = true;             // boolean
let nullo     = null;             // null (assenza intenzionale di valore)
let indefinito;                   // undefined (variabile non inizializzata)
let simbolo   = Symbol("id");     // symbol (valore unico)

// Object (non primitivo)
let oggetto = { a: 1 };
let array   = [1, 2, 3];
let funzione = function() {};

// Controllo tipo
typeof "testo"       // "string"
typeof 42            // "number"
typeof 42n           // "bigint"
typeof true          // "boolean"
typeof undefined     // "undefined"
typeof Symbol()      // "symbol"
typeof null          // "object" — storico bug di JS
typeof {}            // "object"
typeof []            // "object"
typeof function(){}  // "function"

// Controllo più preciso
Array.isArray([])            // true
null === null                // true
Object.prototype.toString.call([]) // "[object Array]"
```

---

## Operatori

```js
// Aritmetici
5 + 3   // 8
5 - 3   // 2
5 * 3   // 15
5 / 3   // 1.6666...
5 % 3   // 2  (resto)
5 ** 3  // 125 (elevamento a potenza)
5 / 0   // Infinity
0 / 0   // NaN

// Incremento / decremento
let n = 5;
n++;  // 5 (restituisce prima, poi incrementa)
++n;  // 7 (incrementa prima, poi restituisce)
n--;  // 7 (restituisce prima, poi decrementa)

// Assegnazione composta
n += 10;  // n = n + 10
n -= 2;   // n = n - 2
n *= 3;   // n = n * 3
n /= 4;   // n = n / 4
n %= 5;   // n = n % 5
n **= 2;  // n = n ** 2

// Confronto
3 == "3"    // true  — uguaglianza debole (coercizione di tipo)
3 === "3"   // false — uguaglianza stretta (preferibile sempre)
3 != "3"    // false
3 !== "3"   // true
3 > 2       // true
3 >= 3      // true
3 < 4       // true
3 <= 3      // true

// Logici
true && false  // false (AND)
true || false  // true  (OR)
!true          // false (NOT)

// Short-circuit evaluation
null && "mai eseguito"    // null    (esce al primo falsy)
"a"  || "mai eseguito"    // "a"     (esce al primo truthy)
null ?? "default"         // "default" (nullish coalescing)

// Bitwise (raramente usati)
5 & 3   // 1
5 | 3   // 7
5 ^ 3   // 6
~5      // -6
5 << 1  // 10
5 >> 1  // 2

// Ternario
let msg = età >= 18 ? "adulto" : "minorenne";

// Comma operator (sconsigliato)
let x = (1, 2, 3); // x === 3

// typeof, instanceof, void, delete
typeof 42                     // "number"
[] instanceof Array           // true
void 0                        // undefined
delete obj.prop               // rimuove la proprietà, restituisce true
```

---

## Conversioni di tipo

JavaScript esegue conversioni implicite (coercizione). Preferire conversioni esplicite.

```js
// Verso stringa
String(42)        // "42"
String(true)      // "true"
String(null)      // "null"
String(undefined) // "undefined"
(42).toString()   // "42"
(255).toString(16) // "ff" (base 16)
42 + ""           // "42" (implicita, sconsigliata)

// Verso numero
Number("42")      // 42
Number("")        // 0
Number("  ")      // 0
Number("abc")     // NaN
Number(true)      // 1
Number(false)     // 0
Number(null)      // 0
Number(undefined) // NaN
parseInt("42px")  // 42
parseInt("0xff", 16) // 255
parseFloat("3.14rem") // 3.14
+"42"             // 42 (unario +, sconsigliato)

// Verso booleano
Boolean(0)          // false
Boolean("")         // false
Boolean(null)       // false
Boolean(undefined)  // false
Boolean(NaN)        // false
Boolean(false)      // false
// Tutto il resto è true
Boolean(1)          // true
Boolean("a")        // true
Boolean([])         // true  — attenzione!
Boolean({})         // true  — attenzione!
!!0                 // false (doppia negazione, sconsigliato)

// NaN
isNaN("abc")        // true (con coercizione)
Number.isNaN("abc") // false (senza coercizione, preferibile)
Number.isNaN(NaN)   // true

// Controllo valori finiti
Number.isFinite(Infinity) // false
Number.isFinite(42)       // true
Number.isInteger(42.0)    // true
Number.isInteger(42.5)    // false
```

---

## Condizionali

```js
// if / else if / else
if (punteggio >= 90) {
  console.log("A");
} else if (punteggio >= 70) {
  console.log("B");
} else {
  console.log("C");
}

// switch
switch (giorno) {
  case "lunedì":
  case "martedì":
    console.log("inizio settimana");
    break;
  case "venerdì":
    console.log("fine settimana");
    break;
  default:
    console.log("altro giorno");
}

// switch con return in una funzione (no break necessario)
function getLabel(code) {
  switch (code) {
    case 200: return "OK";
    case 404: return "Not Found";
    case 500: return "Server Error";
    default:  return "Unknown";
  }
}

// Ternario (per espressioni semplici)
const saluto = ora < 12 ? "Buongiorno" : "Buonasera";

// Guardie (early return)
function elabora(input) {
  if (!input) return null;           // esce subito
  if (typeof input !== "string") return null;
  return input.trim().toUpperCase();
}
```

---

## Cicli

```js
// for classico
for (let i = 0; i < 5; i++) {
  console.log(i); // 0 1 2 3 4
}

// for...of — itera sui valori (array, string, Map, Set, iterabili)
for (const frutto of ["mela", "pera", "uva"]) {
  console.log(frutto);
}

// for...of con indice
for (const [i, valore] of ["a", "b", "c"].entries()) {
  console.log(i, valore); // 0 "a", 1 "b", 2 "c"
}

// for...in — itera sulle chiavi enumerabili di un oggetto (usare con cautela)
const obj = { a: 1, b: 2 };
for (const chiave in obj) {
  console.log(chiave, obj[chiave]); // "a" 1, "b" 2
}

// while
let i = 0;
while (i < 5) {
  console.log(i++);
}

// do...while (eseguito almeno una volta)
let tentativo = 0;
do {
  tentativo++;
} while (tentativo < 3);

// break — esce dal ciclo
for (let i = 0; i < 10; i++) {
  if (i === 5) break;
}

// continue — salta all'iterazione successiva
for (let i = 0; i < 5; i++) {
  if (i === 2) continue;
  console.log(i); // 0 1 3 4
}

// label — break/continue su cicli annidati
outer: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (j === 1) continue outer;
    console.log(i, j);
  }
}
```

---

## Funzioni

```js
// Dichiarazione (hoisted)
function somma(a, b) {
  return a + b;
}

// Espressione (non hoisted)
const moltiplica = function(a, b) {
  return a * b;
};

// Parametri di default
function saluta(nome = "Mondo") {
  return `Ciao, ${nome}!`;
}

// Parametri rest (raccoglie gli argomenti in un array)
function sommaAll(...numeri) {
  return numeri.reduce((acc, n) => acc + n, 0);
}
sommaAll(1, 2, 3, 4); // 10

// Argomenti extra ignorati
function primiDue(a, b) { return a + b; }
primiDue(1, 2, 3, 4);  // 3

// Funzione come argomento (higher-order)
function applica(fn, valore) {
  return fn(valore);
}
applica(Math.sqrt, 16); // 4

// Funzione che restituisce funzione
function moltiplicaPer(x) {
  return function(y) {
    return x * y;
  };
}
const doppio = moltiplicaPer(2);
doppio(5); // 10

// IIFE — Immediately Invoked Function Expression
(function() {
  console.log("eseguita subito");
})();

// arguments (solo in funzioni classiche, non arrow)
function args() {
  console.log(arguments); // oggetto array-like
}
```

---

## Arrow function

Sintassi compatta. Non ha proprio `this`, `arguments`, né `prototype`. Non può essere usata come costruttore.

```js
// Sintassi
const quadrato = x => x * x;
const somma = (a, b) => a + b;
const saluta = () => "Ciao!";

// Corpo a blocco (serve il return esplicito)
const processa = (x) => {
  const risultato = x * 2;
  return risultato + 1;
};

// Restituire un oggetto (wrap tra parentesi)
const creaOggetto = (nome, eta) => ({ nome, eta });
creaOggetto("Alice", 30); // { nome: "Alice", eta: 30 }

// this lessicale — eredita il this del contesto esterno
class Timer {
  constructor() {
    this.secondi = 0;
  }
  avvia() {
    // Arrow: this è l'istanza Timer
    setInterval(() => {
      this.secondi++;
    }, 1000);
  }
}

// Differenza con funzione classica
const obj = {
  nome: "test",
  classica: function() { return this.nome; }, // "test"
  arrow: () => this.nome,                      // undefined (this è window/global)
};
```

---

## Scope e closures

Lo scope determina dove una variabile è accessibile. Le closures permettono a una funzione di ricordare il proprio scope esterno.

```js
// Block scope
{
  let blocco = "visibile solo qui";
  const anche = "idem";
}
// console.log(blocco); // ReferenceError

// Function scope
function esterna() {
  let x = 10;
  function interna() {
    console.log(x); // 10 — accede alla variabile esterna (closure)
  }
  interna();
}

// Closure pratica: contatore privato
function creaContatore() {
  let count = 0;
  return {
    incrementa: () => ++count,
    decrementa: () => --count,
    valore:     () => count,
  };
}
const c = creaContatore();
c.incrementa(); // 1
c.incrementa(); // 2
c.valore();     // 2

// Closure in cicli — errore classico con var
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 3 3 3 — i è condivisa
}
// Soluzione con let (block-scoped)
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 0 1 2
}
```

---

## Hoisting

Le dichiarazioni di variabili e funzioni vengono "sollevate" in cima al loro scope prima dell'esecuzione.

```js
// Funzioni dichiarate: completamente hoisted
console.log(saluta("Alice")); // "Ciao, Alice!" — funziona prima della dichiarazione
function saluta(nome) {
  return `Ciao, ${nome}!`;
}

// var: hoisted ma inizializzato a undefined
console.log(x); // undefined (non ReferenceError)
var x = 5;
console.log(x); // 5

// let/const: hoisted ma in Temporal Dead Zone — non accessibili prima
// console.log(y); // ReferenceError: Cannot access 'y' before initialization
let y = 5;

// Espressioni di funzione: non hoisted
// console.log(fn()); // TypeError: fn is not a function
const fn = () => "ciao";
```
--- 
#HTML #JavaScript