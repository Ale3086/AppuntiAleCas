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

*(Nota: Ogni milestone successiva aggiungerà le proprie azioni registrando il relativo hash di commit, file modificati e descrizione delle trasformazioni effettuate).*

---

## 2. Procedura Safe-Delete (Candidati all'Eliminazione)

In conformità ai requisiti di integrità e sicurezza del vault, **nessun file viene cancellato direttamente**. Tutti gli elementi ridondanti, vuoti (stub a 0 byte), duplicati o non utilizzati vengono censiti nella tabella sottostante con motivazione tecnica, analisi dei collegamenti entranti (backlinks) e contenuto, in attesa di revisione e approvazione finale.

| File Path | Tipologia / Contenuto | Dimensione | Backlinks | Motivazione Tecnica |
|---|---|---|---|---|
| *(In fase di censimento da parte del modulo M2)* | | | | |

### Categorie di Safe-Delete identificate:
1. **Stub a 0 byte**: File markdown vuoti creati accidentalmente o come segnaposto privi di contenuto.
2. **Duplicati monolitici**: File unici che replicano integralmente note già suddivise e strutturate (es. `Senza nome.md`).
3. **Asset orfani / temporanei**: Risorse grafiche o bozze non referenziate né necessarie alla consultazione.

---

## 3. Stato della Verifica

Stato di conformità rispetto ai criteri di accettazione Quartz:

| Criterio di Verifica | Strumento di Controllo | Obiettivo | Stato Attuale | Note |
|---|---|---|---|---|
| **Integrità Wikilink** | `check_links.py` | 0 broken wikilinks | **Conforme (PASS)** | 244 link verificati, 0 link rotti (Exit code 0) |
| **Tassonomia Tag YAML** | `check_tags.py` | 100% file non-draft conformi | **Pronto per M3 (Atteso FAIL)** | 55 service/draft identificati; 101 note prive di tag gerarchici rilevate (Exit code 1) |
| **Compilazione Quartz** | `node ./quartz/bootstrap-cli.mjs build` | 0 errori fatali | **Conforme (PASS)** | Validazione schema frontmatter e parsing AST (552 file generati) |
| **Commit Atomici Git** | `git log --oneline` | Conventional commits | **Conforme (PASS)** | Commit granulari tracciati sul branch `refactor/quartz-prep` |
| **Remote Sync** | `git push origin refactor/quartz-prep` | Branch sincronizzato | **Conforme (PASS)** | Branch `refactor/quartz-prep` allineato con `origin` |
