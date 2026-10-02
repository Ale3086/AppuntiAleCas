---
title: "CSS - Fogli di Stile a Cascata"
tags:
  - informatica/css/guida-completa
  - tipologia/guida-pratica
---

## Indice

- [[#Cos'è il CSS e Sintassi delle Regole]]
- [[#Come Includere il CSS in HTML]]
- [[#I Selettori CSS]]
- [[#La Cascata e la Specificità]]
- [[#Il Box Model]]
- [[#Colori, Tipografia e Unità di Misura]]
- [[#La Proprietà display]]
- [[#Posizionamento (position)]]
- [[#Layout Moderno con Flexbox]]
- [[#Layout Moderno con CSS Grid]]
- [[#Responsive Design e Media Queries]]
- [[#Esempi Pratici di Componenti UI]]

---

## Cos'è il CSS e Sintassi delle Regole

Il **CSS** (*Cascading Style Sheets* - Fogli di Stile a Cascata) è il linguaggio utilizzato per descrivere la presentazione, il layout e l'aspetto grafico dei documenti scritti in HTML.  
Mentre l'HTML definisce la **struttura logica e semantica** (i contenuti), il CSS ne definisce l'**estetica visiva**.

Una regola CSS è composta da tre elementi:
1. **Selettore**: indica quale elemento HTML vogliamo stilizzare.
2. **Proprietà**: la caratteristica che vogliamo modificare (es. `color`, `font-size`, `margin`).
3. **Valore**: l'impostazione che assegniamo a quella proprietà.

```css
/* Sintassi di base */
selettore {
    proprieta: valore;
    altra-proprieta: valore;
}

/* Esempio reale */
h1 {
    color: #2c3e50;
    font-size: 2.5rem;
    text-align: center;
}
```

---

## Come Includere il CSS in HTML

Esistono tre metodi per applicare stili CSS a una pagina:

### 1. File Esterno (`<link>`) — Metodo Consigliato (Best Practice)
Il foglio di stile è contenuto in un file `.css` separato, collegato nell'intestazione `<head>`:

```html
<head>
    <link rel="stylesheet" href="style.css">
</head>
```
- ✅ **Vantaggi**: separa nettamente contenuto e presentazione, viene memorizzato nella cache del browser velocizzando il caricamento di più pagine, facile da mantenere.

### 2. Foglio di Stile Interno (`<style>`)
Dichiarato direttamente all'interno dell'`<head>`:

```html
<head>
    <style>
        body {
            background-color: #f8f9fa;
        }
    </style>
</head>
```

### 3. Stile Inline (Attributo `style`) — Da Evitare
Applicato direttamente al singolo tag HTML:

```html
<p style="color: red; font-weight: bold;">Testo urgente</p>
```
- ❌ **Svantaggi**: rende il codice HTML disordinato, non riutilizzabile e difficile da manutenere.

---

## I Selettori CSS

I selettori determinano a quali elementi della pagina applicare le regole di stile.

### 1. Selettori di Base
- **Selettore di Tipo (o Tag)**: colpisce tutti i tag specificati.
  ```css
  p { line-height: 1.6; }
  ```
- **Selettore di Classe (`.`)**: colpisce tutti gli elementi con quell'attributo `class`. Riutilizzabile più volte nella stessa pagina!
  ```css
  .evidenziato { background-color: #ffeaa7; }
  ```
- **Selettore di ID (`#`)**: colpisce l'unico elemento con quell'attributo `id`. Deve essere univoco per pagina!
  ```css
  #navigazione-principale { background-color: #333; }
  ```
- **Selettore Universale (`*`)**: seleziona indistintamente ogni elemento del documento.
  ```css
  * { margin: 0; padding: 0; box-sizing: border-box; }
  ```

### 2. Combinatori
- **Discendente (Spazio)**: seleziona qualsiasi `p` che si trova all'interno di un `article` (anche annidato in profondità).
  ```css
  article p { color: #555; }
  ```
- **Figlio Diretto (`>`)**: seleziona solo i figli immediati di primo livello.
  ```css
  ul > li { list-style: square; }
  ```
- **Fratello Adiacente (`+`)**: seleziona il primo elemento immediatamente successivo allo stesso livello gerarchico.
  ```css
  h2 + p { font-size: 1.2rem; }
  ```

### 3. Pseudo-Classi e Pseudo-Elementi
Permettono di applicare stili in base allo stato dell'elemento o a parti specifiche:

```css
/* Al passaggio del cursore del mouse */
a:hover {
    color: #e74c3c;
    text-decoration: underline;
}

/* Quando un campo input riceve il focus di digitazione */
input:focus {
    border-color: #3498db;
    outline: none;
}

/* Seleziona elementi alternati in una lista o tabella */
tr:nth-child(even) {
    background-color: #f2f2f2;
}

/* Inserisce contenuto visivo prima o dopo l'elemento */
.icona-spunta::before {
    content: "✔ ";
    color: green;
}
```

---

## La Cascata e la Specificità

Quando più regole si applicano allo stesso elemento, il browser decide quale stile applicare attraverso il principio della **Specificità** (*peso della regola*).

La gerarchia di importanza è:
1. **Stile Inline** (`style="..."`) — Peso altissimo (1000)
2. **Selettore di ID** (`#mio-id`) — Peso alto (100)
3. **Selettore di Classe, Attributo, Pseudo-classe** (`.btn`, `[type="text"]`, `:hover`) — Peso medio (10)
4. **Selettore di Elemento o Pseudo-elemento** (`p`, `h1`, `::before`) — Peso base (1)

Se due regole hanno esattamente lo stesso peso di specificità, **vince l'ultima regola scritta nel codice** (principio di cascata temporale).

> [!WARNING]
> La direttiva `!important` sovrascrive qualsiasi altra regola di specificità.  
> Usala solo in casi estremi (es. per sovrascrivere fogli di stile di terze parti), perché rende la manutenzione del codice un incubo.

---

## Il Box Model

Nel rendering del browser **ogni singolo elemento HTML è una scatola rettangolare**.  
Il **Box Model** descrive gli strati concentrici che compongono ogni elemento:

```
┌────────────────────────────────────────┐
│               MARGIN                   │ (Spazio esterno trasparente)
│   ┌────────────────────────────────┐   │
│   │           BORDER               │   │ (Bordo visibile)
│   │   ┌────────────────────────┐   │   │
│   │   │       PADDING          │   │   │ (Spazio interno tra bordo e testo)
│   │   │   ┌────────────────┐   │   │   │
│   │   │   │    CONTENT     │   │   │   │ (Testo, immagini o figli)
│   │   │   └────────────────┘   │   │   │
│   │   └────────────────────────┘   │   │
│   └────────────────────────────────┘   │
└────────────────────────────────────────┘
```

1. **Content**: l'area dove risiedono il testo o le immagini (`width` e `height`).
2. **Padding**: spazio interno di respiro tra il contenuto e il bordo.
3. **Border**: il contorno che racchiude l'elemento (`border: 2px solid #ccc;`).
4. **Margin**: spazio esterno vuoto che separa questo elemento dagli elementi circostanti.

### La Regola Salvavita: `box-sizing: border-box`
Di default (`content-box`), se imposti `width: 200px` e poi aggiungi `padding: 20px`, la larghezza finale visibile della scatola diventerà $200 + 20 + 20 = 240\text{px}$, rompendo spesso l'impaginazione!

Impostando `box-sizing: border-box`, la larghezza dichiarata **includerà automaticamente padding e bordo**:

```css
*, *::before, *::after {
    box-sizing: border-box; /* Regola fondamentale consigliata in tutti i progetti moderni */
}
```

---

## Colori, Tipografia e Unità di Misura

### Unità di Misura
- **Assolute**: `px` (pixel fisici, statici).
- **Relative (Consigliate per l'accessibilità)**:
  - `rem`: proporzionale alla dimensione del font della radice `<html>` (di default `1rem = 16px`). Adatta la pagina se l'utente ingrandisce i caratteri nel browser!
  - `em`: proporzionale alla dimensione del font del genitore diretto.
  - `%`: percentuale rispetto alle dimensioni del contenitore genitore.
  - `vw` e `vh`: $1\%$ della larghezza (*viewport width*) o altezza (*viewport height*) dello schermo.

### Tipografia
```css
body {
    font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
    font-size: 1rem;
    line-height: 1.6;
    color: #333333;
}
```

---

## La Proprietà `display`

Determina come l'elemento si posiziona nel flusso della pagina:

| Valore | Va a capo? | Accetta `width` / `height`? | Elementi HTML tipici |
| :--- | :--- | :--- | :--- |
| **`block`** | **Sì** (occupa tutto il $100\%$ della larghezza) | Sì | `<div>`, `<p>`, `<h1>`, `<section>` |
| **`inline`** | **No** (si posiziona uno accanto all'altro) | No (ignora larghezza e margini verticali) | `<span>`, `<a>`, `<strong>` |
| **`inline-block`** | **No** (affiancato nella stessa riga) | **Sì** (accetta dimensioni e padding completi) | `<button>`, `<input>` |
| **`none`** | L'elemento scompare del tutto dalla pagina e non occupa spazio | | |

---

## Posizionamento (`position`)

- **`static`**: il comportamento naturale di default. Segue il normale flusso della pagina.
- **`relative`**: l'elemento rimane nel flusso originale, ma può essere traslato di poco con `top`, `bottom`, `left`, `right`. Serve soprattutto come punto di riferimento per i figli `absolute`!
- **`absolute`**: l'elemento viene rimosso dal flusso normale e posizionato esattamente alle coordinate indicate rispetto al più vicino genitore con `position: relative`.
- **`fixed`**: l'elemento rimane ancorato allo schermo anche quando l'utente fa lo scrolling (perfetto per navbar fisse o pulsanti "torna su").
- **`sticky`**: si comporta come `relative` finché non si scorre fino a una determinata soglia dello schermo, dopodiché si "incolla" in cima rimanendo visibile.

---

## Layout Moderno con Flexbox

**Flexbox** è il sistema di layout monodimensionale ideale per allineare e distribuire elementi lungo una riga o lungo una colonna.

```css
.container {
    display: flex;             /* Attiva Flexbox sul contenitore */
    flex-direction: row;       /* row (default) oppure column */
    justify-content: space-between; /* Distribuzione sull'asse orizzontale */
    align-items: center;       /* Allineamento sull'asse verticale */
    gap: 1.5rem;               /* Spazio uniforme tra i figli */
    flex-wrap: wrap;           /* Manda a capo i figli se lo spazio finisce */
}

.item {
    flex: 1;                   /* I figli si espandono per occupare lo spazio disponibile in parti uguali */
}
```

### Valori utili di `justify-content`:
- `flex-start`: raggruppati a sinistra.
- `center`: centrati perfettamente.
- `flex-end`: raggruppati a destra.
- `space-between`: primo elemento a sinistra, ultimo a destra, spazio equo in mezzo.
- `space-around` / `space-evenly`: spazio distribuito uniformemente attorno a ciascun elemento.

---

## Layout Moderno con CSS Grid

**CSS Grid** è il sistema di layout bidimensionale per creare griglie complesse sia per righe che per colonne contemporaneamente:

```css
.griglia {
    display: grid;
    /* Crea 3 colonne di larghezza uguale (1fr = 1 frazione) */
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}
```

---

## Responsive Design e Media Queries

Il **Responsive Design** garantisce che un sito web si adatti automaticamente a schermi di qualsiasi dimensione (dagli smartphone ai monitor 4K).

### Le Media Queries
Permettono di applicare regole CSS solo quando lo schermo soddisfa determinate condizioni di larghezza:

```css
/* Stile base per Desktop (o Tablet) */
.colonne {
    display: flex;
    flex-direction: row;
}

/* Quando lo schermo è largo 768px o meno (Smartphone) */
@media (max-width: 768px) {
    .colonne {
        flex-direction: column; /* Dispone le colonne in verticale */
    }

    body {
        font-size: 0.9rem;
    }
}
```

---

## Esempi Pratici di Componenti UI

### 1. Barra di Navigazione Responsive (Navbar)

```html
<nav class="navbar">
    <div class="logo">MioSito</div>
    <ul class="nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">Servizi</a></li>
        <li><a href="#">Contatti</a></li>
    </ul>
</nav>
```

```css
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #2c3e50;
    padding: 1rem 2rem;
    color: white;
}

.navbar .logo {
    font-size: 1.5rem;
    font-weight: bold;
}

.navbar .nav-links {
    display: flex;
    list-style: none;
    gap: 1.5rem;
    margin: 0;
}

.navbar .nav-links a {
    color: white;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s ease;
}

.navbar .nav-links a:hover {
    color: #3498db;
}
```

### 2. Card UI Moderna con Ombra e Transizione

```html
<div class="card">
    <img src="copertina.jpg" alt="Immagine card">
    <div class="card-body">
        <h3>Titolo della Card</h3>
        <p>Breve descrizione accattivante del prodotto o dell'articolo.</p>
        <button class="btn">Scopri di più</button>
    </div>
</div>
```

```css
.card {
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    max-width: 320px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
    transform: translateY(-6px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.card img {
    width: 100%;
    height: 180px;
    object-fit: cover;
}

.card-body {
    padding: 1.25rem;
}

.card-body h3 {
    margin-top: 0;
    color: #2d3436;
}

.btn {
    background-color: #0984e3;
    color: white;
    border: none;
    padding: 0.6rem 1.2rem;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.2s ease;
}

.btn:hover {
    background-color: #74b9ff;
}
```
