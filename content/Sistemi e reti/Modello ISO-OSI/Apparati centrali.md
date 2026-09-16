Il modo in cui i dati viaggiano dipende dall'apparato centrale utilizzato.
## L'Hub (Il nodo "passivo")
L'hub si comporta logicamente come un bus: quando riceve un segnale su una porta, lo inoltra a **tutte le altre**. Tutte le stazioni ricevono il frame, ma solo quella destinataria lo trattiene, mentre le altre lo ignorano. Tutti i nodi collegati a un hub formano un unico **dominio di collisione**.

![|697](../../Zimmagini/Pasted%20image%2020260428183553.png)
## Lo Switch (Il nodo "intelligente")
Lo switch opera al livello **Data Link** e inoltra la trama **solo alla porta** a cui Ã¨ collegato il destinatario, evitando cosÃ¬ le collisioni.

- **Dominio di collisione:** Nello switch, ogni singola porta corrisponde a un dominio di collisione separato.
    
- **ModalitÃ  Full-Duplex:** Utilizza canali fisici separati per ricezione e trasmissione, permettendo l'invio contemporaneo di piÃ¹ trame senza conflitti.

![|697](../../Zimmagini/Pasted%20image%2020260428183829.png)
### Come lavora lo Switch: Auto-apprendimento
Lo switch non ha bisogno di configurazione manuale; crea dinamicamente una **tabella porta-indirizzo MAC** analizzando il traffico in ingresso.

![|697](../../Zimmagini/Pasted%20image%2020260519123209.png)

Il suo funzionamento si divide in due operazioni, la prima che serve per capire a chi mandare un messaggio, stabilendo un handshake che va a identificare che quel rispettivo indirizzo MAC corrisponde a quella precisa porta; la seconda che va a mandare l'informazione sia se giÃ  sappiamo l'indirizzo di destinazione MAC sia se no.

1. **Apprendimento (Sorgente):** Lo switch esamina l'indirizzo MAC di chi invia l'informazione e lo associa alla porta da cui Ã¨ arrivata. Se l'indirizzo Ã¨ giÃ  presente ma su una porta diversa, aggiorna la tabella, se invece non era presente lo mette nella tabella degli indirizzi MAC. Questa Ã¨ chiamata un'operazione di store.
    
2. **Inoltro (Destinazione):** Lo switch guarda l'indirizzo MAC del destinatario con un'operazione di forwarding:
    - Se Ã¨ presente in tabella, inoltra l'informazione sulla porta corrispondente.
        
    - Se **non Ã¨ presente**, inoltra l'informazione su tutte le porte (tranne quella di provenienza), operazione chiamata **flooding**.

> **Nota sulla sicurezza:** PoichÃ© lo switch trasmette in modo selettivo, impedisce a un computer di intercettare facilmente il traffico destinato ad altri, migliorando la sicurezza informatica della rete.

![](../../Zimmagini/Pasted%20image%2020260520164836.png)
### Spoofing
E' una particolare tecnica usata da hacker informatici in cui si va a rubare o falsificare l'identitÃ  di un dispositivo o di un utente (usando un indirizzo MAC in questo caso, ma anche un IP o un'email falsa) per ingannare la rete. Serve a superare i blocchi di sicurezza e a intercettare i dati altrui senza farsi scoprire. Questa particolare tecnica si utilizza seguendo tre passaggi ben definiti.

![](../../Zimmagini/Pasted%20image%2020260520163914.jpg)
#### 1. La Fase di Ricognizione (Trovare il Target)
L'attaccante deve prima identificare l'indirizzo MAC della vittima (Dispositivo A) e idealmente quello del Gateway (il router). Questo serve a capire quale identitÃ  "rubare" per intercettare il flusso di dati interessante.

#### 2. L'Avvelenamento della Tabella (L'Inganno)
L'attaccante invia pacchetti di rete falsificati in cui inserisce come mittente il MAC della vittima, ma i pacchetti partono dalla porta fisica dell'attaccante.

- Lo switch, vedendo arrivare quel MAC da una nuova porta, si aggiorna istantaneamente.
    
- Cancella il vecchio collegamento `[MAC Vittima -> Porta della Vittima]` e lo sostituisce con `[MAC Vittima -> Porta dell'Attaccante]`.

#### 3. L'Intercettazione e l'Inoltro (Ottenere i Dati)
Da quel momento, ogni volta che un altro dispositivo (es. il router) invia dati destinati alla vittima, lo switch consulta la tabella e consegna i pacchetti direttamente sulla porta dell'attaccante.

Per evitare che la vittima si accorga dell'interruzione di linea (generando un Denial of Service visibile), l'attaccante deve fare in modo che il suo computer legga i dati e, un millisecondo dopo, li rispedisca indietro verso la reale porta della vittima. Questo crea un imbuto invisibile in cui tutti i dati passano prima dall'attaccante.
