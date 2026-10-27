---
title: "Relazioni Fondamentali e Formule Goniometriche"
description: "Prima e seconda relazione fondamentale, archi associati per la riduzione al primo quadrante, formule di addizione, sottrazione e duplicazione di seno e coseno."
tags:
  - matematica/goniometria
  - formule-goniometriche
  - duplicazione
  - archi-associati
---

# Relazioni Fondamentali e Formule Goniometriche

## 1. Le Due Relazioni Fondamentali della Goniometria

Applicando il Teorema di Pitagora al triangolo rettangolo avente per ipotenusa il raggio $r = 1$ e per cateti l'ascissa ($\cos\alpha$) e l'ordinata ($\sin\alpha$):

> [!ABSTRACT] Prima Relazione Fondamentale
> $$ \bbox[8px,border:2px solid #4df5ff]{\sin^2\alpha + \cos^2\alpha = 1} $$
> Formule inverse per ricavare una funzione nota l'altra (il segno $\pm$ dipende dal quadrante):
> * $\sin\alpha = \pm\sqrt{1 - \cos^2\alpha}$
> * $\cos\alpha = \pm\sqrt{1 - \sin^2\alpha}$

> [!ABSTRACT] Seconda Relazione Fondamentale
> Definisce la tangente e la cotangente:
> $$ \bbox[8px,border:2px solid #ffff4d]{\tan\alpha = \frac{\sin\alpha}{\cos\alpha} \quad \text{e} \quad \cot\alpha = \frac{\cos\alpha}{\sin\alpha} = \frac{1}{\tan\alpha}} $$

---

## 2. Gli Archi Associati (Riduzione al Primo Quadrante)

Gli **archi associati** consentono di ricondurre il valore delle funzioni goniometriche di qualsiasi angolo a quello del corrispondente angolo acuto $\alpha$ del primo quadrante:

| Relazione tra Angoli | Seno ($\sin$) | Coseno ($\cos$) | Tangente ($\tan$) |
| :--- | :--- | :--- | :--- |
| **Angoli Opposti ($-\alpha$)** | $\sin(-\alpha) = -\sin\alpha$ (dispari) | $\cos(-\alpha) = \cos\alpha$ (pari) | $\tan(-\alpha) = -\tan\alpha$ |
| **Supplementari ($\pi - \alpha$ o $180^\circ - \alpha$)** | $\sin(\pi - \alpha) = \sin\alpha$ | $\cos(\pi - \alpha) = -\cos\alpha$ | $\tan(\pi - \alpha) = -\tan\alpha$ |
| **Antisupplementari ($\pi + \alpha$ o $180^\circ + \alpha$)** | $\sin(\pi + \alpha) = -\sin\alpha$ | $\cos(\pi + \alpha) = -\cos\alpha$ | $\tan(\pi + \alpha) = \tan\alpha$ |
| **Complementari ($\frac{\pi}{2} - \alpha$ o $90^\circ - \alpha$)** | $\sin\left(\frac{\pi}{2} - \alpha\right) = \cos\alpha$ | $\cos\left(\frac{\pi}{2} - \alpha\right) = \sin\alpha$ | $\tan\left(\frac{\pi}{2} - \alpha\right) = \cot\alpha$ |

---

## 3. Formule di Addizione e Sottrazione

Permettono di calcolare le funzioni goniometriche della somma o differenza di due angoli $(\alpha \pm \beta)$:

> [!TIP] Formule di Addizione e Sottrazione
> * **Seno:**
>   $$ \bbox[6px,border:1px solid #4da6ff]{\sin(\alpha \pm \beta) = \sin\alpha\cos\beta \pm \cos\alpha\sin\beta} $$
> * **Coseno:**
>   $$ \bbox[6px,border:1px solid #ff4d4d]{\cos(\alpha \pm \beta) = \cos\alpha\cos\beta \mp \sin\alpha\sin\beta} $$
> * **Tangente:**
>   $$ \bbox[6px,border:1px solid #4dff4d]{\tan(\alpha \pm \beta) = \frac{\tan\alpha \pm \tan\beta}{1 \mp \tan\alpha\tan\beta}} $$

---

## 4. Formule di Duplicazione (Angolo Doppio $2\alpha$)

Ponendo $\beta = \alpha$ nelle formule di addizione:

> [!ABSTRACT] Formule di Duplicazione
> * **Seno dell'angolo doppio:**
>   $$ \bbox[8px,border:2px solid #4df5ff]{\sin(2\alpha) = 2\sin\alpha\cos\alpha} $$
> * **Coseno dell'angolo doppio (3 forme equivalenti):**
>   $$ \bbox[8px,border:2px solid #ffff4d]{\cos(2\alpha) = \cos^2\alpha - \sin^2\alpha = 1 - 2\sin^2\alpha = 2\cos^2\alpha - 1} $$
> * **Tangente dell'angolo doppio:**
>   $$ \tan(2\alpha) = \frac{2\tan\alpha}{1 - \tan^2\alpha} $$

> [!EXAMPLE] Esempio di Applicazione
> Calcolare $\cos(60^\circ)$ sapendo che $\cos(30^\circ) = \frac{\sqrt{3}}{2}$:
> $$ \cos(60^\circ) = \cos(2 \cdot 30^\circ) = 2\cos^2(30^\circ) - 1 = 2\left(\frac{\sqrt{3}}{2}\right)^2 - 1 = 2\left(\frac{3}{4}\right) - 1 = \frac{3}{2} - 1 = \mathbf{\frac{1}{2}} $$
