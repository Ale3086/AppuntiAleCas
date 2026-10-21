---
title: "Le Reti Ethernet e lo Standard IEEE 802.3"
description: "Trattazione completa dello standard Ethernet: evoluzione storica, confronto tra Frame Ethernet II ed IEEE 802.3 (Length vs EtherType), anatomia dettagliata del MAC address a 48 bit (OUI e Seriale) ed evoluzione Full-Duplex."
tags:
  - sistemi-e-reti/topologie
  - tipologia/teoria
  - ethernet
  - mac-address
  - frame-802-3
  - ethernet-ii
---
# Le Reti Ethernet e lo Standard IEEE 802.3

> [!NOTE] Cos'è Ethernet?
> **Ethernet** è la famiglia di tecnologie dominanti per le reti locali cablate (LAN), inizialmente sviluppata dal consorzio DIX (Digital-Intel-Xerox) e successivamente standardizzata dal comitato internazionale IEEE con la specifica **==IEEE 802.3==**.
> Opera congiuntamente nei primi due livelli del modello ISO/OSI: il **==Livello 1 (Fisico)==** e il **==Livello 2 (Data Link)==**.

Nata come rete a bus su cavo coassiale condiviso (10BASE5 e 10BASE2), Ethernet si è evoluta verso una topologia a **==stella attiva su doppino ritorto o fibra ottica==**, imperniata sullo **==Switch==**.

![[Pasted image 20260428131702.png]]

---

## 1. Struttura del Frame: Ethernet II (DIX) vs IEEE 802.3

Al livello Data Link i pacchetti IP vengono incapsulati in trame (*frame*). Nel traffico Internet/IP reale lo standard adottato in modo pressoché esclusivo è **==Ethernet II==**:

![[Pasted image 20261021130008.png]]
### Confronto dei Campi del Frame

| Campo | Dimensione | Ethernet II (DIX) | IEEE 802.3 | Funzione Tecnica |
| :--- | :---: | :---: | :---: | :--- |
| **Preambolo** | 7 Byte (o 8 Byte tot.) | 8 Byte con SFD | 7 Byte alternati | Sequenza alternata `10101010` per ==sincronizzare il clock del ricevitore==. |
| **SFD (*Start Frame Delimiter*)** | 1 Byte | Incluso nell'8° byte | 1 Byte distinto | Byte `10101011`: gli ultimi due bit a '1' ==segnalano l'inizio imminente dei dati==. |
| **MAC Destinazione** | ==**6 Byte** (48 bit)== | Presente | Presente | Indirizzo fisico della scheda di rete ricevente. |
| **MAC Sorgente** | ==**6 Byte** (48 bit)== | Presente | Presente | Indirizzo fisico della scheda di rete trasmittente. |
| **Campo a 2 Byte** | **==2 Byte** (16 bit)== | ==**EtherType==** (Protocollo L3) | **==Length==** (Lunghezza dati) | **==Discriminatore:==** indica il protocollo superiore (Ethernet II) o la lunghezza in byte (802.3). |
| **Payload (Dati Utente)** | **==46 - 1500 Byte==** | Pacchetto IP puro | Dati con header LLC/SNAP | Dati di livello 3. La dimensione massima è l'**==MTU (1500 Byte)==**. Se $< 46\text{ B}$, si aggiunge *Padding*. |
| **FCS (*Frame Check Sequence*)** | ==**4 Byte** (32 bit)== | ==CRC-32== | ==CRC-32== | ==Controllo di ridondanza ciclica== per scartare trame corrotte da disturbi fisici. |

> [!NOTE] Come la Scheda di Rete Distingue i Due Frame
> La NIC analizza il valore numerico del campo a 2 Byte situato dopo il MAC sorgente:
> - Valore **==$\le 1500$==** (`0x05DC`): identifica la ==**Length** (*Frame IEEE 802.3*)==.
> - Valore **==$\ge 1536$==** (`0x0600`): identifica l'==**EtherType** (*Frame Ethernet II*)==.
>
> **Codici EtherType principali:**
> - `0x0800` $\rightarrow$ Pacchetto **==IPv4==**
> - `0x0806` $\rightarrow$ Richiesta / Risposta **==ARP==**
> - `0x86DD` $\rightarrow$ Pacchetto **==IPv6==**
> - `0x8100` $\rightarrow$ Tag VLAN **==IEEE 802.1Q==**

---

## 2. Anatomia dell'Indirizzo MAC a 48 bit

L'indirizzo MAC (*Media Access Control*) è impresso dal costruttore nella memoria ROM della scheda (**BIA - Burned-In Address**):

![[Pasted image 20261021130224.png|688]]

- **Notazione:** **==48 bit (6 Byte)==**, rappresentati da **==12 cifre esadecimali==** raggruppate a coppie (es. `05:FA:B7:93:5D:74`).
- **==OUI (*Organizationally Unique Identifier*):==** i primi **==3 Byte (24 bit)==** identificano il costruttore hardware (Intel, Cisco, Apple, Realtek), assegnati dall'IEEE.
- **==Seriale Specifico (*NIC Specific*):==** gli ultimi **==3 Byte (24 bit)==** rappresentano il codice progressivo univoco di fabbrica assegnato a quel singolo componente.

### Tipologie di Indirizzamento MAC di Destinazione

1. **==Unicast (Punto-Punto):==** diretto a una singola interfaccia. Le schede di rete terze sulla stessa LAN scartano il frame a livello hardware senza impegnare la CPU.
2. **==Multicast (Gruppo):==** diretto a un gruppo selezionato di host (prefisso standard `01:00:5E` in IPv4).
3. **==Broadcast (A Tutti):==** inviato a tutte le schede della LAN locale. Costituito da **==48 bit tutti impostati a '1'==**:
   $$\mathbf{FF:FF:FF:FF:FF:FF}$$
![[Pasted image 20260428132317.png|697]]

---

## 3. Evoluzione verso il Full-Duplex e Architettura a Switch

Nelle prime reti Ethernet su cavo coassiale e Hub, il canale fisico era condiviso: tutti i nodi operavano in **Half-Duplex**, richiedendo il protocollo di contesa **CSMA/CD** per gestire le collisioni.

Con l'adozione degli **Switch** e dei cavi a doppino ritorto (Cat 6/6A):
- Ciascuna porta dispone di ==coppie in rame fisicamente distinte per la trasmissione (Tx) e la ricezione (Rx)==.
- Il collegamento opera in modalità **==Full-Duplex simultanea==**, trasformando ogni porta in un **==dominio di collisione indipendente==**.
- Le collisioni fisiche sono eliminate: l'algoritmo **==CSMA/CD viene disabilitato==**, permettendo velocità continue da 1 Gbps a 10 Gbps e superiori.

---

> [!SUMMARY] Sintesi Concettuale per l'Interrogazione
> - **Ethernet II vs 802.3:** Ethernet II usa il campo a 2 Byte come **==EtherType==** (identifica il protocollo L3, es. `0x0800` IPv4), mentre l'802.3 originale lo usa come **==Length==**.
> - **Dimensione Payload (MTU):** min ==46 Byte==, max ==1500 Byte==.
> - **Struttura MAC:** 48 bit = ==24 bit OUI (costruttore)== + ==24 bit seriale univoco==. Broadcast = ==`FF:FF:FF:FF:FF:FF`==.
> - **Switch e Full-Duplex:** eliminano le collisioni isolando i canali Tx/Rx su ogni porta.
