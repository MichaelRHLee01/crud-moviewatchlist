const Movie = require('../models/movie')

const fetchMovies = async (req, res) => {
    // find movies and respond w/ them
    const movies = await Movie.find();

    res.json({ movies });
};

const fetchMovie = async (req, res) => {
    // take id off from the URL, then find film using id
    const filmId = req.params.id;

    const movie = await Movie.findById(filmId);

    //respond
    res.json({ movie });
};

const createMovie = async (req, res) => {
    // get sent-in data off from the request body


    const { title, genre, director, year, rating } = req.body;
    // const title = req.body.title;
    // const genre = req.body.genre;
    // const director = req.body.director;
    // const year = req.body.year;
    // const rating = req.body.rating;
    // create a movie schema
    const movie = await Movie.create({
        title,
        genre,
        director,
        year,
        rating,
    });

    // respond with new movie
    res.json({ movie });
};

const updateMovie = async (req, res) => {
    //Get id from url, and find, update the movie list
    const filmId = req.params.id;

    //Get data off from request
    const { title, genre, director, year, rating } = req.body;
    // const title = req.body.title;
    // const genre = req.body.genre;
    // const director = req.body.director;
    // const year = req.body.year;
    // const rating = req.body.rating;

    await Movie.findByIdAndUpdate(filmId, {
        title,
        genre,
        director,
        year,
        rating
    });

    // retrieve the updated version

    const movie = await Movie.findById(filmId);

    res.json({ movie });

};

const deleteMovie = async (req, res) => {
    //get id, delete, then respond

    const filmId = req.params.id;

    await Movie.deleteOne({ _id: filmId });
    res.json({ success: "Film deleted" });
};

module.exports = {
    fetchMovies,
    fetchMovie,
    createMovie,
    updateMovie,
    deleteMovie
};