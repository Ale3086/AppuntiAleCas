---
title: "Gli array"
tags:
  - informatica/cpp/sintassi
  - tipologia/guida-pratica
---

Un **array** (o **vettore**) è una struttura dati omogenea che contiene una sequenza di elementi dello **stesso tipo** memorizzati in posizioni di memoria RAM **contigue** (una subito dopo l'altra).

Immagina un array come una cassettiera con un unico nome: ogni cassetto contiene un dato ed è identificato da un numero d'ordine chiamato **indice**.

---

## 1. Caratteristiche Fondamentali

1. **Omogeneità**: tutti gli elementi devono essere dello stesso tipo (tutti `int`, tutti `float`, tutti `string`, ecc.).
2. **Dimensione fissa (negli array statici)**: il numero di elementi viene stabilito alla dichiarazione e non può essere ridimensionato a runtime.
3. **Indicizzazione zero-based**: il primo elemento si trova sempre all'indice **`0`**, mentre l'ultimo elemento di un array di dimensione $N$ si trova all'indice **`N - 1`**.

---

## 2. Dichiarazione e Inizializzazione

```cpp
// 1. Dichiarazione senza inizializzazione (contiene valori "spazzatura" presenti in RAM!)
int voti[5]; 

// 2. Dichiarazione con inizializzazione completa
int numeri[5] = {10, 20, 30, 40, 50};

// 3. Inizializzazione di tutti gli elementi a 0
int zeri[5] = {0}; 

// 4. Inizializzazione parziale (i valori mancanti diventano automaticamente 0)
int parziale[5] = {7, 9}; // Diventa: 7, 9, 0, 0, 0

// 5. Dimensione automatica dedotta dal compilatore
char vocali[] = {'a', 'e', 'i', 'o', 'u'}; // Il compilatore alloca 5 elementi
```

---

## 3. Accesso agli Elementi e il Pericolo "Out-of-Bounds"

Si accede a un elemento specificando l'indice tra parentesi quadre `[ ]`:

```cpp
int numeri[3] = {100, 200, 300};

cout << numeri[0] << endl; // Stampa 100 (primo elemento)
numeri[1] = 250;           // Modifica il secondo elemento
cout << numeri[2] << endl; // Stampa 300 (terzo elemento)
```

> [!CAUTION]
> **Errore Critico: Accesso fuori dai limiti (Out-of-bounds)**  
> Se dichiari `int arr[5]`, gli indici validi sono da `0` a `4`.  
> In C++, se tenti di accedere a `arr[5]` o `arr[10]`, il compilatore **spesso non dà errore**, ma il programma andrà a leggere o sovrascrivere memoria non autorizzata, provocando comportamenti imprevedibili o un crash improvviso (*Segmentation Fault*).

---

## 4. Scorrimento dell'Array (Attraversamento)

Per leggere o modificare tutti gli elementi di un array si utilizza tipicamente il ciclo `for`.

### Metodo 1: Ciclo `for` classico con indice
```cpp
const int DIM = 5;
int voti[DIM] = {7, 8, 6, 9, 10};

for (int i = 0; i < DIM; i++) {
    cout << "Elemento all'indice [" << i << "]: " << voti[i] << endl;
}
```

### Metodo 2: Range-based for loop (C++11)
Più compatto e sicuro, ideale quando non serve conoscere l'indice numerico:

```cpp
int voti[] = {7, 8, 6, 9, 10};

// Lettura semplice (ogni elemento viene copiato in 'v')
for (int v : voti) {
    cout << v << " ";
}

// Modifica tramite riferimento (&)
for (int &v : voti) {
    v += 1; // Aumenta ogni voto di 1 direttamente nell'array
}
```

---

## 5. Algoritmi Classici su Array

Ecco le operazioni più frequenti svolte su un vettore: somma, calcolo della media, e ricerca di massimo e minimo.

```cpp
#include <iostream>
using namespace std;

int main() {
    const int N = 6;
    int numeri[N] = {14, 5, 27, -3, 89, 42};

    // 1. Somma e Media
    int somma = 0;
    for (int i = 0; i < N; i++) {
        somma += numeri[i];
    }
    float media = static_cast<float>(somma) / N;

    // 2. Ricerca del Massimo e del Minimo
    int max = numeri[0];
    int min = numeri[0];
    int indiceMax = 0;
    int indiceMin = 0;

    for (int i = 1; i < N; i++) {
        if (numeri[i] > max) {
            max = numeri[i];
            indiceMax = i;
        }
        if (numeri[i] < min) {
            min = numeri[i];
            indiceMin = i;
        }
    }

    cout << "Somma: " << somma << endl;
    cout << "Media: " << media << endl;
    cout << "Massimo: " << max << " (all'indice " << indiceMax << ")" << endl;
    cout << "Minimo: " << min << " (all'indice " << indiceMin << ")" << endl;

    return 0;
}
```

---

## 6. Array Bidimensionali (Le Matrici)

Una matrice è una tabella organizzata per **righe** e **colonne**.

```cpp
// Matrice di 3 righe e 4 colonne
int griglia[3][4] = {
    {1,  2,  3,  4},   // Riga 0
    {5,  6,  7,  8},   // Riga 1
    {9, 10, 11, 12}    // Riga 2
};

// Accesso al valore nella riga 1, colonna 2 (numero 7):
cout << griglia[1][2] << endl;
```

### Scorrimento di una Matrice con cicli annidati
```cpp
const int RIGHE = 3;
const int COLONNE = 4;

for (int r = 0; r < RIGHE; r++) {
    for (int c = 0; c < COLONNE; c++) {
        cout << griglia[r][c] << "\t";
    }
    cout << endl; // A capo alla fine di ogni riga
}
```

---

## 7. Passaggio di un Array a una Funzione

In C++ gli array **non vengono mai passati per copia**. Quando passi un array a una funzione, passi in realtà il puntatore alla prima cella di memoria:
- Le modifiche fatte all'interno della funzione **modificano direttamente l'array originale**!
- La funzione non conosce la dimensione dell'array, quindi è obbligatorio passare la dimensione come parametro aggiuntivo.

```cpp
#include <iostream>
using namespace std;

// arr[] indica che riceviamo l'indirizzo di memoria dell'array
void raddoppiaElementi(int arr[], int dimensione) {
    for (int i = 0; i < dimensione; i++) {
        arr[i] *= 2;
    }
}

// const impedisce alla funzione di modificare i dati (sola lettura)
void stampaArray(const int arr[], int dimensione) {
    for (int i = 0; i < dimensione; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
}

int main() {
    int valori[4] = {10, 20, 30, 40};

    raddoppiaElementi(valori, 4);
    stampaArray(valori, 4); // Output: 20 40 60 80

    return 0;
}
```

---

## 8. Oltre gli Array Statici: `std::vector`

Gli array tradizionali visti finora hanno un grosso limite: la loro dimensione deve essere decisa al momento della scrittura del codice e non può cambiare durante l'esecuzione.

Nel C++ moderno, quando serve un array a **dimensione dinamica**, si usa `std::vector` dalla libreria `<vector>`:

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v; // Vettore dinamico inizialmente vuoto

    v.push_back(10); // Aggiunge in coda
    v.push_back(20);
    v.push_back(30);

    cout << "Dimensione attuale: " << v.size() << endl; // 3
    cout << "Primo elemento: " << v[0] << endl;        // 10

    v.pop_back(); // Rimuove l'ultimo elemento (30)
    cout << "Nuova dimensione: " << v.size() << endl;  // 2

    return 0;
}
```

| Caratteristica | Array Statico (`int arr[N]`) | `std::vector` (`vector<int> v`) |
| :--- | :--- | :--- |
| **Dimensione** | Fissa in compilazione | Dinamica ed espandibile a piacere |
| **Allocazione memoria** | Stack | Heap (gestita in automatico) |
| **Aggiunta elementi** | Impossibile oltre $N$ | Metodo `.push_back()` |
| **Dimensione nota** | Va passata a parte | Metodo `.size()` |
