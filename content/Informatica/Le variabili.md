Una **variabile** è una porzione di memoria RAM destinata a contenere un dato che può variare durante l'esecuzione del programma. Possiamo immaginarla come una "scatola" con un nome, in cui inseriamo un valore.

A differenza dei file (che sono persistenti sulla memoria di massa), le variabili sono **volatili**: quando il programma termina o il computer si spegne, i dati contenuti nelle variabili vengono cancellati dalla RAM.

Le operazioni fondamentali per lavorare con una variabile sono:
- **Dichiarazione**: creiamo la "scatola" e le diamo un nome e un tipo.
    
- **Inizializzazione/Assegnazione**: inseriamo un valore nella scatola.
    
- **Utilizzo**: leggiamo o modifichiamo il valore contenuto.

## I Tipi di Variabile principali
Ad ogni variabile va assegnato un tipo, ed esso va, sostanzialmente, ad allocare nella RAM un determinato spazio. Ogni tipo di dato va ad allocare degli spazi di memoria uno vicino all'altro e ogni tipo di variabile cambia lo spazio occupato dalla variabile. I tipi di variabili sono:


## Input e Output (`cin` / `cout` / `getline()`)
Andiamo ad introdurre le funzioni principali per lavorare con le variabili, andando a stampare i dati contenuti in esse e andando a inserire dei dati.

Per questi esempi utilizzeremo `using namespace std;`, dato che didatticamente è la cosa più facile da capire, ma attenzione che in programmazione di veri programmi non è consigliato utilizzarlo.

### Output con `cout`
Si usa l'operatore `<<` (inserimento). Si possono unire testi e variabili in un'unica riga.

```cpp
int livello = 5;
cout << "Sei al livello: " << livello << endl; // endl va a capo
```

### Input con `cin`
Si usa l'operatore `>>` (estrazione). Il valore digitato dall'utente viene "estratto" dal flusso e messo nella variabile. Non gestisce gli spazi, quindi inserendo uno spazio tutto ciò che sarà messo dopo esso non verrà considerato.

```cpp
int scelta;
cout << "Scegli un opzione: ";
cin >> scelta; 
```

### Input con `getline()`


## Typecasting
Il typecasting serve a trasformare temporaneamente una variabile di un tipo in un altro. È essenziale quando si eseguono operazioni tra tipi diversi.

L'esempio classico di utilizzo può essere è la divisione tra interi. In informatica, $5 / 2$ fa $2$, non $2.5$, perché il computer vede due interi e restituisce un intero (tagliando i decimali). Per avere $2.5$, dobbiamo convertire uno dei due numeri in `float`.

### Come si fa in C++
Si usa l'operatore `static_cast<tipo>(variabile)`.

```cpp
int a = 5;
int b = 2;
float risultato;

// Senza casting: risultato = 2
// Con casting:
risultato = static_cast<float>(a) / b; // risultato ora è 2.5
```

> **Nota peer-to-peer**: Esiste anche lo stile del C `(float)a`, ma lo `static_cast` è preferito in C++ perché è più sicuro e facile da trovare nel codice se ci sono bug.