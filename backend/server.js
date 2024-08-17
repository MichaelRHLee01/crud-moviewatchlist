//load port
if (process.env.NODE_ENV != 'production') {
    require("dotenv").config();
};


// Import dependencies

const movieController = require('./controllers/movieController');
const express = require("express");
const connectToDb = require('./config/connectToDb');
const cors = require('cors');
// const Movie = require('./models/movie');

// express app
const app = express();

// configure express app since json cant be read
app.use(express.json());
app.use(cors());

//connect to database
connectToDb();

// route
// app.get('/', (req, res) => {
//     res.json({ "hello": "world" });
// });

app.get('/movies', movieController.fetchMovies);

app.get('/movies/:id', movieController.fetchMovie);

app.post('/movies', movieController.createMovie);

app.put('/movies/:id', movieController.updateMovie);

app.delete('/movies/:id', movieController.deleteMovie);

// start server
app.listen(process.env.PORT);