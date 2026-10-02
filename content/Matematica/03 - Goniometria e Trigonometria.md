---
title: "03 - Goniometria e Trigonometria"
tags:
  - matematica/trigonometria
  - tipologia/teoria
---
# Goniometria e Trigonometria

## 1. Misura degli Angoli: Gradi e Radianti
Solitamente misuriamo gli angoli in **Gradi**, ma in matematica avanzata è fondamentale il **Radiante**.

> [!info] Cos'è il Radiante?
> Un radiante è l'angolo al centro che sottende un arco di circonferenza ($l$) avente lunghezza uguale al raggio ($r$).
> $$ \alpha = \frac{l}{r} $$
> Poiché l'intera circonferenza misura $2\pi r$, l'angolo giro misura **$2\pi$ radianti**.

> [!tip] Equivalenze Importanti
> La regola base per passare da gradi a radianti e viceversa è: **$180^\circ = \pi$**
> *   $360^\circ = 2\pi$
> *   $180^\circ = \pi$
> *   $90^\circ = \frac{\pi}{2}$
> *   $60^\circ = \frac{\pi}{3}$
> *   $45^\circ = \frac{\pi}{4}$
> *   $30^\circ = \frac{\pi}{6}$

> [!example] Conversione (Sistema Sessagesimale)
> Spesso l'angolo ha la virgola (es. $35,126^\circ$). Va convertito in **Gradi, Primi e Secondi**:
> *   $1^\circ = 60'$ (primi) e $1' = 60''$ (secondi).
>
> Trasformiamo **$35,126^\circ$**:
> 1. Gradi interi = **$35^\circ$**
> 2. Parte decimale $0,126 \times 60 = 7,56'$ (Quindi **$7'$** interi)
> 3. Parte decimale $0,56 \times 60 \approx 33,6''$ (Arrotondato a **$33''$**)
> Risultato: **$35^\circ \ 7' \ 33''$**

---
## 2. La Circonferenza Goniometrica
> [!info] Definizione
> La circonferenza goniometrica ha:
> *   Centro nell'origine: $O(0,0)$
> *   Raggio unitario: $r = 1$
> *   Equazione: $x^2 + y^2 = 1$
>
> *Senso antiorario = Angoli Positivi.*

Dato un punto $P$ individuato da un angolo $\alpha$, le funzioni base sono le sue coordinate:
*   <span style="color: #4da6ff">**Coseno ($\cos \alpha$):**</span> l'ascissa ($x$)
*   <span style="color: #ff4d4d">**Seno ($\sin \alpha$):**</span> l'ordinata ($y$)
*   <span style="color: #4dff4d">**Tangente ($\tan \alpha$):**</span> il segmento esterno $\frac{\sin \alpha}{\cos \alpha}$

> [!example] Visualizzazione delle Funzioni (Angolo 30°)
> ![[gonio_es1_circonferenza.png]]

> [!abstract] Tabella Angoli Notevoli
>
> | Gradi | Radianti | <span style="color: #ff4d4d">Seno</span> | <span style="color: #4da6ff">Coseno</span> | <span style="color: #4dff4d">Tangente</span> |
> | :---: | :---: | :---: | :---: | :---: |
> | $0^\circ \text{ / } 360^\circ$ | $0 \text{ / } 2\pi$ | $0$ | $1$ | $0$ |
> | $30^\circ$ | $\frac{\pi}{6}$ | $\frac{1}{2}$ | $\frac{\sqrt{3}}{2}$ | $\frac{\sqrt{3}}{3}$ |
> | $45^\circ$ | $\frac{\pi}{4}$ | $\frac{\sqrt{2}}{2}$ | $\frac{\sqrt{2}}{2}$ | $1$ |
> | $60^\circ$ | $\frac{\pi}{3}$ | $\frac{\sqrt{3}}{2}$ | $\frac{1}{2}$ | $\sqrt{3}$ |
> | $90^\circ$ | $\frac{\pi}{2}$ | $1$ | $0$ | $\nexists$ |
> | $180^\circ$ | $\pi$ | $0$ | $-1$ | $0$ |
> | $270^\circ$ | $\frac{3\pi}{2}$ | $-1$ | $0$ | $\nexists$ |

---
## 3. Risoluzione dei Triangoli
> [!tip] Triangoli Rettangoli
> Si usa la trigonometria di base insieme al Teorema di Pitagora:
> *   $\text{Cateto} = \text{Ipotenusa} \cdot \color{#ff4d4d}\sin(\text{angolo opposto})$
> *   $\text{Cateto} = \text{Ipotenusa} \cdot \color{#4da6ff}\cos(\text{angolo adiacente})$
> *   $\text{Cateto}_1 = \text{Cateto}_2 \cdot \color{#4dff4d}\tan(\text{angolo opposto a } Cat_1)$

> [!tip] Triangoli Qualunque (Carnot e Seni)
> Nei triangoli scaleni/qualsiasi, si usano questi due potenti teoremi.
>
> **Teorema dei Seni:** Il rapporto lato/seno è costante.
> $$ \frac{a}{\sin \alpha} = \frac{b}{\sin \beta} = \frac{c}{\sin \gamma} $$
>
> **Teorema del Coseno (Carnot):** Il Pitagora generalizzato.
> $$ a^2 = b^2 + c^2 - 2bc \cdot \color{#4da6ff}\cos \alpha $$

---
## 4. Goniometria Avanzata

### La Cotangente e le Relazioni Fondamentali
Oltre a seno, coseno e tangente, definiamo la **Cotangente** ($\cot \alpha$):
$$ \cot \alpha = \frac{\cos \alpha}{\sin \alpha} = \frac{1}{\tan \alpha} $$

> [!tip] Le Due Relazioni Fondamentali
> 1.  **Prima Relazione:** Lega seno e coseno tramite il Teorema di Pitagora applicato alla circonferenza goniometrica.
>     $$ \sin^2 \alpha + \cos^2 \alpha = 1 $$
> 2.  **Seconda Relazione:** Definisce la tangente.
>     $$ \tan \alpha = \frac{\sin \alpha}{\cos \alpha} $$

### Archi Associati
Gli archi associati permettono di ricondurre funzioni di angoli in altri quadranti al primo quadrante.
Es. Angoli supplementari ($\pi - \alpha$):
*   $\sin(\pi - \alpha) = \sin \alpha$
*   $\cos(\pi - \alpha) = -\cos \alpha$

### Formule di Addizione e Duplicazione
Queste formule sono essenziali per risolvere espressioni con più angoli o angoli doppi.
> [!abstract] Formule Principali
> **Addizione/Sottrazione:**
> $$ \sin(\alpha \pm \beta) = \sin\alpha \cos\beta \pm \cos\alpha \sin\beta $$
> $$ \cos(\alpha \pm \beta) = \cos\alpha \cos\beta \mp \sin\alpha \sin\beta $$
>
> **Duplicazione (per l'angolo doppio $2\alpha$):**
> $$ \sin(2\alpha) = 2\sin\alpha \cos\alpha $$
> $$ \cos(2\alpha) = \cos^2\alpha - \sin^2\alpha = 1 - 2\sin^2\alpha = 2\cos^2\alpha - 1 $$

---
## 5. Equazioni e Disequazioni Goniometriche
> [!info] Equazioni Elementari
> Si presentano nella forma $\sin x = k$, $\cos x = k$ oppure $\tan x = k$.
> Si risolvono usando la circonferenza goniometrica, trovando i **due punti** sulla circonferenza che hanno quell'ordinata, ascissa o tangente.
> Infine si aggiunge il periodo: $+2k\pi$ (per seno e coseno) o $+k\pi$ (per tangente).

> [!example] Risoluzione Equazione Elementare
> Esempio: $\sin x = \frac{1}{2}$
> Sulla circonferenza l'ordinata è $1/2$ a $30^\circ$ ($\pi/6$) e a $150^\circ$ ($5\pi/6$).
> **Soluzione:** $x = \frac{\pi}{6} + 2k\pi \quad \lor \quad x = \frac{5\pi}{6} + 2k\pi$
> ![[gonio_es2_equazione.png]]

> [!tip] Equazioni Lineari in seno e coseno ($a\sin x + b\cos x + c = 0$)
> Si possono risolvere in più modi:
> 1. **Metodo Grafico:** Si pone $X = \cos x, Y = \sin x$, trasformando l'equazione in una retta ($aY + bX + c = 0$) da intersecare con la circonferenza goniometrica ($X^2 + Y^2 = 1$).
> 2. **Metodo dell'Angolo Aggiunto:** Raccogliendo $\sqrt{a^2+b^2}$.

> [!tip] Equazioni Omogenee di 2° grado ($a\sin^2 x + b\sin x \cos x + c\cos^2 x = 0$)
> Se $c=0$, si raccoglie $\sin x$ o $\cos x$.
> Se il termine noto c'è e non si semplifica diversamente, basta **dividere tutta l'equazione per $\cos^2 x$** (se $\cos x \neq 0$). Questo trasformerà l'equazione in un'equazione di 2° grado nella sola incognita $\tan x$, risolvibile con la formula del $\Delta$!
