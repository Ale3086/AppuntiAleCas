---
title: "04 Array e Matrici (Algoritmi e Ricette)"
tags:
  - informatica/java/pratica
  - informatica/java/strutture-dati
  - tipologia/cheat-sheet
---
## 1. Dichiarazione, Allocazione e Memoria

In Java, qualsiasi array è un **vero oggetto allocato nello Heap**:

![[Pasted image 20261020102301.png]]

### A. Allocazione Dinamica con `new`
```java
// 1. Dichiarazione del riferimento nello Stack
int[] voti;

// 2. Allocazione nello Heap (tutti gli elementi partono da 0)
voti = new int[5];

// 3. Lettura dimensione
System.out.println("Numero celle: " + voti.length); // 5
```

### B. Inizializzazione Immediata
```java
String[] giorni = {"Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"};
```

---

## 2. Le 4 Ricette Algoritmiche da Laboratorio

### Ricetta 1: Caricamento e Stampa con Ciclo
```java
Scanner input = new Scanner(System.in);
int[] numeri = new int[5];

// Caricamento
for (int i = 0; i < numeri.length; i++) {
    System.out.printf("Inserisci valore per posizione [%d]: ", i);
    numeri[i] = input.nextInt();
}

// Stampa rapida elegante
System.out.println("Array caricato: " + Arrays.toString(numeri));
```

---

### Ricetta 2: Calcolo di Somma e Media Ponderata
```java
int somma = 0;

for (int n : numeri) {
    somma += n;
}

// Attenzione: applicare il cast (double) per evitare la divisione intera!
double media = (double) somma / numeri.length;

System.out.printf("Somma: %d | Media: %.2f%n", somma, media);
```

---

### Ricetta 3: Ricerca del Massimo e Minimo con Indice
```java
int max = numeri[0];
int indiceMax = 0;

int min = numeri[0];
int indiceMin = 0;

for (int i = 1; i < numeri.length; i++) {
    if (numeri[i] > max) {
        max = numeri[i];
        indiceMax = i;
    }
    if (numeri[i] < min) {
        min = numeri[i];
        indiceMin = i;
    }
}

System.out.printf("Massimo: %d (in posizione %d)%n", max, indiceMax);
System.out.printf("Minimo : %d (in posizione %d)%n", min, indiceMin);
```

---

### Ricetta 4: Ricerca Lineare di un Elemento
```java
int bersaglio = 42;
boolean trovato = false;
int posizione = -1;

for (int i = 0; i < numeri.length; i++) {
    if (numeri[i] == bersaglio) {
        trovato = true;
        posizione = i;
        break; // Trovato: interrompiamo la scansione inutile
    }
}

if (trovato) {
    System.out.println("Elemento trovato alla posizione: " + posizione);
} else {
    System.out.println("Elemento NON presente nell'array.");
}
```

---

## 3. Matrici Bidimensionali (Array di Array)

```java
// Matrice di 3 righe per 4 colonne
int[][] matrice = new int[3][4];

// Inizializzazione diretta a griglia
int[][] tabella = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

// Scansione a doppio ciclo for annidato:
for (int i = 0; i < tabella.length; i++) {           // tabella.length = numero righe
    for (int j = 0; j < tabella[i].length; j++) {   // tabella[i].length = colonne della riga i
        System.out.print(tabella[i][j] + "\t");
    }
    System.out.println(); // A-capo alla fine di ogni riga
}
```

---

## 4. Cheat-Sheet della Classe `java.util.Arrays`

Evita di scrivere cicli inutili quando la libreria standard ti offre funzioni super veloci:

```java
import java.util.Arrays;

int[] dati = {50, 10, 80, 25, 5};

// 1. Stampa immediata senza cicli
System.out.println(Arrays.toString(dati)); // [50, 10, 80, 25, 5]

// 2. Ordinamento in-place (Dual-Pivot Quicksort)
Arrays.sort(dati);
System.out.println(Arrays.toString(dati)); // [5, 10, 25, 50, 80]

// 3. Ricerca Dicotomica / Binaria (Richiede che l'array sia già ordinato!)
int index = Arrays.binarySearch(dati, 25);
System.out.println("25 si trova all'indice: " + index); // 2

// 4. Riempimento rapido di tutte le celle
int[] buffer = new int[10];
Arrays.fill(buffer, -1); // Tutte le 10 celle impostate a -1

// 5. Confronto contenuto tra due array
int[] a1 = {1, 2, 3};
int[] a2 = {1, 2, 3};
boolean uguali = Arrays.equals(a1, a2); // true (con == darebbe false!)
```
