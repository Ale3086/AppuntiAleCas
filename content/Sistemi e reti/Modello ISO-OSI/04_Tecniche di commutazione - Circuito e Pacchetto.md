---
title: "Tecniche di Commutazione: Circuito vs Pacchetto"
description: "Trattazione approfondita delle tecniche di commutazione: Commutazione di Circuito (canale dedicato, telefonia PSTN) vs Commutazione di Pacchetto (frammentazione, multiplexing statistico, Internet/IP) e tabella comparativa."
tags:
  - sistemi-e-reti/commutazione
  - tipologia/teoria
  - commutazione-circuito
  - commutazione-pacchetto
  - datagrammi
---
# Tecniche di Commutazione: Circuito vs Pacchetto

> [!NOTE] Definizione di Commutazione
> La **commutazione** (*switching*) è il processo con cui i nodi intermedi di una rete instradano le informazioni dall'interfaccia di ingresso a quella di uscita corretta, consentendo il collegamento tra nodi non direttamente connessi tra loro da un cavo dedicato.
> I due paradigmi fondamentali sono:
> - **==Commutazione di Circuito:==** canale ==dedicato ed esclusivo==.
> - **==Commutazione di Pacchetto:==** canale ==condiviso e instradamento dinamico a blocchi==.

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
- **Svantaggi:** ==grande spreco di risorse== (canale occupato anche durante i silenzi), ==ritardo iniziale di setup==, ==vulnerabilità critica ai guasti== (la caduta di un nodo abbatte istantaneamente la chiamata).

---

## 2. La Commutazione di Pacchetto (*Packet Switching*)

Architettura alla base di **Internet, di tutte le reti IP, di Ethernet e dei moderni sistemi mobili (4G/5G)**. È concepita per il traffico dati a raffiche (*bursty traffic*).

![[Pasted image 20261018231051.png]]

### Fasi Operative della Trasmissione a Pacchetto

1. **==Frammentazione:==** il messaggio originale viene suddiviso in unità elementari indipendenti denominate **==Pacchetti (*datagrammi*)==**.
2. **==Intestazione (*Header*):==** a ogni frammento viene applicata un'intestazione contenente:
   - ==`IP sorgente` e `IP destinazione`==.
   - ==`Numero di sequenza`== progressivo per il riordino.
   - ==Codice di controllo errore (`Checksum` o `CRC`)==.
3. **==Instradamento autonomo (*Store and Forward*):==** ciascun pacchetto attraversa i router in modo indipendente: router diversi possono instradare pacchetti dello stesso messaggio su ==percorsi fisici differenti in base al traffico istantaneo==.
4. **==Riassemblaggio:==** l'host destinatario riceve i pacchetti (anche se pervenuti fuori ordine) e li ==ricompone fedelmente grazie al numero di sequenza==.

### Il Meccanismo del Multiplexing Statistico
Le dorsali di trasmissione non sono mai riservate a una sola persona: flussi di pacchetti appartenenti a centinaia di utenti diversi si alternano in tempo reale sulla stessa fibra ottica. Quando un utente è inattivo, la banda viene ==immediatamente allocata ai pacchetti di altri nodi==, raggiungendo un'efficienza d'uso del canale vicina al $100\%$.

### Punti di Forza e Limiti

- **Vantaggi:** ==massima efficienza del canale== (nessuno spreco nei tempi morti), ==altissima tolleranza ai guasti== (i pacchetti vengono re-instradati automaticamente su tratte alternative).
- **Svantaggi:** ==latenza variabile (*jitter*)== legata ai tempi di coda nei buffer dei router, possibile ==perdita di pacchetti (*packet loss*)== per congestione (recuperata da protocolli affidabili come `TCP`).

---

## 3. Tabella Comparativa di Sintesi

| Parametro | Commutazione di Circuito | Commutazione di Pacchetto |
| :--- | :--- | :--- |
| **Canale di Comunicazione** | ==Dedicato ed esclusivo== per tutta la durata | ==Condiviso dinamicamente== tra tutti gli utenti |
| **Fase di Setup Preventivo** | ==Obbligatoria== (richiede tempo iniziale) | ==Assente== (i pacchetti partono subito) |
| **Percorso dei Dati** | Rigidamente fisso per tutta la sessione | ==Dinamico==: ogni pacchetto sceglie la via ottimale |
| **Efficienza delle Linee** | Bassa (la capacità non usata nei silenzi va persa) | ==Massima== (grazie al multiplexing statistico) |
| **Tolleranza ai Guasti** | Critica: la rottura di una tratta blocca tutto | ==Elevata==: i nodi successivi cambiano percorso |
| **Qualità del Canale (QoS)** | Banda garantita fissa, ritardo costante | Risorse condivise (*best-effort*), jitter variabile |
| **Ambiti di Riferimento** | Rete telefonica fissa classica (PSTN), linee ISDN | ==Internet, Reti IP, Ethernet, Wi-Fi, 4G, 5G== |

---

> [!TIP] Analogia di Confronto
> - **Circuito:** Prenotare in esclusiva un intero binario ferroviario per un singolo treno: anche se fermo in stazione, nessun altro può transitare.
> - **Pacchetto:** Spedire lettere tramite il servizio postale: ogni busta viaggia autonomamente, sfrutta i mezzi condivisi e viene riordinata all'arrivo.

> [!SUMMARY] Sintesi Concettuale per l'Interrogazione
> - **Circuito:** connessione fisica/logica riservata punto-punto. Banda garantita ma ==grande spreco di risorse nei silenzi==.
> - **Pacchetto:** frammentazione in datagrammi indipendenti dotati di header (==IP mittente/destinatario e sequenza==).
> - **Multiplexing statistico:** principio cardine di Internet in cui ==più flussi condividono dinamicamente la stessa capacità di banda==.
