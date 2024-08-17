import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [movies, setMovies] = useState(null);
  const [createForm, setCreateForm] = useState({
    title: '',
    genre: '',
    director: '',
    year: '',
    rating: ''
  });

  const [updateForm, setUpdateForm] = useState({
    _id: null,
    title: '',
    genre: '',
    director: '',
    year: '',
    rating: ''
  });

  // useEffect
  useEffect(() => {
    fetchMovies();
  }, [])

  const fetchMovies = async () => {
    //fetch movies, set  to states
    const res = await axios.get('http://localhost:3000/movies');
    setMovies(res.data.movies)
  }

  const updateCreateFormField = (e) => {
    const { name, value } = e.target;

    setCreateForm({
      ...createForm,
      [name]: name === "year" || name === "rating" ? parseInt(value) || '' : value,
    })
  };

  const createMovie = async (e) => {
    e.preventDefault();
    //create movie
    const res = await axios.post('http://localhost:3000/movies', createForm);
    //update state
    setMovies([...movies, res.data.movie]);

    //clear state on form
    setCreateForm({ title: '', genre: '', director: '', year: '', rating: '' });
  }

  const deleteMovie = async (_id) => {
    //delete the movie, update state
    const res = await axios.delete('http://localhost:3000/movies/' + _id);

    const newMovies = [...movies].filter(movie => {
      return movie._id !== _id;
    })

    setMovies(newMovies);
  }

  const handleUpdateFieldChange = (e) => {
    const { value, name } = e.target;

    setUpdateForm({
      ...updateForm,
      [name]: name === "year" || name === "rating" ? parseInt(value) || '' : value,
    })
  }

  const toggleUpdate = (movie) => {
    // get current movie values, then set state to update form
    setUpdateForm({
      title: movie.title,
      genre: movie.genre,
      director: movie.director,
      year: movie.year,
      rating: movie.rating,
      _id: movie._id,
    });
  }

  const updateMovie = async (e) => {
    e.preventDefault();


    const { title, genre, director, year, rating } = updateForm;
    //Send update request, then update the movie
    const res = await axios.put('http://localhost:3000/movies/' + updateForm._id, {
      title, genre, director, year, rating
    });

    const newMovies = [...movies];
    const movieIndex = movies.findIndex(movie => {
      return movie._id === updateForm._id;
    });
    newMovies[movieIndex] = res.data.movie;
    setMovies(newMovies);

    //clear update form's state
    setUpdateForm({
      _id: null,
      title: '',
      genre: '',
      director: '',
      year: '',
      rating: '',
    })
  };

  return <div className="App">
    <div>
      <h2>Movies:</h2>
      {movies &&
        movies.map(movie => {
          return (
            <div key={movie._id}>
              <h3>{movie.title}</h3>
              <button onClick={() => deleteMovie(movie._id)}>Delete</button>
              <button onClick={() => toggleUpdate(movie)}>Update</button>
            </div>
          );
        })}
    </div>

    {updateForm._id && (<div>
      <h2>Update</h2>
      <form onSubmit={updateMovie}>
        <input onChange={handleUpdateFieldChange} value={updateForm.title} name="title" placeholder="Movie title" />
        <input onChange={handleUpdateFieldChange} value={updateForm.genre} name="genre" placeholder="Genre" />
        <input onChange={handleUpdateFieldChange} value={updateForm.director} name="director" placeholder="Director" />
        <input onChange={handleUpdateFieldChange} value={updateForm.year || ''} name="year" placeholder="Release Year" />
        <input onChange={handleUpdateFieldChange} value={updateForm.rating || ''} name="rating" placeholder="Rating" />
        <button type="submit">Edit Movie</button>
      </form>
    </div>)}

    {!updateForm._id && (<div>
      <h2>Create movie</h2>
      <form onSubmit={createMovie}>
        <input onChange={updateCreateFormField} value={createForm.title} name="title" placeholder="Movie title" />
        <input onChange={updateCreateFormField} value={createForm.genre} name="genre" placeholder="Genre" />
        <input onChange={updateCreateFormField} value={createForm.director} name="director" placeholder="Director" />
        <input onChange={updateCreateFormField} value={createForm.year || ''} name="year" placeholder="Release Year" />
        <input onChange={updateCreateFormField} value={createForm.rating || ''} name="rating" placeholder="Rating" />
        <button type="submit">Create Movie</button>
      </form>
    </div>)}

  </div>;
}

export default App;
