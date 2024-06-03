import React from 'react';

function MovieList({ movies }) {
  const handleClick = (movie) => {
    alert(`Title: ${movie.Title}\nYear: ${movie.Year}\nPlot: ${movie.Plot}`);
  };

  return (
    <div className="row">
      {movies.map(movie => (
        <div key={movie.imdbID} className="col-md-3">
          <div className="card mb-3" onClick={() => handleClick(movie)}>
            <img src={movie.Poster} className="card-img-top" alt={movie.Title} />
            <div className="card-body">
              <h5 className="card-title">{movie.Title}</h5>
              <p className="card-text">Year: {movie.Year}</p>
              {/* Add more movie details here */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MovieList;
