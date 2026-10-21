---
title: "I Paradigmi di Rete: Client-Server e Peer-to-Peer (P2P)"
description: "Trattazione approfondita dei modelli architetturali di rete: paradigma Client/Server (richiesta/risposta, upload/download, chiarimento 'l'utente non è il client'), modello Peer-to-Peer (P2P paritetico) e tabella comparativa."
tags:
  - sistemi-e-reti/fondamenti
  - tipologia/teoria
  - client-server
  - peer-to-peer
  - architetture-software
---
# I Paradigmi di Rete: Client-Server e Peer-to-Peer (P2P)

> [!NOTE] Definizione di Paradigma Architetturale
> Un **paradigma di rete** stabilisce la distribuzione dei ruoli logici e la modalità di interazione tra gli host per la condivisione delle risorse e l'erogazione dei servizi.
> I due modelli cardine sono:
> - **==Client / Server:==** centralizzato e asimmetrico.
> - **==Peer-to-Peer (P2P):==** distribuito e paritetico.

---

## 1. Il Paradigma Client / Server

Costituisce l'architettura prevalente dei servizi Internet odierni (Web, email, cloud computing). Si basa su una **rigida asimmetria operativa**:

![[Pasted image 20261018224408.png]]

$$\text{Client (Avvia la connessione)} \xrightarrow{\quad\text{Richiesta (Request)}\quad} \text{Server (In ascolto passivo)} \xrightarrow{\quad\text{Risposta (Response)}\quad} \text{Client}$$

### I Due Ruoli a Confronto

- **Server (Fornitore)**:
  - Calcolatore costantemente attivo con indirizzo noto, in stato di ==**ascolto passivo** (*listening*)== su porte TCP/UDP dedicate (es. `80` per HTTP, `443` per HTTPS).
  - ==Non inizia mai la comunicazione di propria iniziativa==: attende le richieste, elabora i dati, verifica le autorizzazioni e trasmette la risposta.
- **Client (Richiedente)**:
  - Applicativo che **==inizializza attivamente la sessione==** inviando un messaggio di ==richiesta (*Request*)== verso l'indirizzo e la porta del server.
  - Riceve il flusso di ==risposta (*Response*)==, lo interpreta e lo visualizza all'utente.

---

### Direzione del Flusso Dati

- **==Upload (Caricamento):==** flusso dati da **==Client verso Server==** (es. invio di un file su Google Drive, invio di un modulo web, backup remoto).
- **==Download (Scaricamento):==** flusso dati da **==Server verso Client==** (es. ricezione del codice HTML di una pagina web, ricezione di un file, streaming video).

---

> [!IMPORTANT] Distinzione Chiave per l'Interrogazione: L'Utente non è il Client
> **==L'utente non è mai il client:==**
> - L'**Utente** è la ==persona fisica== che interagisce con mouse e tastiera.
> - Il **Client** è il ==**programma software** in esecuzione==:
>   - Nel Web: il **==Browser==** (`Chrome`, `Firefox`, `Safari`).
>   - Nella posta: il **==Client di posta==** (`Thunderbird`, `Outlook`).
>   - Nel trasferimento file: il **==Client FTP==** (`FileZilla`).
>
> Il software client converte le azioni dell'utente in pacchetti di rete conformi ai protocolli.

---

## 2. Il Paradigma Peer-to-Peer (P2P)

Nel modello paritetico non esiste gerarchia: ogni host partecipante è definito **nodo pari** (*peer*) o *servent* (*server + client*):

![[Pasted image 20261018224532.png]]

### Caratteristiche Strutturali

- **==Simmetria di ruolo:==** ogni nodo richiede risorse ad altri nodi (agendo da client) e contemporaneamente rende disponibili le proprie risorse agli altri (agendo da server).
- **==Assenza di Single Point of Failure:==** non essendoci un server centrale indispensabile, il guasto o l'uscita di singoli nodi non arresta il funzionamento della rete.
- **==Scalabilità distribuita:==** all'ingresso di nuovi nodi aumentano simultaneamente la banda disponibile e la potenza di calcolo complessiva.

### Ambiti Operativi Principali
- **Distribuzione massiva di file:** protocollo ==`BitTorrent`==: i file vengono frammentati e distribuiti orizzontalmente tra i nodi (*seeder* e *leecher*).
- **Registri distribuiti (Blockchain):** reti come ==`Bitcoin` ed `Ethereum`==, dove ogni nodo valida e memorizza le transazioni senza intermediari.
- **Comunicazione Real-Time:** sessioni dirette audio/video tramite standard ==`WebRTC`==.

---

## 3. Tabella Comparativa di Sintesi

| Parametro | Paradigma Client / Server | Paradigma Peer-to-Peer (P2P) |
| :--- | :--- | :--- |
| **Topologia Logica** | ==Centralizzata== o gerarchica | ==Totalmente distribuita== e paritaria |
| **Ruolo dei Nodi** | ==Asimmetrico== (ruoli fissi) | ==Simmetrico== (ogni nodo è sia Client sia Server) |
| **Allocazione Dati** | Concentrata su server dedicati | Frammentata e distribuita tra tutti i nodi |
| **Scalabilità** | Limitata dalle risorse fisiche del server | ==Direttamente proporzionale== al numero di nodi |
| **Resilienza ai Guasti** | Critica: ==Single Point of Failure== (se il server cade, il servizio muore) | Alta: ==nessun singolo punto di rottura== |
| **Controllo e Sicurezza** | Semplice da autenticare, tracciare e proteggere | Complessa da regolamentare e filtrare |
| **Casi d'Uso Tipici** | Siti Web, Server di posta, Cloud, Banche | BitTorrent, Blockchain, WebRTC, Reti mesh |

---

> [!SUMMARY] Sintesi Concettuale per l'Interrogazione
> - **Client / Server:** modello asimmetrico basato su ==richieste del client== e ==risposte del server in ascolto passivo==. Punto debole: ==single point of failure==.
> - **Peer-to-Peer:** modello simmetrico in cui ==ogni nodo è sia client sia server==, garantendo ==auto-scalabilità== e ==resistenza ai guasti==.
> - **Regola aurea:** il *Client* è un ==software applicativo==, mai l'utente umano.
