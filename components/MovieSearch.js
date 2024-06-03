import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MovieSearch.css'; // Import CSS file
import Footer from './Footer';

const API_KEY = '6e3a2cc3'; // Replace with your OMDb API key

function MovieSearch({ lists, addMovieToList }) {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const searchMovies = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const searchTerm = query.trim();

    try {
      let response;
      if (searchTerm) {
        response = await axios.get(`https://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY}`);
      } else {
        response = await axios.get(`https://www.omdbapi.com/?s=&apikey=${API_KEY}`);
      }

      if (response.data && response.data.Search) {
        setMovies(response.data.Search);
      } else {
        setMovies([]);
        alert('No movies found for your search.')
        setError('No movies found for your search.');
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
      setError('An error occurred while fetching movies.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const response = await axios.get(`https://www.omdbapi.com/?s=&apikey=6e3a2cc3`);
        console.log('OMDB API Response:', response.data); // Log the response data
        if (response.data && response.data.Search) {
          
          setMovies(response.data.Search);
        } else {
          setMovies([]);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
        setMovies([]);
      }
    };
  
    fetchAllMovies();
  }, []);
  

  useEffect(() => {
    const fetchMovieDetails = async (imdbID) => {
      try {
        const response = await axios.get(`https://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`);
        console.log('Movie details:', response.data);
        setSelectedMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setError('An error occurred while fetching movie details.');
      }
    };

    if (selectedMovie) {
      fetchMovieDetails(selectedMovie.imdbID);
      
    }
  }, [selectedMovie]);

  return (
    <div>
      <form onSubmit={searchMovies}>
        <input style={{height: "60px",width: "100", border:'500px'}} type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search Movies" />
        <button type="submit">Search</button>
      </form>

      {isLoading && <p>Loading movies...</p>}
      {error && <p className="error-message">{error}</p>}
     
     
      {selectedMovie && (
        <div style={{height: "60px",color:'green', backgroun:'yellow',width: "100", border:'500px'}} className="movie-details">
          
          <h2>{selectedMovie.Title}</h2>
          <p>{selectedMovie.Plot}</p>
          
          
          
          
        </div> 
      )}
      <div className="movie-container">
        {movies.map(movie => (
          <div className="movie-item" key={movie.imdbID} onClick={() => setSelectedMovie(movie)}>
            <h3>{movie.Title}</h3>
            <img src={movie.Poster} alt={movie.Title} />
          </div>
        ))}
      </div>

      
    </div>
  );
}

export default MovieSearch;