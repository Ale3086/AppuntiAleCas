# Algebra Avanzata e Irrazionali

Oltre alle disequazioni standard (II grado e fratte), il programma prevede la risoluzione di equazioni/disequazioni di grado superiore e quelle con valori assoluti o radici (irrazionali).

## 1. Grado Superiore al Secondo (Ruffini)

Se ci troviamo di fronte a polinomi di $3^\circ, 4^\circ$ grado ecc. ($ax^3 + bx^2 + cx + d = 0$), non c'è la "formula magica" come il $\Delta$. Dobbiamo **scomporre in fattori**.

> [!abstract] Metodi di Scomposizione
> 1. **Raccoglimento a fattore comune:** Se tutti i termini hanno la $x$, raccogli!
>    Es: $x^3 - 4x = 0 \implies x(x^2 - 4) = 0 \implies x(x-2)(x+2) = 0$.
> 2. **Regola di Ruffini:** Se non si può raccogliere, bisogna trovare uno "zero" del polinomio (un numero che sostituito alla $x$ dia $0$ come risultato). Si provano i divisori del termine noto. Trovato lo zero, si costruisce la tabella di Ruffini per abbassare il grado del polinomio!

---

## 2. Valori Assoluti (Modulo)

L'equazione o disequazione contiene l'incognita all'interno di un modulo: $|f(x)|$.

> [!info] Definizione di Valore Assoluto
> Il valore assoluto "forza" un'espressione a essere positiva.
> $$ |A| = \begin{cases} A & \text{se } A \ge 0 \\ -A & \text{se } A < 0 \end{cases} $$

> [!tip] Regole Pratiche per Disequazioni
> Se abbiamo un numero positivo $k > 0$:
> *   $|f(x)| < k \implies -k < f(x) < k$ (Sistema di due disequazioni, soluzioni interne)
> *   $|f(x)| > k \implies f(x) < -k \ \lor \ f(x) > k$ (Unione, soluzioni esterne)

---

## 3. Equazioni e Disequazioni Irrazionali

Un'equazione è irrazionale quando l'incognita si trova **sotto una radice**.

> [!warning] La Condizione di Esistenza (C.E.)
> Se l'indice della radice è **pari** (es. radice quadrata $\sqrt{\dots}$), il suo argomento **deve essere $\ge 0$**.
> Inoltre, il risultato di una radice pari, se esiste, è sempre positivo.

> [!abstract] Equazioni Irrazionali: $\sqrt{A(x)} = B(x)$
> Per risolverla eleviamo tutto al quadrato, ma dobbiamo garantire che abbia senso farlo. Bisogna impostare un sistema:
> $$
> \begin{cases}
> A(x) \ge 0 \quad \text{(Condizione di esistenza della radice)} \\
> B(x) \ge 0 \quad \text{(Una radice pari non può eguagliare un numero negativo!)} \\
> A(x) = [B(x)]^2 \quad \text{(Elevamento a potenza per risolvere)}
> \end{cases}
> $$

> [!tip] Disequazioni Irrazionali con segno $<$ 
> Forma: $\sqrt{A(x)} < B(x)$
> Il sistema diventa:
> $$
> \begin{cases}
> A(x) \ge 0 \\
> B(x) > 0 \\
> A(x) < [B(x)]^2
> \end{cases}
> $$

> [!tip] Disequazioni Irrazionali con segno $>$
> Forma: $\sqrt{A(x)} > B(x)$
> In questo caso ci sono **due** scenari validi (Unione di due sistemi):
> 1. Il termine fuori $B(x)$ è negativo. La radice sarà ovviamente maggiore!
> $$
> \begin{cases}
> A(x) \ge 0 \\
> B(x) < 0
> \end{cases}
> $$
> $\cup$ (unito a)
> 2. Il termine fuori $B(x)$ è positivo, allora elevo al quadrato:
> $$
> \begin{cases}
> B(x) \ge 0 \\
> A(x) > [B(x)]^2
> \end{cases}
> $$
