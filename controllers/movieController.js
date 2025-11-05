/************
    IMPORT
************/
const connection = require('../data/db.js')    // Import della connessione al Database 


/********************
    FUNZIONI ROTTE
*********************/

// --------------------------------------------------- ROTTA INDEX --------------------------------------------------------

// INDEX - mostra tutti i post
function index(req, res) {

    // Definizione della query SQL per recuperare i film
    const query_movies = ` 
        SELECT * 
        FROM movies 
    `;

    // Esecuzione query SQL
    connection.query(query_movies, (err, results) => {

        // Gestione in caso di errore - codice di stato HTTP 500
        if (err) {
            return res.status(500).json({
                error: "Errore durante il recupero dei film dal database!"
            });
        }

        // Aggiungo il path completo dell'immagine a ciascun film
        const resultsWithFullPath = results.map(movie => {
            movie.image = req.imagePath + movie.image; // Concatenazione Path completo immagine
            return movie;
        });

        // Gestione in caso di successo - invia al client la lista dei film 
        res.json(resultsWithFullPath);
    })
}


// --------------------------------------------------- ROTTA SHOW --------------------------------------------------------

// SHOW - mostra un post specifico
function show(req, res) {
    const id = parseInt(req.params.id);                        // Recupero id dall'URL

    // Definizione della query SQL per recuperare il film richiesto
    const query_movie = ` 
        SELECT * 
        FROM movies 
        WHERE id = ? 
    `;

    // Definizione della query SQL per recuperare le recensioni collegate al film
    const query_reviews = `
        SELECT *
        FROM reviews WHERE movie_id = ?
    `;

    // Esecuzione query SQL
    // Prima query -> Recupero film
    connection.query(query_movie, [id], (err, movieResults) => {

        // Gestione in caso di errore - codice di stato HTTP 500
        if (err) {
            return res.status(500).json({
                error: "Errore durante il recupero del film dal database!"
            });
        }

        // Gestione in caso di film non trovato - codice di stato HTTP 404
        if (movieResults.length === 0) {
            return res.status(404).json({
                error: "Film non trovato!"
            });
        }

        // Estraggo il singolo film dall'array di risultati restituito da MySQL
        const movie = movieResults[0];

        // Aggiungo il path completo dell'immagine al film
        movie.image = req.imagePath + movie.image;  // Concatenazione Path completo immagine

        // Seconda query -> Recupero recensioni
        connection.query(query_reviews, [id], (err, reviewsResults) => {

            // Gestione in caso di errore - codice di stato HTTP 500
            if (err) {
                return res.status(500).json({
                    error: "Errore durante il recupero delle recensioni!"
                });
            }

            // Gestione in caso di successo - invia al client il post completo con l'aggiunta delle recensioni
            movie.reviews = reviewsResults; // Aggiungo recensioni al film
            res.json(movie)

        })
    })
}

/************
    EXPORT
************/
module.exports = { index, show };  // Export funzioni controller