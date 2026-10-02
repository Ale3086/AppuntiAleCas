---
title: "Puntatori"
tags:
  - informatica/cpp/sintassi
  - tipologia/guida-pratica
---

I **puntatori** sono una delle funzionalità più potenti ed esclusive del C e del C++. Consentono di interagire direttamente con la memoria RAM del computer, offrendo velocità estrema e controllo totale sulle risorse di sistema.

---

## 1. Cos'è un Indirizzo di Memoria?

Ogni volta che dichiari una variabile:
```cpp
int x = 42;
```
il sistema operativo riserva nella memoria RAM uno spazio di 4 byte per contenere il valore `42`.  
Ogni singola cella di memoria RAM possiede un **indirizzo numerico univoco** (simile al numero civico di una casa o alle coordinate GPS), solitamente espresso in formato esadecimale (ad esempio `0x7ffee4b1`).

- Con `x` accedi al **valore** contenuto nella scatola (`42`).
- Con l'operatore **`&x`** (operatore *indirizzo*) ottieni l'**indirizzo di memoria** in cui si trova la scatola.

---

## 2. Cos'è un Puntatore?

Un **puntatore** è una variabile speciale che **non memorizza un valore comune, ma memorizza l'indirizzo di memoria di un'altra variabile**.

In sintesi:
- Una variabile normale contiene un dato (`int`, `float`, `char`).
- Un puntatore "punta" alla scatola di qualcun altro.

```
Variabile 'a':     [ Valore: 10 ]      Indirizzo: 0x100
                         ▲
                         │ (punta a)
Puntatore 'ptr':   [ Valore: 0x100 ]   Indirizzo: 0x200
```

---

## 3. I Due Operatori Fondamentali: `&` e `*`

| Operatore | Nome | Cosa fa | Esempio |
| :--- | :--- | :--- | :--- |
| **`&`** | Operatore Indirizzo (*address-of*) | Restituisce l'indirizzo di memoria di una variabile | `ptr = &numero;` |
| **`*`** | Operatore Dereferenziazione (*indirection*) | Accede al valore contenuto all'indirizzo puntato | `cout << *ptr;` |

### Dichiarazione e Inizializzazione
```cpp
#include <iostream>
using namespace std;

int main() {
    int numero = 25;

    // Dichiarazione di un puntatore a intero
    int *ptr = &numero; // 'ptr' memorizza l'indirizzo di 'numero'

    cout << "Valore di numero:            " << numero << endl; // 25
    cout << "Indirizzo di numero (&numero): " << &numero << endl; // es. 0x61ff08
    cout << "Valore contenuto in ptr:     " << ptr << endl;    // identico a &numero
    cout << "Valore puntato (*ptr):       " << *ptr << endl;   // 25 (dereferenziazione)

    // MODIFICA TRAMITE PUNTATORE:
    *ptr = 100; // Modifichiamo il dato all'indirizzo memorizzato
    cout << "Nuovo valore di numero:      " << numero << endl; // 100!

    return 0;
}
```

> [!IMPORTANT]
> **Inizializzazione sicura con `nullptr`**:  
> Non lasciare mai un puntatore non inizializzato (`int *p;`), altrimenti punterà a un'area casuale e pericolosa della memoria. Se non hai ancora un indirizzo da assegnargli, inizializzalo a `nullptr`:
> ```cpp
> int *p = nullptr; // Punta a "nulla" in modo controllato e sicuro
> ```

---

## 4. Puntatori e Array: Il Legame Segreto

In C++, il nome di un array **è già a tutti gli effetti un puntatore costante al suo primo elemento**:

```cpp
int arr[3] = {10, 20, 30};

// Queste due scritture sono assolutamente identiche:
cout << arr << endl;       // Indirizzo del primo elemento
cout << &arr[0] << endl;   // Indirizzo del primo elemento
```

### Aritmetica dei Puntatori
Quando incrementi un puntatore (`ptr + 1`), il compilatore non aggiunge 1 byte, ma si sposta in avanti di **tanti byte quanti ne occupa il tipo di dato puntato** (`sizeof(tipo)`):

```cpp
int arr[3] = {10, 20, 30};
int *p = arr; // Punta ad arr[0]

cout << *p << endl;       // 10 (arr[0])
cout << *(p + 1) << endl; // 20 (arr[1])
cout << *(p + 2) << endl; // 30 (arr[2])
```
Da qui nasce la sintassi `arr[i]`, che per il compilatore è semplicemente una scorciatoia per `*(arr + i)`.

---

## 5. Memoria Dinamica: Stack vs Heap

Fino ad ora tutte le variabili create venivano allocate nello **Stack**:
- Memoria gestita automaticamente dal compilatore.
- Dimensione fissa decisa prima dell'avvio del programma.
- Viene ripulita non appena la funzione o il blocco termina.

Se però vogliamo creare variabili o array la cui dimensione viene decisa dall'utente durante l'esecuzione del programma, dobbiamo ricorrere allo **Heap (Free Store)** mediante l'allocazione dinamica.

### Gli Operatori `new` e `delete`
- **`new`**: alloca spazio nello Heap e restituisce l'indirizzo di memoria della cella creata.
- **`delete`**: libera la memoria allocata quando non serve più (obbligatorio, altrimenti la RAM rimane occupata!).

#### Singola Variabile Dinamica
```cpp
int *p = new int; // Alloca un intero nello Heap
*p = 50;
cout << *p << endl;

delete p;         // Libera la memoria
p = nullptr;      // Buona pratica: evita puntatori pendenti
```

#### Array Dinamico (Dimensione scelta a runtime)
```cpp
#include <iostream>
using namespace std;

int main() {
    int dimensione;
    cout << "Quanti elementi vuoi inserire? ";
    cin >> dimensione;

    // Allocazione dinamica di un array di dimensione specificata dall'utente
    int *vettore = new int[dimensione];

    for (int i = 0; i < dimensione; i++) {
        vettore[i] = (i + 1) * 10;
    }

    cout << "Elementi inseriti: ";
    for (int i = 0; i < dimensione; i++) {
        cout << vettore[i] << " ";
    }
    cout << endl;

    // DEALLOCAZIONE OBBLIGATORIA (notare le parentesi quadre delete[])
    delete[] vettore;
    vettore = nullptr;

    return 0;
}
```

---

## 6. Errori Gravi e Trabocchetti Comuni

> [!WARNING]
> 1. **Memory Leak (Perdita di memoria)**: si verifica quando allochi memoria con `new` e ti dimentichi di fare `delete`. La memoria rimane bloccata fino alla chiusura del programma; se ripetuto in un ciclo, esaurisce tutta la RAM del PC.
> 2. **Dangling Pointer (Puntatore pendente)**: un puntatore che continua a puntare a un'area di memoria già liberata con `delete`. Usarlo provoca crash istantanei.
> 3. **Dereferenziazione di `nullptr`**: tentare di fare `*p` quando `p == nullptr` causa un crash immediato (*Segmentation Fault*). Prima di usare un puntatore dubbio, controlla sempre `if (p != nullptr)`.
