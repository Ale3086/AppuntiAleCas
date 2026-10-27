---
title: "Forma Algebrica e Operazioni Fondamentali"
description: "Definizione formale di numero complesso, parte reale e immaginaria, uguaglianza, modulo, complessi coniugati e opposti. Aritmetica algebrica completa: somma, prodotto, reciproco, divisione e potenze."
tags:
  - matematica/numeri-complessi
  - matematica/algebra
  - forma-algebrica
  - operazioni
---

# Forma Algebrica e Operazioni Fondamentali

## 1. Definizione di Numero Complesso

> [!ABSTRACT] Forma Algebrica di un Numero Complesso
> Si chiama **numero complesso** ogni entità algebrica rappresentata da una scrittura binomiale del tipo:
> $$ \bbox[8px,border:2px solid #4da6ff]{z = \color{#4da6ff}a \color{white}+ \color{#ff4d4d}b\color{#4df5ff}i} $$
> con $\color{#4da6ff}a, \color{#ff4d4d}b \in \mathbb{R}$ e $\color{#4df5ff}i$ unità immaginaria ($i^2 = -1$).
> * $\color{#4da6ff}a = \text{Re}(z)$ prende il nome di **parte reale** del numero complesso.
> * $\color{#ff4d4d}b = \text{Im}(z)$ prende il nome di **parte immaginaria** (è un numero reale!).
> 
> L'insieme di tutti i numeri complessi viene denotato con la lettera $\mathbf{\mathbb{C}}$.

### Struttura Insiemistica: Casi Particolari
1. **Se $b = 0$:** $z = a + 0i = \color{#4da6ff}a$. Il numero coincide con un **numero reale puro**. Ne consegue che i numeri reali sono un sottoinsieme proprio dei numeri complessi:
   $$ \mathbb{R} \subset \mathbb{C} $$
2. **Se $a = 0$ e $b \neq 0$:** $z = 0 + bi = \color{#ff4d4d}bi$. Il numero è un **numero immaginario puro**:
   $$ \mathbb{I} \subset \mathbb{C} $$
3. **Se $a = 0$ e $b = 0$:** $z = 0 + 0i = \mathbf{0}$ (lo zero complesso, punto di intersezione $\mathbb{R} \cap \mathbb{I}$).

> [!EXAMPLE] Riconoscere Re e Im
> * Dato $z = 1 + 5i \implies \text{Re}(z) = 1, \quad \text{Im}(z) = 5$.
> * Dato $z = -4i \implies \text{Re}(z) = 0, \quad \text{Im}(z) = -4$.
> * Dato $z = 7 \implies \text{Re}(z) = 7, \quad \text{Im}(z) = 0$.

---

## 2. Uguaglianza, Modulo e Relazioni tra Complessi

### A. Uguaglianza tra Numeri Complessi
Due numeri complessi $z_1 = a + bi$ e $z_2 = c + di$ sono **uguali** se e solo se hanno ==contemporaneamente== la stessa parte reale e la stessa parte immaginaria:
$$ a + bi = c + di \iff \begin{cases} a = c \\ b = d \end{cases} $$

> [!WARNING] Assenza di Ordinamento in $\mathbb{C}$
> Nei numeri complessi **NON esiste una relazione d'ordine compatibile con le operazioni**.
> Non ha alcun senso matematico scrivere $z_1 > z_2$ oppure $z_1 < z_2$ a meno che entrambi non siano puramente reali ($b=d=0$). Possiamo solo stabilire se due numeri complessi sono uguali o diversi!

---

### B. Modulo di un Numero Complesso
> [!TIP] Definizione di Modulo (Valore Assoluto Complesso)
> Si definisce **modulo** del numero complesso $z = a + bi$ la radice quadrata della somma dei quadrati della parte reale e della parte immaginaria:
> $$ \bbox[8px,border:2px solid #ffff4d]{|z| = |a + bi| = \sqrt{a^2 + b^2}} $$
> * Il modulo $|z|$ è un numero reale **sempre positivo o nullo**: $|z| \ge 0$.
> * $|z| = 0 \iff z = 0$ ($a = 0$ e $b = 0$).

> [!EXAMPLE] Calcolo del Modulo
> * $|4 + 3i| = \sqrt{4^2 + 3^2} = \sqrt{16 + 9} = \sqrt{25} = \mathbf{5}$
> * $|-6 + 8i| = \sqrt{(-6)^2 + 8^2} = \sqrt{36 + 64} = \sqrt{100} = \mathbf{10}$
> * $|-5i| = \sqrt{0^2 + (-5)^2} = \sqrt{25} = \mathbf{5}$

---

### C. Complessi Coniugati e Complessi Opposti

> [!ABSTRACT] Coniugato e Opposto
> Dato il numero complesso $z = a + bi$:
> 1. **Complesso Coniugato ($\bar{z}$):** Ha la stessa parte reale e parte immaginaria **opposta**:
>    $$ \bbox[6px,border:1px solid #d24dff]{\bar{z} = a - bi} $$
> 2. **Complesso Opposto ($-z$):** Ha sia la parte reale sia la parte immaginaria **opposte**:
>    $$ \bbox[6px,border:1px solid #ffa64d]{-z = -a - bi} $$

> [!EXAMPLE] Esempi di Coniugati e Opposti
> * Dato $z = -2 + 5i \implies \bar{z} = -2 - 5i \quad \text{e} \quad -z = 2 - 5i$.
> * Dato $z = \sqrt{5} + 4i \implies \text{opposto } -z = -\sqrt{5} - 4i$.
> * Dato $z = 3i \implies \bar{z} = -3i \quad \text{e} \quad -z = -3i$ (per un immaginario puro, coniugato e opposto coincidono!).

---

## 3. Le Operazioni in Forma Algebrica

Poiché i numeri complessi hanno una struttura binomiale, le operazioni si eseguono trattando $z$ come un normale binomio in algebra elementare e sostituendo sistematicamente ogni occorrenza di $\color{#4df5ff}i^2$ con $\mathbf{-1}$.

### 1. Addizione e Sottrazione
Si sommano (o sottraggono) separatamente le parti reali tra loro e le parti immaginarie tra loro:
$$ (a + bi) \pm (c + di) = (a \pm c) + (b \pm d)i $$

> [!NOTE] Proprietà Notevoli con il Coniugato
> * **Somma di coniugati:** $z + \bar{z} = (a + bi) + (a - bi) = \mathbf{2a} \in \mathbb{R}$ (numero reale pari al doppio della parte reale).
> * **Differenza di coniugati:** $z - \bar{z} = (a + bi) - (a - bi) = \mathbf{2bi} \in \mathbb{I}$ (numero immaginario puro pari al doppio della parte immaginaria).
> * **Somma di opposti:** $z + (-z) = \mathbf{0}$.

> [!EXAMPLE] Esempi di Addizione e Sottrazione
> * $(4 + 2i) + (5 + 3i) = (4+5) + (2+3)i = \mathbf{9 + 5i}$
> * $(6 - i) + (6 + i) = 6 + 6 + (-1+1)i = \mathbf{12}$ (somma di coniugati)
> * $(12 - 7i) - (4 + 2i) = (12 - 4) + (-7 - 2)i = \mathbf{8 - 9i}$
> * $(2 - 15i) - (2 + 15i) = (2 - 2) + (-15 - 15)i = \mathbf{-30i}$

---

### 2. Moltiplicazione
Si applica la proprietà distributiva termine a termine:
$$ (a + bi) \cdot (c + di) = ac + adi + bci + bdi^2 $$
Poiché $bdi^2 = bd(-1) = -bd$, raggruppando si ottiene:
$$ \bbox[8px,border:2px solid #4da6ff]{(a + bi)(c + di) = (ac - bd) + (ad + bc)i} $$

> [!TIP] Teorema Fondamentale: Prodotto tra Complessi Coniugati
> Moltiplicando un numero complesso per il suo coniugato si ottiene la differenza di quadrati:
> $$ z \cdot \bar{z} = (a + bi)(a - bi) = a^2 - (bi)^2 = a^2 - b^2 i^2 = \bbox[8px,border:2px solid #4dff4d]{a^2 + b^2 = |z|^2} $$
> **Il prodotto di due numeri complessi coniugati è sempre un numero reale positivo o nullo, pari al quadrato del modulo!**

> [!EXAMPLE] Esempi di Moltiplicazione
> * $(1 - 3i)(2 - i) = 2 - i - 6i + 3i^2 = 2 - 7i + 3(-1) = (2 - 3) - 7i = \mathbf{-1 - 7i}$
> * $(6 + 7i)(6 - 7i) = 6^2 + 7^2 = 36 + 49 = \mathbf{85}$ (prodotto di coniugati)

---

### 3. Reciproco e Divisione

#### Reciproco di un Numero Complesso
Il reciproco di $z = a + bi \neq 0$ è quel numero $\frac{1}{z}$ tale che $z \cdot \frac{1}{z} = 1$. Moltiplicando numeratore e denominatore per il coniugato $\bar{z}$:
$$ \frac{1}{a + bi} = \frac{1 \cdot (a - bi)}{(a + bi)(a - bi)} = \bbox[8px,border:2px solid #d24dff]{\frac{a - bi}{a^2 + b^2} = \frac{a}{a^2 + b^2} - \frac{b}{a^2 + b^2}i} $$

#### Divisione (Quoziente tra due Complessi)
Per calcolare il quoziente $\frac{a + bi}{c + di}$ con $c+di \neq 0$, si moltiplica sia il numeratore sia il denominatore per il coniugato del denominatore $(c - di)$:
$$ \frac{a + bi}{c + di} = \frac{(a + bi)(c - di)}{(c + di)(c - di)} = \bbox[8px,border:2px solid #4df5ff]{\frac{(ac + bd) + (bc - ad)i}{c^2 + d^2}} $$

> [!EXAMPLE] Esempi di Divisione
> **Esempio 1: Calcolare il reciproco di $3 + 2i$**
> $$ \frac{1}{3 + 2i} = \frac{3 - 2i}{3^2 + 2^2} = \frac{3 - 2i}{9 + 4} = \mathbf{\frac{3}{13} - \frac{2}{13}i} $$
> 
> **Esempio 2: Divisione $\frac{3 - 2i}{4 + i}$**
> Moltiplichiamo numeratore e denominatore per $(4 - i)$:
> $$ \frac{(3 - 2i)(4 - i)}{(4 + i)(4 - i)} = \frac{12 - 3i - 8i + 2i^2}{16 - i^2} = \frac{12 - 11i - 2}{16 - (-1)} = \frac{10 - 11i}{17} = \mathbf{\frac{10}{17} - \frac{11}{17}i} $$

---

### 4. Elevamento a Potenza in Forma Algebrica

Per esponenti piccoli ($2$ e $3$) si applicano le formule dei prodotti notevoli:
* **Quadrato di binomio:**
  $$ (a + bi)^2 = a^2 + 2abi + b^2 i^2 = \mathbf{(a^2 - b^2) + 2abi} $$
* **Cubo di binomio:**
  $$ (a + bi)^3 = a^3 + 3a^2(bi) + 3a(bi)^2 + (bi)^3 = \mathbf{(a^3 - 3ab^2) + (3a^2b - b^3)i} $$

> [!EXAMPLE] Esempi di Potenze
> * $(5 - 3i)^2 = 25 - 30i + 9i^2 = 25 - 30i - 9 = \mathbf{16 - 30i}$
> * $(3 + 2i)^3 = 3^3 + 3(3^2)(2i) + 3(3)(2i)^2 + (2i)^3 = 27 + 54i + 36i^2 + 8i^3 = 27 + 54i - 36 - 8i = \mathbf{-9 + 46i}$

---

## 4. Curiosità Storica: Come Nacquero i Numeri Complessi

> [!NOTE] Da Cardano a Rafael Bombelli (Bologna, 1572)
> Contrariamente a quanto si pensa, i numeri complessi **non sono nati per risolvere le equazioni di secondo grado** (di fronte a $x^2 = -1$ i matematici dicevano semplicemente "non ci sono soluzioni reali").
> Nacquero invece per risolvere le **equazioni di terzo grado**:
> $$ x^3 = px + q $$
> Applicando la formula risolutiva di Gerolamo Cardano all'equazione $x^3 = 15x + 4$, si otteneva:
> $$ x = \sqrt[3]{2 + \sqrt{-121}} + \sqrt[3]{2 - \sqrt{-121}} $$
> Tuttavia, sostituendo per tentativi, si vedeva chiaramente che $x = 4$ era una soluzione reale validissima ($4^3 = 64 = 15(4) + 4$).
> Nel 1572 l'ingegnere bolognese **Rafael Bombelli** ebbe l'intuizione geniale: ipotizzò che $\sqrt{-121} = 11i$ e scoprì che:
> $$ (2 + i)^3 = 2 + 11i \quad \text{e} \quad (2 - i)^3 = 2 - 11i $$
> Pertanto:
> $$ x = (2 + i) + (2 - i) = 4 $$
> I numeri "impossibili" (immaginari) servivano come ponte intermedio per trovare soluzioni reali esistenti!
