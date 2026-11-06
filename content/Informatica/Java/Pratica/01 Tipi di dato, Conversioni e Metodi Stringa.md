---
title: "01 Tipi di dato, Conversioni e Metodi Stringa"
tags:
  - informatica/java/pratica
  - informatica/java/sintassi
  - tipologia/cheat-sheet
---
## 1. Tabella Rapida dei Tipi Primitivi

| Tipo | Dimensione | Intervallo Valori | Sintassi Corretta | Note di Laboratorio |
| :--- | :---: | :--- | :--- | :--- |
| **`byte`** | 1 byte (8 bit) | $-128 \dots +127$ | `byte b = 100;` | Buffer di rete o file binari. |
| **`short`** | 2 byte (16 bit) | $-32.768 \dots +32.767$ | `short s = 25000;` | |
| **`int`** | 4 byte (32 bit) | $\approx \pm 2$ miliardi | `int x = 42;` | **Tipo predefinito** per gli interi. |
| **`long`** | 8 byte (64 bit) | $-2^{63} \dots +2^{63}-1$ | `long pop = 8000000000L;` | **Suffisso `L` o `l` obbligatorio**! |
| **`float`** | 4 byte (32 bit) | $\approx 7$ cifre decimali | `float pi = 3.14f;` | **Suffisso `f` o `F` obbligatorio**! |
| **`double`** | 8 byte (64 bit) | $\approx 16$ cifre decimali | `double d = 19.99;` | **Tipo predefinito** per i decimali. |
| **`char`** | 2 byte (16 bit) | Singolo carattere Unicode | `char c = 'A';` | Apici singoli `'...'`. |
| **`boolean`**| 1 bit logico | Solo `true` oppure `false` | `boolean ok = true;` | **NON è un numero intero** (niente `0` o `1`). |

---

## 2. Conversioni di Tipo (Casting) e Parsing

### A. Allargamento Automatico (Widening)
Da tipo più piccolo a tipo più grande: avviene in modo trasparente e senza perdita di dati.
```java
int a = 25;
double b = a; // Automatico: b diventa 25.0
```

### B. Restringimento Esplicito (Narrowing con Cast)
Da tipo più grande a più piccolo: richiede la parentesi tonda con il tipo di destinazione e **tronca i decimali**:
```java
double prezzo = 19.99;
int intero = (int) prezzo; // intero vale 19 (non arrotonda per eccesso, tronca!)
```

### C. Parsing da Stringa a Numero (Da ricordarsi negli esercizi!)
Quando leggi da terminale o da file, i dati arrivano come testo. Per convertirli:
```java
String testoIntero = "150";
String testoDecimale = "12.75";

int numero = Integer.parseInt(testoIntero);       // Restituisce un int
double prezzo = Double.parseDouble(testoDecimale); // Restituisce un double
```

---

## 3. Gestione Pratica delle Stringhe (`String`)

In Java le stringhe sono **oggetti immutabili**: ogni volta che invochi un metodo, non stai alterando la stringa originaria, ma stai creando un nuovo testo nello Heap!

```java
String nome = "alessandro";
nome.toUpperCase(); 
System.out.println(nome); // Stampa ancora "alessandro"!

nome = nome.toUpperCase(); // ✅ RIASSEGNAZIONE CORRETTA: ora punta al nuovo oggetto "ALESSANDRO"
```

### Il Confronto: MAI usare `==`!
L'operatore `==` confronta se due stringhe occupano lo stesso indirizzo fisico di memoria, non il contenuto alfabetico.

![[Pasted image 20261020100802.png]]

```java
String s1 = "java";
String s2 = new String("java");

// ❌ ERRORE:
if (s1 == s2) { ... } // FALSE! (Indirizzi di memoria diversi)

// ✅ CORRETTO:
if (s1.equals(s2)) { ... } // TRUE! Confronta il testo carattere per carattere

// ✅ IGNORANDO MAIUSCOLE/MINUSCOLE:
if (s1.equalsIgnoreCase("JAVA")) { ... } // TRUE!
```

---

## 4. Cheat-Sheet dei Metodi Indispensabili di `String`

| Metodo | Cosa fa? | Esempio Pratico | Risultato |
| :--- | :--- | :--- | :--- |
| **`.length()`** | Restituisce la lunghezza (in caratteri) | `"Java".length()` | `4` |
| **`.charAt(i)`** | Estrae il singolo carattere alla posizione `i` (da 0) | `"Casa".charAt(1)` | `'a'` |
| **`.substring(i)`** | Estrae dal carattere `i` fino alla fine | `"Programma".substring(3)` | `"gramma"` |
| **`.substring(start, end)`** | Estrae da `start` compreso a `end` **escluso** | `"Computer".substring(0, 4)` | `"Comp"` |
| **`.contains(testo)`** | Controlla se la parola è contenuta (`boolean`) | `"Ferrari".contains("rar")` | `true` |
| **`.indexOf(testo)`** | Restituisce l'indice della prima occorrenza (o `-1`) | `"Banana".indexOf("na")` | `2` |
| **`.toLowerCase()`** | Converte tutto in minuscolo | `"CIAO".toLowerCase()` | `"ciao"` |
| **`.toUpperCase()`** | Converte tutto in maiuscolo | `"ciao".toUpperCase()` | `"CIAO"` |
| **`.trim()`** | Elimina gli spazi vuoti all'inizio e alla fine | `"  test  ".trim()` | `"test"` |
| **`.replace(old, new)`** | Sostituisce caratteri o sottostringhe | `"rosso".replace('o', 'a')` | `"rassa"` |
| **`.split(separatore)`** | Taglia la stringa e genera un array `String[]` | `"mela,pera,uva".split(",")` | `["mela", "pera", "uva"]` |
