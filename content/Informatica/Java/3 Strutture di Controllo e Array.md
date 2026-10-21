---
title: "3 Strutture di Controllo e Array"
tags:
  - informatica/java/controllo-flusso
  - tipologia/concetto
---
## 1. Selezione Condizionale: `if`, `else if`, `else`

La sintassi delle decisioni in Java è basata sulle parentesi graffe `{}` e sulle condizioni booleane rigorose:

```java
int punteggio = 85;

if (punteggio >= 90) {
    System.out.println("Grado: Eccellente");
} else if (punteggio >= 60) {
    System.out.println("Grado: Sufficiente");
} else {
    System.out.println("Grado: Insufficiente");
}
```

> [!WARNING] ⚠️ Condizioni Rigorosamente Booleane
> In C++ un intero $0$ equivale a falso e qualsiasi numero diverso da zero a vero (es. `if (x)`). In Java questo genera un errore di compilazione: l'espressione dentro `if(...)` ==deve produrre obbligatoriamente un tipo primitivo boolean== (`if (x != 0)`).

### Operatore Ternario
Assegnazione rapida monoriga:
$$\text{variabile} = (\text{condizione}) \text{ ? } \text{valoreSeVero} \text{ : } \text{valoreSeFalso};$$

```java
int eta = 19;
String stato = (eta >= 18) ? "Maggiorenne" : "Minorenne";
```

---

## 2. Selezione Multipla: `switch` Tradizionale vs Moderno

### A. Lo Switch Classico (con `break`)
```java
int mese = 2;
switch (mese) {
    case 1:
        System.out.println("Gennaio");
        break; // ==OBBLIGATORIO: senza break si scivola nel caso sotto (fallthrough)==!
    case 2:
        System.out.println("Febbraio");
        break;
    default:
        System.out.println("Altro mese");
}
```

### B. Enhanced Switch con Freccia (Java 14+)
Nelle versioni moderne di Java si usa la ==notazione a freccia `->`==: elimina il rischio di dimenticare il `break`, permette di raggruppare più casi con la virgola e può restituire direttamente un valore:

```java
int giorno = 6;

String tipoGiorno = switch (giorno) {
    case 1, 2, 3, 4, 5 -> "Giorno Lavorativo";
    case 6, 7           -> "Fine Settimana";
    default             -> "Giorno non valido";
};

System.out.println(tipoGiorno); // Fine Settimana
```

---

## 3. I Cicli Iterativi e il `for-each`

### A. Cicli Classici: `while`, `do-while` e `for`
- **`while (cond)`**: verifica prima di eseguire (0 o più volte).
- **`do { ... } while (cond);`**: esegue almeno una volta, poi verifica la condizione a valle.
- **`for (int i = 0; i < n; i++)`**: ciclo standard con contatore deterministico.

### B. Il Ciclo Avanzato `for-each`
È la modalità consigliata e idiomatica per scorrere tutti gli elementi di un array o di una collezione, evitando errori di indici fuori limite:

```java
int[] numeri = {10, 20, 30, 40, 50};

// Sintassi: for (TipoVariabile elemento : contenitore)
for (int num : numeri) {
    System.out.print(num + " ");
}
// Output: 10 20 30 40 50
```

> [!NOTE]
> Il ciclo ==`for-each` è di sola lettura==: non permette di modificare i valori originali dell'array né di conoscere l'indice di posizione numerico dell'elemento corrente.

---

## 4. Gli Array in Java: Oggetti nello Heap

A differenza del C++ dove un array `int v[10]` riserva semplicemente 40 byte contigui nello Stack, **in Java ==qualsiasi array è un oggetto a tutti gli effetti allocato nello Heap==**.

![[Pasted image 20261020102301.png]]

### 1. Dichiarazione e Allocazione Dinamica
```java
// 1. Dichiarazione (nello Stack viene creata solo la variabile di riferimento, che vale null)
int[] temperature;

// 2. Allocazione nello Heap tramite la keyword new
temperature = new int[7]; // ==Vengono allocate 7 celle, inizializzate automaticamente a 0==!

// La proprietà .length ci dà la dimensione esatta
System.out.println("Giorni registrati: " + temperature.length); // 7
```

### 2. Inizializzazione Immediata
Possiamo dichiarare e popolare un array contemporaneamente:
```java
String[] studenti = {"Alessandro", "Beatrice", "Carlo", "Diana"};
```

### 3. Matrici (Array Multidimensionali)
Una matrice in Java è letteralmente un *"array di array"*:
```java
// Griglia 3 righe x 3 colonne
int[][] matrice = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

System.out.println(matrice[1][2]); // Riga 1, Colonna 2 -> Stampa 6
```



---

## 8. Programma Esecutivo Completo

> [!EXAMPLE]- 🧪 Programma Completo: Analisi Statistica Voti con Array e Ordinamento
> ```java
> import java.util.Scanner;
> import java.util.Arrays;
> 
> public class StatisticheClasse {
>     public static void main(String[] args) {
>         Scanner scanner = new Scanner(System.in);
> 
>         System.out.print("Quanti studenti compongono la classe? ");
>         int n = scanner.nextInt();
> 
>         double[] voti = new double[n];
> 
>         // Caricamento dei voti da tastiera
>         for (int i = 0; i < voti.length; i++) {
>             System.out.printf("Inserisci voto studente %d: ", (i + 1));
>             voti[i] = scanner.nextDouble();
>         }
> 
>         // Calcolo di somma e media con ciclo for-each
>         double somma = 0;
>         for (double v : voti) {
>             somma += v;
>         }
>         double media = somma / voti.length;
> 
>         // Ordinamento dell'array tramite Arrays.sort
>         Arrays.sort(voti);
>         double votoMinimo = voti[0];
>         double votoMassimo = voti[voti.length - 1];
> 
>         // Stampa dei risultati
>         System.out.println("\n========================================");
>         System.out.println("       REPORT STATISTICO CLASSE        ");
>         System.out.println("========================================");
>         System.out.println("Tutti i voti ordinati: " + Arrays.toString(voti));
>         System.out.printf("Numero totale studenti: %d%n", voti.length);
>         System.out.printf("Media complessiva     : %.2f%n", media);
>         System.out.printf("Voto più basso        : %.2f%n", votoMinimo);
>         System.out.printf("Voto più alto         : %.2f%n", votoMassimo);
>         System.out.println("========================================");
> 
>         scanner.close();
>     }
> }
> ```
