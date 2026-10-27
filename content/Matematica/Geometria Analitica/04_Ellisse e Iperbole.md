---
title: "Ellisse e Iperbole"
description: "Proprietà focali, equazioni canoniche riferite agli assi, calcolo di semiassi, fuochi, eccentricità, vertici e asintoti dell'iperbole."
tags:
  - matematica/geometria-analitica
  - ellisse
  - iperbole
  - coniche
---

# Ellisse e Iperbole

Oltre a parabola e circonferenza, le altre due coniche a centro fondamentali del piano cartesiano sono l'**Ellisse** e l'**Iperbole**, ottenute dall'intersezione di un cono circolare retto a due falde con un piano secante.

---

## 1. L'Ellisse

> [!ABSTRACT] Definizione come Luogo Geometrico
> L'**ellisse** è il luogo geometrico dei punti del piano per i quali è **costante la somma delle distanze** da due punti fissi detti <span style="color: #ffff4d">**Fuochi ($F_1, F_2$)**</span>:
> $$ \bbox[8px,border:2px solid #ffff4d]{\overline{PF_1} + \overline{PF_2} = 2a \quad (\text{con } 2a > \overline{F_1 F_2})} $$

### Equazione Canonica dell'Ellisse Centrata nell'Origine
$$ \bbox[8px,border:2px solid #4da6ff]{\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1} $$
* $a$: lunghezza del **semiasse orizzontale** (sull'asse $x$).
* $b$: lunghezza del **semiasse verticale** (sull'asse $y$).

> [!TIP] Posizione dei Fuochi e Parametro $c$
> La semidistanza focale $c$ si ricava sempre applicando il Teorema di Pitagora:
> 1. **Se $a > b$ (Fuochi sull'Asse $x$):**
>    * Relazione fondamentale: $\bbox[6px,border:1px solid #4dff4d]{c^2 = a^2 - b^2} \implies c = \sqrt{a^2 - b^2}$
>    * Fuochi: $F_1(-c, 0)$ e $F_2(c, 0)$.
>    * Vertici: $A_1(-a, 0), A_2(a, 0), B_1(0, -b), B_2(0, b)$.
> 2. **Se $b > a$ (Fuochi sull'Asse $y$):**
>    * Relazione fondamentale: $\bbox[6px,border:1px solid #4dff4d]{c^2 = b^2 - a^2} \implies c = \sqrt{b^2 - a^2}$
>    * Fuochi: $F_1(0, -c)$ e $F_2(0, c)$.

### L'Eccentricità ($e$)
L'eccentricità misura il grado di "schiacciamento" dell'ellisse:
$$ \bbox[6px,border:1px solid #ff4d4d]{e = \frac{c}{\text{semiasse maggiore}} \quad \text{con } 0 \le e < 1} $$
* Se $e = 0 \implies c = 0 \implies a = b$: i due fuochi coincidono nel centro e l'ellisse degenera in una **circonferenza**.
* Più $e$ si avvicina a $1$, più l'ellisse appare allungata e schiacciata.

> [!EXAMPLE] Rappresentazione Grafica dell'Ellisse
> ![[ellisse_es1.png]]

---

## 2. L'Iperbole

> [!ABSTRACT] Definizione come Luogo Geometrico
> L'**iperbole** è il luogo geometrico dei punti del piano per i quali è **costante la differenza in valore assoluto** delle distanze da due punti fissi detti <span style="color: #ffff4d">**Fuochi ($F_1, F_2$)**</span>:
> $$ \bbox[8px,border:2px solid #ffff4d]{|\overline{PF_1} - \overline{PF_2}| = 2a \quad (\text{con } 0 < 2a < \overline{F_1 F_2})} $$

### Equazione Canonica dell'Iperbole
A seconda dell'asse su cui giacciono i fuochi:
* **Fuochi sull'Asse $x$:**
  $$ \bbox[8px,border:2px solid #ff4d4d]{\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1} $$
  Interseca l'asse $x$ nei vertici reali $A_1(-a, 0)$ e $A_2(a, 0)$. Non interseca l'asse $y$.
* **Fuochi sull'Asse $y$:**
  $$ \bbox[8px,border:2px solid #ff4d4d]{\frac{x^2}{a^2} - \frac{y^2}{b^2} = -1} $$
  Interseca l'asse $y$ nei vertici reali $B_1(0, -b)$ e $B_2(0, b)$.

> [!TIP] Parametri Chiave dell'Iperbole
> * **Relazione Fondamentale:** Vale sempre $\bbox[6px,border:1px solid #ffff4d]{c^2 = a^2 + b^2} \implies c = \sqrt{a^2 + b^2}$.
> * **Eccentricità:** $e = \frac{c}{a} > 1$ (sempre strettamente maggiore di $1$).
> * **Gli Asintoti:** Sono le due rette passanti per il centro a cui i due rami dell'iperbole tendono asintoticamente all'infinito:
>   $$ \bbox[8px,border:2px solid #4dff4d]{y = \pm \frac{b}{a} x} $$

> [!EXAMPLE] Rappresentazione Grafica dell'Iperbole
> ![[iperbole_es1.png]]

---

## 3. L'Iperbole Equilatera

Quando i due semiassi hanno la medesima lunghezza ($a = b$):
* L'equazione canonica diventa: $x^2 - y^2 = a^2$.
* Gli asintoti diventano le bisettrici dei quadranti: $y = \pm x$ (perpendicolari tra loro).
* Ruotando gli assi di $45^\circ$, l'iperbole equilatera assume la celeberrima forma della **proporzionalità inversa**:
  $$ \bbox[6px,border:1px solid #4df5ff]{x \cdot y = k} $$
  (Se $k > 0$ nei quadranti I e III; se $k < 0$ nei quadranti II e IV).
