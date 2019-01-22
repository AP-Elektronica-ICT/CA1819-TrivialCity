# documentatie signalR

## API

Aanmaken van hub in de api.\
Doormiddel van groups is het mogelijk om naar alleen bepaalde users info te sturen.\
(in dit geval een message die dan in een toast komt)\
Met de function JoinTeam kan je dus een bepaalde groep joinen. \
De send function zal wanneer aangeroepen wordt , naar dat bepaald team de message sturen.

## APP

Een service gemaakt zodat ik deze code beter zou kunnen toepassen.\
StartHubconnection zal soortvan de setup zijn.\ (hubconnection aanmaken en de connection starten)\
Jointeam kan je dus een groep joinen.\
SendAttackMessage zal de Send function aanspreken in de Api en zo dan doormiddel van een toast,\
zal de message die de hub zal sturen naar de gebruikers getoond worden.


## Extra note 
 

Wanneer de connectie wegvalt, (internet verbinding)\
zal de connectie wanneer het internet terug is niet automatische terug verbinden met de hub.\
De gebruiker zal dan ook terug de hub group moeten joinen.\
Dit probleem is zeer lastig op te lossen met de versie die ik heb toegepast van signalR.\
Er waren veel problemen met werkende versies van signalR.\
Maar signlarR is bezig met een reconnect methode toe te voegen zodat dit probleem makkelijk opgelost zal worden.\



