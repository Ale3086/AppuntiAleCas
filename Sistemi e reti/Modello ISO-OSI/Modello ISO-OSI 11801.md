## Cosa ci permette il modello ISO-OSI 11801
**Permette di prendere un problema e scomposto nei suoi sotto-problemi.** E' **diviso in 7 parti** e ogni livello è autonomo, ovvero svolgono le loro istruzioni senza sapere cosa c'è sotto o sopra. 

E' un modello teorico, ovvero serve di partenza di parlare delle funzioni che dovranno essere implementate da chi scriverà il codice, andando a separare il **modello** (parte teorica), dall'**architettura** (parte fisica/pratica).
#### Modello
![](WhatsApp%20Image%202026-04-21%20at%2012.37.18.jpeg)
#### Architettura
![](WhatsApp%20Image%202026-04-21%20at%2012.43.12.jpeg)

## Instradazione pacchetti con il modello ISO-OSI 11801
Ognuno dei segmenti prende i dati dal pacchetto precedente senza sapere le operazioni precedentemente svolte e risolve un problema e lo manda sotto, quando si va verso il basso; quando si va verso l'alto, invece, i dati vengono compresi e vengono tolti per ogni segmento rispettivo e vanno passati verso l'alto. Il primo processo descritto verso il basso si chiama **incapsulamento** e il secondo **decapsulamento**. 

Il segale viene trasmesso tramite una **rete a maglia di dispositivi intermedi**, in questo caso router, ecco perché nel passaggio i dati arrivano solo a Network, infatti i **router** lavorano fino al livello 3 (Network); a differenza degli **switch** che lavorano fino al livello 2 (Indirizzi MAC) o gli **HUB** che lavorano a livello 1 (livello fisico).

![](WhatsApp%20Image%202026-04-21%20at%2012.58.22.jpeg)

In una rete locale vengono usati solo 2 livelli per scambiare un messaggio fra due dispositivi terminali, ovvero il primo e il secondo. Questi due livelli si possono unire insieme, chiamando i due insieme con il termine **accesso al canale**, usando il **protocollo ethernet**.