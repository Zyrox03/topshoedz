import { NavBar } from "../../components/NavBar";
import { SideNav } from "../../components/sideNav";
import { Footer } from "../../components/Footer";
import { useEffect, useState } from "react";
import { Title } from "../../widgets/Title";
import { useSelector } from "react-redux";
import { Link as LinkScroll } from "react-scroll";
import { CheckoutForm } from "../../widgets/CheckoutForm";
const Cart = () => {
  const [openSideNav, setOpenSideNav] = useState(false);

  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    const body = document.querySelector("body");
    if (openSideNav) {
      body.style.overflowY = "hidden";
    } else {
      body.style.overflowY = "auto";
    }
  }, [openSideNav]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-300/50 flex flex-col relative overflow-hidden">
      <NavBar setOpenSideNav={setOpenSideNav} />
      <SideNav setOpenSideNav={setOpenSideNav} openSideNav={openSideNav} />
      <div style={{ marginTop: "6em" }}>
        <Title title="Mon Panier" sub_title="Voir et Confirmer les Ordres" />

        <div className="p-4 lg:p-8">
          <div className="container mx-auto lg:px-4 py-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <h1 className="text-2xl font-bold my-4">Panier</h1>
              <LinkScroll
                to={"checkout"}
                spy={true}
                smooth={true}
                offset={-100}
              >
                <button className=" flex items-center justify-center gap-4 bg-purple-800 text-white rounded-lg p-2 hover:bg-purple-900 transition active:scale-95">
                  <i className="text-lg fa-solid fa-clipboard"></i>
                  <p className="text-lg font-bold">Checkout</p>
                </button>
              </LinkScroll>
            </div>
            <div className="mt-8 flex flex-col lg:flex-row gap-2  ">
              <div className="flex-1 flex flex-col gap-2">
                {cartItems.map((product, index) => (
                  <div
                    key={index}
                    className="bg-slate-200 flex gap-4 shadow-md p-4 rounded-lg relative"
                  >
                    <div className="absolute bottom-0 right-0 w-10 h-10 rounded-2xl rounded-br-none bg-slate-100 cursor-pointer flex items-center justify-center">
                      <i className="fa-solid fa-trash text-purple-800"></i>
                    </div>
                    <div className="flex-shrink-0 my-auto ">
                      <img
                        src={product.images[0]}
                        alt="Product image"
                        className="w-20 lg:w-32 h-20 lg:h-32  object-cover rounded-lg"
                      />
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-6">
                      <h2 className="text-lg font-bold">{product.name} </h2>
                      <div className="mt-4 flex flex-col ">
                        <div className="flex items-center">
                          <span className="mr-2 text-gray-600">Quantity: </span>
                          <div className="flex items-center">
                            <button className="bg-gray-200 rounded-l-lg px-2 py-1">
                              -
                            </button>
                            <span className="mx-2 text-gray-600">
                              {product.quantity}{" "}
                            </span>
                            <button className="bg-gray-200 rounded-r-lg px-2 py-1">
                              +
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="mr-2 text-gray-600">Couleur: </span>
                          <div className="flex items-center">
                            <div
                              style={{ backgroundColor: product.color }}
                              className="circle cursor-pointer rounded-full w-5 h-5 border border-slate-300"
                            ></div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="mr-2 text-gray-600">Size: </span>
                          <div className="flex items-center">
                            <div className="size  flex justify-center items-center">
                              {product.size}
                            </div>{" "}
                          </div>
                        </div>
                      </div>
                      <span className="ml-auto font-bold">
                        ${product.price}
                      </span>
                    </div>
                  </div>
                ))}

                <div className="flex justify-end items-center mt-8">
                  <span className="text-gray-600 mr-4">Subtotal:</span>
                  <span className="text-xl font-bold">$50.00</span>
                </div>
                <div className="flex justify-end items-center">
                  <span className="text-gray-600 mr-4">Livraison:</span>
                  <span className="text-xl font-bold">$10.00</span>
                </div>
              </div>
              <div className="flex-1 flex justify-center" id="checkout">
                <CheckoutForm cartPage />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
