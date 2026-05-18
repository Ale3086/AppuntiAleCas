Le struct sono come delle grandi variabili pubbliche e visibili da tutti che vanno ad allocare spazio in memoria uno dopo l'altro, allocando anche differenti tipi di dati uno dopo l'altro. Una struct va a definire un nuovo tipo di dato strutturato esclusivo in quel programma che, a differenza degli array che può contenere solo stessi tipi di dati semplici, può contenere come già detto varie tipologie di dati insieme sotto un unico nome.

```cpp
// Definizione della struttura per un videogioco
struct Videogioco {
    string titolo;
    string genere;
    float valutazione;
    int annoUscita;
};
```

Per accedere ai vari campi o membri (i tipi di dati interni contenuti in una struct) si usa l'operatore `.` in cui prima del punto ci va il nome del dato e dopo il punto ci va il nome del campo che volgiamo gestire.

```cpp
// Creazione della variabile compelssa
Videogioco g1;

// Inizializzazione dei campi con l'operatore .
g1.titolo = "The Legend of Zelda";
g1.genere = "Action-Adventure";
g1.valutazione = 9.8;
g1.annoUscita = 2017;
```

Le struct poi possono anche essere annidate fra loro, andando sostanzialmente ad avere dentro un tipo di variabile complesso altri tipi di variabili complesse .

```cpp
struct data1 {
    int giorno;
    int mese;
    int anno;
};

struct studente {
    string nome;
    string cognome;
    int matricola;
    data1 data_nascita;
};
```

I quali si ci può accedere ripetendo l'operatore del `.` più volte.

```cpp
studente s1;

// Assegnazione campi semplici
s1.nome = "Giulia";
s1.cognome = "Bianchi";
s1.matricola = 556677;

// Accesso alla sotto-struttura data_nascita (doppio punto)
s1.data_nascita.giorno = 24;
s1.data_nascita.mese = 10;
s1.data_nascita.anno = 2001;
```

Con le struct oltre che fare delle variabili con strutture complesse possiamo anche definire degli array con strutture complesse.

```cpp
studente studenti[5];
```

I quali si vanno ad accedere ai vari campi di dato nello stesso modo di prima.

```cpp
// Assegnazione dei campi dello studente con indice [1]
studenti[5].nome = "Giulia";
studenti[5].cognome = "Bianchi";
studenti[5].matricola = 556677;
studenti[5].data_nascita.giorno = 24;
studenti[5].data_nascita.mese = 10;
studenti[5].data_nascita.anno = 2001;
```

In contrapposizione alle struct, che sono pubbliche, se vogliamo gestire dei dati privati e sensibili andremo a dichiarare un tipo di dato strutturato più privato, ovvero la class, la quale va a definire quali campi sono privati e quali campi invece sono pubblichi, garantendo maggiore privacy.

```cpp
class Esempio {
public:
    // VARIABILE PUBBLICA
    int numeroPubblico;

private:
    // VARIABILE PRIVATA (nascosta)
    int numeroPrivato;
};
```

Per accedere ai campi di una class i metodi tra la parte privata e pubblica cambiano:
- **Parte Pubblica (`public`):** È come una variabile normale. Puoi usare l'operatore punto `.` per leggere o scrivere il valore direttamente (`oggetto.nomeVariabile = 10;`).
    
- **Parte Privata (`private`):** È protetta. Il compilatore ti impedisce di toccarla direttamente. Per farlo, devi passare attraverso un metodo (una funzione) che tu stesso hai definito nella parte `public`.

```cpp
#include <iostream>
using namespace std;

class Esempio {
public:
    // VARIABILE PUBBLICA
    int numeroPubblico;

private:
    // VARIABILE PRIVATA (nascosta)
    int numeroPrivato;

public:
    // Metodo per impostare il valore privato
    void setPrivato(int valore) {
        numeroPrivato = valore;
    }

    // Metodo per leggere il valore privato
    int getPrivato() {
        return numeroPrivato;
    }
};

int main() {
    Esempio oggetto;

    // 1. ACCESSO PUBBLICO: 
    // Uso l'operatore punto direttamente sulla variabile
    oggetto.numeroPubblico = 10;
    cout << "Valore pubblico: " << oggetto.numeroPubblico << endl;

    // 2. ACCESSO PRIVATO: 
    // Non posso scrivere "oggetto.numeroPrivato = 5;" (dà errore!)
    // Devo usare il metodo pubblico che fa da ponte
    oggetto.setPrivato(20); 
    cout << "Valore privato: " << oggetto.getPrivato() << endl;

    return 0;
}
```