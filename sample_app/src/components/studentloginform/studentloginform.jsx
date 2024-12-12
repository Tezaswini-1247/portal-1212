import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./studentloginform.css";
import Alert from "../Alert/Alert";
const apiUrl = process.env.REACT_APP_API_URL;


export function Studentloginform() {
  const initialValues = {
    studentName: "",
    batchId: "",
    location: "",
    country: "",
    presentAbsent: "",
    tutorName: "",
    date: "",
    classDate: "",
  };
  const [showAlert, setShowAlert] = useState(false);

  const validationSchema = Yup.object({
    studentName: Yup.string()
      .min(2, "Must be at least 2 characters")
      .required("Student Name is required"),
    batchId: Yup.string().required("Batch ID is required"),
    location: Yup.string().required("Location is required"),
    country: Yup.string().required("Country is required"),
    presentAbsent: Yup.string().required("Please select a status"),
    tutorName: Yup.string().required("Tutor name is required"),
    date: Yup.string().required("Date is required"),
    classDate: Yup.string().required("Class date is required"),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting, setStatus }) => {
    console.log(values);  
    try {
      const response = await axios.post(`${apiUrl}/api/student`, values);
      console.log("Form submitted successfully", response.data);
      setStatus("Form submitted successfully!");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 4000);
  
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
    <div class="max-w-xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div class="bg-white rounded-xl shadow p-4 sm:p-7">
        <div class="text-center mb-8">
          <h2 class="text-2xl md:text-3xl font-bold text-gray-800">
            Student Details Form
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
                        name="studentName"
                        id="af-payment-billing-contact"
                        type="text"
                        class="mt-3 py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                        placeholder="Student Name"
                      />
                      <ErrorMessage
                        name="studentName"
                        component="div"
                        className="error-message text-[red] text-sm ms-2"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <Field
                    name="location"
                    type="text"
                    class="mt-3 py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    placeholder="Location"
                  />
                  <ErrorMessage
                    name="location"
                    component="div"
                    className="error-message text-[red] text-sm ms-2"
                  />
                </div>
                <div className="w-full">
                  <Field
                    name="country"
                    id="af-payment-billing-address"
                    type="text"
                    class="mt-3 py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    placeholder="Country"
                  />
                  <ErrorMessage
                    name="country"
                    component="div"
                    className="error-message text-[red] text-sm ms-2"
                  />
                </div>
                <div class="flex flex-col sm:flex-row gap-3">
                  <div className="w-full">
                    <Field
                      as="select"
                      name="presentAbsent"
                      class="mt-3 py-2 px-3 pe-9 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      <option value="">Select Status</option>
                      <option value={1}>Present</option>
                      <option value={0}>Absent</option>
                    </Field>

                    <ErrorMessage
                      name="presentAbsent"
                      component="div"
                      className="error-message text-[red] text-sm ms-2"
                    />
                  </div>
                  <div className="w-full">
                    <Field
                      name="tutorName"
                      type="text"
                      class="mt-3 py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                      placeholder="Tutor Name"
                    />
                    <ErrorMessage
                      name="tutorName"
                      component="div"
                      className="error-message text-[red] text-sm ms-2"
                    />
                  </div>
                </div>
                <div class="flex flex-col sm:flex-row gap-3">
                  <div className="w-full">
                    <p class="text-sm text-gray-600">            </p>
                    <p class="text-sm text-gray-600"> Enter Today Date:</p>
                    <Field
                      name="date"
                      type="date"
                      class="mt-3 py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                      placeholder="Date"
                    />
                    <ErrorMessage
                      name="date"
                      component="div"
                      className="error-message text-[red] text-sm ms-2"
                    />
                  </div>
                  <div className="w-full">
                    <p class="text-sm text-gray-600">            </p>
                    <p class="text-sm text-gray-600">Enter Class Date:</p>
                    <Field
                      name="classDate"
                      type="date"
                      class="mt-3 py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                      placeholder="Class Date"
                    />
                    <ErrorMessage
                      name="classDate"
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
}

export default Studentloginform;

