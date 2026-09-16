## div e span

Contenitori generici senza valore semantico. Usare gli elementi semantici quando possibile.

```html
<!-- div: block-level, struttura layout -->
<div class="card" id="card-1" data-tipo="prodotto">
  <div class="card__header">...</div>
  <div class="card__body">...</div>
</div>

<!-- span: inline, piccole porzioni di testo -->
<p>Il prezzo è <span class="prezzo">€ 29,90</span> IVA inclusa.</p>
<p>Stato: <span class="badge badge--verde">Attivo</span></p>
```

Non hanno attributi specifici; usano `id`, `class`, `style`, `data-*` e gli attributi globali.

---

## Elementi semantici strutturali

Rimpiazzano i `<div>` generici con tag dal significato preciso.

```html
<body>
  <header>
    <nav>...</nav>
  </header>

  <main>
    <article>
      <header><h1>Titolo articolo</h1></header>
      <section>...</section>
      <footer>Autore, data</footer>
    </article>
    <aside>Contenuto correlato</aside>
  </main>

  <footer>
    <address>
      Contattaci: <a href="mailto:info@example.com">info@example.com</a>
    </address>
  </footer>
</body>
```

---

## article e section

`<article>`: contenuto autonomo e riutilizzabile (post, scheda prodotto, commento). `<section>`: sezione tematica di un documento, solitamente con un heading.

```html
<article>
  <h2>Titolo del post</h2>
  <p>Contenuto del post...</p>
  <section>
    <h3>Commenti</h3>
    <article>
      <p>Commento di un utente.</p>
    </article>
  </section>
</article>
```

---

## aside

Contenuto tangenzialmente correlato al principale (sidebar, callout, biografia autore).

```html
<main>
  <article>...</article>
  <aside>
    <h3>Articoli correlati</h3>
    <ul>
      <li><a href="#">Titolo correlato</a></li>
    </ul>
  </aside>
</main>
```

---

## nav

Blocco di navigazione principale. Non ogni gruppo di link richiede `<nav>`.

```html
<nav aria-label="Navigazione principale">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/prodotti">Prodotti</a></li>
    <li><a href="/contatti">Contatti</a></li>
  </ul>
</nav>

<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/blog">Blog</a></li>
    <li aria-current="page">Articolo corrente</li>
  </ol>
</nav>
```

---

## header e footer

`<header>`: intestazione di pagina o di sezione (logo, titolo, navigazione). `<footer>`: piè di pagina o di sezione (link legali, copyright, contatti).

```html
<header>
  <a href="/"><img src="logo.svg" alt="Logo" /></a>
  <nav>...</nav>
  <button>Menu</button>
</header>

<footer>
  <p>&copy; 2024 Azienda Srl. Tutti i diritti riservati.</p>
  <nav aria-label="Footer">
    <a href="/privacy">Privacy</a>
    <a href="/cookie">Cookie</a>
  </nav>
  <address>Via Roma 1, Milano — <a href="mailto:info@example.com">info@example.com</a></address>
</footer>
```

---

## main

Contenuto principale della pagina. Ce ne deve essere uno solo visibile per documento.

```html
<main id="contenuto-principale">
  <h1>Benvenuto</h1>
  <p>Questo è il contenuto principale.</p>
</main>
```

Attributi utili:

- `id` — convenzionalmente `"main-content"` per i link "salta al contenuto" (accessibilità)
--- 
#HTML #Linguaggio_HTML