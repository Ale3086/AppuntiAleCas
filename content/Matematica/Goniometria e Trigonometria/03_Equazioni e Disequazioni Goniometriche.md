---
title: "Equazioni e Disequazioni Goniometriche"
description: "Risoluzione di equazioni e disequazioni goniometriche elementari sulla circonferenza, equazioni lineari in seno e coseno ed equazioni omogenee di secondo grado."
tags:
  - matematica/goniometria
  - equazioni-goniometriche
  - disequazioni-goniometriche
  - omogenee
---

# Equazioni e Disequazioni Goniometriche

## 1. Equazioni Goniometriche Elementari

Un'equazione si dice **elementare** quando compare una sola funzione goniometrica uguagliata ad una costante reale $k$:

### A. Equazione in Seno: $\sin x = k$
* Se $|k| > 1 \implies \mathbf{\emptyset}$ (impossibile, poiché $-1 \le \sin x \le 1$).
* Se $|k| \le 1 \implies$ Sulla circonferenza goniometrica tracciamo la retta orizzontale $y = k$. Essa individua **due punti distinti** (simmetrici rispetto all'asse $y$).
  Detto $\alpha$ il primo angolo:
  $$ \bbox[8px,border:2px solid #4da6ff]{x = \alpha + 2k\pi \quad \lor \quad x = (\pi - \alpha) + 2k\pi \quad (k \in \mathbb{Z})} $$

> [!EXAMPLE] Esempio: $\sin x = \frac{1}{2}$
> L'angolo del primo quadrante con seno $1/2$ è $\frac{\pi}{6}$ ($30^\circ$). Il suo supplementare nel secondo quadrante è $\pi - \frac{\pi}{6} = \frac{5}{6}\pi$ ($150^\circ$).
> $$ \mathbf{x = \frac{\pi}{6} + 2k\pi \quad \lor \quad x = \frac{5}{6}\pi + 2k\pi} $$
> ![[gonio_es2_equazione.png]]

---

### B. Equazione in Coseno: $\cos x = k$
* Se $|k| > 1 \implies \mathbf{\emptyset}$ (impossibile).
* Se $|k| \le 1 \implies$ Tracciamo la retta verticale $x = k$ (punti simmetrici rispetto all'asse $x$):
  $$ \bbox[8px,border:2px solid #ff4d4d]{x = \pm\alpha + 2k\pi \quad (k \in \mathbb{Z})} $$

### C. Equazione in Tangente: $\tan x = k$
È sempre determinata per qualsiasi valore di $k \in \mathbb{R}$. Poiché la tangente ha periodo $\pi$:
$$ \bbox[8px,border:2px solid #4dff4d]{x = \alpha + k\pi \quad (k \in \mathbb{Z})} $$

---

## 2. Equazioni Lineari in Seno e Coseno

Forma generale:
$$ a\sin x + b\cos x + c = 0 \quad (a \neq 0, b \neq 0) $$

### Metodo Grafico (Intersezione Retta-Circonferenza)
Ponendo:
$$ X = \cos x \quad \text{e} \quad Y = \sin x $$
l'equazione lineare si trasforma nel sistema cartesiano tra una retta e la circonferenza goniometrica:
$$ \begin{cases} aY + bX + c = 0 \\ X^2 + Y^2 = 1 \end{cases} $$
Trovate le coordinate dei punti di intersezione $(X_0, Y_0)$, si ricavano i corrispondenti angoli $x$.

---

## 3. Equazioni Omogenee di Secondo Grado

Forma generale:
$$ a\sin^2 x + b\sin x\cos x + c\cos^2 x = 0 $$
Tutti i termini hanno lo stesso grado complessivo ($2$).

> [!TIP] Tecnica Risolutiva
> 1. Verificare se $\cos x = 0$ è soluzione: ponendo $\cos x = 0 \implies a\sin^2 x = 0 \implies a = 0$. Se $a \neq 0$, $\cos x$ non può mai essere zero.
> 2. **Dividere tutti i termini per $\cos^2 x$**:
>    $$ a\frac{\sin^2 x}{\cos^2 x} + b\frac{\sin x\cos x}{\cos^2 x} + c\frac{\cos^2 x}{\cos^2 x} = 0 $$
> 3. Ricordando che $\frac{\sin x}{\cos x} = \tan x$, l'equazione si trasforma in una **semplice equazione algebrica di secondo grado nell'incognita $\tan x$**:
>    $$ \bbox[8px,border:2px solid #ffff4d]{a\tan^2 x + b\tan x + c = 0} $$
> 4. Risolta con la formula del $\Delta$, si ottengono due valori di $\tan x$ riconducibili a equazioni elementari!

---

## 4. Disequazioni Goniometriche

Si risolvono tracciando la circonferenza goniometrica:
* Per $\sin x > k$: si traccia la retta $y = k$ e si evidenzia l'**arco di circonferenza posto al di sopra** della retta.
* Per $\cos x > k$: si traccia la retta $x = k$ e si evidenzia l'**arco posto a destra** della retta.
* Si leggono gli angoli procedendo rigorosamente **in senso antiorario** dall'estremo inferiore all'estremo superiore, aggiungendo il periodo $+2k\pi$.
