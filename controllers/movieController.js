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
            movie.image = req.imagePath + movie.image;          // Concatenazione Path completo immagine
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

    /* Definizione della query SQL per recuperare il film richiesto 
       includendo la media dei voti calcolata dalle recensioni tramite LEFT JOIN */
    const query_movie = ` 
        SELECT movies.*, ROUND(AVG(reviews.vote)) AS average_vote
        FROM movies
        LEFT JOIN reviews
            ON movies.id = reviews.movie_id
        WHERE movies.id = ?
        GROUP BY movies.id;
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

            /* Gestione in caso di successo:
                invia al client i dati del film richiesto 
                con l'aggiunta delle recensioni e della media dei voti
            */
            movie.reviews = reviewsResults;                     // Aggiungo recensioni al film
            movie.avarage_vote = parseInt(movie.avarage_vote);  // Converto la media dei voti in numero intero per la visualizzazione delle stelline
            
            res.json(movie)

        })
    })
}

// --------------------------------------------------- ROTTA STORE REVIEW --------------------------------------------------------
function storeReview(req, res) { 
    
    const id = parseInt(req.params.id);     // Recupero id dall'URL
    const {title, vote, name } = req.body;   // Recupero dati recensione dal body della richiesta
    
    // Definizione della query SQL per aggiungere una recensione
    const query_newRieview = `
        INSERT INTO reviews (movie_id, text, vote, name)
        VALUES(? , ? , ?, ?)
    `;

    // Esecuzione query passando i valori per aggiungere la recensione
    connection.query(query_newRieview, [id, text, vote, name], (err, newReviewResult) => {

        // Gestione in caso di errore - codice di stato HTTP 500
        if(err)
            return res.status(500).json(
        {
            error: "Inserimento recensione fallito!"
        })

        // Gestione in caso di successo - codice di stato HTTP 201
        res.status(201) .json(
        { 
                id: newReviewResult.insertId,                   // Restituisco id assegnato automaticamente dal db
                message: "Recensione aggiunta con successo!"    // Restituisco messaggio di conferma
        });
    })
}

// --------------------------------------------------- ROTTA STORE MOVIE --------------------------------------------------------
function storeMovie(req, res) {

    const { title, director, abstract } = req.body;   // Recupero dati testuali film dal body della richiesta
    const image = `${req.file.filename}`;         // Recupero nome del file caricato dal middleware multer

    // Definizione della query SQL per aggiungere un nuovo film al db
    const query_newMovie = `
    INSERT INTO movies (image, title, director, abstract)
    VALUES(? , ? , ?, ?)
    `;

    // Esecuzione query SQL passando i valori come array
    connection.query(query_newMovie, [image, title, director, abstract], (err, newMovieResult) => {

        // Gestione in caso di errore - codice di stato HTTP 500
        if (err) {
            console.error("ERRORE QUERY:", err);
            return res.status(500).json(
                {
                    error: "Inserimento film fallito!"
                })
            }
        // Gestione in caso di successo - codice di stato HTTP 201
        res.status(201).json(
            {
                id: newMovieResult.insertId,                    // Restituisco id assegnato automaticamente dal db
                message: "Recensione aggiunta con successo!"    // Restituisco messaggio di conferma
            });
    })

}

/************
    EXPORT
************/
module.exports = { index, show, storeReview, storeMovie };      // Export funzioni controller