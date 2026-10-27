---
title: "La Parabola e Intersezioni con Rette"
description: "Definizione geometrica della parabola, formule con asse verticale e orizzontale, determinazione di vertice, fuoco, direttrice e studio delle posizioni reciproche retta-parabola tramite il discriminante Delta."
tags:
  - matematica/geometria-analitica
  - parabola
  - coniche
  - intersezioni
---

# La Parabola e Intersezioni con Rette

## 1. Definizione Geometrica della Parabola

> [!ABSTRACT] Luogo Geometrico
> Si definisce **parabola** il luogo geometrico dei punti del piano cartesiano **equidistanti** da un punto fisso detto <span style="color: #ffff4d">**Fuoco ($F$)**</span> e da una retta fissa detta <span style="color: #4dff4d">**Direttrice ($d$)**</span>:
> $$ \bbox[8px,border:2px solid #ffff4d]{\overline{PF} = d(P, d)} $$

---

## 2. Parabola con Asse di Simmetria Verticale (Parallelo all'Asse $y$)

È la forma più comune, associata all'equazione polinomiale di secondo grado:
$$ \bbox[8px,border:2px solid #4da6ff]{y = ax^2 + bx + c \quad (a \neq 0)} $$
* $\Delta = b^2 - 4ac$ è il discriminante del trinomio.
* **Concavità:**
  * Se $a > 0 \implies$ concavità verso l'alto $\cup$ (il vertice è un punto di minimo assoluto).
  * Se $a < 0 \implies$ concavità verso il basso $\cap$ (il vertice è un punto di massimo assoluto).

> [!TIP] Formulario Completo della Parabola Verticale
> | Elemento | Formula Analitica | Significato Geometrico |
> | :--- | :--- | :--- |
> | **Vertice ($V$)** | $\bbox[6px,border:1px solid #ff4d4d]{V \left( -\frac{b}{2a}; -\frac{\Delta}{4a} \right)}$ | Punto di massimo o minimo assoluto della curva. |
> | **Fuoco ($F$)** | $\bbox[6px,border:1px solid #ffff4d]{F \left( -\frac{b}{2a}; \frac{1 - \Delta}{4a} \right)}$ | Punto fisso interno alla concavità. |
> | **Asse di Simmetria** | $\bbox[6px,border:1px solid #d24dff]{x = -\frac{b}{2a}}$ | Retta verticale passante per Vertice e Fuoco che divide la curva a metà. |
> | **Retta Direttrice** | $\bbox[6px,border:1px solid #4dff4d]{y = -\frac{1 + \Delta}{4a}}$ | Retta orizzontale esterna alla concavità, simmetrica al fuoco rispetto al vertice. |

> [!EXAMPLE] Rappresentazione Grafica della Parabola
> ![[coniche_es1_parabola.png]]

---

## 3. Parabola con Asse di Simmetria Orizzontale (Parallelo all'Asse $x$)

Scambiando i ruoli algebrici delle variabili $x$ e $y$, si ottiene una parabola "sdraiata":
$$ \bbox[8px,border:2px solid #4df5ff]{x = ay^2 + by + c \quad (a \neq 0)} $$
* **Concavità:**
  * Se $a > 0 \implies$ concavità verso destra ($\rightarrow$).
  * Se $a < 0 \implies$ concavità verso sinistra ($\leftarrow$).
* **Formulario simmetrico:**
  * **Vertice:** $V\left( -\frac{\Delta}{4a}; -\frac{b}{2a} \right)$
  * **Fuoco:** $F\left( \frac{1 - \Delta}{4a}; -\frac{b}{2a} \right)$
  * **Asse di simmetria (orizzontale):** $y = -\frac{b}{2a}$
  * **Direttrice (verticale):** $x = -\frac{1 + \Delta}{4a}$

> [!EXAMPLE] Parabola Orizzontale Notevole
> Esempio canonico: $x = y^2$ (qui $a=1, b=0, c=0$). Il vertice coincide con l'origine $O(0, 0)$ e la concavità abbraccia il semiasse positivo delle $x$.
> ![[coniche_es3_parabola_orizz.png]]

---

## 4. Posizioni Reciproche tra Retta e Parabola

Per determinare l'intersezione tra una parabola $y = ax^2 + bx + c$ e una retta generica $y = mx + q$, si imposta il **sistema algebrico**:
$$ \begin{cases} y = ax^2 + bx + c \\ y = mx + q \end{cases} $$
Sostituendo la seconda equazione nella prima si ottiene l'**equazione risolvente di secondo grado**:
$$ ax^2 + (b - m)x + (c - q) = 0 $$
Il segno del suo discriminante $\Delta$ determina univocamente la reciproca posizione geometrica:

> [!ABSTRACT] I Tre Casi del Discriminante $\Delta$
> 1. $\bbox[6px,border:1px solid #4dff4d]{\mathbf{\Delta > 0}} \implies$ **Retta Secante:** La retta interseca la parabola in **due punti distinti** $P_1(x_1, y_1)$ e $P_2(x_2, y_2)$.
> 2. $\bbox[6px,border:1px solid #ffff4d]{\mathbf{\Delta = 0}} \implies$ **Retta Tangente:** La retta tocca la parabola in **un solo punto** $P_0(x_0, y_0)$ (due punti reali e coincidenti).
> 3. $\bbox[6px,border:1px solid #ff4d4d]{\mathbf{\Delta < 0}} \implies$ **Retta Esterna:** Nessun punto di intersezione reale (la retta non tocca la parabola).
> 
> *(Nota: Le rette verticali $x = k$ hanno sempre una sola intersezione con la parabola verticale, ma non sono tangenti; sono parallele all'asse di simmetria).*

> [!EXAMPLE] Visualizzazione delle Intersezioni con Coniche
> ![[coniche_es4_intersezioni.png]]
