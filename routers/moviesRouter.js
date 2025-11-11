/************
    IMPORT
************/
const express = require('express')                                   // Import Express
const movieController = require('../controllers/movieController')    // Import Controller dei film
const upload = require('../middlewares/multer');                     // Import middleware multer per la gestione dei file in ingresso

/*************
    ROUTER
*************/
const router = express.Router() // Inizializzazione router express

// Definizione delle rotte CRUD 
router.get('/', movieController.index);                                       // Mostra tutti i film
router.get('/:id', movieController.show);                                     // Mostra un film specifico
router.post('/:id/reviews', movieController.storeReview);                     // Crea nuova recensione
router.post('/', upload.single('image'), movieController.storeMovie);         // Crea nuovo film con l'immagine

/************
    EXPORT
************/
module.exports = router; // Export del router