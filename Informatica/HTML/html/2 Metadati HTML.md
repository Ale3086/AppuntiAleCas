## meta

Fornisce metadati alla pagina. Va sempre dentro `<head>`.

```html
<!-- Codifica caratteri -->
<meta charset="UTF-8" />

<!-- Viewport per responsive design -->
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<!-- SEO -->
<meta name="description" content="Descrizione della pagina (max 160 caratteri)" />
<meta name="keywords" content="html, css, web, guida" />
<meta name="author" content="Mario Rossi" />
<meta name="robots" content="index, follow" />

<!-- Open Graph (social) -->
<meta property="og:title" content="Titolo per i social" />
<meta property="og:description" content="Descrizione per i social" />
<meta property="og:image" content="https://example.com/preview.png" />
<meta property="og:url" content="https://example.com/pagina" />
<meta property="og:type" content="website" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Titolo per Twitter" />

<!-- Refresh automatico -->
<meta http-equiv="refresh" content="5; url=https://example.com" />
```

Attributi principali:

- `charset` — codifica del documento
- `name` — nome del metadato (`description`, `viewport`, `author`, `robots`…)
- `property` — usato per Open Graph (`og:title`, `og:image`…)
- `content` — valore del metadato
- `http-equiv` — emula header HTTP (`refresh`, `content-type`…)

---

## link

Collega risorse esterne alla pagina. Va dentro `<head>`.

```html
<link rel="stylesheet" href="style.css" />
<link rel="stylesheet" href="print.css" media="print" />
<link rel="icon" href="favicon.ico" type="image/x-icon" />
<link rel="icon" href="icon.svg" type="image/svg+xml" />
<link rel="apple-touch-icon" href="apple-icon.png" />
<link rel="canonical" href="https://example.com/pagina" />
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="manifest" href="/site.webmanifest" />
```

Attributi principali:

- `rel` — tipo di relazione (`stylesheet`, `icon`, `canonical`, `preload`, `manifest`…)
- `href` — URL della risorsa
- `type` — MIME type della risorsa
- `media` — condizione media query (es. `print`, `screen`)
- `as` — tipo di risorsa per `preload` (`font`, `image`, `script`, `style`)
- `crossorigin` — gestione CORS (`anonymous`, `use-credentials`)
- `sizes` — dimensioni per le icone (es. `"32x32"`)

---

## script

Incorpora o collega JavaScript. Può stare in `<head>` o in fondo a `<body>`.

```html
<!-- Script esterno — defer: eseguito dopo il parsing HTML -->
<script defer src="app.js"></script>

<!-- Script esterno — async: eseguito appena scaricato, senza ordine -->
<script async src="analytics.js"></script>

<!-- Script inline -->
<script>
  console.log("Ciao!");
</script>

<!-- Modulo ES6 -->
<script type="module" src="main.js"></script>

<!-- Dati JSON per lo script (non eseguito) -->
<script type="application/json" id="config">
  { "apiUrl": "https://api.example.com" }
</script>
```

Attributi principali:

- `src` — URL del file JavaScript esterno
- `defer` — esegue lo script dopo il parsing dell'HTML (mantiene l'ordine)
- `async` — esegue lo script in modo asincrono (non garantisce l'ordine)
- `type` — tipo MIME (`"module"`, `"application/json"`…); default `text/javascript`
- `crossorigin` — gestione CORS
- `integrity` — hash SRI per la verifica dell'integrità
- `nomodule` — usato come fallback per browser che supportano i moduli
--- 
#HTML #Linguaggio_HTML