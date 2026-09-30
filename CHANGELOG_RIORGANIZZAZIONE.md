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
| `[in-progress]` | 2026-09-30 11:15:00 UTC | chore: branch and changelog init | `CHANGELOG_RIORGANIZZAZIONE.md` | Inizializzazione branch `refactor/quartz-prep`, predisposizione registro modifiche, tabella Safe-Delete e matrice di verifica. |

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
| **Integrità Wikilink** | `check_links.py` | 0 broken wikilinks | In corso (T1/M2) | Nessun link rotto tollerato su tutto il vault |
| **Tassonomia Tag YAML** | `check_tags.py` | 100% file non-draft conformi | In corso (T1/M3) | Almeno 2 tag gerarchici (`materia/argomento`, `tipologia/concetto`) per nota |
| **Compilazione Quartz** | `node ./quartz/bootstrap-cli.mjs build` | 0 errori fatali | In corso (M4) | Validazione schema frontmatter e parsing AST |
| **Commit Atomici Git** | `git log --oneline` | Conventional commits | Conforme (M1) | Commit granulari tracciati sul branch `refactor/quartz-prep` |
| **Remote Sync** | `git push origin refactor/quartz-prep` | Branch sincronizzato | Conforme (M1) | Push automatico su remote repository |
