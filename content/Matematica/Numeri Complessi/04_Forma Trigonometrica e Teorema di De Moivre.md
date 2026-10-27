---
title: "Forma Trigonometrica e Teorema di De Moivre"
description: "Scrittura trigonometrica dei numeri complessi, interpretazione geometrica del prodotto come rototraslazione, quoziente, reciproco e calcolo delle potenze con la formula di Abraham De Moivre."
tags:
  - matematica/numeri-complessi
  - trigonometria
  - de-moivre
  - potenze-complesse
---

# Forma Trigonometrica e Teorema di De Moivre

La forma algebrica $z = a + bi$ è eccellente per sommare e sottrarre numeri complessi, ma risulta estremamente laboriosa per moltiplicazioni ripetute, divisioni e potenze elevate.
Introducendo la trigonometria, queste operazioni si semplificano in modo straordinario.

---

## 1. Definizione della Forma Trigonometrica

Sostituendo le relazioni polari $a = r\cos\alpha$ e $b = r\sin\alpha$ nella forma algebrica, otteniamo:
$$ z = a + bi = (r\cos\alpha) + (r\sin\alpha)i $$
Raccogliendo a fattor comune il modulo $r$:

> [!ABSTRACT] Forma Trigonometrica di un Numero Complesso
> $$ \bbox[8px,border:2px solid #ffff4d]{z = \color{#ffff4d}r \left( \cos\color{#4dff4d}\alpha \color{white}+ \color{#4df5ff}i \color{white}\sin\color{#4dff4d}\alpha \right)} $$
> dove:
> * $\color{#ffff4d}r = |z| = \sqrt{a^2 + b^2} \ge 0$ è il **modulo** (o raggio).
> * $\color{#4dff4d}\alpha$ è l'**argomento** (o anomalia), con $\tan\alpha = \frac{b}{a}$.

> [!EXAMPLE] Conversione da Forma Algebrica a Trigonometrica
> Scrivere in forma trigonometrica il numero complesso $z = \sqrt{3} + i$:
> 1. **Calcolo del modulo $r$:**
>    $$ r = \sqrt{(\sqrt{3})^2 + 1^2} = \sqrt{3 + 1} = \sqrt{4} = \mathbf{2} $$
> 2. **Calcolo dell'argomento $\alpha$:**
>    $$ \tan\alpha = \frac{b}{a} = \frac{1}{\sqrt{3}} = \frac{\sqrt{3}}{3} $$
>    Poiché sia la parte reale sia la parte immaginaria sono positive ($a > 0, b > 0$), ci troviamo nel **Primo Quadrante**:
>    $$ \alpha = \mathbf{\frac{\pi}{6}} \quad (30^\circ) $$
> 3. **Scrittura finale:**
>    $$ z = \mathbf{2 \left( \cos\frac{\pi}{6} + i\sin\frac{\pi}{6} \right)} $$

---

## 2. Le Operazioni in Forma Trigonometrica

Siano dati due numeri complessi:
$$ z_1 = r(\cos\alpha + i\sin\alpha) \quad \text{e} \quad z_2 = s(\cos\beta + i\sin\beta) $$

### A. Prodotto (Moltiplicazione)
Moltiplicando algebricamente i due termini:
$$ z_1 \cdot z_2 = [r(\cos\alpha + i\sin\alpha)] \cdot [s(\cos\beta + i\sin\beta)] $$
$$ = r \cdot s [(\cos\alpha\cos\beta - \sin\alpha\sin\beta) + i(\sin\alpha\cos\beta + \cos\alpha\sin\beta)] $$
Applicando le formule di addizione del coseno e del seno:
* $\cos\alpha\cos\beta - \sin\alpha\sin\beta = \cos(\alpha + \beta)$
* $\sin\alpha\cos\beta + \cos\alpha\sin\beta = \sin(\alpha + \beta)$

> [!TIP] Teorema del Prodotto in Forma Trigonometrica
> $$ \bbox[8px,border:2px solid #4dff4d]{z_1 \cdot z_2 = (r \cdot s) \left[ \cos(\alpha + \beta) + i\sin(\alpha + \beta) \right]} $$
> **Regola aurea:** Il prodotto di due numeri complessi ha per modulo il **prodotto dei moduli** e per argomento la **somma degli argomenti**.

> [!NOTE] Significato Geometrico: Rototraslazione
> Moltiplicare un numero complesso per un altro equivale geometricamente a:
> 1. **Ruotare** il vettore di un angolo pari a $\beta$ in senso antiorario.
> 2. **Scalare (dilatare o comprimere)** la lunghezza del vettore per un fattore $s$.
> ![[compl_04_prodotto_rotazione.png]]

> [!EXAMPLE] Esempio di Prodotto
> Dati $z_1 = 2\left(\cos\frac{\pi}{6} + i\sin\frac{\pi}{6}\right)$ e $z_2 = 3\left(\cos\frac{\pi}{3} + i\sin\frac{\pi}{3}\right)$:
> * Modulo risultante: $R = 2 \cdot 3 = \mathbf{6}$
> * Argomento risultante: $\theta = \frac{\pi}{6} + \frac{\pi}{3} = \frac{\pi + 2\pi}{6} = \frac{3\pi}{6} = \mathbf{\frac{\pi}{2}}$
> $$ z_1 \cdot z_2 = \mathbf{6 \left( \cos\frac{\pi}{2} + i\sin\frac{\pi}{2} \right)} = 6(0 + i \cdot 1) = \mathbf{6i} $$

---

### B. Quoziente (Divisione)
In modo del tutto analogo, dividendo $z_1$ per $z_2 \neq 0$:

> [!TIP] Teorema del Quoziente
> $$ \bbox[8px,border:2px solid #4da6ff]{\frac{z_1}{z_2} = \left(\frac{r}{s}\right) \left[ \cos(\alpha - \beta) + i\sin(\alpha - \beta) \right]} $$
> **Regola aurea:** Il quoziente ha per modulo il **quoziente dei moduli** e per argomento la **differenza degli argomenti**.

> [!EXAMPLE] Esempio di Divisione
> Dati $z_1 = 6\left(\cos\frac{3}{4}\pi + i\sin\frac{3}{4}\pi\right)$ e $z_2 = 3\left(\cos\frac{\pi}{4} + i\sin\frac{\pi}{4}\right)$:
> * Modulo: $\frac{6}{3} = \mathbf{2}$
> * Argomento: $\frac{3}{4}\pi - \frac{1}{4}\pi = \frac{2}{4}\pi = \mathbf{\frac{\pi}{2}}$
> $$ \frac{z_1}{z_2} = \mathbf{2 \left( \cos\frac{\pi}{2} + i\sin\frac{\pi}{2} \right)} = 2(0 + i) = \mathbf{2i} $$

---

### C. Reciproco
Ponendo $z_1 = 1 = 1(\cos 0 + i\sin 0)$:
$$ \bbox[6px,border:1px solid #d24dff]{\frac{1}{z} = \frac{1}{r} \left[ \cos(-\alpha) + i\sin(-\alpha) \right] = \frac{1}{r} \left[ \cos\alpha - i\sin\alpha \right]} $$

---

## 3. Elevamento a Potenza: La Formula di De Moivre

Cosa accade se moltiplichiamo un numero complesso $z = r(\cos\alpha + i\sin\alpha)$ per se stesso $n$ volte ($z \cdot z \cdot \dots \cdot z$)?
* Il modulo viene moltiplicato $n$ volte: $r \cdot r \cdot \dots \cdot r = r^n$.
* L'argomento viene sommato $n$ volte: $\alpha + \alpha + \dots + \alpha = n\alpha$.

Questo risultato fu formalizzato dal matematico francese Abraham De Moivre:

> [!ABSTRACT] Formula di De Moivre (Potenza $n$-esima)
> Per qualunque numero intero $n \in \mathbb{Z}$:
> $$ \bbox[8px,border:2px solid #ff4d4d]{z^n = [r(\cos\alpha + i\sin\alpha)]^n = \mathbf{r^n \left[ \cos(n\alpha) + i\sin(n\alpha) \right]}} $$

> [!EXAMPLE] Esempio Pratico: Calcolo di una Potenza Elevata
> Calcolare $(1 + i)^{12}$ senza eseguire 12 moltiplicazioni binomiali.
> 
> **Passo 1: Conversione della base in forma trigonometrica**
> Dato $z = 1 + i$:
> * Modulo: $r = \sqrt{1^2 + 1^2} = \sqrt{2}$.
> * Argomento: $\tan\alpha = \frac{1}{1} = 1 \implies \alpha = \frac{\pi}{4}$ ($45^\circ$, I quadrante).
> * $z = \sqrt{2}\left(\cos\frac{\pi}{4} + i\sin\frac{\pi}{4}\right)$.
> 
> **Passo 2: Applicazione della formula di De Moivre con $n = 12$**
> * Modulo elevato: $(\sqrt{2})^{12} = (2^{1/2})^{12} = 2^6 = \mathbf{64}$.
> * Argomento moltiplicato: $12 \cdot \frac{\pi}{4} = 3\pi$.
> 
> **Passo 3: Semplificazione dell'argomento**
> Ricordando che $3\pi = 2\pi + \pi \equiv \pi$:
> $$ (1 + i)^{12} = 64(\cos 3\pi + i\sin 3\pi) = 64(\cos\pi + i\sin\pi) $$
> Poiché $\cos\pi = -1$ e $\sin\pi = 0$:
> $$ (1 + i)^{12} = 64(-1 + 0i) = \mathbf{-64} $$
> Un calcolo algebrico titanico risolto in 3 passaggi elementari!
