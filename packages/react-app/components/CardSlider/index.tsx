import React from "react";
import Slider from "react-slick";
import Card from "../Cards";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Music {
  id: number;
  title: string;
  artist: string;
  imageUrl: string;
  audioUrl: string;
}

interface CardSliderProps {
  musicData: Music[];
}

const CardSlider: React.FC<CardSliderProps> = ({ musicData }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {musicData.map((music, index) => (
        <div key={index} className="p-1">
          <Card
            id={music.id}
            title={music.title}
            artist={music.artist}
            imageUrl={music.imageUrl}
            audioUrl={music.audioUrl}
          />
        </div>
      ))}
    </Slider>
  );
};

export default CardSlider;
