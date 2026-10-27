---
title: "Disequazioni Fratte e Sistemi di Disequazioni"
description: "Metodologia rigorosa per lo studio del segno nelle frazioni algebriche e differenza concettuale tra prodotto di segni e intersezione nei sistemi di disequazioni."
tags:
  - matematica/algebra
  - disequazioni-fratte
  - studio-del-segno
  - sistemi-disequazioni
---

# Disequazioni Fratte e Sistemi di Disequazioni

## 1. Le Disequazioni Fratte

Una disequazione si definisce **fratta** (o frazionaria) quando l'incognita compare al denominatore:
$$ \frac{N(x)}{D(x)} \gtrless 0 $$

> [!WARNING] Errore Gravissimo da Evitare
> Nelle equazioni fratte si può eliminare il denominatore moltiplicando ambo i membri per il m.c.m. dopo aver posto le C.E.
> **Nelle disequazioni fratte è VIETATO eliminare il denominatore**, poiché non se ne conosce il segno! Se il denominatore fosse negativo, moltiplicare per esso capovolgerebbe il verso della disequazione. L'unico metodo valido è lo **Studio del Segno**.

---

### La Procedura Standard dello Studio del Segno

> [!ABSTRACT] I 4 Passaggi Risolutivi
> 1. **Portare tutto a primo membro e fare il m.c.m.:** Ridurre l'espressione a un'unica frazione algebrica confrontata con lo zero ($\frac{N(x)}{D(x)} \ge 0$).
> 2. **Porre SEMPRE numeratore e denominatore MAGGIORI di zero:**
>    * $\bbox[6px,border:1px solid #4da6ff]{N(x) > 0}$ (oppure $\ge 0$ se presente l'uguale nella traccia)
>    * $\bbox[6px,border:1px solid #ff4d4d]{D(x) > 0}$ (**RIGOROSAMENTE STRETTO**, il denominatore non può MAI valere zero per le C.E.!)
> 3. **Costruire la Tabella dei Segni (Castelletto):**
>    * Riportare su un asse orientato tutti i valori critici in ordine crescente.
>    * Tracciare una riga per $N(x)$ e una per $D(x)$: linea continua (segno $+$) dove la condizione è verificata, linea tratteggiata (segno $-$) dove non lo è.
>    * Indicare i pallini: **pieno $\bullet$** per gli zeri del numeratore inclusi, **vuoto $\circ$** per gli zeri del denominatore (sempre esclusi!).
> 4. **Determinare il Segno Finale:**
>    Applicare la regola dei segni colonna per colonna:
>    * $(+) \cdot (+) = +$
>    * $(+) \cdot (-) = -$
>    * $(-) \cdot (-) = +$
>    Guardare la traccia iniziale: se chiedeva $> 0$ scegliere gli intervalli col $+$, se chiedeva $< 0$ scegliere gli intervalli col $-$.

> [!EXAMPLE] Visualizzazione Grafica dello Studio del Segno
> ![[diseq_es3_fratta.png]]

---

> [!EXAMPLE] Esercizio Svolto Completo
> Risolvere:
> $$ \frac{x^2 - 4}{x - 3} \le 0 $$
> 1. **Numeratore $\ge 0$:**
>    $$ x^2 - 4 \ge 0 \implies x \le -2 \quad \lor \quad x \ge 2 $$
> 2. **Denominatore $> 0$:**
>    $$ x - 3 > 0 \implies x > 3 $$
> 3. **Tabella dei Segni:**
>    Valori critici: $-2$, $2$, $3$.
>    * Per $x < -2$: $N$ è $+$, $D$ è $-$ $\implies$ Segno totale: $\mathbf{-}$
>    * Per $-2 \le x \le 2$: $N$ è $-$, $D$ è $-$ $\implies$ Segno totale: $\mathbf{+}$
>    * Per $2 \le x < 3$: $N$ è $+$, $D$ è $-$ $\implies$ Segno totale: $\mathbf{-}$
>    * Per $x > 3$: $N$ è $+$, $D$ è $+$ $\implies$ Segno totale: $\mathbf{+}$
> 4. **Selezione intervalli:** La traccia chiede $\le 0$ (zone con il $-$):
>    $$ \bbox[8px,border:2px solid #4dff4d]{\mathbf{x \le -2 \quad \lor \quad 2 \le x < 3}} $$

---

## 2. Sistemi di Disequazioni

Un **sistema di disequazioni** è un insieme di due o più disequazioni nella stessa incognita che devono essere **verificate contemporaneamente**:
$$ \begin{cases} D_1(x) \\ D_2(x) \end{cases} $$

> [!NOTE] Differenza Cruciale: Studio del Segno vs Sistema
> * **Nello Studio del Segno (Frazioni e Prodotti):** Si cerca il **prodotto dei segni** (più per meno fa meno).
> * **Nel Sistema di Disequazioni:** Si cerca l'**intersezione degli insiemi delle soluzioni** (si prendono SOLO le zone in cui **TUTTE le linee sono continue contemporaneamente**). NON si moltiplicano mai i segni!

> [!EXAMPLE] Esempio di Sistema
> Risolvere:
> $$ \begin{cases} x^2 - 5x + 6 > 0 \\ 2x - 1 \ge 3 \end{cases} $$
> * **Prima disequazione:** $x^2 - 5x + 6 = 0 \implies (x-2)(x-3) = 0 \implies x < 2 \lor x > 3$.
> * **Seconda disequazione:** $2x \ge 4 \implies x \ge 2$.
> * **Intersezione grafica:**
>   * Tra $-\infty$ e $2$: solo la prima è verificata (no).
>   * In $x = 2$: la seconda vale, la prima no (no).
>   * Tra $2$ e $3$: solo la seconda è verificata (no).
>   * Per $x > 3$: **entrambe sono contemporaneamente verificate!**
> 
> **Soluzione finale del sistema:**
> $$ \bbox[8px,border:2px solid #4da6ff]{\mathbf{x > 3}} $$
