## Indice

- [[#try catch finally]]
- [[#Tipi di errore]]
- [[#Errori custom]]

## try catch finally

Gestione degli errori a runtime.

```js
try {
  // codice che potrebbe lanciare un errore
  const dati = JSON.parse(testo);
  if (!dati) throw new Error("Dati non validi");
} catch (err) {
  // err è l'oggetto errore
  console.error(err.name);     // "SyntaxError"
  console.error(err.message);  // messaggio
  console.error(err.stack);    // stack trace
} finally {
  // eseguito sempre, con o senza errore
  console.log("Fine elaborazione");
}

// Catch opzionale (binding opzionale ES2019)
try {
  rischiosa();
} catch {
  console.log("qualcosa è andato storto");
}

// Re-throw — rilancia solo errori inattesi
try {
  esegui();
} catch (err) {
  if (err instanceof ValidationError) {
    mostraMessaggio(err.message);
  } else {
    throw err; // rilancia altri errori
  }
}
```

---

## Tipi di errore

```js
// Errori nativi
new Error("messaggio generico")
new TypeError("tipo non corretto")         // tipo sbagliato
new RangeError("fuori dal range")          // valore fuori range
new ReferenceError("variabile non definita") // variabile inesistente
new SyntaxError("JSON malformato")         // sintassi non valida
new URIError("URI malformato")             // decodeURIComponent di stringa invalida
new EvalError("errore di eval")            // errore in eval() (raro)
new AggregateError([e1, e2], "più errori") // Promise.any

// Proprietà degli errori
const err = new TypeError("valore atteso number");
err.name;     // "TypeError"
err.message;  // "valore atteso number"
err.stack;    // stack trace come stringa
err.cause;    // errore originale (se passato in options)

// Error cause (ES2022)
try {
  connetti();
} catch (cause) {
  throw new Error("Connessione fallita", { cause });
}
```

---

## Errori custom

```js
class AppError extends Error {
  constructor(message, code, details = {}) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.details = details;
    // Mantiene lo stack corretto in V8
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
  }
}

class ValidationError extends AppError {
  constructor(campo, messaggio) {
    super(messaggio, "VALIDATION_ERROR", { campo });
    this.name = "ValidationError";
    this.campo = campo;
  }
}

class NotFoundError extends AppError {
  constructor(risorsa, id) {
    super(`${risorsa} con id ${id} non trovato`, "NOT_FOUND");
    this.name = "NotFoundError";
  }
}

// Uso
try {
  throw new ValidationError("email", "Formato email non valido");
} catch (err) {
  if (err instanceof ValidationError) {
    console.log(err.campo, err.message);
  }
}
```

---
#HTML #JavaScript