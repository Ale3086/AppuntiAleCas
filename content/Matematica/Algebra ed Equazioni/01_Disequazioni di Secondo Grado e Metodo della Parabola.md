---
title: "Disequazioni di Secondo Grado e Metodo della Parabola"
description: "Risoluzione algebrica e geometrica delle disequazioni di secondo grado tramite l'equazione associata, il discriminante Delta e il metodo grafico della parabola."
tags:
  - matematica/algebra
  - disequazioni
  - parabola
  - secondo-grado
---

# Disequazioni di Secondo Grado e Metodo della Parabola

Una disequazione di secondo grado ad una incognita si presenta, dopo aver svolto i calcoli e ridotto i termini simili, in una delle quattro forme canoniche:
$$ a\color{#ffff4d}x^2 \color{white}+ b\color{#ffff4d}x \color{white}+ c \gtrless 0 \quad (a \neq 0) $$

---

## 1. Il Metodo Grafico della Parabola

La parabola associata alla funzione $y = ax^2 + bx + c$ interseca l'asse delle ascisse ($y = 0$) esattamente nei punti in cui si annulla il polinomio di secondo grado.

> [!TIP] Regola Fondamentale del Segno di $a$
> Prima di iniziare, se il coefficiente di $x^2$ è negativo ($a < 0$), **conviene sempre moltiplicare tutta la disequazione per $-1$ e invertire il verso**:
> $$ -x^2 + 3x + 4 \ge 0 \iff \bbox[6px,border:2px solid #4dff4d]{x^2 - 3x - 4 \le 0} $$
> In questo modo abbiamo la certezza assoluta che la parabola abbia concavità rivolta verso l'alto ($\cup$, "sorridente").

### Algoritmo Operativo in 3 Fasi
1. **Risolvere l'Equazione Associata:**
   Si pone $ax^2 + bx + c = 0$ e si calcola il discriminante $\Delta = b^2 - 4ac$:
   $$ x_{1,2} = \frac{-b \pm \sqrt{\Delta}}{2a} $$
2. **Interpretare il Discriminante $\Delta$:**
   * **Se $\Delta > 0$:** La parabola interseca l'asse $x$ in **due punti distinti** $x_1 < x_2$.
   * **Se $\Delta = 0$:** La parabola è tangente all'asse $x$ in un **singolo punto** $x_1 = x_2 = -\frac{b}{2a}$.
   * **Se $\Delta < 0$:** La parabola non tocca mai l'asse $x$ e "galleggia" interamente nel semipiano positivo.
3. **Leggere la Soluzione in base al Verso Richiesto:**
   * **Se la disequazione chiede $> 0$ o $\ge 0$:** Cerchiamo le zone in cui la curva si trova **sopra l'asse $x$** (i due rami esterni).
   * **Se la disequazione chiede $< 0$ o $\le 0$:** Cerchiamo la zona in cui la curva si trova **sotto l'asse $x$** (la conca interna compresa tra le radici).

---

## 2. Esempi Guidati Completi

> [!EXAMPLE] Esempio 1: $\Delta > 0$ con Verso Positivo (Valori Esterni)
> Risolvere:
> $$ \mathbf{x^2 - 4x > 0} $$
> 1. **Equazione associata (spuria):**
>    $$ x^2 - 4x = 0 \implies x(x - 4) = 0 \implies x_1 = 0, \quad x_2 = 4 $$
> 2. **Lettura del segno:**
>    Il testo richiede valori strettamente positivi ($> 0$), ovvero i rami della parabola che stanno al di sopra dell'asse $x$.
> 3. **Soluzione finale:**
>    $$ \bbox[8px,border:2px solid #4dff4d]{\mathbf{x < 0 \quad \lor \quad x > 4}} $$
> 
> ![[diseq_es1_esterni.png]]

---

> [!EXAMPLE] Esempio 2: $\Delta > 0$ con Verso Negativo (Valori Interni)
> Risolvere:
> $$ -x^2 + 3x + 4 \ge 0 $$
> 1. **Normalizzazione del segno di $a$:**
>    Moltiplichiamo per $-1$ e invertiamo il verso:
>    $$ \mathbf{x^2 - 3x - 4 \le 0} $$
> 2. **Equazione associata:**
>    $$ \Delta = (-3)^2 - 4(1)(-4) = 9 + 16 = 25 > 0 $$
>    $$ x_{1,2} = \frac{3 \pm \sqrt{25}}{2} = \frac{3 \pm 5}{2} \implies x_1 = -1, \quad x_2 = 4 $$
> 3. **Lettura del segno:**
>    Dovendo soddisfare $\le 0$, consideriamo la porzione di parabola che sta al di sotto dell'asse $x$ compresi gli estremi.
> 4. **Soluzione finale:**
>    $$ \bbox[8px,border:2px solid #ff4d4d]{\mathbf{-1 \le x \le 4}} $$
> 
> ![[diseq_es2_interni.png]]

---

## 3. Casi Notevoli con Discriminante Negativo ($\Delta < 0$) o Nullo ($\Delta = 0$)

Considerando la forma normale con $a > 0$:

| Caso | Segno Richiesto | Grafico Parabola | Soluzione |
| :---: | :---: | :---: | :---: |
| $\mathbf{\Delta < 0}$ | $ax^2 + bx + c > 0$ | Interamente sopra l'asse $x$ | $\mathbf{\forall x \in \mathbb{R}}$ (Sempre verificata) |
| $\mathbf{\Delta < 0}$ | $ax^2 + bx + c \ge 0$ | Interamente sopra l'asse $x$ | $\mathbf{\forall x \in \mathbb{R}}$ |
| $\mathbf{\Delta < 0}$ | $ax^2 + bx + c < 0$ | Nessun punto sotto l'asse $x$ | $\mathbf{\emptyset}$ (Nessuna soluzione / Impossibile) |
| $\mathbf{\Delta < 0}$ | $ax^2 + bx + c \le 0$ | Nessun punto sotto né sull'asse | $\mathbf{\emptyset}$ |
| $\mathbf{\Delta = 0}$ | $ax^2 + bx + c > 0$ | Tocca l'asse solo in $x_0$, poi sempre sopra | $\mathbf{\forall x \in \mathbb{R} \setminus \{x_0\}}$ |
| $\mathbf{\Delta = 0}$ | $ax^2 + bx + c \ge 0$ | Sopra o coincidente con l'asse | $\mathbf{\forall x \in \mathbb{R}}$ |
| $\mathbf{\Delta = 0}$ | $ax^2 + bx + c < 0$ | Non scende mai sotto l'asse | $\mathbf{\emptyset}$ |
| $\mathbf{\Delta = 0}$ | $ax^2 + bx + c \le 0$ | Soddisfatta solo nel punto di tangenza | $\mathbf{x = x_0}$ |

> [!EXAMPLE] Esempi con $\Delta \le 0$
> * $x^2 + 4 > 0 \implies \Delta = -16 < 0$. Essendo $a = 1 > 0$, la parabola è sempre sopra. Soluzione: $\mathbf{\forall x \in \mathbb{R}}$.
> * $x^2 + 4 < 0 \implies$ Non è mai sotto. Soluzione: $\mathbf{\emptyset}$.
> * $(x - 3)^2 \le 0 \implies \Delta = 0$. Un quadrato è sempre $\ge 0$, quindi può valere $\le 0$ solo quando si annulla. Soluzione: $\mathbf{x = 3}$.
