import { useFormik } from "formik";
import { Footer } from "../../components/Footer";
import { Title } from "../../widgets/Title";
import { NavBar } from "../../components/NavBar";
import { SideNav } from "../../components/sideNav";
import { useEffect, useState } from "react";
import * as Yup from "yup";

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
  
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema,

    onSubmit: (values) => {
      // Handle form submission logic here
      console.log(values);
    },
  });


  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])
  return (
    <div className="min-h-screen bg-slate-300/50 flex flex-col relative overflow-hidden">
      {/* ... Your existing code ... */}
      <NavBar setOpenSideNav={setOpenSideNav} />
      <SideNav setOpenSideNav={setOpenSideNav} openSideNav={openSideNav} />
      <div style={{marginTop: '5em'}} className="p-6">
        <Title title="اتصل بنا" />

        <form dir='rtl' onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
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
            className="flex w-full items-center justify-center gap-4 bg-purple-800 text-white rounded-lg p-2 hover:bg-purple-900 transition active:scale-95"
          >
            {" "}
            <i className="fa-solid fa-message"></i>
            <p className="text-lg font-bold">إرسال</p>
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
