---
title: "I Segnali nelle Telecomunicazioni: Analogici e Digitali"
description: "Trattazione approfondita della trasmissione dei segnali: sistema di telecomunicazione, segnali analogici e parametri d'onda (ampiezza, periodo, frequenza, fase), segnali digitali, rumore e conversione A/D."
tags:
  - sistemi-e-reti
  - segnali
  - telecomunicazioni
  - analogico-digitale
---

# I Segnali nelle Telecomunicazioni: Analogici e Digitali

> [!NOTE] Cos'è un Segnale?
> Nelle telecomunicazioni, un **segnale** è la variazione nel tempo di una grandezza fisica (solitamente una tensione elettrica, una corrente, un'onda elettromagnetica o un impulso luminoso) a cui è associata un'**informazione** da trasmettere a distanza.

---

## 1. Lo Schema di un Sistema di Telecomunicazione

Ogni sistema di trasmissione a distanza si articola su tre elementi fondamentali:

```mermaid
flowchart LR
    S["Sorgente Informazione<br/>(es. Voce umana)"] --> TX["Trasmettitore (TX)<br/>(Trasduttore, A/D, Modulatore)"]
    TX -->|Segnale Fisico| Canale["CANALE / MEZZO TRASMISSIVO<br/>• Rame (Elettrico)<br/>• Fibra Ottica (Ottico)<br/>• Etere / Spazio (Elettromagnetico)"]
    Canale -->|Segnale Attenuato + Rumore| RX["Ricevitore (RX)<br/>(Demodulatore, D/A, Filtro)"]
    RX --> D["Destinatario / Utente<br/>(es. Voce ascoltata)"]

    Rumore["Sorgenti di Rumore e Interferenze"] -.-> Canale
```

### Le Tre Tipologie di Mezzo Trasmissivo:
1. **Conduttori Metallici in Rame (Doppino intrecciato, Cavo Coassiale):** L'informazione viaggia sotto forma di impulsi di **tensione** e correnti elettriche.
2. **Fibra Ottica:** L'informazione viaggia sotto forma di **impulsi luminosi (fotoni)** guidati per riflessione totale interna nel silicio ultra-puro. Immuni a interferenze elettromagnetiche.
3. **Etere (Spazio libero / Aria):** L'informazione viaggia sotto forma di **onde elettromagnetiche** a radiofrequenza o microonde (es. Wi-Fi, 4G/5G, ponti radio, satelliti).

---

## 2. Segnale Analogico vs Segnale Digitale

```mermaid
flowchart TD
    S["Tipologie di Segnali"]
    S --> A["Segnale Analogico"]
    S --> D["Segnale Digitale"]

    A --> A1["Varia con CONTINUITÀ nel tempo"]
    A --> A2["Può assumere INFINITI valori reali in un intervallo"]
    A --> A3["Esempio: Voce umana, musica, temperatura"]

    D --> D1["Discreto nel tempo (campionato a istanti k·T)"]
    D --> D2["Assume solo un numero FINITO di valori prefissati"]
    D --> D3["Esempio: Bit binari (0 e 1), caratteri ASCII"]
```

---

## 3. Il Segnale Analogico e i Parametri Fondamentali

Un segnale analogico periodico elementare è descritto dall'equazione della sinusoide:

$$s(t) = A \cdot \sin(2\pi f t + \varphi)$$

```mermaid
flowchart LR
    subgraph PARAMETRI [I Quattro Parametri d'Onda]
        P1["Ampiezza (A): Altezza massima del picco [Volt]"]
        P2["Periodo (T): Durata in secondi di un'oscillazione completa [s]"]
        P3["Frequenza (f): Numero di oscillazioni in 1 secondo [Hz]"]
        P4["Fase (φ): Posizione angolare dell'onda a t = 0 [rad o gradi]"]
    end
```

### Formule e Definizioni Matematiche:
1. **Ampiezza ($A$ o $V_{max}$):** Il valore di picco raggiunto dal segnale rispetto al livello di riferimento di zero. L'ampiezza picco-picco vale $V_{pp} = 2A$.
2. **Periodo ($T$):** L'intervallo temporale minimo dopo il quale la forma d'onda torna a ripetersi identica a se stessa:
   $$T = \frac{1}{f} \quad [\text{secondi}]$$
3. **Frequenza ($f$):** Il numero di periodi completati in un secondo. Si misura in **Hertz (Hz)**:
   $$f = \frac{1}{T} \quad [\text{Hz}]$$
   *(1 kHz = $10^3$ Hz, 1 MHz = $10^6$ Hz, 1 GHz = $10^9$ Hz)*.
4. **Fase iniziale ($\varphi$):** Determina il punto di partenza dell'onda all'istante iniziale $t=0$. Se due onde della stessa frequenza hanno un ritardo reciproco, si dice che sono *sfasate*.
5. **Lunghezza d'onda ($\lambda$):** La distanza spaziale percorsa dall'onda durante un periodo completo $T$, viaggiando alla velocità di propagazione $v$ nel mezzo:
   $$\lambda = \frac{v}{f}$$
   *(Per le onde radio nel vuoto $v \approx c = 3 \times 10^8 \text{ m/s}$)*.

---

## 4. Il Segnale Digitale e la Trasmissione Binaria

Nel segnale digitale, l'informazione è codificata attraverso livelli discreti di tensione:
- **Segnale a più livelli ($M$-ario):** Può assumere $M$ valori distinti (es. a 5 livelli: $\{-2\text{V}, -1\text{V}, 0\text{V}, +1\text{V}, +2\text{V}\}$).
- **Segnale Binario ($M=2$):** Assume esclusivamente due livelli logici:
  - Livello Alto (**1 logico**): tipicamente $+5\text{V}$ o $+3.3\text{V}$.
  - Livello Basso (**0 logico**): tipicamente $0\text{V}$.

### Forma d'Onda Ideale vs Segnale Reale nel Mezzo:

```mermaid
flowchart TD
    IDEAL["Onda Quadra Ideale emessa dal TX (Transizioni nette a gradino 0/1)"] --> MEZZO["Passaggio nel Canale Fisico (Attenuazione, Capacità parassita, Rumore termico)"]
    MEZZO --> DIST["Segnale Reale al Ricevitore (Fronti arrotondati, oscillazioni, rumore sovrapposto)"]
    DIST --> REGEN["Circuito di Squadratura / Trigger di Schmitt (Confronto con soglia e rigenerazione del bit pulito)"]
```

> [!TIP] Perché il Digitale ha soppiantato l'Analogico?
> In un segnale analogico, qualsiasi disturbo o rumore introdotto dal cavo degrada irrimediabilmente l'informazione (fruscio audio, neve video). In un segnale digitale, finché il disturbo non è così forte da far scambiare uno `0` per un `1`, il ricevitore può **ricostruire e rigenerare perfettamente** la sequenza originale di bit senza perdita di qualità!

---

## 5. La Conversione Analogico-Digitale (A/D)

Poiché l'essere umano genera e percepisce grandezze fisiche analogiche (la voce, i suoni, la luce), mentre i computer elaborano solo bit binari, è necessaria una conversione in tre passaggi:

```mermaid
flowchart LR
    S_IN["Voce Analogica s(t)"] --> CAMP["1. Campionamento<br/>(Teorema di Nyquist-Shannon:<br/>fc ≥ 2·fmax)"]
    CAMP --> QUANT["2. Quantizzazione<br/>(Arrotondamento ai livelli discreti)"]
    QUANT --> COD["3. Codifica Binaria<br/>(Generazione stringa di bit 0/1)"]
    COD --> BIT["Flusso Dati Digitale"]
```

1. **Campionamento (*Sampling*):** Si preleva il valore del segnale a intervalli regolari di tempo $T_c = 1/f_c$.
   - **Teorema di Shannon-Nyquist:** Per poter ricostruire fedelmente il segnale, la frequenza di campionamento $f_c$ deve essere almeno il doppio della massima frequenza $f_{max}$ contenuta nel segnale:
     $$f_c \ge 2 \cdot f_{max}$$
     *(Es. Telefonia vocale: voce fino a 4 kHz $\implies f_c = 8 \text{ kHz}$; Audio CD: fino a 20 kHz $\implies f_c = 44.1 \text{ kHz}$)*.
2. **Quantizzazione:** L'ampiezza continua di ciascun campione viene approssimata al livello discreto più vicino tra $L = 2^b$ livelli permessi. L'errore di approssimazione commesso è detto *rumore di quantizzazione*.
3. **Codifica:** Ciascun livello quantizzato viene tradotto in una parola binaria di $b$ bit.
