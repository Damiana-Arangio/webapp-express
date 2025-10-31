/************************************ MOVIES SERVER*************************************/

/************
    IMPORT
************/
const express = require('express')                           // Import del modulo Express
const chalk = require('chalk');                              // Import del pacchetto chalk


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




/*********************
    AVVIO SERVER
*********************/
// Il server viene messo in ascolto sulla porta 3000
app.listen(port, () => {
    console.log(chalk.red("Server in ascolto sulla porta " + port));
})