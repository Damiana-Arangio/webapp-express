
/****************
    MIDDLEWARE  
*****************/

// Funzione che gestisce gli errori del server (500 Internal Server Error)
function errorServer(err, req, res, next) {
    res.status(500).json(
        { error: err.message }
    );
}

/************
    EXPORT
************/
module.exports = errorServer;