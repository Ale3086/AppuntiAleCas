---
title: "Le variabili"
tags:
  - informatica/cpp/sintassi
  - tipologia/concetto
---

Una **variabile** è una porzione di memoria RAM destinata a contenere un dato che può variare durante l'esecuzione del programma. Possiamo immaginarla come una **scatola etichettata** con un nome e un tipo ben definito, in cui memorizziamo un valore.

A differenza dei file (che risiedono sulla memoria di massa e sono persistenti), le variabili sono **volatili**: quando il programma termina o il computer si spegne, tutti i dati contenuti nelle variabili vengono cancellati dalla RAM.

Le tre operazioni fondamentali per lavorare con una variabile sono:
1. **Dichiarazione**: riserviamo la "scatola" indicando al compilatore il suo tipo e il suo identificatore (nome).
2. **Inizializzazione / Assegnazione**: inseriamo un valore iniziale nella scatola (usando l'operatore `=`).
3. **Utilizzo**: leggiamo, stampiamo o modifichiamo il valore contenuto durante l'esecuzione.

```cpp
int eta;          // Dichiarazione
eta = 18;         // Assegnazione

int livello = 1;  // Dichiarazione con inizializzazione contestuale
```

---

## I Tipi di Variabile Principali (Primitivi)

In C++ ogni variabile deve avere un tipo dichiarato a priori (**tipizzazione statica**). Il tipo determina quanti byte di RAM allocare e come interpretare i bit memorizzati.

| Tipo | Significato | Dimensione tipica | Intervallo / Valori possibili | Esempio |
| :--- | :--- | :--- | :--- | :--- |
| `int` | Numero intero con segno | 4 byte (32 bit) | Da $-2 \times 10^9$ a $+2 \times 10^9$ | `int punteggio = 1500;` |
| `float` | Decimale a singola precisione | 4 byte (32 bit) | $\approx 7$ cifre decimali di precisione | `float media = 7.5f;` |
| `double` | Decimale a doppia precisione | 8 byte (64 bit) | $\approx 15$ cifre decimali di precisione | `double pi = 3.1415926535;` |
| `char` | Singolo carattere ASCII | 1 byte (8 bit) | Singolo carattere tra apici singoli | `char iniziale = 'A';` |
| `bool` | Valore logico booleano | 1 byte | `true` (1) oppure `false` (0) | `bool attivo = true;` |
| `string` | Testo / sequenza di caratteri | Variabile | Stringa di testo tra doppi apici | `string nome = "Mario";` |

> [!NOTE]
> Per usare `string` è necessario includere l'header `<string>` (`#include <string>`). In C++ le stringhe sono oggetti veri e propri, molto più semplici e sicuri dei vecchi array di caratteri `char[]` del C.

### Modificatori di tipo e Costanti
Possiamo alterare il comportamento dei tipi base usando alcuni modificatori:
- `unsigned`: rimuove il segno negativo raddoppiando il limite positivo (es. `unsigned int` va da 0 a $\approx 4 \times 10^9$).
- `long long`: estende gli interi a 8 byte (64 bit) per numeri enormi fino a $\pm 9 \times 10^{18}$.
- `const`: trasforma la variabile in una **costante** di sola lettura. Il suo valore non potrà mai più essere modificato dopo l'inizializzazione.

```cpp
const float PI_GRECO = 3.14159f;
// PI_GRECO = 3.0f; // ERRORE in compilazione: non puoi modificare una costante!
```

---

## Input e Output (`cout`, `cin`, `getline()`)

In C++ l'interazione con l'utente avviene tramite i flussi di dati (stream) della libreria `<iostream>`.

Per semplicità didattica si usa spesso `using namespace std;`, che permette di scrivere direttamente `cout` invece di `std::cout`.

### Output con `cout`
Si usa l'operatore di inserimento nello stream `<<`. È possibile concatenare più variabili e stringhe:

```cpp
int livello = 5;
string nome = "Guerriero";

cout << "Giocatore: " << nome << " - Livello: " << livello << endl;
// endl inserisce un a-capo e svuota il buffer di output
```

### Input con `cin`
Si usa l'operatore di estrazione dallo stream `>>`. Il dato digitato dall'utente sulla tastiera viene inserito nella variabile indicata:

```cpp
int scelta;
cout << "Inserisci un numero: ";
cin >> scelta; 
```

> [!WARNING]
> **Limite di `cin >>`**: l'operatore `>>` legge fino al primo spazio bianco o a-capo. Se l'utente inserisce una frase con spazi (es. `"Mario Rossi"`), `cin` leggerà soltanto `"Mario"`, lasciando `"Rossi"` nel canale di input!

### Input di frasi con `getline()`
Per leggere un'intera riga di testo comprensiva di spazi, si utilizza la funzione `getline()`:

```cpp
string nomeCompleto;
cout << "Inserisci nome e cognome: ";
getline(cin, nomeCompleto);
cout << "Benvenuto, " << nomeCompleto << "!" << endl;
```

#### Il problema del buffer tra `cin >>` e `getline()`
Se prima usi un `cin >> numero` e subito dopo un `getline(cin, testo)`, noterai che `getline()` viene "saltata" all'istante!  
Questo accade perché `cin >>` legge il numero ma lascia il tasto `Invio` (`\n`) memorizzato nel buffer di input. Quando `getline()` parte, trova subito quell'`Invio` e pensa che l'utente abbia inserito una riga vuota.

**Soluzione: `cin.ignore()`**
```cpp
int eta;
string indirizzo;

cout << "Quanti anni hai? ";
cin >> eta;

cin.ignore(); // Svuota il carattere Invio rimasto in sospeso nel buffer!

cout << "Dove abiti? ";
getline(cin, indirizzo); // Ora funziona regolarmente!
```

---

## Operatori Fondamentali

### 1. Operatori Aritmetici
- Addizione: `+`
- Sottrazione: `-`
- Moltiplicazione: `*`
- Divisione: `/` (se entrambi gli operandi sono interi, tronca la parte decimale!)
- Modulo (resto della divisione intera): `%` (es. `7 % 3` dà `1`)

### 2. Operatori di Confronto (restituiscono un `bool`)
- Uguale a: `==` (attenzione: due uguali, non confondere con l'assegnazione `=`)
- Diverso da: `!=`
- Minore e Minore o uguale: `<` e `<=`
- Maggiore e Maggiore o uguale: `>` e `>=`

### 3. Operatori Logici (uniscono più condizioni)
- **AND (`&&`)**: vero solo se entrambe le condizioni sono vere.
- **OR (`||`)**: vero se almeno una delle condizioni è vera.
- **NOT (`!`)**: inverte il valore di verità (`!true` diventa `false`).

---

## Typecasting (Conversione di Tipo)

Il typecasting serve a convertire temporaneamente una variabile da un tipo di dato all'altro.

L'esempio più comune è la divisione reale tra due numeri interi. In C++, se scrivi $5 / 2$, il risultato sarà $2$ e non $2.5$, poiché la divisione tra due interi genera sempre un intero troncato.

### Come si fa: `static_cast`
In C++ moderno si usa `static_cast<nuovo_tipo>(valore)`:

```cpp
int a = 5;
int b = 2;

// Senza casting:
float divErrata = a / b;               // Risultato: 2.0 (troncamento avvenuto prima!)

// Con static_cast:
float divCorretta = static_cast<float>(a) / b; // Risultato: 2.5
```

> [!TIP]
> Esiste anche la sintassi classica del C `(float)a`, ma in C++ è fortemente consigliato usare `static_cast<float>(a)` perché è più sicuro, controllato dal compilatore ed evidente nel codice.