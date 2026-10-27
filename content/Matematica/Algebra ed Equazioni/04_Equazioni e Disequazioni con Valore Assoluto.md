---
title: "Equazioni e Disequazioni con Valore Assoluto"
description: "Definizione rigorosa del modulo, regole rapide per modulo e costante positiva, studio del segno dell'argomento e metodo degli intervalli per moduli multipli."
tags:
  - matematica/algebra
  - valore-assoluto
  - modulo
  - equazioni-disequazioni
---

# Equazioni e Disequazioni con Valore Assoluto

Il **valore assoluto** (o modulo) di un'espressione algebrica $A(x)$ ne quantifica l'entità numerica a prescindere dal segno algebrico, "forzando" il risultato a essere non negativo.

---

## 1. Definizione Analitica di Modulo

> [!ABSTRACT] Definizione per Casi
> $$ \bbox[8px,border:2px solid #ffff4d]{|A(x)| = \begin{cases} A(x) & \text{se } A(x) \ge 0 \\ -A(x) & \text{se } A(x) < 0 \end{cases}} $$
> * Proprietà fondamentale: $|A(x)| \ge 0$ sempre, per qualsiasi valore di $x$.
> * $|A(x)| = 0 \iff A(x) = 0$.

---

## 2. Casi Notevoli Immediati (Modulo e Costante $k > 0$)

Quando l'espressione con modulo è confrontata con una semplice costante numerica positiva $k > 0$, **non serve impostare tabelle lunghe**: esistono tre scorciatoie algebriche immediate.

| Tipologia | Struttura | Risoluzione Immediata | Spiegazione Concettuale |
| :--- | :--- | :--- | :--- |
| **Equazione** | $|f(x)| = k$ | $\bbox[6px,border:1px solid #4da6ff]{f(x) = \pm k}$ | La distanza dall'origine è esattamente $k$. |
| **Disequazione col $<$** | $|f(x)| < k$ | $\bbox[6px,border:1px solid #4dff4d]{-k < f(x) < k}$ | La distanza dall'origine è inferiore a $k$ (intervallo interno). |
| **Disequazione col $>$** | $|f(x)| > k$ | $\bbox[6px,border:1px solid #ff4d4d]{f(x) < -k \;\lor\; f(x) > k}$ | La distanza dall'origine è superiore a $k$ (intervalli esterni). |

> [!WARNING] Casi con Costante Negativa ($k < 0$) o Nulla ($k = 0$)
> Poiché $|f(x)| \ge 0$ sempre:
> * $|f(x)| = -5 \implies \mathbf{\emptyset}$ (impossibile, una quantità non negativa non può eguagliare un numero negativo!).
> * $|f(x)| < -2 \implies \mathbf{\emptyset}$ (mai verificata).
> * $|f(x)| > -3 \implies \mathbf{\forall x \in \text{D}}$ (sempre verificata nel dominio).
> * $|f(x)| \le 0 \implies \mathbf{f(x) = 0}$ (unica possibilità).

> [!EXAMPLE] Esempi con Regole Immediate
> 1. $|2x - 3| = 7 \implies 2x - 3 = 7 \lor 2x - 3 = -7 \implies 2x = 10 \lor 2x = -4 \implies \mathbf{x = 5 \lor x = -2}$.
> 2. $|3x - 1| \le 5 \implies -5 \le 3x - 1 \le 5 \implies -4 \le 3x \le 6 \implies \mathbf{-\frac{4}{3} \le x \le 2}$.
> 3. $|x + 4| > 2 \implies x + 4 < -2 \lor x + 4 > 2 \implies \mathbf{x < -6 \lor x > -2}$.

---

## 3. Metodo Generale: Studio del Segno dell'Argomento

Quando a secondo membro compare l'incognita $x$ (es. $|A(x)| = B(x)$ oppure $|A(x)| \gtrless B(x)$), si sdoppia l'analisi nei due casi previsti dalla definizione, unendo i risultati di due sistemi distinti:

### Equazioni del tipo $|A(x)| = B(x)$
$$ \begin{cases} A(x) \ge 0 \\ A(x) = B(x) \end{cases} \quad \cup \quad \begin{cases} A(x) < 0 \\ -A(x) = B(x) \end{cases} $$

### Disequazioni del tipo $|A(x)| < B(x)$
Equivale a soddisfare contemporaneamente:
$$ \begin{cases} A(x) < B(x) \\ A(x) > -B(x) \end{cases} \iff -B(x) < A(x) < B(x) $$

### Disequazioni del tipo $|A(x)| > B(x)$
Equivale all'unione:
$$ A(x) < -B(x) \quad \lor \quad A(x) > B(x) $$

---

## 4. Presenza di Più Valori Assoluti: Metodo degli Intervalli

Se l'equazione o disequazione contiene **due o più moduli non isolabili** (es. $|x - 1| + |2x + 4| = 5$):
1. Si studia separatamente il segno di ciascun argomento ($x - 1 \ge 0 \implies x \ge 1$; $2x + 4 \ge 0 \implies x \ge -2$).
2. Si traccia una tabella dei segni che suddivide la retta reale in sotto-intervalli (nell'esempio: $x < -2$, $-2 \le x < 1$, $x \ge 1$).
3. In ogni intervallo si sciolgono i moduli sostituendoli con $+A(x)$ (se l'argomento è positivo) o con $-A(x)$ (se negativo).
4. Si risolve l'equazione/disequazione in ciascun intervallo e si verifica se le soluzioni trovate appartengono a quell'intervallo.
5. La soluzione complessiva è l'unione di tutte le soluzioni parziali accettabili.
