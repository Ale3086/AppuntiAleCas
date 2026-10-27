---
title: "Classificazione della Rete e Topologie"
description: "Classificazione completa delle reti: estensione geografica (PAN, LAN, MAN, WAN), modelli di gestione, mezzi trasmissivi (rame, fibra, wireless) e topologie fisiche e logiche."
tags:
  - sistemi-e-reti/topologie
  - tipologia/teoria
  - lan-wan
  - topologie-di-rete
  - mezzi-trasmissivi
---
# Classificazione della Rete e Topologie

> [!NOTE] Criteri Fondamentali di Classificazione
> - **==Estensione geografica (Tipologia):==** la scala territoriale coperta (*quanto distano i nodi tra loro*).
> - **==Mezzo trasmissivo:==** il supporto fisico o non guidato utilizzato per il trasporto dei segnali (*rame, fibra, onde radio*).
> - **==Topologia:==** la disposizione geometrica fisica e il percorso logico dei dati (*come sono collegati i nodi*).

---

## 1. Classificazione per Estensione Geografica (Tipologia)

La copertura geografica determina le tecnologie trasmissive e le prestazioni della rete:

![[Pasted image 20261018224931.png|523]]

| Tipologia | Nome Esteso | Raggio Indicativo | Caratteristiche ed Esempi Pratici |
| :--- | :--- | :---: | :--- |
| **BAN** | *Body Area Network* | $< 1\text{ m}$ | ==Dispositivi a contatto corporeo==: sensori medici, pacemaker, smartwatch. |
| **PAN** | *Personal Area Network* | $\le 10\text{ m}$ | ==Spazio personale di lavoro==: periferiche Bluetooth collegate a PC o smartphone. |
| **LAN** | *Local Area Network* | $\le 1\text{ km}$ | ==Singolo edificio, scuola o ufficio==: velocita 1-10 Gbps, latenza minima ($< 1\text{ ms}$). |
| **CAN** | *Campus Area Network* | $\le 5\text{ km}$ | ==Complesso di edifici adiacenti== della stessa organizzazione (campus, aziende). |
| **MAN** | *Metropolitan Area Network* | $10 - 50\text{ km}$ | ==Scala cittadina==: anelli in fibra ottica per servizi comunali, ospedali o videosorveglianza. |
| **WAN** | *Wide Area Network* | Centinaia/Migliaia km | ==Interconnessione geografica di LAN/MAN== tramite linee di operatori telecomunicazioni. |
| **GAN** | *Global Area Network* | Globale | ==Rete planetaria== interconnessa tramite dorsali sottomarine in fibra e satelliti. |

> [!NOTE] Internet: WAN planetaria o GAN?
> Nei testi scolastici **GAN** identifica una rete globale (Internet). In ambito ingegneristico, Internet e formalmente una **==federazione mondiale di WAN interconnesse==** appartenenti a diversi *Autonomous Systems* (AS), coordinate dal protocollo di routing BGP (*Border Gateway Protocol*).

---

## 2. Modelli di Gestione e Segmentazione

| Modello | Proprieta e Controllo | Politiche di Accesso | Ambiti Tipici |
| :--- | :--- | :--- | :--- |
| **Reti Private** | Singolo utente, famiglia o azienda | Accesso ristretto e protetto da credenziali | LAN domestica, rete interna aziendale |
| **Reti Pubbliche** | Operatori di telecomunicazioni | Accesso aperto al pubblico | Hotspot urbani, reti cellulari 4G/5G |
| **Reti Enterprise** | Medie e grandi organizzazioni | Segmentazione rigida (Intranet, Extranet, DMZ) | Banche, sedi centrali e filiali remote |
| **Reti ISP** | Provider di telecomunicazioni | Dorsali di transito ad altissima capacita | Reti Tier-1 / Tier-2 di trasporto globale |
| **Reti Scolastiche / SOHO** | Istituti scolastici o piccoli uffici | Rete mista, segmentazione con Captive Portal | Aule, laboratori e uffici amministrativi |

### Segmentazione Perimetrale Enterprise

- **==Intranet:==** rete interna protetta, ==riservata esclusivamente al personale autorizzato== (gestionali interni, cartelle condivise, registri).
- **==Extranet:==** sezione protetta della rete resa accessibile a ==partner commerciali, fornitori o filiali remote tramite VPN== cifrata.
- **==DMZ (*De-Militarized Zone*):==** sottorete cuscinetto perimetrale che ==espone all'esterno i servizi pubblici (Web, DNS, mail)==. Se un server in DMZ viene compromesso, la LAN interna resta segregata e protetta.
- **==Isolamento Didattico (VLAN):==** nelle scuole, la rete cablata viene ==suddivisa in VLAN isolate== (Presidenza, Segreteria, Laboratori studenti), affiancata da Wi-Fi con Captive Portal.

---

## 3. Classificazione per Mezzo Trasmissivo

I canali di comunicazione si suddividono in **mezzi guidati** (cablati su supporto fisico) e **mezzi non guidati** (onde elettromagnetiche nello spazio libero):

| Mezzo Trasmissivo | Tipologia, Tecnologie e Caratteristiche |
| :--- | :--- |
| **Doppino in rame (UTP / STP)** | **Mezzo guidato (segnali elettrici):** cavo a coppie intrecciate con connettore RJ45 (Cat 5e, 6, 6A, 7). Standard per le LAN cablate fino a 100 metri. Economico e flessibile, ma ==sensibile a interferenze elettromagnetiche ed attenuazione== su lunghe distanze. |
| **Fibra ottica (Monomodale / Multimodale)** | **Mezzo guidato (impulsi di luce):** filamenti sottili di vetro o polimeri. Garantisce ==altissima velocita (10-100+ Gbps), distanze elevate (decine di km)== e ==totale immunita da disturbi elettromagnetici==. Impiegata per dorsali (*backbone*), data center e collegamenti FTTH (*Fiber to the Home*). |
| **Cavo coassiale** | **Mezzo guidato (rame schermato):** conduttore centrale protetto da calza metallica. Impiegato storicamente nelle prime reti Ethernet (10BASE2/10BASE5) e oggi negli impianti TV, parabole satellitari e videosorveglianza analogica/digitale. |
| **Onde radio (Wi-Fi / Bluetooth)** | **Mezzo non guidato (radiofrequenza):** trasmissione nell'etere su bande senza licenza (2.4 GHz, 5 GHz, 6 GHz). Offre ==massima mobilita e flessibilita== per dispositivi personali (smartphone, notebook), ma con banda condivisa soggetta a interferenze e attenuazione dei muri. |
| **Ponti radio e Microonde** | **Mezzo non guidato (linea di vista):** onde radio ad alta frequenza tra antenne direzionali a vista ottica (*line-of-sight*). Utilizzati per collegare sedi remote distanti diversi chilometri senza posare cavi fisici. |
| **Satelliti** | **Mezzo non guidato (spaziale):** comunicazioni a radiofrequenza con satelliti in orbita (LEO a bassa quota o geostazionari GEO). Ideali per coprire zone remote, aree rurali, navi e aerei non raggiunti dalla fibra. |

### Reti Miste (Integrazione Cablato e Wireless)

Nelle infrastrutture reali convivono entrambe le soluzioni:

![[Pasted image 20261018230507.png]]

- **Infrastruttura Cablata (Ethernet RJ45 / Fibra):** ==velocita garantita (1-10 Gbps), latenza minima (< 1 ms)== e massima stabilita per nodi fissi critici (server, PC laboratorio, LIM, dorsali switch).
- **Infrastruttura Wireless (Wi-Fi con Access Point):** ==mobilita e flessibilita di accesso== per notebook, tablet e smartphone tramite punti di accesso collegati allo switch.

---

## 4. Topologia Fisica e Logica

> [!IMPORTANT] Topologia Fisica vs Topologia Logica
> - **==Topologia Fisica:==** disposizione geometrica reale di cavi e apparati (*come sono posati fisicamente i fili*).
> - **==Topologia Logica:==** percorso e modalita con cui i segnali transitano sul canale (*come viaggiano effettivamente i frame*).
> *(Esempio d'esame: una rete fisicamente collegata a **Stella** tramite un vecchio Hub opera logicamente come un **Bus condiviso**).*

![[Topologia-reti-informatiche-750x600.webp]]

### Confronto delle Topologie di Rete

| Topologia | Cablaggio | Tolleranza ai Guasti | Scalabilita | Rendimento | Ambiti d'Impiego |
| :--- | :---: | :--- | :---: | :--- | :--- |
| **Bus** | Minimo | ==Bassa== (un taglio sul cavo blocca l'intera tratta) | Bassa | Basso (contesa del mezzo) | Reti coassiali storiche (10BASE2), bus CAN industriale |
| **Stella** | Medio | ==Alta== (il guasto di un cavo isola solo quel nodo) | Alta | ==Elevato== (con switch Full-Duplex) | Reti LAN moderne (uffici, scuole, abitazioni) |
| **Albero** | Elevato | ==Buona== (guasti circoscritti al sotto-ramo) | ==Ottima== | Elevato (struttura gerarchica) | Cablaggio strutturato di interi edifici e campus |
| **Anello** | Medio | ==Critica== (l'interruzione ferma la circolazione) | Media | Deterministico (passaggio token) | Reti industriali e anelli metropolitani (doppio anello) |
| **Maglia Completa** | Massimo | ==Massima in assoluto== (percorsi ridondanti multipli) | Molto bassa | Massimo (linee dedicate punto-punto) | Dorsali critiche militari e core di data center |
| **Maglia Parziale** | Medio-alto | ==Elevata== (percorsi alternativi selezionati dai router) | Elevata | Ottimizzato dal routing IP | ==Dorsale di Internet== (rete dei provider mondiali) |

---

> [!SUMMARY] Sintesi Concettuale per l'Interrogazione
> - **Estensione geografica (Tipologia):** la portata della rete (PAN, LAN, MAN, WAN, GAN).
> - **Mezzo trasmissivo:** guidato (rame UTP per LAN, fibra ottica per dorsali/FTTH) vs non guidato (Wi-Fi per mobilita, ponti radio per distanze a vista).
> - **Topologia Fisica vs Logica:** la geometria visibile dei cavi (fisica) puo differire dal percorso effettivo dei segnali (logica).
> - **Standard odierno:** ==Stella fisica centrata su Switch==, organizzata ad ==Albero gerarchico== per campus ed edifici complessi.
