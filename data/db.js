
/************
    IMPORT
************/
const mysql = require('mysql2');            // Import del pacchetto mysql2

/**************************************
    CONNESSIONE CON IL SERVER MYSQL
***************************************/

/* Configurazione dei parametri per la connessione */
const connection = mysql.createConnection(
    {
        host: process.env.DB_HOST,                  // Indirizzo del Server MySQL
        user: process.env.DB_USER,                  // Nome utente MySQL
        password: process.env.DB_PASSWORD,          // Password MySQL 
        database: process.env.DB_NAME               // Nome del Database 
    }
)

/* Connessione al Database */
connection.connect(err => {
    if (err) throw err;                                         // Solleva eccezione in caso di errore
    console.log('Connessione al database db_movie riuscita!')    // Conferma la connessione
}
)

/***************
    EXPORT
****************/
module.exports = connection;        // Export della connessione