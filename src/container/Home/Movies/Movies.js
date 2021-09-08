import React, { useEffect, useState, useLayoutEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import MovieList from "../../../components/MovieList/MovieList";
import axios from "axios";
import Styles from "./Movies.module.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [moviePage, setMoviePage] = useState(1);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=5dcd168449df5fd53ec8604919da15fe&language=en-US&page=${moviePage}&include_adult=false`
      )
      .then((response) => {
        const movies = response.data.results.slice(0, 40);
        const updatedMovies = movies.map((movie) => {
          return (
            <Link to={`/Info/${movie.id}`} key={movie.id}>
              <MovieList
                movieImage={movie.poster_path}
                movieName={movie.title}
              />
            </Link>
          );
        });
        setMovies(updatedMovies);
        setLoading(false);
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
      });
  }, [moviePage]);

  //To open window at top of the page
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //Scroll function
  const scrollToTop = () => {
    window.scrollTo({
      top: 500,
      behavior: "smooth",
    });
  };

  //Change to Next Page
  const nextPageHandler = () => {
    setMoviePage((prevState) => prevState + 1);
    scrollToTop();
  };

  //Change to Previous Page
  const prevPageHandler = () => {
    setMoviePage((prevState) => prevState - 1);
    scrollToTop();
  };

  let MovieContainer = (
    <p style={{ textAlign: "center" }}>Something Went Wrong !!!</p>
  );

  if (!error) {
    MovieContainer = (
      <div className={Styles.MovieContainer}>
        <h3>MOVIES</h3>
        <div className={Styles.Movies}>{movies}</div>
        {moviePage > 1 ? (
          moviePage === 6 ? (
            <button onClick={prevPageHandler}> GO BACK</button>
          ) : (
            <div>
              <button className={Styles.PrevButton} onClick={prevPageHandler}>
                PREV
              </button>
              <button className={Styles.NextButton} onClick={nextPageHandler}>
                NEXT
              </button>
            </div>
          )
        ) : (
          <button onClick={nextPageHandler}>VIEW MORE</button>
        )}
      </div>
    );
  }

  if (loading) {
    MovieContainer = <Spinner />;
  }

  return <React.Fragment>{MovieContainer}</React.Fragment>;
};

export default withErrorHandler(withRouter(Movies), axios);
