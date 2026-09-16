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
#HTML #Linguaggio_HTML