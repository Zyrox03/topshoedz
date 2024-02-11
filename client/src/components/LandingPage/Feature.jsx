import { useSelector } from "react-redux";
import { Button } from "../../widgets/Button";
import { Link } from "react-router-dom";
import { Timer } from "../../widgets/Timer";
import DOMPurify from "dompurify";

export const Feature = () => {
  const { items: products, specialOffer } = useSelector(
    (state) => state.products
  );

  const product = products.find(
    (product) => product.slug === specialOffer?.slug
  );

  let deduction = 0;
  deduction = Math.round(
    ((product?.oldPrice - product?.price) / product?.oldPrice) * 100
  );

  const sanitizedDescription = DOMPurify.sanitize(
    specialOffer?.specialDescription.replace(/\n/g, "<br>")
  );
  return (
    specialOffer && (
      <div
        className="flex flex-col items-center justify-center lg:p-4"
        id="feature"
      >
        <div className="bg-purple-400/50 rounded-2xl w-[80%] min-h-[400px] flex flex-col-reverse lg:flex-row items-center p-4 gap-4 relative overflow-hidden">
          <img
            className="absolute h-full object-cover w-full z-0 opacity-[0.5] "
            src="https://static.vecteezy.com/system/resources/thumbnails/011/577/787/small/3d-rendered-colorful-confetti-with-fun-color-png.png"
            alt=""
          />

          {product?.images[0]?.image?.path && (
            <div className="flex-1 flex items-center justify-center h-full z-10 ">
              <img
                src={product?.images[0]?.image?.path}
                alt="special offer"
                className="max-h-[50vh] w-full object-contain rounded-3xl p-4"
              />
            </div>
          )}

          <div
            dir="rtl"
            className="flex-1 flex flex-col items-center lg:items-start  gap-6 justify-around z-10"
          >
            <h2 className="text-xl font-bold text-purple-800">عرض خاص</h2>
            {parseFloat(product?.oldPrice) > 0 && deduction > 0 && (
              <span className="text-2xl lg:text-4xl font-bold bg-purple-800 text-white p-2 w-fit rounded-lg shadow-xl">
                تخفيض {deduction}%{" "}
              </span>
            )}

            <p
              dir="rtl"
              className="text-lg"
              dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
            ></p>

<Timer deadline={specialOffer?.deadline} />

            <Link to={`/${specialOffer?.slug}`}>
              <Button text="انظر" icon="fa-solid fa-tag" />
            </Link>
          </div>
        </div>
      </div>
    )
  );
};
