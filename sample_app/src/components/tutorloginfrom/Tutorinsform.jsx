
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";
import "./Tutorinsform.css";
import Alert from "../Alert/Alert";
const apiUrl = process.env.REACT_APP_API_URL;


const TutorLoginform = () => {
  const initialValues = {
    batchId: "",
    countryLocation: "",
    tutorId: "",
    phone: "",
    startDate: "",
  };
  const [showAlert, setShowAlert] = useState(false);

  const validationSchema = Yup.object({
    batchId: Yup.string().required("Batch ID is required"),
    countryLocation: Yup.string().required("Country Location is required"),
    tutorId: Yup.string().required("Tutor ID/Name is required"),
    phone: Yup.string()
      .required("Phone Number is required")
      .matches(/^[0-9]+$/, "Phone Number must be numeric")
      .min(10, "Phone Number must be at least 10 digits"),
    startDate: Yup.date().required("Batch Start Date is required").nullable(),
  });

  const handleSubmit = async (
    values,
    { resetForm, setSubmitting, setStatus }
  ) => {
    try {
      const response = await axios.post(`${apiUrl}/submit`, values);
      console.log("Form submitted successfully", response.data);
      setStatus("Form submitted successfully!");
      setShowAlert(true);
      resetForm();
    } catch (error) {
      console.error("Error submitting form", error);
      setStatus("Failed to submit form.");
      setShowAlert(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="bg-white rounded-xl shadow p-4 sm:p-7">
        <div class="text-center mb-8">
          <h2 class="text-2xl md:text-3xl font-bold text-gray-800">
            Tutor details Form
          </h2>
          <p class="text-sm text-gray-600">Enter your details here!.</p>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, status }) => (
            <Form>
              <div class="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200">
                <div class="space-y-3">
                  <div class="flex flex-col sm:flex-row gap-1">
                    <div className="w-full">
                      <Field
                        name="batchId"
                        id="batchId"
                        type="text"
                        class="mt-3 py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                        placeholder="Batch ID"
                      />
                      <ErrorMessage
                        name="batchId"
                        component="div"
                        className="error-message text-[red] text-sm ms-2"
                      />
                    </div>
                    <div className="w-full">
                      <Field
                        name="countryLocation"
                        id="af-payment-billing-contact"
                        type="text"
                        class="mt-3 py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                        placeholder="Country Location:"
                      />
                      <ErrorMessage
                        name="countryLocation"
                        id="countryLocation"
                        component="div"
                        className="error-message text-[red] text-sm ms-2"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <Field
                    id="tutorId"
                    name="tutorId"
                    type="text"
                    class="mt-3 py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    placeholder="Enter Tutor ID/Name"
                  />
                  <ErrorMessage
                    name="tutorId"
                    component="div"
                    className="error-message text-[red] text-sm ms-2"
                  />
                </div>
                <div className="w-full">
                  <Field
                    type="tel"
                    id="phone"
                    name="phone"
                    class="mt-3 py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    placeholder="Phone"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="error-message text-[red] text-sm ms-2"
                  />
                </div>
                <div class="flex flex-col sm:flex-row gap-3">
                  <div className="w-full">
                    <Field
                      name="startDate"
                      id="startDate"
                      type="date"
                      class="mt-3 py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                      placeholder="Batch Start Date"
                    />
                    <ErrorMessage
                      name="startDate"
                      component="div"
                      className="error-message text-[red] text-sm ms-2"
                    />
                  </div>
                </div>
              </div>

              <div class="mt-5 flex justify-end gap-x-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>

              {status && (
                <div className="submission-status text-black text-center">
                  {status}
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
      {showAlert && <Alert />}
    </div>
  );
};

export default TutorLoginform;
