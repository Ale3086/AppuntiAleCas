---
title: "Sistemi Operativi e Gestione del Processore"
description: "Architettura interna del sistema operativo: Macchina Astratta, Ring Model, User/Kernel mode, System Call, sequenza di Boot (BIOS/UEFI, MBR/GPT), modalità di elaborazione, PCB/JCB/Thread, ciclo di vita dei processi, algoritmi di scheduling e metriche prestazionali."
---
# 📂 Sistemi Operativi e Gestione del Processore

<div class="notebooklm-box">
  <div class="notebooklm-header">🧠 Studio con Google NotebookLM</div>
  <p class="notebooklm-desc">
    Esporta l'intero modulo (<strong>4 lezioni complete + tutti gli schemi e immagini</strong>) in un unico file pronto per l'analisi multimodale di Google NotebookLM:
  </p>
  <div class="notebooklm-actions">
    <a href="Sistemi_Operativi_e_Gestione_del_Processore_completo.pdf" download class="btn-notebooklm btn-notebooklm-primary">
      📥 Scarica PDF con Immagini (Fonte Unica per NotebookLM)
    </a>
  </div>
</div>

Architettura interna del sistema operativo: Macchina Astratta, Ring Model, User/Kernel mode, System Call, sequenza di Boot (BIOS/UEFI, MBR/GPT), modalità di elaborazione, PCB/JCB/Thread, ciclo di vita dei processi, algoritmi di scheduling e metriche prestazionali.

### **[[01_Architettura del Sistema Operativo, Boot e Privilegi]]**
Macchina astratta e architettura a 4 livelli, modello a ring concentrici (Ring 0..3), User Mode vs Kernel Mode, System Call e trap software (`INT 0x80`), sequenza di Bootstrap in 5 fasi, BIOS vs UEFI, MBR (dimostrazione matematica limite 2 TiB) vs GPT e ambienti isolati (Dual Boot con exFAT, Macchine Virtuali con Hypervisor, Container Docker).

### **[[02_Modalità di Elaborazione e Entità Software]]**
Modalità di calcolo (Batch, Interattiva, Multiprogrammazione), superamento dell'I/O Bottleneck tramite controller DMA e gerarchia di velocità delle memorie, Time-Sharing e dimensionamento del Time-Slice ($T_Q \ge 100 \times T_{CS}$), sistemi Real-Time (Hard vs Soft) e ciclo evolutivo Programma -> Job (JCB su disco) -> Processo (PCB in RAM) -> Thread.

### **[[03_Ciclo di Vita del Processo e Algoritmi di Scheduling]]**
Diagramma degli stati del processo (Nuovo, Pronto, In esecuzione, Sospeso, Finito) con le code RL e WL, i 6 moduli del Kernel (LTS, MTS, STS, Dispatcher con le 3 azioni, Traffic Controller, Interrupt Handler), la regola d'oro e gli algoritmi di scheduling: FCFS (Effetto Convoglio), SJF (Starvation), SRTF, Round-Robin e Priorità con tecnica dell'Aging.

### **[[04_Metriche di Prestazione e Caso Reale d'Esame]]**
Formulario matematico completo (Turnaround Time, Tempo di Attesa, Efficienza CPU, Throughput) e analisi analitica approfondita del caso d'esame con interruzione hardware da tastiera ($P_2$), prelazione su $P_1$, gestione arrivo di $P_3$ (Spotify), diagramma temporale di Gantt e cronologia secondo per secondo.

---

## 🎨 Legenda Evidenziazioni per lo Studio Veloce

| Evidenziazione | Categoria Concettuale | Significato e Utilizzo |
| :--- | :--- | :--- |
| `==🟡 Testo==` | **Giallo - Concetto Chiave** | Definizioni primarie, principi architetturali fondamentali (es. Macchina Astratta, Time-Sharing). |
| `==🟢 Testo==` | **Verde - Vantaggio / Stato Positivo** | Punti di forza, transizioni corrette, stati attivi (es. Stato READY, Isolamento, DMA). |
| `==🔴 Testo==` | **Rosso - Pericolo / Errore / Vincolo** | Crash di sistema (BSOD/Panic), inedia (Starvation), prelazione forzata, deadline rigide. |
| `==🔵 Testo==` | **Blu - Hardware & Strutture Dati** | Moduli fisici, registri della CPU, blocchi di controllo (PCB, JCB, Kernel, GPT, UEFI). |
| `==🟣 Testo==` | **Viola - Meccanismi Interni & Interrupt** | System Call, Trap software (`INT 0x80`), Context Switch atomico, segnali IRQ. |
| `==🟠 Testo==` | **Arancione - Metriche & Formule** | Turnaround time ($TT$), tempi di attesa ($TA$), Time-Slice ($T_Q$), efficienza ($\eta$). |

---

## 🖼️ Galleria delle Illustrazioni Tecniche

Tutte le illustrazioni tecniche originali sono archiviate nella cartella `content/TIPSIT/Zimmagini/` e collegate nei rispettivi fascicoli:

| Fascicolo | File Immagine | Concetto Illustrato |
| :--- | :--- | :--- |
| **01** | `![[os_layers_stack_hardware_user.jpg|120]]` | **Architettura a 4 Livelli:** Hardware $\to$ Sistema Operativo $\to$ Applicazioni $\to$ Utente. |
| **01** | `![[os_ring_model.jpg|120]]` | **Modello a Cipolla (Onion Skin):** Ring 0 (Kernel) a Ring 3 (File System) e Shell esterna. |
| **01** | `![[system_call_trap_architecture.jpg|120]]` | **Architettura System Call:** Passaggio sicuro User Space $\to$ Kernel Space tramite Hardware Trap (`INT 0x80`). |
| **01** | `![[bootstrap_5_steps_sequence.jpg|120]]` | **Sequenza di Boot in 5 Fasi:** Reset Vector $\to$ POST $\to$ Partizioni $\to$ Bootloader $\to$ Kernel. |
| **01** | `![[vm_vs_docker_comparison.jpg|120]]` | **Virtual Machine vs Container Docker:** Hypervisor + Guest OS pesanti vs Kernel condiviso leggero. |
| **02** | `![[monoprogramming_vs_multiprogramming_dma.jpg|120]]` | **Monoprogrammazione vs Multiprogrammazione:** Tempi morti della CPU vs Efficienza del controller DMA. |
| **02** | `![[pcb_structure_threads.jpg|120]]` | **Struttura del PCB e Multithreading:** Tabella registri/PID e condivisione memoria Heap/Code tra thread. |
| **03** | `![[process_states_lifecycle.jpg|120]]` | **Ciclo di Vita a 6 Stati:** Transizioni di stato del processo tra NEW, READY, RUNNING, WAITING, SWAP, TERMINATED. |
| **03** | `![[kernel_6_modules_architecture.jpg|120]]` | **I 6 Moduli del Kernel:** LTS, MTS (Swapper), STS, Dispatcher (3 compiti), Traffic Controller, Interrupt Handler. |
| **03** | `![[scheduling_algorithms_overview.jpg|120]]` | **Panoramica Algoritmi di Scheduling:** Non-Preemptive (FCFS, SJF) vs Preemptive (SRTF, Round-Robin, Aging). |
| **04** | `![[gantt_chart_exam_interrupt.jpg|120]]` | **Diagramma di Gantt Caso d'Esame:** Asse temporale da $T=0$ a $T=15$ con interruzione IRQ a $T=2$. |
