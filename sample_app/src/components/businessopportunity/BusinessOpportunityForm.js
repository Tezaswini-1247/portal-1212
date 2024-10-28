import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./BusinessOpportunityForm.css";
import Alert from "../Alert/Alert";
const apiUrl = process.env.REACT_APP_API_URL;

export function BusinessOpportunityForm() {
  const initialValues = {
    personName: "",
    email: "",
    phoneNumber: "",
    address: "",
    agreedIncentive: "",
    leadsGenerated: "",
    totalIncentiveOnDate: "",
    totalIncentiveSoFar: "",
  };

  const [showAlert, setShowAlert] = useState(false);

  const validationSchema = Yup.object({
    personName: Yup.string()
      .min(2, "Must be at least 2 characters")
      .required("Person's Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
    address: Yup.string().required("Address is required"),
    agreedIncentive: Yup.number().required("Agreed Incentive is required"),
    leadsGenerated: Yup.number().required("Leads Generated as on Date is required"),
    totalIncentiveOnDate: Yup.number().required("Total Incentive on Date is required"),
    totalIncentiveSoFar: Yup.number().required("Total Incentive So Far is required"),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting, setStatus }) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/business-opportunity',
        values
      );
      setStatus("Business opportunity data submitted successfully!");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 4000);
      resetForm();
    } catch (error) {
      console.error("Error submitting business opportunity data", error);
      setStatus("Error submitting business opportunity data.");
      setShowAlert(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="bg-white rounded-xl shadow p-4 sm:p-7">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Update Business Opportunity
          </h2>
          <p className="text-sm text-gray-600">Enter your business opportunity details here!</p>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, status }) => (
            <Form>
              <div className="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200">
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-1">
                    <div className="w-full">
                      <Field
                        name="personName"
                        type="text"
                        className="mt-3 py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Person's Name"
                      />
                      <ErrorMessage
                        name="personName"
                        component="div"
                        className="error-message text-[red] text-sm ms-2"
                      />
                    </div>
                    <div className="w-full">
                      <Field
                        name="email"
                        type="email"
                        className="mt-3 py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Email"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="error-message text-[red] text-sm ms-2"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <Field
                    name="phoneNumber"
                    type="text"
                    className="mt-3 py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Phone Number"
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="error-message text-[red] text-sm ms-2"
                  />
                </div>
                <div className="w-full">
                  <Field
                    name="address"
                    type="text"
                    className="mt-3 py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Address"
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="error-message text-[red] text-sm ms-2"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="w-full">
                    <Field
                      name="agreedIncentive"
                      type="number"
                      className="mt-3 py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Agreed Incentive"
                    />
                    <ErrorMessage
                      name="agreedIncentive"
                      component="div"
                      className="error-message text-[red] text-sm ms-2"
                    />
                  </div>
                  <div className="w-full">
                    <Field
                      name="leadsGenerated"
                      type="number"
                      className="mt-3 py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Leads Generated"
                    />
                    <ErrorMessage
                      name="leadsGenerated"
                      component="div"
                      className="error-message text-[red] text-sm ms-2"
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="w-full">
                    <Field
                      name="totalIncentiveOnDate"
                      type="number"
                      className="mt-3 py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Total Incentive on Date"
                    />
                    <ErrorMessage
                      name="totalIncentiveOnDate"
                      component="div"
                      className="error-message text-[red] text-sm ms-2"
                    />
                  </div>
                  <div className="w-full">
                    <Field
                      name="totalIncentiveSoFar"
                      type="number"
                      className="mt-3 py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Total Incentive So Far"
                    />
                    <ErrorMessage
                      name="totalIncentiveSoFar"
                      component="div"
                      className="error-message text-[red] text-sm ms-2"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-5 flex justify-end gap-x-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50"
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

export default BusinessOpportunityForm;
