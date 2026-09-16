## Indice

- [[#cout]]
- [[#cin]]
- [[#cerr]]
- [[#endl vs \n]]
- [[#getline]]
- [[#setw]]
- [[#setprecision]]
- [[#fixed / scientific]]
- [[#left / right]]
- [[#boolalpha]]
- [[#flush]]
- [[#Operatori di redirezione]]

---

## cout

Stampa output su standard output.

```cpp
#include <iostream>
std::cout << "Hello, World!" << std::endl;
std::cout << "Numero: " << 42 << "\n";
```

---

## cin

Legge input da standard input. Si ferma agli spazi/newline.

```cpp
int n;
std::cout << "Inserisci un numero: ";
std::cin >> n;
std::cout << "Hai inserito: " << n;
```

---

## cerr

Stampa messaggi di errore su standard error (non bufferizzato).

```cpp
std::cerr << "Errore: file non trovato!" << std::endl;
```

---

## endl vs \n

`endl` svuota il buffer prima di andare a capo (più lento). `\n` va solo a capo.

```cpp
std::cout << "Riga 1" << std::endl; // va a capo + flush
std::cout << "Riga 2" << "\n";      // solo a capo (preferibile per performance)
```

---

## getline

Legge un'intera riga da input, spazi inclusi.

```cpp
std::string nome;
std::cout << "Nome completo: ";
std::getline(std::cin, nome);
std::cout << "Ciao, " << nome;
```

---

## setw

Imposta la larghezza minima del campo per il prossimo output. Richiede `<iomanip>`.

```cpp
#include <iomanip>
std::cout << std::setw(10) << "hello" << "\n";
// "     hello"
```

---

## setprecision

Imposta il numero di cifre significative (o decimali con `fixed`). Richiede `<iomanip>`.

```cpp
#include <iomanip>
double pi = 3.14159265;
std::cout << std::setprecision(4) << pi; // 3.142
```

---

## fixed / scientific

`fixed`: mostra un numero fisso di decimali.  
`scientific`: notazione scientifica.

```cpp
double x = 12345.6789;
std::cout << std::fixed      << std::setprecision(2) << x << "\n"; // 12345.68
std::cout << std::scientific << std::setprecision(2) << x << "\n"; // 1.23e+04
```

---

## left / right

Allinea il testo a sinistra o a destra nel campo impostato con `setw`.

```cpp
std::cout << std::left  << std::setw(10) << "ab" << "|\n"; // "ab        |"
std::cout << std::right << std::setw(10) << "ab" << "|\n"; // "        ab|"
```

---

## boolalpha

Stampa i booleani come `true`/`false` invece di `1`/`0`.

```cpp
std::cout << std::boolalpha << true << " " << false;
// true false
```

---

## flush

Svuota il buffer di output senza andare a capo.

```cpp
std::cout << "Caricamento..." << std::flush;
// (il testo appare subito senza newline)
```

---

## Operatori di redirezione

`<<` per output, `>>` per input. Sono concatenabili.

```cpp
int a, b;
std::cin >> a >> b;                         // legge due interi
std::cout << a << " + " << b << " = " << a + b << "\n";
```

---
#Linguaggio_cpp #Librerie_cpp