---
title: "Tecniche di Accesso al Canale Casuali: CSMA/CD e CSMA/CA"
description: "Trattazione approfondita dei protocolli di contesa del canale: CSMA/CD con rilevamento collisioni, segnale di Jamming e backoff esponenziale per Ethernet cablata, e CSMA/CA con handshake RTS/CTS per Wi-Fi wireless (risoluzione del terminale nascosto)."
tags:
  - sistemi-e-reti/iso-osi
  - tipologia/teoria
  - csma-cd
  - csma-ca
  - wifi
  - terminale-nascosto
---
# Tecniche di Accesso al Canale Casuali: CSMA/CD e CSMA/CA

> [!NOTE] Accesso al Mezzo Condiviso
> Quando più stazioni condividono lo stesso canale trasmissivo (un cavo coassiale o l'etere radio in Half-Duplex), è indispensabile un protocollo di coordinamento per prevenire o gestire la sovrapposizione distruttiva dei segnali:
> - Nelle reti cablate storiche (Ethernet su Hub/coassiale): ==**CSMA/CD** (*Collision Detection* - Rilevamento)==.
> - Nelle reti wireless (Wi-Fi standard IEEE 802.11): ==**CSMA/CA** (*Collision Avoidance* - Prevenzione)==.

---

## 1. Il Protocollo CSMA/CD (Reti Cablate)

Nelle reti Ethernet su mezzo condiviso, le collisioni possono verificarsi ma vengono rilevate tempestivamente tramite l'algoritmo **CSMA/CD** (*Carrier Sense Multiple Access with Collision Detection*).

![[Pasted image 20261021131403.png|700]]

### Le 3 Fasi del CSMA/CD

1. **==Carrier Sense (Ascolto del canale):==** prima di trasmettere, la scheda di rete monitora il conduttore per verificare la presenza di segnali elettrici.
2. **==Multiple Access (Accesso multiplo):==** tutte le stazioni connesse al segmento condiviso hanno ==pari diritto di impegnare il canale== non appena rilevato libero.
3. **==Collision Detection (Rilevamento collisione):==** se due host trasmettono nello stesso istante, la sovrapposizione d'onda genera un picco anomalo di tensione. La NIC rileva il picco e ==interrompe immediatamente l'invio della trama==.

![[Pasted image 20260428183244.png|700]]

### Gestione della Collisione: Jamming e Backoff Esponenziale

- **==Segnale di Jamming (32 bit):==** la stazione che rileva l'urto trasmette una sequenza di disturbo di **32 bit** per assicurarsi che tutti i transceiver della rete riconoscano la collisione e scartino i dati corrotti.
- **==Algoritmo di Backoff Esponenziale Troncato:==** ciascun nodo attende un tempo casuale prima di riascoltare il canale.
- **==Limite dei 16 Tentativi:==** l'intervallo casuale raddoppia a ogni urto. Se dopo **16 tentativi consecutivi** la trama continua a collidere, la trasmissione viene abortita con segnalazione d'errore.

---

## 2. Il Protocollo CSMA/CA (Reti Wireless Wi-Fi)

Nelle comunicazioni radio un'antenna non può emettere ad alta potenza e simultaneamente captare segnali radio deboli in arrivo: **==la Collision Detection è fisicamente impossibile via radio==**.
Lo standard Wi-Fi (IEEE 802.11) impiega quindi **CSMA/CA** (*Collision Avoidance*), concepito per **==prevenire le collisioni prima che avvengano==**.

![[Pasted image 20260520162338.png]]

### Meccanismo dell'Handshake a 4 Vie (RTS / CTS)

1. **Carrier Sense e attesa ==DIFS==:** la stazione ascolta il canale radio. Se il mezzo è libero per un tempo prefissato (**DIFS** - *Distributed Interframe Space*), predispone l'invio.
2. **==RTS (*Request To Send*):==** il mittente invia all'Access Point una breve trama di richiesta per prenotare il canale.
3. **==CTS (*Clear To Send*):==** se l'AP è libero, dopo un tempo brevissimo (**SIFS** - *Short IFS*), risponde irradiando un frame CTS ad alta potenza in broadcast.
4. **==NAV (*Network Allocation Vector*):==** il CTS contiene il campo **==Duration==** (durata dell'intera transazione). Tutte le altre stazioni che ricevono il CTS impostano il proprio timer NAV e ==rimangono in rigoroso silenzio radio==.
5. **==Invio Dati Protetto e ACK:==** la stazione trasmette i dati al riparo da interferenze e riceve dall'AP la conferma **==ACK==**.

---

### Il Problema del Terminale Nascosto (*Hidden Terminal Problem*)

L'handshake RTS/CTS risolve una criticità tipica della topologia wireless:

![[Pasted image 20261021132220.png|700]]

- **Scenario critico:** $S_1$ ed $S_2$ sono entrambe collegate all'Access Point centrale, ma ==non riescono a sentirsi tra loro== a causa di muri o distanze ($S_2$ è "nascosto" a $S_1$).
- **Senza meccanismo RTS/CTS:** $S_1$ ascolta il canale e lo sente libero (ignorando la trasmissione di $S_2$). Se entrambi inviano dati, ==i segnali collidono violentemente sull'antenna dell'Access Point.==
- **Risoluzione con RTS/CTS:** quando $S_1$ invia l'RTS, l'AP risponde con un **==CTS broadcast ad altissima potenza==**. Anche se $S_2$ non sente $S_1$, riceve il CTS dell'AP, legge la durata nel campo Duration ed ==entra in silenzio (NAV)==, consentendo a $S_1$ di completare l'invio senza collisioni.

---

> [!SUMMARY] Sintesi Concettuale per l'Interrogazione
> - **CSMA/CD (Ethernet cablata):** rileva le collisioni su rame; le stazioni inviano il segnale di **==Jamming (32 bit)==** e ricalcolano il tempo d'attesa tramite **==Backoff Esponenziale==** (max 16 tentativi).
> - **CSMA/CA (Wi-Fi):** previene le collisioni riservando il canale tramite handshake **==RTS / CTS==** e timer di silenzio **==NAV==**.
> - **Terminale Nascosto:** stazioni reciprocamente non udibili colliderebbero sull'AP comune; il **==CTS ad alta potenza dell'AP impone il silenzio a tutti==**.
