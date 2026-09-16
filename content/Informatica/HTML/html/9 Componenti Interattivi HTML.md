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
#HTML #Linguaggio_HTML