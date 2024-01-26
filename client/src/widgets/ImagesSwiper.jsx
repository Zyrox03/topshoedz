import { useEffect } from "react";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import PropTypes from "prop-types";

export const ImagesSwiper = ({ productImages }) => {
  useEffect(() => {
    // Initialize Swiper inside the useEffect function
    const swiper = new Swiper(".imageSwiper", {
      direction: "horizontal",

      autoplay: {
        delay: 5000,
      },

      pagination: {
        el: ".pagination",
        clickable: true,
        renderBullet: function (index, className) {
          return `<img
          src=${productImages && productImages[index].image}
          alt=""
          class="${className} object-cover rounded-none h-40 w-full span-col-1 border-r"
        />
       
       `;
        },
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
  }, [productImages]);

  return (
    <div className="w-full rounded-lg h-full flex flex-col gap-2 justify-between overflow-hidden">
      <div className=" w-full h-[50vh]">
        <div className="imageSwiper h-full w-full ">
          <div className="swiper-wrapper">
            {productImages &&
              productImages.length > 0 &&
              productImages.map((image, index) => (
                <div
                  key={index}
                  className="swiper-slide flex justify-center items-center"
                >
                  <img
                    src={image.image}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${productImages.length}, 1fr)`,
        }}
        className={`pagination`}
      ></div>
    </div>
  );
};

ImagesSwiper.propTypes = {
  productImages: PropTypes.array,
};
