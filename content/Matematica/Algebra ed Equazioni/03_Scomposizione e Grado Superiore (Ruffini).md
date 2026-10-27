---
title: "Scomposizione e Grado Superiore (Ruffini)"
description: "Risoluzione di equazioni e disequazioni di grado superiore al secondo: tecniche di fattorizzazione, teorema del resto, regola di Paolo Ruffini e studio del segno dei fattori."
tags:
  - matematica/algebra
  - ruffini
  - grado-superiore
  - scomposizione
---

# Scomposizione e Grado Superiore (Ruffini)

Per le equazioni e disequazioni di grado superiore al secondo ($n \ge 3$):
$$ P(x) = a_n x^n + a_{n-1} x^{n-1} + \dots + a_1 x + a_0 \gtrless 0 $$
non esiste una formula diretta universale come il discriminante $\Delta$. L'unica strategia vincente consiste nello **scomporre il polinomio in fattori di primo e secondo grado** e studiarne il segno complessivo tramite la Legge di Annullamento del Prodotto o la Tabella dei Segni.

---

## 1. Tecniche Primarie di Scomposizione

Prima di ricorrere a metodi più complessi, verificare sempre in ordine:

1. **Raccoglimento a Fattor Comune Totale:**
   Se manca il termine noto ($a_0 = 0$), si raccoglie la minima potenza di $x$:
   $$ x^3 - 9x = 0 \implies x(x^2 - 9) = 0 \implies x(x - 3)(x + 3) = 0 $$
2. **Raccoglimento a Fattor Comune Parziale:**
   $$ x^3 - 2x^2 - x + 2 = x^2(x - 2) - 1(x - 2) = (x^2 - 1)(x - 2) = (x - 1)(x + 1)(x - 2) $$
3. **Prodotti Notevoli:**
   * Differenza di quadrati: $A^2 - B^2 = (A - B)(A + B)$
   * Cubo di binomio: $A^3 \pm 3A^2B + 3AB^2 \pm B^3 = (A \pm B)^3$
   * Somma o differenza di cubi: $A^3 \pm B^3 = (A \pm B)(A^2 \mp AB + B^2)$
4. **Trinomio Notevole Speciale ($x^2 + sx + p$):**
   Trovare due numeri $m, n$ tali che $m + n = s$ e $m \cdot n = p \implies (x + m)(x + n)$.

---

## 2. La Regola di Ruffini e il Teorema del Resto

Se le tecniche elementari falliscono, si applica l'algoritmo di **Paolo Ruffini**.

> [!ABSTRACT] Teorema del Resto
> Il polinomio $P(x)$ è divisibile per il binomio $(x - c)$ se e solo se:
> $$ \bbox[8px,border:2px solid #4df5ff]{P(c) = 0} $$
> Il valore reale $c$ prende il nome di **zero del polinomio**.

### Come Trovare il Candidato Zero $c$
Nei polinomi a coefficienti interi, i possibili zeri razionali $c = \pm \frac{p}{q}$ vanno cercati tra:
* $\mathbf{p}$: divisori interi del **termine noto** ($a_0$).
* $\mathbf{q}$: divisori interi del **coefficiente del termine di grado massimo** ($a_n$).

---

> [!EXAMPLE] Esercizio Svolto Passo-Passo
> Risolvere la disequazione di terzo grado:
> $$ \mathbf{x^3 - 4x^2 + x + 6 > 0} $$
> 
> **Passo 1: Ricerca dello zero del polinomio**
> Termine noto: $6 \implies$ divisori: $\pm 1, \pm 2, \pm 3, \pm 6$.
> * Proviamo $x = 1$: $P(1) = 1^3 - 4(1)^2 + 1 + 6 = 1 - 4 + 1 + 6 = 4 \neq 0$ (no).
> * Proviamo $x = -1$: $P(-1) = (-1)^3 - 4(-1)^2 + (-1) + 6 = -1 - 4 - 1 + 6 = \mathbf{0}$!
> Abbiamo trovato lo zero: $\mathbf{c = -1} \implies P(x)$ è divisibile per $(x - (-1)) = (x + 1)$.
> 
> **Passo 2: Tabella di Ruffini per abbassare il grado**
> Coefficienti del polinomio ordinato: $1, -4, 1 \mid 6$.
> 
> | | $1$ | $-4$ | $1$ | $6$ |
> | :---: | :---: | :---: | :---: | :---: |
> | **$-1$** | | $-1$ | $+5$ | $-6$ |
> | | **$1$** | **$-5$** | **$6$** | **$0$** |
> 
> Il quoziente ottenuto è di secondo grado: $Q(x) = x^2 - 5x + 6$.
> 
> **Passo 3: Scomposizione completa**
> Il polinomio di partenza si riscrive come:
> $$ P(x) = (x + 1)(x^2 - 5x + 6) $$
> Scomponendo il trinomio $x^2 - 5x + 6 = (x - 2)(x - 3)$, otteniamo:
> $$ (x + 1)(x - 2)(x - 3) > 0 $$
> 
> **Passo 4: Studio dei Segni dei 3 Fattori**
> * $F_1 > 0 \implies x + 1 > 0 \implies x > -1$
> * $F_2 > 0 \implies x - 2 > 0 \implies x > 2$
> * $F_3 > 0 \implies x - 3 > 0 \implies x > 3$
> 
> Combinando i segni colonna per colonna sui valori $-1, 2, 3$:
> * Per $x < -1$: $(-)(-) = -$
> * Per $-1 < x < 2$: $(+)(-) = \mathbf{+}$
> * Per $2 < x < 3$: $(+)(+)(-) = -$
> * Per $x > 3$: $(+)(+)(+) = \mathbf{+}$
> 
> La traccia chiedeva $> 0$ (zone positive):
> $$ \bbox[8px,border:2px solid #4dff4d]{\mathbf{-1 < x < 2 \quad \lor \quad x > 3}} $$
