import React from 'react';
import Styles from './MovieList.module.css';

const MovieList = (props) => (
        <div className={Styles.MovieList} onClick={props.clicked}>
        {props.movieImage === null ? <p>Poster Unavailable</p>: <img src={`http://image.tmdb.org/t/p/w200`+ props.movieImage} alt="images"/>}
        <span>{props.movieName}</span>
    </div>


)
export default MovieList;