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
#HTML #Linguaggio_HTML