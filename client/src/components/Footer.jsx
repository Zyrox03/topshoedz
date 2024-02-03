import { Link } from "react-router-dom";
export const Footer = () => {
  return (
    <div dir="rtl" className="relative mt-16 bg-purple-700 ">
      <svg
        className="absolute top-0 w-full h-6 -mt-5 sm:-mt-10 sm:h-16  "
        preserveAspectRatio="none"
        viewBox="0 0 1440 54"
      >
        <path
          fill="rgb(126 34 206)"
          d="M0 22L120 16.7C240 11 480 1.00001 720 0.700012C960 1.00001 1200 11 1320 16.7L1440 22V54H1320C1200 54 960 54 720 54C480 54 240 54 120 54H0V22Z"
        />
      </svg>
      <div className="px-4 pt-12 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="grid gap-16 row-gap-10 mb-8 lg:grid-cols-3">
          <div className="md:max-w-md lg:col-span-2">
            <Link
              to="/"
              aria-label="Go home"
              title="Company"
              className="inline-flex items-center gap-2"
            >
              <span className=" text-xl font-bold tracking-wide text-gray-100 uppercase">
                Top Shoe DZ
              </span>
              <img
                src="/logo.jpg"
                alt="logo"
                className="w-[60px] rounded-full "
              />
            </Link>
            <div className="mt-4 lg:max-w-sm">
              <p className="text-md text-gray-300">
                Top Shoe DZ مرحبًا بكم في
                <br />
                وجهتكم عبر الإنترنت للعثور على أحدث وأكثر الأحذية رواجًا وراحةً.
                استعرضوا مجموعتنا الواسعة من الأحذية عالية الجودة.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 ">
            <div>
              <p className="font-semibold tracking-wide text-slate-100">
                روابط مفيدة
              </p>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link
                    to="/"
                    className="transition-colors duration-300 text-gray-300 hover:text-slate-100"
                  >
                    الرئيسية
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shop"
                    className="transition-colors duration-300 text-gray-300 hover:text-slate-100"
                  >
                    جميع المنتجات
                  </Link>
                </li>

                <li>
                  <Link
                    to="/account"
                    className="transition-colors duration-300 text-gray-300 hover:text-slate-100"
                  >
                    حسابي
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-semibold tracking-wide text-slate-100">
                خدمة العملاء
              </p>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link
                    to="/contact"
                    className="transition-colors duration-300 text-gray-300 hover:text-slate-100"
                  >
                    اتصل بنا
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between pt-5 pb-10 border-t border-deep-purple-accent-200 sm:flex-row">
          <p className="text-sm text-gray-100">
            © حقوق النشر 2024 TopShoeDZ Inc. جميع الحقوق محفوظة
          </p>
          <div className="flex items-center mt-4 space-x-4 sm:mt-0">
            <a href="https://web.facebook.com/profile.php?id=61552207858595">
              <i className=" text-3xl fa-brands text-white fa-square-facebook"></i>
            </a>
            {/* <i className=" text-3xl fa-brands text-white fa-instagram"></i> */}
          </div>
        </div>
      </div>
    </div>
  );
};
