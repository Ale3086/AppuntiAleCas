---
title: "Tipologie e Topologie delle Reti Informatiche"
description: "Classificazione completa delle reti: estensione geografica (BAN, PAN, LAN, MAN, WAN, GAN), modello di gestione (Private, Pubbliche, Enterprise, ISP, SOHO), reti miste cablate/wireless e topologie geometriche fisiche e logiche."
tags:
  - sistemi-e-reti/topologie
  - tipologia/teoria
  - lan-wan
  - topologie-di-rete
  - reti-miste
---
# Tipologie e Topologie delle Reti Informatiche

> [!NOTE] Distinzione Fondamentale
> - **==Tipologia di rete:==** definisce l'**==estensione geografica==** e la scala territoriale coperta (*quanto distano i nodi tra loro*).
> - **==Topologia di rete:==** definisce la **==geometria==** e la disposizione logica o fisica dei collegamenti (*come sono interconnessi i nodi*).

---

## 1. Classificazione per Estensione Geografica (Tipologia)

La copertura geografica determina le tecnologie trasmissive e le prestazioni della rete:

![[Pasted image 20261018224931.png|523]]

| Tipologia | Nome Esteso | Raggio Indicativo | Caratteristiche ed Esempi Pratici |
| :--- | :--- | :---: | :--- |
| **BAN** | *Body Area Network* | $< 1\text{ m}$ | ==Dispositivi a contatto corporeo==: sensori medici, pacemaker, smartwatch. |
| **PAN** | *Personal Area Network* | $\le 10\text{ m}$ | ==Spazio personale di lavoro==: periferiche Bluetooth collegate a PC o smartphone. |
| **LAN** | *Local Area Network* | $\le 1\text{ km}$ | ==Singolo edificio, scuola o ufficio==: velocità 1-10 Gbps, latenza minima ($< 1\text{ ms}$). |
| **CAN** | *Campus Area Network* | $\le 5\text{ km}$ | ==Complesso di edifici adiacenti== della stessa organizzazione (campus, aziende). |
| **MAN** | *Metropolitan Area Network* | $10 - 50\text{ km}$ | ==Scala cittadina==: anelli in fibra ottica per servizi comunali, ospedali o videosorveglianza. |
| **WAN** | *Wide Area Network* | Centinaia/Migliaia km | ==Interconnessione geografica di LAN/MAN== tramite linee di operatori telecomunicazioni. |
| **GAN** | *Global Area Network* | Globale | ==Rete planetaria== interconnessa tramite dorsali sottomarine in fibra e satelliti. |

> [!NOTE] Internet: WAN planetaria o GAN?
> Nei testi scolastici **GAN** identifica una rete globale (Internet). In ambito ingegneristico, Internet è formalmente una **==federazione mondiale di WAN interconnesse==** appartenenti a diversi *Autonomous Systems* (AS), coordinate dal protocollo di routing BGP (*Border Gateway Protocol*).

---

## 2. Modelli di Gestione e Segmentazione

| Modello | Proprietà e Controllo | Politiche di Accesso | Ambiti Tipici |
| :--- | :--- | :--- | :--- |
| **Reti Private** | Singolo utente, famiglia o azienda | Accesso ristretto e protetto da credenziali | LAN domestica, rete interna aziendale |
| **Reti Pubbliche** | Operatori di telecomunicazioni | Accesso aperto al pubblico | Hotspot urbani, reti cellulari 4G/5G |
| **Reti Enterprise** | Medie e grandi organizzazioni | Segmentazione rigida (Intranet, Extranet, DMZ) | Banche, sedi centrali e filiali remote |
| **Reti ISP** | Provider di telecomunicazioni | Dorsali di transito ad altissima capacità | Reti Tier-1 / Tier-2 di trasporto globale |
| **Reti Scolastiche / SOHO** | Istituti scolastici o piccoli uffici | Rete mista, segmentazione con Captive Portal | Aule, laboratori e uffici amministrativi |

### Segmentazione Perimetrale Enterprise

- **==Intranet:==** rete interna protetta, ==riservata esclusivamente al personale autorizzato== (gestionali interni, cartelle condivise, registri).
- **==Extranet:==** sezione protetta della rete resa accessibile a ==partner commerciali, fornitori o filiali remote tramite VPN== cifrata.
- **==DMZ (*De-Militarized Zone*):==** sottorete cuscinetto perimetrale che ==espone all'esterno i servizi pubblici (Web, DNS, mail)==. Se un server in DMZ viene compromesso, la LAN interna resta segregata e protetta.
- **==Isolamento Didattico (VLAN):==** nelle scuole, la rete cablata viene ==suddivisa in VLAN isolate== (Presidenza, Segreteria, Laboratori studenti), affiancata da Wi-Fi con Captive Portal.

---

## 3. Reti Miste (Integrazione Cablato e Wireless)

Nelle infrastrutture reali convivono due tecnologie complementari:

![[Pasted image 20261018230507.png]]

- **Infrastruttura Cablata (Ethernet RJ45 / Fibra)**:
  - ==Velocità garantita (1-10 Gbps), latenza minima (< 1 ms)== e ==totale immunità da disturbi radio==.
  - Scelta d'obbligo per nodi fissi critici: server, PC laboratorio, LIM, stampanti e dorsali switch.
- **Infrastruttura Wireless (Wi-Fi con Access Point)**:
  - Offre ==massima flessibilità e mobilità== per notebook, tablet e smartphone.
  - Canale condiviso soggetto a interferenze e attenuazione dei muri.

---

## 4. Topologia Fisica e Logica

> [!IMPORTANT] Topologia Fisica vs Topologia Logica
> - **==Topologia Fisica:==** disposizione geometrica reale di cavi e apparati (*come sono posati fisicamente i fili*).
> - **==Topologia Logica:==** percorso e modalità con cui i segnali transitano sul canale (*come viaggiano effettivamente i frame*).
> *(Esempio d'esame: una rete fisicamente collegata a **Stella** tramite un vecchio Hub opera logicamente come un **Bus condiviso**).*

![[Topologia-reti-informatiche-750x600.webp]]

### Confronto delle Topologie di Rete

| Topologia | Cablaggio | Tolleranza ai Guasti | Scalabilità | Rendimento | Ambiti d'Impiego |
| :--- | :---: | :--- | :---: | :--- | :--- |
| **Bus** | Minimo | ==Bassa== (un taglio sul cavo blocca l'intera tratta) | Bassa | Basso (contesa del mezzo) | Reti coassiali storiche (10BASE2), bus CAN industriale |
| **Stella** | Medio | ==Alta== (il guasto di un cavo isola solo quel nodo) | Alta | ==Elevato== (con switch Full-Duplex) | Reti LAN moderne (uffici, scuole, abitazioni) |
| **Albero** | Elevato | ==Buona== (guasti circoscritti al sotto-ramo) | ==Ottima== | Elevato (struttura gerarchica) | Cablaggio strutturato di interi edifici e campus |
| **Anello** | Medio | ==Critica== (l'interruzione ferma la circolazione) | Media | Deterministico (passaggio token) | Reti industriali e anelli metropolitani (doppio anello) |
| **Maglia Completa** | Massimo | ==Massima in assoluto== (percorsi ridondanti multipli) | Molto bassa | Massimo (linee dedicate punto-punto) | Dorsali critiche militari e core di data center |
| **Maglia Parziale** | Medio-alto | ==Elevata== (percorsi alternativi selezionati dai router) | Elevata | Ottimizzato dal routing IP | ==Dorsale di Internet== (rete dei provider mondiali) |

---

> [!SUMMARY] Sintesi Concettuale per l'Interrogazione
> - **Tipologia vs Topologia:** la tipologia misura l'==estensione geografica== (PAN, LAN, MAN, WAN); la topologia definisce la ==geometria di collegamento== (Stella, Bus, Anello, Maglia).
> - **Fisica vs Logica:** la disposizione visibile dei cavi (fisica) può differire da come viaggiano i bit (logica).
> - **Topologia moderna prevalente:** ==Stella fisica centrata su Switch==, strutturata ad ==Albero gerarchico== per campus ed edifici.
