/************
    IMPORT
************/
const express = require('express')                                   // Import Express
const movieController = require('../controllers/movieController')    // Import Controller dei film

/*************
    ROUTER
*************/
const router = express.Router() // Inizializzazione router express

// Definizione delle rotte CRUD 
router.get('/', movieController.index);                 // Mostra tutti i film
router.get('/:id', movieController.show);               // Mostra un film specifico
router.post('/:id/reviews', movieController.storeReview);     // Crea nuova recensione

/************
    EXPORT
************/
module.exports = router; // Export del router