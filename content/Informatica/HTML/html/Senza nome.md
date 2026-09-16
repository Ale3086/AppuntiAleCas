## Indice

- [[#Struttura base]]
- [[#head]]
- [[#meta]]
- [[#link]]
- [[#script]]
- [[#Headings]]
- [[#p]]
- [[#Formattazione testo inline]]
- [[#a]]
- [[#img]]
- [[#picture]]
- [[#figure]]
- [[#video]]
- [[#audio]]
- [[#iframe]]
- [[#ul e ol]]
- [[#dl]]
- [[#table]]
- [[#form]]
- [[#input]]
- [[#textarea]]
- [[#select]]
- [[#button]]
- [[#label]]
- [[#fieldset e legend]]
- [[#div e span]]
- [[#Elementi semantici strutturali]]
- [[#article e section]]
- [[#aside]]
- [[#nav]]
- [[#header e footer]]
- [[#main]]
- [[#details e summary]]
- [[#dialog]]
- [[#template]]
- [[#canvas]]
- [[#svg inline]]
- [[#Attributi globali]]
- [[#Attributi aria]]

---

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

## Headings

Titoli da `<h1>` a `<h6>`. Usare un solo `<h1>` per pagina; la gerarchia deve essere logica.

```html
<h1>Titolo principale della pagina</h1>
<h2>Sezione principale</h2>
<h3>Sottosezione</h3>
<h4>Argomento specifico</h4>
<h5>Dettaglio minore</h5>
<h6>Nota o annotazione</h6>
```

Attributi utili:

- `id` — permette di creare link ancora (es. `<a href="#sezione">`)

---

## p

Paragrafo di testo. Elemento block-level; non può contenere altri elementi block.

```html
<p>Testo del paragrafo.</p>
<p>Paragrafo con <br /> un'interruzione di riga manuale.</p>
```

`<br>` — interruzione di riga senza creare un nuovo paragrafo. Non ha attributi significativi. `<hr>` — linea orizzontale di separazione tematica.

```html
<p>Primo argomento.</p>
<hr />
<p>Secondo argomento.</p>
```

---

## Formattazione testo inline

Tag che modificano il significato o l'aspetto di porzioni di testo.

```html
<strong>Grassetto semantico</strong> — importanza alta
<b>Grassetto visivo</b> — senza valore semantico

<em>Corsivo semantico</em> — enfasi
<i>Corsivo visivo</i> — termine tecnico, titolo, etc.

<u>Sottolineato</u> — annotazione non verbale
<s>Testo sbarrato</s> — informazione non più valida
<del>Testo cancellato</del> — contenuto rimosso (diff)
<ins>Testo inserito</ins> — contenuto aggiunto (diff)

<mark>Testo evidenziato</mark>
<small>Testo piccolo</small> — note legali, copyright
<sub>Pedice</sub> — es. H<sub>2</sub>O
<sup>Apice</sup> — es. x<sup>2</sup>

<code>codice inline</code>
<pre><code>blocco di codice
preformattato</code></pre>

<kbd>Ctrl</kbd> + <kbd>C</kbd> — input da tastiera
<samp>output del programma</samp>
<var>variabile</var>

<abbr title="HyperText Markup Language">HTML</abbr>
<cite>Nome dell'opera citata</cite>
<q cite="https://source.com">Citazione breve inline</q>
<blockquote cite="https://source.com">
  Citazione lunga in blocco separato.
</blockquote>

<time datetime="2024-03-15">15 marzo 2024</time>
<address>Via Roma 1, Milano</address>
<bdi>testo isolato dalla direzione</bdi>
<wbr /> <!-- suggerisce un punto di interruzione di parola -->
```

Attributi specifici:

- `<del>` / `<ins>`: `cite` (URL della spiegazione), `datetime` (data della modifica)
- `<abbr>`: `title` — testo esteso dell'abbreviazione (mostrato come tooltip)
- `<q>` / `<blockquote>`: `cite` — URL della fonte
- `<time>`: `datetime` — valore leggibile dalla macchina (es. `"2024-03-15"`, `"14:30"`)

---

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

## img

Incorpora un'immagine. Elemento void (nessun tag di chiusura).

```html
<img src="foto.jpg" alt="Una bella foto" />
<img src="logo.svg" alt="Logo aziendale" width="200" height="80" />
<img src="grande.jpg" alt="Banner" loading="lazy" decoding="async" />
<img
  src="small.jpg"
  srcset="medium.jpg 768w, large.jpg 1200w"
  sizes="(max-width: 768px) 100vw, 50vw"
  alt="Immagine responsive"
/>
```

Attributi principali:

- `src` — percorso o URL dell'immagine
- `alt` — testo alternativo (obbligatorio; vuoto `""` per immagini decorative)
- `width` / `height` — dimensioni in pixel (previene il layout shift)
- `loading` — `lazy` (carica solo quando visibile) o `eager` (default)
- `decoding` — `async`, `sync`, `auto`
- `srcset` — lista di immagini con larghezze candidate (responsive)
- `sizes` — condizioni per scegliere quale immagine del `srcset` usare
- `crossorigin` — gestione CORS per canvas o fetch
- `referrerpolicy` — politica del referrer
- `usemap` — collega a una `<map>` client-side

---

## picture

Permette di servire formati o immagini diverse in base a media query o supporto del browser.

```html
<picture>
  <!-- Formato moderno per browser supportati -->
  <source srcset="immagine.avif" type="image/avif" />
  <source srcset="immagine.webp" type="image/webp" />
  <!-- Versione per viewport mobile -->
  <source srcset="mobile.jpg" media="(max-width: 600px)" />
  <!-- Fallback -->
  <img src="immagine.jpg" alt="Descrizione" />
</picture>
```

Attributi di `<source>`:

- `srcset` — URL dell'immagine (o lista responsive)
- `type` — MIME type (`image/webp`, `image/avif`…)
- `media` — condizione media query
- `sizes` — come in `<img>`
- `width` / `height`

---

## figure

Raggruppa contenuto autonomo (immagine, codice, grafico) con una didascalia opzionale.

```html
<figure>
  <img src="grafico.png" alt="Grafico delle vendite 2024" />
  <figcaption>Fig. 1 — Andamento vendite nel 2024.</figcaption>
</figure>

<figure>
  <pre><code>const x = 42;</code></pre>
  <figcaption>Esempio di dichiarazione variabile.</figcaption>
</figure>
```

`<figcaption>` è opzionale e può stare sopra o sotto il contenuto.

---

## video

Incorpora un video. Supporta più sorgenti come fallback.

```html
<video src="video.mp4" controls width="800" height="450"></video>

<video controls width="800" autoplay muted loop poster="copertina.jpg">
  <source src="video.webm" type="video/webm" />
  <source src="video.mp4" type="video/mp4" />
  <track src="sottotitoli.vtt" kind="subtitles" srclang="it" label="Italiano" />
  <p>Il tuo browser non supporta il video HTML5.</p>
</video>
```

Attributi principali:

- `src` — URL del video (alternativa ai `<source>`)
- `controls` — mostra i controlli nativi del browser
- `autoplay` — avvia automaticamente (richiede spesso `muted`)
- `muted` — video silenzioso
- `loop` — ripete il video
- `poster` — immagine mostrata prima del play
- `width` / `height` — dimensioni in pixel
- `preload` — `none`, `metadata`, `auto`
- `playsinline` — evita il fullscreen automatico su iOS

Attributi di `<track>`:

- `src` — file `.vtt` dei sottotitoli
- `kind` — `subtitles`, `captions`, `descriptions`, `chapters`, `metadata`
- `srclang` — lingua (es. `"it"`, `"en"`)
- `label` — etichetta visibile nel selettore
- `default` — traccia attiva di default

---

## audio

Incorpora un file audio.

```html
<audio controls>
  <source src="audio.ogg" type="audio/ogg" />
  <source src="audio.mp3" type="audio/mpeg" />
  Il tuo browser non supporta l'audio HTML5.
</audio>

<audio src="musica.mp3" controls autoplay muted loop preload="metadata"></audio>
```

Attributi principali:

- `src` — URL del file audio
- `controls` — mostra i controlli nativi
- `autoplay` — avvia automaticamente
- `muted` — audio silenzioso
- `loop` — ripete l'audio
- `preload` — `none`, `metadata`, `auto`

---

## iframe

Incorpora un documento HTML esterno (mappa, video YouTube, widget).

```html
<!-- Pagina esterna -->
<iframe src="https://example.com" width="600" height="400" title="Esempio"></iframe>

<!-- Video YouTube -->
<iframe
  src="https://www.youtube.com/embed/VIDEO_ID"
  width="560"
  height="315"
  title="Titolo video"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
  allowfullscreen
></iframe>

<!-- Google Maps -->
<iframe
  src="https://maps.google.com/maps?q=Roma&output=embed"
  width="600"
  height="450"
  loading="lazy"
  title="Mappa di Roma"
></iframe>
```

Attributi principali:

- `src` — URL del documento da incorporare
- `title` — descrizione per accessibilità (obbligatorio)
- `width` / `height` — dimensioni
- `allow` — permessi: `fullscreen`, `camera`, `microphone`, `geolocation`…
- `allowfullscreen` — abilita il fullscreen
- `loading` — `lazy` o `eager`
- `sandbox` — restringe le funzionalità: `allow-scripts`, `allow-forms`, `allow-same-origin`…
- `referrerpolicy` — politica del referrer
- `name` — nome del frame (usato come `target` nei link)

---

## ul e ol

Liste non ordinate (`<ul>`) e ordinate (`<ol>`). Ogni elemento è un `<li>`.

```html
<ul>
  <li>Elemento</li>
  <li>Elemento con <strong>enfasi</strong></li>
  <li>
    Elemento con sottolista
    <ul>
      <li>Annidato</li>
    </ul>
  </li>
</ul>

<ol start="3" reversed>
  <li>Terzo</li>
  <li>Quarto</li>
</ol>

<ol type="A">
  <li>Primo (A)</li>
  <li>Secondo (B)</li>
</ol>
```

Attributi di `<ol>`:

- `start` — numero di partenza (es. `start="3"`)
- `reversed` — conta al contrario
- `type` — stile: `1` (default), `A`, `a`, `I`, `i`

Attributi di `<li>`:

- `value` — valore specifico in una `<ol>` (sovrascrive il contatore)

---

## dl

Lista di definizioni: coppie termine (`<dt>`) / descrizione (`<dd>`).

```html
<dl>
  <dt>HTML</dt>
  <dd>HyperText Markup Language — linguaggio di markup per il web.</dd>

  <dt>CSS</dt>
  <dd>Cascading Style Sheets — fogli di stile.</dd>

  <dt>HTTP</dt>
  <dt>HTTPS</dt>
  <dd>Protocolli di trasferimento ipertestuale.</dd>
</dl>
```

Un `<dt>` può essere seguito da più `<dd>`, e più `<dt>` possono condividere un `<dd>`.

---

## table

Struttura tabellare per dati bidimensionali.

```html
<table>
  <caption>Vendite per trimestre</caption>
  <colgroup>
    <col style="background-color: #f0f0f0" />
    <col span="2" />
  </colgroup>
  <thead>
    <tr>
      <th scope="col">Prodotto</th>
      <th scope="col">Q1</th>
      <th scope="col">Q2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Widget A</th>
      <td>120</td>
      <td>145</td>
    </tr>
    <tr>
      <td colspan="2">Totale parziale</td>
      <td>265</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row">Totale</th>
      <td>120</td>
      <td>145</td>
    </tr>
  </tfoot>
</table>
```

Attributi di `<td>` e `<th>`:

- `colspan` — numero di colonne occupate
- `rowspan` — numero di righe occupate
- `scope` — per `<th>`: `col`, `row`, `colgroup`, `rowgroup` (accessibilità)
- `headers` — lista di `id` di `<th>` correlati

Attributi di `<col>` / `<colgroup>`:

- `span` — numero di colonne a cui si applica

---

## form

Contenitore per i controlli di input. Gestisce la raccolta e l'invio dei dati.

```html
<form action="/submit" method="post" enctype="multipart/form-data" novalidate>
  <!-- campi -->
  <button type="submit">Invia</button>
</form>
```

Attributi principali:

- `action` — URL a cui inviare i dati (default: URL corrente)
- `method` — `get` (dati in query string) o `post` (nel body)
- `enctype` — codifica: `application/x-www-form-urlencoded` (default), `multipart/form-data` (per file), `text/plain`
- `novalidate` — disabilita la validazione nativa del browser
- `autocomplete` — `on` o `off` per il form intero
- `target` — dove mostrare la risposta (`_self`, `_blank`…)
- `name` — nome del form (usato da JavaScript)

---

## input

Il campo di input più versatile. Il comportamento dipende da `type`.

```html
<!-- Testo -->
<input type="text" name="username" placeholder="Nome utente" maxlength="50" />
<input type="email" name="email" placeholder="nome@email.com" />
<input type="password" name="pwd" minlength="8" autocomplete="current-password" />
<input type="search" name="q" placeholder="Cerca..." />
<input type="url" name="sito" placeholder="https://example.com" />
<input type="tel" name="telefono" pattern="[0-9]{10}" />

<!-- Numeri e intervalli -->
<input type="number" name="eta" min="0" max="120" step="1" value="25" />
<input type="range" name="volume" min="0" max="100" step="5" value="50" />

<!-- Date e ore -->
<input type="date" name="nascita" min="1900-01-01" max="2024-12-31" />
<input type="time" name="orario" min="08:00" max="18:00" />
<input type="datetime-local" name="appuntamento" />
<input type="month" name="mese" />
<input type="week" name="settimana" />

<!-- Selezione -->
<input type="checkbox" name="tos" value="accetto" checked />
<input type="radio" name="genere" value="m" /> Maschio
<input type="radio" name="genere" value="f" /> Femmina

<!-- File e colore -->
<input type="file" name="allegato" accept=".pdf,.jpg,.png" multiple />
<input type="color" name="colore" value="#ff0000" />

<!-- Nascosti e speciali -->
<input type="hidden" name="token" value="abc123" />
<input type="submit" value="Invia" />
<input type="reset" value="Cancella" />
<input type="image" src="btn.png" alt="Invia" />
```

Attributi principali:

- `type` — determina il comportamento (vedi esempi sopra)
- `name` — chiave inviata con il form
- `value` — valore iniziale o inviato
- `placeholder` — testo suggerito (non è un valore)
- `required` — campo obbligatorio
- `disabled` — campo disabilitato (non inviato)
- `readonly` — sola lettura (inviato comunque)
- `autofocus` — focus automatico al caricamento
- `autocomplete` — `on`, `off`, o hint come `email`, `username`, `new-password`…
- `form` — `id` del form a cui appartiene (se fuori dal `<form>`)
- `min` / `max` — limiti per `number`, `range`, `date`, `time`
- `step` — incremento per `number` e `range`
- `minlength` / `maxlength` — lunghezza testo
- `pattern` — espressione regolare di validazione
- `multiple` — più valori per `email` e `file`
- `accept` — tipi di file accettati (per `type="file"`)
- `checked` — stato iniziale per `checkbox` e `radio`
- `list` — `id` di un `<datalist>` per suggerimenti

---

## textarea

Campo di testo multiriga.

```html
<label for="msg">Messaggio:</label>
<textarea
  id="msg"
  name="messaggio"
  rows="5"
  cols="40"
  placeholder="Scrivi qui..."
  minlength="10"
  maxlength="500"
  required
  spellcheck="true"
  wrap="soft"
>Testo iniziale</textarea>
```

Attributi principali:

- `rows` — altezza in righe di testo
- `cols` — larghezza in colonne di caratteri
- `placeholder` — testo suggerito
- `minlength` / `maxlength` — lunghezza del testo
- `required`, `disabled`, `readonly`, `autofocus`, `name`, `form` — come `<input>`
- `wrap` — `soft` (default, newline non inviati) o `hard` (newline inviati)
- `spellcheck` — `true` o `false`

---

## select

Menù a tendina. Le opzioni sono `<option>`, raggruppabili con `<optgroup>`.

```html
<label for="paese">Paese:</label>
<select id="paese" name="paese" required>
  <option value="">-- Seleziona --</option>
  <optgroup label="Europa">
    <option value="it" selected>Italia</option>
    <option value="fr">Francia</option>
    <option value="de">Germania</option>
  </optgroup>
  <optgroup label="America">
    <option value="us">Stati Uniti</option>
  </optgroup>
</select>

<!-- Selezione multipla -->
<select name="lingue" multiple size="4">
  <option value="it">Italiano</option>
  <option value="en">Inglese</option>
  <option value="fr">Francese</option>
</select>
```

Attributi di `<select>`:

- `multiple` — permette la selezione multipla
- `size` — numero di opzioni visibili
- `required`, `disabled`, `autofocus`, `form`, `name`

Attributi di `<option>`:

- `value` — valore inviato (se omesso, usa il testo)
- `selected` — opzione pre-selezionata
- `disabled` — opzione non selezionabile

Attributi di `<optgroup>`:

- `label` — etichetta del gruppo (non inviabile)
- `disabled` — disabilita tutte le opzioni del gruppo

---

## button

Pulsante cliccabile. Preferibile a `<input type="submit">` per la flessibilità del contenuto.

```html
<button type="submit">Invia il modulo</button>
<button type="reset">Cancella</button>
<button type="button" id="apri-modal">Apri finestra</button>
<button type="button" disabled>Non disponibile</button>

<!-- Con icona -->
<button type="button">
  <img src="icon.svg" alt="" aria-hidden="true" />
  Scarica
</button>

<!-- Collega a un form esterno -->
<button type="submit" form="form-id" formaction="/altro-endpoint" formmethod="get">
  Invia altrove
</button>
```

Attributi principali:

- `type` — `submit` (default), `reset`, `button`
- `disabled` — disabilita il pulsante
- `form` — `id` del form a cui è associato
- `formaction` — sovrascrive l'`action` del form
- `formmethod` — sovrascrive il `method` del form
- `formenctype` — sovrascrive l'`enctype` del form
- `formnovalidate` — bypassa la validazione
- `formtarget` — sovrascrive il `target` del form
- `name` / `value` — inviati con il form se `type="submit"`
- `autofocus` — focus automatico al caricamento
- `popovertarget` — `id` del popover da attivare (API Popover)
- `popovertargetaction` — `show`, `hide`, `toggle`

---

## label

Etichetta associata a un controllo del form. Cliccando sull'etichetta si attiva il campo.

```html
<!-- Associazione tramite for/id -->
<label for="email">Indirizzo email</label>
<input type="email" id="email" name="email" />

<!-- Associazione implicita (campo dentro la label) -->
<label>
  <input type="checkbox" name="newsletter" />
  Iscriviti alla newsletter
</label>
```

Attributi principali:

- `for` — `id` del controllo associato
- `form` — `id` del form di riferimento

---

## fieldset e legend

Raggruppa controlli correlati in un form con un titolo opzionale.

```html
<fieldset>
  <legend>Dati personali</legend>
  <label for="nome">Nome:</label>
  <input type="text" id="nome" name="nome" />
  <label for="cognome">Cognome:</label>
  <input type="text" id="cognome" name="cognome" />
</fieldset>

<fieldset disabled>
  <legend>Opzioni avanzate (non disponibili)</legend>
  <input type="text" name="opzione" />
</fieldset>
```

Attributi di `<fieldset>`:

- `disabled` — disabilita tutti i campi interni
- `form` — `id` del form di riferimento
- `name` — nome del fieldset

---

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

## details e summary

Widget di disclosure nativo: contenuto espandibile/collassabile senza JavaScript.

```html
<details>
  <summary>Mostra dettagli tecnici</summary>
  <p>Questi sono i dettagli nascosti, visibili dopo il click.</p>
  <ul>
    <li>Specifiche tecniche</li>
    <li>Requisiti di sistema</li>
  </ul>
</details>

<details open>
  <summary>Aperto di default</summary>
  <p>Questo blocco è visibile al caricamento.</p>
</details>
```

Attributi di `<details>`:

- `open` — espande il contenuto di default

---

## dialog

Finestra modale o non modale nativa. Gestita via JavaScript o con `method="dialog"` in un form interno.

```html
<dialog id="modal" aria-labelledby="modal-titolo">
  <h2 id="modal-titolo">Conferma</h2>
  <p>Sei sicuro di voler continuare?</p>
  <form method="dialog">
    <button value="annulla">Annulla</button>
    <button value="conferma">Conferma</button>
  </form>
</dialog>

<button onclick="document.getElementById('modal').showModal()">Apri modale</button>
```

Attributi principali:

- `open` — rende il dialog visibile (senza backdrop; usare `.show()` / `.showModal()` via JS)

---

## template

Frammento HTML inerte: non viene reso né eseguito. Usato via JavaScript per creare contenuto dinamico.

```html
<template id="card-template">
  <div class="card">
    <h3 class="card__title"></h3>
    <p class="card__body"></p>
    <a class="card__link" href="#">Leggi</a>
  </div>
</template>

<script>
  const tmpl = document.getElementById("card-template");
  const clone = tmpl.content.cloneNode(true);
  clone.querySelector(".card__title").textContent = "Titolo dinamico";
  document.body.appendChild(clone);
</script>
```

---

## canvas

Area di disegno bitmap manipolabile via JavaScript (grafici, animazioni, giochi).

```html
<canvas id="grafico" width="600" height="300">
  Il tuo browser non supporta canvas.
</canvas>

<script>
  const ctx = document.getElementById("grafico").getContext("2d");
  ctx.fillStyle = "#4f46e5";
  ctx.fillRect(20, 20, 200, 100);
</script>
```

Attributi principali:

- `width` — larghezza in pixel (default 300)
- `height` — altezza in pixel (default 150)

---

## svg inline

SVG incorporato direttamente nell'HTML. Più flessibile dei file `.svg` esterni (stile CSS, script).

```html
<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" aria-hidden="true">
  <circle cx="50" cy="50" r="40" fill="#4f46e5" />
</svg>

<!-- Icona accessibile con titolo -->
<svg role="img" aria-labelledby="icona-titolo" width="24" height="24" viewBox="0 0 24 24">
  <title id="icona-titolo">Cerca</title>
  <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2" fill="none" />
  <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" stroke-width="2" />
</svg>
```

Attributi principali di `<svg>`:

- `xmlns` — namespace (obbligatorio solo per SVG standalone)
- `width` / `height` — dimensioni
- `viewBox` — sistema di coordinate interno (`min-x min-y width height`)
- `fill` — colore di riempimento default
- `stroke` — colore del bordo default
- `role` / `aria-labelledby` — accessibilità

---

## Attributi globali

Utilizzabili su qualsiasi elemento HTML.

```html
<div id="unico">Identificatore unico nella pagina</div>
<p class="testo evidenziato">Classi CSS (separate da spazio)</p>
<p style="color: red; font-size: 1rem;">Stile inline (sconsigliato)</p>
<p title="Testo mostrato come tooltip">Passa il mouse qui</p>
<p hidden>Nascosto dal browser (non occupa spazio)</p>
<div tabindex="0">Focusabile da tastiera</div>
<div tabindex="-1">Focusabile solo via JS, non con Tab</div>
<p contenteditable="true">Questo testo è modificabile dall'utente</p>
<p draggable="true">Trascinabile con drag & drop</p>
<p lang="en">This paragraph is in English</p>
<p dir="rtl">نص بالعربية</p>
<p translate="no">Parola da non tradurre: brand-name</p>
<p spellcheck="true">Controllo ortografico attivo</p>
<div data-utente-id="42" data-ruolo="admin">Attributi personalizzati con data-*</div>
```

- `id` — identificatore unico
- `class` — classi CSS
- `style` — stile inline
- `title` — tooltip
- `hidden` — nasconde l'elemento
- `tabindex` — ordine di focus da tastiera
- `contenteditable` — `true` o `false`
- `draggable` — `true`, `false`, `auto`
- `lang` — lingua del contenuto
- `dir` — direzione: `ltr`, `rtl`, `auto`
- `translate` — `yes` o `no` per i traduttori automatici
- `spellcheck` — `true` o `false`
- `data-*` — attributi personalizzati leggibili via `dataset` in JavaScript

---

## Attributi aria

Attributi ARIA migliorano l'accessibilità per tecnologie assistive (screen reader).

```html
<!-- Ruoli espliciti -->
<div role="button" tabindex="0">Pulsante custom</div>
<div role="alert">Messaggio di errore importante</div>
<div role="dialog" aria-modal="true" aria-labelledby="titolo-dialog">...</div>

<!-- Etichette -->
<button aria-label="Chiudi finestra">✕</button>
<nav aria-label="Navigazione principale">...</nav>
<input aria-labelledby="etichetta-esterna" />
<p id="etichetta-esterna">Descrizione del campo</p>

<!-- Descrizioni e relazioni -->
<input aria-describedby="suggerimento" />
<p id="suggerimento">Inserisci almeno 8 caratteri.</p>

<!-- Stati e proprietà -->
<button aria-expanded="false" aria-controls="menu">Menu</button>
<ul id="menu" hidden>...</ul>
<input type="checkbox" aria-checked="mixed" />
<div aria-busy="true">Caricamento in corso...</div>
<li aria-current="page">Pagina attuale</li>
<div aria-live="polite">Aggiornamento dinamico</div>
<div aria-live="assertive">Errore critico</div>

<!-- Nascondere dal tree di accessibilità -->
<img src="decorativa.svg" alt="" aria-hidden="true" />
<span aria-hidden="true">→</span>
```

Attributi principali:

- `role` — ruolo semantico dell'elemento (`button`, `alert`, `dialog`, `navigation`…)
- `aria-label` — etichetta testuale diretta
- `aria-labelledby` — `id` dell'elemento che funge da etichetta
- `aria-describedby` — `id` dell'elemento con la descrizione
- `aria-hidden` — `true` per nascondere agli screen reader
- `aria-expanded` — `true` / `false` per elementi espandibili
- `aria-controls` — `id` dell'elemento controllato
- `aria-current` — `page`, `step`, `location`, `date`, `time`, `true`
- `aria-live` — `polite` (annuncia dopo l'azione) o `assertive` (interrompe)
- `aria-busy` — `true` durante il caricamento asincrono
- `aria-checked` — `true`, `false`, `mixed`
- `aria-disabled` — `true` / `false`
- `aria-modal` — `true` per dialog modali
- `aria-required` — `true` per campi obbligatori
- `aria-invalid` — `true`, `false`, `grammar`, `spelling`