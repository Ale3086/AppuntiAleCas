L'interfaccia a riga di comando (CLI) è lo strumento principale per configurare uno switch. Permette operazioni complesse spesso non disponibili tramite interfaccia grafica.

- **Connessione Fisica**: Si utilizza un **cavo di console** azzurro collegato tra il PC e lo switch.
    
- **Hardware necessario**: Se il PC non ha porte seriali, serve un adattatore USB-seriale.
    
- **Software di controllo**: Si usa un client come **PuTTY** per emulare il terminale tramite protocolli SSH o via porta seriale.
    
- **Simulazione (Packet Tracer)**: È possibile cliccare direttamente sullo switch e selezionare la scheda "CLI" per operare velocemente.

## Procedura di Apertura del Terminale
Per accedere alla riga di comando in ambiente simulato, segui questi passaggi :

1. Clicca sul **PC0**, vai sulla scheda **"Desktop"** e seleziona **"Terminal"**.
    
2. Verifica i parametri della **Terminal Configuration**:
    ![[Pasted image 20260512122939.png]]
    
3. Clicca su **OK** e premi **Invio** nella finestra nera per visualizzare il prompt.

## Gerarchia delle Modalità (Stati del Prompt)
Il sistema operativo IOS è diviso in livelli di accesso gerarchici. Ogni livello permette operazioni diverse.

- **User EXEC Mode (`Switch>`)**
    - Modalità di sola lettura attiva all'accensione.
    - Puoi vedere alcune statistiche di base ma non puoi cambiare nulla.
	
- **Privileged EXEC Mode (`Switch#`)**
    - Nota anche come modalità **"Enable"**.
    - Si accede digitando il comando `enable`.
    - Permette di visualizzare configurazioni dettagliate e gestire i file di sistema.
	
- **Global Configuration Mode (`Switch(config)#`)**
    - Si accede dalla modalità privilegiata digitando `configure terminal`.
    - Qui avvengono i cambiamenti che influenzano l'intero dispositivo (es. cambio nome host).
	
- **Interface Configuration Mode (`Switch(config-if)#`)**
    - Sotto-modalità che si attiva entrando in una porta specifica (es. `interface fastethernet0/1`).
    - Serve per configurare i parametri delle singole porte.

## Sistema di Help e Scorciatoie
- **Comando `?`**: Digitato in qualsiasi momento, elenca i comandi disponibili per la modalità corrente.
	
- **Completamento Automatico**: Il tasto **TAB** completa un comando iniziato se le lettere inserite sono univoche.
    
- **Aiuto contestuale**: Digitando `comando ?` (es. `show ?`) si visualizzano tutti i parametri ammessi per quel comando.

## Comandi di Verifica e Gestione (`show`)
Questi comandi permettono di interrogare il dispositivo per leggerne lo stato:

- **`show version`**: Fornisce la versione del software e i dettagli hardware.

- **`show running-config`**: Mostra la configurazione di lavoro attualmente in RAM.
    
- **`show ip interface brief`**: Sintesi dello stato fisico e logico delle porte.
    
- **`show interfaces`**: Stato dettagliato di tutte le interfacce.
    
- **`show mac-address-table`**: Visualizza la tabella degli indirizzi MAC.
    
- **`show flash`**: Elenca i file e lo spazio nella memoria flash.
    
- **`show clock`**: Visualizza data e ora del sistema.

## Configurazione Orario e Gestione
- **Impostazione Ora**: `clock set [hh:mm:ss] [giorno] [mese] [anno]`.
    
- **Salvataggio**: Per rendere permanenti le modifiche, usa `copy running-config startup-config`
    
- **Riavvio**: Il comando `reload` esegue un riavvio a freddo dello switch.
    
- **Uscita**: I comandi `exit` o `logout` permettono di tornare indietro di un livello o chiudere la sessione.