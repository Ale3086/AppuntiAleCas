---
title: "05 - Ellisse e Iperbole"
tags:
  - matematica/geometria-analitica
  - tipologia/teoria
---

# Ellisse e Iperbole

Oltre a Parabola e Circonferenza, le altre due coniche fondamentali sono l'Ellisse e l'Iperbole.

## 1. L'Ellisse

> [!info] Definizione
> L'ellisse è il luogo geometrico dei punti del piano per i quali è **costante la somma** delle distanze da due punti fissi detti <span style="color: #ffff4d">Fuochi ($F_1, F_2$)</span>.
> $$ \overline{PF_1} + \overline{PF_2} = 2a $$

> [!abstract] Equazione Canonica
> L'equazione di un'ellisse centrata nell'origine degli assi è:
> $$ \frac{x^2}{a^2} + \frac{y^2}{b^2} = 1 $$
> *   $a$: semiasse orizzontale (sull'asse X)
> *   $b$: semiasse verticale (sull'asse Y)

> [!tip] Formule e Parametri dell'Ellisse
> *   **Distanza focale ($2c$):** La distanza tra i due fuochi. $c$ si trova con Pitagora:
>     *   Se i fuochi sono sull'asse X ($a > b$): $c^2 = a^2 - b^2$
>     *   Se i fuochi sono sull'asse Y ($b > a$): $c^2 = b^2 - a^2$
> *   **Eccentricità ($e$):** Misura lo "schiacciamento" dell'ellisse. $e = \frac{c}{a}$ (oppure $\frac{c}{b}$). È sempre un numero compreso tra $0$ e $1$ ($0 \le e < 1$).
>     *   Se $e = 0$, l'ellisse è un cerchio perfetto!

> [!example] Grafico Ellisse
> In questo esempio $a > b$, quindi l'ellisse è più allungata in orizzontale e i fuochi si trovano sull'asse X.
> ![[ellisse_es1.png]]

---

## 2. L'Iperbole

> [!info] Definizione
> L'iperbole è il luogo geometrico dei punti per i quali è **costante la differenza** (in valore assoluto) delle distanze da due punti fissi detti <span style="color: #ffff4d">Fuochi</span>.
> $$ |\overline{PF_1} - \overline{PF_2}| = 2a $$

> [!abstract] Equazione Canonica
> L'equazione di un'iperbole con i fuochi sull'asse X è:
> $$ \frac{x^2}{a^2} - \frac{y^2}{b^2} = 1 $$
> Se i fuochi sono sull'asse Y, l'equazione diventa:
> $$ \frac{x^2}{a^2} - \frac{y^2}{b^2} = -1 $$

> [!tip] Formule e Parametri dell'Iperbole
> *   **Relazione tra parametri:** A differenza dell'ellisse, qui vale sempre $c^2 = a^2 + b^2$.
> *   **Eccentricità ($e$):** $e = \frac{c}{a}$ (sempre $e > 1$).
> *   **Asintoti:** Sono le due rette <span style="color: #4dff4d">verdi</span> a cui i rami dell'iperbole si avvicinano all'infinito senza mai toccarle.
>     Hanno equazione: $y = \pm \frac{b}{a} x$

> [!example] Grafico Iperbole
> I rami della curva si allargano seguendo le rette degli asintoti.
> ![[iperbole_es1.png]]

---

## 3. L'Iperbole Equilatera e Funzione Omografica

Un caso speciale si ha quando $a = b$. L'iperbole si dice **equilatera** e i suoi asintoti sono perpendicolari tra loro.
Spesso, ruotandola di 45°, si ottiene la famosa equazione $xy = k$.

> [!info] Funzione Omografica
> Se prendiamo un'iperbole equilatera e ne trasliamo il centro in un punto generico, otteniamo la **Funzione Omografica**, utilissima in analisi matematica:
> $$ y = \frac{ax + b}{cx + d} $$
>
> Questa funzione ha due **Asintoti**:
> *   Asintoto Verticale: $x = -\frac{d}{c}$ (Annulla il denominatore!)
> *   Asintoto Orizzontale: $y = \frac{a}{c}$ (Rapporto tra i coefficienti della $x$)
> *   Centro di simmetria: $C\left(-\frac{d}{c}; \frac{a}{c}\right)$

> [!example] Grafico Funzione Omografica
> L'iperbole traslata "fugge" verso i due nuovi asintoti tratteggiati.
> ![[omografica_es1.png]]
