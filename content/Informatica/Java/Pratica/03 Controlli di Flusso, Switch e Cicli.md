---
title: "03 Controlli di Flusso, Switch e Cicli"
tags:
  - informatica/java/pratica
  - informatica/java/controllo-flusso
  - tipologia/cheat-sheet
---

> [!SUMMARY] ⚡ Prontuario Rapido
> - **Condizioni Booleane**: in Java `if (x)` numerico è vietato; la condizione deve produrre rigorosamente un ==`boolean`== (`if (x != 0)`).
> - **Enhanced Switch (Java 14+)**: ==`case 1, 2 -> ...;`== — non richiede `break`, elimina il rischio di fallthrough e può restituire un valore.
> - **Validazione Input**: il costrutto ideale è ==`do { ... } while (inputNonValido);`==.
> - **Ciclo `for-each`**: ==`for (int num : array)`== è la modalità più sicura e compatta per scorrere sequenze in sola lettura.

---

## 1. Selezione Condizionale (`if`, `else if`, `else`)

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

### Operatori Logici e Relazionali
- Uguaglianza / Disuguaglianza: `==`, `!=`
- Confronti: `<`, `<=`, `>`, `>=`
- Logica booleana: `&&` (AND logico con cortocircuito), `||` (OR logico), `!` (NOT negazione)

### Operatore Ternario (Assegnazione Rapida Monoriga)
$$\text{variabile} = (\text{condizione}) \text{ ? } \text{valoreSeVero} \text{ : } \text{valoreSeFalso};$$

```java
int eta = 19;
String stato = (eta >= 18) ? "Maggiorenne" : "Minorenne";
```

---

## 2. Selezione Multipla (`switch`)

### A. Switch Tradizionale (Attenzione ai `break`!)
```java
int giorno = 2;

switch (giorno) {
    case 1:
        System.out.println("Lunedì");
        break; // OBBLIGATORIO: senza break si scivola nel caso successivo!
    case 2:
        System.out.println("Martedì");
        break;
    default:
        System.out.println("Altro giorno");
        break;
}
```

### B. Enhanced Switch con Freccia (Java 14+ - Consigliato!)
Elimina i `break`, permette di raggruppare casi con la virgola e può restituire direttamente un valore:

```java
int giorno = 6;

String tipoGiorno = switch (giorno) {
    case 1, 2, 3, 4, 5 -> "Giorno Lavorativo";
    case 6, 7           -> "Fine Settimana";
    default             -> "Giorno non valido";
};

System.out.println(tipoGiorno); // "Fine Settimana"
```

---

## 3. I Cicli Iterativi

### 1. Ciclo `while` (Controllo in Testa)
Esegue il blocco **0 o più volte**, finché la condizione rimane vera:
```java
int i = 0;
while (i < 5) {
    System.out.println("Indice: " + i);
    i++;
}
```

---

### 2. Ciclo `do-while` (Controllo in Coda - Pattern Validazione Input)
Esegue il blocco **almeno una volta**, verificando la condizione al termine. È lo strumento principe da laboratorio per **obbligare l'utente a inserire un dato valido**:

```java
Scanner input = new Scanner(System.in);
int voto;

do {
    System.out.print("Inserisci voto scolastico (da 1 a 10): ");
    voto = input.nextInt();
    
    if (voto < 1 || voto > 10) {
        System.out.println("❌ Voto non valido! Riprova.");
    }
} while (voto < 1 || voto > 10); // Ripete finché il dato è errato!

System.out.println("Voto accettato: " + voto);
```

---

### 3. Ciclo `for` Classico (Contatore Deterministico)
Ideale quando si conosce a priori il numero esatto di iterazioni:
```java
for (int i = 0; i < 10; i++) {
    System.out.println("Passo " + (i + 1));
}
```

---

### 4. Ciclo `for-each` (Scorrimento Semplificato)
Ideale per leggere tutti gli elementi di un array o di una lista senza dover gestire indici:

```java
String[] frutti = {"Mela", "Pera", "Banana", "Arancia"};

// for (TipoVariabile elemento : contenitore)
for (String f : frutti) {
    System.out.println("Frutto: " + f);
}
```

> [!NOTE] Limite del `for-each`
> È un ciclo di **sola lettura**: non consente di modificare le celle dell'array né di conoscere la posizione numerica (`i`) dell'elemento corrente.

---

## 4. Istruzioni di Salto: `break` e `continue`

- **`break`**: interrompe immediatamente il ciclo ed esce dal blocco.
- **`continue`**: salta il resto dell'iterazione corrente e passa subito al ciclo successivo.

```java
for (int i = 1; i <= 10; i++) {
    if (i == 5) continue; // Salta il 5 e non lo stampa
    if (i == 8) break;    // Blocca il ciclo appena arriva a 8
    System.out.print(i + " ");
}
// Output: 1 2 3 4 6 7
```
