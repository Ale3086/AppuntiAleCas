---
title: "Funzione Omografica"
description: "Studio della funzione omografica come iperbole equilatera traslata: centro di simmetria, asintoti verticale e orizzontale, condizioni di non degenerazione e tracciamento rapido."
tags:
  - matematica/geometria-analitica
  - funzione-omografica
  - iperbole-traslata
  - asintoti
---

# Funzione Omografica

La **funzione omografica** rappresenta la traslazione di un'iperbole equilatera con asintoti paralleli agli assi cartesiani. È una delle funzioni razionali fratte più ricorrenti nell'analisi matematica e nei problemi d'esame.

---

## 1. Definizione ed Equazione Generale

> [!ABSTRACT] Equazione della Funzione Omografica
> Si definisce funzione omografica ogni relazione analitica della forma:
> $$ \bbox[8px,border:2px solid #d24dff]{y = \frac{ax + b}{cx + d}} $$
> con $a, b, c, d \in \mathbb{R}$.

### Condizioni di Non Degenerazione
Affinché l'equazione rappresenti un'effettiva iperbole equilatera traslata, devono essere verificate contemporaneamente due condizioni:
1. $\bbox[6px,border:1px solid #ff4d4d]{c \neq 0}$: Se fosse $c = 0$, il denominatore sarebbe una costante numerica e la funzione degenererebbe in una semplice retta lineare ($y = \frac{a}{d}x + \frac{b}{d}$).
2. $\bbox[6px,border:1px solid #ff4d4d]{ad - bc \neq 0}$: Se fosse $ad - bc = 0$, il numeratore sarebbe un multiplo esatto del denominatore ($ax + b = k(cx + d)$) e la frazione si semplificherebbe in una retta orizzontale degenere ($y = \frac{a}{c}$ con un punto bucato in $x = -\frac{d}{c}$).

---

## 2. Elementi Caratteristici Fondamentali

Dal semplice confronto dei coefficienti $a, b, c, d$ si determinano immediatamente tutti gli enti geometrici della curva:

> [!TIP] Formule Dirette per il Tracciamento
> 1. **Asintoto Verticale:** La retta verticale che annulla il denominatore ($cx + d = 0$):
>    $$ \bbox[6px,border:1px solid #4da6ff]{x = -\frac{d}{c}} $$
> 2. **Asintoto Orizzontale:** Il rapporto tra i coefficienti della $x$ di grado massimo:
>    $$ \bbox[6px,border:1px solid #4dff4d]{y = \frac{a}{c}} $$
> 3. **Centro di Simmetria ($C$):** È il punto di incontro dei due asintoti perpendicolari:
>    $$ \bbox[8px,border:2px solid #ffff4d]{C \left( -\frac{d}{c}; \frac{a}{c} \right)} $$

---

## 3. Procedura Rapida per Disegnare il Grafico

Per tracciare con precisione la curva sul piano cartesiano:
1. Tracciare gli assi cartesiani ortogonali.
2. Disegnare con linee tratteggiate l'asintoto verticale $x = -\frac{d}{c}$ e l'asintoto orizzontale $y = \frac{a}{c}$, evidenziando il centro di simmetria $C$.
3. Calcolare i punti di intersezione con gli assi cartesiani:
   * **Con l'asse $y$ ($x = 0$):** $P_y\left(0, \frac{b}{d}\right)$
   * **Con l'asse $x$ ($y = 0 \implies ax + b = 0$):** $P_x\left(-\frac{b}{a}, 0\right)$
4. Tracciare i due rami iperbolici che si avvicinano indefinitamente ai due asintoti.

> [!EXAMPLE] Visualizzazione della Funzione Omografica
> Esempio: $y = \frac{2x + 1}{x - 1}$
> * Asintoto verticale: $x = 1$
> * Asintoto orizzontale: $y = 2$
> * Centro di simmetria: $C(1, 2)$
> 
> ![[omografica_es1.png]]
