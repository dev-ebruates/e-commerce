import { useState } from "react";
import SliderItem from "./SliderItem";
import "./Sliders.css";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  function CheckActive(number) {
    return currentSlide === number ? "active" : "";
  }
  return (
    <section className="slider">
      <div className="slider-elements">
        {currentSlide === 0 && <SliderItem imageSrc="img/slider/slider1.jpg" />}
        {currentSlide === 1 && <SliderItem imageSrc="img/slider/slider2.jpg" />}
        {currentSlide === 2 && <SliderItem imageSrc="img/slider/slider3.jpg" />}

        <div className="slider-buttons">
          <button
            onClick={() => {
              setCurrentSlide((currentSlide - 1 + 3) % 3);
            }}
          >
            <i className="bi bi-chevron-left"></i>
          </button>
          <button
            onClick={() => {
              setCurrentSlide((currentSlide + 1) % 3);
            }}
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
        <div className="slider-dots">
          <button
            className={`slider-dot ${currentSlide == 0 ? "active" : " "} `}
            onClick={()=>setCurrentSlide(0)}
          >
            <span></span>
          </button>
          <button
            className={`slider-dot ${currentSlide == 1 ? "active" : " "} `}
            onClick={()=>setCurrentSlide(1)}
          >
            <span></span>
          </button>
          <button className={`slider-dot ${CheckActive(2)}`}
          onClick={()=>setCurrentSlide(2)}>
            <span></span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Slider;
