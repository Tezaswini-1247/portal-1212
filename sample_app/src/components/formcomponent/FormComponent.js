import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Alert from "../Alert/Alert";
const apiUrl = process.env.REACT_APP_API_URL;

export function FormComponent() {
  const initialValues = {
    studentName: "",
    fatherDetails: "",
    motherDetails: "",
    contactNumber: "",
    studentMobile: "",  // New field
    address: "",
    schoolname: "",
    courseName: "",  // New field
    courseYear: "",  // New field
    interestedOnline: false,
    demoDate: "",
    salesRefName: "",
    interestedFor: "",  // New field
    paymentMode: ""  // New field
  };

  const [showAlert, setShowAlert] = useState(false);

  const validationSchema = Yup.object({
    studentName: Yup.string().min(2, "Must be at least 2 characters").required("Student Name is required"),
    fatherDetails: Yup.string().required("Father's details are required"),
    motherDetails: Yup.string().required("Mother's details are required"),
    contactNumber: Yup.string().required("Contact Number is required"),
    studentMobile: Yup.string().required("Student Mobile is required"),  // Validation for new field
    address: Yup.string().required("Address is required"),
    schoolname: Yup.string().required("School Name is required"),
    courseName: Yup.string().required("Course Name is required"),  // Validation for new field
    courseYear: Yup.string().required("Course Year is required"),  // Validation for new field
    demoDate: Yup.date().required("Demo Date is required").nullable(),
    salesRefName: Yup.string().required("Sales Reference Name is required"),
    interestedOnline: Yup.boolean(),
    interestedFor: Yup.string().required("Select a course of interest"),  // Validation for new field
    paymentMode: Yup.string().required("Select a payment mode")  // Validation for new field
  });

  const handleSubmit = async (values, { resetForm, setSubmitting, setStatus }) => {
    try {
      const response = await axios.post('http://localhost:5000/feedback/school', values);
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
            Student Feedback Form
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
              <div className="space-y-4">
                {/* Student Name */}
                <div className="w-full">
                  <Field
                    name="studentName"
                    type="text"
                    className="mt-3 py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg"
                    placeholder="Student Name"
                  />
                  <ErrorMessage
                    name="studentName"
                    component="div"
                    className="error-message text-[red] text-sm"
                  />
                </div>

                {/* Father's Details */}
                <div className="w-full">
                  <Field
                    name="fatherDetails"
                    type="text"
                    className="mt-3 py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg"
                    placeholder="Father Name & Profession"
                  />
                  <ErrorMessage
                    name="fatherDetails"
                    component="div"
                    className="error-message text-[red] text-sm"
                  />
                </div>

                {/* Mother's Details */}
                <div className="w-full">
                  <Field
                    name="motherDetails"
                    type="text"
                    className="mt-3 py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg"
                    placeholder="Mother Name & Profession"
                  />
                  <ErrorMessage
                    name="motherDetails"
                    component="div"
                    className="error-message text-[red] text-sm"
                  />
                </div>

                {/* Parent Contact Number */}
                <div className="w-full">
                  <Field
                    name="contactNumber"
                    type="text"
                    className="mt-3 py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg"
                    placeholder="Parent Contact Number"
                  />
                  <ErrorMessage
                    name="contactNumber"
                    component="div"
                    className="error-message text-[red] text-sm"
                  />
                </div>

                {/* Student Mobile (New Field) */}
                <div className="w-full">
                  <Field
                    name="studentMobile"
                    type="text"
                    className="mt-3 py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg"
                    placeholder="Student Mobile Number"
                  />
                  <ErrorMessage
                    name="studentMobile"
                    component="div"
                    className="error-message text-[red] text-sm"
                  />
                </div>

                {/* Address */}
                <div className="w-full">
                  <Field
                    name="address"
                    type="text"
                    className="mt-3 py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg"
                    placeholder="Residing Address"
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="error-message text-[red] text-sm"
                  />
                </div>
                {/* Demo Date */}
                <div className="w-full">
                  <Field
                    name="demoDate"
                    type="date"
                    className="mt-3 py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg"
                  />
                  <ErrorMessage
                    name="demoDate"
                    component="div"
                    className="error-message text-[red] text-sm"
                  />
                </div>

                {/* School Name */}
                <div className="w-full">
                  <Field
                    name="schoolname"
                    type="text"
                    className="mt-3 py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg"
                    placeholder="Enter School or College Name"
                  />
                  <ErrorMessage
                    name="schoolname"
                    component="div"
                    className="error-message text-[red] text-sm"
                  />
                </div>

                {/* Course Name (New Field) */}
                <div className="w-full">
                  <Field
                    name="courseName"
                    type="text"
                    className="mt-3 py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg"
                    placeholder="Educational Qualification - Course Name"
                  />
                  <ErrorMessage
                    name="courseName"
                    component="div"
                    className="error-message text-[red] text-sm"
                  />
                </div>

                {/* Course Year (New Field) */}
                <div className="w-full">
                  <Field
                    name="courseYear"
                    type="text"
                    className="mt-3 py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg"
                    placeholder="Year of Course"
                  />
                  <ErrorMessage
                    name="courseYear"
                    component="div"
                    className="error-message text-[red] text-sm"
                  />
                </div>

                {/* Interested in Online Course */}
                <div className="w-full">
                  <Field
                    as="select"
                    name="interestedOnline"
                    className="mt-3 py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg"
                  >
                    <option value="">Interested in Online Course?</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </Field>
                  <ErrorMessage
                    name="interestedOnline"
                    component="div"
                    className="error-message text-[red] text-sm"
                  />
                </div>

                

                {/* Sales Reference Name */}
                <div className="w-full">
                  <Field
                    name="salesRefName"
                    type="text"
                    className="mt-3 py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg"
                    placeholder="Sales Reference Name"
                  />
                  <ErrorMessage
                    name="salesRefName"
                    component="div"
                    className="error-message text-[red] text-sm"
                  />
                </div>

                {/* Interested in Courses (New Field) */}
                <div className="w-full">
                  <Field
                    as="select"
                    name="interestedFor"
                    className="mt-3 py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg"
                  >
                    <option value="">Interested For</option>
                    <option value="AI">AI</option>
                    <option value="Python">Python</option>
                    <option value="Cloud computing">Cloud computing</option>
                    <option value="Linux">Linux</option>
                    <option value="All">All</option>
                  </Field>
                  <ErrorMessage
                    name="interestedFor"
                    component="div"
                    className="error-message text-[red] text-sm"
                  />
                </div>

                {/* Payment Mode (New Field) */}
                <div className="w-full">
                  <Field
                    as="select"
                    name="paymentMode"
                    className="mt-3 py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg"
                  >
                    <option value="">Payment Mode</option>
                    <option value="Single Payment">Single Payment</option>
                    <option value="Installments">Installments</option>
                  </Field>
                  <ErrorMessage
                    name="paymentMode"
                    component="div"
                    className="error-message text-[red] text-sm"
                  />
                </div>
              </div>

              <div className="mt-5 flex justify-end gap-x-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700"
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

export default FormComponent;
