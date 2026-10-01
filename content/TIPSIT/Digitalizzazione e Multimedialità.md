---
title: Digitalizzazione e MultimedialitÃ 
description: Dalla teoria dei segnali alla conversione analogico-digitale, digitalizzazione delle immagini raster, modelli di colore, calcolo del peso, grafica vettoriale e video digitale.
---

# ðŸŒ Digitalizzazione e MultimedialitÃ  (Segnali, Immagini e Video)

Benvenuto nel modulo dedicato alla **Rappresentazione Digitale dei Dati Multimediali**. In questo percorso didattico esploreremo come i segnali continui del mondo fisico (onde sonore, luce, scene reali) vengono trasformati in flussi binari numerici, come nascono e si memorizzano le immagini statiche e vettoriali, e come le tecnologie video moderne consentono lo streaming di filmati ad altissima definizione.

---

## ðŸ—ºï¸ Mappa Concettuale Generale del Percorso

```mermaid
flowchart TD
    MOD["ðŸŒ TRASFORMAZIONE DIGITALE DEI MEDIA"]
    
    MOD --> L1["ðŸ“¡ 1. Teoria dei Segnali & ADC<br/>â€¢ Segnali analogici vs digitali<br/>â€¢ Campionamento (tempo X) e Nyquist-Shannon<br/>â€¢ Quantizzazione (ampiezza Y) ed errore<br/>â€¢ Codifica binaria (N bit = 2^N livelli)"]
    
    MOD --> L2["ðŸŽ¨ 2. Digitalizzazione Immagini & Colori<br/>â€¢ Raster vs Vettoriale<br/>â€¢ Pixel e raster scan<br/>â€¢ ProfonditÃ  di colore (1, 8, 24 bit)<br/>â€¢ Sintesi Additiva RGB vs Sottrattiva CMYK<br/>â€¢ Palette indicizzata (CLUT a 256 colori)"]
    
    MOD --> L3["ðŸ“ 3. Caratteristiche Raster & Compressione<br/>â€¢ Definizione vs Risoluzione (PPI/DPI)<br/>â€¢ Dimensione fisica e stampa<br/>â€¢ Formule di calcolo del peso in Byte/MB<br/>â€¢ Formati raster (BMP, JPEG, PNG, GIF, TIFF)<br/>â€¢ Compressione Lossless (RLE) vs Lossy (JPEG)"]
    
    MOD --> L4["ðŸŽ¬ 4. Grafica Vettoriale & Video<br/>â€¢ Primitive geometriche e scalabilitÃ  infinita<br/>â€¢ Rasterizzazione e formati (SVG, AI, CAD, EPS)<br/>â€¢ Video digitale: persistenza visiva e FPS<br/>â€¢ Calcolo peso video non compresso<br/>â€¢ Codec (H.264, H.265, AV1) vs Contenitore (MP4, MKV)"]
    
    MOD --> RIP["ðŸŽ¯ Sintesi, Formulario & Glossario<br/>â€¢ Mappa riassuntiva unificata<br/>â€¢ Formulario rapido di calcolo<br/>â€¢ Glossario completo delle parole chiave"]
```

---

## ðŸ“š Indice Dettagliato delle Lezioni

1. [[1. Teoria dei Segnali e Conversione Analogico-Digitale|ðŸ“¡ Lezione 1: Teoria dei Segnali e Conversione Analogico-Digitale (ADC)]]
   - Natura dei segnali fisici: analogico vs discreto, continuo vs campionato.
   - I tre passi dell'ADC: **Campionamento** (asse X), **Quantizzazione** (asse Y), **Codifica** (bit).
   - Il Teorema di Nyquist-Shannon ($f_c \ge 2 f_{\max}$) e l'aliasing.
   - Calcolo combinatorio e livelli di quantizzazione ($L = 2^N$).

2. [[2. Digitalizzazione delle Immagini e Modelli di Colore|ðŸŽ¨ Lezione 2: Digitalizzazione delle Immagini e Modelli di Colore]]
   - Confronto strutturale tra immagini Raster (matrici di pixel) e Vettoriali (formule geometriche).
   - Fasi della digitalizzazione: campionamento spaziale, quantizzazione del colore e lettura raster.
   - ProfonditÃ  di colore: immagini binarie, scala di grigi, True Color a 24 bit.
   - I modelli di colore: **RGB** per schermi luminosi e **CMYK** per la stampa su carta.
   - La tavolozza dei colori (**Palette Indicizzata**) per risparmiare memoria (formato GIF).

3. [[3. Caratteristiche Raster, Calcolo del Peso e Compressione|ðŸ“ Lezione 3: Caratteristiche Raster, Calcolo del Peso e Compressione]]
   - Definizione ($b \times h$ pixel) vs Risoluzione spaziale (PPI / DPI) vs Dimensione fisica di stampa.
   - Formule complete per il calcolo del peso in Byte e MegaByte (con e senza palette).
   - Panoramica comparativa dei formati file raster: BMP, JPEG, PNG, GIF, TIFF, RAW, WebP.
   - Tecniche di compressione dati: **Lossless** senza perdita (algoritmo RLE) vs **Lossy** con perdita (modello psicovisivo JPEG).

4. [[4. Grafica Vettoriale e Video Digitale|ðŸŽ¬ Lezione 4: Grafica Vettoriale e Video Digitale]]
   - Elementi della grafica vettoriale: primitive, equazioni e scalabilitÃ  infinita priva di sgranature.
   - Il processo di rasterizzazione e i formati standard (SVG per il web, AI, DXF/DWG per il CAD, EPS).
   - Il video digitale: persistenza retinica, Frame e Frame Rate (FPS).
   - Dimostrazione del peso enorme di un video non compresso.
   - Compressione video (ridondanza intra-frame e inter-frame: I, P, B frame).
   - Differenza cruciale tra **CODEC** (H.264, H.265/HEVC, VP9, AV1) e **CONTENITORE** (MP4, MKV, WebM, AVI).

5. [[Sintesi e Mappa Concettuale|ðŸŽ¯ Sintesi, Formulario Rapido e Mappa Concettuale]]
   - Tavola sinottica e formulario con tutte le equazioni per le verifiche.
   - Glossario completo di tutti i termini tecnici specialistici.

