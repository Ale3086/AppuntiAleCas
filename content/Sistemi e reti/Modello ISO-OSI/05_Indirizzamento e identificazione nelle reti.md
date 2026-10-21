---
title: "Indirizzamento e Identificazione nelle Reti Informatiche"
description: "Guida completa alla gerarchia di indirizzamento a 4 livelli nelle reti: Indirizzi MAC (L2), Indirizzi IP (L3), Numeri di Porta (L4), Nomi di Dominio FQDN/DNS (L7) e flusso di risoluzione."
tags:
  - sistemi-e-reti/indirizzamento
  - tipologia/teoria
  - mac-address
  - ip-address
  - porte-logiche
  - fqdn-dns
---
# Indirizzamento e Identificazione nelle Reti Informatiche

> [!NOTE] Perché Coesistono Più Identificatori?
> In una rete di calcolatori non è sufficiente un unico indirizzo per recapitare un dato.
> Esiste un'analogia diretta con la posta tradizionale:
> 1. **==Nome dell'azienda o persona:==** identificatore mnemonico per l'utente (*Nome di Dominio / FQDN*).
> 2. **==Città, CAP e via:==** coordinate geografiche per gli uffici postali e i corrieri (*Indirizzo IP*).
> 3. **==Numero dell'ufficio o interno:==** identificatore dell'applicazione corretta nell'edificio (*Numero di Porta*).
> 4. **==Codice fiscale o matricola univoca:==** identità fisica non modificabile della macchina (*Indirizzo MAC*).

---

## 1. La Gerarchia a 4 Livelli di Indirizzamento

![[Pasted image 20261018231443.png]]

### 1. Livello 7 (Applicazione): Nome di Dominio (FQDN)
- **Funzione:** stringa alfanumerica ==mnemonica e leggibile per gli esseri umani== (es. `www.google.it`, `portale.istruzione.it`).
- **Risoluzione (DNS):** il servizio **==DNS (*Domain Name System*)==** traduce istantaneamente il nome testuale nel corrispondente ==indirizzo IP numerico== (interrogazioni su porta `53` UDP).

---

### 2. Livello 4 (Trasporto): Numero di Porta Logica
- **Struttura:** numero intero codificato su **==16 bit==**, con valori compresi tra ==`0` e `65535`==.
- **Multiplexing e Demultiplexing:** l'indirizzo IP consegna il pacchetto all'host corretto; il numero di porta indica al sistema operativo ==quale specifico programma o processo software deve ricevere i dati==.
- **Porte notorie (*Well-Known Ports*, intervallo `0 - 1023`):**

| Porta L4 | Protocollo | Servizio Applicativo | Caratteristiche di Sicurezza |
| :---: | :---: | :--- | :--- |
| `80` | **HTTP** | Navigazione Web non protetta | Testo in chiaro (vulnerabile a intercettazione) |
| `443` | **HTTPS** | Navigazione Web protetta | ==Cifratura end-to-end con TLS/SSL== |
| `22` | **SSH** | Accesso shell remoto sicuro | ==Cifratura asimmetrica== per login e comandi |
| `53` | **DNS** | Risoluzione Nomi $\leftrightarrow$ IP | Query rapide non cifrate su trasporto UDP |

---

### 3. Livello 3 (Rete): Indirizzo Logico IP (*Internet Protocol*)
- **Funzione:** identificatore logico assegnato a ciascuna interfaccia di rete, indispensabile per l'**==instradamento geografico (*routing*)==** tra reti diverse.
- **Formati Standard:**
  - **==IPv4:==** lungo **==32 bit (4 Byte)==**, espresso in formato decimale puntato a quattro ottetti da 0 a 255 (es. `192.168.1.50`).
  - **==IPv6:==** lungo **==128 bit (16 Byte)==**, espresso da 8 gruppi esadecimali a 4 cifre separati da due punti (es. `2001:0db8:85a3::8a2e:0370:7334`).
- **Struttura Gerarchica:**
  - ==`Network ID`==: identifica la ==sottorete logica== di appartenenza.
  - ==`Host ID`==: identifica il ==singolo dispositivo== all'interno di quella sottorete.
- **Ruolo dei Router:** i router inoltrano i pacchetti basandosi unicamente sul `Network ID`, senza dover conoscere l'ubicazione dei singoli computer del mondo.

---

### 4. Livello 2 (Data Link): Indirizzo Fisico MAC (*Media Access Control*)
- **Funzione:** identificatore fisico permanente impresso dal costruttore nella memoria ROM della scheda (**NIC**), detto **==BIA (*Burned-In Address*)==**.
- **Formato:** sequenza di **==48 bit (6 Byte)==**, rappresentata da ==12 cifre esadecimali== a coppie (es. `05:FA:B7:93:5D:74`):
  - **==Primi 3 Byte (24 bit) OUI:==** codice univoco assegnato dall'IEEE al ==produttore dell'hardware== (Cisco, Intel, Realtek, Apple).
  - **==Ultimi 3 Byte (24 bit) Seriale:==** identificativo univoco della ==singola scheda fisica==.
- **Ruolo dello Switch:** lo switch legge il MAC destinatario per recapitare la trama ==esclusivamente sulla porta fisica dell'host ricevente==.

---

## 2. Tabella Sinottica di Confronto

|        Livello ISO/OSI         | Identificatore             |                    Dimensione                    | Esempio Pratico              | Dispositivo di Riferimento        | Ambito di Validità          |
| :----------------------------: | :------------------------- | :----------------------------------------------: | :--------------------------- | :-------------------------------- | :-------------------------- |
| **Livello 7** *(Applicazione)* | **Nome di Dominio (FQDN)** |                    Variabile                     | `www.wikipedia.org`          | Utente umano, Browser, DNS        | ==Globale (mondiale)==      |
|  **Livello 4** *(Trasporto)*   | **Numero di Porta**        |           **==16 bit==** ($0 - 65535$)           | `80` (HTTP), `443` (HTTPS)   | Sistema Operativo (stack TCP/UDP) | ==Interno all'host==        |
|     **Livello 3** *(Rete)*     | **Indirizzo IP**           | **==32 bit==** (IPv4)<br/>**==128 bit==** (IPv6) | `192.168.1.1`<br/>`10.0.0.5` | ==Router==, Gateway L3, Firewall  | ==Globale e geografico==    |
|  **Livello 2** *(Data Link)*   | **Indirizzo MAC**          |             **==48 bit==** (6 Byte)              | `05:FA:B7:93:5D:74`          | ==Switch==, Scheda di Rete (NIC)  | ==Locale alla singola LAN== |

---

## 3. Flusso Operativo di Risoluzione (Caso Concreto)

Cosa avviene quando un host locale contatta `https://www.scuola.edu.it`:

![[Pasted image 20261018231938.png]]

1. **Richiesta applicativa (L7):** l'utente inserisce l'URL nel browser web.
2. **Interrogazione DNS (Porta 53 UDP):** il PC invia una query al server DNS per ==tradurre l'FQDN nell'IP numerico corrispondente==.
3. **Risposta DNS:** il DNS restituisce l'indirizzo logico del server di destinazione (`203.0.113.25`).
4. **Verifica della sottorete (Subnet Mask):** il PC rileva che l'IP è esterno alla propria LAN locale e determina che il pacchetto va inoltrato al **==Default Gateway (il Router)==**.
5. **Risoluzione ARP locale:** il PC invia una richiesta ARP (o consulta la cache ARP) per scoprire l'==indirizzo MAC fisico dell'interfaccia del Router==.
6. **Incapsulamento e trasmissione:** il pacchetto IP viene incapsulato in una trama Ethernet avente come ==MAC Dest quello del Router==.
7. **Instradamento geografico:** il router riceve la trama, estrae il pacchetto IP e lo instrada lungo la rete geografica fino al web server finale.

---

> [!SUMMARY] Sintesi Concettuale per l'Interrogazione
> - **Chi legge cosa:** l'utente usa i ==nomi FQDN==; il SO smista sui ==numeri di porta==; i router instradano su base ==IP logico==; gli switch commutano su base ==MAC fisico==.
> - **MAC (L2):** ==48 bit fisici== (24 bit OUI costruttore + 24 bit seriale), valido solo nella LAN locale.
> - **IP (L3):** ==32 bit (IPv4) o 128 bit (IPv6)== logici e gerarchici (`Network ID` + `Host ID`), instradabili su scala mondiale.
> - **Porte (L4):** ==16 bit==, permettono a più applicazioni aperte sullo stesso host di comunicare in parallelo senza conflitti.
