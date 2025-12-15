<p align="center">
  <img src="./public/imgs/boolean-logo.png" alt="Boolean Logo" width="35">
</p>

<h1 align="center">Web App Express</h1>

Backend di una web application full-stack per la gestione di film e recensioni, sviluppato con Express.js e MySQL.

Frontend collegato:  
https://github.com/Damiana-Arangio/webapp-react.git

---

## Descrizione del progetto

Il backend fornisce API REST per:
- recuperare la lista dei film
- ottenere il dettaglio di un film con recensioni
- inserire nuove recensioni
- inserire nuovi film

Gestisce la persistenza dei dati tramite database MySQL ed è progettato per comunicare con un frontend React.

---

## Funzionalità principali

- Connessione a database MySQL
- API REST per film e recensioni
- Recupero dati con JOIN
- Inserimento dati tramite POST
- Gestione CORS per integrazione frontend
- Gestione errori e rotte inesistenti
- Separazione tra router e controller

---

## Architettura backend

- Express.js
- Controller dedicati
- Router modulari
- Middleware per:
  - CORS
  - error handling
  - rotte non valide
- Variabili d’ambiente per configurazione DB

---

## Avvio dell’applicazione

Installare le dipendenze:
```bash
    npm install
```

Avviare il server:
```bash
    npm run start
```

Avvio in modalità watch:
```bash
    npm run watch
```

## Prerequisiti

- Node.js
- MySQL Server


## Tecnologie utilizzate

- Node.js
- Express.js
- JavaScript
- MySQL
- MySQL Workbench
