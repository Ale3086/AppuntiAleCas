# Indice
- [Comandi da Ricordare per Primi](#Comandi%20da%20Ricordare%20per%20Primi)
- [Navigazione nel Terminale](#Navigazione%20nel%20Terminale)
- [Gestire File e Cartelle](#Gestire%20File%20e%20Cartelle)
- [Spostare, Copiare e Rinominare](#Spostare,%20Copiare%20e%20Rinominare)
- [Eliminare File e Cartelle](#Eliminare%20File%20e%20Cartelle)
- [Cercare File e Contenuti](#Cercare%20File%20e%20Contenuti)
- [Rete e Internet](#Rete%20e%20Internet)
- [Processi e Programmi](#Processi%20e%20Programmi)
- [Disco, Spazio e Partizioni](#Disco,%20Spazio%20e%20Partizioni)
- [Backup e Salvataggi](#Backup%20e%20Salvataggi)
- [Permessi e Proprietà](#Permessi%20e%20Proprietà)
- [Servizi (systemd)](#Servizi%20(systemd))
- [Gestione Pacchetti](#Gestione%20Pacchetti)
	- [Debian / Ubuntu (apt)](#Debian%20/%20Ubuntu%20(apt))
	- [Red Hat / Fedora (dnf)](#Red%20Hat%20/%20Fedora%20(dnf))
- [Utenti e Gruppi](#Utenti%20e%20Gruppi)
- [⚠️ Comandi Pericolosi - Usare con Estrema Attenzione](#⚠️%20Comandi%20Pericolosi%20-%20Usare%20con%20Estrema%20Attenzione)

## Comandi da Ricordare per Primi

|Comando|Esempio|Spiegazione|
|---|---|---|
|`cd`|`cd Documenti`|Cambiare cartella|
|`ls`|`ls`|Vedere file e cartelle|
|`mkdir`|`mkdir Backup`|Creare cartella|
|`cp`|`cp file.txt /backup/`|Copiare file|
|`mv`|`mv file.txt /backup/`|Spostare file|
|`mv` (rinomina)|`mv a.txt b.txt`|Rinominare file|
|`rm`|`rm file.txt`|Eliminare file|
|`rm -r`|`rm -r Cartella`|Eliminare cartella|
|`cat`|`cat file.txt`|Visualizzare contenuto file|
|`nano`|`nano file.txt`|Modificare un file (editor semplice)|
|`ip a`|`ip a`|Vedere IP|
|`ping`|`ping google.it`|Testare connessione|
|`ps`|`ps aux`|Vedere processi|
|`kill`|`kill 1234`|Terminare processo|
|`rsync`|`rsync -av /dati/ /backup/`|Fare copie robuste|
|`sudo`|`sudo comando`|Eseguire come amministratore|

## Navigazione nel Terminale

|Comando|Esempio|Spiegazione|
|---|---|---|
|`pwd`|`pwd`|Mostra la cartella in cui ti trovi|
|`cd`|`cd Documenti`|Entra dentro una cartella|
|`cd ..`|`cd ..`|Torna indietro di un livello|
|`cd /`|`cd /`|Torna alla radice del sistema|
|`cd ~`|`cd ~`|Va alla cartella home dell'utente|
|`cd -`|`cd -`|Torna alla cartella precedente|
|`cd percorso`|`cd /home/davide/Desktop`|Va direttamente a un percorso specifico|
|`ls`|`ls`|Mostra file e cartelle|
|`ls -a`|`ls -a`|Mostra anche file nascosti (`.` iniziale)|
|`ls -l`|`ls -l`|Mostra dettagli: permessi, dimensione, data|
|`ls -lh`|`ls -lh`|Dettagli con dimensioni leggibili (KB, MB)|
|`ls -R`|`ls -R`|Mostra anche il contenuto delle sottocartelle|
|`ls *.txt`|`ls *.txt`|Mostra solo i file `.txt`|
|`clear`|`clear`|Pulisce la schermata del terminale|
|`exit`|`exit`|Chiude il terminale|
|`history`|`history`|Mostra i comandi usati in precedenza|

## Gestire File e Cartelle

|Comando|Esempio|Spiegazione|
|---|---|---|
|`touch`|`touch file.txt`|Crea un file vuoto|
|`mkdir`|`mkdir Backup`|Crea una cartella|
|`mkdir -p`|`mkdir -p A/B/C`|Crea cartelle annidate in un colpo solo|
|`cat`|`cat file.txt`|Mostra il contenuto di un file|
|`less`|`less file.txt`|Mostra il contenuto una pagina alla volta|
|`head`|`head -n 10 file.txt`|Mostra le prime 10 righe|
|`tail`|`tail -n 10 file.txt`|Mostra le ultime 10 righe|
|`tail -f`|`tail -f log.txt`|Mostra le ultime righe in tempo reale (utile per log)|
|`nano`|`nano file.txt`|Apre editor di testo semplice|
|`vim`|`vim file.txt`|Apre editor avanzato (`:q!` per uscire)|
|`wc -l`|`wc -l file.txt`|Conta le righe di un file|
|`file`|`file documento.pdf`|Mostra il tipo di un file|

## Spostare, Copiare e Rinominare

|Comando|Esempio|Spiegazione|
|---|---|---|
|`cp`|`cp file.txt /backup/`|Copia un file|
|`cp -r`|`cp -r Cartella/ /backup/`|Copia una cartella con tutto il contenuto|
|`cp -p`|`cp -p file.txt /backup/`|Copia preservando data e permessi|
|`mv`|`mv file.txt /backup/`|Sposta un file|
|`mv` (cartella)|`mv Test/ /backup/`|Sposta una cartella|
|`mv` (rinomina)|`mv vecchio.txt nuovo.txt`|Rinomina un file o cartella|

## Eliminare File e Cartelle

|Comando|Esempio|Spiegazione|
|---|---|---|
|`rm`|`rm file.txt`|Elimina un file|
|`rm -f`|`rm -f file.txt`|Forza l'eliminazione senza conferma|
|`rm -i`|`rm -i file.txt`|Chiede conferma prima di eliminare|
|`rm *.tmp`|`rm *.tmp`|Elimina tutti i file `.tmp` nella cartella attuale|
|`rmdir`|`rmdir Cartella`|Elimina una cartella **vuota**|
|`rm -r`|`rm -r Cartella/`|Elimina una cartella con tutto il contenuto|
|`rm -rf`|`rm -rf Cartella/`|⚠️ Elimina tutto senza conferma|

## Cercare File e Contenuti

|Comando|Esempio|Spiegazione|
|---|---|---|
|`find`|`find . -name "report*"`|Cerca file/cartelle che iniziano con "report"|
|`find` (tipo)|`find /home -type f -name "*.txt"`|Cerca solo file `.txt`|
|`find` (data)|`find . -mtime -7`|Cerca file modificati negli ultimi 7 giorni|
|`which`|`which python3`|Cerca dove si trova un programma eseguibile|
|`whereis`|`whereis nano`|Cerca binario, sorgente e manuale di un comando|
|`locate`|`locate file.txt`|Cerca velocemente nel database dei file (aggiornato da `updatedb`)|
|`grep`|`grep "errore" log.txt`|Cerca una parola dentro un file|
|`grep -i`|`grep -i "errore" log.txt`|Cerca ignorando maiuscole/minuscole|
|`grep -r`|`grep -r "errore" /var/log/`|Cerca anche nelle sottocartelle|
|`grep -n`|`grep -n "errore" log.txt`|Mostra anche il numero di riga|
|`grep -v`|`grep -v "errore" log.txt`|Mostra le righe che **non** contengono la parola|

## Rete e Internet

|Comando|Esempio|Spiegazione|
|---|---|---|
|`ip a`|`ip a`|Mostra tutti gli indirizzi IP e interfacce|
|`ip r`|`ip r`|Mostra la tabella di routing (gateway)|
|`ifconfig`|`ifconfig`|Mostra le interfacce di rete (versione classica)|
|`ping`|`ping google.it`|Verifica se un sito o IP risponde|
|`ping -c 4`|`ping -c 4 google.it`|Esegue esattamente 4 ping|
|`traceroute`|`traceroute google.it`|Mostra il percorso dei pacchetti|
|`nslookup`|`nslookup google.it`|Interroga il DNS e mostra l'IP di un dominio|
|`dig`|`dig google.it`|Interrogazione DNS avanzata|
|`ss -tulnp`|`ss -tulnp`|Mostra porte aperte e connessioni attive|
|`netstat -tulnp`|`netstat -tulnp`|Equivalente classico di `ss`|
|`curl`|`curl https://example.com`|Scarica o interroga una URL|
|`wget`|`wget https://example.com/file.zip`|Scarica un file da internet|
|`arp -a`|`arp -a`|Mostra dispositivi nella rete locale|
|`hostname`|`hostname -I`|Mostra il nome e l'IP del computer|
|`nmap`|`nmap 192.168.1.1`|Scansiona porte di un host (se installato)|

## Processi e Programmi

|Comando|Esempio|Spiegazione|
|---|---|---|
|`ps aux`|`ps aux`|Mostra tutti i processi attivi|
|`ps aux \| grep`|`ps aux \| grep firefox`|Filtra i processi per nome|
|`top`|`top`|Mostra processi in tempo reale (interattivo)|
|`htop`|`htop`|Versione migliorata di `top` (se installato)|
|`kill`|`kill 1234`|Termina un processo tramite PID|
|`kill -9`|`kill -9 1234`|⚠️ Forza la chiusura immediata di un processo|
|`killall`|`killall firefox`|Termina tutti i processi con quel nome|
|`pkill`|`pkill firefox`|Termina processi per nome (come `killall`)|
|`bg`|`bg`|Manda un processo in background|
|`fg`|`fg`|Riporta un processo in foreground|
|`jobs`|`jobs`|Mostra i processi in background nella sessione|
|`nohup`|`nohup script.sh &`|Esegue un comando anche dopo il logout|

## Disco, Spazio e Partizioni

|Comando|Esempio|Spiegazione|
|---|---|---|
|`df -h`|`df -h`|Mostra spazio libero e totale dei dischi|
|`du -sh`|`du -sh /home/davide/`|Mostra quanto spazio occupa una cartella|
|`du -sh *`|`du -sh *`|Mostra la dimensione di ogni elemento nella cartella attuale|
|`lsblk`|`lsblk`|Mostra tutti i dischi e le partizioni|
|`fdisk -l`|`sudo fdisk -l`|Mostra dettagli su dischi e partizioni|
|`mount`|`sudo mount /dev/sdb1 /mnt`|Monta una partizione|
|`umount`|`sudo umount /mnt`|Smonta una partizione|
|`fsck`|`sudo fsck /dev/sdb1`|Controlla e ripara un file system|
|`mkfs.ext4`|`sudo mkfs.ext4 /dev/sdb1`|⚠️ Formatta una partizione in ext4|
|`blkid`|`blkid`|Mostra UUID e tipo di tutte le partizioni|

## Backup e Salvataggi

|Comando|Esempio|Spiegazione|
|---|---|---|
|`rsync`|`rsync -av /dati/ /backup/`|Copia cartelle e sottocartelle|
|`rsync --delete`|`rsync -av --delete /dati/ /backup/`|⚠️ Sincronizza (può eliminare file nella destinazione)|
|`rsync --log-file`|`rsync -av /dati/ /backup/ --log-file=backup.log`|Salva il log della copia|
|`rsync` (remoto)|`rsync -avz /dati/ utente@server:/backup/`|Copia su server remoto via SSH|
|`tar -czvf`|`tar -czvf backup.tar.gz /dati/`|Crea un archivio compresso `.tar.gz`|
|`tar -xzvf`|`tar -xzvf backup.tar.gz`|Estrae un archivio `.tar.gz`|
|`zip -r`|`zip -r backup.zip /dati/`|Crea un archivio `.zip`|
|`unzip`|`unzip backup.zip`|Estrae un archivio `.zip`|
|`dd`|`sudo dd if=/dev/sda of=/dev/sdb bs=4M status=progress`|⚠️ Clona interi dischi|

## Permessi e Proprietà

|Comando|Esempio|Spiegazione|
|---|---|---|
|`chmod`|`chmod 755 script.sh`|Cambia i permessi di un file|
|`chmod +x`|`chmod +x script.sh`|Rende un file eseguibile|
|`chmod -R`|`chmod -R 755 Cartella/`|Cambia permessi a una cartella e tutto il contenuto|
|`chown`|`chown davide file.txt`|Cambia il proprietario di un file|
|`chown -R`|`chown -R davide:davide Cartella/`|Cambia proprietario in modo ricorsivo|
|`ls -l`|`ls -l`|Mostra permessi di file e cartelle|
|`umask`|`umask 022`|Imposta i permessi predefiniti per nuovi file|
|`sudo`|`sudo comando`|Esegue un comando come root|
|`sudo -i`|`sudo -i`|Apre una shell come root|
|`su`|`su nomeutente`|Cambia utente nella sessione|

## Servizi (systemd)

|Comando|Esempio|Spiegazione|
|---|---|---|
|`systemctl status`|`systemctl status apache2`|Mostra lo stato di un servizio|
|`systemctl start`|`sudo systemctl start apache2`|Avvia un servizio|
|`systemctl stop`|`sudo systemctl stop apache2`|Ferma un servizio|
|`systemctl restart`|`sudo systemctl restart apache2`|Riavvia un servizio|
|`systemctl reload`|`sudo systemctl reload apache2`|Ricarica la configurazione senza riavviare|
|`systemctl enable`|`sudo systemctl enable apache2`|Avvia il servizio automaticamente al boot|
|`systemctl disable`|`sudo systemctl disable apache2`|Disabilita l'avvio automatico|
|`systemctl list-units`|`systemctl list-units --type=service`|Mostra tutti i servizi attivi|
|`journalctl`|`journalctl -u apache2`|Mostra i log di un servizio|
|`journalctl -f`|`journalctl -f`|Mostra i log di sistema in tempo reale|

## Gestione Pacchetti

### Debian / Ubuntu (apt)

|Comando|Esempio|Spiegazione|
|---|---|---|
|`apt update`|`sudo apt update`|Aggiorna la lista dei pacchetti disponibili|
|`apt upgrade`|`sudo apt upgrade`|Aggiorna tutti i pacchetti installati|
|`apt install`|`sudo apt install vlc`|Installa un programma|
|`apt remove`|`sudo apt remove vlc`|Rimuove un programma|
|`apt purge`|`sudo apt purge vlc`|Rimuove programma e file di configurazione|
|`apt autoremove`|`sudo apt autoremove`|Rimuove pacchetti non più necessari|
|`apt search`|`apt search editor`|Cerca un pacchetto per nome|
|`dpkg -l`|`dpkg -l`|Elenca tutti i pacchetti installati|

### Red Hat / Fedora (dnf)

|Comando|Esempio|Spiegazione|
|---|---|---|
|`dnf update`|`sudo dnf update`|Aggiorna tutti i pacchetti|
|`dnf install`|`sudo dnf install vlc`|Installa un programma|
|`dnf remove`|`sudo dnf remove vlc`|Rimuove un programma|
|`dnf search`|`dnf search editor`|Cerca un pacchetto|

## Utenti e Gruppi

|Comando|Esempio|Spiegazione|
|---|---|---|
|`whoami`|`whoami`|Mostra l'utente attuale|
|`id`|`id`|Mostra UID, GID e gruppi dell'utente|
|`who`|`who`|Mostra chi è connesso al sistema|
|`useradd`|`sudo useradd davide`|Crea un nuovo utente|
|`passwd`|`sudo passwd davide`|Imposta o cambia la password di un utente|
|`userdel`|`sudo userdel davide`|Elimina un utente|
|`usermod -aG`|`sudo usermod -aG sudo davide`|Aggiunge un utente a un gruppo|
|`groupadd`|`sudo groupadd sviluppo`|Crea un nuovo gruppo|
|`groups`|`groups davide`|Mostra i gruppi di un utente|

## ⚠️ Comandi Pericolosi - Usare con Estrema Attenzione

|Comando|Perché fare attenzione|
|---|---|
|`rm -rf /`|Elimina **tutto** il file system — il sistema diventa inutilizzabile|
|`rm -rf *`|Elimina tutto nella cartella attuale senza conferma|
|`dd if=... of=/dev/sda`|Sovrascrive un intero disco, distruggendo tutti i dati|
|`mkfs` / `format`|Formatta e cancella completamente una partizione|
|`chmod -R 777 /`|Apre tutti i permessi su tutto il sistema — grave rischio sicurezza|
|`chown -R` su `/`|Può rendere il sistema non avviabile|
|`kill -9 1`|Termina il processo init/systemd — il sistema si blocca|
|`> file.txt`|Sovrascrive e svuota il file immediatamente|
|`sudo su`|Apre una shell root permanente — ogni errore ha effetto immediato|
|`wget -O- \| bash`|Esegue script da internet senza verificarne il contenuto|
