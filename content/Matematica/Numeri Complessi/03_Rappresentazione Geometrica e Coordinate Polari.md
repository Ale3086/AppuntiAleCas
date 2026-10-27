---
title: "Rappresentazione Geometrica e Coordinate Polari"
description: "Il piano complesso di Argand-Gauss, interpretazione vettoriale dei numeri complessi, simmetrie di coniugati e opposti, coordinate polari e algoritmo di conversione cartesiane-polari."
tags:
  - matematica/numeri-complessi
  - geometria-analitica
  - piano-gauss
  - coordinate-polari
---

# Rappresentazione Geometrica e Coordinate Polari

## 1. Il Piano di Argand-Gauss

Nel 1799 il matematico norvegese Caspar Wessel e successivamente Carl Friedrich Gauss intuirono che un numero complesso $z = a + bi$, essendo identificato univocamente dalla coppia ordinata di numeri reali $(a, b)$, può essere rappresentato come un punto sul piano cartesiano:

> [!ABSTRACT] Definizione del Piano Complesso (Piano di Gauss)
> Fissato un sistema di assi cartesiani ortogonali $Oxy$:
> * L'asse delle ascisse ($x$) rappresenta la parte reale $\text{Re}(z)$ e prende il nome di **Asse Reale**.
> * L'asse delle ordinate ($y$) rappresenta la parte immaginaria $\text{Im}(z)$ e prende il nome di **Asse Immaginario**.
> 
> Esiste una **corrispondenza biunivoca** perfetta tra:
> $$ \bbox[8px,border:2px solid #4df5ff]{z = a + bi \iff \text{Punto } P(a, b) \iff \text{Vettore } \vec{OP} = (a, b)} $$
> Il punto $P(a, b)$ viene chiamato **affissa** del numero complesso $z$.

### Posizionamento dei Numeri Notevoli
* I **numeri reali puri** ($b = 0$) giacciono interamente sull'asse orizzontale $x$ (asse reale).
* I **numeri immaginari puri** ($a = 0$) giacciono interamente sull'asse verticale $y$ (asse immaginario).
* Il numero $0 = 0 + 0i$ coincide con l'**origine degli assi $O(0, 0)$**.

---

## 2. Geometria del Coniugato, dell'Opposto e del Modulo

L'interpretazione geometrica rende visivamente evidenti le proprietà algebriche introdotte nel capitolo precedente:

> [!INFO] Simmetrie Fondamentali nel Piano di Gauss
> Dato un numero complesso $z = a + bi$ associato al punto $P(a, b)$:
> 1. **Modulo $|z|$:** Rappresenta la ==distanza euclidea== del punto $P$ dall'origine $O$, ossia la lunghezza (norma) del vettore $\vec{OP}$:
>    $$ |\vec{OP}| = \sqrt{a^2 + b^2} = |z| $$
> 2. **Complesso Coniugato $\bar{z} = a - bi$:** È il punto $P'(a, -b)$, ottenuto per **simmetria assiale rispetto all'asse reale $x$**.
> 3. **Complesso Opposto $-z = -a - bi$:** È il punto $P''(-a, -b)$, ottenuto per **simmetria centrale rispetto all'origine $O$**.
> 4. **Opposto del Coniugato $-\bar{z} = -a + bi$:** È il punto simmetrico rispetto all'asse immaginario $y$.

> [!EXAMPLE] Visualizzazione delle Simmetrie nel Piano di Gauss
> ![[compl_02_piano_gauss.png]]

---

## 3. Le Coordinate Polari $[r; \alpha]$

Un punto $P$ nel piano può essere individuato non solo dalle sue coordinate cartesiane ortogonali $(a, b)$, ma anche tramite **coordinate polari**:

> [!ABSTRACT] Definizione di Coordinate Polari
> Una coppia $[r; \alpha]$ individua un punto $P$ tramite:
> 1. **$r$ (Raggio Vettore o Modulo):** La distanza dall'origine:
>    $$ r = |\vec{OP}| \ge 0 $$
> 2. **$\alpha$ (Argomento o Anomalia):** L'ampiezza dell'angolo orientato convesso formato dal vettore $\vec{OP}$ con il ==semiasse positivo delle $x$== (misurato in senso antiorario):
>    $$ \alpha = x\hat{O}P $$

### Argomento Principale e Periodicità
Poiché un angolo è definito a meno di multipli interi di un angolo giro ($2\pi$ o $360^\circ$):
$$ [r; \alpha] \equiv [r; \alpha + 2k\pi] \quad \text{con } k \in \mathbb{Z} $$
Per convenzione unanime, si definisce **argomento principale** l'unico valore compreso nell'intervallo:
$$ \bbox[6px,border:1px solid #4dff4d]{0 \le \alpha < 2\pi} \quad (\text{oppure } -\pi < \alpha \le \pi) $$

> [!EXAMPLE] Schema delle Coordinate Polari
> ![[compl_03_coord_polari.png]]

---

## 4. Algoritmo di Conversione Bidirezionale

### Da Coordinate Polari $[r; \alpha]$ a Cartesiane $(a, b)$
Applicando i primi teoremi di trigonometria sul triangolo rettangolo avente ipotenusa $r$ e angoli acuti formati con gli assi:
$$ \bbox[8px,border:2px solid #4da6ff]{\begin{cases} a = r \cdot \cos\alpha \\ b = r \cdot \sin\alpha \end{cases}} $$

> [!EXAMPLE] Esempio Guidato 1
> Dato il punto $A$ in coordinate polari $\left[ 2; \frac{\pi}{3} \right]$, calcolarne le coordinate cartesiane:
> * $a = 2 \cdot \cos\left(\frac{\pi}{3}\right) = 2 \cdot \frac{1}{2} = \mathbf{1}$
> * $b = 2 \cdot \sin\left(\frac{\pi}{3}\right) = 2 \cdot \frac{\sqrt{3}}{2} = \mathbf{\sqrt{3}}$
> **Coordinate cartesiane:** $A(1, \sqrt{3}) \iff z = 1 + \sqrt{3}i$.

---

### Da Coordinate Cartesiane $(a, b)$ a Polari $[r; \alpha]$
1. **Calcolo del Modulo $r$:**
   $$ r = \sqrt{a^2 + b^2} $$
2. **Calcolo dell'Argomento $\alpha$:**
   Sapendo che $\frac{b}{a} = \frac{r\sin\alpha}{r\cos\alpha} = \tan\alpha$, abbiamo:
   $$ \tan\alpha = \frac{b}{a} $$
   > [!WARNING] Attenzione al Quadrante!
   > La funzione $\arctan$ restituisce valori solo nel range $\left( -\frac{\pi}{2}, \frac{\pi}{2} \right)$. Per individuare l'angolo corretto bisogna guardare il segno di $a$ e $b$:
   > * **$I$ Quadrante ($a > 0, b \ge 0$):** $\alpha = \arctan\left(\frac{b}{a}\right)$
   > * **$II$ Quadrante ($a < 0, b \ge 0$):** $\alpha = \arctan\left(\frac{b}{a}\right) + \pi$
   > * **$III$ Quadrante ($a < 0, b < 0$):** $\alpha = \arctan\left(\frac{b}{a}\right) + \pi$
   > * **$IV$ Quadrante ($a > 0, b < 0$):** $\alpha = \arctan\left(\frac{b}{a}\right) + 2\pi$
   > * **Punti sugli Assi:**
   >   * Se $a > 0, b = 0 \implies \alpha = 0$
   >   * Se $a = 0, b > 0 \implies \alpha = \frac{\pi}{2}$ ($90^\circ$)
   >   * Se $a < 0, b = 0 \implies \alpha = \pi$ ($180^\circ$)
   >   * Se $a = 0, b < 0 \implies \alpha = \frac{3\pi}{2}$ ($270^\circ$)

> [!EXAMPLE] Esempio Guidato 2 (Dal Libro: $B(-2\sqrt{3}, 2)$)
> Convertire in coordinate polari il punto $B(-2\sqrt{3}, 2)$:
> 1. **Calcolo del raggio $r$:**
>    $$ r = \sqrt{(-2\sqrt{3})^2 + 2^2} = \sqrt{4 \cdot 3 + 4} = \sqrt{12 + 4} = \sqrt{16} = \mathbf{4} $$
> 2. **Calcolo dell'argomento $\alpha$:**
>    $$ \tan\alpha = \frac{2}{-2\sqrt{3}} = -\frac{1}{\sqrt{3}} = -\frac{\sqrt{3}}{3} $$
>    Gli angoli che hanno tangente $-\frac{\sqrt{3}}{3}$ sono $\frac{5\pi}{6}$ ($150^\circ$) e $\frac{11\pi}{6}$ ($330^\circ$).
>    Poiché il punto $B$ ha ascissa negativa ($a < 0$) e ordinata positiva ($b > 0$), esso si trova nel **Secondo Quadrante**.
>    Pertanto:
>    $$ \alpha = \mathbf{\frac{5}{6}\pi} \quad (150^\circ) $$
> **Risultato finale:** $B\left[ 4; \frac{5}{6}\pi \right]$.
