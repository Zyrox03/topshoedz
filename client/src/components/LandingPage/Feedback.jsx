import { useEffect } from "react";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import { Title } from "../../widgets/Title";
export const Feedback = () => {
  const testimonials = [
    {
      name: "Lina A.",
      text: "أحذية عالية الجودة وخدمة استثنائية! لقد وجدت الزوج المثالي لكل مناسبة. التوصيل سريع والتغليف محكم. أوصي بشدة بهذا المتجر عبر الإنترنت!",
      feedback: "تجربة رائعة! أنا راضية تمامًا عن الجودة والخدمة. شكرًا لكم!"
    },
    {
      name: "Karim H.",
      text: "تجربة عملاء ممتازة! تشكيلة رائعة من الأحذية، وتصفح الموقع سهل. طلباتي دائمًا وصلت في الوقت المحدد، وجودة المنتجات دائمًا على المستوى. شكرًا لكم على كل شيء!",
      feedback: "أنا سعيد جدًا بتجربتي. خدمة سريعة ومنتجات رائعة. أشكركم على الاهتمام بالتفاصيل!"
    },
    {
      name: "Nour K.",
      text: "أنا وفية لهذا المتجر منذ وقت طويل. آخر صيحات الموضة بأسعار تنافسية. الأحذية مريحة ودائمة. خدمة العملاء سريعة الاستجابة ومهذبة. مكان لا غنى عنه لجميع عشاق الأحذية الجميلة!",
      feedback: "تجربة ممتازة! أنا راضية تمامًا ولن أتردد في التسوق مرة أخرى. شكرًا للفريق!"
    },
  ];
  

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

      <div dir='rtl' className="feedbackSwiper h-[325px] w-96 max-w-[90%] flex flex-wrap items-center justify-around gap-12 ">
        <div className="swiper-wrapper">
          {testimonials &&
            testimonials.map(({ name,feedback, text }, index) => (
              <div key={index} className="swiper-slide ">
                <div className="  bg-slate-100 rounded-lg h-[300px] flex flex-col gap-4 p-4 hover:bg-purple-400/50  transition duration-500">
                  <i className="text-4xl text-purple-800 fa-solid fa-quote-left"></i>
                  <h3 className="text-lg text-purple-800 font-bold">{name} </h3>
                  <h4 className="text-md text-purple-800 font-bold">{feedback} </h4>
                  <p className="text-md">{text} </p>
                </div>
              </div>
            ))}
        </div>

      </div>
    </div>
  );
};
