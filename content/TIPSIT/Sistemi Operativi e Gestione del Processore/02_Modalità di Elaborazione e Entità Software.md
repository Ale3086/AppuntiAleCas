---
title: "Modalità di Elaborazione e Entità Software"
description: "Studio delle modalità di calcolo (Batch, Interattiva, Multiprogrammazione, Time-Sharing e Real-Time). Il ciclo evolutivo da Programma a Job, Processo e Thread, e il confronto analitico tra JCB e PCB."
tags:
  - tipsit/sistemi-operativi
  - modalita-elaborazione
  - time-sharing
  - pcb-jcb
  - thread
---

# ⚙️ Modalità di Elaborazione ed Entità Software

La progettazione dei sistemi operativi si è evoluta per risolvere un problema storico dell'informatica: **la colossale discrepanza di velocità tra la CPU e i dispositivi di Input/Output**. Da qui derivano le diverse modalità con cui l'elaboratore gestisce i programmi e alloca il tempo di calcolo.

---

## 2.1 Le Modalità di Elaborazione del Sistema Operativo

Nel corso dell'evoluzione tecnologica, i sistemi operativi sono stati classificati in base al modo in cui accolgono le richieste e ripartiscono le risorse hardware:

```mermaid
flowchart TD
    MOD["🖥️ MODALITÀ DI ELABORAZIONE DEL SO"]
    
    MOD --> M1["1️⃣ BATCH (A Lotti)<br/>Esecuzione sequenziale senza interazione utente • Es. calcolo buste paga"]
    MOD --> M2["2️⃣ INTERATTIVA<br/>Dialogo bidirezionale in tempo reale • Es. browser web, app desktop"]
    MOD --> M3["3️⃣ MULTIPROGRAMMAZIONE & TIME-SHARING<br/>Più programmi in RAM • Quanti di tempo (Time-Slice) • Sfrutta DMA"]
    MOD --> M4["4️⃣ REAL-TIME (Tempo Reale)<br/>Esecuzione vincolata da scadenze certe (Deadlines) • Hard vs Soft"]
```

---

### 1. Sistemi Batch (A Lotti)
- **Funzionamento:** I programmi da eseguire (**job**) vengono raggruppati in un "lotto" (*batch*) ed eseguiti dalla CPU in modo sequenziale, uno dopo l'altro.
- **Interazione Utente:** ==🔴 Completamente assente== durante la fase di calcolo. Tutti i dati di ingresso (*input*) devono essere noti e caricati all'inizio. Se il programma contiene un errore logico, l'elaborazione fallisce e l'utente ne viene a conoscenza solo al termine dell'intero blocco.
- **Utilizzo Tipico:** Operazioni ad alta intensità di calcolo che non richiedono supervisione umana (es. elaborazione dei cedolini delle buste paga a fine mese nei centri di calcolo aziendali, rendering 3D offline, backup notturni di database).

---

### 2. Sistemi Interattivi
- **Funzionamento:** È presente un dialogo continuo e bidirezionale tra l'utente e il sistema tramite periferiche di I/O (tastiera, mouse, schermo).
- **Tempo di Risposta:** Il sistema deve garantire tempi di risposta rapidi (frazioni di secondo o pochi secondi), affinché l'utente percepisca una risposta immediata a ogni comando digitato o clic eseguito.
- **Utilizzo Tipico:** Sistemi operativi consumer (Windows, macOS, smartphone, sportelli bancomat ATM, browser web).

---

### 3. Dalla Monoprogrammazione alla Multiprogrammazione e Multitasking

Per comprendere la nascita della multiprogrammazione, occorre analizzare la **differenza di velocità tra i componenti hardware**:

```
Discrepanza di Ordine di Grandezza:
• Ciclo di clock della CPU:       ~ 0,3 nanosecondi (10^-9 s)
• Accesso alla Memoria RAM:       ~ 10-50 nanosecondi
• Lettura da SSD NVMe veloce:     ~ 10-50 microsecondi (10^-6 s)
• Lettura da Hard Disk Meccanico: ~ 5-10 millisecondi (10^-3 s)  [30 MILIONI DI VOLTE PIÙ LENTO!]
• Digitazione umana su tastiera:  ~ 0,2 - 1 secondo             [MILIARDI DI VOLTE PIÙ LENTO!]
```

![[monoprogramming_vs_multiprogramming_dma.jpg|850]]


- **Monoprogrammazione:** In RAM risiede **un solo programma utente** alla volta insieme al Kernel. Quando il programma richiede la lettura di un dato da disco o l'attesa di un tasto dalla tastiera, la CPU si arresta completamente (*busy waiting*), rimanendo inattiva per milioni di cicli di clock.
- **Multiprogrammazione:** In RAM sono allocati **più programmi contemporaneamente**.
  - Sfrutta i canali di **Direct Memory Access (DMA)**: un circuito intelligente dedicato che trasferisce blocchi di dati tra le periferiche e la RAM **senza gravare sulla CPU**.
  - Quando il processo corrente richiede un'operazione di I/O, il SO sospende quel processo e assegna istantaneamente la CPU a un altro processo già pronto in RAM.

> [!QUESTION] 💡 Perché la Multiprogrammazione ha rivoluzionato l'informatica? (Motivazione per la Prof)
> Ha sconfitto il devastante fenomeno dell'==🔴 I/O Bottleneck (Collo di Bottiglia dell'I/O)==. 
> In un sistema monoprogrammato, la CPU più potente del pianeta rimarrebbe inattiva per il **95-99% del tempo** in attesa dei dischi o dell'utente. Con la multiprogrammazione e il DMA, la percentuale di utilizzo utile della CPU (**throughput ed efficienza $\eta$**) sale vertiginosamente verso livelli prossimi al 100%.

---

### 4. Sistemi Time-Sharing (A Divisione di Tempo)

I sistemi **Time-Sharing** rappresentano l'evoluzione logica della multiprogrammazione applicata agli ambienti interattivi multiutente:
- Il tempo totale della CPU viene suddiviso in piccoli intervalli temporali prefissati chiamati ==🟠 Quanti di Tempo o Time-Slice== (tipicamente compresi tra $10$ e $100$ millisecondi).
- La CPU viene assegnata a rotazione circolare a ciascun processo pronto in memoria per la durata massima di un time-slice.
- Grazie all'elevata frequenza di commutazione, ciascun utente ha l'illusione ottica e operativa di possedere una CPU dedicata esclusivamente a sé.

> [!IMPORTANT] I 3 Eventi Esatti di Rilascio Forzato della CPU
> Durante l'elaborazione in un sistema Time-Sharing, un processo in esecuzione nella CPU è obbligato a **rilasciare immediatamente il processore** al verificarsi di uno solo tra questi **3 eventi esatti**:
> 1. ==🟢 Il programma termina regolarmente la propria esecuzione== (raggiunge l'istruzione di fine programma e transita nello stato *TERMINATED*).
> 2. ==🟣 Il programma richiede un'operazione di I/O o attende un evento esterno== (es. attesa di un pacchetto di rete o lettura disco; transita nello stato *WAITING*).
> 3. ==🔴 Scade il Time-Slice assegnato==: il timer hardware della scheda madre genera un'interruzione per timeout; il processo viene prelazionato forzatamente e rimesso nella coda dei pronti (*READY*).

#### Confronto: Windows Desktop vs Linux Multiutente
- **Windows Desktop:** È un sistema time-sharing ==🟡 monoutente==. Consente di configurare più account utente sulla macchina, ma permette a una sola sessione utente interattiva di essere attiva e controllabile alla console fisica per volta.
- **Linux:** È un sistema time-sharing ==🟢 multiutente nativo==. Più utenti umani distinti possono essere collegati contemporaneamente alla stessa macchina (ad esempio tramite connessioni di rete cifrate **SSH** o terminali virtuali multipli `tty1..tty6`), eseguendo ciascuno i propri programmi in parallelo con memoria e permessi rigorosamente isolati.

---

### 5. Il Compromesso Vitale: System Overhead e Scelta del Time-Slice

> [!WARNING] Definizione di System Overhead (Sovraccarico di Sistema)
> Il **System Overhead** è la porzione di tempo e di cicli CPU che il Sistema Operativo consuma **per le proprie attività burocratiche interne di gestione** (in particolare l'esecuzione del *Context Switch*, ovvero il salvataggio dei registri nel PCB e la selezione del nuovo processo), anziché dedicarla al calcolo utile per i programmi degli utenti.

```mermaid
flowchart LR
    A["🟠 Time-Slice TROPPO PICCOLO (es. 1 ms)"] --> B["Frequenti Context Switch continui<br/>CPU passa più tempo a salvare PCB che a fare calcoli utili!<br/>🔴 L'Efficienza globale (eta) crolla drammaticamente!"]
    
    C["🟠 Time-Slice TROPPO GRANDE (es. 1000 ms)"] --> D["Il sistema degenera in un FCFS sequenziale!<br/>🔴 L'interfaccia si blocca e l'utente avverte lag e scatti!"]
    
    E["🟢 Time-Slice OTTIMALE (10 - 50 ms)"] --> F["Compromesso Perfetto: Overhead < 1-2%<br/>Massima fluidità interattiva percepita dall'utente!"]
```

> [!QUESTION] 💡 Qual è il ragionamento matematico per scegliere la grandezza del Time-Slice? (Motivazione per la Prof)
> Sia $T_Q$ la durata del time-slice e $T_{CS}$ il tempo hardware necessario a compiere un Context Switch (tipicamente $5-10$ microsecondi).
> - Se impostassimo un time-slice minuscolo, ad esempio $T_Q = 20 \ \mu\text{s}$, avremmo un cambio di contesto ogni $20 \ \mu\text{s}$. La CPU spenderebbe un terzo del suo tempo solo a gestire i PCB!
> - Per convenzione ingegneristica, il time-slice $T_Q$ deve essere dimensionato in modo che il tempo di cambio di contesto rappresenti **meno dell'1% del tempo totale**:
>   $$\frac{T_{CS}}{T_Q} \le 0{,}01 \implies T_Q \ge 100 \times T_{CS}$$
>   Un intervallo di $10-50 \text{ ms}$ garantisce che l'overhead sia trascurabile senza degradare la reattività dell'interfaccia grafica.

---

### 6. Sistemi Real-Time (A Tempo Reale)

Nei sistemi **Real-Time**, la correttezza del sistema non dipende solo dal risultato logico del calcolo, ma **dal momento esatto in cui il risultato viene prodotto**:
- L'avanzamento dei calcoli è scandito da **eventi fisici esterni** (sensori, sonde, attuatori).
- I programmi critici risiedono **sempre in RAM** (mai soggetti a memoria virtuale o swapping).
- Ogni task ha una scadenza temporale prefissata e categorica chiamata ==🔴 Deadline==.

| Caratteristica | Hard Real-Time (Vincolo Stretto) | Soft Real-Time (Vincolo Largo) |
| :--- | :--- | :--- |
| **Rigidità della Scadenza** | ==🔴 Assoluta e Invalicabile.== | Più elastica / Tollerante a piccoli ritardi. |
| **Effetto del Mancato Rispetto** | **Dato corrotto / Fallimento totale catastrofico:** pericolo per la vita umana o distruzione dell'impianto. | **Degrado del Servizio (SLA / QoS):** rallentamento momentaneo o perdita di qualità percepita. |
| **Sistemi Operativi Esempio** | QNX Neutrino, VxWorks, FreeRTOS. | Kernel Linux con patch standard, Windows Media Player. |
| **Ambiti di Applicazione Reali** | • Apertura degli **Airbag** nell'auto (entro 20-30 ms dall'urto).<br/>• Sistemi di controllo barre di controllo in **Centrali Nucleari**.<br/>• Controllo di volo avionico *Fly-by-Wire* e pacemaker cardiaci. | • **Streaming video/audio** (se un frame salta, si avverte un micro-scatto).<br/>• Sistemi di prenotazione biglietti aerei online.<br/>• Videogiochi multiplayer online. |

---

## 2.2 Evoluzione delle Entità Software: Programma, Job, Processo e Thread

Uno degli aspetti più formativi della teoria dei sistemi operativi è comprendere come un file memorizzato sul disco si trasforma in un'applicazione attiva in esecuzione:

```
[ Programma su Disco ] ──(Doppio Clic)──► [ Job in HOLD (JCB) ] ──(Ammissione)──► [ Processo in RAM (PCB) ]
                                                                                   │
                                                                                   ├─── [ Thread 1 ]
                                                                                   └─── [ Thread 2 ]
```

![[pcb_structure_threads.jpg|800]]

### Le 4 Entità a Confronto
1. ==🔵 Programma:== Entità **statica e passiva**. È il file eseguibile memorizzato permanentemente su memoria di massa (disco SSD/HDD, es. `chrome.exe`). È costituito da codice binario, istruzioni macchina e dati iniziali. **Non consuma cicli CPU né celle di memoria RAM** finché non viene invocato.
2. ==🔵 Job (Lavoro):== Entità **transitoria e preliminare**. Si genera nel momento esatto in cui si richiede l'avvio del programma (es. al doppio clic dell'icona). Il programma viene posto in una lista di attesa su disco denominata stato ==🟡 NEW / HOLD==. Durante questa fase il SO valuta se ci sono abbastanza risorse hardware per ammetterlo.
3. ==🟢 Processo (Task):== Entità **dinamica e attiva**. È l'istanza concreta di un programma caricato nella memoria centrale **RAM**, a cui il SO ha assegnato uno spazio di memoria protetto (*Address Space*), descrittori di file e identificatori univoci. È il processo che concorre attivamente per ottenere il tempo di calcolo della CPU.
4. ==🟢 Thread ("Filo di Esecuzione"):== Unità di esecuzione **leggera** (*Lightweight Process*) interna a un processo. Più thread appartenenti al medesimo processo **condividono lo stesso spazio di memoria RAM e i file aperti del processo padre**, ma ciascuno possiede il proprio **Program Counter (PC)**, il proprio set di registri della CPU e il proprio stack di chiamate.

> [!QUESTION] 💡 Perché sono stati inventati i Thread al posto di creare tanti Processi? (Motivazione per la Prof)
> 1. **Economia di Memoria:** Creare un processo richiede al SO di duplicare l'intera tabella delle pagine di memoria virtuale e allocare nuove strutture dati complesse (pesantezza in termini di megabyte). Creare un thread richiede solo poche centinaia di byte per registri e stack.
> 2. **Velocità di Comunicazione (Inter-Process Communication):** Due processi distinti sono isolati dalla memoria e per comunicare devono fare lente chiamate di sistema (*pipe, socket, shared memory*). Due thread dello stesso processo leggono e scrivono sulle **stesse identiche variabili globali in memoria RAM** a velocità nativa.
> 3. **Context Switch Immediato:** Passare la CPU da un thread all'altro dello stesso processo non richiede lo svuotamento della cache della memoria di traduzione (**TLB** - *Translation Lookaside Buffer*), rendendo il cambio di contesto istantaneo.

---

## 2.3 Strutture Dati di Controllo: JCB vs PCB

Per governare l'evoluzione di ciascun Job e Processo, il Sistema Operativo crea e mantiene aggiornate due strutture dati fondamentali in memoria:

| Parametro / Campo | JCB (Job Control Block) | PCB (Process Control Block) |
| :--- | :--- | :--- |
| **Momento di Creazione** | ==All'avvio del Job==, mentre il programma si trova nello stato *NEW/HOLD* su disco. | ==All'atto dell'ammissione== del processo nella memoria centrale RAM (stato *READY*). |
| **Supporto di Residenza** | Memorizzato nella **Lista di HOLD su disco**. | Memorizzato nello spazio protetto del **Kernel in RAM**. |
| **Identificativo** | **Job ID** (identificativo del lavoro in coda). | ==🔵 PID (Process Identifier)==: numero intero univoco assegnato al processo. |
| **Dati Identificativi e Spazio** | • Percorso del file eseguibile su disco.<br/>• Dimensione stimata del codice in KB.<br/>• Elenco delle periferiche I/O richieste. | • Puntatore alla base del codice in memoria RAM.<br/>• Tabella delle pagine di memoria virtuale.<br/>• Descrittori dei **file attualmente aperti** (*Open File Table*). |
| **Contesto della CPU** | *Non presente* (il job non ha ancora mai toccato la CPU). | ==🔵 Stato completo dei Registri CPU==: accumulatori, registri generali, registro di stato (**PSW** - *Program Status Word*) e **Program Counter (PC)**. |
| **Stato e Metriche di Tempo** | • Priorità di ammissione.<br/>• Tempo massimo di esecuzione consentito. | • ==Stato corrente== (*Ready, Running, Waiting...*).<br/>• Priorità di scheduling.<br/>• Istante di arrivo ($T_A$), tempo di burst consumato ($T_B$) e tempo di attesa cumulata. |
| **Organizzazione Strutturale** | Elenco sequenziale nella coda dei lavori su disco. | ==Organizzato in liste dinamiche e code circolari concatenate in RAM== (ogni PCB contiene un puntatore `next` al PCB successivo). |

> [!QUESTION] 💡 Perché il JCB è gestito su disco mentre il PCB deve risiedere rigorosamente in RAM? (Motivazione per la Prof)
> Nello stato preliminare di HOLD possono essere accodati centinaia di programmi in attesa (ad esempio in un grande server universitario o aziendale). Se creassimo subito i PCB in memoria RAM per tutti i programmi proposti, **esauriremmo immediatamente la memoria centrale**, portando il sistema in blocco prima ancora di iniziare (*Thrashing*). 
> Il JCB risiede su disco per fare da "sala d'attesa a basso costo"; solo quando il *Job Scheduler* accerta che c'è abbastanza RAM libera, crea il PCB fisico in memoria centrale.
