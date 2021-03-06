### Publish API to azure

1. Right click on the project in your visual studio solution
2. Select publish
3. Create new profile
4. Create new Server and SQL database, make sure you remember the login
5. Publish to azure
6. Add IP addresses from the hosted API website (https://riskantwerprest.azurewebsites.net), can be found in the properties of the app service, to the server firewall. Otherwise the website won't be able to reach the database content (404 error)

![Foto](/doc/importantdoc/Img/azure_properties.PNG)

![Foto](/doc/importantdoc/Img/server_firewall.PNG)

7. Your API is hosted and ready to be used
8. Make sure you put the right call after the URL, the standard URL returns a 404

![Foto](/doc/importantdoc/Img/azure_web.PNG)

If others need to publish aswell, download the publish profile in the app service to get all the information (URL, Login, ...)

![Foto](/doc/importantdoc/Img/publish_profile.PNG)
