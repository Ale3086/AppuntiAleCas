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
--- 
#HTML #Linguaggio_HTML