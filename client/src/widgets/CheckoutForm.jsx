import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";

import citiesDZ from "../assets/citiesDZ.json";
import { useEffect } from "react";

export const CheckoutForm = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      wilaya: "",
      notes: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Full Name is required"),
      phone: Yup.string()
        .matches(
          /^(\s*\+213[567]|05|06|07|034)(\s?\d){8}\s*$/,
          "Invalid phone number"
        )
        .required("Phone number is required"),
      wilaya: Yup.string().required("Wilaya (Region) is required"),
      baladiya: Yup.string().required("Baladiya is required"),
      notes: Yup.string(),
    }),
    onSubmit: (values) => {
      // Handle form submission logic here
      console.log(values);
    },
  });

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
    formik.setFieldValue("baladiya", '' );
  }, [formik.values.wilaya]);
  
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="bg-slate-200 py-8 px-4 lg:px-8 rounded-md shadow-lg max-w-md w-full"
    >
      <h2 className="text-2xl font-semibold mb-4">
        Informations sur le Paiement à la Livraison
      </h2>
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-gray-700 text-sm font-medium"
        >
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="John Doe"
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
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="123-456-7890"
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
          Wilaya (Region)
        </label>
        <Select
          options={wilayaDZ}
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
            Baladiya
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
          Additional Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows="3"
          placeholder="Any special instructions..."
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
