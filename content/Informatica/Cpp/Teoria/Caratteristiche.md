---
title: "Caratteristiche del C++"
tags:
  - informatica/cpp/teoria
  - tipologia/teoria
---

Il **C++** è uno dei linguaggi di programmazione più influenti e diffusi al mondo, utilizzato laddove sono richieste **prestazioni estreme**, **controllo totale dell'hardware** e **gestione efficiente della memoria** (motori grafici 3D come Unreal Engine, sistemi operativi, software per automotive, finanza ad alta frequenza e intelligenza artificiale).

Fu ideato nel **1979** da **Bjarne Stroustrup** presso i Bell Laboratories come estensione del linguaggio C, inizialmente chiamato *"C with Classes"* (*C con le Classi*), con l'obiettivo di unire l'efficienza e la vicinanza all'hardware del C con i meccanismi di astrazione della programmazione orientata agli oggetti. Nel 1983 prese ufficialmente il nome di **C++** (dove `++` è l'operatore di incremento del C, a simboleggiare l'evoluzione).

---

## 1. Caratteristiche Fondamentali del Linguaggio

### A. Linguaggio Compilato
A differenza di linguaggi interpretati (come Python o JavaScript) o basati su macchine virtuali (come Java o C#), il C++ viene tradotto **direttamente in codice macchina nativo** per il processore della macchina ospitante. Questo garantisce la massima velocità di esecuzione possibile.

### B. Tipizzazione Statica e Forte
- **Statica**: il tipo di ogni variabile deve essere noto al momento della compilazione e non può cambiare a runtime.
- **Forte**: il compilatore impedisce operazioni arbitrarie tra tipi incompatibili a meno di conversioni esplicite (*casting*).

### C. Linguaggio Multi-Paradigma
Il C++ non impone un unico stile di programmazione, ma supporta contemporaneamente:
1. **Paradigma Procedurale / Imperativo**: funzioni, strutture di controllo, variabili sequenziali (in pieno stile C).
2. **Paradigma Orientato agli Oggetti (OOP)**: classi, oggetti, incapsulamento, ereditarietà e polimorfismo.
3. **Paradigma Generico**: programmazione basata sui *Template* e sulla *Standard Template Library* (STL), permettendo di scrivere codice che funziona con qualsiasi tipo di dato.
4. **Paradigma Funzionale**: supporto a funzioni lambda ed espressioni chiuse (introdotte da C++11 in poi).

### D. Principio del "Zero-Overhead"
La filosofia fondante del C++ afferma:
> *"Ciò che non usi, non lo paghi. E ciò che usi, non potresti scriverlo a mano in modo più efficiente."*

Se una funzionalità non viene impiegata nel tuo programma, il compilatore non aggiungerà alcun costo in termini di memoria o tempo di calcolo.

### E. Gestione Manuale e Deterministica della Memoria
Il C++ non ha un *Garbage Collector* automatico in background. Lo sviluppatore ha il controllo assoluto su dove allocare ogni singolo byte (nello **Stack** o nello **Heap**) e su quando liberarlo.  
Grazie al paradigma **RAII** (*Resource Acquisition Is Initialization*), le risorse (memoria, file aperti, connessioni di rete) vengono allocate nel costruttore e rilasciate in modo deterministico e immediato nel distruttore non appena l'oggetto esce dal suo ambito di validità (*scope*).

---

## 2. Il Ciclo di Compilazione: Dal Codice Sorgente all'Eseguibile

La trasformazione di uno o più file sorgente `.cpp` nel programma finale `.exe` avviene attraverso **tre fasi sequenziali**:

```
[ File Sorgente .cpp ] + [ Header .h ]
            │
            ▼
┌─────────────────────────┐
│     1. PREPROCESSORE     │  --> Esegue #include, #define, rimuove commenti
└─────────────────────────┘
            │
            ▼ (Unità di traduzione pura)
┌─────────────────────────┐
│     2. COMPILATORE       │  --> Analizza la sintassi, ottimizza e genera codice macchina
└─────────────────────────┘
            │
            ▼ (File Oggetto .obj / .o)
┌─────────────────────────┐
│       3. LINKER         │  --> Risolve i collegamenti con funzioni esterne e librerie
└─────────────────────────┘
            │
            ▼
   [ File Eseguibile .exe ]
```

### 1. Fase di Preprocessing (Preprocessore)
Analizza tutte le direttive che iniziano con il simbolo cancelletto **`#`**:
- `#include`: copia fisicamente l'intero contenuto del file header indicato all'interno del file sorgente.
- `#define`: esegue sostituzioni testuali di costanti o macro.
- Rimuove tutti i commenti (`//` e `/* */`).
- Il risultato è un'unica grande sequenza di codice C++ detta **Unità di Traduzione**.

### 2. Fase di Compilazione (Compilatore)
- Effettua l'analisi lessicale, sintattica e semantica del codice.
- Segnala eventuali errori di sintassi o tipi non compatibili.
- Applica sofisticati algoritmi di ottimizzazione.
- Traduce il codice in istruzioni assembly e infine in codice macchina binario, salvandolo in un file temporaneo chiamato **File Oggetto** (`.obj` su Windows, `.o` su Linux/macOS).

### 3. Fase di Linking (Collegatore / Linker)
Un programma reale è composto da più file `.cpp` e usa funzioni di librerie di sistema (come `cout` di `iostream` o `sqrt` di `cmath`).
- Il Linker unisce tutti i file oggetto in un unico file.
- Risolve i riferimenti ai simboli esterni (trova l'indirizzo delle funzioni dichiarate ma definite altrove).
- Genera il file binario finale eseguibile (`.exe` o ELF).

---

## 3. Tabella di Confronto: C++ vs C vs Linguaggi a Garbage Collector

| Aspetto | C | C++ | Java / Python / C# |
| :--- | :--- | :--- | :--- |
| **Paradigmi** | Solo procedurale | Multi-paradigma (OOP, Generico, Funzionale) | Prevalentemente OOP / Ibrido |
| **Classi e Oggetti** | No (solo `struct` senza metodi) | Sì (pieno supporto OOP) | Sì nativo |
| **Gestione Memoria** | Manuale (`malloc` / `free`) | Manuale controllata (`new` / `delete`, RAII, Smart Pointers) | Automatica tramite Garbage Collector |
| **Performance** | Massima | Massima (pari al C) | Minore (overhead runtime / VM) |
| **Esecuzione** | Codice nativo diretto | Codice nativo diretto | Bytecode eseguito su Macchina Virtuale / Interprete |
| **Portabilità binaria** | Va ricompilato per ogni OS | Va ricompilato per ogni OS | *"Write Once, Run Anywhere"* (su VM) |
