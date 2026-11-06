---
title: "Teoria"
description: "Concetti teorici per interrogazioni ed esami orali: architettura JVM, RAM (Stack, Heap, Metaspace), OOP, membri statici, costruttori, UML NClass, classi astratte e polimorfismo."
---
# 📂 Teoria
Concetti teorici per interrogazioni ed esami orali: architettura JVM, RAM (Stack, Heap, Metaspace), OOP, membri statici, costruttori, UML NClass, classi astratte e polimorfismo.

### **[[01 Architettura JVM e Modello di Memoria]]**
Filosofia WORA, pipeline di compilazione a due stadi sorgente-bytecode-JVM, ecosistema JDK vs JRE vs JVM, organizzazione della RAM (Stack, Heap, Metaspace), Garbage Collector e JIT Compiler.

### **[[02 Il Paradigma OOP e la Classe in Java]]**
Dal pensiero procedurale agli oggetti collaborativi, scatola UML a 3 scomparti in NClass, i 4 modificatori di accesso con matrice di visibilità ed incapsulamento (Getter e Setter validati).

### **[[03 Membri Statici (static) vs Membri di Istanza]]**
Trattazione approfondita della keyword static: variabili di classe nel Metaspace, metodi statici, assenza di this, divieto di accesso a membri non-statici, firma del main e costanti static final.

### **[[04 I costruttori]]**
Ruolo del costruttore, costruttori di default, parametrici e di copia (anti-aliasing), regola di scomparsa del costruttore vuoto, parola chiave this e i 4 passi di new nello Heap.

### **[[05 Relazioni tra Classi e Modellazione UML]]**
Le 5 relazioni fondamentali in UML: Dipendenza, Associazione, Aggregazione (rombo vuoto), Composizione (rombo pieno), Generalizzazione (triangolo vuoto), cicli di vita e NClass.

### **[[06 Ereditarietà, Super e Classi Astratte]]**
Ereditarietà singola con extends, richiamo super(...) in prima riga, modificatore protected, classi e metodi astratti (corsivo su NClass), e parola chiave final.

### **[[07 Polimorfismo]]**
Riferimento polimorfico, collezioni eterogenee, overloading statico vs overriding dinamico, Late Binding con VMT, contratti con interfacce multiple (implements) e realization NClass.
