const fs = require('fs');
const path = require('path');

const VAULT_ROOT = "c:\\Users\\Utente\\Downloads\\obsidian\\CasetiObsidian\\Caseti";
const CONTENT_ROOT = path.join(VAULT_ROOT, "AppuntiAleCas", "content");
const OLD_ZIMG = path.join(CONTENT_ROOT, "Zimmagini");

// Helper to ensure dir exists
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
}

// Helper to move file safely
function moveFile(src, destDir) {
  ensureDir(destDir);
  const fileName = path.basename(src);
  const dest = path.join(destDir, fileName);
  fs.copyFileSync(src, dest);
  fs.unlinkSync(src);
  console.log(`Moved: ${fileName} -> ${path.relative(VAULT_ROOT, dest)}`);
}

// 1. DELETE UNWANTED / ZERO-BYTE FILES IN VAULT_ROOT
const toDelete = [
  'Pasted image 20261016104925.png',
  'Pasted image 20261016104930.png',
  'Pasted image 20261020102237.png',
  'dipendenza.png',
  'Pasted image 20261016111615.png',
  'Pasted image 20261016111623.png'
];

console.log("\n=== STEP 1: DELETING UNWANTED ROOT FILES ===");
for (const file of toDelete) {
  const full = path.join(VAULT_ROOT, file);
  if (fs.existsSync(full)) {
    fs.unlinkSync(full);
    console.log(`Deleted: ${file}`);
  }
}

// 2. MOVE SCATTERED ROOT IMAGES TO RESPECTIVE FOLDERS
console.log("\n=== STEP 2: MOVING ROOT IMAGES TO MODULE ZIMMAGINI ===");

const rootModelloImages = [
  'Pasted image 20261018223947.png',
  'Pasted image 20261018224241.png',
  'Pasted image 20261018224408.png',
  'Pasted image 20261018224532.png',
  'Pasted image 20261018224931.png',
  'Pasted image 20261018230507.png',
  'Pasted image 20261018230756.png',
  'Pasted image 20261018231051.png',
  'Pasted image 20261018231443.png',
  'Pasted image 20261018231938.png',
  'Pasted image 20261021120934.png',
  'Pasted image 20261021121257.png',
  'Pasted image 20261021123237.png',
  'Pasted image 20261021123546.png',
  'Pasted image 20261021123851.png',
  'Pasted image 20261021124104.png',
  'Pasted image 20261021124554.png',
  'Pasted image 20261021125748.png',
  'Pasted image 20261021130008.png',
  'Pasted image 20261021130224.png',
  'Pasted image 20261021131403.png',
  'Pasted image 20261021132220.png'
];

const destModello = path.join(CONTENT_ROOT, "Sistemi e reti", "Modello ISO-OSI", "Zimmagini");
for (const img of rootModelloImages) {
  const full = path.join(VAULT_ROOT, img);
  if (fs.existsSync(full)) {
    moveFile(full, destModello);
  }
}

const rootJavaImages = [
  'Pasted image 20261020093904.png',
  'Pasted image 20261020094228.png',
  'Pasted image 20261020100802.png',
  'Pasted image 20261020102301.png',
  'Pasted image 20261020103245.png',
  'Pasted image 20261020110236.png',
  'Pasted image 20261020110443.png',
  'Pasted image 20261020110518.png',
  'Pasted image 20261020110558.png',
  'Pasted image 20261020110640.png'
];

const destJava = path.join(CONTENT_ROOT, "Informatica", "Java", "Zimmagini");
for (const img of rootJavaImages) {
  const full = path.join(VAULT_ROOT, img);
  if (fs.existsSync(full)) {
    moveFile(full, destJava);
  }
}

// 3. MOVE IMAGES FROM content/Zimmagini TO RESPECTIVE MODULE FOLDERS
console.log("\n=== STEP 3: MIGRATING content/Zimmagini TO MODULE ZIMMAGINI ===");

const destMatematica = path.join(CONTENT_ROOT, "Matematica", "Zimmagini");
const destIngleseTeoria = path.join(CONTENT_ROOT, "Inglese", "Teoria", "Zimmagini");
const destInfC = path.join(CONTENT_ROOT, "Informatica", "C", "Zimmagini");
const destInfCpp = path.join(CONTENT_ROOT, "Informatica", "Cpp", "Zimmagini");
const destInfCppSorting = path.join(CONTENT_ROOT, "Informatica", "Cpp", "Teoria", "Algoritmi di ordinamento", "Zimmagini");
const destSistemiCablaggio = path.join(CONTENT_ROOT, "Sistemi e reti", "Cablaggio strutturato", "Zimmagini");

const mapping = {
  // Matematica
  "coniche_es1_parabola.png": destMatematica,
  "coniche_es2_circonferenza.png": destMatematica,
  "coniche_es3_parabola_orizz.png": destMatematica,
  "coniche_es4_intersezioni.png": destMatematica,
  "diseq_es1_esterni.png": destMatematica,
  "diseq_es2_interni.png": destMatematica,
  "diseq_es3_fratta.png": destMatematica,
  "ellisse_es1.png": destMatematica,
  "gonio_es1_circonferenza.png": destMatematica,
  "gonio_es2_equazione.png": destMatematica,
  "iperbole_es1.png": destMatematica,
  "omografica_es1.png": destMatematica,
  "retta_es1_disegno.png": destMatematica,
  "retta_es2_parallele.png": destMatematica,
  "retta_es3_perpendicolari.png": destMatematica,
  "retta_es4_2punti.png": destMatematica,
  "math_coniche.png": destMatematica,
  "math_diseq.png": destMatematica,
  "math_gonio.png": destMatematica,
  "math_retta.png": destMatematica,

  // Inglese Teoria (Verb Tenses)
  "1744639012_Present-Simple-or-Simple-Present-Tense-Chart-Table-Structure-or-Form-Examples-scaled.webp": destIngleseTeoria,
  "Pasted image 20260712220130.jpg": destIngleseTeoria,
  "Pasted image 20260712220155.jpg": destIngleseTeoria,
  "Pasted image 20260712220218.jpg": destIngleseTeoria,
  "Pasted image 20260713134902.jpg": destIngleseTeoria,
  "Pasted image 20260713134922.png": destIngleseTeoria,
  "Pasted image 20260713134939.jpg": destIngleseTeoria,
  "Pasted image 20260713134954.jpg": destIngleseTeoria,
  "Pasted image 20260713135019.jpg": destIngleseTeoria,
  "Pasted image 20260713135038.jpg": destIngleseTeoria,
  "Pasted image 20260713135419.jpg": destIngleseTeoria,
  "Pasted image 20260713135432.jpg": destIngleseTeoria,
  "Pasted image 20260713135458.png": destIngleseTeoria,

  // Informatica C
  "Pasted image 20260504233634.png": destInfC,
  "Pasted image 20260504233648.png": destInfC,
  "Pasted image 20260504233706.png": destInfC,
  "Pasted image 20260504234630.png": destInfC,
  "Pasted image 20260504234116.png": destInfC,
  "Pasted image 20260504234206.jpg": destInfC,
  "Pasted image 20260504234351.jpg": destInfC,

  // Informatica Cpp
  "Pasted image 20260518102217.png": destInfCpp,
  "Pasted image 20260518102242.jpg": destInfCpp,
  "Pasted image 20260512122939.png": destInfCpp,

  // Informatica Cpp Sorting anims
  "Sorting_bubblesort_anim.gif": destInfCppSorting,
  "Sorting_insertion_sort_anim.gif": destInfCppSorting,
  "Sorting_selection_sort_anim.gif": destInfCppSorting,

  // Sistemi e reti - Cablaggio strutturato
  "out1.gif": destSistemiCablaggio,
  "Pasted image 20260519122120.png": destSistemiCablaggio,
  "Pasted image 20260519122221.png": destSistemiCablaggio,

  // Sistemi e reti - Modello ISO-OSI
  "Topologia-reti-informatiche-750x600.webp": destModello,
  "WhatsApp Image 2026-04-21 at 12.37.18.jpeg": destModello,
  "WhatsApp Image 2026-04-21 at 12.43.12.jpeg": destModello,
  "WhatsApp Image 2026-04-21 at 12.58.22.jpeg": destModello,
  "Pasted image 20260428131702.png": destModello,
  "Pasted image 20260428132317.png": destModello,
  "Pasted image 20260428183244.png": destModello,
  "Pasted image 20260428183553.png": destModello,
  "Pasted image 20260428183829.png": destModello,
  "Pasted image 20260519123209.png": destModello,
  "Pasted image 20260520162338.png": destModello,
  "Pasted image 20260520163914.jpg": destModello,
  "Pasted image 20260520164836.png": destModello,
  "Pasted image 20260407225839.png": destModello,
  "Pasted image 20260421124803.png": destModello,
  "Pasted image 20260428132224.png": destModello,
  "Pasted image 20260428132950.png": destModello,
  "Pasted image 20260428183441.png": destModello
};

if (fs.existsSync(OLD_ZIMG)) {
  const oldFiles = fs.readdirSync(OLD_ZIMG);
  for (const f of oldFiles) {
    const src = path.join(OLD_ZIMG, f);
    if (mapping[f]) {
      moveFile(src, mapping[f]);
    } else {
      console.warn(`Unmapped file in Zimmagini: ${f}, moving to default content Zimmagini`);
    }
  }

  // Remove OLD_ZIMG if empty
  const remaining = fs.readdirSync(OLD_ZIMG);
  if (remaining.length === 0) {
    fs.rmdirSync(OLD_ZIMG);
    console.log(`Deleted empty folder: ${OLD_ZIMG}`);
  } else {
    console.warn(`Folder not empty, remaining files:`, remaining);
  }
}

// 4. CONFIGURE OBSIDIAN app.json
console.log("\n=== STEP 4: UPDATING OBSIDIAN app.json ===");
const appJsonPath = path.join(VAULT_ROOT, ".obsidian", "app.json");
if (fs.existsSync(appJsonPath)) {
  const appConfig = JSON.parse(fs.readFileSync(appJsonPath, 'utf8'));
  appConfig.attachmentFolderPath = "./Zimmagini";
  fs.writeFileSync(appJsonPath, JSON.stringify(appConfig, null, 2), 'utf8');
  console.log("Updated .obsidian/app.json with attachmentFolderPath = './Zimmagini'");
}

console.log("\n=== IMAGE REORGANIZATION COMPLETE ===");
