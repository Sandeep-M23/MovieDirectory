import React, { useEffect, useState , useCallback,useContext} from "react";
import { withRouter, useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import MovieInfo from "../../components/MovieInfo/MovieInfo";
import axiosInstance from "../../axios-watchList";
import AuthContext from "../../context/AuthContext";

const Info = () => {
  const [info, setInfo] = useState([]);
  const [genre, setGenre] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [addedToWatchList, setAddedToWatchList] = useState(false);

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const userId = authCtx.userId;

  let { id } = useParams();

  //To get the required Movie Info
  const getInfo = useCallback(() => {
    setLoading(true);
    axios
      .get(
        `
        https://api.themoviedb.org/3/movie/${id}?api_key=5dcd168449df5fd53ec8604919da15fe&language=en-US&external_source=imdb_id`
      )
      .then((response) => {
        const genres = response.data.genres;
        const updatedGenres = genres.map((genre) => {
          return <li key={genre.id}>{genre.name}</li>;
        });
        setInfo(response.data);
        setGenre(updatedGenres);
        setLoading(false);
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
      });
  },[id])

  //Check if its already added to Watchlist
  const retrieveWatchListMovies = useCallback(() => {
    setLoading(true);
    let queryParams =
      "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axiosInstance.get("/WatchList.json" + queryParams).then((response) => {
      let fetchedWatchListMovies = [];
      for (let key in response.data) {
        fetchedWatchListMovies.push({
          ...response.data[key],
          dataId: key,
        });
      }
      let watchListMovies = !!fetchedWatchListMovies.find(
        (movie) => movie.id === Number(id)
      );
      if (watchListMovies) {
        setAddedToWatchList(true);
      } else {
        setAddedToWatchList(false);
      }
    });
    setLoading(false)
  }, [id,token,userId]);


  useEffect(() => {
    retrieveWatchListMovies();
    getInfo();
  }, [getInfo,retrieveWatchListMovies]);

  //Add to watchList 
  const addToWatchListHandler = (movieData) => {
    const movie = {
      id: movieData.id,
      title: movieData.title,
      ratings: movieData.vote_average,
      imageSrc: movieData.poster_path,
      addedToWatchList: true,
      userId:userId
    };

    //Send Movie data to firebase
    axiosInstance
      .post("WatchList.json?auth=" + token, movie)
      .then((response) => {
        setAddedToWatchList(true);
      })
      .catch((error) => console.log(error));
  };

  let Info = <p style={{ textAlign: "center" }}>Something Went Wrong !!!</p>;

  if (!error) {
    Info = (
      <MovieInfo
        title={info.title}
        moviePoster={info.poster_path}
        movieDesc={info.overview}
        ratings={info.vote_average}
        date={info.release_date}
        genre={genre}
        clicked={() => addToWatchListHandler(info)}
        disabled={addedToWatchList}
      />
    );
  }

  if (loading) {
    Info = <Spinner />;
  }

  return <React.Fragment>{Info}</React.Fragment>;
};

export default withErrorHandler(withRouter(Info), axios);
