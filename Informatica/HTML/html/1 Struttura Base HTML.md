## Struttura base

Scheletro minimo di ogni documento HTML.

```html
<!DOCTYPE html>
<html lang="it">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Titolo pagina</title>
  </head>
  <body>
    <p>Contenuto della pagina</p>
  </body>
</html>
```

Attributi di `<html>`:

- `lang` — lingua del documento (es. `"it"`, `"en"`)
- `dir` — direzione del testo: `ltr` (default) o `rtl`

---

## head

Contiene metadati, stili e script. Non è visibile nel browser.

```html
<head>
  <meta charset="UTF-8" />
  <title>Nome del sito – Pagina</title>
  <link rel="stylesheet" href="style.css" />
  <link rel="icon" href="favicon.ico" type="image/x-icon" />
  <script defer src="app.js"></script>
</head>
```
--- 
#HTML #Linguaggio_HTML