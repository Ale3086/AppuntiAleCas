## Indice

- [[#Classi]]
- [[#Ereditarietà]]
- [[#Getter e Setter]]
- [[#Metodi statici]]
- [[#Symbol]]
- [[#Iteratori e generatori]]
- [[#Proxy e Reflect]]

## Classi

Sintassi ES6 per la programmazione orientata agli oggetti. Basata internamente su prototipi.

```js
class Animale {
  // Campi pubblici
  verso = "...";
  #vita = 100;          // campo privato (ES2022)

  constructor(nome, specie) {
    this.nome = nome;
    this.specie = specie;
  }

  // Metodo d'istanza
  descrivi() {
    return `${this.nome} è un ${this.specie}`;
  }

  // Campo privato — accessibile solo dentro la classe
  getVita() { return this.#vita; }
  danneggia(danni) { this.#vita -= danni; }

  // Metodo statico
  static crea(nome) {
    return new Animale(nome, "generico");
  }

  // Getter / Setter
  get stato() {
    return this.#vita > 0 ? "vivo" : "morto";
  }
  set vita(v) {
    if (v < 0) throw new Error("La vita non può essere negativa");
    this.#vita = v;
  }
}

const gatto = new Animale("Micio", "felino");
gatto.descrivi();      // "Micio è un felino"
gatto.stato;           // "vivo"
gatto.vita = 80;       // usa il setter
gatto.getVita();       // 80

// Verifica
gatto instanceof Animale  // true
gatto.constructor === Animale // true
```

---

## Ereditarietà

`extends` crea una sottoclasse. `super` chiama il costruttore o i metodi della classe padre.

```js
class Cane extends Animale {
  #razza;

  constructor(nome, razza) {
    super(nome, "cane");   // chiama il costruttore di Animale
    this.#razza = razza;
    this.verso = "Bau!";
  }

  abbaia() {
    return `${this.nome}: ${this.verso}`;
  }

  // Override
  descrivi() {
    return `${super.descrivi()} di razza ${this.#razza}`;
  }
}

const rex = new Cane("Rex", "Labrador");
rex.descrivi();   // "Rex è un cane di razza Labrador"
rex.abbaia();     // "Rex: Bau!"
rex instanceof Cane    // true
rex instanceof Animale // true

// Mixin — ereditarietà multipla simulata
const Nuotatore = (Base) => class extends Base {
  nuota() { return `${this.nome} nuota`; }
};
const Volatore = (Base) => class extends Base {
  vola() { return `${this.nome} vola`; }
};

class Anatra extends Nuotatore(Volatore(Animale)) {}
const paperino = new Anatra("Paperino", "anatra");
paperino.nuota(); // "Paperino nuota"
paperino.vola();  // "Paperino vola"
```

---

## Getter e Setter

Permettono di intercettare la lettura e la scrittura di una proprietà.

```js
class Temperatura {
  #celsius;

  constructor(celsius) {
    this.#celsius = celsius;
  }

  get celsius()    { return this.#celsius; }
  set celsius(v)   {
    if (v < -273.15) throw new RangeError("Sotto lo zero assoluto");
    this.#celsius = v;
  }

  get fahrenheit() { return this.#celsius * 9/5 + 32; }
  set fahrenheit(v){ this.#celsius = (v - 32) * 5/9; }

  get kelvin()     { return this.#celsius + 273.15; }
}

const t = new Temperatura(100);
t.fahrenheit;       // 212
t.fahrenheit = 32;
t.celsius;          // 0

// Object.defineProperty
const obj = {};
Object.defineProperty(obj, "sola_lettura", {
  get() { return 42; },
  enumerable: true,
  configurable: false,
});
obj.sola_lettura; // 42
```

---

## Metodi statici

Appartengono alla classe, non alle istanze. Utili per factory, utility e costanti.

```js
class MathUtils {
  static PI = 3.14159;

  static somma(a, b)  { return a + b; }
  static clamp(v, min, max) { return Math.min(Math.max(v, min), max); }

  static #privata()   { return "solo dentro la classe"; }
}

MathUtils.somma(1, 2);   // 3
MathUtils.PI;             // 3.14159

// Ereditarietà dei metodi statici
class EstesaMath extends MathUtils {}
EstesaMath.somma(1, 2);  // 3
EstesaMath.PI;            // 3.14159
```

---

## Symbol

Tipo primitivo che produce un valore unico e immutabile. Usato come chiave di proprietà per evitare collisioni.

```js
const id = Symbol("id");
const id2 = Symbol("id");
id === id2   // false — ogni Symbol è unico

// Come chiave di proprietà
const utente = {
  nome: "Alice",
  [id]: 42,
};
utente[id];  // 42
Object.keys(utente);    // ["nome"] — Symbol non enumerato
Object.getOwnPropertySymbols(utente); // [Symbol(id)]

// Symbol globale (registro condiviso)
const s1 = Symbol.for("app.id");
const s2 = Symbol.for("app.id");
s1 === s2  // true
Symbol.keyFor(s1);  // "app.id"

// Symbol well-known (personalizzare comportamenti)
class Lista {
  constructor(...items) { this.items = items; }

  [Symbol.iterator]() {         // rende l'oggetto iterabile
    let i = 0;
    return { next: () => ({ value: this.items[i], done: i++ >= this.items.length }) };
  }

  get [Symbol.toStringTag]() {  // personalizza Object.prototype.toString
    return "Lista";
  }
}

for (const item of new Lista(1, 2, 3)) { console.log(item); }
Object.prototype.toString.call(new Lista()); // "[object Lista]"
```

---

## Iteratori e generatori

Un iteratore è un oggetto con `next()`. Un generatore è una funzione che produce iteratori usando `yield`.

```js
// Iteratore manuale
function creaRange(start, end) {
  let current = start;
  return {
    next() {
      if (current <= end)
        return { value: current++, done: false };
      return { value: undefined, done: true };
    },
    [Symbol.iterator]() { return this; }
  };
}
for (const n of creaRange(1, 3)) { console.log(n); } // 1 2 3

// Generatore
function* genera() {
  yield 1;
  yield 2;
  yield 3;
}
const gen = genera();
gen.next(); // { value: 1, done: false }
gen.next(); // { value: 2, done: false }
gen.next(); // { value: 3, done: false }
gen.next(); // { value: undefined, done: true }

// Range con generatore
function* range(start, end, step = 1) {
  for (let i = start; i <= end; i += step) yield i;
}
[...range(1, 10, 2)]; // [1, 3, 5, 7, 9]

// Generatore infinito
function* naturali() {
  let n = 0;
  while (true) yield n++;
}
const gen2 = naturali();
gen2.next().value; // 0
gen2.next().value; // 1

// yield*: delega a un altro iterabile
function* concatena(...arrays) {
  for (const arr of arrays) yield* arr;
}
[...concatena([1,2],[3,4])]; // [1, 2, 3, 4]

// Generatore asincrono
async function* fetchPagine(url) {
  let pagina = 1;
  while (true) {
    const res = await fetch(`${url}?page=${pagina++}`);
    if (!res.ok) break;
    yield await res.json();
  }
}
for await (const pagina of fetchPagine("/api/items")) {
  console.log(pagina);
}
```

---

## Proxy e Reflect

`Proxy` intercetta operazioni su un oggetto. `Reflect` fornisce i metodi di default per le stesse operazioni.

```js
const handler = {
  get(target, prop, receiver) {
    console.log(`Letto: ${prop}`);
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    if (typeof value !== "number") throw new TypeError("Solo numeri");
    console.log(`Scritto: ${prop} = ${value}`);
    return Reflect.set(target, prop, value, receiver);
  },
  has(target, prop) {
    console.log(`Verificato: ${prop} in obj`);
    return Reflect.has(target, prop);
  },
  deleteProperty(target, prop) {
    console.log(`Cancellato: ${prop}`);
    return Reflect.deleteProperty(target, prop);
  },
  apply(target, thisArg, args) {
    console.log(`Chiamato con: ${args}`);
    return Reflect.apply(target, thisArg, args);
  },
};

const obj = new Proxy({ x: 1 }, handler);
obj.x;         // "Letto: x" → 1
obj.y = 42;    // "Scritto: y = 42"
"x" in obj;    // "Verificato: x in obj"

// Validazione automatica
function creaValidato(schema) {
  return new Proxy({}, {
    set(target, prop, value) {
      if (schema[prop] && typeof value !== schema[prop])
        throw new TypeError(`${prop} deve essere ${schema[prop]}`);
      target[prop] = value;
      return true;
    }
  });
}
const p = creaValidato({ nome: "string", eta: "number" });
p.nome = "Alice"; // OK
p.eta = "trenta"; // TypeError
```

---
#HTML #JavaScript