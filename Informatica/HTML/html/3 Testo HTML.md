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
#HTML #Linguaggio_HTML