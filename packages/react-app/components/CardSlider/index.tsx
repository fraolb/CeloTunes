import React from "react";
import Slider from "react-slick";
import Card from "../Cards";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Music } from "@/types/music";

interface CardSliderProps {
  musicData: Music[];
}
function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "none", background: "green" }}
      onClick={onClick}
    />
  );
}

const CardSlider: React.FC<CardSliderProps> = ({ musicData }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SamplePrevArrow />,

    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          prevArrow: <SamplePrevArrow />,
          nextArrow: <SamplePrevArrow />,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {musicData.map((music, index) => (
        <div key={index} className="p-1">
          <Card music={music} />
        </div>
      ))}
    </Slider>
  );
};

export default CardSlider;
