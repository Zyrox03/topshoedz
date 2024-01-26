import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const ProductCard = ({ product }) => {
  //   GET DISCOUNT
  function getDiscountPercentage(oldPrice, currentPrice) {
    if (oldPrice && currentPrice && oldPrice > currentPrice) {
      const discount = ((oldPrice - currentPrice) / oldPrice) * 100;
      return Math.round(discount);
    }
    return 0;
  }
  return (
    <Link to={`/${product.name}`} className="flex flex-col gap-2 w-[40%] lg:w-[20em] p-4  bg-slate-100 rounded-lg relative shadow-lg">

      <div className="overflow-hidden rounded-lg ">
        {/* discount tag */}
        {product.oldPrice && (
          <div className="bg-purple-800 text-white w-fit absolute top-6 left-6 px-2 font-bold rounded-full z-10">
            {getDiscountPercentage(product.oldPrice, product.price)}% OFF
          </div>
        )}
        <img
          src={product.images[0].image}
          alt="product image"
          className="w-full h-[150px] lg:h-[350px] object-cover hover:scale-105 duration-300 transition"
        />
      </div>

      <h2 className="text-md lg:text-xl font-bold">{product.name}</h2>
      <p className="lg:text-2xl font-bold">
        ${product.price}{" "}
        {product.oldPrice && (
          <span className="text-sm font-normal line-through">
            ${product.oldPrice}
          </span>
        )}
      </p>

        <button className="hidden w-full lg:flex items-center justify-center gap-4 bg-purple-800 text-white rounded-lg p-2 hover:bg-purple-900 transition active:scale-95">
          <i className="text-lg fa-solid fa-cart-plus"></i>
          <p className="text-lg font-bold">Add To Cart</p>
        </button>
      </Link>
  );
};
ProductCard.propTypes = {
  product: PropTypes.object,
};
