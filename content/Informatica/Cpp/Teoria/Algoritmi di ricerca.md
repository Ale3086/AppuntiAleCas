---
title: "Algoritmi di ricerca"
tags:
  - informatica/cpp/algoritmi
  - tipologia/algoritmo
---

Cercare un elemento all'interno di un insieme di dati è una delle operazioni più frequenti in informatica.

In C++ gli algoritmi di ricerca fondamentali su array sono due:
1. **Ricerca Lineare (o Sequenziale)**: semplice, applicabile a qualsiasi array.
2. **Ricerca Binaria (o Dicotomica)**: straordinariamente veloce, ma richiede che l'array sia **già ordinato**.

---

## 1. Ricerca Lineare (Sequenziale)

### Principio di Funzionamento
Scorre l'array elemento per elemento, partendo dall'indice `0` fino all'ultimo indice `N - 1`, confrontando ogni valore con la chiave cercata:
- Se trova l'elemento, interrompe la ricerca e restituisce l'indice in cui si trova.
- Se arriva alla fine dell'array senza aver trovato nulla, restituisce `-1` (convenzione per indicare "non trovato").

### Vantaggi e Svantaggi
- ✅ **Vantaggio**: Funziona su **qualsiasi** array, sia esso ordinato o totalmente disordinato.
- ❌ **Svantaggio**: Lenta su grandi quantità di dati.

### Codice C++
```cpp
int ricercaLineare(const int arr[], int dimensione, int chiave) {
    for (int i = 0; i < dimensione; i++) {
        if (arr[i] == chiave) {
            return i; // Elemento trovato all'indice i
        }
    }
    return -1; // Elemento non presente
}
```

### Complessità Computazionale
- **Caso Migliore**: $O(1)$ — L'elemento cercato è il primo dell'array.
- **Caso Peggiore**: $O(n)$ — L'elemento si trova all'ultima posizione o non esiste (dobbiamo esaminare tutti gli $n$ elementi).
- **Caso Medio**: $O(n)$.

---

## 2. Ricerca Binaria (Dicotomica)

> [!IMPORTANT]
> **Prerequisito Assoluto**: La ricerca binaria funziona **esclusivamente su array ordinati** (in ordine crescente o decrescente). Se l'array è disordinato, l'algoritmo fallirà!

### Principio di Funzionamento (*Divide et Impera*)
Invece di controllare un elemento alla volta, la ricerca binaria dimezza lo spazio di ricerca a ogni singolo passaggio:

1. Individua l'elemento centrale dell'intervallo corrente: `medio = inizio + (fine - inizio) / 2`.
2. Confronta l'elemento centrale con la chiave cercata:
   - Se `arr[medio] == chiave`: abbiamo trovato l'elemento!
   - Se la chiave è **minore** di `arr[medio]`: sappiamo con certezza che l'elemento (se esiste) può trovarsi solo nella **metà sinistra** dell'array. Spostiamo il limite destro: `fine = medio - 1`.
   - Se la chiave è **maggiore** di `arr[medio]`: cerchiamo nella **metà destra**. Spostiamo il limite sinistro: `inizio = medio + 1`.
3. Ripetiamo finché l'elemento non viene trovato oppure finché `inizio > fine` (intervallo esaurito, dato non presente).

### Codice C++ (Versione Iterativa)
```cpp
int ricercaBinaria(const int arr[], int dimensione, int chiave) {
    int inizio = 0;
    int fine = dimensione - 1;

    while (inizio <= fine) {
        int medio = inizio + (fine - inizio) / 2;

        if (arr[medio] == chiave) {
            return medio; // Trovato all'indice 'medio'
        }

        if (arr[medio] < chiave) {
            inizio = medio + 1; // Cerca nella metà destra
        } else {
            fine = medio - 1;   // Cerca nella metà sinistra
        }
    }

    return -1; // Non trovato
}
```

### Complessità Computazionale
A ogni passo lo spazio di ricerca viene dimezzato ($N \rightarrow N/2 \rightarrow N/4 \rightarrow \dots \rightarrow 1$).  
La complessità temporale nel caso pessimo e medio è logaritmica: **$O(\log_2 n)$**.

| Dimensione Array ($n$) | Passi Massimi Ricerca Lineare | Passi Massimi Ricerca Binaria |
| :--- | :--- | :--- |
| **100** elementi | 100 | $\approx 7$ |
| **10.000** elementi | 10.000 | $\approx 14$ |
| **1.000.000** (1 milione) | 1.000.000 | **solo 20 passi!** |
| **1.000.000.000** (1 miliardo) | 1 miliardo | **solo 30 passi!** |

---

## 3. Tabella di Confronto

| Proprietà | Ricerca Lineare | Ricerca Binaria |
| :--- | :--- | :--- |
| **Pre-condizione** | Nessuna (qualsiasi array) | **Array obbligatoriamente ordinato** |
| **Strategia** | Controllo elemento per elemento | Dimezzamento continuo (*Divide et Impera*) |
| **Complessità Temporale (Peggiore)** | $O(n)$ | $O(\log n)$ |
| **Complessità Spaziale** | $O(1)$ | $O(1)$ (iterativa) |
| **Quando usarla** | Array piccoli o non ordinati | Array grandi già ordinati o con molte ricerche ripetute |

---

## 4. Programma di Test Completo in C++

```cpp
#include <iostream>
using namespace std;

int ricercaLineare(const int arr[], int dim, int chiave);
int ricercaBinaria(const int arr[], int dim, int chiave);

int main() {
    // Array GIÀ ORDINATO per permettere la ricerca binaria
    const int N = 8;
    int dati[N] = {3, 7, 12, 19, 25, 33, 48, 56};

    int bersaglio = 25;

    cout << "Array: ";
    for (int i = 0; i < N; i++) cout << dati[i] << " ";
    cout << endl;

    // Test Ricerca Lineare
    int idxLin = ricercaLineare(dati, N, bersaglio);
    cout << "[Lineare] Valore " << bersaglio << " trovato all'indice: " << idxLin << endl;

    // Test Ricerca Binaria
    int idxBin = ricercaBinaria(dati, N, bersaglio);
    cout << "[Binaria] Valore " << bersaglio << " trovato all'indice: " << idxBin << endl;

    // Test con valore assente
    int assente = 99;
    cout << "[Binaria] Valore " << assente << " trovato all'indice: " << ricercaBinaria(dati, N, assente) << endl;

    return 0;
}

int ricercaLineare(const int arr[], int dim, int chiave) {
    for (int i = 0; i < dim; i++) {
        if (arr[i] == chiave) return i;
    }
    return -1;
}

int ricercaBinaria(const int arr[], int dim, int chiave) {
    int inizio = 0;
    int fine = dim - 1;
    while (inizio <= fine) {
        int medio = inizio + (fine - inizio) / 2;
        if (arr[medio] == chiave) return medio;
        if (arr[medio] < chiave) inizio = medio + 1;
        else fine = medio - 1;
    }
    return -1;
}
```
