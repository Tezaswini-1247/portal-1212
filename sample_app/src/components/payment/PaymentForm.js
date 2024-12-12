import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Alert from "../Alert/Alert"; // Import the Alert component if needed
const apiUrl = process.env.REACT_APP_API_URL;

const PaymentForm = () => {
  const initialValues = {
    studentName: "",
    phoneNumber: "",
    paymentType: "single",
    installmentsRequired: "1",
    installmentsDone: "1",
    paidTillNow: "", // Add initial value for "Paid Till Now"
  };

  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async (values, { resetForm, setSubmitting, setStatus }) => {
    try {
      const response = await axios.post(`${apiUrl}/api/payment/school`, values);
      console.log("Payment information submitted", response.data);
      setStatus("Payment information submitted successfully!");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 4000);

      resetForm();
    } catch (error) {
      console.error("Error submitting payment information", error);
      setStatus("Failed to submit payment information.");
      setShowAlert(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="bg-white rounded-xl shadow p-4 sm:p-7">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Payment Form</h2>
          <p className="text-sm text-gray-600">Enter your payment details here!</p>
        </div>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, status, values }) => (
            <Form>
              <div className="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200">
                <div className="space-y-3">
                  <div className="w-full">
                    <Field
                      name="studentName"
                      type="text"
                      className="mt-3 py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Student Name"
                    />
                    <ErrorMessage name="studentName" component="div" className="error-message text-[red] text-sm ms-2" />
                  </div>
                  <div className="w-full">
                    <Field
                      name="phoneNumber"
                      type="tel"
                      className="mt-3 py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Phone Number"
                    />
                    <ErrorMessage name="phoneNumber" component="div" className="error-message text-[red] text-sm ms-2" />
                  </div>
                  <div className="w-full">
                        <Field
                          name="paidTillNow"
                          type="number"
                          className="mt-3 py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Paid Till Now"
                        />
                        <ErrorMessage name="paidTillNow" component="div" className="error-message text-[red] text-sm ms-2" />
                      </div>
                  <div className="w-full">
                    <Field
                      as="select"
                      name="paymentType"
                      className="mt-3 py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="single">Single Payment</option>
                      <option value="installments">Installments</option>
                    </Field>
                    <ErrorMessage name="paymentType" component="div" className="error-message text-[red] text-sm ms-2" />
                  </div>

                  {values.paymentType === "installments" && (
                    <>
                      <div className="w-full">
                        <Field
                          name="installmentsRequired"
                          type="number"
                          className="mt-3 py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Installments Required"
                        />
                        <ErrorMessage name="installmentsRequired" component="div" className="error-message text-[red] text-sm ms-2" />
                      </div>
                      <div className="w-full">
                        <Field
                          name="installmentsDone"
                          type="number"
                          className="mt-3 py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Installments Done"
                        />
                        <ErrorMessage name="installmentsDone" component="div" className="error-message text-[red] text-sm ms-2" />
                      </div>
                      
                    </>
                  )}
                </div>
              </div>

              <div className="mt-5 flex justify-end gap-x-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>

              {status && (
                <div className="submission-status text-black text-center">{status}</div>
              )}
            </Form>
          )}
        </Formik>
      </div>
      {showAlert && <Alert />}
    </div>
  );
};

export default PaymentForm;
