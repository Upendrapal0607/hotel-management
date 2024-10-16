import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css"; // Make sure this is imported

const Carousel = ({ cards }) => {
  const [hover, setHover] = useState(false);
  const [flipped, setFlipped] = useState(Array(cards.length).fill(false));
  console.log({ hover });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: !hover,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const handleFlip = (index) => {
    setFlipped((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="w-full px-4 py-8"
    >
      <Slider {...settings}>
        {cards.map((card, index) => (
          <div key={index} className="p-0 w-full rounded-lg">
            <div
              className={`flip-card ${flipped[index] ? "flipped" : ""}`}
              onClick={() => handleFlip(index)}
            >
              <div className="flip-card-inner shadow-lg rounded-lg overflow-hidden">
                <div className="flip-card-front p-4">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-[300px] bg-cover object-cover"
                  />

                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-800">
                      {card.title}
                    </h3>
                    <p className="text-gray-600 mt-2">
                      {card.description.substring(0, 50)}...
                    </p>
                  </div>
                </div>
                <div className="flip-card-back flex justify-center items-center p-4">
                  <h3 className="text-lg font-bold">{card.title}</h3>
                  <p>{card.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
