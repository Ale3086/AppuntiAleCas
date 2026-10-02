---
title: "Strutture di controllo e cicli"
tags:
  - informatica/cpp/sintassi
  - tipologia/guida-pratica
---

Nei programmi base le istruzioni vengono eseguite in modo **sequenziale**, una riga dopo l'altra dall'alto verso il basso.  
Tuttavia, nella quasi totalità dei programmi reali dobbiamo poter prendere decisioni (saltando blocchi di istruzioni) o ripetere determinate operazioni più volte finché una condizione è soddisfatta.

Queste capacità sono offerte dalle **strutture di controllo**, suddivise in:
1. **Strutture di selezione (o condizionali)**: `if`, `else`, `switch`.
2. **Strutture di iterazione (o cicli)**: `while`, `do-while`, `for`.

---

## 1. Strutture di Selezione

### Il costrutto `if` - `else if` - `else`
Permette di eseguire un blocco di codice solo se una determinata espressione booleana risulta `true`.

```cpp
#include <iostream>
using namespace std;

int main() {
    int voto;
    cout << "Inserisci il tuo voto (1-10): ";
    cin >> voto;

    if (voto >= 8) {
        cout << "Ottimo lavoro!" << endl;
    } else if (voto >= 6) {
        cout << "Hai raggiunto la sufficienza." << endl;
    } else {
        cout << "Devi recuperare la materia." << endl;
    }

    return 0;
}
```

> [!NOTE]
> Se dentro un blocco `if` o `else` c'è una sola istruzione, le parentesi graffe `{}` sono facoltative, ma è buona norma scriverle sempre per evitare errori logici durante successive modifiche.

### Operatore Ternario (`? :`)
È una forma contratta di un semplice `if-else` che restituisce direttamente un valore in una sola riga:

```cpp
int eta = 20;
string stato = (eta >= 18) ? "Maggiorenne" : "Minorenne";
cout << stato << endl;
```

---

### La selezione multipla con `switch`
Quando dobbiamo confrontare **una singola variabile intera o carattere** contro più valori costanti possibili, l'istruzione `switch` è più pulita e leggibile rispetto a una lunga catena di `else if`.

```cpp
#include <iostream>
using namespace std;

int main() {
    int scelta;
    cout << "--- MENU GIOCO ---" << endl;
    cout << "1. Nuova Partita" << endl;
    cout << "2. Carica Partita" << endl;
    cout << "3. Impostazioni" << endl;
    cout << "4. Esci" << endl;
    cout << "Scegli un'opzione: ";
    cin >> scelta;

    switch (scelta) {
        case 1:
            cout << "Avvio nuova partita..." << endl;
            break; // FONDAMENTALE: esce dallo switch!
        case 2:
            cout << "Caricamento salvataggio..." << endl;
            break;
        case 3:
            cout << "Apertura impostazioni..." << endl;
            break;
        case 4:
            cout << "Arrivederci!" << endl;
            break;
        default:
            cout << "Opzione non valida, riprova!" << endl;
            break;
    }

    return 0;
}
```

> [!WARNING]
> **Attenzione al `break`**: se ometti l'istruzione `break`, il programma continuerà a eseguire il codice dei `case` successivi (fenomeno del *fall-through*), anche se il valore non coincide!

---

## 2. Strutture di Iterazione (I Cicli)

I cicli servono a ripetere un blocco di istruzioni. In C++ ne esistono tre tipi principali.

### 1. Il ciclo `while` (Pre-condizionale)
Verifica la condizione **prima** di ogni esecuzione. Se la condizione è falsa fin dall'inizio, il corpo del ciclo non verrà eseguito **nemmeno una volta**.

```cpp
int contatore = 1;

while (contatore <= 5) {
    cout << "Giro numero: " << contatore << endl;
    contatore++; // Incrementa il contatore (evita il ciclo infinito!)
}
```

---

### 2. Il ciclo `do-while` (Post-condizionale)
Verifica la condizione **dopo** aver eseguito il blocco. Questo garantisce che il corpo del ciclo venga eseguito **almeno una volta**, indipendentemente dalla condizione.

È il costrutto ideale per la **validazione dell'input utente**:

```cpp
#include <iostream>
using namespace std;

int main() {
    int numero;

    // Chiede il numero finché l'utente non ne inserisce uno compreso tra 1 e 10
    do {
        cout << "Inserisci un numero positivo tra 1 e 10: ";
        cin >> numero;

        if (numero < 1 || numero > 10) {
            cout << "Valore errato! Riprova." << endl;
        }
    } while (numero < 1 || numero > 10);

    cout << "Ottimo! Hai scelto: " << numero << endl;
    return 0;
}
```

---

### 3. Il ciclo `for` (A conteggio)
È il ciclo più compatto e diffuso quando si conosce già a priori quante volte ripetere l'operazione (ad esempio per scorrere un array).

Sintassi:
`for (inizializzazione; condizione; incremento/decremento)`

```cpp
// Stampa i numeri pari da 0 a 10
for (int i = 0; i <= 10; i += 2) {
    cout << i << " ";
}
cout << endl;
```

---

## 3. Istruzioni di Controllo del Flusso: `break` e `continue`

All'interno di qualsiasi ciclo possiamo forzare il flusso con due parole chiave:

1. **`break`**: interrompe immediatamente il ciclo e fa uscire il programma dal blocco iterativo.
2. **`continue`**: salta il resto del giro corrente e passa immediatamente alla prossima iterazione del ciclo.

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Esempio continue (salta il 3):" << endl;
    for (int i = 1; i <= 5; i++) {
        if (i == 3) {
            continue; // Salta il resto del corpo per i == 3
        }
        cout << i << " ";
    }
    // Output: 1 2 4 5

    cout << "\n\nEsempio break (si ferma al 3):" << endl;
    for (int i = 1; i <= 5; i++) {
        if (i == 3) {
            break; // Esce del tutto dal for
        }
        cout << i << " ";
    }
    // Output: 1 2
    cout << endl;

    return 0;
}
```

---

## Tabella di Riepilogo Cicli

| Ciclo | Quando usarlo | Iterazioni minime | Esempio classico |
| :--- | :--- | :--- | :--- |
| **`for`** | Numero di ripetizioni noto a priori | 0 | Scorrere array, contatori numerici |
| **`while`** | Ripetizione basata su una condizione esterna | 0 | Lettura da file, ciclo di gioco |
| **`do-while`** | L'operazione deve avvenire almeno una volta | 1 | Validazione dati da tastiera, menu ripetuto |
