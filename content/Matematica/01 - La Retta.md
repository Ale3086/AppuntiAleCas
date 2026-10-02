---
title: "01 - La Retta"
tags:
  - matematica/geometria-analitica
  - tipologia/teoria
---
# La Retta (Geometria Analitica)
> [!info] Cos'è la retta?
> La retta è una funzione lineare e rappresenta uno dei concetti fondamentali della geometria analitica.

## Le due forme dell'equazione della retta
Esistono principalmente due modi per scrivere l'equazione di una retta nel piano cartesiano:

> [!abstract] 1. Forma Implicita
> L'equazione si presenta con tutti i termini a sinistra dell'uguale:
> $$ a \color{#4da6ff}x \color{white}+ b \color{#ff4d4d}y \color{white}+ c = 0 $$
> Dove $a$, $b$ e $c$ sono coefficienti reali.

> [!abstract] 2. Forma Esplicita
> L'equazione è esplicitata rispetto alla $\color{#ff4d4d}y$:
> $$ \color{#ff4d4d}y \color{white}= \color{#4dff4d}m \color{white}\color{#4da6ff}x \color{white}+ \color{#d24dff}q $$
>
> In questa forma possiamo identificare subito due parametri chiave:
> *   **<span style="color: #4dff4d">$m$ (Coefficiente angolare o pendenza)</span>:** Indica l'inclinazione della retta rispetto all'asse $x$.
>     *   Se $m > 0$, la retta è crescente ($\nearrow$).
>     *   Se $m < 0$, la retta è decrescente ($\searrow$).
>     *   Se $m = 0$, la retta è orizzontale ($\rightarrow$).
> *   **<span style="color: #d24dff">$q$ (Ordinata all'origine o intercetta)</span>:** Indica il punto in cui la retta interseca l'asse $y$, ovvero il punto $(0, q)$.

---
## Passaggio da una forma all'altra
> [!tip] Da Implicita a Esplicita
> Partiamo da $ax + by + c = 0$:
> 1.  Isoliamo la $y$: $by = -ax - c$
> 2.  Dividiamo tutto per $b$: $y = -\frac{a}{b}x - \frac{c}{b}$
> Da qui deduciamo che:
> $$ \color{#4dff4d}m = -\frac{a}{b} \quad \text{e} \quad \color{#d24dff}q = -\frac{c}{b} $$

---
## Disegnare una retta
Per tracciare il grafico di una retta, è sufficiente trovare **due punti** che vi appartengono tramite una tabella $x, y$.

> [!example] Esempio pratico
> Disegniamo la retta $y = 2x - 1$
> *   Se $\color{#4da6ff}x = 0 \color{white}\Rightarrow y = -1 \Rightarrow \textbf{A(0, -1)}$
> *   Se $\color{#4da6ff}x = 1 \color{white}\Rightarrow y = 1 \Rightarrow \textbf{B(1, 1)}$
>
> ![[retta_es1_disegno.png]]

---
## Condizioni di Parallelismo e Perpendicolarità
Date due rette $r: y = m_1x + q_1$ e $s: y = m_2x + q_2$:

> [!info] Rette Parallele ($r \parallel s$)
> Due rette sono parallele se e solo se hanno la <span style="color: #4dff4d">stessa pendenza</span>:
> $$ \color{#4dff4d}m_1 = m_2 $$

> [!example] Esempio Rette Parallele
> *   $y = \color{#4dff4d}\frac{1}{2}\color{white}x + 2$
> *   $y = \color{#4dff4d}\frac{1}{2}\color{white}x - 5$
> Entrambe hanno $m = \frac{1}{2}$, quindi sono parallele.
> ![[retta_es2_parallele.png]]

> [!info] Rette Perpendicolari ($r \perp s$)
> Due rette sono perpendicolari se il coefficiente angolare di una è l'<span style="color: #ff4d4d">antireciproco</span> dell'altra:
> $$ \color{#ff4d4d}m_1 = -\frac{1}{m_2} \quad \text{oppure} \quad m_1 \cdot m_2 = -1 $$

> [!example] Esempio Rette Perpendicolari
> *   $y = \color{#ff4d4d}3\color{white}x + 1$ (qui $m_1 = 3$)
> *   $y = \color{#ff4d4d}-\frac{1}{3}\color{white}x + 5$ (qui $m_2 = -\frac{1}{3}$)
> Essendo $3 \cdot (-\frac{1}{3}) = -1$, le rette formano un angolo di $90^\circ$.
> ![[retta_es3_perpendicolari.png]]

> [!warning] Attenzione
> Le rette $y=8x+7$ e $y=-3x+5$ NON sono né parallele né perpendicolari poiché non soddisfano nessuna delle due condizioni.

---
## Formule Fondamentali
> [!tip] 1. Equazione della retta passante per un punto $P(x_P, y_P)$ con $m$ noto
> $$ y - y_P = \color{#4dff4d}m\color{white}(x - x_P) $$
> **Esempio:** Retta per $P(1, -2)$ con $m = 3$.
> $$ y - (-2) = \color{#4dff4d}3\color{white}(x - 1) \implies y + 2 = 3x - 3 \implies \mathbf{y = 3x - 5} $$

> [!tip] 2. Equazione della retta passante per due punti $A(x_A, y_A)$ e $B(x_B, y_B)$
> Se non abbiamo $m$, ma due punti, la formula è:
> $$ \frac{y - y_A}{y_B - y_A} = \frac{x - x_A}{x_B - x_A} $$

> [!example] Esempio per due punti
> Troviamo la retta passante per $A(-2, 5)$ e $B(0, 3)$.
> $$ \frac{y - 5}{3 - 5} = \frac{x - (-2)}{0 - (-2)} \implies \frac{y - 5}{-2} = \frac{x + 2}{2} $$
> Moltiplicando per $-2$:
> $$ y - 5 = -(x + 2) \implies y = -x - 2 + 5 \implies \mathbf{y = -x + 3} $$
> ![[retta_es4_2punti.png]]

> [!tip] 3. Distanza tra due punti e Punto-Retta
> **Distanza tra due punti:**
> $$ \overline{AB} = \sqrt{(x_B - x_A)^2 + (y_B - y_A)^2} $$
> **Distanza punto-retta (usando la forma implicita $ax+by+c=0$):**
> $$ d(P, r) = \frac{|a x_P + b y_P + c|}{\sqrt{a^2 + b^2}} $$
