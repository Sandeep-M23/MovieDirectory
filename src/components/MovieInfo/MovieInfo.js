import React, { useContext } from "react";
import Styles from "./MovieInfo.module.css";
import AuthContext from "../../context/AuthContext";

const MovieInfo = (props) => {
  const authctx = useContext(AuthContext);
  const isLoggedIn = authctx.isLoggedIn;
  return (
    <div className={Styles.InfoCard}>
      {props.moviePoster === null ? (
        <p>Poster Unavailable</p>
      ) : (
        <img
          src={`http://image.tmdb.org/t/p/w300` + props.moviePoster}
          alt="MoviePoster"
        />
      )}
      <div className={Styles.Info}>
        <h1>{props.title}</h1>
        <p>{props.movieDesc}</p>
        <div className={Styles.Span}>
          <span>Ratings - {props.ratings}</span>
          <span>Release Date - {props.date}</span>
          <span>Genres - {props.genre}</span>
        </div>
        <button
          onClick={props.clicked}
          disabled={isLoggedIn ? props.disabled : true}
        >
          {props.disabled ? "ADDED TO WATCHLIST" : "ADD TO WATCHLIST"}
        </button>
      </div>
    </div>
  );
};
export default MovieInfo;
