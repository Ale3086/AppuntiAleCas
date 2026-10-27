---
title: "Ciclo di Vita del Processo e Algoritmi di Scheduling"
description: "Il diagramma degli stati a 6 moduli, la regola d'oro WAITING -> READY, algoritmi non-preemptive (FCFS, SJF) e preemptive (SRTF, Round-Robin, Priorità, Niceness ed Aging contro la starvation)."
tags:
  - tipsit/sistemi-operativi
  - stati-processo
  - scheduling-cpu
  - round-robin
  - starvation
---
# 🔄 Ciclo di Vita del Processo e Algoritmi di Scheduling

La CPU è il "motore" del calcolatore: in un'architettura monoprocessore (o all'interno di un singolo core), **un solo processo alla volta può trovarsi in esecuzione fisica**. Il coordinamento di tutti gli altri processi presenti nel computer spetta ai moduli specializzati del Kernel e agli **algoritmi di scheduling**.

---

## 3.1 Il Diagramma degli Stati del Processo (Ciclo di Vita)

Durante la propria esistenza, un programma non passa istantaneamente dal disco all'esecuzione, ma attraversa una serie di **stati logici** codificati nel campo `Stato` del proprio **PCB (Process Control Block)**.

![[Pasted image 20261027132836.png]]

> [!NOTE] 🧭 Guida alla Lettura del Diagramma
> Il diagramma modella l'intero ciclo di vita del processo tramite **5 stati fondamentali** (le ellissi), **6 transizioni orientate** (le frecce) e **2 code dinamiche in memoria RAM** (**RL** e **WL**).

---

### I 5 Stati Fondamentali del Processo

| Stato                | Denominazione nel Diagramma     | Collocazione Fisica      | Condizione Operativa del Processo                                                                                                                                                                                  |
| :------------------- | :------------------------------ | :----------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ==🟡 Nuovo==         | **Nuovo (New)**                 | Memoria di Massa (Disco) | Il programma è stato appena invocato dall'utente (doppio clic o comando da terminale). Esiste la richiesta di avvio, ma il processo non è ancora stato caricato in RAM.                                            |
| ==🔵 Pronto==        | **Pronto (Ready)**              | Memoria Centrale (RAM)   | Il processo è completamente caricato in memoria RAM con tutte le risorse necessarie: **è pronto a calcolare e attende solo che la CPU gli venga assegnata**. Risiede nella **RL (Ready List)**.                    |
| ==🟢 In esecuzione== | **In esecuzione (Running)**     | Microprocessore (CPU)    | Il processo ha ottenuto il controllo della CPU e ne sta eseguendo le istruzioni nei registri interni. In un sistema monoprocessore (o singolo core), **un solo processo alla volta** può trovarsi in questo stato. |
| ==🟠 Sospeso==       | **Sospeso (Waiting / Blocked)** | Memoria Centrale (RAM)   | Il processo non può proseguire l'esecuzione perché **è in attesa del completamento di un'operazione di I/O** (disco, tastiera, rete) o di un evento esterno (timer). Risiede nella **WL (Waiting List)**.          |
| ==🟡 Finito==        | **Finito (Terminated)**         | Rilascio Risorse         | Il processo ha concluso regolarmente il suo compito (istruzione `exit()`) oppure è stato terminato forzatamente per un errore irreversibile. Il PCB viene distrutto e la memoria RAM liberata.                     |

> [!QUESTION] 💡 Qual è la differenza fondamentale tra lo stato "Pronto" e "Sospeso"? 
> - Il processo in **==🔵 Pronto (Ready)==** possiede già tutto il necessario (codice, dati e memoria). Gli manca **soltanto la disponibilità della CPU**. Se la CPU si liberasse in questo istante, potrebbe iniziare a calcolare immediatamente.
> - Il processo in **==🟠 Sospeso (Waiting)==** è bloccato da una dipendenza esterna: anche se la CPU fosse completamente libera al 100%, **non potrebbe comunque eseguire alcuna istruzione**, poiché deve prima ricevere i dati dalla periferica di I/O o attendere l'evento asincrono.

---

### Le 6 Transizioni di Stato Spiegate Passo-Passo

Le frecce orientate del diagramma rappresentano i passaggi di stato governati dal Kernel:

1. ==🔵 Ammissione (Nuovo → Pronto):==
   - **Cosa accade:** Il sistema operativo ammette la nuova richiesta di esecuzione, crea il descrittore PCB in memoria RAM e inserisce il processo nella coda dei pronti (**RL**).
2. ==🟢 Dispatching / Assegnazione CPU (Pronto → In esecuzione):==
   - **Cosa accade:** La CPU diventa libera. Il modulo **Dispatcher**, guidato dalla politica dello scheduler, preleva il processo in testa alla **RL**, esegue il *Context Switch* caricando i suoi registri nella CPU e commuta l'hardware in User Mode avviando il calcolo.
3. ==🟣 Interrotto / Revoca CPU (In esecuzione → Pronto):==
   - **Cosa accade:** La CPU viene revocata forzatamente al processo per **prelazione (preemption)**:
     - Nei sistemi *Time-Sharing*, è scaduto il quanto di tempo (**Time-Slice**) concesso dal timer di sistema.
     - Nei sistemi con priorità, è arrivato nella RL un processo con priorità più alta.
     - Il processo sospeso salva il proprio stato nel PCB e torna in coda nella **RL**.
4. ==🟠 Sospensione (In esecuzione → Sospeso):==
   - **Cosa accade:** Il processo in esecuzione richiede un'operazione lenta di I/O (es. lettura da disco o input utente). Non potendo procedere, **cede spontaneamente la CPU** (tramite una System Call) per non sprecare cicli di calcolo a vuoto e si accoda nella **WL**.
5. ==🟢 Riattivazione (Sospeso → Pronto):==
   - **Cosa accade:** La periferica termina l'operazione di I/O e invia un interrupt hardware (**IRQ**). L'*Interrupt Handler* prende in carico i dati e sposta il processo dalla WL alla **RL**.  
   *(Regola d'oro: il processo torna in stato Pronto, mai direttamente in esecuzione sulla CPU!)*
6. ==🔴 Terminazione (In esecuzione → Finito):==
   - **Cosa accade:** Il processo completa la sua ultima istruzione o subisce un errore irreversibile. Il sistema operativo distrugge il PCB, chiude i file aperti e restituisce la memoria RAM al sistema.

---

### Le Due Code in Memoria: RL e WL

Nel diagramma sono disegnate due strutture dati a colonna che affiancano gli stati in RAM:
- ==🔵 RL (Ready List):== La coda dinamica dei processi in stato *Pronto*, ordinati secondo la logica dell'algoritmo di scheduling adottato (es. ordine FIFO, per tempo residuo o per priorità decrescente).
- ==🟠 WL (Waiting List):== L'insieme delle code di attesa dei processi in stato *Sospeso*. Nei sistemi reali non esiste un'unica lista generica, ma **una coda separata per ciascun dispositivo di I/O** (coda della tastiera, coda del disco, coda della scheda di rete), garantendo che ogni periferica risvegli esclusivamente i processi che attendono il suo specifico segnale.

---

### 🛠️ Il Ruolo dei 6 Moduli del Kernel e la Loro Architettura
#### 1. Moduli di Ammissione e Gestione Memoria (Disco $\leftrightarrow$ RAM)

> [!ABSTRACT] 📁 1. Long-Term Scheduler (Job Scheduler / LTS)
> - **Transizione:** $\text{NEW / HOLD (Disco)} \longrightarrow \text{READY (RAM)}$.
> - **Collocazione:** Interfaccia tra memoria secondaria e RAM.
> - **Funzione Cardine:** Valuta se la RAM dispone di spazio sufficiente per ospitare un nuovo processo. Quando l'esito è positivo, distrugge il ==🔵 JCB== su disco e alloca il nuovo ==🔵 PCB== nella Ready Queue.
> - **Scopo Sistemistico:** Regola il grado complessivo di multiprogrammazione per non sovraccaricare la macchina.

> [!ABSTRACT] 💽 2. Medium-Term Scheduler (MTS / Swapper)
> - **Transizione:** $\text{READY / WAITING (RAM)} \longleftrightarrow \text{WAITING ON DISK (Swap)}$.
> - **Collocazione:** Supervisore dello spazio di swapping su disco.
> - **Funzione Cardine:** Quando la RAM fisica si satura (*Memory Pressure*), preleva processi inattivi e li sposta nell'area di swap su disco (**Swap-Out**). Non appena la memoria si libera, esegue lo **Swap-In** reinserendo il PCB nella Ready Queue.

---

#### 2. Moduli di Esecuzione e Assegnazione CPU (RAM $\to$ CPU)

> [!ABSTRACT] ⚡ 3. Short-Term Scheduler (CPU / Task Scheduler / STS)
> - **Transizione:** $\text{READY} \longrightarrow \text{RUNNING}$.
> - **Collocazione:** Residente permanente in RAM e attivo a frequenza altissima (ogni $10-50 \text{ ms}$).
> - **Funzione Cardine:** È il "cervello decisionale": analizza i processi pronti e seleziona il prossimo processo a cui concedere la CPU applicando l'algoritmo stabilito (Round-Robin, SJF, Priorità).

> [!ABSTRACT] 🚀 4. Dispatcher (Il Braccio Operativo del Kernel)
> Riceve la scelta dello Short-Term Scheduler e realizza materialmente il passaggio della CPU compiendo **3 azioni critiche e delicate**:
> 1. ==🟣 Context Switch (Cambio di Contesto):== Salva nei registri del PCB uscente lo stato della CPU e ripristina i registri del nuovo PCB selezionato.
> 2. ==🟢 Commutazione di Privilegio:== Porta la CPU da Kernel Mode a User Mode.
> 3. ==🟣 Salto Operativo (Jump):== Carica l'indirizzo memorizzato nel Program Counter (PC) del nuovo processo per dare avvio all'esecuzione.

---

#### 3. Moduli di Monitoraggio e Gestione Eventi Asincroni

> [!ABSTRACT] 🚦 5. Traffic Controller (Il Vigile del Traffico dei PCB)
> - **Funzione Cardine:** Gestore e contabile delle strutture dati del Kernel.
> - **Compiti Operativi:** Aggiorna il campo `Stato` all'interno di ciascun PCB e sposta fisicamente i puntatori delle liste concatenate in RAM (spostamento tra Ready Queue, Waiting Queue e lista dei Terminated).

> [!ABSTRACT] ⚡ 6. Interrupt Handler (Gestore delle Interruzioni Elettriche)
> - **Transizione:** $\text{WAITING} \longrightarrow \text{READY}$.
> - **Funzione Cardine:** Routine di bassissimo livello invocata istantaneamente quando arriva un segnale hardware (**IRQ**) da una periferica (tastiera, disco, scheda di rete).
> - **Compiti Operativi:** Legge i dati dal buffer della periferica e segnala al SO che l'evento atteso si è verificato, rimettendo il processo in coda tra i pronti.

---

> [!WARNING] ⚠️ LA REGOLA D'ORO DEL SISTEMA OPERATIVO (Domanda Trabocchetto da Esame!)
> **Un processo non può MAI passare direttamente dallo stato WAITING allo stato RUNNING!**
> 
> Quando la periferica I/O termina il trasferimento o l'evento atteso si verifica, l'Interrupt Handler **sposta obbligatoriamente il processo nello stato di READY**. 
> 
> **La Motivazione Sistemistica:**
> Nel momento esatto in cui la periferica finisce l'I/O, **la CPU è già fisicamente occupata da un altro processo in esecuzione**. L'hardware non può "estromettere" arbitrariamente il processo in esecuzione scavalcando lo Scheduler: ciò distruggerebbe ogni equità (*Fairness*) e violerebbe le politiche del sistema. Il processo sbloccato deve perciò mettersi in coda tra i pronti (*READY*), lasciando al CPU Scheduler la decisione di quando riassegnargli il processore.

---

## 3.2 Politiche e Algoritmi di Scheduling

Gli algoritmi di schedulazione rappresentano la logica con cui il CPU Scheduler decide a quale processo in READY assegnare la CPU. Si dividono in due grandi famiglie:

---
### Algoritmi Non-Preemptive (Senza Prelazione)
Un algoritmo è **Non-Preemptive** se, una volta assegnata la CPU a un processo, questo **la mantiene ininterrottamente fino alla sua conclusione naturale o fino a quando non richiede spontaneamente un'operazione di I/O**. Il SO non interviene mai per sottrargli forzatamente il processore.

#### 1. FCFS (First-Come, First-Served)
- **Logica:** I processi vengono serviti rigorosamente nell'ordine cronologico di arrivo nella Ready Queue ($T_A$, politica FIFO - *First In, First Out*).
- **Vantaggi:** Semplicità assoluta di implementazione, overhead quasi nullo.
- **Svantaggio Critico:** ==🔴 Effetto Convoglio (Convoy Effect)==.

> [!QUESTION] 💡 Che cos'è l'Effetto Convoglio in FCFS? 
> Immaginiamo una fila a un unico sportello postale in cui la prima persona deve svolgere un'operazione contabile lunghissima che richiede 60 minuti, mentre dietro di lei ci sono dieci persone che devono solo imbucare una cartolina da 10 secondi.
> In FCFS accade lo stesso: se entra per primo un processo lungo ad alta intensità di calcolo (**CPU-bound** con burst da 100 secondi), tutti i processi interattivi brevissimi (**I/O-bound** con burst da 0,1 secondi) rimangono intrappolati dietro di lui in attesa, facendo schizzare il tempo medio di attesa ($TA_M$) a valori inaccettabili.

#### 2. SJF (Shortest Job First - Non-Preemptive)
- **Logica:** Quando la CPU si libera, lo scheduler scorre la Ready Queue e seleziona il processo che possiede il ==🟠 minor tempo di burst (Tb)== stimato.
- **Vantaggio Matematico:** È dimostrato matematicamente che l'algoritmo SJF è **ottimo**, poiché garantisce in assoluto il **minimo Tempo di Attesa Medio ($TA_M$)** rispetto a qualsiasi altro algoritmo non-preemptive.
- **I Due Limiti Fatali di SJF:**
  1. ==🔴 Rischio di Starvation (Inedia):== Se nel sistema continuano ad arrivare processi con burst breve, un processo con burst lungo rimarrà perennemente in fondo alla coda e non verrà **mai eseguito**.
  2. ==🔴 Non conoscibilità a priori del tempo di burst (Tb):== Nella realtà dei calcolatori moderni, il sistema operativo non può sapere in anticipo quanti millisecondi di calcolo richiederà un programma utente prima di fare I/O; il valore può essere soltanto stimato tramite medie esponenziali delle esecuzioni passate.

---

### Algoritmi Preemptive (Con Prelazione)
Un algoritmo è **Preemptive** quando il Sistema Operativo possiede l'autorità hardware di **interrompere forzatamente il processo attualmente in RUNNING** (sfruttando il timer o i segnali di interrupt), togliergli la CPU, retrocederlo in READY e assegnare il processore a un altro processo più urgente o prioritario.

#### 1. SRTF (Shortest Remaining Time First)
- **Logica:** È la versione **preemptive** dell'algoritmo SJF.
- Quando un nuovo processo arriva nella Ready Queue, lo scheduler confronta il suo burst time con il **tempo residuo rimanente** del processo attualmente in esecuzione sulla CPU:
  - Se il nuovo arrivato richiede meno tempo di quello che manca al processo corrente, **avviene la prelazione immediata**: il processo in RUNNING viene sospeso e la CPU viene data al nuovo arrivato.
  - A parità di tempo residuo, **non si fa preemption** per evitare l'overhead inutile di un context switch.
#### 2. Round-Robin (RR)
- **Logica:** È l'algoritmo cardine dei sistemi Time-Sharing. I processi sono gestiti in una coda circolare FIFO. A ciascun processo viene concessa la CPU per un intervallo temporale prefissato pari a un ==🟠 Time-Slice (Quanto di Tempo)==.
- Se il processo termina o fa I/O prima dello scadere del time-slice, rilascia la CPU spontaneamente.
- Se scade il time-slice prima del completamento, un interrupt hardware scollega il processo e lo sposta in coda alla Ready Queue.
- **Punti di Forza:** ==🟢 Massima Equità (Fairness)==, eccellente tempo di risposta per programmi interattivi, e **assenza totale di starvation** (ogni processo ha la certezza matematica di avanzare a ogni giro di ruota).

---

#### 4. Scheduling con Priorità e il Rimedio dell'Aging
Negli algoritmi a priorità, a ogni processo viene associato un valore numerico che ne determina l'urgenza di esecuzione:

> [!ABSTRACT] ⚖️ Tipologie di Priorità nello Scheduling
> - **Priorità Statica:** Assegnata alla nascita del processo e immutabile nel tempo.  
>   ==🔴 Pericolo Starvation:== se giungono continuamente task a priorità più alta, i processi a bassa priorità rimangono affamati all'infinito.
> - **Priorità Dinamica con AGING (Invecchiamento):** Il valore di priorità viene ricalcolato dal Kernel e incrementato progressivamente man mano che il processo attende nella Ready Queue.  
>   ==🟢 Garanzia di Esecuzione:== previene l'inedia e assicura che qualunque task prima o poi ottenga la CPU.

- **Il Concetto di Niceness in Linux/Unix:**
  Nei sistemi Unix e Linux, la priorità dei processi nello spazio utente è regolata dal valore di        ==🔵 Niceness (Gentilezza)==, compreso tra **$-20$ e $+19$**:
  - Un valore di niceness pari a **$-20$** indica priorità **massima** (il processo è "egoista", non è gentile con gli altri e pretende tutta la CPU).
  - Un valore di niceness pari a **$+19$** indica priorità **minima** (il processo è "molto gentile", cede il passo a chiunque).

> [!QUESTION] 💡 Come si risolve la Starvation causata dalle Priorità?
> Se utilizzassimo solo priorità statiche, un processo a bassa priorità potrebbe rimanere bloccato in Ready Queue per giorni o settimane (**Starvation**), non appena il sistema riceve costantemente processi a priorità più alta.
> La soluzione ingegneristica standard si chiama ==🟢 Aging (Invecchiamento)==:
> Il Kernel monitora costantemente il tempo che ciascun processo trascorre fermo nella coda di READY. A intervalli regolari, **il SO incrementa gradualmente la priorità del processo affamato**. Con il passare del tempo, la sua priorità diventerà così elevata da superare anche i processi appena arrivati, garantendo l'esecuzione certa di qualunque elaborazione.
