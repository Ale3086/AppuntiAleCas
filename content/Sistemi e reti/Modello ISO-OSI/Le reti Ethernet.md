Le reti Ethernet sono una particolare tecnologia usata nelle reti locali (LAN) ed è basata sullo **standard IEEE 802.3**. Nata inizialmente come rete a topologia a bus con cavi coassiali, evolvendosi col tempo in una topologia a stella, in cui il centro della rete è occupato da un dispositivo **apparato centrale** come hub o switch. Nel modello ISO/OSI l' Ethernet lavora principalmente al livello **Fisico e Data Link**. 

![](../../Zimmagini/Pasted%20image%2020260428131702.png)

## Gli indirizzi MAC
In una rete Ethernet, ogni messaggio deve avere un destinatario, indicato grazie all'**indirizzo di MAC di destinazione**, ovvero l'identificatore univoco a 48 bit (espresso in esadecimale) della scheda di rete specifica a cui è destinato un pacchetto dati in una rete locale (LAN o Wi-Fi) . L'indirizzo MAC di destinazione può essere di tre tipi:

- **Unicast:** se il messaggio è destinato a una **singola stazione** specifica.
    
- **Multicast:** se è destinato a un **gruppo di stazioni**; questo indirizzo inizia sempre con il codice **01-00-5E**.
    
- **Broadcast:** se è destinato a **tutte le stazioni** della rete (l'indirizzo è **FF:FF:FF:FF:FF:FF**). I rooter vanno a spezzare i messaggi di broadcast, ciò vuol dire che **ogni ramo di un router è un dominio di broadcast**.

<img src="../../Zimmagini/Pasted%20image%2020260428132224.png" width="697">
<img src="../../Zimmagini/Pasted%20image%2020260428132317.png" width="697">

GLi swith spezzano i domini di collisione, i router spezzano quelli di broadcast