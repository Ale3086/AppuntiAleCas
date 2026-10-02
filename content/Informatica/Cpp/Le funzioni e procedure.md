---
title: "Le funzioni e procedure"
tags:
  - informatica/cpp/sintassi
  - tipologia/guida-pratica
---

Nei programmi reali scrivere tutto il codice all'interno del `main()` porta rapidamente a programmi disordinati, difficili da comprendere e impossibili da correggere.

La soluzione è la **modularizzazione**: scomporre un problema complesso in sottoproblemi più piccoli e indipendenti, implementati tramite **funzioni** e **procedure**.

I grandi vantaggi sono:
- **Riusabilità (Principio DRY - Don't Repeat Yourself)**: scrivi un blocco di logica una sola volta e lo richiami ovunque serva.
- **Leggibilità**: il `main()` diventa un elenco ordinato e chiaro delle operazioni principali ad alto livello.
- **Facilità di Debugging**: se c'è un errore, puoi testare e correggere isolatamente la singola funzione senza toccare il resto del codice.

---

## 1. Funzioni vs Procedure

In C++ la sintassi di base è la stessa, ma concettualmente distinguiamo due ruoli:

| Concetto | Tipo di Ritorno | Scopo | Istruzione `return` |
| :--- | :--- | :--- | :--- |
| **Funzione** | Un tipo di dato (`int`, `float`, `string`, `bool`...) | Calcola un risultato e lo restituisce al chiamante | Obbligatoria: `return valore;` |
| **Procedura** | **`void`** (nessun valore restituito) | Esegue un'azione (stampa a schermo, modifica variabili, ecc.) | Opzionale (solo `return;` per uscire anticipatamente) |

---

## 2. Anatomia di una Funzione

Una funzione è composta da quattro parti:
1. **Tipo di ritorno**: il tipo del valore che la funzione produce.
2. **Nome identificatore**: il nome con cui viene chiamata (es. `calcolaArea`).
3. **Parametri formali**: le variabili in ingresso tra parentesi tonde.
4. **Corpo**: il blocco di codice tra parentesi graffe `{ }`.

```cpp
// Funzione che calcola e restituisce il quadrato di un numero intero
int quadrato(int n) {
    int risultato = n * n;
    return risultato; // Restituisce il valore calcolato
}

// Procedura che si limita a stampare un saluto formattato
void saluta(string nome) {
    cout << "Ciao, " << nome << "! Benvenuto nel programma." << endl;
}
```

---

## 3. I Prototipi di Funzione (Forward Declaration)

Il compilatore C++ legge il codice dall'alto verso il basso. Se provi a chiamare una funzione nel `main()` prima di averla scritta, il compilatore genererà un errore di *"funzione non dichiarata"*.

Per organizzare il file in modo pulito ed elegante (mettendo il `main()` in alto e le funzioni sotto), si usano i **prototipi** (o dichiarazioni anticipate):

```cpp
#include <iostream>
using namespace std;

// 1. PROTOTIPI (comunicano al compilatore l'esistenza della funzione)
int somma(int a, int b);
void stampaMenu();

// 2. MAIN
int main() {
    stampaMenu();
    int totale = somma(15, 25);
    cout << "Totale: " << totale << endl;
    return 0;
}

// 3. DEFINIZIONE DELLE FUNZIONI
int somma(int a, int b) {
    return a + b;
}

void stampaMenu() {
    cout << "=== MENU GESTIONALE ===" << endl;
}
```

---

## 4. Modalità di Passaggio dei Parametri

Questo è uno dei concetti più importanti di tutta la programmazione in C++.

### A. Passaggio per Valore (Copia)
È la modalità predefinita. La funzione riceve una **copia indipendente** del valore.  
Se modifichi il parametro all'interno della funzione, la variabile originale nel `main()` **non cambia**.

```cpp
void incrementaFalso(int x) {
    x = x + 1; // Modifica solo la copia locale!
}

int main() {
    int numero = 10;
    incrementaFalso(numero);
    cout << numero << endl; // Stampa ancora 10!
}
```

---

### B. Passaggio per Riferimento (`&`)
Aggiungendo il simbolo `&` dopo il tipo del parametro formale, non viene creata alcuna copia: la funzione riceve un **alias diretto** della variabile originale.  
Qualsiasi modifica apportata al parametro **si riflette immediatamente sulla variabile originale**!

L'esempio classico è la funzione per scambiare due variabili (*swap*):

```cpp
#include <iostream>
using namespace std;

void scambia(int &a, int &b) {
    int temp = a;
    a = b;
    b = temp;
}

int main() {
    int x = 5;
    int y = 10;

    cout << "Prima: x = " << x << ", y = " << y << endl;
    scambia(x, y);
    cout << "Dopo:  x = " << x << ", y = " << y << endl; // x = 10, y = 5!

    return 0;
}
```

---

### C. Passaggio per Riferimento Costante (`const &`)
Quando passiamo oggetti di grandi dimensioni (come stringhe lunghe, oggetti o strutture complesse), il passaggio per valore è lento perché obbliga a copiare tutti i byte in RAM.  
Usando `const Tipo &` otteniamo:
1. **Velocità massima**: zero copie in memoria.
2. **Sicurezza totale**: il modificatore `const` impedisce modifiche accidentali all'originale.

```cpp
void analizzaTesto(const string &testo) {
    cout << "Lunghezza testo: " << testo.length() << endl;
    // testo = "modifica"; // ERRORE in compilazione: const protegge il dato!
}
```

---

## 5. Scope e Visibilità delle Variabili

- **Variabili Locali**: dichiarate all'interno di una funzione o di un blocco `{ }`. Esistono solo finché la funzione è in esecuzione e vengono distrutte all'uscita dal blocco.
- **Variabili Globali**: dichiarate all'esterno di tutte le funzioni, visibili da chiunque.  
  > [!WARNING]
  > Le variabili globali sono considerate una **pessima pratica** perché rendono il codice imprevedibile e favoriscono bug difficilissimi da tracciare (*side effects*).

---

## 6. Overloading delle Funzioni (Sovraccarico)

In C++ è possibile definire **più funzioni con lo stesso nome**, a patto che abbiano un numero o un tipo di parametri diverso (*firma diversa*). Il compilatore capirà automaticamente quale chiamare in base agli argomenti passati.

```cpp
// Somma di due interi
int somma(int a, int b) {
    return a + b;
}

// Somma di due numeri decimali
double somma(double a, double b) {
    return a + b;
}

// Somma di tre interi
int somma(int a, int b, int c) {
    return a + b + c;
}
```

---

## 7. La Ricorsione

Una funzione si definisce **ricorsiva** quando chiama se stessa all'interno del proprio corpo.

Per non cadere in un ciclo infinito che esaurisce la memoria dello Stack (*Stack Overflow*), ogni funzione ricorsiva deve avere obbligatoriamente:
1. **Caso Base (Condizione di terminazione)**: un caso banale risolvibile direttamente senza ulteriori chiamate.
2. **Passo Ricorsivo**: la chiamata alla funzione su una porzione ridotta del problema, che si avvicina al caso base.

### Esempio classico: Calcolo del Fattoriale ($n!$)
Matematicamente:
- $0! = 1$ (caso base)
- $n! = n \times (n - 1)!$ (passo ricorsivo)

```cpp
#include <iostream>
using namespace std;

long long fattoriale(int n) {
    // 1. Caso base
    if (n <= 1) {
        return 1;
    }
    // 2. Passo ricorsivo
    return n * fattoriale(n - 1);
}

int main() {
    int num = 5;
    cout << "Il fattoriale di " << num << " e': " << fattoriale(num) << endl; 
    // Calcolo: 5 * 4 * 3 * 2 * 1 = 120
    return 0;
}
```
