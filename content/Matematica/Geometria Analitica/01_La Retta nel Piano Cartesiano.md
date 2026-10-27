---
title: "La Retta nel Piano Cartesiano"
description: "Trattazione avanzata della retta: forme esplicita e implicita, coefficiente angolare, parallelismo, perpendicolarità, fasci di rette, equazioni per punti e formule di distanza."
tags:
  - matematica/geometria-analitica
  - retta
  - fasci-di-rette
  - coefficiente-angolare
---

# La Retta nel Piano Cartesiano

La retta è l'ente geometrico fondamentale della geometria analitica e corrisponde sul piano alla rappresentazione grafica di una **funzione polinomiale di primo grado (lineare)**.

---

## 1. Le Due Forme dell'Equazione della Retta

### A. Forma Implicita (Generale)
Tutti i termini si trovano al primo membro uguagliati a zero:
$$ \bbox[8px,border:2px solid #4da6ff]{a\color{#4da6ff}x \color{white}+ b\color{#ff4d4d}y \color{white}+ c = 0} $$
con $a, b, c \in \mathbb{R}$ e $a, b$ non contemporaneamente nulli ($a^2 + b^2 \neq 0$).
* Può rappresentare **qualsiasi retta del piano**, incluse le rette verticali ($b = 0 \implies x = -\frac{c}{a}$).

---

### B. Forma Esplicita
Esplicitata rispetto alla variabile dipendente $y$:
$$ \bbox[8px,border:2px solid #4dff4d]{\color{#ff4d4d}y \color{white}= \color{#4dff4d}m\color{white}\color{#4da6ff}x \color{white}+ \color{#d24dff}q} $$
I due parametri geometrici fondamentali sono:
* $\mathbf{\color{#4dff4d}m}$ **(Coefficiente Angolare o Pendenza):** Quantifica l'inclinazione della retta rispetto al semiasse positivo delle ascisse ($m = \tan\theta$).
  * $m > 0 \implies$ Retta crescente ($\nearrow$, angolo acuto $0 < \theta < 90^\circ$).
  * $m < 0 \implies$ Retta decrescente ($\searrow$, angolo ottuso $90^\circ < \theta < 180^\circ$).
  * $m = 0 \implies$ Retta orizzontale parallela all'asse $x$ ($y = q$).
  * **Rette verticali:** Hanno inclinazione di $90^\circ$ e la loro pendenza non è definita ($m \to \infty$); si scrivono come $x = k$.
* $\mathbf{\color{#d24dff}q}$ **(Ordinata all'Origine o Intercetta):** È l'ordinata del punto di intersezione della retta con l'asse $y$, ovvero il punto $(0, q)$. Se $q = 0$, la retta passa per l'origine $O(0, 0)$.

---

### C. Passaggio tra le Due Forme
Partendo dalla forma implicita $ax + by + c = 0$ con $b \neq 0$:
$$ by = -ax - c \implies y = \left(-\frac{a}{b}\right)x + \left(-\frac{c}{b}\right) $$
Si deducono le formule dirette di conversione:
$$ \bbox[6px,border:1px solid #ffff4d]{m = -\frac{a}{b} \quad \text{e} \quad q = -\frac{c}{b}} $$

> [!EXAMPLE] Come Disegnare una Retta
> Per tracciare una retta basta calcolare due punti distinti assegnando valori a piacere per la $x$:
> Data la retta $y = 2x - 1$:
> * Per $x = 0 \implies y = -1 \implies A(0, -1)$ (intercetta con l'asse $y$).
> * Per $x = 1 \implies y = 2(1) - 1 = 1 \implies B(1, 1)$.
> 
> ![[retta_es1_disegno.png]]

---

## 2. Condizioni di Parallelismo e Perpendicolarità

Date due rette $r: y = m_1x + q_1$ e $s: y = m_2x + q_2$:

### Rette Parallele ($r \parallel s$)
Due rette sono parallele se e solo se hanno la **stessa pendenza**:
$$ \bbox[8px,border:2px solid #4dff4d]{m_1 = m_2} $$
*(In forma implicita: $\frac{a_1}{a_2} = \frac{b_1}{b_2}$).*
Se hanno anche $q_1 = q_2$, le rette sono coincidenti.

> [!EXAMPLE] Esempio Rette Parallele
> * $r: y = \frac{1}{2}x + 2$
> * $s: y = \frac{1}{2}x - 5$
> Poiché $m_1 = m_2 = \frac{1}{2}$, le due rette non si intersecano mai.
> ![[retta_es2_parallele.png]]

---

### Rette Perpendicolari ($r \perp s$)
Due rette non parallele agli assi sono perpendicolari se il loro prodotto scalare è nullo, ovvero se i coefficienti angolari sono **antireciproci** (reciproci ed opposti):
$$ \bbox[8px,border:2px solid #ff4d4d]{m_1 = -\frac{1}{m_2} \iff m_1 \cdot m_2 = -1} $$
*(In forma implicita: $a_1 a_2 + b_1 b_2 = 0$).*

> [!EXAMPLE] Esempio Rette Perpendicolari
> * $r: y = 3x + 1 \implies m_1 = 3$
> * $s: y = -\frac{1}{3}x + 5 \implies m_2 = -\frac{1}{3}$
> Poiché $3 \cdot \left(-\frac{1}{3}\right) = -1$, le rette formano un angolo retto di $90^\circ$.
> ![[retta_es3_perpendicolari.png]]

---

## 3. Formule Fondamentali per la Risoluzione dei Problemi

### A. Retta per un Punto $P(x_P, y_P)$ con Coefficiente Angolare $m$ Noto (Fascio Proprio)
$$ \bbox[8px,border:2px solid #ffff4d]{y - y_P = m(x - x_P)} $$
*Esempio:* Trovare la retta passante per $P(1, -2)$ con $m = 3$:
$$ y - (-2) = 3(x - 1) \implies y + 2 = 3x - 3 \implies \mathbf{y = 3x - 5} $$

### B. Retta Passante per Due Punti $A(x_A, y_A)$ e $B(x_B, y_B)$
Se $x_A \neq x_B$ e $y_A \neq y_B$:
$$ \bbox[8px,border:2px solid #4df5ff]{\frac{y - y_A}{y_B - y_A} = \frac{x - x_A}{x_B - x_A}} $$
Il coefficiente angolare della retta congiungente due punti si ricava direttamente dal rapporto incrementale:
$$ m = \frac{y_B - y_A}{x_B - x_A} $$

> [!EXAMPLE] Esempio per Due Punti
> Retta passante per $A(-2, 5)$ e $B(0, 3)$:
> $$ \frac{y - 5}{3 - 5} = \frac{x - (-2)}{0 - (-2)} \implies \frac{y - 5}{-2} = \frac{x + 2}{2} \implies y - 5 = -(x + 2) \implies \mathbf{y = -x + 3} $$
> ![[retta_es4_2punti.png]]

---

### C. Distanza tra Due Punti e Distanza Punto-Retta

1. **Distanza tra Due Punti (Teorema di Pitagora nel piano cartesiano):**
   $$ \bbox[6px,border:1px solid #4da6ff]{\overline{AB} = \sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}} $$
2. **Distanza di un Punto $P(x_P, y_P)$ da una Retta $r: ax + by + c = 0$:**
   *(La retta DEVE essere obbligatoriamente espressa in forma implicita!)*
   $$ \bbox[8px,border:2px solid #d24dff]{d(P, r) = \frac{|a x_P + b y_P + c|}{\sqrt{a^2 + b^2}}} $$

---

## 4. Fasci di Rette

> [!ABSTRACT] Tipologie di Fasci
> 1. **Fascio Proprio:** Insieme di tutte le infinite rette del piano passanti per un punto comune detto **centro del fascio $C(x_0, y_0)$**:
>    $$ y - y_0 = m(x - x_0) \quad \text{unita alla retta verticale esclusa } x = x_0 $$
>    In forma di combinazione lineare di due rette generatrici $r_1$ e $r_2$:
>    $$ (a_1 x + b_1 y + c_1) + k(a_2 x + b_2 y + c_2) = 0 \quad (k \in \mathbb{R}) $$
> 2. **Fascio Improprio:** Insieme di tutte le infinite rette parallele aventi la stessa direzione (stesso coefficiente angolare $m$ fisso):
>    $$ y = mx + k \quad \text{oppure} \quad ax + by + k = 0 \quad (k \in \mathbb{R}) $$
