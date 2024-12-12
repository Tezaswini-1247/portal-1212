import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./InstitutionForm.css";
import Alert from "../Alert/Alert";
const apiUrl = process.env.REACT_APP_API_URL;


export function InstitutionForm() {
  const initialValues = {
    salesPersonName: "",
    institutionName: "",
    contactPerson: "",
    phoneNumber: "",
    email: "",
    city: "",
    state: "",
    numberOfStudents: "",
    response: "",
    datetime: "",
    photo: null, 
    description: ""  
  };

  const [showAlert, setShowAlert] = useState(false);

  const validationSchema = Yup.object({
    salesPersonName: Yup.string()
      .min(2, "Must be at least 2 characters")
      .required("Sales Person Name is required"),
    institutionName: Yup.string().required("Institution Name is required"),
    contactPerson: Yup.string().required("Contact Person is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    numberOfStudents: Yup.number().required("Number of Students is required"),
    response: Yup.string().required("Response is required"),
    datetime: Yup.string().required("Date & Time is required"),
    photo: Yup.mixed().required("Photo is required"),
    description: Yup.string().max(500, "Description cannot exceed 500 characters")
  });

  const handleSubmit = async (values, { resetForm, setSubmitting, setStatus }) => {
    console.log(values);
    try {
      const response = await axios.post(`${apiUrl}/api/institutions`, values);
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
    <div className="max-w-xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="bg-white rounded-xl shadow p-4 sm:p-7">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Update Sales Feedback Information
          </h2>
          <p className="text-sm text-gray-600">Fill in the institution details.</p>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting,setFieldValue, status }) => (
            <Form>
              <div className="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200">
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="w-full">
                      <Field
                        name="salesPersonName"
                        type="text"
                        className="mt-3 py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Sales Person Name"
                      />
                      <ErrorMessage name="salesPersonName" component="div" className="text-[red] text-sm" />
                    </div>
                    <div className="w-full">
                      <Field
                        name="institutionName"
                        type="text"
                        className="mt-3 py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Institution Name"
                      />
                      <ErrorMessage name="institutionName" component="div" className="text-[red] text-sm" />
                    </div>
                  </div>

                  <div className="w-full">
                    <Field
                      name="contactPerson"
                      type="text"
                      className="mt-3 py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Contact Person"
                    />
                    <ErrorMessage name="contactPerson" component="div" className="text-[red] text-sm" />
                  </div>

                  <div className="w-full">
                    <Field
                      name="phoneNumber"
                      type="text"
                      className="mt-3 py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Phone Number"
                    />
                    <ErrorMessage name="phoneNumber" component="div" className="text-[red] text-sm" />
                  </div>

                  <div className="w-full">
                    <Field
                      name="email"
                      type="email"
                      className="mt-3 py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Email"
                    />
                    <ErrorMessage name="email" component="div" className="text-[red] text-sm" />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="w-full">
                      <Field
                        name="city"
                        type="text"
                        className="mt-3 py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500"
                        placeholder="City"
                      />
                      <ErrorMessage name="city" component="div" className="text-[red] text-sm" />
                    </div>
                    <div className="w-full">
                      <Field
                        name="state"
                        type="text"
                        className="mt-3 py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500"
                        placeholder="State"
                      />
                      <ErrorMessage name="state" component="div" className="text-[red] text-sm" />
                    </div>
                  </div>

                  <div className="w-full">
                    <Field
                      name="numberOfStudents"
                      type="number"
                      className="mt-3 py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Number of Students"
                    />
                    <ErrorMessage name="numberOfStudents" component="div" className="text-[red] text-sm" />
                  </div>

                  <div className="w-full">
                    <Field
                      as="select"
                      name="response"
                      className="mt-3 py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="">Select Response</option>
                      <option value="positive">Positive</option>
                      <option value="negative">Negative</option>
                      <option value="follow up">Follow Up</option>
                    </Field>
                    <ErrorMessage name="response" component="div" className="text-[red] text-sm" />
                  </div>
                  {/* Description Field */}
                  <div className="w-full">
                    <Field
                      name="description"
                      as="textarea"
                      rows="4"
                      className="mt-3 py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Description or Comments"
                    />
                    <ErrorMessage name="description" component="div" className="text-[red] text-sm" />
                  </div>

                  <div className="w-full">
                    <Field
                      name="datetime"
                      type="datetime-local"
                      className="mt-3 py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500"
                    />
                    <ErrorMessage name="datetime" component="div" className="text-[red] text-sm" />
                  </div>

                   {/* Photo Upload Field */}
                   <div className="w-full">
                    <label htmlFor="photo">Upload Photo</label>
                    <input
                      id="photo"
                      name="photo"
                      type="file"
                      accept="image/*"
                      onChange={(event) => {
                        setFieldValue("photo", event.target.files[0]);
                      }}
                      className="mt-3 py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500"
                    />
                    <ErrorMessage name="photo" component="div" className="text-[red] text-sm" />
                  </div>
                </div>
              </div>

              <div className="mt-5 flex justify-end gap-x-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>

              {status && <div className="submission-status text-black text-center">{status}</div>}
            </Form>
          )}
        </Formik>
      </div>
      {showAlert && <Alert />}
    </div>
  );
}

export default InstitutionForm;
