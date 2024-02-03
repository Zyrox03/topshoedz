import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import axios from "axios";
import citiesDZ from "../assets/citiesDZ.json";
import { useEffect } from "react";

import PropTypes from "prop-types";

export const CheckoutForm = ({
  selectedOptions,
  handleFormikErrorsChange,
  cartPage,
  setOrderSuccess,
  product,
  uniqueColors,
}) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      wilaya: "",
      notes: "",
      ...selectedOptions,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("الاسم الكامل مطلوب"),
      phone: Yup.string()
        .matches(
          /^(\s*\+213[567]|05|06|07|034)(\s?\d){8}\s*$/,
          "رقم الهاتف غير صالح"
        )
        .required("رقم الهاتف مطلوب"),
      wilaya: Yup.string().required("الولاية مطلوبة"),
      baladiya: Yup.string().required("البلدية مطلوبة"),
      notes: Yup.string(),
    
      size:
        product?.size?.length > 0
          ? Yup.string().required("اختر المقاس")
          : Yup.string().nullable(),
      color:
        uniqueColors && uniqueColors.length > 0
          ? Yup.string().required("اختر اللون")
          : Yup.string().nullable(),
      quantity: selectedOptions
        ? Yup.number().required("الكمية مطلوبة").positive()
        : Yup.number().positive(),
    }),
    
    onSubmit: async (values) => {
      try {
        console.log(values)
        await axios.post(`${import.meta.env.VITE_TOP_SHOE_DZ_BASE_API}/orders`, values);
        setOrderSuccess(true);
      } catch (error) {
        console.error("Error submitting order:", error);
      }
    },
  });

  useEffect(() => {
    if (!cartPage) {
      handleFormikErrorsChange(formik.errors);
    }
    formik.setValues({
      ...formik.values,
      ...selectedOptions,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.errors, selectedOptions]);

  const wilayaDZ = [
    ...new Set(citiesDZ.communes.map((item) => item.wilaya)),
  ].map((wilaya) => ({
    value: wilaya,
    label: wilaya,
  }));

  const baladiyaDZ = citiesDZ.communes
    .filter((item) => item.wilaya === formik.values.wilaya)
    .map((item) => ({
      value: item.baladiya,
      label: item.baladiya,
    }));

  useEffect(() => {
    formik.setFieldValue("baladiya", "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.wilaya]);

  return (
    <form
      dir="rtl"
      onSubmit={formik.handleSubmit}
      className="bg-slate-200 py-8 px-4 lg:px-8 rounded-md shadow-lg max-w-md w-full"
    >
      <h2 className="text-2xl font-semibold mb-4">
        معلومات حول الدفع عند التسليم{" "}
      </h2>
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-gray-700 text-sm font-medium"
        >
          الاسم الكامل
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="الاسم الكامل "
          className="mt-1 p-2 w-full border rounded-md"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="phone"
          className="block text-gray-700 text-sm font-medium"
        >
          رقم الهاتف{" "}
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder=" رقم الهاتف"
          className="mt-1 p-2 w-full border rounded-md"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone}
        />
        {formik.touched.phone && formik.errors.phone && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.phone}</div>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="wilaya"
          className="block text-gray-700 text-sm font-medium"
        >
          الولاية{" "}
        </label>
        <Select
          options={wilayaDZ}
          placeholder="اختر"
          onChange={(option) => formik.setFieldValue("wilaya", option.value)}
          onBlur={formik.handleBlur}
        />

        {formik.touched.wilaya && formik.errors.wilaya && (
          <div className="text-red-500 text-sm mt-1">
            {formik.errors.wilaya}
          </div>
        )}
      </div>
      {formik.values.wilaya && (
        <div className="mb-4">
          <label
            htmlFor="baladiya"
            className="block text-gray-700 text-sm font-medium"
          >
            البلدية
          </label>
          <Select
            options={baladiyaDZ}
            onChange={(option) =>
              formik.setFieldValue("baladiya", option.value)
            }
            onBlur={formik.handleBlur}
          />

          {formik.errors.baladiya && (
            <div className="text-red-500 text-sm mt-1">
              {formik?.errors?.baladiya}
            </div>
          )}
        </div>
      )}
      <div className="mb-6">
        <label
          htmlFor="notes"
          className="block text-gray-700 text-sm font-medium"
        >
          ملاحظات إضافية (اختياري)
        </label>
        <textarea
          id="notes"
          name="notes"
          rows="3"
          placeholder=" أي تعليمات خاصة..."
          className="mt-1 p-2 w-full border rounded-md"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.notes}
        ></textarea>

        {formik.touched.notes && formik.errors.notes && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.notes}</div>
        )}
      </div>
      <button
        type="submit"
        className="w-full flex items-center justify-center gap-4 bg-purple-800 text-white rounded-lg p-2 hover:bg-purple-900 transition active:scale-95"
      >
        <i className="text-lg fas fa-clipboard-check"></i>
        <p className="text-lg font-bold">Confirmer La Commande</p>
      </button>{" "}
    </form>
  );
};

CheckoutForm.propTypes = {
  product: PropTypes.object,
  uniqueColors: PropTypes.any,
  selectedOptions: PropTypes.object,
  handleFormikErrorsChange: PropTypes.func,
  setOrderSuccess: PropTypes.func,
  cartPage: PropTypes.bool,
};
