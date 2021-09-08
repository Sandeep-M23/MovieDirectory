
import React from 'react';
import Slider from 'react-animated-slider';
import './styles.css'
import "react-animated-slider/build/horizontal.css";
import "./slider-animations.css";

const content = [
  {
    title: "Wonder Woman 1984",
    image: "https://cdn.watch-series.co/cover/wonder-woman-1984-large.png" ,
    rating : "7.1"
  },
  {
    title: "Soul",
    image: "https://cdn.watch-series.co/cover/soul-large.png",
    rating:"8.5" 
  },
  {
    title: "Tenet",
    image: "https://cdn.watch-series.co/cover/tenet-large.png",
    rating:"7.3" 
  },
  {
    title: "Outside The Wire",
    image: "https://cdn.watch-series.co/cover/outside-the-wire-large.png",
    rating:"6.3" 
  },
  {
    title: "Mulan 2020",
    image: "https://cdn.watch-series.co/cover/mulan-2020-large.png",
    rating:"7.1" 
  }
];

const Carousel = () => {
    return (
      <React.Fragment>
        <Slider className="slider-wrapper">
          {content.map((item, index) => (
            <div
              key={index}
              className="slider-content"
              style={{
                background: `url('${item.image}') no-repeat center center`,
                margin:'20px',
                width:"97%"
              }}
            >
              <div className="inner">
                <h1>{item.title}</h1>
                <p>Ratings:{item.rating}</p>
              </div>
            </div>
          ))}
        </Slider>
      </React.Fragment>
    );
}




export default Carousel;
