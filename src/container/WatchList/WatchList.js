import React, { useEffect, useState ,useContext} from "react";
import WatchListCard from "../../components/WatchListCard/WatchListCard";
import axiosInstance from "../../axios-watchList";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from '../../components/UI/Spinner/Spinner';
import Styles from './WatchList.module.css';
import AuthContext from '../../context/AuthContext';

const WatchList = () => {
  const [watchListMovies, setWatchListMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const userId = authCtx.userId;

  useEffect(() => {
    setLoading(true);
    //Recieve movie data from firebase
    let queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axiosInstance
      .get("/WatchList.json" + queryParams)
      .then((response) => {
        //console.log(response.data)
        let fetchedWatchListMovies = [];
        for (let key in response.data) {
          fetchedWatchListMovies.push({
            ...response.data[key],
            dataId: key,
          });
        }
        setWatchListMovies(fetchedWatchListMovies);
        setLoading(false);
      })
      .catch((error) => {
        //console.log(error);
        setLoading(false);
      });
  },[token,userId]);

  //Delete Movie from WatchList
  const deleteWatchListMovieHandler = (dataId) => {
    //To delete product from Firebase
    setLoading(true);
    axiosInstance
      .delete(`/WatchList/${dataId}.json?auth=` + token)
      .then((response) => {
        const removeMovie = watchListMovies.filter(
          (movie) => movie.dataId !== dataId
        );
        setWatchListMovies(removeMovie);
      });
    setLoading(false);
  };

  let watchList;

  if(loading){
    watchList = <Spinner/>
  }

  watchList= watchListMovies.map((movie) => (
    <WatchListCard
      key={movie.id}
      image={movie.imageSrc}
      title={movie.title}
      rating={movie.ratings}
      delete={() => deleteWatchListMovieHandler(movie.dataId, movie.id)}
    />
  ));
  
  if (watchList.length === 0) {
    return (
      <div className={Styles.WatchList__empty}>
        <h1>WATCHLIST IS EMPTY</h1>
      </div>
    );
  }

  return <div>{watchList}</div>;
};
export default withErrorHandler(WatchList, axiosInstance);
