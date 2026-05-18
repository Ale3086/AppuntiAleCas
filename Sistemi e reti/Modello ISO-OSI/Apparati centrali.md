//Operazioni di store forwording e funzionamento ad accensione e tabella indirizzi MAC come è strutturata

Il modo in cui i dati viaggiano dipende dall'apparato centrale utilizzato.
#### L'Hub (Il nodo "passivo")
L'hub si comporta logicamente come un bus: quando riceve un segnale su una porta, lo inoltra a **tutte le altre**. Tutte le stazioni ricevono il frame, ma solo quella destinataria lo trattiene, mentre le altre lo ignorano. Tutti i nodi collegati a un hub formano un unico **dominio di collisione**.

![697](../../Zimmagini/Pasted%20image%2020260428183553.png)
#### Lo Switch (Il nodo "intelligente")
Lo switch opera al livello **Data Link** e inoltra la trama **solo alla porta** a cui è collegato il destinatario, evitando così le collisioni.

- **Dominio di collisione:** Nello switch, ogni singola porta corrisponde a un dominio di collisione separato.
    
- **Modalità Full-Duplex:** Utilizza canali fisici separati per ricezione e trasmissione, permettendo l'invio contemporaneo di più trame senza conflitti.

![697](../../Zimmagini/Pasted%20image%2020260428183829.png)
## Come lavora lo Switch: Auto-apprendimento
Lo switch non ha bisogno di configurazione manuale; crea dinamicamente una **tabella porta-indirizzo MAC** analizzando il traffico in ingresso.

1. **Apprendimento (Sorgente):** Lo switch esamina l'indirizzo MAC di chi invia la trama e lo associa alla porta da cui è arrivata. Se l'indirizzo è già presente ma su una porta diversa, aggiorna la tabella.
    
2. **Inoltro (Destinazione):** Lo switch guarda l'indirizzo MAC del destinatario:
    - Se è presente in tabella, inoltra la trama sulla porta corrispondente.
        
    - Se **non è presente**, inoltra la trama su tutte le porte (tranne quella di provenienza), operazione chiamata **flooding**.

> **Nota sulla sicurezza:** Poiché lo switch trasmette in modo selettivo, impedisce a un computer di intercettare facilmente il traffico destinato ad altri, migliorando la sicurezza informatica della rete.

