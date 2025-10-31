/****************
    MIDDLEWARE  
*****************/

// Funzione che gestisce dinamicamente il path base delle immagini
function setImagePath(req, res, next) {
    req.imagePath = `${req.protocol}://${req.get('host')}/img/`;
    next()
}


/************
    EXPORT
************/
module.exports = setImagePath;