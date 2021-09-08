import React  from 'react';
import Styles from './WatchListCard.module.css';


const WatchListCard = (props) =>{
    let attachedStyles= [Styles.watchListCard,Styles.fadeIn]

    return(
        <div className={attachedStyles.join(' ')}>
        <img src={`http://image.tmdb.org/t/p/w200`+ props.image} alt="Movie Poster"/>
        <div className={Styles.Desc}>
        <h1>{props.title}</h1>
        <h5>RATINGS - {props.rating} </h5>
        </div>
        <button className={Styles.deleteButton} onClick={props.delete}>REMOVE</button>
    </div>
    )
}
export default WatchListCard;