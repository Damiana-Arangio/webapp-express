/************
    IMPORT
************/

const multer = require('multer');  // Import del middleware multer per gestire i file in ingresso

/****************************
    CONFIGURAZIONE STORAGE
*****************************/
const storage = multer.diskStorage({

    // Directory di destinazione in cui salvare i file caricati
     destination: "./public/imgs/",
    
    // Definizione del nome del file salvato (timestamop + nome originale)
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName); // Passiamo a Multer il nome finale del file

    },
});

/****************
    MIDDLEWARE
****************/

const upload = multer({ storage });        // Creazione middleware multer 

/************
    EXPORT
************/
module.exports = upload;
