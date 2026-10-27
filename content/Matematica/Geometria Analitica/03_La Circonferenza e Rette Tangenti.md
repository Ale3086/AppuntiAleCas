---
title: "La Circonferenza e Rette Tangenti"
description: "Equazione della circonferenza noto centro e raggio, equazione canonica generale, condizioni di realtà e studio delle rette tangenti (metodo geometrico e algebrico)."
tags:
  - matematica/geometria-analitica
  - circonferenza
  - coniche
  - rette-tangenti
---

# La Circonferenza e Rette Tangenti

## 1. Definizione Geometrica e Prima Equazione

> [!ABSTRACT] Luogo Geometrico
> La **circonferenza** è il luogo geometrico dei punti del piano cartesiano aventi distanza costante da un punto fisso detto <span style="color: #ffffff">**Centro ($C$)**</span>. Tale distanza costante prende il nome di <span style="color: #ffff4d">**Raggio ($r$)**</span>:
> $$ \bbox[8px,border:2px solid #ffff4d]{d(P, C) = r \quad (r > 0)} $$

Applicando la formula della distanza euclidea tra un punto generico $P(x, y)$ e il Centro $C(x_C, y_C)$:
$$ \sqrt{(x - x_C)^2 + (y - y_C)^2} = r $$
Elevando al quadrato entrambi i membri si ottiene l'**equazione standard**:
$$ \bbox[8px,border:2px solid #4da6ff]{(x - x_C)^2 + (y - y_C)^2 = r^2} $$

---

## 2. L'Equazione Canonica Generale

Sviluppando i quadrati di binomio dell'equazione standard:
$$ x^2 - 2x_C x + x_C^2 + y^2 - 2y_C y + y_C^2 - r^2 = 0 $$
Ponendo:
$$ a = -2x_C, \quad b = -2y_C, \quad c = x_C^2 + y_C^2 - r^2 $$
otteniamo l'**Equazione Canonica della Circonferenza**:
$$ \bbox[8px,border:2px solid #4dff4d]{x^2 + y^2 + ax + by + c = 0} $$

> [!NOTE] Caratteristiche Strutturali Immediatamente Riconoscibili
> 1. I termini di secondo grado $x^2$ e $y^2$ hanno lo **stesso coefficiente numerico** (normalizzabile a $1$).
> 2. **Manca completamente il termine misto in $xy$** (coefficiente nullo).

### Formule Inverse: Dal Polinomio a Centro e Raggio
Data l'equazione $x^2 + y^2 + ax + by + c = 0$:
* **Coordinate del Centro:**
  $$ \bbox[6px,border:1px solid #4df5ff]{C \left( -\frac{a}{2}; -\frac{b}{2} \right)} $$
* **Misura del Raggio:**
  $$ \bbox[6px,border:1px solid #ff4d4d]{r = \sqrt{\left(-\frac{a}{2}\right)^2 + \left(-\frac{b}{2}\right)^2 - c} = \sqrt{x_C^2 + y_C^2 - c}} $$

> [!WARNING] Condizione di Realtà della Circonferenza
> Affinché l'equazione rappresenti una circonferenza reale non degenere, il radicando deve essere strettamente positivo:
> $$ \bbox[6px,border:1px solid #ffff4d]{\left(-\frac{a}{2}\right)^2 + \left(-\frac{b}{2}\right)^2 - c > 0} $$
> * Se il radicando è $> 0 \implies$ Circonferenza reale di raggio $r > 0$.
> * Se il radicando è $= 0 \implies$ Circonferenza degenere ridotta a un singolo punto (il centro stesso, $r = 0$).
> * Se il radicando è $< 0 \implies$ Nessun punto reale soddisfa l'equazione (circonferenza immaginaria).

---

## 3. Circonferenza Centrata nell'Origine

Se il centro coincide con l'origine degli assi cartesiani $C(0, 0)$, i coefficienti $a$ e $b$ si annullano ($a = 0, b = 0$):
$$ \bbox[8px,border:2px solid #ffff4d]{x^2 + y^2 = r^2} $$

> [!EXAMPLE] Esempio Notevole: $x^2 + y^2 = 4$
> Circonferenza di centro $C(0, 0)$ e raggio $r = \sqrt{4} = 2$:
> ![[coniche_es2_circonferenza.png]]

---

## 4. Rette Tangenti e Posizioni Reciproche

Per determinare la posizione di una retta $s$ rispetto a una circonferenza $\gamma$, esistono **due metodi**:

### Metodo 1: Metodo Geometrico (Distanza Centro-Retta) — Più Veloce ed Elegante!
Si calcola la distanza $d(C, s)$ del Centro $C$ dalla retta $s: ax + by + c = 0$:
$$ d = \frac{|a x_C + b y_C + c|}{\sqrt{a^2 + b^2}} $$
* **Se $d < r \implies$ Retta Secante** (2 intersezioni).
* **Se $d = r \implies$ Retta Tangente** (1 punto di tangenza).
* **Se $d > r \implies$ Retta Esterna** (0 intersezioni).

### Metodo 2: Metodo Algebrico (Sistema e $\Delta = 0$)
Si imposta il sistema tra retta e circonferenza; dall'equazione risolvente di secondo grado:
* $\Delta > 0 \implies$ Secante
* $\Delta = 0 \implies$ Tangente
* $\Delta < 0 \implies$ Esterna
