import { useEffect } from "react";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";

export const HeroSwiper = () => {
  useEffect(() => {
    // Initialize Swiper inside the useEffect function
    const swiper = new Swiper(".swiper", {
      direction: "horizontal",

      autoplay: {
        delay: 5000,
      },

      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      pagination: {
        el: ".swiper-pagination",
      },

      scrollbar: {
        el: ".swiper-scrollbar",
      },

      keyboard: {
        enabled: true,
        onlyInViewport: false,
      },
    });

    // Destroy Swiper when the component unmounts
    return () => {
      swiper.destroy();
    };
  }, []); // The empty dependency array ensures this runs only once after component mount

  return (
    <div className="swiper absolute inset-0 h-full w-full">
        
      <div className="swiper-wrapper">
        <div className="swiper-slide">
          <img
            src="https://cms-cdn.thesolesupplier.co.uk/2020/12/image-via-43einhalb-1_w1160.jpg"
            alt="hero image"
            className=" object-cover inset-0 h-full w-full"
          />
        </div>
        <div className="swiper-slide">
          <img
            src="https://images.augustman.com/wp-content/uploads/sites/3/2022/04/25181356/air-jordan-1-retro-high-og-_university-blue_1.jpeg"

            alt="hero image"
            className=" object-cover inset-0 h-full w-full"
          />
        </div>
      </div>
      <div className="swiper-pagination"></div>
    </div>
  );
};
