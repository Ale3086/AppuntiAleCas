# Changelog Riorganizzazione Vault & Ottimizzazione Quartz

Questo documento traccia in modo trasparente e granulare tutte le modifiche apportate al vault Obsidian in preparazione alla pubblicazione tramite [Quartz](https://quartz.jzhao.xyz/).
Ogni operazione logica viene eseguita sul branch dedicato `refactor/quartz-prep` mediante commit atomici convenzionali (`conventional commits`) e verificata tramite harness di test automatizzati.

- **Branch di lavoro**: `refactor/quartz-prep`
- **Ambito**: Riorganizzazione cartelle macro-argomento, bonifica encoding/BOM, arricchimento metadati YAML (tassonomia tag gerarchica per Graph View), mantenimento integrità wikilink interni, procedura Safe-Delete per file obsoleti o duplicati.
- **Regola aurea**: Nessun file viene eliminato autonomamente senza preventiva registrazione nella sezione Safe-Delete.

---

## 1. Cronologia Modifiche / Actions Log

| Commit Hash | Timestamp (UTC) | Action | Target Files | Details |
|---|---|---|---|---|
| `e8c9f0f` | 2026-09-30 11:15:00 UTC | chore: branch and changelog init | `CHANGELOG_RIORGANIZZAZIONE.md` | Inizializzazione branch `refactor/quartz-prep`, predisposizione registro modifiche, tabella Safe-Delete e matrice di verifica. |
| `347ec62` | 2026-09-30 11:17:00 UTC | test: establish e2e verification suite with check_links and check_tags | `check_links.py`, `check_tags.py`, `TEST_INFRA.md`, `TEST_READY.md` | Distribuzione harness di test standard Python (zero dipendenze). `check_links.py` valida 244 link (0 rotti, exit code 0). `check_tags.py` identifica service/draft page (55 file) e isola 101 note prive di tag gerarchici (exit code 1 atteso pre-M3). Redazione di `TEST_INFRA.md` e pubblicazione di `TEST_READY.md`. |
| `2daef81` | 2026-09-30 11:25:00 UTC | refactor: vault cleanup, encoding fixes, and safe-delete cataloging | `content/**`, `CHANGELOG_RIORGANIZZAZIONE.md` | Rimozione header UTF-8 BOM da 39 file markdown in `content/`. Correzione refuso cartella `Cerificazione Inglese` -> `Certificazione Inglese` (35 file) e verifica directory `Digitalizzazione e Multimedialità`. Aggiunta navigazione `Matematica` (`[[Matematica/index|Matematica]]`) in `content/index.md`. Censimento esaustivo di 65 candidati Safe-Delete (26 stub 0B, 1 duplicato monolitico 33KB `Senza nome.md`, 38 asset non referenziati) nella Sezione 2. Verifica 0 broken wikilinks tramite `check_links.py` (245 link validati). |
| `31da8bc` | 2026-09-30 11:35:00 UTC | feat: enrich frontmatter with hierarchical taxonomy and draft flags | `content/**` (155 file) | Applicato `draft: true` a 42 `index.md` di sottocartella e a 12 note in `content/TEMP/` (54 note rimosse dai draft in Quartz). Preservata rigorosamente la home page `content/index.md` come non-draft. Corretto delimitatore YAML malformato (`--` -> `---`) su 6 file `index.md`. Arricchite tutte le 101 note di contenuto non-draft con tassonomia gerarchica a due assi (`tags: [materia/argomento, tipologia/concetto]`). Censiti 56 tag gerarchici distinti con 0 tag orfani. Validati con successo `check_tags.py` (100% conformità), `check_links.py` (0 link rotti) e build Quartz (574 file emessi, 54 draft filtrati, 0 errori fatali). |


*(Nota: Ogni milestone successiva aggiungerà le proprie azioni registrando il relativo hash di commit, file modificati e descrizione delle trasformazioni effettuate).*

---

## 2. Procedura Safe-Delete (Candidati all'Eliminazione)

In conformità ai requisiti di integrità e sicurezza del vault (R4), **nessun file viene cancellato direttamente**. Tutti gli elementi ridondanti, vuoti (stub a 0 byte), duplicati o non utilizzati restano al loro posto nel file system e vengono censiti nella tabella sottostante con motivazione tecnica, analisi dei collegamenti entranti (backlinks) e contenuto, in attesa di revisione e approvazione finale dell'utente.

### 2.1 File Vuoti Segnaposto (0 Byte Stub) — 26 file
Tutti i file seguenti hanno dimensione pari a 0 byte e contano 0 backlinks entranti nell'intero vault:

| File Path | Tipologia / Contenuto | Dimensione | Backlinks | Motivazione Tecnica |
|---|---|---|---|---|
| `content/Informatica/Cpp/Gli array.md` | File vuoto (0 byte) | 0 B | 0 | Stub segnaposto creato senza contenuto né collegamenti entranti |
| `content/Informatica/Cpp/Le funzioni e procedure.md` | File vuoto (0 byte) | 0 B | 0 | Stub segnaposto creato senza contenuto né collegamenti entranti |
| `content/Informatica/Cpp/Puntatori.md` | File vuoto (0 byte) | 0 B | 0 | Stub segnaposto creato senza contenuto né collegamenti entranti |
| `content/Informatica/Cpp/Teoria/Caratteristiche.md` | File vuoto (0 byte) | 0 B | 0 | Stub segnaposto creato senza contenuto né collegamenti entranti |
| `content/Inglese/Certificazione Inglese/Competenze richieste per ogni livello.md` | File vuoto (0 byte) | 0 B | 0 | Stub segnaposto creato senza contenuto né collegamenti entranti |
| `content/Inglese/Certificazione Inglese/Cosa devi fare nella prova.md` | File vuoto (0 byte) | 0 B | 0 | Stub segnaposto creato senza contenuto né collegamenti entranti |
| `content/Inglese/Certificazione Inglese/Introduzione.md` | File vuoto (0 byte) | 0 B | 0 | Stub segnaposto creato senza contenuto né collegamenti entranti |
| `content/Inglese/Certificazione Inglese/Listening/Strategie/For multiple choice 1.md` | File vuoto (0 byte) | 0 B | 0 | Stub segnaposto creato senza contenuto né collegamenti entranti |
| `content/Inglese/Certificazione Inglese/Listening/Strategie/For multiple choice 2.md` | File vuoto (0 byte) | 0 B | 0 | Stub segnaposto creato senza contenuto né collegamenti entranti |
| `content/Inglese/Certificazione Inglese/Listening/Strategie/For multiple matching.md` | File vuoto (0 byte) | 0 B | 0 | Stub segnaposto creato senza contenuto né collegamenti entranti |
| `content/Inglese/Certificazione Inglese/Listening/Strategie/For text or sentence completion.md` | File vuoto (0 byte) | 0 B | 0 | Stub segnaposto creato senza contenuto né collegamenti entranti |
| `content/Inglese/Certificazione Inglese/Reading/Strategie/For multiple matching.md` | File vuoto (0 byte) | 0 B | 0 | Stub segnaposto creato senza contenuto né collegamenti entranti |
| `content/Inglese/Certificazione Inglese/Reading/Strategie/For multiple-choice gap-fill.md` | File vuoto (0 byte) | 0 B | 0 | Stub segnaposto creato senza contenuto né collegamenti entranti |
| `content/Inglese/Certificazione Inglese/Reading/Strategie/For open gap-fill.md` | File vuoto (0 byte) | 0 B | 0 | Stub segnaposto creato senza contenuto né collegamenti entranti |
| `content/Inglese/Certificazione Inglese/Reading/Strategie/For reading and multiple-choice comprehension.md` | File vuoto (0 byte) | 0 B | 0 | Stub segnaposto creato senza contenuto né collegamenti entranti |
| `content/Inglese/Certificazione Inglese/Reading/Strategie/For reading and text comprehension.md` | File vuoto (0 byte) | 0 B | 0 | Stub segnaposto creato senza contenuto né collegamenti entranti |
| `content/Inglese/Certificazione Inglese/Reading/Strategie/For trasformation with key word.md` | File vuoto (0 byte) | 0 B | 0 | Stub segnaposto creato senza contenuto né collegamenti entranti |
| `content/Inglese/Certificazione Inglese/Reading/Strategie/For word formation gap-fill.md` | File vuoto (0 byte) | 0 B | 0 | Stub segnaposto creato senza contenuto né collegamenti entranti |
| `content/Inglese/Certificazione Inglese/Reading/Strategie/Strategies for each gap.md` | File vuoto (0 byte) | 0 B | 0 | Stub segnaposto creato senza contenuto né collegamenti entranti |
| `content/Inglese/Certificazione Inglese/Speaking/Senza nome.md` | File vuoto (0 byte) | 0 B | 0 | Stub segnaposto creato senza contenuto né collegamenti entranti |
| `content/Inglese/Certificazione Inglese/Speaking/Strategie/For only you.md` | File vuoto (0 byte) | 0 B | 0 | Stub segnaposto creato senza contenuto né collegamenti entranti |
| `content/Inglese/Certificazione Inglese/Speaking/Strategie/For you and candidate 2.md` | File vuoto (0 byte) | 0 B | 0 | Stub segnaposto creato senza contenuto né collegamenti entranti |
| `content/Inglese/Certificazione Inglese/Speaking/Strategie/For you and the interviewer.md` | File vuoto (0 byte) | 0 B | 0 | Stub segnaposto creato senza contenuto né collegamenti entranti |
| `content/Inglese/Certificazione Inglese/Speaking/Strategie/For you, candidate 2 and the interviewer.md` | File vuoto (0 byte) | 0 B | 0 | Stub segnaposto creato senza contenuto né collegamenti entranti |
| `content/Sistemi e reti/Modello ISO-OSI/Collegamenti LAN e MAN.md` | File vuoto (0 byte) | 0 B | 0 | Stub segnaposto creato senza contenuto né collegamenti entranti |
| `content/Sistemi e reti/Modello ISO-OSI/Standard basi cablaggio.md` | File vuoto (0 byte) | 0 B | 0 | Stub segnaposto creato senza contenuto né collegamenti entranti |

### 2.2 Note Duplicate Monolitiche — 1 file
Note che replicano integralmente note già suddivise e strutturate:

| File Path | Tipologia / Contenuto | Dimensione | Backlinks | Motivazione Tecnica |
|---|---|---|---|---|
| `content/Informatica/HTML/html/Senza nome.md` | Guida HTML monolitica (1.234 righe) | 32.3 KB (33.115 B) | 0 | Duplicato integrale delle 10 note modulari split (`1 Struttura Base HTML.md` .. `10 Attributi HTML.md`). Conserva 165 ancore interne obsolete |

### 2.3 Asset Orfani e Temporanei — 38 file
Documenti PDF di staging non referenziati (17 file), screenshot temporanei (6 file) e immagini orfane (15 file):

| File Path | Tipologia / Contenuto | Dimensione | Backlinks | Motivazione Tecnica |
|---|---|---|---|---|
| `content/TEMP/Sistemi e reti/architettura e funzionamento del computer .pdf` | Dispensa PDF originale (staging) | 1006.1 KB | 0 | Bozza di studio/dispensa non referenziata dalle note attive |
| `content/TEMP/Sistemi e reti/automa ricomoscitore di sequenze moore.pdf` | Dispensa PDF originale (staging) | 541.3 KB | 0 | Bozza di studio/dispensa non referenziata dalle note attive |
| `content/TEMP/Sistemi e reti/diagramma degli Stati 2.pdf` | Dispensa PDF originale (staging) | 1.32 MB | 0 | Bozza di studio/dispensa non referenziata dalle note attive |
| `content/TEMP/Sistemi e reti/i segnali.pdf` | Dispensa PDF originale (staging) | 1.84 MB | 0 | Bozza di studio/dispensa non referenziata dalle note attive |
| `content/TEMP/Sistemi e reti/I sistemi .pdf` | Dispensa PDF originale (staging) | 4.08 MB | 0 | Bozza di studio/dispensa non referenziata dalle note attive |
| `content/TEMP/Sistemi e reti/il canale di comunicazione .pdf` | Dispensa PDF originale (staging) | 3.35 MB | 0 | Bozza di studio/dispensa non referenziata dalle note attive |
| `content/TEMP/Sistemi e reti/le porte logiche.pdf` | Dispensa PDF originale (staging) | 2.19 MB | 0 | Bozza di studio/dispensa non referenziata dalle note attive |
| `content/TEMP/Sistemi e reti/le proprieta dei sistemi .pdf` | Dispensa PDF originale (staging) | 4.41 MB | 0 | Bozza di studio/dispensa non referenziata dalle note attive |
| `content/TEMP/Sistemi e reti/reti informatiche .pdf` | Dispensa PDF originale (staging) | 1.20 MB | 0 | Bozza di studio/dispensa non referenziata dalle note attive |
| `content/TEMP/Sistemi e reti/riconoscitore sequenze concatenato e non .pdf` | Dispensa PDF originale (staging) | 4.03 MB | 0 | Bozza di studio/dispensa non referenziata dalle note attive |
| `content/TEMP/Sistemi e reti/Scenario tipico_957d11691b6881a2ad522dbb63dcd020.pdf` | Dispensa PDF originale (staging) | 1.40 MB | 0 | Bozza di studio/dispensa non referenziata dalle note attive |
| `content/TEMP/Sistemi e reti/tabella di transizione e trasformazione  ef3  2.pdf` | Dispensa PDF originale (staging) | 882.8 KB | 0 | Bozza di studio/dispensa non referenziata dalle note attive |
| `content/TEMP/TEMPT2/Immagine 2026-09-29 194220.png` | Screenshot PNG temporaneo | 309.5 KB | 0 | Cattura schermo provvisoria non inclusa in alcuna nota |
| `content/TEMP/TEMPT2/Immagine 2026-09-29 194251.png` | Screenshot PNG temporaneo | 312.9 KB | 0 | Cattura schermo provvisoria non inclusa in alcuna nota |
| `content/TEMP/TEMPT2/Immagine 2026-09-29 194309.png` | Screenshot PNG temporaneo | 253.6 KB | 0 | Cattura schermo provvisoria non inclusa in alcuna nota |
| `content/TEMP/TEMPT2/Immagine 2026-09-29 194326.png` | Screenshot PNG temporaneo | 306.4 KB | 0 | Cattura schermo provvisoria non inclusa in alcuna nota |
| `content/TEMP/TEMPT2/Immagine 2026-09-29 194349.png` | Screenshot PNG temporaneo | 280.8 KB | 0 | Cattura schermo provvisoria non inclusa in alcuna nota |
| `content/TEMP/TEMPT2/Immagine 2026-09-29 194405.png` | Screenshot PNG temporaneo | 152.1 KB | 0 | Cattura schermo provvisoria non inclusa in alcuna nota |
| `content/TEMP/TPSIT/compiti  2025-10-13 12-10-05.pdf` | Scansione PDF compiti (staging) | 3.42 MB | 0 | Scansione compiti scolastici non referenziata nel vault |
| `content/TEMP/TPSIT/compiti  2025-12-15 12-06-03.pdf` | Scansione PDF compiti (staging) | 687.9 KB | 0 | Scansione compiti scolastici non referenziata nel vault |
| `content/TEMP/TPSIT/compiti  2026-02-06 12-56-58.pdf` | Scansione PDF compiti (staging) | 7.44 MB | 0 | Scansione compiti scolastici non referenziata nel vault |
| `content/TEMP/TPSIT/compiti  2026-02-16 11-12-40.pdf` | Scansione PDF compiti (staging) | 6.99 MB | 0 | Scansione compiti scolastici non referenziata nel vault |
| `content/TEMP/TPSIT/compiti  2026-02-20 13-22-50 2.pdf` | Scansione PDF compiti (staging) | 7.97 MB | 0 | Scansione compiti scolastici non referenziata nel vault |
| `content/Zimmagini/math_coniche.png` | Grafico matematico ausiliario | 75.4 KB | 0 | Illustrazione generata non referenziata nelle note di Matematica |
| `content/Zimmagini/math_diseq.png` | Grafico matematico ausiliario | 60.4 KB | 0 | Illustrazione generata non referenziata nelle note di Matematica |
| `content/Zimmagini/math_gonio.png` | Grafico matematico ausiliario | 54.4 KB | 0 | Illustrazione generata non referenziata nelle note di Matematica |
| `content/Zimmagini/math_retta.png` | Grafico matematico ausiliario | 41.4 KB | 0 | Illustrazione generata non referenziata nelle note di Matematica |
| `content/Zimmagini/Pasted image 20260407225839.png` | Immagine incollata legacy (appunti) | 51.4 KB | 0 | Asset residuo non linkato in alcuna nota pubblicata |
| `content/Zimmagini/Pasted image 20260504233634.png` | Immagine incollata legacy (appunti) | 46.2 KB | 0 | Asset residuo non linkato in alcuna nota pubblicata |
| `content/Zimmagini/Pasted image 20260504233648.png` | Immagine incollata legacy (appunti) | 37.5 KB | 0 | Asset residuo non linkato in alcuna nota pubblicata |
| `content/Zimmagini/Pasted image 20260504233706.png` | Immagine incollata legacy (appunti) | 23.7 KB | 0 | Asset residuo non linkato in alcuna nota pubblicata |
| `content/Zimmagini/Pasted image 20260504234116.png` | Immagine incollata legacy (appunti) | 84.7 KB | 0 | Asset residuo non linkato in alcuna nota pubblicata |
| `content/Zimmagini/Pasted image 20260504234206.jpg` | Immagine incollata legacy (appunti) | 76.1 KB | 0 | Asset residuo non linkato in alcuna nota pubblicata |
| `content/Zimmagini/Pasted image 20260504234351.jpg` | Immagine incollata legacy (appunti) | 64.3 KB | 0 | Asset residuo non linkato in alcuna nota pubblicata |
| `content/Zimmagini/Pasted image 20260504234630.png` | Immagine incollata legacy (appunti) | 60.8 KB | 0 | Asset residuo non linkato in alcuna nota pubblicata |
| `content/Zimmagini/Pasted image 20260512122939.png` | Immagine incollata legacy (appunti) | 128.6 KB | 0 | Asset residuo non linkato in alcuna nota pubblicata |
| `content/Zimmagini/Pasted image 20260518102217.png` | Immagine incollata legacy (appunti) | 84.7 KB | 0 | Asset residuo non linkato in alcuna nota pubblicata |
| `content/Zimmagini/Pasted image 20260518102242.jpg` | Immagine incollata legacy (appunti) | 76.1 KB | 0 | Asset residuo non linkato in alcuna nota pubblicata |


---

## 3. Stato della Verifica

Stato di conformità rispetto ai criteri di accettazione Quartz:

| Criterio di Verifica | Strumento di Controllo | Obiettivo | Stato Attuale | Note |
|---|---|---|---|---|
| **Integrità Wikilink** | `check_links.py` | 0 broken wikilinks | **Conforme (PASS)** | 245 link verificati, 0 link rotti (Exit code 0) |
| **Tassonomia Tag YAML** | `check_tags.py` | 100% file non-draft conformi | **Conforme (PASS)** | 101/101 note con tag gerarchici validi su 2 assi, 55 service/draft gestiti, 56 tag distinti (Exit code 0) |
| **Compilazione Quartz** | `node ./quartz/bootstrap-cli.mjs build` | 0 errori fatali | **Conforme (PASS)** | 156 file elaborati, 54 draft rimossi da remove-draft, 574 file emessi in public, 0 errori fatali (Exit code 0) |
| **Commit Atomici Git** | `git log --oneline` | Conventional commits | **Conforme (PASS)** | Commit granulari tracciati sul branch `refactor/quartz-prep` |
| **Remote Sync** | `git push origin refactor/quartz-prep` | Branch sincronizzato | **Conforme (PASS)** | Branch `refactor/quartz-prep` allineato con `origin` |
