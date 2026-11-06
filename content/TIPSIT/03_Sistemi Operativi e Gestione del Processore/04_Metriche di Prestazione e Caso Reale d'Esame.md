---
title: "Metriche di Prestazione e Caso Reale d'Esame"
description: "Formulario matematico completo (Turnaround Time, Tempo di Attesa, Efficienza CPU, Throughput) e analisi analitica approfondita del caso d'esame con interruzione hardware, preemption, cronologia secondo per secondo e calcoli formali."
tags:
  - tipsit/sistemi-operativi
  - metriche-scheduling
  - turnaround-time
  - efficienza-cpu
  - caso-esame
---
# 📊 Metriche di Prestazione e Caso Reale d'Esame

La valutazione quantitativa di un algoritmo di scheduling si basa su metriche matematiche precise. In questa sezione viene presentato il **formulario formale completo** e la risoluzione analitica guidata di un **tipico problema d'esame** caratterizzato da interruzioni hardware e prelazione della CPU.

---

## 4.1 Formulario Formale delle Metriche di Scheduling

> [!ABSTRACT] 📐 Le 4 Metriche di Prestazione Cardine dello Scheduling
> 1. **1️⃣ Tempo di Turnaround ($TT_i$):** Tempo totale dal momento dell'ingresso nel sistema fino al completamento definitivo ($T_{\text{fine}} - T_{\text{arrivo}}$).
> 2. **2️⃣ Tempo di Attesa ($TA_i$):** Tempo complessivo trascorso fermo in RAM o in I/O senza poter usare la CPU ($TT_i - T_{\text{burst}}$).
> 3. **3️⃣ Efficienza della CPU ($\eta$):** Frazione percentuale del tempo totale spesa in calcolo utile per i processi utente ($\frac{\sum T_{\text{burst}}}{T_{\text{totale}}} \times 100\%$).
> 4. **4️⃣ Throughput del Sistema:** Numero di processi portati a termine con successo per unità di tempo.

---

### 1. Tempo di Turnaround ($TT_i$ - Tempo di Completamento)
> [!NOTE] Definizione di Turnaround Time
> Il **Tempo di Turnaround ($TT_i$)** rappresenta l'intervallo temporale complessivo che intercorre tra l'istante in cui il processo entra per la prima volta nel sistema (stato *NEW/HOLD*) e l'istante in cui conclude definitivamente la propria esecuzione (stato *TERMINATED*):

$$\mathbf{TT_i = T_{\text{fine}, i} - T_{\text{arrivo}, i}}$$

Il **Tempo di Turnaround Medio ($TT_M$)** su un insieme di $N$ processi è la media aritmetica dei singoli tempi di turnaround:
$$\mathbf{TT_M = \frac{\sum_{i=1}^{N} TT_i}{N} = \frac{TT_1 + TT_2 + \dots + TT_N}{N}}$$

---

### 2. Tempo di Attesa ($TA_i$ - Waiting Time)
> [!NOTE] Definizione di Tempo di Attesa
> Il **Tempo di Attesa ($TA_i$)** è la somma di tutti gli intervalli temporali in cui un processo è rimasto inattivo, in coda nella memoria RAM (stato *READY*) o in attesa del completamento di un'operazione di I/O (stato *WAITING*), senza poter utilizzare la CPU:

$$\mathbf{TA_i = TT_i - T_{\text{burst}, i}}$$

Per i processi che subiscono preemption (interruzioni multiple), il tempo di attesa può essere calcolato anche sommando direttamente i singoli segmenti temporali trascorsi in attesa lungo l'asse dei tempi:
$$\mathbf{TA(P) = (T_{\text{inizio1}} - T_{\text{arrivo}}) + (T_{\text{ripresa1}} - T_{\text{sospensione1}}) + \dots}$$

Il **Tempo di Attesa Medio ($TA_M$)** su $N$ processi è dato da:
$$\mathbf{TA_M = \frac{\sum_{i=1}^{N} TA_i}{N} = \frac{TA_1 + TA_2 + \dots + TA_N}{N}}$$

---

### 3. Efficienza della CPU ($\eta$)
> [!NOTE] Definizione di Efficienza della CPU
> L'**Efficienza della CPU ($\eta$)** rappresenta la frazione percentuale del tempo di osservazione in cui la CPU è stata attivamente impegnata nell'elaborazione del codice utile dei programmi utente:

$$\mathbf{\eta = \frac{\sum_{i=1}^{N} T_{\text{burst}, i}}{T_{\text{totale}}} \times 100\%}$$

Scomponendo il tempo totale di osservazione del sistema nelle sue componenti fisiche reali:
$$\mathbf{T_{\text{totale}} = \sum_{i=1}^{N} T_{\text{burst}, i} + T_{\text{idle}} + T_{\text{overhead}}}$$

Dove:
- $\sum T_{\text{burst}, i}$: somma dei tempi di esecuzione utile dei processi.
- ==🟠 $T_{\text{idle}}$:== tempo in cui la CPU è rimasta completamente inattiva per assenza di processi pronti.
- ==🟠 $T_{\text{overhead}}$:== tempo speso dal sistema operativo per eseguire context switch, aggiornamento dei PCB e routine del kernel.

> [!QUESTION] 💡 Perché nei sistemi reali risulta sempre $\eta < 100\%$? (Motivazione per la Prof)
> È fisicamente impossibile raggiungere un'efficienza del $100\%$ perché il passaggio da un processo all'altro non è istantaneo: richiede il tempo di cambio di contesto del Dispatcher ($T_{\text{overhead}}$). Inoltre, possono verificarsi finestre temporali in cui nessun processo è pronto in RAM ($T_{\text{idle}}$), durante le quali la CPU esegue unicamente il ciclo nullo a basso consumo (*HLT / idle loop*).

---

### 4. Throughput (Produttività del Sistema)
> [!NOTE] Definizione di Throughput
> Il **Throughput** misura il numero di processi che il sistema è in grado di completare con successo all'interno di una determinata unità di tempo (es. processi al secondo o processi per minuto):

$$\mathbf{\text{Throughput} = \frac{\text{Numero di Processi Completati}}{\text{Intervallo di Tempo Osservato}}}$$

---

## 4.2 Analisi Completa del Caso Reale d'Esame: Interruzione Hardware

Questa tipologia di esercizio è tra le più gettonate nei compiti in classe e negli esami di TPSIT, poiché verifica la capacità dello studente di comprendere le **interruzioni hardware**, la **prelazione** e il calcolo rigoroso delle metriche.

### Traccia dello Scenario
All'interno del sistema operano **3 processi distinti**:
- ==🔵 Processo $P_1$ (Browser di navigazione):== processo utente a priorità standard.
  - Istante di arrivo: $T_A = 1$
  - Tempo di burst richiesto: $T_B = 7$
- ==🔴 Processo $P_2$ (Driver della tastiera):== processo di sistema collegato a una periferica fisica ad alta priorità hardware.
  - Istante di arrivo (evento tasto premuto): $T_A = 2$
  - Tempo di burst richiesto: $T_B = 5$
- ==🟢 Processo $P_3$ (Riproduttore audio Spotify):== processo utente standard.
  - Istante di arrivo: $T_A = 3$
  - Tempo di burst richiesto: $T_B = 2$

---

### Diagramma Temporale di Gantt (Risoluzione Visiva)

![[gantt_chart_exam_interrupt.jpg|850]]

> [!NOTE] 📊 Legenda Visiva del Diagramma di Gantt
> - **$T=0 \to T=1$:** ==🟠 IDLE== (CPU in attesa).
> - **$T=1 \to T=2$:** ==🔵 $P_1$ RUNNING== (esegue 1 unità).
> - **$T=2$:** ⚡ **Interruzione Hardware (IRQ)**: $P_2$ fa prelazione su $P_1$. $P_1$ torna in ==🟢 READY== con burst residuo pari a $6$.
> - **$T=2 \to T=7$:** ==🔴 $P_2$ RUNNING== (esegue 5 unità non interrompibili da processi utente). A $T=3$ arriva $P_3$ e si mette in coda ==🟢 READY==. A $T=7$, $P_2$ termina (==🔴 TERMINATED==).
> - **$T=7 \to T=9$:** ==🟢 $P_3$ RUNNING== (SJF: burst 2 < residuo 6). A $T=9$, $P_3$ termina.
> - **$T=9 \to T=15$:** ==🔵 $P_1$ RUNNING== (completa le 6 unità residue e termina a $T=15$).

---

## 4.3 Calcoli Matematici Formali del Problema

Raccogliamo tutti i valori all'interno della tabella analitica:

| Processo  | Descrizione          | Istante Arrivo ($T_A$) | Burst Totale ($T_B$) | Istante Fine ($T_{\text{fine}}$) | Turnaround ($TT = T_{\text{fine}} - T_A$) | Attesa ($TA = TT - T_B$) |
| :-------: | :------------------- | :--------------------: | :------------------: | :------------------------------: | :---------------------------------------: | :----------------------: |
| **$P_1$** | Browser Web (Utente) |          $1$           |         $7$          |             **$15$**             |          $15 - 1 = \mathbf{14}$           |  $14 - 7 = \mathbf{7}$   |
| **$P_2$** | Driver Tastiera (HW) |          $2$           |         $5$          |             **$7$**              |           $7 - 2 = \mathbf{5}$            |   $5 - 5 = \mathbf{0}$   |
| **$P_3$** | Riproduttore Audio   |          $3$           |         $2$          |             **$9$**              |           $9 - 3 = \mathbf{6}$            |   $6 - 2 = \mathbf{4}$   |

---

### Calcolo dell'Efficienza della CPU ($\eta$)
- Somma dei tempi di burst utili eseguiti dalla CPU:
  $$\sum T_B = T_{B1} + T_{B2} + T_{B3} = 7 + 5 + 2 = \mathbf{14 \text{ unità}}$$
- Tempo totale trascorso di osservazione del sistema:
  $$T_{\text{totale}} = 15 \text{ unità}$$
- Tempo di inattività della CPU (*Idle Time*):
  $$T_{\text{idle}} = 1 \text{ unità (da } T=0 \text{ a } T=1)$$

$$\mathbf{\eta = \frac{\sum T_B}{T_{\text{totale}}} \times 100\% = \frac{14}{15} \times 100\% \approx 93{,}33\%}$$

> [!NOTE] Riscontro dell'Efficienza
> La CPU ha lavorato per il $93{,}33\%$ del tempo a disposizione. L'unico momento di inefficienza è stato l'intervallo iniziale da $T=0$ a $T=1$ ($6{,}67\%$), in cui nessun processo era ancora arrivato nel sistema.
