---
title: "Insieme C e Numeri Immaginari"
description: "Dall'insufficienza dei numeri reali alla nascita dell'unità immaginaria i, definizione di numero immaginario puro, operazioni elementari e calcolo ciclico delle potenze di i."
tags:
  - matematica/numeri-complessi
  - matematica/algebra
  - teoria
  - unita-immaginaria
---

# Insieme $\mathbb{C}$ e Numeri Immaginari

> [!NOTE] Il Limite dei Numeri Reali ($\mathbb{R}$)
> Nell'insieme dei numeri reali $\mathbb{R}$, l'operazione di estrazione di radice con indice pari ammette soluzione **solo se il radicando è positivo o nullo**:
> $$ \sqrt{a} \in \mathbb{R} \iff a \ge 0 $$
> Di conseguenza, equazioni algebriche elementari come:
> $$ x^2 = -1 \quad \text{oppure} \quad x^2 = -4 $$
> risultano **impossibili** in $\mathbb{R}$, poiché il quadrato di qualsiasi numero reale è sempre $\ge 0$.
> Per superare questo limite strutturale, i matematici hanno esteso $\mathbb{R}$ introducendo un nuovo insieme numerico: **l'insieme dei Numeri Complessi ($\mathbb{C}$)**.

---

## 1. L'Unità Immaginaria $i$

Per dare senso alle radici quadrate di numeri negativi, si definisce un nuovo ente matematico astratto:

> [!ABSTRACT] Definizione di Unità Immaginaria
> Si definisce **unità immaginaria**, e si indica con la lettera $\color{#4df5ff}i$, quel numero (non appartenente a $\mathbb{R}$) il cui quadrato vale $-1$:
> $$ \bbox[8px,border:2px solid #4df5ff]{\color{#4df5ff}i^2 = -1} \iff \color{#4df5ff}i = \sqrt{-1} $$

Grazie a questa convenzione formale, possiamo ora estrarre la radice quadrata di qualsiasi numero reale negativo:
*   $\sqrt{-4} = \sqrt{4 \cdot (-1)} = \sqrt{4} \cdot \sqrt{-1} = \color{#4df5ff}2i$
*   $\sqrt{-9} = \sqrt{9 \cdot (-1)} = \sqrt{9} \cdot \sqrt{-1} = \color{#4df5ff}3i$
*   $\sqrt{-2} = \sqrt{2 \cdot (-1)} = \color{#4df5ff}\sqrt{2}\,i$

---

## 2. I Numeri Immaginari Puri

> [!INFO] Definizione di Numero Immaginario Puro
> Un **numero immaginario puro** è un'espressione della forma:
> $$ z = \color{#ff4d4d}b \cdot \color{#4df5ff}i \quad \text{con } \color{#ff4d4d}b \in \mathbb{R} \text{ e } \color{#4df5ff}i \text{ unità immaginaria} $$
> * Il coefficiente reale $\color{#ff4d4d}b$ prende il nome di **coefficiente del numero immaginario**.
> * L'insieme di tutti i numeri immaginari viene indicato con la lettera $\mathbb{I}$.
> 
> **Casi particolari:**
> * Se $b = 1 \implies 1 \cdot i = \color{#4df5ff}i$.
> * Se $b = 0 \implies 0 \cdot i = \color{#ffffff}0$ (l'elemento neutro $0$ è l'unico numero comune sia a $\mathbb{R}$ sia a $\mathbb{I}$).
> * Due numeri immaginari $b i$ e $-b i$ si dicono **opposti** (es. $3i$ e $-3i$).

---

## 3. Operazioni Elementari con i Numeri Immaginari

Le operazioni tra numeri immaginari puri ricalcano le usuali regole dell'algebra dei monomi, tenendo conto dell'identità $\color{#4df5ff}i^2 = -1$:

### A. Addizione e Sottrazione
Si sommano o sottraggono algebricamente i coefficienti reali, mantenendo invariata l'unità immaginaria:
$$ a\color{#4df5ff}i \color{white}\pm b\color{#4df5ff}i \color{white}= (a \pm b)\color{#4df5ff}i $$
> [!NOTE] Proprietà di Chiusura
> L'addizione e la sottrazione tra numeri immaginari sono **operazioni interne** a $\mathbb{I}$ (il risultato è ancora un numero immaginario o $0$).

### B. Moltiplicazione
Si moltiplicano i coefficienti reali e si applica la proprietà delle potenze su $i \cdot i = i^2 = -1$:
$$ (a\color{#4df5ff}i\color{white}) \cdot (b\color{#4df5ff}i\color{white}) = (a \cdot b) \cdot \color{#4df5ff}i^2 \color{white}= (a \cdot b) \cdot (-1) = \color{#ff4d4d}-ab $$
> [!WARNING] Risultato Reale!
> Il prodotto di due numeri immaginari puri **non appartiene ad $\mathbb{I}$**, bensì appartiene a $\mathbb{R}$. La moltiplicazione non è quindi un'operazione interna a $\mathbb{I}$.

### C. Divisione
$$ \frac{a\color{#4df5ff}i}{b\color{#4df5ff}i} = \frac{a}{b} \in \mathbb{R} \quad (b \neq 0) $$

> [!EXAMPLE] Esempi di Calcolo Rapido
> 1. **Somma:** $5i + 6i = (5+6)i = \color{#4df5ff}11i$
> 2. **Differenza:** $10i - 9i = \color{#4df5ff}i$
> 3. **Prodotto:** $3i \cdot 5i = 15 \cdot i^2 = 15 \cdot (-1) = \color{#ff4d4d}-15$
> 4. **Divisione:** $\frac{8i}{2i} = \color{#4dff4d}4$

---

## 4. Il Ciclo delle Potenze di $i$

Calcolando le potenze successive dell'unità immaginaria con esponente intero positivo, emerge una proprietà ciclica fondamentale di periodo 4:

| Potenza | Calcolo | Risultato |
| :---: | :---: | :---: |
| $\color{#ffff4d}i^0$ | Per definizione di potenza con esponente $0$ | $\mathbf{+1}$ |
| $\color{#4df5ff}i^1$ | Identità | $\mathbf{+i}$ |
| $\color{#ff4d4d}i^2$ | Definizione fondamentale di unità immaginaria | $\mathbf{-1}$ |
| $\color{#d24dff}i^3$ | $i^2 \cdot i = (-1) \cdot i$ | $\mathbf{-i}$ |
| $\color{#ffff4d}i^4$ | $i^2 \cdot i^2 = (-1) \cdot (-1)$ | $\mathbf{+1}$ |
| $\color{#4df5ff}i^5$ | $i^4 \cdot i = 1 \cdot i$ | $\mathbf{+i}$ |
| $\color{#ff4d4d}i^6$ | $i^4 \cdot i^2 = 1 \cdot (-1)$ | $\mathbf{-1}$ |
| $\color{#d24dff}i^7$ | $i^4 \cdot i^3 = 1 \cdot (-i)$ | $\mathbf{-i}$ |

> [!TIP] Regola Pratica: L'Algoritmo del Resto Modulo 4
> Le potenze di $i$ si ripetono ciclicamente nella sequenza:
> $$ \mathbf{\{ +1,\ +i,\ -1,\ -i \}} $$
> Per calcolare una potenza $i^n$ con qualsiasi esponente naturale $n \ge 4$:
> 1. Si divide l'esponente $n$ per $4$ trovando quoziente $q$ e **resto** $r \in \{0, 1, 2, 3\}$:
>    $$ n = 4q + r $$
> 2. Si sfrutta l'identità $(i^4)^q = 1^q = 1$, ottenendo:
>    $$ \bbox[8px,border:2px solid #4dff4d]{\color{#4dff4d}i^n = i^{4q+r} = (i^4)^q \cdot i^r = 1^q \cdot i^r = \mathbf{i^r}} $$

> [!EXAMPLE] Visualizzazione Geometrica del Ciclo
> Ogni moltiplicazione per $i$ equivale a una rotazione rigida in senso antiorario di $90^\circ$ ($\frac{\pi}{2}$ radianti) sul piano:
> ![[compl_01_potenze_i.png]]

> [!EXAMPLE] Esempi di Svolgimento
> **Esempio 1: Calcolare $i^{14}$**
> * Divisione: $14 : 4 = 3$ con **resto $r = 2$**.
> * Calcolo: $i^{14} = i^2 = \mathbf{-1}$.
> 
> **Esempio 2: Calcolare $i^{53}$**
> * Divisione: $53 : 4 = 13$ con **resto $r = 1$**.
> * Calcolo: $i^{53} = i^1 = \mathbf{i}$.
> 
> **Esempio 3: Calcolare $i^{100}$**
> * Divisione: $100 : 4 = 25$ con **resto $r = 0$**.
> * Calcolo: $i^{100} = i^0 = \mathbf{1}$.
> 
> **Esempio 4: Potenze di monomi immaginari**
> * $(7i)^2 = 7^2 \cdot i^2 = 49 \cdot (-1) = \mathbf{-49}$
> * $(-3i)^2 = (-3)^2 \cdot i^2 = 9 \cdot (-1) = \mathbf{-9}$
> * $(\sqrt{2}\,i)^2 = (\sqrt{2})^2 \cdot i^2 = 2 \cdot (-1) = \mathbf{-2}$
> * $(2i)^3 = 2^3 \cdot i^3 = 8 \cdot (-i) = \mathbf{-8i}$
