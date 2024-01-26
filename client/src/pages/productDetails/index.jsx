import { useParams } from "react-router-dom";
import { NavBar } from "../../components/NavBar";
import { SideNav } from "../../components/sideNav";
import { Footer } from "../../components/Footer";
import { useEffect, useState } from "react";
import { BestProducts } from "../../components/LandingPage/BestProducts";
import { ImagesSwiper } from "../../widgets/ImagesSwiper";
import { useSelector } from "react-redux";
import { Feedback } from "../../components/LandingPage/Feedback";
import { CheckoutForm } from "../../widgets/CheckoutForm";
import { Link as LinkScroll } from "react-scroll";
const ProductDetails = () => {
  const { productID } = useParams();
  const [openSideNav, setOpenSideNav] = useState(false);

  useEffect(() => {
    const body = document.querySelector("body");
    if (openSideNav) {
      body.style.overflowY = "hidden";
    } else {
      body.style.overflowY = "auto";
    }
  }, [openSideNav]);

  //   GET DISCOUNT
  function getDiscountPercentage(oldPrice, currentPrice) {
    if (oldPrice && currentPrice && oldPrice > currentPrice) {
      const discount = ((oldPrice - currentPrice) / oldPrice) * 100;
      return Math.round(discount);
    }
    return 0;
  }

  //   SHARE BUTTONS

  function shareOnSocialMedia(platform) {
    let linkToShare = window.location.href;
    let shareUrl = "";
    switch (platform) {
      case "facebook":
        shareUrl =
          "https://www.facebook.com/sharer/sharer.php?u=" +
          encodeURIComponent(linkToShare);
        break;
      case "twitter":
        shareUrl =
          "https://twitter.com/intent/tweet?url=" +
          encodeURIComponent(linkToShare);
        break;
      case "pinterest":
        shareUrl =
          "https://www.pinterest.com/pin/create/button/?url=" +
          encodeURIComponent(linkToShare);
        break;
      // Add more cases for other social media platforms if needed

      default:
        return;
    }

    window.open(shareUrl, "_blank", "width=600,height=400");
  }
  const products = useSelector((state) => state.products.items);

  const product = products.find((product) => product.name === productID);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  return (
    <div className="min-h-screen bg-slate-300/50 flex flex-col relative overflow-hidden">
      <NavBar setOpenSideNav={setOpenSideNav} />
      <SideNav setOpenSideNav={setOpenSideNav} openSideNav={openSideNav} />
      <div style={{ marginTop: "5em" }}>
        <div className="p-8 flex flex-col gap-6">
          <h1 className="text-3xl lg:text-5xl font-bold">{product?.name} </h1>
          <hr />

          <div className="flex flex-col md:flex-row relative gap-4">
            <div className="flex-1 md:w-1/2 flex justify-center items-center sticky top-0 h-fit">
              {product.images && product.images.length > 0 && (
                <ImagesSwiper productImages={product?.images} />
              )}
            </div>
            <div className="flex-1 flex flex-col gap-4">
              <LinkScroll
                to={"checkout"}
                spy={true}
                smooth={true}
                offset={-100}
              >
                <button className="lg:hidden w-full flex items-center justify-center gap-4 bg-purple-800 text-white rounded-lg p-2 hover:bg-purple-900 transition active:scale-95">
                  <i className="text-lg fa-solid fa-shopping-cart"></i>
                  <p className="text-lg font-bold">Acheter</p>
                </button>
              </LinkScroll>
              <div className="flex h-fit w-full items-center">
                <h2 className="text-4xl font-bold text-purple-800">
                  ${product?.price}
                </h2>
                {product?.oldPrice && (
                  <>
                    <span className="ml-4 text-2xl line-through text-gray-600">
                      ${product?.oldPrice}
                    </span>

                    <div className="ml-12 bg-purple-800 text-white h-fit px-2 font-bold rounded-full">
                      {getDiscountPercentage(product?.oldPrice, product?.price)}
                      % OFF
                    </div>
                  </>
                )}
              </div>
              <div className="flex h-fit w-full items-center ">
                <p>{product?.description}</p>{" "}
              </div>

              {/* Variants */}

              <div className="flex flex-col gap-3 ">
                <h3 className="text-2xl">Couleur</h3>
                <div className="flex gap-3">
                  {product &&
                    product?.images.map((img, index) => (
                      <div
                        key={index}
                        className="circle cursor-pointer bg-yellow-500 rounded-full w-20 h-20 border border-2 border-purple-300 rounded-3xl"
                      >
                        <img
                          src={img}
                          className="w-full h-full object-cover rounded-3xl"
                          alt=""
                        />
                      </div>
                    ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 ">
                <h3 className="text-2xl">Pointure</h3>
                <div className="flex gap-3">
                  <div className="size cursor-pointer bg-slate-200 rounded-full w-10 h-10 border border-2 border-purple-500 flex justify-center items-center">
                    40
                  </div>
                  <div className="size cursor-pointer bg-slate-200 rounded-full w-10 h-10 border border-2 border-purple-500 flex justify-center items-center">
                    41
                  </div>
                  <div className="size cursor-pointer bg-slate-200 rounded-full w-10 h-10 border border-2 border-purple-500 flex justify-center items-center">
                    42
                  </div>
                  <div className="size cursor-pointer bg-slate-200 rounded-full w-10 h-10 border border-2 border-purple-500 flex justify-center items-center">
                    43
                  </div>
                  <div className="size cursor-pointer bg-slate-200 rounded-full w-10 h-10 border border-2 border-purple-500 flex justify-center items-center">
                    44
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 ">
                <h3 className="text-2xl">Quantité</h3>
                <div className="flex gap-3 items-center">
                  <div className="cursor-pointer bg-slate-200 rounded-full w-10 h-10 border border-2 border-purple-500 flex justify-center items-center">
                    <i className="fas fa-minus"></i>
                  </div>

                  <span className="text-lg"> 2 </span>

                  <div className="cursor-pointer bg-slate-200 rounded-full w-10 h-10 border border-2 border-purple-500 flex justify-center items-center">
                    <i className="fas fa-plus"></i>
                  </div>
                </div>
              </div>

              <div id="checkout" >
                <CheckoutForm />
              </div>
              <div className="mt-auto">
                <h3 className="italic font-bold">
                  Partager :{" "}
                  <span className="flex gap-4">
                    <i
                      onClick={() => shareOnSocialMedia("facebook")}
                      className=" text-2xl fa-brands cursor-pointer text-purple-800 fa-square-facebook"
                    ></i>
                    <i
                      onClick={() => shareOnSocialMedia("pinterest")}
                      className=" text-2xl fa-brands cursor-pointer text-purple-800 fa-pinterest"
                    ></i>
                    <i
                      onClick={() => shareOnSocialMedia("twitter")}
                      className=" text-2xl fa-brands cursor-pointer text-purple-800 fa-twitter"
                    ></i>
                  </span>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Feedback />
      <BestProducts productsList={products} />
      <Footer />
    </div>
  );
};

export default ProductDetails;
