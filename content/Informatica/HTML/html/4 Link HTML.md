## a

Crea collegamenti ipertestuali. Può avvolgere anche elementi block-level.

```html
<!-- Link esterno -->
<a href="https://example.com" target="_blank" rel="noopener noreferrer">Apri sito</a>

<!-- Link interno -->
<a href="/chi-siamo.html">Chi siamo</a>

<!-- Ancora interna -->
<a href="#contatti">Vai ai contatti</a>

<!-- Email -->
<a href="mailto:info@example.com?subject=Info&body=Ciao">Scrivi</a>

<!-- Telefono -->
<a href="tel:+390212345678">02 1234 5678</a>

<!-- Download -->
<a href="documento.pdf" download="nome-file.pdf">Scarica PDF</a>

<!-- Link con immagine -->
<a href="/">
  <img src="logo.png" alt="Homepage" />
</a>
```

Attributi principali:

- `href` — destinazione: URL, percorso relativo, ancora (`#id`), `mailto:`, `tel:`
- `target` — dove aprire il link: `_blank` (nuova scheda), `_self` (default), `_parent`, `_top`
- `rel` — relazione con la destinazione: `noopener`, `noreferrer`, `nofollow`, `sponsored`, `author`
- `download` — forza il download; il valore è il nome file suggerito
- `hreflang` — lingua della pagina di destinazione (es. `"en"`, `"it"`)
- `type` — MIME type della risorsa collegata
- `ping` — URL a cui inviare una notifica POST al click (tracking)
--- 
#HTML #Linguaggio_HTML