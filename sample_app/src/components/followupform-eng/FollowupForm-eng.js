import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Alert from "../Alert/Alert";
const apiUrl = process.env.REACT_APP_API_URL;

const FollowupFormEng = () => {
  const initialValues = {
    studentName: "",
    collegeName: "",
    phoneNumber: "",
    followupNumber: "1",
    description: "",
    acceptancePercentage: 0,
  };

  const [showAlert, setShowAlert] = useState(false);

  const validationSchema = Yup.object({
    studentName: Yup.string()
      .min(2, "Must be at least 2 characters")
      .required("Student Name is required"),
    collegeName: Yup.string().required("College/School Name is required"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, "Phone number must be digits")
      .required("Phone Number is required"),
    followupNumber: Yup.string().required("Follow-up Number is required"),
    description: Yup.string().required("Description is required"),
    acceptancePercentage: Yup.number()
      .min(0, "Must be at least 0")
      .max(100, "Must be at most 100")
      .required("Acceptance Percentage is required"),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting, setStatus }) => {
    try {
      const response = await axios.post(`${apiUrl}/api/followup/eng`, values);
      if (response.data.success) {
        setStatus("Submitted student information successfully!");
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 4000);
      } else {
        setStatus("Error: " + response.data.message);
        setShowAlert(false);
      }
      resetForm();
    } catch (error) {
      console.error("There was an error submitting the data!", error);
      setStatus("Failed to submit data.");
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
           Calling Follow-up Form Engineering
          </h2>
          <p className="text-sm text-gray-600">Enter your details here!</p>
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
                  <div className="w-full">
                    <Field
                      name="studentName"
                      type="text"
                      className="mt-3 py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                      placeholder="Student Name"
                    />
                    <ErrorMessage
                      name="studentName"
                      component="div"
                      className="error-message text-red-500 text-sm ms-2"
                    />
                  </div>
                  <div className="w-full">
                    <Field
                      name="collegeName"
                      type="text"
                      className="mt-3 py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                      placeholder="College/School Name"
                    />
                    <ErrorMessage
                      name="collegeName"
                      component="div"
                      className="error-message text-red-500 text-sm ms-2"
                    />
                  </div>
                  <div className="w-full">
                    <Field
                      name="phoneNumber"
                      type="tel"
                      className="mt-3 py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                      placeholder="Phone Number (must be unique)"
                    />
                    <ErrorMessage
                      name="phoneNumber"
                      component="div"
                      className="error-message text-red-500 text-sm ms-2"
                    />
                  </div>
                  <div className="w-full">
                    <Field
                      as="select"
                      name="followupNumber"
                      className="mt-3 py-2 px-3 pe-9 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      <option value="1">1st Follow-up</option>
                      <option value="2">2nd Follow-up</option>
                      <option value="3">3rd Follow-up</option>
                      <option value="4">4th Follow-up</option>
                      <option value="5">5th Follow-up</option>
                      <option value="6">6th Follow-up</option>
                      <option value="7">7th Follow-up</option>
                      <option value="8">8th Follow-up</option>
                      <option value="9">9th Follow-up</option>
                      <option value="10">10th Follow-up</option>
                    </Field>
                    <ErrorMessage
                      name="followupNumber"
                      component="div"
                      className="error-message text-red-500 text-sm ms-2"
                    />
                  </div>
                  <div className="w-full">
                    <Field
                      name="description"
                      type="text"
                      className="mt-3 py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                      placeholder="Description"
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="error-message text-red-500 text-sm ms-2"
                    />
                  </div>
                  <div className="w-full">
                    <Field
                      name="acceptancePercentage"
                      type="number"
                      className="mt-3 py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                      placeholder="Percentage of Acceptance (%)"
                      min="0"
                      max="100"
                    />
                    <ErrorMessage
                      name="acceptancePercentage"
                      component="div"
                      className="error-message text-red-500 text-sm ms-2"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-5 flex justify-end gap-x-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                >
                  {isSubmitting ? "Submitting..." : "Submit Information"}
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

export default FollowupFormEng;
