---
title: "02 Input-Output e Gestione Console (Scanner)"
tags:
  - informatica/java/pratica
  - informatica/java/io
  - tipologia/cheat-sheet
---

> [!SUMMARY] ⚡ Prontuario Rapido
> - **Stampa a Video**:
>   - `System.out.println(dato);` $\rightarrow$ stampa e va a capo.
>   - `System.out.print(dato);` $\rightarrow$ stampa rimanendo sulla stessa riga.
>   - `System.out.printf("Testo %d %.2f%n", intero, decimale);` $\rightarrow$ stampa formattata.
> - **Input con `Scanner`**: richiede `import java.util.Scanner;` e `Scanner tastiera = new Scanner(System.in);`.
> - **La Trappola del Buffer Residuo**: dopo `nextInt()` o `nextDouble()`, inserisci SEMPRE una riga a vuoto ==`tastiera.nextLine();`== prima di leggere una nuova stringa con `nextLine()`.

---

## 1. Output su Console (`System.out`)

### A. I Metodi Base
```java
System.out.println("Questo testo va a capo.");
System.out.print("Questo testo ");
System.out.print("continua sulla stessa riga.");
```

### B. Output Formattato con `printf`
Permette di formattare decimali, incolonnare tabelle e stampare senza orribili concatenazioni di stringhe con `+`:

```java
int matricola = 1042;
double media = 8.6666667;
String nome = "Alessandro";

System.out.printf("Studente %s [ID: %05d] - Media: %.2f%n", nome, matricola, media);
// Output: Studente Alessandro [ID: 01042] - Media: 8.67
```

| Segnaposto | Tipo di Dato | Note ed Esempi |
| :---: | :--- | :--- |
| **`%d`** | Numero Intero (`byte`, `short`, `int`, `long`) | `%5d` fissa larghezza a 5 spazi; `%05d` riempie con zeri. |
| **`%f`** | Numero Decimale (`float`, `double`) | **`%.2f`** arrotonda a 2 cifre decimali. |
| **`%s`** | Testo / Stringa | Stampa il testo dell'oggetto. |
| **`%c`** | Carattere Singolo | `char`. |
| **`%b`** | Booleano | `true` o `false`. |
| **`%n`** | A-Capo Universale | Preferibile a `\n` perché rispetta il sistema operativo host. |

---

## 2. Input da Tastiera con `Scanner`

### Template di Avvio
```java
import java.util.Scanner; // 1. IMPORT OBBLIGATORIO

public class EsercizioInput {
    public static void main(String[] args) {
        // 2. CREAZIONE DELL'OGGETTO SCANNER
        Scanner tastiera = new Scanner(System.in);

        // ... codice di lettura ...

        // 3. CHIUSURA DELLO STREAM A FINE PROGRAMMA
        tastiera.close();
    }
}
```

### I Metodi di Lettura
```java
System.out.print("Inserisci età: ");
int eta = tastiera.nextInt(); // Legge un int

System.out.print("Inserisci stipendio: ");
double stipendio = tastiera.nextDouble(); // Legge un double (usa la virgola o il punto a seconda del locale dell'OS)

System.out.print("Inserisci una parola: ");
String parola = tastiera.next(); // Legge SOLO fino al primo spazio vuoto!

System.out.print("Inserisci nome e cognome: ");
String rigaIntera = tastiera.nextLine(); // Legge TUTTA la riga fino alla pressione di Invio
```

---

## 3. La Trappola del Buffer Residuo (Bug Tipico di Laboratorio)

Se scrivi:
```java
System.out.print("Inserisci il numero di matricola: ");
int matricola = tastiera.nextInt();

System.out.print("Inserisci nome e cognome: ");
String nome = tastiera.nextLine(); // 💥 SALTA L'INPUT E RIMANE VUOTO!
```

### Perché succede?
1. L'utente digita `1234` e preme **Invio**.
2. Nel buffer della tastiera viene immesso: `1234\n`.
3. Il metodo `nextInt()` legge il numero `1234`, ma **lascia il carattere di a-capo `\n` in sospeso nel buffer**!
4. Subito dopo, il metodo `nextLine()` vede quel `\n` rimasto, pensa che l'utente abbia premuto Invio a vuoto e restituisce una stringa vuota `""`, senza fermarsi a chiedere l'input!

### ✅ La Soluzione Obbligatoria: Consumare il Buffer
Basta interporre un'istruzione `tastiera.nextLine();` a vuoto per ripulire il buffer:

```java
System.out.print("Inserisci il numero di matricola: ");
int matricola = tastiera.nextInt();

tastiera.nextLine(); // ==PULISCE IL BUFFER CONSUMANDO IL CARATTERE \n RESIDUO!==

System.out.print("Inserisci nome e cognome: ");
String nome = tastiera.nextLine(); // Ora attende correttamente l'input dell'utente!
```

---

## 4. Template Completo e Testabile per Esercizi

```java
import java.util.Scanner;

public class TestInputCompleto {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("=== SCHEDA ANAGRAFICA ===");

        System.out.print("Inserisci ID utente: ");
        int id = scanner.nextInt();

        System.out.print("Inserisci peso (kg): ");
        double peso = scanner.nextDouble();

        // Pulizia buffer fondamentale!
        scanner.nextLine();

        System.out.print("Inserisci indirizzo di residenza: ");
        String indirizzo = scanner.nextLine();

        System.out.println("\n--- Dati Registrati ---");
        System.out.printf("ID        : %d%n", id);
        System.out.printf("Peso      : %.1f kg%n", peso);
        System.out.printf("Residenza : %s%n", indirizzo);

        scanner.close();
    }
}
```
