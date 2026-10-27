---
title: "Equazioni e Disequazioni Irrazionali"
description: "Condizioni di esistenza per radicali ad indice pari e dispari, schemi di equivalenza per equazioni e disequazioni irrazionali con segno minore e maggiore."
tags:
  - matematica/algebra
  - irrazionali
  - radicali
  - condizioni-di-esistenza
---

# Equazioni e Disequazioni Irrazionali

Un'equazione o disequazione si definisce **irrazionale** quando l'incognita $x$ è presente **sotto il segno di radice**.

---

## 1. Condizioni di Esistenza e Natura degli Indici

Il comportamento dei radicali dipende in modo fondamentale dalla parità dell'indice $n$:

> [!NOTE] Indice Dispari ($n = 3, 5, 7, \dots$)
> La radice con indice dispari $\sqrt[3]{A(x)}$ è definita per qualsiasi valore reale del radicando:
> $$ \mathbf{\text{C.E.: Nessuna limitazione}} \quad (\forall x \in \mathbb{R}) $$
> Inoltre conserva il segno dell'argomento ($\sqrt[3]{-8} = -2$). Per risolverle è sufficiente elevare ambo i membri alla potenza $n$.

> [!WARNING] Indice Pari ($n = 2, 4, 6, \dots$)
> La radice con indice pari $\sqrt{A(x)}$ richiede tassativamente:
> 1. **Condizione di Esistenza (Realtà del Radicando):**
>    $$ \bbox[6px,border:1px solid #ff4d4d]{A(x) \ge 0} $$
> 2. **Positività del Risultato:** Una radice ad indice pari è per convenzione **sempre positiva o nulla**:
>    $$ \sqrt{A(x)} \ge 0 $$

---

## 2. Equazioni Irrazionali: $\sqrt{A(x)} = B(x)$

Elevando entrambi i membri al quadrato si rischia di introdurre "soluzioni spurie" (ad esempio $-3 = 3$ è falso, ma al quadrato $(-3)^2 = 3^2$ diventa $9 = 9$ vero!).
Per garantire la perfetta equivalenza logica, si imposta un **sistema a tre condizioni**:

> [!ABSTRACT] Schema Risolutivo per l'Equazione
> $$ \bbox[8px,border:2px solid #4da6ff]{\sqrt{A(x)} = B(x) \iff \begin{cases} A(x) \ge 0 & \text{(C.E. del radicando)} \\ B(x) \ge 0 & \text{(Concordanza del segno)} \\ A(x) = [B(x)]^2 & \text{(Elevamento a potenza)} \end{cases}} $$
> *(Nota: Poiché $A(x) = [B(x)]^2$ garantisce già che $A(x) \ge 0$, in pratica la prima condizione è automaticamente assorbita dalla terza; basta verificare $B(x) \ge 0$!).*

> [!EXAMPLE] Esempio Svolto di Equazione
> Risolvere $\sqrt{2x + 6} = x + 1$:
> $$ \begin{cases} x + 1 \ge 0 \implies x \ge -1 \\ 2x + 6 = (x + 1)^2 \implies 2x + 6 = x^2 + 2x + 1 \end{cases} $$
> Dalla seconda equazione:
> $$ x^2 - 5 = 0 \implies x = \pm\sqrt{5} $$
> Confronto con la condizione $x \ge -1$:
> * $x = +\sqrt{5} \approx 2{,}23 \ge -1 \implies \mathbf{\text{Accettabile}}$
> * $x = -\sqrt{5} \approx -2{,}23 < -1 \implies \mathbf{\text{Non accettabile (scartata)}}$
> Soluzione: $\mathbf{x = \sqrt{5}}$.

---

## 3. Disequazioni Irrazionali con il Segno Minore ($<$)

Forma canonica: $\sqrt{A(x)} < B(x)$ (oppure $\le$).
Affinché una radice non negativa sia minore di $B(x)$, occorre che $B(x)$ sia strettamente positivo e che il radicando esista:

> [!TIP] Schema Unico ad Intersezione (3 Condizioni)
> $$ \bbox[8px,border:2px solid #4dff4d]{\sqrt{A(x)} < B(x) \iff \begin{cases} A(x) \ge 0 & \text{(C.E. della radice)} \\ B(x) > 0 & \text{(Deve essere positivo per essere maggiore)} \\ A(x) < [B(x)]^2 & \text{(Elevamento al quadrato)} \end{cases}} $$

---

## 4. Disequazioni Irrazionali con il Segno Maggiore ($>$)

Forma canonica: $\sqrt{A(x)} > B(x)$ (oppure $\ge$).
In questo caso, la disequazione può essere soddisfatta in due circostanze reciprocamente indipendenti:

> [!ABSTRACT] Schema ad Unione di Due Sistemi
> $$ \bbox[8px,border:2px solid #ff4d4d]{\sqrt{A(x)} > B(x) \iff \begin{cases} A(x) \ge 0 \\ B(x) < 0 \end{cases} \quad \mathbf{\bigcup} \quad \begin{cases} B(x) \ge 0 \\ A(x) > [B(x)]^2 \end{cases}} $$
> * **Primo Sistema:** Se $B(x)$ è negativo, la radice (essendo sempre $\ge 0$) sarà **automaticamente maggiore di un numero negativo**, a patto che esista ($A(x) \ge 0$).
> * **Secondo Sistema:** Se $B(x)$ è non negativo, entrambi i membri sono positivi e possiamo lecitamente elevare al quadrato.
> * **La soluzione finale è l'unione ($\cup$) delle soluzioni dei due sistemi.**
