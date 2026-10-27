---
title: "Trigonometria dei Triangoli Rettangoli e Qualunque"
description: "Teoremi sui triangoli rettangoli, Teorema dei Seni (Eulero), Teorema del Coseno (Carnot) per triangoli qualsiasi e calcolo trigonometrico dell'area."
tags:
  - matematica/trigonometria
  - triangoli-rettangoli
  - teorema-dei-seni
  - carnot
---

# Trigonometria dei Triangoli Rettangoli e Qualunque

La **trigonometria** applica le funzioni goniometriche alla risoluzione dei triangoli, ovvero al calcolo delle misure di tutti i lati e gli angoli incogniti a partire da un numero sufficiente di dati noti.

---

## 1. Risoluzione dei Triangoli Rettangoli

Sia dato un triangolo rettangolo in $A$ ($\alpha = 90^\circ$), con:
* Ipotenusa $a$
* Cateti $b$ e $c$
* Angoli acuti $\beta$ (opposto a $b$) e $\gamma$ (opposto a $c$), con $\beta + \gamma = 90^\circ$.

> [!ABSTRACT] Teoremi Fondamentali sui Triangoli Rettangoli
> 1. **Primo Teorema (Cateto e Ipotenusa):**
>    In un triangolo rettangolo, la misura di un cateto è uguale al prodotto dell'ipotenusa per il **seno dell'angolo opposto**, oppure per il **coseno dell'angolo adiacente**:
>    $$ \bbox[6px,border:1px solid #4da6ff]{b = a \cdot \sin\beta = a \cdot \cos\gamma} $$
>    $$ \bbox[6px,border:1px solid #4da6ff]{c = a \cdot \sin\gamma = a \cdot \cos\beta} $$
> 2. **Secondo Teorema (Cateto e Cateto):**
>    La misura di un cateto è uguale al prodotto dell'altro cateto per la **tangente dell'angolo opposto al primo**:
>    $$ \bbox[6px,border:1px solid #4dff4d]{b = c \cdot \tan\beta \quad \text{e} \quad c = b \cdot \tan\gamma} $$

---

## 2. Risoluzione dei Triangoli Qualunque

Nei triangoli scaleni o generici non è possibile applicare direttamente il Teorema di Pitagora. Si utilizzano due teoremi universali:

### A. Il Teorema dei Seni (o di Eulero)
In qualunque triangolo, il rapporto tra la misura di un lato e il seno dell'angolo opposto è costante, ed è uguale al diametro ($2R$) della circonferenza circoscritta:

> [!TIP] Teorema dei Seni
> $$ \bbox[8px,border:2px solid #ffff4d]{\frac{a}{\sin\alpha} = \frac{b}{\sin\beta} = \frac{c}{\sin\gamma} = 2R} $$
> **Quando si usa:**
> * Quando sono noti **due angoli e un lato** (AAL o ALA).
> * Quando sono noti **due lati e un angolo opposto** a uno di essi (LLA).

---

### B. Il Teorema del Coseno (o di Carnot)
È la generalizzazione del Teorema di Pitagora a tutti i triangoli (se l'angolo è $90^\circ$, $\cos 90^\circ = 0$ e si riottiene Pitagora!).
Il quadrato di un lato è uguale alla somma dei quadrati degli altri due lati diminuita del loro doppio prodotto per il coseno dell'angolo compreso:

> [!TIP] Teorema del Coseno (Carnot)
> $$ \bbox[8px,border:2px solid #ff4d4d]{\begin{cases} a^2 = b^2 + c^2 - 2bc \cdot \cos\alpha \\ b^2 = a^2 + c^2 - 2ac \cdot \cos\beta \\ c^2 = a^2 + b^2 - 2ab \cdot \cos\gamma \end{cases}} $$
> **Quando si usa:**
> * Quando sono noti **due lati e l'angolo compreso tra essi** (LAL).
> * Quando sono noti **tutti e tre i lati** (LLL), per ricavare direttamente i coseni degli angoli:
>   $$ \cos\alpha = \frac{b^2 + c^2 - a^2}{2bc} $$

---

## 3. Calcolo dell'Area del Triangolo

L'area di un triangolo qualunque è uguale al semi-prodotto di due suoi lati per il seno dell'angolo compreso tra essi:
$$ \bbox[8px,border:2px solid #d24dff]{\text{Area} = \frac{1}{2} a b \cdot \sin\gamma = \frac{1}{2} b c \cdot \sin\alpha = \frac{1}{2} a c \cdot \sin\beta} $$
*(Evita di dover calcolare esplicitamente l'altezza del triangolo!).*
