---
title: "02 - Le Coniche (Parabola e Circonferenza)"
tags:
  - matematica/geometria-analitica
  - tipologia/teoria
---

# Le Coniche: Parabola e Circonferenza

## 1. La Parabola

> [!info] Definizione
> Si definisce **parabola** il luogo geometrico dei punti del piano equidistanti da un punto fisso detto <span style="color: #ffff4d">Fuoco ($F$)</span> e da una retta fissa detta <span style="color: #4dff4d">Direttrice ($d$)</span>.
> $\overline{PF} = d(P, d)$

> [!abstract] Equazione Generica
> $$ y = ax^2 + bx + c $$
> Dove $a, b, c \in \mathbb{R}$ e $a \neq 0$.
> *(Ricorda di calcolare sempre il delta: $\Delta = b^2 - 4ac$)*
> *   Se **$a > 0$**: concavità verso l'alto $\cup$
> *   Se **$a < 0$**: concavità verso il basso $\cap$

### Elementi Caratteristici
Dall'equazione generica possiamo calcolare i punti e le rette notevoli:

> [!tip] Formule della Parabola
> 1.  <span style="color: #ff4d4d">Vertice ($V$):</span> Punto di massimo o minimo.
>     $$ V \left( \color{#ff4d4d}-\frac{b}{2a}; -\frac{\Delta}{4a} \right) $$
> 2.  <span style="color: #ffff4d">Fuoco ($F$):</span> Punto fondamentale dentro la concavità.
>     $$ F \left( \color{#ffff4d}-\frac{b}{2a}; \frac{1 - \Delta}{4a} \right) $$
> 3.  <span style="color: #d24dff">Asse di Simmetria:</span> Retta verticale che passa per Vertice e Fuoco.
>     $$ x = \color{#d24dff}-\frac{b}{2a} $$
> 4.  <span style="color: #4dff4d">Direttrice:</span> Retta orizzontale posizionata "dietro" al Vertice.
>     $$ y = \color{#4dff4d}-\frac{1 + \Delta}{4a} $$

> [!example] Rappresentazione Grafica
> Ecco tutti gli elementi posizionati graficamente rispetto a una generica parabola.
> ![[coniche_es1_parabola.png]]

---

## 2. La Circonferenza

> [!info] Definizione
> La **circonferenza** è il luogo geometrico dei punti del piano equidistanti da un punto fisso detto <span style="color: #ffffff">Centro ($C$)</span>. Tale distanza si chiama <span style="color: #ffff4d">Raggio ($r$)</span>.

> [!abstract] Equazione della Circonferenza
> A partire dal Centro $C(x_C, y_C)$ e dal raggio $r$:
> $$ (x - x_C)^2 + (y - y_C)^2 = \color{#ffff4d}r^2 $$
> Sviluppando i quadrati, si ottiene l'**equazione canonica**:
> $$ x^2 + y^2 + ax + by + c = 0 $$

> [!tip] Legami tra i coefficienti
> Dall'equazione canonica possiamo recuperare Centro e Raggio:
> *   **Centro:** $C\left( -\frac{a}{2}, -\frac{b}{2} \right)$
> *   **Raggio:** $r = \sqrt{\left(-\frac{a}{2}\right)^2 + \left(-\frac{b}{2}\right)^2 - c}$

### Esempio Notevole: Centro nell'Origine

Se la circonferenza ha il centro coincidente con l'origine degli assi $C(0,0)$ e raggio $r$, l'equazione si semplifica notevolmente.

> [!example] Esempio Pratico
> Data la circonferenza con centro $C(0,0)$ e raggio $\color{#ffff4d}r = 2$.
> $$ (x - 0)^2 + (y - 0)^2 = 2^2 \implies \mathbf{x^2 + y^2 = 4} $$
> ![[coniche_es2_circonferenza.png]]

---

## 3. Parabola con Asse Orizzontale

Se scambiamo la $x$ con la $y$ nell'equazione, otteniamo una parabola "sdraiata".

> [!abstract] Equazione
> $$ \color{#4da6ff}x \color{white}= a y^2 + b y + c $$
> In questo caso l'asse di simmetria è orizzontale (parallelo all'asse X).
> * Se $a > 0$, la concavità è verso destra $\rightarrow$
> * Se $a < 0$, la concavità è verso sinistra $\leftarrow$

> [!example] Esempio Parabola Orizzontale
> Ecco il grafico di $x = y^2$ (qui $a=1, b=0, c=0$). Il vertice è nell'origine e 'abbraccia' l'asse X.
> ![[coniche_es3_parabola_orizz.png]]

---

## 4. Intersezioni Retta-Conica

Per trovare i punti di intersezione tra una retta e una conica (es. circonferenza o parabola), si mette a **Sistema** l'equazione della retta con quella della conica.

> [!tip] Metodo di Risoluzione (Il Delta)
> Sostituendo la retta nella conica, si ottiene un'equazione di II grado. Dal suo $\Delta$ scopriamo la posizione reciproca:
> *   $\color{#4dff4d}\Delta > 0$: La retta è **Secante** (2 punti di intersezione distinti).
> *   $\color{#ffff4d}\Delta = 0$: La retta è **Tangente** (1 punto di intersezione, o due coincidenti).
> *   $\color{#ff4d4d}\Delta < 0$: La retta è **Esterna** (0 punti di intersezione).

> [!example] Rappresentazione Visiva (Retta e Circonferenza)
> Le tre rette mostrano graficamente i tre casi del Delta.
> ![[coniche_es4_intersezioni.png]]
