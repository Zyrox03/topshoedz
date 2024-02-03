import { NavBar } from "../../components/NavBar";
import { SideNav } from "../../components/SideNav";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Title } from "../../widgets/Title";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../toolkit/productSlice";
import { setAdmin } from "../../toolkit/authSlice";
import { useNavigate } from "react-router-dom";
import { Footer } from "../../components/Footer";
const Auth = () => {
  const [openSideNav, setOpenSideNav] = useState(false);

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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");
  const { loading } = useSelector((state) => state.products);
  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("عنوان البريد الإلكتروني غير صالح")
        .required("البريد الإلكتروني مطلوب"),
      password: Yup.string().required("كلمة المرور مطلوبة"),
    }),
    onSubmit: async (values) => {
      try {
        setErrorMessage("");
        dispatch(setLoading(true));
        const response = await axios.post(
          `${import.meta.env.VITE_TOP_SHOE_DZ_BASE_API}/login`,
          values,

        );
        const adminEmail = response.data.user.email;
        dispatch(setAdmin(adminEmail));

        navigate("/admin");
        // Handle successful login, redirect, or update state as needed
      } catch (error) {
        setErrorMessage(error.response.data.message);
        dispatch(setAdmin(null));

        console.error(error.response.data.message);
        // Handle login error, show error message, etc.
      } finally {
        dispatch(setLoading(false));
      }
    },
  });

  return (
    <div className=" bg-slate-300/50 flex flex-col relative overflow-hidden">
      <NavBar setOpenSideNav={setOpenSideNav} />
      <SideNav setOpenSideNav={setOpenSideNav} openSideNav={openSideNav} />
      <div style={{ marginTop: "6em" }} className="p-6 min-h-[70vh]">
        <Title title="تسجيل الدخول" />

        <form
          dir="rtl"
          onSubmit={formik.handleSubmit}
          className="max-w-md mx-auto"
        >
          <div className="mb-4">
            <label htmlFor="email" className="text-gray-800 block mb-2">
              البريد الإلكتروني
            </label>
            <input
              placeholder="أدخل بريدك الإلكتروني"
              type="email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={`w-full p-2 border border-gray-300 rounded ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : ""
              }`}
            />

            {formik.errors.email && formik.touched.email && (
              <div className="text-red-500">{formik.errors.email}</div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="text-gray-800 block mb-2">
              كلمة المرور{" "}
            </label>
            <input
              placeholder="أدخل كلمة المرور"
              type="password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={`w-full p-2 border border-gray-300 rounded ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : ""
              }`}
            />

            {formik.errors.password && formik.touched.password && (
              <div className="text-red-500">{formik.errors.password}</div>
            )}
          </div>

          <button
            disabled={loading}
            type="submit"
            className="bg-purple-800 flex w-full justify-center items-center gap-2 text-white disabled:bg-purple-400 disabled:scale-100 active:scale-95 cursor-pointer transition px-4 py-2 rounded-md hover:bg-purple-600 focus:outline-none focus:shadow-outline-blue"
          >
            <i className="fa-solid fa-user"></i>
            <p className="text-lg font-bold">تسجيل الدخول</p>
          </button>

          {errorMessage && (
            <div className="text-white font-bold text-md my-4 p-2 bg-red-500 rounded-md">
              {errorMessage}
            </div>
          )}
        </form>
      </div>

      <Footer/>
    </div>
  );
};

export default Auth;
