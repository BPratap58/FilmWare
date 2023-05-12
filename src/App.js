import React from 'react';
import {useState, useEffect } from 'react';
//import { ReactDOM } from 'react';
import SearchIcon from './search.svg';
import './App.css';
import MovieCart from './MovieCart';

//843fb208

const API_URL = 'http://www.omdbapi.com?apikey=843fb208'
const movie1 = {
"Poster": "https://m.media-amazon.com/images/M/MV5BZWQxMjcwNjItZjI0ZC00ZTc4LWIwMzItM2Q0YTZhNzI3NzdlXkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_SX300.jpg",
"Title": "Italian Spiderman",
"Type": "movie",
"Year": "2007",
"imdbID": "tt2705436"
}

const App = () => {
  
  const[movies, setMovies] = useState([]);
  const[searchTerm, setSearchTerm] = useState('');
  const searchMovies = async(title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  }

  useEffect( () => {
    searchMovies('Spiderman');
  }, []);

  return(
    <div className='app'>
      <h1> MoviesWare </h1>
      <div className='search'>
        <input
            placeholder = "Search for Movie"
            value = {searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
         />
        <img
            src={SearchIcon}
            alt = "Search"
            onClick={() => searchMovies(searchTerm)}
         />
      </div>

      {
        movies?.length > 0 
        ? (
            <div className="container">
              {movies.map((movie) => (
                <MovieCart movie={movie} />
              ))}
              </div>
          ) : (
                <div className='empty'>
                  <h2> No Movie Found</h2>
                </div>
              )
      }
    </div>
  );
}

export default App;
