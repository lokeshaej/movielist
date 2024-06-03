import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import axios from 'axios';
import MovieSearch from './MovieSearch';
import MovieList from './MovieList';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate,useNavigate  } from 'react-router-dom';
import Footer from './Footer';

function Home() {
  
  const [lists, setLists] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const navigate = useNavigate();
  const [movies, setMovies] = useState([
    {
      "Title": "Star Wars: Episode IV - A New Hope",
      "Year": "1977",
      "imdbID": "tt0076759",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BOTA5NjhiOTAtZWM0ZC00MWNhLThiMzEtZDFkOTk2OTU1ZDJkXkEyXkFqcGdeQXVyMTA4NDI1NTQx._V1_SX300.jpg"
    },
    {
      "Title": "Gangs of New York",
      "Year": "2002",
      "imdbID": "tt0217505",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BNDg3MmI1ZDYtMDZjYi00ZWRlLTk4NzEtZjY4Y2U0NjE5YmRiXkEyXkFqcGdeQXVyNzAxMjE1NDg@._V1_SX300.jpg"
    },
    {
      "Title": "Home Alone 2: Lost in New York",
      "Year": "1992",
      "imdbID": "tt0104431",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BNDI1MzM0Y2YtYmIyMS00ODE3LTlhZjEtZTUyNmEzMTNhZWU5XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
    },
    {
      "Title": "Orange Is the New Black",
      "Year": "2013–2019",
      "imdbID": "tt2372162",
      "Type": "series",
      "Poster": "https://m.media-amazon.com/images/M/MV5BYjYyM2FmMmMtZDgyZi00NGU3LWI3NzktODllZDY0YzQyNzgyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg"
    },
    {
      "Title": "The Twilight Saga: New Moon",
      "Year": "2009",
      "imdbID": "tt1259571",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMTI3MjE3NDIxNF5BMl5BanBnXkFtZTcwODM3NTY5Mg@@._V1_SX300.jpg"
    },
    {
      "Title": "New Girl",
      "Year": "2011–2018",
      "imdbID": "tt1826940",
      "Type": "series",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMjA0MDc1NTk0Ml5BMl5BanBnXkFtZTgwMTk2ODA5NDM@._V1_SX300.jpg"
    },
    {
      "Title": "The Emperor's New Groove",
      "Year": "2000",
      "imdbID": "tt0120917",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMjFkMzk2OWUtNjFmZC00ZTJhLTlkNGYtYjc2YWNkNmJmNzczXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
    },
    {
      "Title": "Escape from New York",
      "Year": "1981",
      "imdbID": "tt0082340",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMTUzMTY0Nzg0MV5BMl5BanBnXkFtZTgwMDU3MzQxMDE@._V1_SX300.jpg"
    },
    {
      "Title": "Gremlins 2: The New Batch",
      "Year": "1990",
      "imdbID": "tt0099700",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BZGE3MTA3OWQtYzVjYi00MjkwLThlZTQtNWUzOGVlYjEwMzBhXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"
    },
    {
      "Title": "Dexter: New Blood",
      "Year": "2021–2022",
      "imdbID": "tt14164730",
      "Type": "series",
      "Poster": "https://m.media-amazon.com/images/M/MV5BZjQwNDE3NGUtMjljMi00OWI4LTljYjktZmMyNWJkMTI1NjZhXkEyXkFqcGdeQXVyOTA3MTMyOTk@._V1_SX300.jpg"
    }
  ]);
  const [cartItems, setCartItems] = useState([]); // State to store cart items
  const user = auth.currentUser;

  
  

  const handleSignOut = () => {
    navigate('/signin');
  };

  
  

  return (
    <div>
      <h1>Welcome, {user ? user.email : 'Guest User'}</h1>
      <button style={{ color: 'White', backgroundColor:'red', width:'8%', marginLeft:'89%' }} onClick={handleSignOut}>Sign Out</button>

      <MovieSearch lists={lists} setSelectedMovie={setSelectedMovie} setMovies={setMovies} />
      {selectedMovie && (
        <div>
          <h2>Selected Movie Details</h2>
          <p>Title: {selectedMovie.Title}</p>
          <p>Plot: {selectedMovie.Plot}</p>
          
          {/* Add more movie details here */}
        </div>
      )}
      <div>
        
        {lists.map(list => (
          <div key={list.id}>
            <h3>{list.name}</h3>
            {/* Add list movie rendering logic here */}
          </div>
        ))}
       
      </div>
      <div>
        <h2><br/><br/>All Movies</h2>
        <div className='container-fluid'>
          <div className='row'>
        <MovieList movies={movies} /></div></div>
      </div>
      <Footer/>
    </div>
    
  );
}

export default Home;
