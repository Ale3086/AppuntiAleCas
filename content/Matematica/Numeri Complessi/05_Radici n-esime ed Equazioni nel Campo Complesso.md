---
title: "Radici n-esime ed Equazioni nel Campo Complesso"
description: "Teoria ed interpretazione geometrica delle radici n-esime di numeri complessi e dell'unità (poligoni regolari inscritti), risoluzione di equazioni binomie, equazioni di secondo grado con discriminante negativo e Teorema Fondamentale dell'Algebra."
tags:
  - matematica/numeri-complessi
  - radici-complesse
  - equazioni-in-c
  - teorema-fondamentale-algebra
---

# Radici $n$-esime ed Equazioni nel Campo Complesso

Nei numeri reali, l'operazione di estrazione di radice è fortemente limitata: non possiamo estrarre radici di indice pari da numeri negativi, e quando esistono, le radici reali sono al massimo due ($\pm$).
Nel campo complesso $\mathbb{C}$, la situazione diventa straordinariamente simmetrica e regolare.

---

## 1. Il Problema delle Radici nel Campo Complesso

> [!NOTE] Definizione di Radice $n$-esima in $\mathbb{C}$
> Dati un numero complesso $z$ e un intero positivo $n \ge 1$, si chiama **radice $n$-esima di $z$** ogni numero complesso $w$ che elevato alla potenza $n$ restituisce $z$:
> $$ \sqrt[n]{z} = w \iff \mathbf{w^n = z} $$

Nel campo complesso sussiste un teorema fondamentale:
**Ogni numero complesso non nullo $z \neq 0$ ammette ==esattamente $n$ radici $n$-esime distinte==.**

---

## 2. Le Radici $n$-esime dell'Unità ($\sqrt[n]{1}$)

Iniziamo analizzando il caso speciale in cui $z = 1$.
Scritto in forma trigonometrica: $1 = 1 \cdot (\cos 0 + i\sin 0)$.
Cerchiamo $u = \rho(\cos\theta + i\sin\theta)$ tale che $u^n = 1$.
Applicando De Moivre:
$$ \rho^n [\cos(n\theta) + i\sin(n\theta)] = 1(\cos 0 + i\sin 0) $$
Uguagliando i moduli e gli argomenti a meno di multipli di $2\pi$:
* $\rho^n = 1 \implies \rho = 1$
* $n\theta = 0 + 2k\pi \implies \theta_k = \frac{2k\pi}{n}$

> [!ABSTRACT] Formula delle Radici $n$-esime dell'Unità
> $$ \bbox[8px,border:2px solid #ffff4d]{\sqrt[n]{1} = \cos\left(\frac{2k\pi}{n}\right) + i\sin\left(\frac{2k\pi}{n}\right) \quad \text{con } k = 0, 1, 2, \dots, n-1} $$
> Facendo variare l'indice intero $k$ da $0$ a $n-1$, si ottengono tutte e sole le $n$ radici distinte. Se continuassimo con $k = n$, l'angolo diverrebbe $\frac{2n\pi}{n} = 2\pi \equiv 0$, ricominciando ciclicamente dal valore per $k = 0$.

> [!TIP] Interpretazione Geometrica Meravigliosa
> Le $n$ radici $n$-esime dell'unità:
> 1. Hanno tutte modulo unitario ($r = 1$), quindi giacciono tutte sulla **circonferenza goniometrica**.
> 2. I loro argomenti differiscono costantemente di un angolo pari a $\Delta\theta = \frac{2\pi}{n}$.
> 3. Costituiscono i **vertici di un poligono regolare di $n$ lati inscritto nella circonferenza**, avente sempre uno dei vertici nel punto reale $(1, 0)$ (corrispondente a $k = 0$).

> [!EXAMPLE] Le Radici Cubiche dell'Unità ($\sqrt[3]{1}$)
> Ponendo $n = 3$, l'angolo base di spaziatura è $\frac{2\pi}{3} = 120^\circ$:
> * **Per $k = 0$:** $u_0 = \cos 0 + i\sin 0 = \mathbf{1}$
> * **Per $k = 1$:** $u_1 = \cos\frac{2\pi}{3} + i\sin\frac{2\pi}{3} = -\frac{1}{2} + i\frac{\sqrt{3}}{2}$
> * **Per $k = 2$:** $u_2 = \cos\frac{4\pi}{3} + i\sin\frac{4\pi}{3} = -\frac{1}{2} - i\frac{\sqrt{3}}{2}$
> 
> Unendo i tre punti otteniamo un **triangolo equilatero perfetto**:
> ![[compl_05_radici_cubiche_unita.png]]

---

## 3. Radici $n$-esime di un Numero Complesso Generico

Dato $z = r(\cos\alpha + i\sin\alpha)$, applicando lo stesso procedimento di uguagliamento si giunge alla formula generale:

> [!ABSTRACT] Teorema delle Radici $n$-esime
> Le $n$ radici distinte di $z$ sono date da:
> $$ \bbox[8px,border:2px solid #4df5ff]{w_k = \sqrt[n]{r} \left[ \cos\left( \frac{\alpha + 2k\pi}{n} \right) + i\sin\left( \frac{\alpha + 2k\pi}{n} \right) \right]} $$
> per ogni $k \in \{0, 1, 2, \dots, n-1\}$.

> [!NOTE] Proprietà Geometriche Generali
> Nel piano di Gauss, le $n$ radici di un qualsiasi numero complesso $z$:
> * Si trovano su una **circonferenza concentrica nell'origine di raggio $R = \sqrt[n]{r}$**.
> * Formano i **vertici di un poligono regolare di $n$ lati**, ruotato rispetto agli assi di un angolo iniziale $\theta_0 = \frac{\alpha}{n}$.

> [!EXAMPLE] Esempio Svolto dal Libro: Radici Cubiche di $z = -8i$
> Calcolare le radici cubiche ($n = 3$) del numero $z = -8i$.
> 
> **Passo 1: Scrittura trigonometrica di $z = -8i$**
> * Modulo: $r = |-8i| = 8$.
> * Argomento: il punto si trova sul semiasse negativo delle $y$, quindi $\alpha = \frac{3\pi}{2}$ ($270^\circ$).
> * $z = 8 \left( \cos\frac{3\pi}{2} + i\sin\frac{3\pi}{2} \right)$.
> 
> **Passo 2: Calcolo del raggio e degli angoli**
> * Il raggio delle radici sarà: $R = \sqrt[3]{8} = \mathbf{2}$.
> * Gli argomenti sono: $\theta_k = \frac{\frac{3\pi}{2} + 2k\pi}{3} = \frac{\pi}{2} + \frac{2k\pi}{3}$.
> 
> **Passo 3: Sostituzione per $k = 0, 1, 2$**
> * **Per $k = 0$:**
>   $\theta_0 = \frac{\pi}{2}$ ($90^\circ$)
>   $$ z_0 = 2\left(\cos\frac{\pi}{2} + i\sin\frac{\pi}{2}\right) = 2(0 + i) = \mathbf{2i} $$
> * **Per $k = 1$:**
>   $\theta_1 = \frac{\pi}{2} + \frac{2\pi}{3} = \frac{7\pi}{6}$ ($210^\circ$)
>   $$ z_1 = 2\left(\cos\frac{7\pi}{6} + i\sin\frac{7\pi}{6}\right) = 2\left(-\frac{\sqrt{3}}{2} - \frac{1}{2}i\right) = \mathbf{-\sqrt{3} - i} $$
> * **Per $k = 2$:**
>   $\theta_2 = \frac{\pi}{2} + \frac{4\pi}{3} = \frac{11\pi}{6}$ ($330^\circ$)
>   $$ z_2 = 2\left(\cos\frac{11\pi}{6} + i\sin\frac{11\pi}{6}\right) = 2\left(\frac{\sqrt{3}}{2} - \frac{1}{2}i\right) = \mathbf{\sqrt{3} - i} $$
> 
> ![[compl_06_radici_n_generiche.png]]

---

## 4. Risoluzione di Equazioni Algebriche in $\mathbb{C}$

L'estensione al campo complesso abbatte ogni barriera algebrica nella risoluzione delle equazioni:

### A. Equazioni di Secondo Grado con $\Delta < 0$
Data l'equazione a coefficienti reali:
$$ ax^2 + bx + c = 0 \quad \text{con } a, b, c \in \mathbb{R} $$
Se il discriminante $\Delta = b^2 - 4ac < 0$, in $\mathbb{R}$ non esistevano radici reali.
In $\mathbb{C}$, sapendo che $\sqrt{\Delta} = \sqrt{-|\Delta|} = \sqrt{|\Delta|} \cdot \sqrt{-1} = i\sqrt{|\Delta|}$:

> [!TIP] Formula Risolutiva con $\Delta < 0$
> $$ \bbox[8px,border:2px solid #ff4d4d]{x_{1,2} = \frac{-b \pm i\sqrt{|\Delta|}}{2a}} $$
> **Proprietà fondamentale:** Se i coefficienti dell'equazione sono reali e $\Delta < 0$, le due soluzioni complesse sono ==sempre strettamente coniugate tra loro==:
> $$ x_2 = \overline{x_1} $$

> [!EXAMPLE] Esempi di Equazioni di Secondo Grado
> **Esempio 1: $x^2 = -4$**
> $$ x = \pm\sqrt{-4} = \pm 2i \implies \mathbf{x_1 = 2i, \quad x_2 = -2i} $$
> 
> **Esempio 2: $x^2 - 6x + 25 = 0$**
> * Calcolo del discriminante:
>   $$ \Delta = (-6)^2 - 4(1)(25) = 36 - 100 = \mathbf{-64} < 0 $$
> * Poiché $|\Delta| = 64 \implies \sqrt{-64} = 8i$:
>   $$ x_{1,2} = \frac{6 \pm 8i}{2} = \mathbf{3 \pm 4i} $$
> * Le due soluzioni sono $x_1 = 3 + 4i$ e $x_2 = 3 - 4i$ (coniugate).
> 
> **Esempio 3: $x^2 + 2x + 10 = 0$**
> * Formula ridotta con $\frac{b}{2} = 1$:
>   $$ \frac{\Delta}{4} = 1^2 - 10 = -9 \implies \sqrt{-9} = 3i $$
>   $$ x_{1,2} = -1 \pm 3i \implies \mathbf{x_1 = -1 + 3i, \quad x_2 = -1 - 3i} $$

---

## 5. Il Teorema Fondamentale dell'Algebra

> [!ABSTRACT] Teorema Fondamentale dell'Algebra (Gauss, 1799)
> **Ogni equazione polinomiale di grado $n \ge 1$ a coefficienti complessi (o reali):**
> $$ a_n z^n + a_{n-1} z^{n-1} + \dots + a_1 z + a_0 = 0 \quad (a_n \neq 0) $$
> **ammette ==esattamente $n$ soluzioni complesse==** (eventualmente coincidenti, contate cioè con la rispettiva molteplicità algebrica).
> Di conseguenza, nel campo $\mathbb{C}$ ogni polinomio è sempre completamente scomponibile in fattori di primo grado:
> $$ P(z) = a_n (z - z_1)(z - z_2) \cdots (z - z_n) $$
> In termini algebrici moderni, si dice che **$\mathbb{C}$ è un campo algebricamente chiuso**.
