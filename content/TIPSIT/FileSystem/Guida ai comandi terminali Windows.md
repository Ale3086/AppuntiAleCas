# Index
- [Comandi da Ricordare per Primi (CMD)](#Comandi%20da%20Ricordare%20per%20Primi%20(CMD))
- [Comandi PowerShell Fondamentali](#Comandi%20PowerShell%20Fondamentali)
- [Navigazione nel Terminale](#Navigazione%20nel%20Terminale)
- [Spostare e Rinominare](#Spostare%20e%20Rinominare)
- [Eliminare File e Cartelle](#Eliminare%20File%20e%20Cartelle)
- [Cercare File e Contenuti](#Cercare%20File%20e%20Contenuti)
- [Rete e Internet](#Rete%20e%20Internet)
- [Processi e Programmi](#Processi%20e%20Programmi)
- [Disco, Spazio e Partizioni](#Disco,%20Spazio%20e%20Partizioni)
- [Backup e Salvataggi](#Backup%20e%20Salvataggi)
- [Servizi Windows](#Servizi%20Windows)
- [Aprire Strumenti Windows](#Aprire%20Strumenti%20Windows)
- [⚠️ Comandi Pericolosi - Usare con Estrema Attenzione](#⚠️%20Comandi%20Pericolosi%20-%20Usare%20con%20Estrema%20Attenzione)
## Comandi da Ricordare per Primi (CMD)

|Comando|Esempio|Spiegazione|
|---|---|---|
|`cd`|`cd Desktop`|Cambiare cartella|
|`dir`|`dir`|Vedere file e cartelle|
|`mkdir`|`mkdir Backup`|Creare cartella|
|`copy`|`copy file.txt D:\Backup`|Copiare file|
|`move`|`move file.txt D:\Backup`|Spostare file|
|`ren`|`ren a.txt b.txt`|Rinominare file|
|`del`|`del file.txt`|Eliminare file|
|`rmdir`|`rmdir /s /q Cartella`|Eliminare cartella|
|`ipconfig`|`ipconfig`|Vedere IP|
|`ping`|`ping google.it`|Testare connessione|
|`net use`|`net use Z: \\PC\Cartella`|Collegare cartella di rete|
|`tasklist`|`tasklist`|Vedere processi|
|`taskkill`|`taskkill /IM excel.exe /F`|Chiudere processo|
|`robocopy`|`robocopy C:\Dati D:\Backup /E`|Fare copie robuste|
|`sfc`|`sfc /scannow`|Riparare file di sistema|
|`DISM`|`DISM /Online /Cleanup-Image /RestoreHealth`|Riparare immagine Windows|

## Comandi PowerShell Fondamentali

|Comando|Esempio|Spiegazione|
|---|---|---|
|`Get-ChildItem`|`Get-ChildItem`|Mostra file e cartelle|
|`Set-Location`|`Set-Location C:\Users`|Cambia cartella|
|`New-Item`|`New-Item prova.txt`|Crea un file|
|`New-Item -ItemType Directory`|`New-Item -ItemType Directory Backup`|Crea una cartella|
|`Copy-Item`|`Copy-Item file.txt D:\Backup`|Copia un file|
|`Move-Item`|`Move-Item file.txt D:\Backup`|Sposta un file|
|`Rename-Item`|`Rename-Item vecchio.txt nuovo.txt`|Rinomina un file|
|`Remove-Item`|`Remove-Item file.txt`|Elimina un file|
|`Remove-Item -Force`|`Remove-Item file.txt -Force`|Forza l'eliminazione|
|`Remove-Item -Recurse`|`Remove-Item C:\Test -Recurse -Force`|Elimina una cartella con contenuto|
|`Get-Process`|`Get-Process`|Mostra i processi attivi|
|`Stop-Process`|`Stop-Process -Name excel -Force`|Chiude un processo|
|`Get-Service`|`Get-Service`|Mostra i servizi|
|`Start-Service`|`Start-Service Spooler`|Avvia un servizio|
|`Stop-Service`|`Stop-Service Spooler`|Ferma un servizio|
|`Restart-Service`|`Restart-Service Spooler`|Riavvia un servizio|

---

## Navigazione nel Terminale

|Comando|Esempio|Spiegazione|
|---|---|---|
|`cd`|`cd`|Mostra la cartella attuale|
|`cd nome_cartella`|`cd Desktop`|Entra dentro una cartella|
|`cd ..`|`cd ..`|Torna indietro di un livello|
|`cd \`|`cd \`|Torna alla radice del disco (es. `C:\`)|
|`cd percorso`|`cd C:\Users\Davide\Desktop`|Va direttamente a un percorso specifico|
|`cd /d percorso`|`cd /d D:\Backup`|Cambia cartella **e** disco|
|`C:`|`C:`|Passa al disco C|
|`D:`|`D:`|Passa al disco D|
|`dir`|`dir`|Mostra file e cartelle|
|`dir /a`|`dir /a`|Mostra anche file nascosti e di sistema|
|`dir /s`|`dir /s`|Mostra anche il contenuto delle sottocartelle|
|`dir /p`|`dir /p`|Mostra i risultati una pagina alla volta|
|`dir *.xlsx`|`dir *.xlsx`|Mostra solo i file Excel `.xlsx`|
|`cls`|`cls`|Pulisce la schermata del terminale|
|`exit`|`exit`|Chiude il terminale|

## Spostare e Rinominare

|Comando|Esempio|Spiegazione|
|---|---|---|
|`move`|`move file.txt D:\Backup`|Sposta un file|
|`move` (cartella)|`move Test D:\Backup`|Sposta una cartella|
|`ren`|`ren vecchio.txt nuovo.txt`|Rinomina un file|
|`rename`|`rename prova.txt finale.txt`|Equivalente di `ren`|
|`ren *.txt *.bak`|`ren *.txt *.bak`|⚠️ Cambia estensione a più file — usare con attenzione|

---

## Eliminare File e Cartelle

|Comando|Esempio|Spiegazione|
|---|---|---|
|`del`|`del file.txt`|Elimina un file|
|`erase`|`erase file.txt`|Equivalente di `del`|
|`del /f`|`del /f file.txt`|Forza l'eliminazione|
|`del /q`|`del /q file.txt`|Elimina senza chiedere conferma|
|`del /s`|`del /s *.tmp`|Elimina anche nelle sottocartelle|
|`del *.tmp`|`del *.tmp`|Elimina tutti i file `.tmp` nella cartella attuale|
|`rmdir`|`rmdir Cartella`|Elimina una cartella **vuota**|
|`rd`|`rd Cartella`|Equivalente di `rmdir`|
|`rmdir /s`|`rmdir /s Cartella`|Elimina una cartella con tutto il contenuto|
|`rmdir /s /q`|`rmdir /s /q "C:\Test"`|⚠️ Elimina senza chiedere conferma|

## Cercare File e Contenuti

|Comando|Esempio|Spiegazione|
|---|---|---|
|`dir nome* /s`|`dir "report*" /s`|Cerca file/cartelle che iniziano con "report"|
|`where`|`where notepad`|Cerca dove si trova un programma eseguibile|
|`where /r`|`where /r C:\ file.txt`|Cerca un file a partire da una cartella|
|`find`|`find "errore" log.txt`|Cerca una parola dentro un file|
|`findstr`|`findstr "errore" log.txt`|Cerca testo in un file (più potente di `find`)|
|`findstr /i`|`findstr /i "errore" log.txt`|Cerca ignorando maiuscole/minuscole|
|`findstr /s`|`findstr /s "errore" *.txt`|Cerca anche nelle sottocartelle|
|`findstr /n`|`findstr /n "errore" log.txt`|Mostra il numero di riga|

## Rete e Internet

|Comando|Esempio|Spiegazione|
|---|---|---|
|`ipconfig`|`ipconfig`|Mostra l'indirizzo IP|
|`ipconfig /all`|`ipconfig /all`|Info complete: IP, DNS, gateway, MAC|
|`ipconfig /release`|`ipconfig /release`|Rilascia l'indirizzo IP attuale|
|`ipconfig /renew`|`ipconfig /renew`|Richiede un nuovo indirizzo IP|
|`ipconfig /flushdns`|`ipconfig /flushdns`|Svuota la cache DNS|
|`ping`|`ping google.it`|Verifica se un sito o IP risponde|
|`ping -t`|`ping -t 192.168.1.1`|Ping continuo (interrompi con `CTRL+C`)|
|`tracert`|`tracert google.it`|Mostra il percorso dei pacchetti|
|`pathping`|`pathping google.it`|Combina ping e tracert per diagnosi rete|
|`nslookup`|`nslookup google.it`|Interroga il DNS e mostra l'IP di un dominio|
|`netstat -ano`|`netstat -ano`|Mostra connessioni attive, porte e PID|
|`arp -a`|`arp -a`|Mostra dispositivi nella rete locale|
|`getmac`|`getmac`|Mostra il MAC address della scheda di rete|

## Processi e Programmi

|Comando|Esempio|Spiegazione|
|---|---|---|
|`tasklist`|`tasklist`|Mostra tutti i processi attivi|
|`taskkill /IM`|`taskkill /IM excel.exe /F`|Chiude un programma tramite nome|
|`taskkill /PID`|`taskkill /PID 1234 /F`|Chiude un processo tramite PID|
|`start`|`start notepad`|Avvia un programma|
|`start .`|`start .`|Apre la cartella corrente in Esplora File|
|`start percorso`|`start C:\Users\Davide\Desktop`|Apre un percorso specifico|
|`taskmgr`|`taskmgr`|Apre Gestione attività|

---

## Disco, Spazio e Partizioni

|Comando|Esempio|Spiegazione|
|---|---|---|
|`wmic logicaldisk get`|`wmic logicaldisk get caption,freespace,size`|Mostra spazio libero e totale dei dischi|
|`chkdsk`|`chkdsk C:`|Controlla lo stato del disco|
|`chkdsk /f`|`chkdsk C: /f`|Corregge errori del file system|
|`chkdsk /r`|`chkdsk C: /r`|Cerca settori danneggiati e tenta il recupero|
|`diskpart`|`diskpart`|Apre lo strumento avanzato per partizioni|
|`list disk`|`list disk`|(dentro Diskpart) Mostra i dischi|
|`list volume`|`list volume`|(dentro Diskpart) Mostra i volumi|
|`select disk`|`select disk 1`|(dentro Diskpart) Seleziona un disco|
|`clean`|`clean`|⚠️ Cancella la struttura delle partizioni|
|`format`|`format E:`|⚠️ Formatta un disco o una partizione|

## Backup e Salvataggi

|Comando|Esempio|Spiegazione|
|---|---|---|
|`robocopy`|`robocopy C:\Dati D:\Backup /E`|Copia cartelle e sottocartelle|
|`robocopy /MIR`|`robocopy C:\Dati D:\Backup /MIR`|⚠️ Sincronizza (può eliminare file nella destinazione)|
|`robocopy /LOG`|`robocopy C:\Dati D:\Backup /E /LOG:backup.txt`|Salva il log della copia|
|`wbadmin`|`wbadmin start backup -backupTarget:E: -include:C: -quiet`|Avvia un backup di sistema|
|`compact`|`compact /c file.txt`|Comprime file su NTFS|
|`cipher /w`|`cipher /w:C:`|Sovrascrive spazio libero (anti-recupero dati)|

## Servizi Windows

| Comando         | Esempio                         | Spiegazione                              |
| --------------- | ------------------------------- | ---------------------------------------- |
| `services.msc`  | `services.msc`                  | Apre la gestione grafica dei servizi     |
| `sc query`      | `sc query`                      | Mostra i servizi                         |
| `sc query nome` | `sc query spooler`              | Mostra lo stato di un servizio specifico |
| `net start`     | `net start spooler`             | Avvia un servizio                        |
| `net stop`      | `net stop spooler`              | Ferma un servizio                        |
| `sc start`      | `sc start spooler`              | Avvia un servizio                        |
| `sc stop`       | `sc stop spooler`               | Ferma un servizio                        |
| `sc config`     | `sc config spooler start= auto` | Cambia il tipo di avvio di un servizio   |

## Aprire Strumenti Windows

| Comando        | Spiegazione                         |
| -------------- | ----------------------------------- |
| `explorer`     | Apre Esplora File                   |
| `notepad`      | Apre Blocco Note                    |
| `mspaint`      | Apre Paint                          |
| `calc`         | Apre la calcolatrice                |
| `cmd`          | Apre un nuovo Prompt dei comandi    |
| `powershell`   | Apre PowerShell                     |
| `control`      | Apre il Pannello di controllo       |
| `appwiz.cpl`   | Apre Programmi e funzionalità       |
| `ncpa.cpl`     | Apre le connessioni di rete         |
| `sysdm.cpl`    | Apre proprietà del sistema          |
| `desk.cpl`     | Apre impostazioni schermo classiche |
| `firewall.cpl` | Apre Windows Firewall               |
| `devmgmt.msc`  | Apre Gestione dispositivi           |
| `diskmgmt.msc` | Apre Gestione disco                 |
| `compmgmt.msc` | Apre Gestione computer              |
| `eventvwr.msc` | Apre Visualizzatore eventi          |
| `gpedit.msc`   | Apre Editor criteri di gruppo       |
| `regedit`      | ⚠️ Apre il Registro di sistema      |
| `msconfig`     | Apre Configurazione di sistema      |

## ⚠️ Comandi Pericolosi - Usare con Estrema Attenzione

|Comando|Perché fare attenzione|
|---|---|
|`del /s /q`|Può eliminare molti file senza conferma|
|`rmdir /s /q`|Elimina intere cartelle senza conferma|
|`format`|Cancella il contenuto di un disco|
|`diskpart clean`|Cancella la struttura delle partizioni|
|`robocopy /MIR`|Può eliminare file nella destinazione|
|`reg delete`|Può danneggiare configurazioni Windows|
|`takeown + icacls`|Può alterare permessi delicati|
|`netsh reset`|Cambia configurazioni di rete|
|`taskkill /F`|Chiude forzatamente programmi (possibile perdita dati)|
|`shutdown /s /t 0`|Spegne immediatamente il PC|
