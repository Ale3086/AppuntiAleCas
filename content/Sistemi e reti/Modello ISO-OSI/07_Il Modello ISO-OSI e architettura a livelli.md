---
title: "Il Modello ISO/OSI: Architettura a 7 Livelli e Incapsulamento"
description: "Trattazione approfondita del modello ISO/OSI: i 7 livelli funzionali, unità dati di protocollo (PDU), processo di incapsulamento e decapsulamento, livelli operativi degli apparati e confronto con TCP/IP."
tags:
  - sistemi-e-reti/iso-osi
  - tipologia/teoria
  - modello-osi
  - livelli-di-rete
  - pdu
  - incapsulamento
---
# Il Modello ISO/OSI: Architettura a 7 Livelli e Incapsulamento

> [!NOTE] Perché un'Architettura a Strati?
> Il modello **ISO/OSI (*Open Systems Interconnection*)**, standardizzato nel 1984 dall'ISO (standard **ISO 7498**), rappresenta il quadro teorico di riferimento per le reti di telecomunicazioni.
> Il suo scopo è ==**scomporre la complessità della comunicazione in 7 livelli gerarchici indipendenti**==: ciascun livello risolve un problema specifico, fornisce servizi allo strato sovrastante e richiede servizi a quello sottostante tramite interfacce standard (*information hiding*).

---

## 1. Modello Teorico di Riferimento vs Architettura Reale

- ==**Modello Teorico (ISO/OSI):**== stabilisce ==**COSA** deve fare ciascun livello== in termini astratti, garantendo l'interoperabilità tra sistemi eterogenei senza vincoli tecnologici.
- ==**Architettura Pratica (TCP/IP ed Ethernet):**== rappresenta l'implementazione tecnologica reale (==**COME** i protocolli sono codificati nei software e nei chip==).

![[WhatsApp Image 2026-04-21 at 12.37.18.jpeg]]

![[WhatsApp Image 2026-04-21 at 12.43.12.jpeg]]

---

## 2. I 7 Livelli ISO/OSI: Funzioni e PDU

I livelli sono numerati dall'1 (interfaccia fisica con il mezzo) al 7 (interfaccia applicativa con l'utente):

![[WhatsApp Image 2026-04-21 at 12.37.18.jpeg]]

| N° | Livello (IT / EN) | PDU (*Protocol Data Unit*) | Funzione Primaria | Protocolli di Esempio |
| :---: | :--- | :---: | :--- | :--- |
| **7** | ==**Applicazione**== (*Application*) | **Dati / Messaggio** | ==Interfaccia diretta con i software applicativi== usati dall'utente | `HTTP`, `HTTPS`, `DNS`, `SMTP`, `SSH`, `FTP` |
| **6** | ==**Presentazione**== (*Presentation*) | **Dati Formattati** | ==Sintassi, codifica caratteri (UTF-8), compressione e cifratura== | `TLS/SSL`, `ASCII`, `JPEG`, `MIME` |
| **5** | ==**Sessione**== (*Session*) | **Dati di Sessione** | ==Apertura, coordinamento e chiusura del dialogo==; checkpoint di ripristino | `RPC`, `NetBIOS`, `PPTP` |
| **4** | ==**Trasporto**== (*Transport*) | ==**Segmento** (TCP)<br/>**Datagramma** (UDP)== | ==Consegna end-to-end da processo a processo== tramite ==numeri di porta (`0 - 65535`)== | `TCP` (affidabile con riscontro), `UDP` (veloce non orientato alla connessione) |
| **3** | ==**Rete**== (*Network*) | ==**Pacchetto**== | ==**Instradamento geografico (*routing*)**== tra reti diverse tramite indirizzi logici ==**IP**== | `IPv4`, `IPv6`, `ICMP`, `OSPF`, `BGP` |
| **2** | ==**Linea Dati**== (*Data Link*) | ==**Trama (*Frame*)**== | ==Trasferimento affidabile locale== tra nodi adiacenti tramite indirizzi ==**MAC**== e controllo d'errore (==**FCS/CRC-32**==) | `Ethernet (IEEE 802.3)`, `Wi-Fi (802.11)`, `ARP` |
| **1** | ==**Fisico**== (*Physical*) | ==**Bit**== | ==Conversione dei bit in segnali fisici== (tensione elettrica, impulsi laser, onde radio) | Cavi UTP `Cat 6A`, fibra ottica, onde radio |

> [!TIP] Regola Mnemonica per l'Interrogazione
> - **Dall'alto al basso (7 $\rightarrow$ 1):** **A**ll **P**eople **S**eem **T**o **N**eed **D**ata **P**rocessing (*Application, Presentation, Session, Transport, Network, Data Link, Physical*).
> - **Dal basso all'alto (1 $\rightarrow$ 7):** **F**isico, **D**ata Link, **R**ete, **T**rasporto, **S**essione, **P**resentazione, **A**pplicazione.

---

## 3. Il Processo di Incapsulamento e Decapsulamento

Il passaggio delle informazioni attraverso la pila di protocolli avviene mediante l'aggiunta o rimozione sequenziale di intestazioni:

![[Pasted image 20261021125748.png]]

### Le Due Fasi del Flusso

1. ==**Incapsulamento (dal Livello 7 al Livello 1 - Trasmittente):**==
   - Ciascun livello riceve i dati dal livello sovrastante (*SDU*), vi allega la propria intestazione (==**Header**==) con le informazioni di controllo e genera la ==**PDU**== da inoltrare verso il basso.
   - Formula logica: ==$\text{PDU} = \text{Header} + \text{Dati (SDU)} + [\text{Trailer}]$==.
   - Al Livello 2 viene aggiunto anche un ==**Trailer (FCS / CRC-32)**== per la rilevazione di errori fisici di trasmissione.
2. ==**Decapsulamento (dal Livello 1 al Livello 7 - Ricevente):**==
   - Il destinatario legge i bit grezzi (L1), verifica l'integrità del frame tramite CRC e controlla il MAC scartando l'header L2 (L2), legge l'IP di destinazione scartando l'header L3 (L3), esamina la porta per smistare i dati al processo corretto (L4) e restituisce il messaggio originario all'applicazione (L7).

![[WhatsApp Image 2026-04-21 at 12.58.22.jpeg]]

---

## 4. Livelli di Funzionamento degli Apparati di Rete

Gli apparati di rete operano unicamente fino al livello necessario per la loro specifica funzione:

| Livello Operativo ISO/OSI | Dispositivo di Rete | Cosa Elabora | Ambito Operativo |
| :---: | :--- | :--- | :--- |
| ==**Livello 1 (Fisico)**== | **Hub**, Ripetitore | Segnali elettrici / bit grezzi | Rigenerazione e replica cieca del segnale (obsoleto) |
| ==**Livello 2 (Data Link)**== | **Switch**, Access Point | Indirizzi fisici hardware ==**MAC**== | Commutazione selettiva locale e isolamento delle collisioni |
| ==**Livello 3 (Rete)**== | **Router**, Switch L3 | Indirizzi logici ==**IP**== | Instradamento tra reti diverse e blocco dei broadcast |

---

> [!SUMMARY] Sintesi Concettuale per l'Interrogazione
> - **Obiettivo del Modello:** standardizzare la comunicazione dividendo le funzioni in ==7 strati modulari e indipendenti==.
> - **Nomi delle PDU da memorizzare:** Livello 4 = ==**Segmento**== (o Datagramma per UDP), Livello 3 = ==**Pacchetto**==, Livello 2 = ==**Trama (*Frame*)**==, Livello 1 = ==**Bit**==.
> - **Incapsulamento:** ogni strato aggiunge un ==**Header**== (e il livello 2 aggiunge anche il trailer ==**FCS**==); il ricevitore compie l'operazione inversa togliendo gli header.
> - **Apparati:** ==Hub a Livello 1==, ==Switch e AP a Livello 2==, ==Router a Livello 3==.
