---
title: "Tecniche di Commutazione: Circuito, Messaggio e Pacchetto"
description: "Trattazione approfondita delle tecniche di commutazione: Commutazione di Circuito (canale dedicato, PSTN), Commutazione di Messaggio (store-and-forward integrale) e Commutazione di Pacchetto (frammentazione, multiplexing statistico, Internet/IP) con tabella comparativa a tre vie."
tags:
  - sistemi-e-reti/commutazione
  - tipologia/teoria
  - commutazione-circuito
  - commutazione-messaggio
  - commutazione-pacchetto
  - datagrammi
---
# Tecniche di Commutazione: Circuito, Messaggio e Pacchetto

> [!NOTE] Definizione di Commutazione
> La **commutazione** (*switching*) e il processo con cui i nodi intermedi di una rete instradano le informazioni dall'interfaccia di ingresso a quella di uscita corretta, consentendo il collegamento tra nodi non direttamente connessi tra loro da un cavo dedicato.
> I tre paradigmi fondamentali sono:
> - **==Commutazione di Circuito:==** canale ==dedicato ed esclusivo== per l'intera durata della comunicazione.
> - **==Commutazione di Messaggio:==** trasmissione dell'==intero blocco dati senza frammentazione== con memorizzazione integrale nei nodi (*Store and Forward*).
> - **==Commutazione di Pacchetto:==** canale ==condiviso e frammentazione in pacchetti indipendenti== riordinati a destinazione.

---

## 1. La Commutazione di Circuito (*Circuit Switching*)

Tecnologia classica concepita per le telecomunicazioni vocali analogiche (rete telefonica fissa tradizionale `PSTN` / `POTS` e linee digitali `ISDN`).

![[Pasted image 20261018230756.png]]

### Le 3 Fasi Sequenziali del Collegamento

1. **==Instaurazione del circuito (*Call Setup*):==** prima di scambiare dati, la rete stabilisce un ==percorso fisico e logico continuo ed esclusivo== tra mittente e destinatario.
2. **==Trasferimento dati (*Data Transfer*):==** per l'intera durata della sessione, la banda e le tratte assegnate restano ==riservate ad uso esclusivo dei due nodi==.
3. **==Abbattimento del circuito (*Teardown*):==** al termine della sessione, le risorse impegnate vengono ==esplicitamente rilasciate== per altri utenti.

### Punti di Forza e Limiti

- **Vantaggi:** ==ritardo costante e prevedibile (*zero jitter*)==, ==banda garantita al 100%==, assenza totale di congestione causata da altri utenti.
- **Svantaggi:** ==grande spreco di risorse== (canale occupato anche durante i silenzi), ==ritardo iniziale di setup==, ==vulnerabilita critica ai guasti== (la caduta di un nodo abbatte istantaneamente la chiamata).

---

## 2. La Commutazione di Messaggio (*Message Switching*)

Storicamente collocata tra il circuito e il pacchetto, e stata utilizzata nelle prime reti telegrafiche e telescriventi (`Telex`).

### Principio Operativo: *Store and Forward* Integrale

A differenza del circuito (che richiede un percorso continuo riservato) e del pacchetto (che frammenta i dati), la commutazione di messaggio tratta l'informazione come un **==blocco unico indivisibile (l'intero messaggio)==**:

1. **==Invio al primo nodo:==** la sorgente trasmette il messaggio completo al primo nodo intermedio, senza dover instaurare preventivamente un circuito end-to-end.
2. **==Memorizzazione completa (*Store*):==** ciascun nodo intermedio riceve il messaggio per intero e lo ==salva integralmente nella propria memoria o su disco== prima di effettuare qualsiasi altra operazione.
3. **==Inoltro (*Forward*):==** una volta verificata l'integrita del messaggio e individuata la rotta corretta, il nodo ==attende che la tratta successiva sia libera== e ritrasmette l'intero blocco al nodo successivo.
4. Il processo si ripete tratta per tratta fino a destinazione.

### Punti di Forza e Limiti Critici

- **Vantaggi:** non richiede prenotazione preventiva di un circuito continuo; utilizzo piu flessibile delle linee rispetto al circuito.
- **Svantaggi e Limiti Critici:**
  - **==Ritardo di accumulo enorme (*alta latenza*):==** ogni nodo deve attendere di aver ricevuto il $100\%$ dei bit del messaggio prima di poter iniziare a trasmettere al nodo successivo. Non esiste parallelismo di trasmissione (*assenza di pipelining*).
  - **==Requisiti di memoria elevati:==** i nodi intermedi devono possedere memorie capienti per contenere messaggi di dimensione arbitraria o voluminosa, col rischio di saturazione dei buffer.
  - **==Inefficienza in caso di errore:==** se anche un solo bit risulta errato durante il transito su una tratta, **==l'intero messaggio deve essere ritrasmesso da capo==**.
  - **==Monopolio del canale:==** un messaggio molto lungo impegna completamente la linea per minuti, bloccando in coda le comunicazioni degli altri utenti.

### Ambiti Tipici ed Eredita Applicativa

- Reti telegrafiche e telescriventi storiche (*Telex* e reti militari come *AUTODIN*).
- **Eredita a livello applicativo:** il principio *Store and Forward* del messaggio e il modello operativo dei **==server di Posta Elettronica (`SMTP` / `Email`)==**, dove ciascun mail server riceve l'intera email, la memorizza su disco e la rilancia al server successivo.

---

## 3. La Commutazione di Pacchetto (*Packet Switching*)

Architettura alla base di **Internet, di tutte le reti IP, di Ethernet e dei moderni sistemi mobili (4G/5G)**. E concepita per il traffico dati a raffiche (*bursty traffic*).

![[Pasted image 20261018231051.png]]

### Fasi Operative della Trasmissione a Pacchetto

1. **==Frammentazione:==** il messaggio originale viene suddiviso in unita elementari indipendenti denominate **==Pacchetti (*datagrammi*)==**.
2. **==Intestazione (*Header*):==** a ogni frammento viene applicata un'intestazione contenente:
   - ==`IP sorgente` e `IP destinazione`==.
   - ==`Numero di sequenza`== progressivo per il riordino.
   - ==Codice di controllo errore (`Checksum` o `CRC`)==.
3. **==Instradamento autonomo (*Store and Forward* a pacchetto):==** ciascun pacchetto attraversa i router in modo indipendente: router diversi possono instradare pacchetti dello stesso messaggio su ==percorsi fisici differenti in base al traffico istantaneo==.
4. **==Riassemblaggio:==** l'host destinatario riceve i pacchetti (anche se pervenuti fuori ordine) e li ==ricompone fedelmente grazie al numero di sequenza==.

### Pipelining: Perche il Pacchetto supera il Messaggio?

Nella commutazione a pacchetto si attiva il **==pipelining (parallelismo di trasmissione)==**: mentre il Router B trasmette il *Pacchetto 1* verso il Router C, sta gia ricevendo contemporaneamente il *Pacchetto 2* dal Router A sulla tratta precedente. Questo riduce drasticamente i tempi di consegna complessivi rispetto alla commutazione di messaggio.

### Il Meccanismo del Multiplexing Statistico
Le dorsali di trasmissione non sono mai riservate a una sola persona: flussi di pacchetti appartenenti a centinaia di utenti diversi si alternano in tempo reale sulla stessa fibra ottica. Quando un utente e inattivo, la banda viene ==immediatamente allocata ai pacchetti di altri nodi==, raggiungendo un'efficienza d'uso del canale vicina al $100\%$.

### Punti di Forza e Limiti

- **Vantaggi:** ==massima efficienza del canale== (nessuno spreco nei tempi morti), ==altissima tolleranza ai guasti== (i pacchetti vengono re-instradati automaticamente su tratte alternative), in caso di errore si ritrasmette ==solo il singolo pacchetto corrotto==.
- **Svantaggi:** ==latenza variabile (*jitter*)== legata ai tempi di coda nei buffer dei router, possibile ==perdita di pacchetti (*packet loss*)== per congestione (recuperata da protocolli affidabili come `TCP`).

---

## 4. Tabella Comparativa di Sintesi

| Parametro | Commutazione di Circuito | Commutazione di Messaggio | Commutazione di Pacchetto |
| :--- | :--- | :--- | :--- |
| **Unita Trasmessa** | Flusso continuo di bit / segnale | ==Messaggio intero indivisibile== | ==Frammenti indipendenti (pacchetti/datagrammi)== |
| **Canale di Comunicazione** | ==Dedicato ed esclusivo== per l'intera sessione | Condiviso tratta per tratta | ==Condiviso dinamicamente== (multiplexing statistico) |
| **Setup Preventivo** | ==Obbligatorio== (*Call Setup*) | Assente | ==Assente== (instradamento autonomo) |
| **Memorizzazione nei Nodi** | Nessuna (transito in tempo reale) | ==Enorme (*Store and Forward* dell'intero blocco)== | Minima (buffer per singoli frame/pacchetti) |
| **Parallelismo (*Pipelining*)** | Non applicabile | ==Assente== (il nodo attende l'intero messaggio) | ==Presente== (trasmissione parallela su piu tratte) |
| **Impatto di un Errore** | Alterazione del segnale continuo | ==Ritrasmissione dell'intero messaggio== | ==Ritrasmissione del solo pacchetto errato== |
| **Efficienza delle Linee** | Bassa (spreco nei tempi morti) | Media (possibile monopolio della linea) | ==Massima== (nessuno spreco di capacita) |
| **Latenza e Jitter** | Latenza costante fissa, zero jitter | ==Latenza altissima e imprevedibile== | Latenza variabile (*jitter* da code nei buffer) |
| **Ambiti di Riferimento** | Telefonia fissa tradizionale (PSTN), ISDN | Sistemi telegrafici storici, Telex, logica Email | ==Internet, Reti IP, Ethernet, Wi-Fi, 4G, 5G== |

---

> [!TIP] Analogia di Confronto a Tre
> - **Circuito:** Prenotare un intero binario ferroviario da Milano a Roma in esclusiva per un singolo treno: nessun altro convoglio puo entrare nel percorso per tutta la durata del viaggio.
> - **Messaggio:** Spedire un enorme convoglio merci indivisibile: ogni stazione di transito deve avere uno scalo merci abbastanza capiente per accogliere l'intero treno prima di dargli il via libera per la stazione successiva.
> - **Pacchetto:** Spedire merci frazionate in centinaia di scatole postali standardizzate: viaggiano simultaneamente su furgoni diversi e strade alternative, ricomponendosi all'arrivo.

> [!SUMMARY] Sintesi Concettuale per l'Interrogazione
> - **Circuito:** canale riservato ed esclusivo. Zero jitter, banda garantita al 100%, ma ==grande spreco di risorse nei silenzi==.
> - **Messaggio:** inoltro *Store and Forward* dell'intero blocco senza frammentazione. Nessun canale dedicato, ma ==ritardi enormi e ritrasmissione totale in caso di errore==.
> - **Pacchetto:** frammentazione in datagrammi indipendenti dotati di header (`IP mittente/destinatario`, `sequenza`, `CRC`).
> - **Pipelining e Multiplexing:** il pacchetto abbatte la latenza del messaggio (trasmissione parallela tratta per tratta) e massimizza la capacita di linea (multiplexing statistico).
