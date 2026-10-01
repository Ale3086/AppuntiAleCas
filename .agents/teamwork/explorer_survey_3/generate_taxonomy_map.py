import os
import re
from pathlib import Path

CONTENT_DIR = Path(r"c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas\content")

def classify_note(rel_path):
    p = Path(rel_path)
    stem = p.stem
    parent = p.parent.as_posix()
    
    # 1. Draft check
    is_index = p.name.lower() == "index.md"
    in_temp = rel_path.startswith("TEMP/")
    is_draft = is_index or in_temp
    
    materia_tag = None
    tipologia_tag = None
    extra_tags = []
    
    # Classification rules
    if rel_path.startswith("Informatica/Cpp/Librerie/"):
        materia_tag = "informatica/cpp/librerie"
        tipologia_tag = "tipologia/reference"
    elif rel_path.startswith("Informatica/Cpp/Teoria/Algoritmi di ordinamento/"):
        materia_tag = "informatica/cpp/algoritmi"
        tipologia_tag = "tipologia/algoritmo"
    elif rel_path.startswith("Informatica/Cpp/Teoria/"):
        materia_tag = "informatica/cpp/teoria"
        tipologia_tag = "tipologia/teoria"
    elif rel_path.startswith("Informatica/Cpp/"):
        materia_tag = "informatica/cpp/sintassi"
        tipologia_tag = "tipologia/reference"
    elif rel_path.startswith("Informatica/HTML/html/"):
        materia_tag = "informatica/web/html"
        tipologia_tag = "tipologia/reference"
    elif rel_path.startswith("Informatica/HTML/javaScript/"):
        materia_tag = "informatica/web/javascript"
        tipologia_tag = "tipologia/reference"
    elif rel_path.startswith("Inglese/Cerificazione Inglese/Listening/"):
        materia_tag = "inglese/certificazione/listening"
        tipologia_tag = "tipologia/strategie"
    elif rel_path.startswith("Inglese/Cerificazione Inglese/Reading/"):
        materia_tag = "inglese/certificazione/reading"
        tipologia_tag = "tipologia/strategie"
    elif rel_path.startswith("Inglese/Cerificazione Inglese/Speaking/"):
        materia_tag = "inglese/certificazione/speaking"
        tipologia_tag = "tipologia/strategie"
    elif rel_path.startswith("Inglese/Cerificazione Inglese/Writing/"):
        materia_tag = "inglese/certificazione/writing"
        tipologia_tag = "tipologia/strategie"
    elif rel_path.startswith("Inglese/Cerificazione Inglese/"):
        materia_tag = "inglese/certificazione/guida"
        tipologia_tag = "tipologia/guida-pratica"
    elif rel_path.startswith("Inglese/Teoria/"):
        materia_tag = "inglese/grammatica"
        tipologia_tag = "tipologia/teoria"
    elif rel_path.startswith("Inglese/Vocabulary/01. Personal Life/"):
        materia_tag = "inglese/vocabolario/personal-life"
        tipologia_tag = "tipologia/vocabolario"
    elif rel_path.startswith("Inglese/Vocabulary/02. Work and Education/"):
        materia_tag = "inglese/vocabolario/work-education"
        tipologia_tag = "tipologia/vocabolario"
    elif rel_path.startswith("Inglese/Vocabulary/03. Society and World/"):
        materia_tag = "inglese/vocabolario/society-world"
        tipologia_tag = "tipologia/vocabolario"
    elif rel_path.startswith("Inglese/Vocabulary/04. Leisure and Travel/"):
        materia_tag = "inglese/vocabolario/leisure-travel"
        tipologia_tag = "tipologia/vocabolario"
    elif rel_path.startswith("Inglese/Vocabulary/05. Word Formation/"):
        materia_tag = "inglese/vocabolario/word-formation"
        tipologia_tag = "tipologia/vocabolario"
    elif rel_path.startswith("Matematica/"):
        if "Retta" in stem or "Coniche" in stem or "Ellisse" in stem:
            materia_tag = "matematica/geometria-analitica"
        elif "Goniometria" in stem or "Trigonometria" in stem:
            materia_tag = "matematica/trigonometria"
        else:
            materia_tag = "matematica/algebra"
        tipologia_tag = "tipologia/esercizi"
    elif rel_path.startswith("Sistemi e reti/Cablaggio strutturato/"):
        materia_tag = "sistemi-e-reti/cablaggio"
        if "Normativa" in stem:
            tipologia_tag = "tipologia/teoria"
        elif "Topologia" in stem:
            materia_tag = "sistemi-e-reti/topologie"
            tipologia_tag = "tipologia/teoria"
        else:
            tipologia_tag = "tipologia/reference"
    elif rel_path.startswith("Sistemi e reti/Modello ISO-OSI/"):
        if "CISCO" in stem:
            materia_tag = "sistemi-e-reti/dispositivi"
            tipologia_tag = "tipologia/guida-pratica"
        elif "cavo" in stem or "crimpaggio" in stem:
            materia_tag = "sistemi-e-reti/cablaggio"
            tipologia_tag = "tipologia/guida-pratica"
        elif "Ethernet" in stem or "LAN" in stem:
            materia_tag = "sistemi-e-reti/topologie"
            tipologia_tag = "tipologia/teoria"
        else:
            materia_tag = "sistemi-e-reti/iso-osi"
            tipologia_tag = "tipologia/teoria"
    elif rel_path.startswith("TIPSIT/Digitalizzazione e Multimedialit"):
        materia_tag = "tipsit/multimedialita"
        if "Sintesi" in stem:
            tipologia_tag = "tipologia/sintesi"
        else:
            tipologia_tag = "tipologia/teoria"
    elif rel_path.startswith("TIPSIT/FileSystem/"):
        materia_tag = "tipsit/filesystem"
        tipologia_tag = "tipologia/guida-pratica"
    elif rel_path.startswith("TIPSIT/Operazioni coi binari e conversioni/"):
        materia_tag = "tipsit/numerazione-binaria"
        if "Operazioni" in stem:
            tipologia_tag = "tipologia/esercizi"
        else:
            tipologia_tag = "tipologia/teoria"
    elif rel_path.startswith("TIPSIT/Sistemi operativi/"):
        materia_tag = "tipsit/sistemi-operativi"
        tipologia_tag = "tipologia/teoria"
    elif rel_path.startswith("TIPSIT/Codici di sicurezza/"):
        materia_tag = "tipsit/sicurezza"
        tipologia_tag = "tipologia/teoria"
    elif rel_path.startswith("TEMP/Sistemi e reti/"):
        materia_tag = "sistemi-e-reti/temp"
        tipologia_tag = "tipologia/teoria"
    else:
        materia_tag = "generale"
        tipologia_tag = "tipologia/servizio"
        
    tags = [materia_tag, tipologia_tag] + extra_tags
    return is_draft, tags

all_md = sorted(CONTENT_DIR.rglob("*.md"))
print(f"Testing taxonomy on all {len(all_md)} markdown files...")

unclassified = []
taxonomy_counts = {}

for p in all_md:
    rel = p.relative_to(CONTENT_DIR).as_posix()
    is_draft, tags = classify_note(rel)
    if not is_draft:
        if not tags or any(t is None for t in tags):
            unclassified.append(rel)
        for t in tags:
            taxonomy_counts[t] = taxonomy_counts.get(t, 0) + 1

print(f"Unclassified content notes: {len(unclassified)}")
print("\nTaxonomy Tag Distribution across content notes:")
for t, c in sorted(taxonomy_counts.items(), key=lambda x: -x[1]):
    print(f"  {t}: {c}")
