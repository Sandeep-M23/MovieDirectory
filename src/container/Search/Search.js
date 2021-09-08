import React, { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { Link } from "react-router-dom";
import SearchBar from "../../components/Navigation/SearchBar/SearchBar";
import axios from "axios";
import Styles from "./Search.module.css";
import Spinner from "../../components/UI/Spinner/Spinner";

const cancelTokenSource = axios.CancelToken.source();

const Search = () => {
  const [searchMovie, setSearchMovie] = useState([]);
  const [movieName, setMovieName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 2500);
    }
  }, [loading]);

  //To Search Movie
  const movieSearchHandler = (event) => {
    setMovieName(event.target.value);
    setLoading(true);
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=5dcd168449df5fd53ec8604919da15fe&language=en-US&page=1&include_adult=false&query=${event.target.value}`,
        { cancelToken: cancelTokenSource.token }
      )
      .then((response) => {
        const searchMovies = response.data.results;
        const updatedSearchMovies = searchMovies.map((searchMovie) => {
          return (
            <li key={searchMovie.id}>
              <Link to={`/Info/${searchMovie.id}`}>
                <MovieList
                  movieImage={searchMovie.poster_path}
                  movieName={searchMovie.title}
                />
              </Link>
            </li>
          );
        });
        setSearchMovie(updatedSearchMovies);
        setLoading(false);
      })
      .catch((error) => {
        //  setError(true);
        //  setLoading(false);
      });
  };

  let SearchedMovieList = (
    <p style={{ textAlign: "center" }}>Something Went Wrong !!!</p>
  );

  if (!error) {
    SearchedMovieList = (
      <ul className={Styles.SearchedMovieList}>{searchMovie}</ul>
    );
  }

  if (loading) {
    SearchedMovieList = <Spinner />;
  }

  return (
    <div className={Styles.Search}>
      <SearchBar
        changed={(event) => movieSearchHandler(event)}
        name={movieName}
      />
      {SearchedMovieList}
      {!loading && searchMovie.length === 0 && movieName.trim() === "" && (
        <p>PLEASE ENTER THE MOVIE TO BE SEARCHED</p>
      )}
      {!loading && searchMovie.length === 0 && movieName.trim() !== "" && (
        <p>NO SUCH MOVIE EXISTS !!!</p>
      )}
    </div>
  );
};

export default Search;
