---
title: "Le struct e le classi"
tags:
  - informatica/cpp/sintassi
  - tipologia/guida-pratica
---

Nei problemi reali i tipi di dati primitivi (`int`, `float`, `string`) non bastano per descrivere entità complesse del mondo reale, come un utente, un prodotto di e-commerce o un personaggio di un videogioco.

Il C++ permette di creare **tipi di dati personalizzati** aggregando più variabili e funzioni sotto un unico nome mediante due strumenti: le **`struct`** e le **`class`**.

---

## 1. Le Struct (Strutture Dati)

Una `struct` è un tipo di dato composito che raggruppa variabili di tipo differente, chiamate **campi** (o membri).

### Definizione di una Struct
```cpp
#include <iostream>
#include <string>
using namespace std;

// Definizione della struttura Videogioco
struct Videogioco {
    string titolo;
    string genere;
    float valutazione;
    int annoUscita;
};
```

### Creazione e Accesso ai Campi (Operatore Punto `.`)
Per accedere ai singoli campi si usa l'operatore punto `.`:

```cpp
int main() {
    // Creazione di una variabile di tipo Videogioco
    Videogioco g1;

    // Assegnazione dei valori ai campi
    g1.titolo = "The Legend of Zelda";
    g1.genere = "Action-Adventure";
    g1.valutazione = 9.8f;
    g1.annoUscita = 2017;

    cout << "Titolo: " << g1.titolo << " (" << g1.annoUscita << ")" << endl;
    cout << "Voto: " << g1.valutazione << "/10" << endl;

    return 0;
}
```

---

## 2. Struct Annidate e Array di Struct

### Struct Annidate
Una struct può contenere al suo interno un'altra struct come campo:

```cpp
struct Data {
    int giorno;
    int mese;
    int anno;
};

struct Studente {
    string nome;
    string cognome;
    int matricola;
    Data dataNascita; // Struct annidata
};

int main() {
    Studente s;
    s.nome = "Giulia";
    s.dataNascita.giorno = 24; // Doppio punto per accedere alla sotto-struttura
    s.dataNascita.mese = 10;
    s.dataNascita.anno = 2005;
}
```

### Array di Struct
Possiamo creare vettori di strutture per gestire collezioni di record (es. un registro di studenti):

```cpp
Studente classe[20]; // Vettore di 20 studenti

// Assegnazione dello studente all'indice [0]
classe[0].nome = "Mario";
classe[0].cognome = "Rossi";
classe[0].matricola = 10234;

// Assegnazione dello studente all'indice [1]
classe[1].nome = "Anna";
classe[1].cognome = "Verdi";
classe[1].matricola = 10235;
```

---

## 3. Dalle Struct alle Classi (OOP)

In C++ l'unica differenza sintattica tra una `struct` e una `class` è la **visibilità predefinita**:
- Nelle `struct`: tutti i membri sono **`public`** di default (visibili a chiunque).
- Nelle `class`: tutti i membri sono **`private`** di default (protetti e inaccessibili dall'esterno).

Per convenzione:
- Si usa `struct` per semplici contenitori di dati (Plain Old Data).
- Si usa `class` per la **programmazione orientata agli oggetti (OOP)**, dove dati e logica operativa vengono protetti e incapsulati insieme.

---

## 4. I Modificatori di Accesso: `public` vs `private`

L'**incapsulamento** è il principio OOP che consiste nel nascondere i dati interni di un oggetto proteggendoli da modifiche errate o non autorizzate.

- **`private`**: le variabili e i metodi possono essere usati **solo all'interno della classe stessa**.
- **`public`**: le variabili e i metodi sono accessibili dall'esterno (es. nel `main`).

```cpp
class ContoBancario {
private:
    double saldo; // Nessuno dall'esterno può impostare il saldo arbitrariamente!

public:
    // Metodo pubblico per versare denaro con controllo di validità
    void deposita(double importo) {
        if (importo > 0) {
            saldo += importo;
            cout << "Depositati: " << importo << " euro." << endl;
        } else {
            cout << "Importo non valido!" << endl;
        }
    }

    // Metodo getter per leggere il saldo in sola lettura
    double getSaldo() {
        return saldo;
    }
};
```

---

## 5. Il Costruttore (Inizializzazione Automatica)

Il **Costruttore** è un metodo speciale che ha lo **stesso identico nome della classe** e non ha alcun tipo di ritorno (nemmeno `void`).  
Viene eseguito **automaticamente** nel momento esatto in cui un nuovo oggetto viene creato in memoria.

Serve a garantire che l'oggetto non nasca con dati spazzatura o incoerenti.

```cpp
#include <iostream>
#include <string>
using namespace std;

class Giocatore {
private:
    string nome;
    int puntiVita;
    int livello;

public:
    // 1. Costruttore di Default (senza argomenti)
    Giocatore() {
        nome = "Anonimo";
        puntiVita = 100;
        livello = 1;
    }

    // 2. Costruttore Parametrizzato (con lista di inizializzazione)
    Giocatore(string n, int pv, int liv) : nome(n), puntiVita(pv), livello(liv) {
        // I campi sono inizializzati direttamente nella lista prima del corpo!
    }

    // Metodo di stampa
    void stampaScheda() {
        cout << "Guerriero: " << nome 
             << " | PV: " << puntiVita 
             << " | Livello: " << livello << endl;
    }

    // Distruttore (chiamato alla cancellazione dell'oggetto)
    ~Giocatore() {
        // Qui si libera eventuale memoria dinamica allocata dall'oggetto
    }
};

int main() {
    // Oggetto creato con il costruttore di default:
    Giocatore g1;
    g1.stampaScheda(); // Guerriero: Anonimo | PV: 100 | Livello: 1

    // Oggetto creato con il costruttore parametrizzato:
    Giocatore g2("Artu", 150, 5);
    g2.stampaScheda(); // Guerriero: Artu | PV: 150 | Livello: 5

    return 0;
}
```

---

## 6. Puntatori a Oggetti e l'Operatore Freccia (`->`)

Se abbiamo un puntatore a una struct o a una classe, per accedere ai suoi membri possiamo usare l'operatore **`->`** (freccia), che unisce la dereferenziazione `(*ptr)` e l'accesso con punto `.`:

```cpp
Giocatore *ptr = new Giocatore("Lancillotto", 120, 3);

// Invece di scrivere: (*ptr).stampaScheda();
ptr->stampaScheda(); // Molto più leggibile e pulito!

delete ptr; // Libera la memoria
```

---

## Tabella di Confronto: `struct` vs `class`

| Caratteristica | `struct` | `class` |
| :--- | :--- | :--- |
| **Visibilità predefinita** | `public` | `private` |
| **Scopo principale** | Raccolta di dati semplici | Incapsulamento e logica OOP |
| **Uso tipico** | Record, coordinate geometriche, tuple | Entità complesse, modelli di business |
| **Supporto a metodi e costruttori** | Sì (in C++ entrambe li supportano) | Sì |