---
title: "Architettura del Sistema Operativo, Boot e Privilegi"
description: "Studio approfondito dell'architettura a cipolla (Ring Model), separazione User/Kernel Mode, System Call e trap software, procedura di Bootstrap in 5 fasi, BIOS vs UEFI, MBR vs GPT e ambienti isolati (Dual Boot, VM, Docker)."
tags:
  - tipsit/sistemi-operativi
  - architettura-so
  - ring-model
  - bootstrap
  - livelli-privilegio
---
# Architettura del Sistema Operativo, Boot e Privilegi

Il **Sistema Operativo (SO)** è il componente software di base più critico di un computer: senza di esso, l'hardware sarebbe un insieme inerte di silicio, piste di rame e segnali elettrici privi di coordinamento.

---

## 1.1 Il Ruolo del Sistema Operativo come Macchina Astratta e Gestore di Risorse

Il Sistema Operativo opera come un ==🟡 intermediario trasparente== e insostituibile posizionato tra l'hardware fisico e i programmi applicativi utilizzati dall'utente.

![[os_layers_stack_hardware_user.jpg|850]]

> [!NOTE] L'Architettura a 4 Livelli del Calcolatore
> 1. **Layer 4 (Utenti):** Utenti umani, programmatori e operatori di sistema.
> 2. **Layer 3 (Software Applicativo):** Browser web, suite d'ufficio, ambienti di sviluppo (IDE) e videogiochi.
> 3. **Layer 2 (Sistema Operativo - Software di Base):** Kernel, File System, Memory & Device Management, Shell CLI/GUI (la **Macchina Astratta**).
> 4. **Layer 1 (Hardware Fisico):** Microprocessore CPU, Memoria RAM, Dischi SSD NVMe / HDD, Periferiche I/O e Bus di sistema.

### Il Concetto di Macchina Astratta (o Virtuale)
I programmi applicativi non interagiscono mai direttamente con i componenti fisici della macchina. Il SO realizza il principio di ==🟡 astrazione dell'hardware==:
- **La Macchina Fisica:** è complessa, eterogenea e vincolata a temporizzazioni hardware, indirizzi esadecimali dei registri di controllo e segnali di interrupt.
- **La Macchina Astratta:** è il modello virtuale, semplificato e standardizzato che il SO presenta ai programmatori e agli utenti. Ogni applicazione in esecuzione "crede" di avere a disposizione un computer ideale, dotato di memoria dedicata e canali di comunicazione uniformi.

> [!QUESTION] 💡 Perché il concetto di Macchina Astratta è indispensabile?
> Se non esistesse la macchina astratta, chiunque scriva un programma (ad esempio un editor di testo) dovrebbe riscrivere da zero il codice di salvataggio per **ogni specifico modello di hard disk o SSD** in commercio, conoscendo il numero esatto di piatti, cilindri, testine e settori. 
> Grazie alla macchina astratta del SO, il programmatore invoca semplicemente l'operazione astratta `salva_file()`, demandando al SO la traduzione in comandi elettrici per il supporto di memoria secondaria. Questo garantisce la ==🟢 totale indipendenza del software dall'hardware==.

### I Tre Obiettivi Fondamentali della Gestione Risorse
1. ==🟢 Efficienza ed Efficacia:== Ottimizzare l'allocazione delle risorse scarse (cicli CPU, blocchi RAM, banda di rete), evitando tempi morti del processore e colli di bottiglia.
2. ==🟢 Sicurezza e Affidabilità:== Isolare i processi tra loro per impedire che un'applicazione difettosa o malevola possa spiare o corrompere la memoria di altri programmi o del sistema stesso.
3. ==🟢 Trasparenza di Gestione:== Nascondere i dettagli di basso livello delle periferiche di Input/Output, permettendo all'utente di concentrarsi solo sull'attività da svolgere.

> [!NOTE] Classificazione Formale delle Risorse
> - ==🔵 Risorse Hardware (HW):== Componenti elettronici fisici: **CPU** (tempo di elaborazione), **Memoria Centrale** (RAM, cache), **Memoria di Massa** (SSD, HDD), **Periferiche I/O** (schede di rete, monitor, tastiere) e **BUS di sistema**.
> - ==🔵 Risorse Software (SW):== Entità logiche create dal sistema: **File**, **Directory**, **Tabelle di memoria**, **Code di messaggi**, **Librerie condivise** e **Interfacce di comando**.

---

## 1.2 Architettura a Strati: Il Modello a Ring ("A Cipolla")

Per gestire la complessità e garantire la robustezza, i sistemi operativi moderni sono progettati secondo il **modello a livelli gerarchici concentrici** (*Onion Skin Architecture* o *Ring Model*):

![[os_ring_model.jpg|800]]

### La Gerarchia dei Livelli (Ring)

| Livello / Ring | Modulo Funzionale                 | Compiti Chiave e Gestione Sistemistica                                                                                                                                                                                                             |
| :------------- | :-------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Ring 0**     | ==🔵 Kernel (Nucleo)==            | È la componente cardine, **sempre residente in RAM** (mai soggetta a swapping su disco). Interagisce direttamente con la CPU e i registri hardware; gestisce il cambio di contesto, l'assegnazione del tempo processore e le interruzioni fisiche. |
| **Ring 1**     | ==🔵 Gestore della Memoria==      | Alloca e dealloca le pagine di memoria centrale RAM; mappa gli indirizzi virtuali dei processi in indirizzi fisici; protegge lo spazio di memoria di ciascun processo.                                                                             |
| **Ring 2**     | ==🔵 Gestore delle Periferiche==  | Dialoga con i **driver hardware**; standardizza la comunicazione verso stampanti, schede di rete e schermi; governa i buffer di Input/Output.                                                                                                      |
| **Ring 3**     | ==🔵 File System (File Manager)== | Gestisce la struttura ad albero di file e cartelle sui dischi di massa; controlla i permessi di lettura/scrittura/esecuzione e la frammentazione dei blocchi.                                                                                      |
| **Esterno**    | ==🟢 Shell (Interfaccia Utente)== | Strato più esterno che accoglie le istruzioni dell'utente, le valida sintatticamente e le converte in chiamate ai livelli interni sottostanti.                                                                                                     |


> [!QUESTION] 💡 Perché è stata scelta un'architettura gerarchica a strati concentrici? 
> 1. **Principio di Minimo Privilegio e Incapsulamento:** ogni strato comunica **esclusivamente con lo strato immediatamente adiacente**. Il File System (Ring 3) non tocca direttamente i transistor della CPU o i settori elettrici del disco; chiede invece al Device Manager (Ring 2) di trasmettere i byte.
> 2. **Modularità e Manutenibilità:** se si sostituisce un componente hardware (ad esempio si installa una nuova scheda video o si passa da un disco SATA a un SSD NVMe), è sufficiente aggiornare il driver nel Ring 2. Tutti i livelli superiori (File System, Shell e Programmi utente) rimangono identici e continuano a funzionare senza dover essere riscritti.

### Dettaglio della Shell: Le 3 Tipologie di Interfaccia Utente
1. ==🟢 CLI (Command Line Interface):== Interfaccia a riga di comando testuale. L'utente digita comandi che vengono analizzati da un interprete sintattico (**parser**). *Esempi:* Bash su Linux/macOS, `cmd.exe` e PowerShell su Windows. È preferita da amministratori di sistema per la sua leggerezza, rapidità e automazione tramite script.
![[public.avif|493]]
2. ==🟢 GUI (Graphical User Interface):== Interfaccia grafica intuitiva basata sulla **metafora della scrivania (desktop)** e sul paradigma **WIMP** (*Windows, Icons, Menus, Pointer*). *Esempi:* Windows Explorer, macOS Aqua, GNOME/KDE su Linux. Offre massima immediatezza visiva a fronte di un maggior consumo di RAM e CPU.
![[What-is-GUI-Graphical-user-Interface.webp|450]]

3. ==🟢 Menu-Driven Interface:== Interfaccia basata sulla selezione da menu testuali gerarchici. Non richiede digitazione libera di comandi complessi ed è utilizzata negli ambienti a basso livello privi di driver grafici avanzati (ad esempio le schermate di configurazione del **BIOS/UEFI**).
![[ottimiz6.gif|449]]

---

## 1.3 Livelli di Privilegio: User Mode, Kernel Mode e System Call

Per evitare che un errore logico (un ciclo infinito o un puntatore nullo) o un'azione malevola di un programma utente possano bloccare l'intero computer, i processori integrano una ==🟡 distinzione hardware degli stati di privilegio==:

![[system_call_trap_architecture.jpg|800]]

### Confronto Diretto: User Mode vs Kernel Mode

| Caratteristica               | User Mode (Modalità Utente)                                                                      | Kernel Mode (Modalità Protetta / Ring 0)                                                 |
| :--------------------------- | :----------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------- |
| **Livello di Privilegio**    | ==🟢 Basso / Limitato== (non privilegiato).                                                      | ==🔴 Massimo / Totale== (modalità supervisore).                                          |
| **Componenti Eseguite**      | Applicazioni utente ordinarie, script, shell.                                                    | Nucleo del SO (Kernel), driver di sistema, scheduler.                                    |
| **Accesso alla Memoria**     | Limitato allo spazio di indirizzamento virtuale proprio del processo.                            | Diretto e illimitato all'intera memoria RAM fisica.                                      |
| **Istruzioni CPU Permesse**  | Solo istruzioni aritmetico-logiche ordinarie.                                                    | Qualsiasi istruzione macchina, incluse quelle privilegiate.                              |
| **Conseguenza di un Errore** | ==🟢 Chiusura forzata della singola applicazione== (Crash dell'app, nessun impatto sul sistema). | ==🔴 Arresto critico dell'intero calcolatore== (BSOD su Windows, Kernel Panic su Linux). |

### Il Meccanismo della System Call e la Trap Software
Quando un programma in User Mode necessita di accedere a una risorsa hardware (es. leggere un file, allocare memoria, connettersi a un socket di rete), non può farlo direttamente. Deve invocare una ==🟣 System Call (Chiamata di Sistema)==:

1. L'applicazione prepara i parametri nei registri della CPU o sullo stack.
2. Viene eseguita un'istruzione di ==🟣 Trap Software / Interruzione Software== (ad esempio `INT 0x80` nell'architettura x86 a 32 bit o l'istruzione speciale `SYSCALL`/`SYSENTER` a 64 bit).
3. **Cosa fa l'Hardware:** La CPU intercetta la trap, sospende il programma utente, commuta il bit di privilegio da User Mode (Ring 3) a Kernel Mode (Ring 0) e salta all'indirizzo del vettore delle chiamate di sistema del Kernel (*System Call Table*).
4. Il Kernel esegue i controlli di sicurezza (es. "l'utente ha i permessi di lettura sul file?"), compie l'operazione hardware e rimette il risultato nei registri.
5. Con l'istruzione di ritorno (`IRET` o `SYSRET`), la CPU ripristina la modalità User Mode e riconsegna il controllo al programma chiamante.

> [!QUESTION] 💡 Perché è la CPU e non il programma a cambiare la modalità in Kernel Mode? 
> Se un programma utente potesse cambiare autonomamente la modalità della CPU da User Mode a Kernel Mode mediante una semplice istruzione software ordinaria, **qualsiasi virus o malware potrebbe proclamarsi amministratore assoluto del computer in microsecondi**. 
> La commutazione può avvenire esclusivamente mediante una **trappola hardware**: è la circuiteria interna del microprocessore che riconosce l'evento eccezionale e forza l'accesso solo attraverso punti di ingresso rigidamente controllati e validati dal Kernel.

> [!IMPORTANT] Esecuzione Non-Preemptive in Kernel Mode
> Le routine interne del Kernel (ad esempio il salvataggio dei registri della CPU durante il cambio di contesto o l'aggiornamento della tabella delle pagine di memoria) devono essere **rigorosamente non-preemptive (non interrompibili)**:
> - Se un'interruzione esterna bloccasse la CPU proprio mentre sta modificando i puntatori della lista dei processi o i registri di stato, il sistema si ritroverebbe in uno ==🔴 stato incoerente e corrotto==, provocando il crash istantaneo dell'intera macchina.

---

## 1.4 Sequenza di Avvio del Sistema Operativo (Bootstrap) e Ambienti Isolati

All'atto dell'accensione del calcolatore, la memoria centrale RAM è completamente vuota (volatile). Il caricamento del Sistema Operativo è un processo automatico suddiviso in **5 fasi sequenziali** noto come **Bootstrap**:

### Le 5 Fasi Dettagliate del Bootstrap
1. ==🔵 Accensione e Attivazione del Firmware (Reset Vector):== La corrente attiva la CPU. Il registro Program Counter della CPU viene pre-impostato via hardware su un indirizzo cablato noto come **Reset Vector** (es. `0xFFFFFFF0` su architetture x86 o `0x00000000` su ARM-64), dove si trova la prima istruzione del firmware permanente in ROM/NVRAM (**BIOS** o **UEFI**).
2. ==🔵 Esecuzione del POST (Power-On Self-Test):== Il firmware esegue un test diagnostico dei componenti fisici fondamentali (presenza e integrità di CPU, moduli RAM, scheda video, bus e controller). Se si riscontra un guasto critico, la scheda madre emette sequenze sonore (*Beep Codes*) o codici numerici esadecimali su display integrato.
3. ==🔵 Inizializzazione Hardware e Lettura Partizioni:== Vengono configurati i canali DMA, i canali PCIe e i clock. In base alla sequenza di avvio impostata (*Boot Order*), il firmware interroga il disco di avvio e legge la tabella delle partizioni (**MBR** o **GPT**).
4. ==🔵 Caricamento del Bootloader:== Il firmware individua il settore o la partizione di avvio e copia nella RAM il **Bootloader** (es. *GRUB2* in Linux, *Windows Boot Manager*, *rEFInd*). Se sono presenti più sistemi operativi, il Bootloader mostra il menu di scelta (*Boot Menu*).
5. ==🔵 Caricamento del Kernel e Inizializzazione Utente:== Il Bootloader carica l'eseguibile del Kernel nello spazio di memoria riservato della RAM (*Kernel Space*), cede il controllo della CPU al processo padre primario (denominato `init` o `systemd` in ambiente Linux, `smss.exe` in ambiente Windows) che avvia i demoni di servizio in background e, infine, rende disponibile la Shell grafica o testuale.