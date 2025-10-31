/************************************ MOVIES SERVER*************************************/

/************
    IMPORT
************/
const express = require('express')                           // Import del modulo Express
const chalk = require('chalk');                              // Import del pacchetto chalk
const moviesRouter = require('./routers/moviesRouter');      // Import del router che gestisce le rotte dei film
const errorServer = require('./middlewares/errorServer');    // Import del middleware errorServer
const notFound = require('./middlewares/notFound');          // Import del middleware notFound
const imagePath = require('./middlewares/imagePath');        // Import del middleware imagePath


/***************************
    CONFIGURAZIONE EXPRESS
****************************/
const app = express();           // Inizializzazione dell'app Express
const port = 3000;               // Definizione della porta su cui il server deve rimanere in ascolto


/************
    ROTTE
************/
app.get('/api', (req, res) => {
    console.log("Rotta home API attiva");
    res.send("Benvenuto nella home della API per i film!");
})


/***************
    MIDDLEWARE
****************/
app.use(imagePath);                      // Registrazione del middleware per gestire dinamicamente il path delle immagini
app.use(express.static('public'));       // Registrazione del middleware per rendere accessibili i file statici (es. immagini) contenuti nella cartella "public"
app.use('/api/movies', moviesRouter);    // Registrazione del router con prefisso /api 
app.use(errorServer);                    // Registrazione del middleware "errorServer" che gestisce gli errori interni del server 
app.use(notFound);                       // Registrazione del middleware "notFound" che gestisce le rotte inesistenti (404 Not Found)


/*********************
    AVVIO SERVER
*********************/
// Il server viene messo in ascolto sulla porta 3000
app.listen(port, () => {
    console.log(chalk.red("Server in ascolto sulla porta " + port));
})