
/****************
    MIDDLEWARE
*****************/

// Funzione che gestisce le rotte inesistenti (404 Not Found)

function notFound(req, res, next) {
    res.status(404).json(
        { 
            error: "Non Found", 
            message: "Pagina non trovata"
        }
    )
}

/************
    EXPORT
************/
module.exports = notFound;