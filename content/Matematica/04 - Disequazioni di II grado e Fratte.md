---
title: "04 - Disequazioni di II grado e Fratte"
tags:
  - matematica/algebra
  - tipologia/teoria
---
# Disequazioni di II Grado e Fratte
Una disequazione di secondo grado si presenta nella forma:
$$ a\color{#ffff4d}x^2 \color{white}+ b\color{#ffff4d}x \color{white}+ c > 0 \quad (\text{oppure } \ge, <, \le) $$

## 1. Risoluzione con Metodo della Parabola
> [!abstract] Passaggi Operativi
> 1.  **Trovare le soluzioni:** Risolvere l'equazione associata ($ax^2 + bx + c = 0$) trovando $x_1$ e $x_2$.
> 2.  **Disegnare:**
>     *   *(Trucco: Se $a < 0$, cambia tutti i segni e il verso della disequazione, così $a$ diventa positivo e la parabola sorride sempre $\cup$)*.
>     *   Disegna la parabola che taglia l'asse $X$ in $x_1$ e $x_2$.
> 3.  **Scegliere le zone:**
>     *   Se il segno è **$>$ o $\ge$**: cerchiamo dove la parabola sta <span style="color: #4dff4d">sopra l'asse X</span> (rami esterni).
>     *   Se il segno è **$<$ o $\le$**: cerchiamo dove la parabola sta <span style="color: #ff4d4d">sotto l'asse X</span> (pancia interna).

> [!example] Esempio 1: Valori Esterni ($> 0$)
> $$ \mathbf{x^2 - 4x > 0} $$
> Le soluzioni dell'associata sono $x_1 = 0$ e $x_2 = 4$.
> Il testo chiede $> 0$, quindi i <span style="color: #4dff4d">rami esterni</span>.
> **Soluzione:** $x < 0 \ \lor \ x > 4$
> ![[diseq_es1_esterni.png]]

> [!example] Esempio 2: Valori Interni ($\le 0$)
> Disequazione di partenza: $-x^2 + 3x + 4 \ge 0$
> 1. Cambiamo i segni (più facile): $\mathbf{x^2 - 3x - 4 \le 0}$
> 2. Le radici sono $x_1 = -1$ e $x_2 = 4$.
> 3. Ora abbiamo il segno $\le 0$, quindi prendiamo la <span style="color: #ff4d4d">pancia interna</span>.
> **Soluzione:** $-1 \le x \le 4$
> ![[diseq_es2_interni.png]]

> [!warning] Casi Particolari ($\Delta < 0$)
> Se $\Delta < 0$, la parabola non tocca MAI l'asse X e galleggia in alto (assumendo $a>0$).
> * Se chiede $>0$: sempre verificata ($\forall x \in \mathbb{R}$)
> * Se chiede $<0$: mai verificata ($\emptyset$)

---
## 2. Disequazioni Fratte
Si presentano come una frazione:
$$ \frac{N(x)}{D(x)} \ge 0 $$

> [!abstract] Studio del Segno
> 1.  Poni **SEMPRE** numeratore e denominatore **Maggiori di Zero**, ignorando il verso originale (solo il Numeratore può avere l'uguale $\ge$ se c'era nel testo).
>     *   $N(x) > 0$
>     *   $D(x) > 0$ (**mai uguale**)
> 2.  Risolvi separatamente e metti i risultati nello schema a linee.
> 3.  Linea continua $\rightarrow +$, linea tratteggiata $\rightarrow -$.
> 4.  Fai il prodotto dei segni colonna per colonna (meno per meno = più, ecc).
> 5.  Alla fine, **torna alla disequazione originale** per scegliere le zone finali col $+$ (se era $>0$) o col $-$ (se era $<0$).

> [!example] Esempio di Schema Grafico
> Supponiamo di aver trovato che $N(x) > 0$ per $x < x_1 \lor x > x_2$ e $D(x) > 0$ per $x > x_2$.
> La tabella diventerà:
> ![[diseq_es3_fratta.png]]
> In base al segno richiesto dall'esercizio, prenderai l'intervallo con il $+$ o con il $-$.
