/* eslint-disable no-undef */
import { useFormik } from "formik";
import { Footer } from "../../components/Footer";
import { Title } from "../../widgets/Title";
import { NavBar } from "../../components/NavBar";
import { SideNav } from "../../components/SideNav";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { Helmet } from "react-helmet";
import axios from "axios";
import MetaPixel from "../../utils/meta/metaPixel";

const Contact = () => {
  const [openSideNav, setOpenSideNav] = useState(false);

  useEffect(() => {
    const body = document.querySelector("body");
    if (openSideNav) {
      body.style.overflowY = "hidden";
    } else {
      body.style.overflowY = "auto";
    }
  }, [openSideNav]);

  const validationSchema = Yup.object({
    name: Yup.string().required("الاسم مطلوب"), // Name is required
    email: Yup.string()
      .email("عنوان البريد الإلكتروني غير صالح") // Invalid email address
      .required("البريد الإلكتروني مطلوب"), // Email is required
    message: Yup.string().required("الرسالة مطلوبة"), // Message is required
  });

  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactError, setContactError] = useState("");
  // const [contactLoading, setContactLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema,

    onSubmit: async (values) => {
      try {
        setContactError("");
        setContactSuccess(false);
        const response = await axios.post(
          `${import.meta.env.VITE_TOP_SHOE_DZ_BASE_API}/contact`,
          values
        );

        const { message } = response.data;
        setContactSuccess(message);
        fbq('track', 'Contact');


        formik.resetForm();
      } catch (error) {
        console.log(error);
        if (error.response) {
          const { data } = error.response;
          setContactError(data.error);
        } else {
          setContactError("Erreur lors de la requête API");
        }
      }
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen bg-slate-300/50 flex flex-col relative overflow-hidden">
      <Helmet>
        <title>Top Shoe DZ - Contactez-nous</title>
        <meta
          name="description"
          content="Contactez-nous pour toute question ou préoccupation. Nous sommes là pour vous aider!"
        />

        {/* Balises Open Graph pour le partage sur les réseaux sociaux */}
        <meta property="og:title" content="Top Shoe DZ - Contactez-nous" />
        <meta
          property="og:description"
          content="Contactez-nous pour toute question ou préoccupation. Nous sommes là pour vous aider!"
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/duh30yscb/image/upload/v1706972627/Top%20Shoe%20DZ/w8zap4glsiegcrdxk0qq.jpg"
        />
        <meta
          property="og:url"
          content="https://topshoes-dz.pages.dev/contact"
        />

        {/* Balises Twitter Card pour le partage sur Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Top Shoe DZ - Contactez-nous" />
        <meta
          name="twitter:description"
          content="Contactez-nous pour toute question ou préoccupation. Nous sommes là pour vous aider!"
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/duh30yscb/image/upload/v1706972627/Top%20Shoe%20DZ/w8zap4glsiegcrdxk0qq.jpg"
        />

        {/* Balises méta supplémentaires */}
        <meta
          name="keywords"
          content="contact, service client, questions, préoccupations"
        />
        <meta name="robots" content="index, follow" />

        {/* Balise meta viewport pour le design responsive */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>

      <MetaPixel/>

      {/* ... Your existing code ... */}
      <NavBar setOpenSideNav={setOpenSideNav} />
      <SideNav setOpenSideNav={setOpenSideNav} openSideNav={openSideNav} />
      <div style={{ marginTop: "5em" }} className="p-6">
        <Title title="اتصل بنا" />

        <form
          dir="rtl"
          onSubmit={formik.handleSubmit}
          className="max-w-md mx-auto"
        >
          <div className="mb-4">
            <label htmlFor="name" className="text-gray-800 block mb-2">
              الاسم
            </label>
            <input
              placeholder="أدخل اسمك"
              type="text"
              id="name"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              className="w-full p-2 border border-gray-300 rounded"
            />

            {formik.errors.name && formik.touched.name && (
              <div className="text-red-500">{formik.errors.name}</div>
            )}
          </div>

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
              value={formik.values.email}
              className="w-full p-2 border border-gray-300 rounded"
            />

            {formik.errors.email && formik.touched.email && (
              <div className="text-red-500">{formik.errors.email}</div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="text-gray-800 block mb-2">
              الرسالة
            </label>
            <textarea
              placeholder="أدخل رسالتك"
              id="message"
              name="message"
              onChange={formik.handleChange}
              value={formik.values.message}
              className="w-full p-2 border border-gray-300 rounded h-40"
            />
            {formik.errors.message && formik.touched.message && (
              <div className="text-red-500">{formik.errors.message}</div>
            )}
          </div>

          <button
            type="submit"
            className={`flex w-full items-center justify-center gap-4 bg-purple-800 text-white rounded-lg p-2 hover:bg-purple-900 transition active:scale-95 ${
              formik.isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={formik.isSubmitting}
          >
            {" "}
            <i className="fa-solid fa-message"></i>
            <p className="text-lg font-bold">إرسال</p>
          </button>

          {contactError && (
            <div className="text-red-500 text-center my-4">{contactError}</div>
          )}

          {contactSuccess && (
            <div className="text-green-600 max-w-md mx-auto text-center my-4 bg-green-100 p-3 rounded-md">
              {contactSuccess}
            </div>
          )}
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
