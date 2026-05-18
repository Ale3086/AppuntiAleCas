Le reti Ethernet sono una particolare tecnologia usata nelle reti locali (LAN) ed è basata sullo **standard IEEE 802.3**. Nata inizialmente come rete a topologia a bus con cavi coassiali, evolvendosi col tempo in una topologia a stella, in cui il centro della rete è occupato da un dispositivo **apparato centrale** come hub o switch. Nel modello ISO/OSI l' Ethernet lavora principalmente al livello **Fisico e Data Link**. 
![](../../Zimmagini/Pasted%20image%2020260428131702.png)
## Gli indirizzi MAC
In una rete Ethernet, ogni messaggio deve avere un destinatario, indicato grazie all'**indirizzo di MAC di destinazione**, ovvero l'identificatore univoco a 48 bit (espresso in esadecimale) della scheda di rete specifica a cui è destinato un pacchetto dati in una rete locale (LAN o Wi-Fi) . L'indirizzo MAC di destinazione può essere di tre tipi:

- **Unicast:** se il messaggio è destinato a una **singola stazione** specifica.
    
- **Multicast:** se è destinato a un **gruppo di stazioni**; questo indirizzo inizia sempre con il codice **01-00-5E**.
    
- **Broadcast:** se è destinato a **tutte le stazioni** della rete (l'indirizzo è **FF:FF:FF:FF:FF:FF**).

![](../../Zimmagini/Pasted%20image%2020260428132224.png)
![536](Pasted%20image%2020260428132317.png)
## Il Protocollo CSMA/CD e le regole di conversazione
Per gestire l'accesso al mezzo di trasmissione e "mettere ordine" nelle comunicazioni, Ethernet utilizza il protocollo **CSMA/CD** (_**C**arrier **S**ense **M**ultiple **A**ccess with **C**ollision **D**etection_). Questa tecnica è definita come una tecnica di acceso al canale casuale, perché a differenza di quelle determinate, che non si ha rischio di collisione ma se si invia un solo messaggio il canale non è usato alla massima potenza, qua l'accesso è casuale e in caso si invia un singolo messaggio si usa l'intero canale per la trasmissione al posto che solo alcune parti definite, andando in contro però a possibili scontri. Questo protocollo si usa solo con le reti Ethernet quindi per cavi in fibra o rame, per collegamenti wifi cerchiamo di evitare totalmente gli scontri con CSMA/CA (_**C**arrier **S**ense **M**ultiple **A**ccess with **C**ollision **A**voidance_).
#### Il funzionamento
Questo protocollo si potrebbe analogamente collegare all'attraversamento di un incrocio, in cui ci sono vari protocolli da seguire sia quando si accede che in caso di collisione:

- **Carrier Sense (Ascolto):** Prima di trasmettere, una stazione "ascolta" il mezzo per rilevare se c'è un segnale portante (ovvero se qualcuno sta già parlando).
    
- **Multiple Access (Accesso Multiplo):** Ogni nodo ha il diritto di accedere al canale, alternandosi con gli altri.
    
- **Collision Detection (Rilevazione Collisioni):** Se due dispositivi inviano un messaggio nello stesso momento, avviene una **collisione**. Questo causa la degenerazione dei segnali e la perdita dei dati.

![](../../Zimmagini/Pasted%20image%2020260428183244.png)

**Perché avvengono le collisioni?** Anche se il canale sembra libero, un segnale può impiegare del tempo per propagarsi lungo la linea. È come immettersi in una strada dopo aver guardato: un'auto velocissima potrebbe spuntare dietro una curva quando sei già impegnato nell'incrocio.
![](../../Zimmagini/Pasted%20image%2020260428132950.png)
## Gestione degli errori e Algoritmo di Backoff
Se una stazione rileva una collisione mentre sta trasmettendo, deve agire immediatamente, praticamente inizia un algoritmo che invia un segale, indicando a tutti i segali che c'è stata una collisione; questo segnale smette di far inviare altre trasmissioni e quindi va a liberare il canale, andando ad aspettare un tempo casuale esponenziale per 16 tentativi prima di annullare definitivamente la trasmissione. L'algoritmo descritto segue queste fasi:

1- **Segnale di Jamming:** Invia un segnale di 32 bit per informare tutta la rete della collisione, quindi inviando un segali di broadcast.

2- **Interruzione:** Smette di trasmettere e attende che il canale torni libero.

3- **Algoritmo di Backoff:** La stazione aspetta un **tempo casuale** prima di riprovare. Questo tempo cresce in base al numero di tentativi già fatti, che indicano quanto la rete è trafficata. Il tempo quindi cresce in modo esponenziale.

4- **Limite tentativi:** Se dopo **16 tentativi** la collisione persiste, la trasmissione viene annullata.

Il tempo è randomico dato che i segali vengono trasmessi in tempi diversi e la possibilità che i segali si riscontrino è minima, dato che ognuno dei dispositivi ha un tempo casuale in cui aspetta del tempo prima di inviare il messaggio di nuovo.
![536](Pasted%20image%2020260428183441.png)