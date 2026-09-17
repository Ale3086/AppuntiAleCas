## Il Protocollo CSMA/CD e le regole di conversazione
Per gestire l'accesso al mezzo di trasmissione e "mettere ordine" nelle comunicazioni, Ethernet utilizza il protocollo **CSMA/CD** (_**C**arrier **S**ense **M**ultiple **A**ccess with **C**ollision **D**etection_). 

Questa tecnica è definita come una tecnica di acceso al canale casuale, perché a differenza di quelle determinate, che non si ha rischio di collisione ma se si invia un solo messaggio il canale non è usato alla massima potenza, qua l'accesso è casuale e in caso si invia un singolo messaggio si usa l'intero canale per la trasmissione al posto che solo alcune parti definite, andando in contro però a possibili scontri. 

Questo protocollo si usa solo con le reti Ethernet quindi per cavi in fibra o rame, per collegamenti wifi cerchiamo di evitare totalmente gli scontri con CSMA/CA (_**C**arrier **S**ense **M**ultiple **A**ccess with **C**ollision **A**voidance_).
#### Il funzionamento
Questo protocollo si potrebbe analogamente collegare all'attraversamento di un incrocio, in cui ci sono vari protocolli da seguire sia quando si accede che in caso di collisione:

- **Carrier Sense (Ascolto):** Prima di trasmettere, una stazione "ascolta" il mezzo per rilevare se c'è un segnale portante (ovvero se qualcuno sta già parlando).
    
- **Multiple Access (Accesso Multiplo):** Ogni nodo ha il diritto di accedere al canale, alternandosi con gli altri.
    
- **Collision Detection (Rilevazione Collisioni):** Se due dispositivi inviano un messaggio nello stesso momento, avviene una **collisione**. Questo causa la degenerazione dei segnali e la perdita dei dati.

![[Pasted image 20260428183244.png]]

**Perché avvengono le collisioni?** Anche se il canale sembra libero, un segnale può impiegare del tempo per propagarsi lungo la linea. È come immettersi in una strada dopo aver guardato: un'auto velocissima potrebbe spuntare dietro una curva quando sei già impegnato nell'incrocio.

![[Pasted image 20260428132950.png]]
## Gestione degli errori e Algoritmo di Backoff
Se una stazione rileva una collisione mentre sta trasmettendo, deve agire immediatamente, praticamente inizia un algoritmo che invia un segale, indicando a tutti i segali che c'è stata una collisione; questo segnale smette di far inviare altre trasmissioni e quindi va a liberare il canale, andando ad aspettare un tempo casuale esponenziale per 16 tentativi prima di annullare definitivamente la trasmissione. L'algoritmo descritto segue queste fasi:

1- **Segnale di Jamming:** Invia un segnale di 32 bit per informare tutta la rete della collisione, quindi inviando un segali di broadcast.

2- **Interruzione:** Smette di trasmettere e attende che il canale torni libero.

3- **Algoritmo di Backoff:** La stazione aspetta un **tempo casuale** prima di riprovare. Questo tempo cresce in base al numero di tentativi già fatti, che indicano quanto la rete è trafficata. Il tempo quindi cresce in modo esponenziale.

4- **Limite tentativi:** Se dopo **16 tentativi** la collisione persiste, la trasmissione viene annullata.

Il tempo è randomico dato che i segali vengono trasmessi in tempi diversi e la possibilità che i segali si riscontrino è minima, dato che ognuno dei dispositivi ha un tempo casuale in cui aspetta del tempo prima di inviare il messaggio di nuovo.

![[Pasted image 20260428183441.png|536]]

## Il Protocollo CSMA/CA
Nel Wi-Fi non si usa il sistema delle reti cablate (il CSMA/CD, che rileva le collisioni _dopo_ che sono avvenute), ma si preferisce **prevenirle** prima che accadano.

### Come funziona (Il "gioco del silenzio" della rete)
Quando un dispositivo deve inviare una dei dati, segue questi passaggi obbligatori:

1. **L'ascolto (Carrier Sense):** Il dispositivo controlla il canale radio.
    - Se il canale è occupato, aspetta.
    - Se il canale è libero, non parte subito: aspetta un brevissimo tempo fisso chiamato **DIFS** (_Distributed Interframe Space_).
        
2. **La richiesta (RTS):** Passato il DIFS, il dispositivo invia un piccolo segnale di prenotazione chiamato **RTS** (_Request To Send_ - "Richiesta di invio"). È una trama di dati molto piccola proprio per evitare di scontrarsi con altri.
    
3. **Il via libera (CTS):** Se l'**Access Point (AP)** è libero, aspetta un tempo ancora più breve (il **SIFS** - _Short Interframe Space_) e risponde a tutti con un **CTS** (_Clear To Send_ - "Via libera all'invio").
    
4. **Il silenzio degli altri:** Il CTS dell'Access Point contiene un campo chiamato **duration** (durata). Quando gli altri dispositivi della rete sentono il CTS, leggono la _duration_ e si "addormentano" (stanno in silenzio) per tutto quel tempo.
    
5. **L'invio sicuro:** Ora che il canale è isolato e sicuro, il mittente invia la sua **trama** di dati senza il rischio che qualcuno lo interrompa.

![[Pasted image 20260520162338.png]]

### Il problema del "Terminale Nascosto" (_Hidden Terminal_)
Il meccanismo RTS/CTS serve soprattutto a risolvere un problema tipico del wireless: il **terminale nascosto**.

Immagina tre soggetti: due computer (_S1_ e _S2_) e l'**Access Point** al centro.

- _S1_ e _S2_ sono troppo lontani tra loro e **non si sentono** (sono "nascosti" l'uno all'altro).
    
- Però, entrambi vedono e sentono l'Access Point centrale.

Se _S1_ fa l'ascolto del canale, sente che è libero (perché non può sentire _S2_) e potrebbe trasmettere. Se lo facesse anche _S2_ nello stesso momento, i due segnali arriverebbero all'Access Point insieme, creando una **collisione** e distruggendo i dati.

**Come risolve il CSMA/CA?** Quando _S1_ manda l'**RTS** all'Access Point, l'Access Point risponde con il **CTS** a raggio totale. Anche se _S2_ non poteva sentire _S1_, **sente benissimo il CTS dell'Access Point**. Leggendo il CTS, _S2_ capisce che deve stare in silenzio per il tempo stabilito (_duration_), lasciando che _S1_ finisca di trasmettere la sua trama in tutta tranquillità.