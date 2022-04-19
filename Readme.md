# Hur man kommer igång

Funkar på
- java 16
- npm 8.4.0
- node v14.17.5
- Gradle 7.4.2

1. Ladda hem en transaktionsfil från avanza
2. Byt ut static path mot den jag har i koden i AvanzaReader.java
3. starta java med `gradle bootRun`
4. `curl http://localhost:8080/api/load` för att ladda in filen
5. nu finns data och servern kör, all data är i minnet så startar du om den måste det läsas om
6. Starta webservern den ska proxya api requests till java snurran `npm start`
