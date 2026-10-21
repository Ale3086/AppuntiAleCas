---
title: "Introduzione alle Reti Informatiche"
description: "Concetti fondamentali delle reti di calcolatori: definizione, obiettivi primari, le 5 componenti essenziali (Host, Apparati, Mezzi, Protocolli, Servizi) e il modello universale di comunicazione."
tags:
  - sistemi-e-reti/fondamenti
  - tipologia/teoria
  - reti-informatiche
  - modello-comunicazione
---
# Introduzione alle Reti Informatiche

> [!NOTE] Definizione di Rete Informatica
> Una **rete informatica** (*computer network*) è un sistema di dispositivi autonomi di elaborazione e telecomunicazione interconnessi tra loro tramite mezzi trasmissivi fisici o wireless.
> **Obiettivo primario:** ==scambiare informazioni==, ==condividere risorse== (hardware, storage, stampanti, potenza di calcolo) ed erogare servizi in modo affidabile e sicuro.

---

## 1. I 5 Componenti Costitutivi di una Rete

In qualunque infrastruttura, dalla rete domestica a Internet, operano cinque elementi coordinati:

![[Pasted image 20261018223947.png]]

### Panoramica Funzionale dei Componenti

| Componente | Ruolo Funzionale | Esempi Principali |
| :--- | :--- | :--- |
| **Host (Nodi Terminali)** | ==Originano o consumano i dati== alle estremità della rete | PC, server, smartphone, stampanti IP, LIM |
| **Apparati di Rete** | ==Instradano, commutano e filtrano== i flussi di pacchetti | Switch, Router, Access Point, Firewall, ONT |
| **Mezzi Trasmissivi** | Supporto fisico su cui viaggiano i ==segnali elettromagnetici== | Cavi in rame (UTP/STP), fibra ottica, onde radio |
| **Protocolli** | Regole comuni che rendono ==interpretabili i dati scambiati== | Standard IEEE 802.3, TCP/IP, HTTP/HTTPS |
| **Servizi** | Valore percepito concretamente dagli utenti finali | Navigazione web, posta elettronica, DNS, cloud |

---

### Dettaglio Operativo

#### Nodi Terminali (Host)
Dispositivi collocati al confine della rete (*end-systems*):
- **Postazioni utente:** ==Computer desktop, notebook e dispositivi mobili== (smartphone, tablet).
- **Server:** macchine dedicate all'==erogazione continua di risorse o servizi==.
- **Periferiche di rete:** ==Stampanti condivise, scanner e videosorveglianza IP==.
- **Dispositivi didattici e multimediali:** ==LIM (*Lavagne Interattive Multimediali*)==, smart display e telefoni VoIP.
![[Pasted image 20261021120934.png|700]]

#### Nodi Intermedi (Apparati di Rete)
Dispositivi intelligenti dedicati al trasporto e alla sicurezza del traffico:
- `Switch`: smista i frame all'interno della ==rete locale (LAN)== basandosi sugli ==indirizzi fisici MAC==.
- `Router`: interconnette ==reti logiche distinte== e determina il ==cammino ottimale (*best path*)== tramite ==indirizzi IP==.
- `Access Point (AP)`: funge da ==ponte trasparente (*bridge*)==, estendendo la LAN via radio per client Wi-Fi.
- `Firewall`: ispeziona i pacchetti e ==blocca il traffico non autorizzato== a protezione del perimetro.
- `Modem / ONT`: converte il segnale della linea esterna (rame DSL o ==fibra ottica FTTH==) nello standard Ethernet per il router.
![[Pasted image 20261021121257.png]]

#### Mezzi Trasmissivi
- **Guidati (Cablati):** cavi a doppino ritorto in rame (`UTP`/`STP` Cat 5e, 6, 6A) e ==fibre ottiche monomodali e multimodali==.
- **Non guidati (Wireless):** propagazione di ==onde radio nello spazio libero== (Wi-Fi a 2.4/5/6 GHz, ponti radio terrestri, collegamenti satellitari).

#### I 3 Pilastri di ogni Protocollo
Due macchine connesse fisicamente non possono comunicare senza un protocollo condiviso:

> [!IMPORTANT] Le tre regole cardine di un protocollo
> 1. ==Sintassi:== formato, struttura e codifica dei campi del messaggio (*come sono disposti i bit*).
> 2. ==Semantica:== significato attribuito a ciascuna informazione e azioni operative da eseguire.
> 3. ==Temporizzazione (Timing):== controllo della velocità di trasmissione, sincronizzazione e gestione del flusso.

---

## 2. Il Modello Universale della Comunicazione

Il trasferimento dati tra due nodi segue lo schema fondamentale della teoria dell'informazione:

![[Pasted image 20261018224241.png]]

$$\text{Mittente (Source)} \xrightarrow{\quad\text{Messaggio (Payload)}\quad} \text{Mezzo Trasmissivo (Canale)} \xrightarrow{\quad\text{Regole (Protocollo)}\quad} \text{Ricevitore (Destination)}$$

| Elemento | Ruolo nel Modello |
| :--- | :--- |
| **Mittente (*Sender*)** | ==Genera l'informazione originaria e la codifica== in segnale |
| **Ricevitore (*Receiver*)** | ==Rileva il segnale, lo decodifica== e ricostruisce l'informazione |
| **Mezzo Trasmissivo (*Medium*)** | ==Canale fisico o wireless== attraversato dal segnale |
| **Messaggio (*Payload*)** | ==Contenuto informativo utile== trasmesso tra le parti |
| **Protocollo** | ==Convenzioni e regole concordate== per comunicare senza ambiguità |

---

> [!SUMMARY] Sintesi Concettuale per l'Interrogazione
> - **Scopo della rete:** ==condivisione di risorse== e ==scambio rapido di dati== tra elaboratori autonomi.
> - **Host vs Apparati:** gli **Host** ==generano o consumano i dati==; gli **Apparati** (Switch a L2, Router a L3) ==li instradano e filtrano==.
> - **Mezzi e Protocolli:** i mezzi trasportano i segnali fisici; i protocolli ne determinano la ==sintassi, la semantica e la temporizzazione==.