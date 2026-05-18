Un file è l'unità logica di memorizzazione dei dati su memoria di massa. che consente una memorizzazione persistente dei dati, non limitata dalle dimensioni della memoria centrale.

Quando un nostro processo va ad aprire un file esso viene trasferito dall'hard-disk alla RAM e per rendere la modifica persistente si deve fare un'operazione per riportare dalla RAM all'hard-disk; se non si fanno il file non si aggiorna e quindi rimane con sempre i dati iniziali. Le operazioni per avere un file con una modifica persistente sono uguali per ogni linguaggio, ma le istruzioni dentro esse sono la vera cosa che cambiano effettivamente, ma di poco. Le operazioni sono:

- Apriamo la risorsa;
- Accediamo e lavoriamo con la risorsa;
- Chiudiamo la risorsa.

![](../Zimmagini/Pasted%20image%2020260504234351.jpg)

Un' altra cosa importante è che i tipi di file con cui possiamo lavorare sono molteplici:
- txt: lettura di tipo sequenziale, ovvero che per leggere la riga 20 si devono prima leggere tutte le righe precedenti, iniziando sempre dal primo record logico; sono sequenze di caratteri con record logico che può essere un singolo carattere, la parola, oppure la linea (utilizzato da noi). Per leggere il file abbiamo un puntatore che va a leggere record dopo record il file.![](../Zimmagini/Pasted%20image%2020260518102217.png)

- bin: file binari per memorizzare file o immagini, non apribili con editor di testo perché il risultato non sarà interpretabile e sarà gibberish; sono sequenze di bit.
	![](../Zimmagini/Pasted%20image%2020260518102242.jpg)

## Operazioni gestione file 
### Apertura
Per aprire un file usiamo in C una funzione che si chiama `fopen`:

```C
FILE *file;
file=fopen(char *name, char *mode);
```

Vediamo come abbiamo due puntatori, uno è name, esso ci indica il nome di come il file viene salvato il file nel filesystem; quindi ci indica la directory. Poi successivamente troviamo mode, ovvero la modalità con cui apriamo il file, la quale può essere:
- "r" in lettura (read);
- "w" in scrittura (write);
- "r+" sia in scrittura che lettura;
- "a" scrittura, aggiunta in fondo (append);
- "b" a fianco ad una delle precedenti, indica che il file è binario (se non specificato, il file è di testo);
- "rb" in lettura del file binario;
- "rb+" in lettura e scrittura del file binario;

La funzione di base ci ridarà l'indirizzo di memora del file se va bene, ma può anche ridarci NULL in caso di read se l'operazione non va a buon fine, dato che se il file non esiste ci darà NULL, in write invece creerà un file con il nome indicato; se invece con la modalità write cerchiamo di scrivere su un file READ-ONLY anche la ci darà un NULL.

Se il file non è vuoto il puntatore potrà andare a leggere fino a leggere fino allo stato di fine file, chiamato EOF (End Of File)
#### Apertura in lettura
Il file viene aperto e il EOF sarà a fine file e avremo un puntatore che partirà dalla posizione 0 a salire fino a EOF.
![](../Zimmagini/Pasted%20image%2020260504233648.png)
#### Apertura in scrittura
Quando apriamo il file in scrittura l'EOF indipendentemente se il file in precedenza fosse vuoto o no viene posizionato all'inizio, questo perché il file viene totalmente troncato, sovrascrivendo i dati che vi erano inizialmente in caso vi ci fossero dei dati.
![](../Zimmagini/Pasted%20image%2020260504233634.png)
#### Apertura in aggiunta
Quando apriamo il file questo giro EOF si trova alla posizione successiva all'ultimo elemento significativo del file, quindi se inizialmente vi erano dei dati nel file questa volta non verranno sovrascritti, ma verranno aggiunte solo informazioni.
![](../Zimmagini/Pasted%20image%2020260504233706.png)
### Lavoro
#### `fseek` - sia .txt che .bin/.dat
La funzione `fseek` subito dopo aver aperto un file ci va a scorrere a una posizione nella memoria del file precisa. I suoi parametri sono:
- Il primo parametro è il puntatore alla struttura `FILE` su cui operare;
- Il secondo parametro è Il numero di byte di cui spostarsi, chiamato offset; il quale può essere positivo per andare avanti e negativo per andare indietro
- Il terzo parametro è una fra tre costanti definite che rappresenta il punto di riferimento da cui iniziare a calcolare l'offset:
	- **`SEEK_SET`**: Inizia il conteggio dall'**inizio del file**. L'offset deve essere positivo.
	- **`SEEK_CUR`**: Inizia il conteggio dalla **posizione attuale** del cursore.
	- **`SEEK_END`**: Inizia il conteggio dalla **fine del file**. Utile per muoversi a ritroso dall'ultima posizione.

```C
FILE *f = fopen("game.bin", "rb");
// Salta i primi 10 byte dall'inizio del file
fseek(f, 10, SEEK_SET); 
fclose(f);
```
La seguente funzione sposta ci permette di spostarci alla posizione di inizio della variabile 4.

#### `ftell` - sia .txt che .bin/.dat
La funzione **`ftell`** è molto semplice poiché ha un solo parametro. Serve a dirti l'esatta posizione attuale del cursore all'interno del file e il parametro prima indicato è:
- il puntatore alla struttura `FILE` su cui operare.

```C
FILE *f = fopen("game.bin", "rb");
long posizione;

fseek(f, 0, SEEK_END);          // Si sposta alla fine del file
posizione = ftell(f);           // Legge la posizione (ovvero la dimensione del file)

printf("Il file occupa %ld byte\n", posizione);
fclose(f);
```

#### `fread` - .bin/.dat
La funzione `fread` che ci permette di lavorare con i dati interni del file. Questa funzione ci va a caricare in RAM i dati contenuti letti. Il suo output sostanzialmente è un numero che ci rappresenta gli elementi letti. I parametri di questa funzione sono:
- Il primo parametro ci rappresenta l'indirizzo di memora dove i dati letti verranno salvati;
- Il secondo parametro ci va a dire la grandezza dei blocchi in byte da leggere in memoria, calcolata in automatico tramite `sizeof()`;
- Il terzo parametro ci dice i blocchi di codice da leggere;
- Il quarto parametro infine è il puntatore alla struttura `FILE` da cui leggere.
```C
struct Player p2;
FILE *f = fopen("game.bin", "rb");
fread(&p2, sizeof(struct Player), 1, f); // Carica i dati in p2
fclose(f);
```

#### `fwrite` - .bin/.dat
Infine troviamo la funzione `fwrite`, la quale va semplicemente a stampare i dati contenuti nella memoria RAM del processo nel file. I parametri della seguente funzione sono:
- Il primo parametro è l'indirizzo di memoria della variabile che contiene i dati che vogliamo salvare nel file;
- Il secondo parametro ci va a dire la grandezza dei blocchi in byte da scrivere nel file, calcolata in automatico tramite `sizeof()`;
- Il terzo parametro rappresenta il numero degli elementi da scrivere nel file;
- Il quarto parametro infine è il puntatore alla struttura `FILE` su cui scrivere.

```C
struct Player { int id; float score; };
struct Player p1 = {1, 95.5};

FILE *f = fopen("game.bin", "wb");
fwrite(&p1, sizeof(struct Player), 1, f);
fclose(f);
```

#### `fprintf` - .txt
Questa funzione serve a scrivere dati formattati (testo, numeri, stringhe) nel file. I suoi parametri sono: 
- Il primo parametro è il puntatore al file aperto (es. quello ottenuto con `fopen`).
- Il secondo parametro è una stringa che contiene il testo da scrivere e gli specificatori di formato (come `%d`, `%s`, `%f`).
- Il secondo parameto è rappresentato da argomenti variabili, ovvero le variabili che corrispondono agli specificatori indicati nella stringa di formato.

```C
int anni = 25;
FILE *f = fopen("info.txt", "w");
fprintf(f, "L'utente ha %d anni\n", anni);
fclose(f);
```

#### `fscanf` - .txt
Questa funzione serve a leggere dati formattati dal file, interpretandoli secondo il tipo specificato. I suoi parametri sono:
- Il primo è il puntatore al file da cui leggere.
- Il secondo è la stringa con gli specificatori che indicano come interpretare i caratteri nel file (es. `%d` per un intero).
- Il terzo sono i puntatori (indirizzi di memoria) delle variabili in cui salvare i dati letti (es. `&variabile`).

```C
int valore;
FILE *f = fopen("info.txt", "r");
fscanf(f, "L'utente ha %d", &valore); // Estrae il numero 25
fclose(f);
```

#### `fgets` - .txt
È la funzione più sicura per leggere una riga di testo intera (inclusi gli spazi). I suoi parametri sono:
- Il primo parametro è un puntatore all'array di caratteri (buffer) dove verrà memorizzata la stringa letta.
- Il secondo parametro è il numero massimo di caratteri da leggere, inclusi lo zero terminale (`\0`). Di solito si passa la dimensione dell'array.
- L'ultimo parametro è il puntatore al file da cui leggere.

```C
char riga[100];
FILE *f = fopen("nota.txt", "r");
fgets(riga, 100, f); // Legge fino a 99 caratteri o al primo '\n'
fclose(f);
```

#### `fputs` - .txt
Scrive una stringa di testo nel file così com'è, senza formattazione aggiuntiva. Ha soli due parametri che sono:
- Il primo è la stringa (array di caratteri) da scrivere nel file.
- Il secondo è il puntatore al file in cui scrivere.

```C
FILE *f = fopen("nota.txt", "w");
fputs("Ciao Mondo!", f);
fclose(f);
```

#### `fgetc` - .txt
Legge un singolo carattere alla volta dal file. Ha un solo argomento che è:
- Il puntatore al file da cui prelevare il carattere.

```C
FILE *f = fopen("carattere.txt", "r");
int c = fgetc(f); // Legge un carattere (restituisce 'A')
fclose(f);
```

- _Nota_: Non ha parametri per il buffer perché restituisce il carattere letto direttamente come valore di ritorno (castato a `int`).

#### `fputc` - .txt
Scrive un singolo carattere nel file. Ha solo due argomenti molto semplici che sono:
- Il primo argomento è il singolo carattere da scrivere (passato come intero).
- Il secondo è il puntatore al file in cui scrivere il carattere.

```C
FILE *f = fopen("carattere.txt", "w");
fputc('A', f); // Scrive solo la lettera A
fclose(f);
```

### Chiusura
La chiusura si andrà a fare con la funzione in C `fclose`:
```C
fclose(file);
```

La quale ci darà 0 in caso l'operazione sarà riuscita correttamente e la costante EOF in caso non sia andata a buon fine l'operazione, che solitamente è -1.
![](../Zimmagini/Pasted%20image%2020260504234630.png)