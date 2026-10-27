---
title: "Gli Apparati di Rete: Hub, Switch, Access Point, Router, ONT e Firewall"
description: "Trattazione completa degli apparati di rete: Nodi terminali (Host) vs intermedi, NIC, Hub (L1), Switch (L2 e CAM table), Access Point (Wi-Fi), Modem vs ONT (FTTH), Router (L3), Firewall, modalità di trasmissione (Simplex/Duplex) e domini di collisione/broadcast."
tags:
  - sistemi-e-reti/dispositivi
  - tipologia/teoria
  - switch
  - hub
  - router
  - access-point
  - ont-fibra
  - firewall
  - domini-di-collisione
---
# Gli Apparati di Rete: Hub, Switch, Access Point, Router, ONT e Firewall

> [!NOTE] Nodi Terminali (Host) vs Nodi Intermedi (Apparati)
> All'interno di qualsiasi architettura di rete distinguiamo due categorie di dispositivi:
> - **==Nodi Terminali (*Host*):==** dispositivi finali che ==originano o consumano il payload== (PC fissi, notebook, server, stampanti di rete, telefoni VoIP, smartphone, telecamere IP e LIM - *Lavagne Interattive Multimediali*).
> - **==Nodi Intermedi (*Apparati di Rete*):==** dispositivi dedicati a ==interconnettere, instradare, commutare, filtrare o rigenerare== i flussi di dati (NIC, Hub, Switch, Access Point, Modem, ONT, Router, Firewall).

![[Pasted image 20261021123237.png|700]]*

---

## 1. La Scheda di Rete (NIC)

La **NIC (*Network Interface Card*)** è l'interfaccia hardware fondamentale presente in ogni dispositivo host (PC, server, stampante, smartphone) per consentire l'accesso al mezzo trasmissivo (cavo in rame, fibra ottica o onde radio).

Opera a cavallo tra **==Livello 1 (Fisico)==** e **==Livello 2 (Data Link)==**:

- **Funzioni di Livello 1 (Fisico):**
  - ==Conversione Parallelo/Seriale:== converte i dati paralleli del bus interno del calcolatore (PCIe) nel flusso seriale di bit inviato sul cavo o nell'etere (e viceversa in ricezione).
  - ==Transceiver (PHY):== trasmettitore/ricevitore che genera e rileva i segnali fisici (impulsi elettrici sul doppino RJ45, luce nella fibra ottica, onde radio nel Wi-Fi).
  - ==Auto-negoziazione:== rileva e concorda automaticamente con l'apparato connesso (lo Switch) la massima velocità supportata (10/100/1000 Mbps o 2.5/10 Gbps) e la modalità operativa (Half-Duplex o Full-Duplex).
- **Funzioni di Livello 2 (Data Link):**
  - ==Indirizzo Fisico MAC:== custodisce impresso nella memoria ROM permanente il codice univoco a 48 bit, detto **==BIA (*Burned-In Address*)==**.
  - ==Incapsulamento e Formattazione Trame:== assembla i frame Ethernet aggiungendo intestazione (*header*) e coda di controllo (*trailer FCS/CRC*).
  - ==Controllo di Errore (CRC-32):== calcola il codice di ridondanza in trasmissione e lo ricalcola all'arrivo; se il frame risulta corrotto, la scheda lo ==scarta immediatamente senza impegnare la CPU==.
  - ==Filtraggio Hardware dei Frame:== in ricezione ordinaria, la NIC legge il MAC di destinazione e accetta solo le trame dirette al proprio MAC fisico, al broadcast (`FF:FF:FF:FF:FF:FF`) o ai gruppi multicast a cui appartiene, scartando tutte le altre.
  - ==Modalità Promiscua (*Promiscuous Mode*):== configurazione speciale (utilizzata dai software di analisi come *Wireshark*) che disattiva il filtro hardware, permettendo alla NIC di catturare **tutti i frame in transito** sul segmento di rete.

---

## 2. L'Hub (Ripetitore Multiporta di Livello 1)

L'**Hub** è un apparato puramente fisico (**==Livello 1 - Fisico==**). Non esamina gli indirizzi MAC o IP: si limita a ricevere i bit elettrici su una porta e a rigenerarli replicandoli su tutte le altre porte (==broadcasting elettrico passivo==).

![[Pasted image 20260428183553.png|697]]

### Limiti Strutturali dell'Hub
- **==Topologia a bus condiviso:==** tutti i nodi collegati condividono la stessa linea trasmissiva.
- **==Unico grande dominio di collisione:==** se due stazioni trasmettono nello stesso istante, i segnali collidono sul conduttore corrompendo le trame.
- **==Funzionamento Half-Duplex:==** la trasmissione può avvenire in un solo verso alla volta.
- **==Stato tecnologico:==** **completamente obsoleto**, sostituito ovunque dallo Switch.

---

## 3. Lo Switch (Nodo Intelligente di Livello 2)

Lo **Switch** opera a livello di collegamento dati (**==Livello 2 - Data Link==**). Esamina l'indirizzo MAC di destinazione memorizzato nell'header della trama Ethernet e inoltra il traffico in modo selettivo ==esclusivamente sulla porta specifica del reale destinatario==.

![[Pasted image 20260428183829.png|697]]

### Proprietà Architetturali dello Switch
- **==Segmentazione dei domini di collisione:==** **ogni singola porta dello switch costituisce un dominio di collisione separato e indipendente**.
- **==Modalità Full-Duplex:==** grazie a coppie distinte per trasmissione (Tx) e ricezione (Rx), i nodi possono trasmettere e ricevere contemporaneamente a velocità piena, ==eliminando totalmente il rischio di collisioni==.

### Algoritmo di Auto-Apprendimento e Tabella CAM
Lo switch è un apparato *plug-and-play*: crea e mantiene dinamicamente in memoria una tabella denominata **MAC Table** (o ==**CAM Table** - *Content Addressable Memory*==) che mappa ciascuna porta fisica con l'indirizzo MAC collegato.

![[Pasted image 20260519123209.png|697]]

![[Pasted image 20261021123546.png]]

L'elaborazione di ogni trama in transito segue due fasi logiche:

1. **==Fase di Apprendimento (*Learning* sul MAC Sorgente):==**
   - Lo switch esamina l'indirizzo MAC del mittente e la porta fisica da cui è pervenuto il frame.
   - Crea o aggiorna la voce `[MAC Sorgente -> Porta]`, impostando un ==timer di decadimento (*aging timer*, tipicamente 300 secondi)== per cancellare le voci se il PC viene scollegato.
2. **==Fase di Inoltro (*Forwarding* sul MAC Destinazione):==**
   - Lo switch verifica l'indirizzo MAC del destinatario nella tabella CAM:
     - **Voce presente (Unicast noto):** invia il frame ==solo su quella precisa porta fisica== (**Forwarding Selettivo**).
     - **Voce assente o MAC Broadcast (`FF:FF:FF:FF:FF:FF`):** replica la trama su ==tutte le altre porte tranne quella da cui è entrato==. Questa operazione prende il nome di **==Flooding==**.

![[Pasted image 20260520164836.png]]

---

### Minacce di Sicurezza L2: MAC Spoofing e ARP Poisoning

Il meccanismo dinamico di apprendimento della CAM table può essere bersaglio di manipolazioni malevole:

![[Pasted image 20260520163914.jpg]]

1. **Ricognizione:** l'attaccante individua il MAC address del gateway (router) e della stazione target.
2. **==Avvelenamento della CAM table (MAC Spoofing):==** l'hacker genera trame contraffatte con MAC sorgente falsificato pari a quello della vittima. Lo switch associa la porta dell'hacker al MAC della vittima.
3. **==Intercettazione (*Man-in-the-Middle*):==** i frame destinati alla vittima vengono deviati verso la porta dell'attaccante, che può analizzarli, manipolarli e ritrasmetterli per non destare sospetti.

---

## 4. L'Access Point (AP - Ponte Cablato/Wireless)

L'**Access Point (AP)** opera al **==Livello 2 (Data Link)==** come un **==ponte trasparente (*bridge*)==** tra la rete locale cablata su standard **==Ethernet (IEEE 802.3)==** e la rete a radiofrequenza su standard **==Wi-Fi (IEEE 802.11)==**.

![[Pasted image 20261021123851.png]]

- **==Alimentazione PoE (*Power over Ethernet*):==** riceve alimentazione elettrica direttamente dal cavo di rete UTP, senza richiedere prese a parete.
- **==Banda a 2.4 GHz:==** maggiore raggio e copertura dei muri, ma molto congestionata con soli ==3 canali non sovrapposti (`1`, `6`, `11`)== e disturbi da forni a microonde e Bluetooth.
- **==Banda a 5 GHz:==** velocità dati superiori e zero interferenze domestiche; raggio di copertura inferiore e attenuazione maggiore dai muri spessi.
- **==Controllo di accesso:==** coordina le stazioni tramite il protocollo **==CSMA/CA con handshake RTS/CTS==** sul canale radio condiviso (vedi [[09_Tecniche di accesso al canale casuali#Il Protocollo CSMA/CA|approfondimento sul CSMA/CA]]).

---

## 5. Modem vs ONT (Optical Network Terminal)

Sebbene spesso confusi nelle installazioni domestiche, i due apparati svolgono conversioni fisiche completamente diverse:

![[Pasted image 20261021124104.png]]

| Parametro | MODEM (*Modulator / Demodulator*) | ONT (*Optical Network Terminal*) |
| :--- | :--- | :--- |
| **Infrastruttura** | Reti in rame xDSL (ADSL2+, VDSL2 / FTTC) | Reti in pura ==fibra ottica FTTH== (GPON / XGS-PON) |
| **Conversione Segnale** | Converte bit digitali in ==frequenze audio analogiche modulate== sul doppino in rame | Converte ==impulsi luminosi laser== in ==segnali elettrici Ethernet standard== |
| **Velocità Tipica** | Da 20 Mbps (ADSL) fino a 100-200 Mbps (VDSL2) | Da **==1 Gbps fino a 2.5 o 10 Gbps==** simmetrici |
| **Interfacce Fisiche** | Ingresso telefonico RJ11 $\rightarrow$ Uscita dati RJ45 | Connettore ottico verde ==SC/APC== $\rightarrow$ Porta Gigabit RJ45 |

---

## 6. Il Router 

Il **Router** opera al **==Livello 3 (Rete)==** con il compito di connettere reti logiche distinte (ad esempio la LAN interna della scuola con la WAN dell'ISP):
- **Instradamento logico:** esamina l'**==indirizzo IP di destinazione==** contenuto nel pacchetto.
- **Routing Table:** determina l'interfaccia di uscita ottimale (*Best Path*) consultando tabelle e algoritmi di instradamento.
- **==Isolamento dei domini di broadcast:==** il router **==blocca categoricamente le trame di broadcast (`FF:FF:FF:FF:FF:FF`)==**, isolando il traffico rumoroso all'interno della singola LAN.

---

## 7. Il Firewall (Sicurezza Perimetrale)

Il **Firewall** è un apparato hardware o software collocato sul perimetro tra la rete fidata (LAN) e la rete non fidata (Internet) per controllare e filtrare il traffico in transito:

![[Pasted image 20261021124554.png]]

---

## 8. Modalità di Trasmissione: Simplex, Half-Duplex e Full-Duplex

| Modalità | Direzione del Flusso | Contemporaneità | Rischio Collisioni | Esempi Pratici |
| :--- | :---: | :---: | :---: | :--- |
| **Simplex** | ==Unidirezionale fissa== ($A \rightarrow B$) | No | Nullo | Tastiera/mouse verso PC, sensore industriale |
| **Half-Duplex** | ==Bidirezionale alternata== ($A \rightarrow B$ o $B \rightarrow A$) | No | Presente (richiede protocolli) | Reti su Hub Ethernet, comunicazioni Wi-Fi |
| **Full-Duplex** | ==Bidirezionale simultanea== ($A \rightleftarrows B$) | Sì | ==Nullo (linee Tx e Rx separate)== | Switch Ethernet moderno, telefonia |

---

## 9. Modalità di Recapito: Unicast, Multicast e Broadcast

- **==Unicast (1 a 1):==** comunicazione indirizzata a una sola specifica interfaccia fisica. Lo switch inoltra la trama solo su quella porta.
- **==Multicast (1 a molti selezionati):==** traffico distribuito a un gruppo iscritto a un servizio comune (IPTV, conferenze, protocolli di routing).
- **==Broadcast (1 a tutti):==** inviato a tutte le stazioni locali (`FF:FF:FF:FF:FF:FF`). Lo switch lo replica su tutte le porte; ==il router lo blocca categoricamente==.

---

## 10. Domini di Collisione e Domini di Broadcast

> [!IMPORTANT] Distinzione Chiave per l'Esame
> - **==Dominio di Collisione:==** porzione di rete in cui le trame inviate da due o piu stazioni contemporaneamente possono **sovrapporsi e corrompersi** a vicenda per contesa del mezzo condiviso.
> - **==Dominio di Broadcast:==** porzione di rete raggiunta da una trama inviata all'indirizzo di diffusione generale (**`FF:FF:FF:FF:FF:FF`**).

### Confronto Strutturale tra i Due Domini

| Caratteristica | Dominio di Collisione | Dominio di Broadcast |
| :--- | :--- | :--- |
| **Evento** | Sovrapposizione distruttiva di segnali sul canale condiviso | Propagazione di una trama destinata a tutti gli host locali |
| **Livello ISO/OSI Coinvolto** | ==Livello 1 (Fisico)== e ==Livello 2 (Data Link)== | ==Livello 2 (Data Link)== e ==Livello 3 (Rete)== |
| **Comportamento dell'Hub** | ==Non isola:== tutte le porte appartengono a un unico grande dominio | ==Non isola:== replica elettricamente la trama su tutte le porte |
| **Comportamento dello Switch** | ==Spezza il dominio:== **ogni singola porta e un dominio di collisione indipendente** | ==Non isola:== inoltra i frame broadcast a tutte le porte attive |
| **Comportamento del Router** | ==Spezza il dominio:== ogni interfaccia e un dominio separato | ==Spezza il dominio:== **blocca tassativamente le trame di broadcast** |
| **Soluzione di Eliminazione** | ==Cablaggio Full-Duplex su Switch== (collisioni fisicamente azzerate) | Segmentazione logica in ==VLAN (*Virtual LAN*)== su switch gestiti |

### Regola di Calcolo per gli Esercizi
- **Contare i Domini di Collisione:** sommare il numero di ==porte collegate degli switch== + le ==interfacce attive dei router== (ogni hub connesso conta come un solo singolo dominio, indipendentemente dai PC collegati).
- **Contare i Domini di Broadcast:** sommare il numero di ==interfacce di rete attive dei router== (oppure il numero di ==VLAN separate== configurate).

---

## 11. Schema Comparativo Finale: Apparati e Domini

| Apparato | Livello ISO/OSI | Indirizzamento Esaminato | Isola i Domini di Collisione? | Isola i Domini di Broadcast? | Ruolo Funzionale |
| :--- | :---: | :--- | :---: | :---: | :--- |
| **NIC (Scheda di Rete)** | ==Livelli 1 e 2 (Fisico + Data Link)== | Proprio indirizzo fisico **==MAC==** | Non applicabile (interfaccia terminale) | Non applicabile | Interfaccia hardware di accesso al canale per l'host |
| **Hub** | ==Livello 1 (Fisico)== | Nessuno (bit elettrici) | No (unico bus condiviso) | No | Ripetitore passivo multiporta (obsoleto) |
| **Switch** | ==Livello 2 (Data Link)== | Indirizzi fisici **==MAC==** | **==Sì (ogni porta è un dominio separato)==** | No (inoltra i broadcast a tutti) | Commutazione e inoltro selettivo dei frame LAN |
| **Access Point** | ==Livello 2 (Data Link)== | Indirizzi MAC (802.3 / 802.11) | No sul canale radio | No | Ponte trasparente tra Ethernet e Wi-Fi |
| **Router** | ==Livello 3 (Rete)== | Indirizzi logici **==IP==** | **==Sì==** | **==Sì (blocca e isola i broadcast)==** | Instradamento pacchetti tra sottoreti diverse |
| **ONT** | Livello 1 / 2 | Frame GPON ottici | **==Sì==** | Neutro | Conversione da fibra ottica FTTH a Ethernet |
| **Firewall** | Livelli 3, 4, 7 | IP, Porte, Payload applicativo | **==Sì==** | **==Sì==** | Ispezione di sicurezza e filtraggio accessi |

---

> [!SUMMARY] Sintesi Concettuale per l'Interrogazione
> - **==Chi spezza i domini di collisione?==** Lo **==Switch==** (ogni porta è isolata, azzerando le collisioni in Full-Duplex).
> - **==Chi spezza i domini di broadcast?==** Solo il **==Router==** (blocca i pacchetti broadcast impedendo tempeste di rete).
> - **==Tabella CAM dello Switch:==** impara dal ==MAC sorgente (*learning*)== e inoltra sul ==MAC destinazione (*forwarding* o *flooding*)==.
> - **==ONT vs Modem:==** l'ONT converte gli impulsi laser della fibra FTTH; il Modem modula segnali analogici sul rame telefonico xDSL.
