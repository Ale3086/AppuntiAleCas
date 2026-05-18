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
#HTML #Linguaggio_HTML