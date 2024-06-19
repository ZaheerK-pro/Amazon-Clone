import React from "react";
import "./banner.css";
import Carousel from "react-material-ui-carousel";

const data = [
    "https://m.media-amazon.com/images/I/61Dr+oVuClL._SX3000_.jpg",
    "https://m.media-amazon.com/images/I/A1Bqe5lNhDL._SX3000_.png",
    "https://m.media-amazon.com/images/I/916VpzBGLaL._SX3000_.jpg",
    "https://m.media-amazon.com/images/I/61xJkbCCroL._SX3000_.jpg",
    "https://m.media-amazon.com/images/I/91IVyMohcOL._SX3000_.jpg"

//   "https://rukminim1.flixcart.com/flap/1680/280/image/1defb861e409319b.jpg?q=50",
//   "https://rukminim1.flixcart.com/flap/1680/280/image/685712c6cefb3c02.jpg?q=50",
//   "https://rukminim1.flixcart.com/flap/1680/280/image/8d4150cc4f3f967d.jpg?q=50",
//   "https://rukminim1.flixcart.com/flap/1680/280/image/685712c6cefb3c02.jpg?q=50",
];

const banner = () => {
  return (
    <>
      <Carousel
        className="carasousel"
        autoPlay={true}
        animation="slide"
        indicators={false}
        navButtonsAlwaysVisible={true}
        cycleNavigation={true}
        navButtonsProps={{
          style: {
            background: "#fff",
            color: "#494949",
            borderRadius: 0,
            marginTop: -22,
            height: "104px",
          },
        }}
      >
        {data.map((img, i) => {
          return (
            <>
              <img src={img} alt="img" key={i} className="banner_img" />
            </>
          );
        })}
      </Carousel>
    </>
  );
};

export default banner;
