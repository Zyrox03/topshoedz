import { useEffect } from "react";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import { Title } from "../../widgets/Title";
import testimonials from "../../assets/testimonials.json";
export const Feedback = () => {
  useEffect(() => {
    // Initialize Swiper inside the useEffect function
    const swiper = new Swiper(".feedbackSwiper", {
      direction: "horizontal",

      spaceBetween: 100,
      speed: 500,

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
    <div className="flex flex-col items-center gap-12 p-8">
      <Title title="تعليقات" />

      <div
        dir="rtl"
        className="feedbackSwiper max-w-[85%] lg:max-w-[50%] flex flex-wrap items-center justify-around gap-12 "
      >
        <div className="swiper-wrapper">
          {testimonials &&
            testimonials.map(({ name, feedback, text }, index) => (
              <div key={index} className="swiper-slide">
                <div className="  bg-slate-100 rounded-lg flex flex-col gap-4 p-4 hover:bg-purple-400/50  transition duration-500">
                  <i className="text-4xl text-purple-800 fa-solid fa-quote-left"></i>
                  <h3 className="text-lg text-purple-800 font-bold">{name} </h3>
                  <h4 className="text-md text-purple-800 font-bold">
                    {feedback}{" "}
                  </h4>
                  <p className="text-md">{text} </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
