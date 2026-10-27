---
title: "Misura degli Angoli e Circonferenza Goniometrica"
description: "Dai gradi sessagesimali ai radianti, sistema sessagesimale (gradi, primi, secondi), definizione geometrica delle quattro funzioni circolari (seno, coseno, tangente, cotangente) e tabella degli angoli notevoli."
tags:
  - matematica/goniometria
  - radianti
  - circonferenza-goniometrica
  - angoli-notevoli
---

# Misura degli Angoli e Circonferenza Goniometrica

La **goniometria** è la branca della matematica che si occupa della misurazione degli angoli e dello studio delle funzioni periodiche associate alla circonferenza.

---

## 1. Misura degli Angoli: Gradi e Radianti

### Il Radiante (Misura Naturale degli Angoli)
Nel sistema metrico matematico, l'unità di misura fondamentale per gli angoli non è il grado sessagesimale, bensì il **radiante**:

> [!ABSTRACT] Definizione di Radiante
> Un **radiante** è la misura dell'angolo al centro di una circonferenza che sottende un arco di lunghezza esattamente pari al raggio della circonferenza stessa:
> $$ \bbox[8px,border:2px solid #4df5ff]{\alpha = \frac{l}{r}} $$
> Poiché l'intera circonferenza misura $C = 2\pi r$, l'angolo giro ($360^\circ$) misura:
> $$ \alpha_{\text{giro}} = \frac{2\pi r}{r} = \mathbf{2\pi \text{ radianti}} $$

### Equivalenza Fondamentale e Angoli Notevoli
Dividendo per due l'angolo giro si ricava la formula universale di conversione:
$$ \bbox[8px,border:2px solid #ffff4d]{180^\circ \iff \pi \text{ rad}} $$
Da cui discendono direttamente tutte le frazioni notevoli:
* $360^\circ = 2\pi$
* $180^\circ = \pi$
* $90^\circ = \frac{\pi}{2}$
* $60^\circ = \frac{\pi}{3}$
* $45^\circ = \frac{\pi}{4}$
* $30^\circ = \frac{\pi}{6}$

---

### Il Sistema Sessagesimale (Gradi, Primi, Secondi)
Spesso la misura in gradi viene espressa con decimali (es. $35{,}126^\circ$). Per convertirla in **Gradi, Primi ($'$) e Secondi ($''$)**:
* $1^\circ = 60'$ (un grado equivale a 60 primi).
* $1' = 60''$ (un primo equivale a 60 secondi).

> [!EXAMPLE] Conversione di $35{,}126^\circ$
> 1. Gradi interi: **$35^\circ$**.
> 2. Parte decimale $0{,}126 \times 60 = 7{,}56' \implies$ **$7'$** primi interi.
> 3. Nuova parte decimale $0{,}56 \times 60 = 33{,}6'' \approx$ **$33''$** secondi.
> **Risultato:** $\mathbf{35^\circ \; 7' \; 33''}$.

---

## 2. La Circonferenza Goniometrica

> [!INFO] Definizione
> La **circonferenza goniometrica** è una circonferenza orientata con:
> * Centro nell'origine degli assi: $O(0, 0)$
> * Raggio unitario: $\mathbf{r = 1}$
> * Equazione cartesiana: $\mathbf{x^2 + y^2 = 1}$
> 
> Per convenzione:
> * L'origine degli archi è il punto fisso $A(1, 0)$ sul semiasse positivo delle $x$.
> * Senso **antiorario** = Angoli **positivi** ($+\alpha$).
> * Senso **orario** = Angoli **negativi** ($-\alpha$).

---

## 3. Le Funzioni Goniometriche Fondamentali

Sia $P(x, y)$ il punto sulla circonferenza goniometrica individuato dall'angolo orientato $\alpha$:

> [!ABSTRACT] Definizioni Geometriche
> * $\mathbf{\color{#4da6ff}\cos\alpha}$ **(Coseno):** È l'**ascissa** del punto $P$ sul piano cartesiano: $x_P = \cos\alpha$.
> * $\mathbf{\color{#ff4d4d}\sin\alpha}$ **(Seno):** È l'**ordinata** del punto $P$ sul piano cartesiano: $y_P = \sin\alpha$.
> * $\mathbf{\color{#4dff4d}\tan\alpha}$ **(Tangente):** È il rapporto tra seno e coseno, geometricamente rappresentato dall'ordinata del punto di intersezione tra il prolungamento del raggio $OP$ e la retta verticale tangente $x = 1$:
>   $$ \tan\alpha = \frac{\sin\alpha}{\cos\alpha} \quad \left(\alpha \neq \frac{\pi}{2} + k\pi\right) $$
> * $\mathbf{\color{#d24dff}\cot\alpha}$ **(Cotangente):** È il rapporto inverso $\frac{\cos\alpha}{\sin\alpha} = \frac{1}{\tan\alpha}$, rappresentato sull'asse orizzontale $y = 1$ ($\alpha \neq k\pi$).

> [!EXAMPLE] Visualizzazione delle Funzioni (Angolo a 30°)
> ![[gonio_es1_circonferenza.png]]

---

## 4. Tabella degli Angoli Notevoli

Essendo la circonferenza di raggio $1$, le funzioni seno e coseno sono limitate nell'intervallo $[-1, +1]$:

| Gradi | Radianti | $\color{#ff4d4d}\sin\alpha$ | $\color{#4da6ff}\cos\alpha$ | $\color{#4dff4d}\tan\alpha$ | $\color{#d24dff}\cot\alpha$ |
| :---: | :---: | :---: | :---: | :---: | :---: |
| $\mathbf{0^\circ / 360^\circ}$ | $\mathbf{0 / 2\pi}$ | $0$ | $1$ | $0$ | $\nexists$ |
| $\mathbf{30^\circ}$ | $\mathbf{\frac{\pi}{6}}$ | $\frac{1}{2}$ | $\frac{\sqrt{3}}{2}$ | $\frac{\sqrt{3}}{3}$ | $\sqrt{3}$ |
| $\mathbf{45^\circ}$ | $\mathbf{\frac{\pi}{4}}$ | $\frac{\sqrt{2}}{2}$ | $\frac{\sqrt{2}}{2}$ | $1$ | $1$ |
| $\mathbf{60^\circ}$ | $\mathbf{\frac{\pi}{3}}$ | $\frac{\sqrt{3}}{2}$ | $\frac{1}{2}$ | $\sqrt{3}$ | $\frac{\sqrt{3}}{3}$ |
| $\mathbf{90^\circ}$ | $\mathbf{\frac{\pi}{2}}$ | $1$ | $0$ | $\nexists$ | $0$ |
| $\mathbf{180^\circ}$ | $\mathbf{\pi}$ | $0$ | $-1$ | $0$ | $\nexists$ |
| $\mathbf{270^\circ}$ | $\mathbf{\frac{3\pi}{2}}$ | $-1$ | $0$ | $\nexists$ | $0$ |
