import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Alert from "../Alert/Alert"; // Assuming you have an Alert component

const apiUrl = process.env.REACT_APP_API_URL;

const FollowupFormeng = () => {
  const initialValues = {
    studentName: "",
    parentName: "",
    email: "",
    phoneNumber: "",
    collegeName: "",
    salesRefName: "",
    startDate: '',
  };

  const [showAlert, setShowAlert] = useState(false);
  const [excelFile, setExcelFile] = useState(null);

  const validationSchema = Yup.object({
    studentName: Yup.string()
      .min(2, "Must be at least 2 characters")
      .required("Student Name is required"),
    parentName: Yup.string().required("Parent name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
    collegeName: Yup.string().required("College/School Name is required"),
    salesRefName: Yup.string().required("Sales Reference name is required"),
    startDate: Yup.string().required("Followup start date is required"),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting, setStatus }) => {
    try {
      const response = await axios.post(`${apiUrl}/api/followups/eng`, values);
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

  const handleExcelUpload = async () => {
    if (!excelFile) {
      alert("Please choose an Excel file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", excelFile); // Ensure the key matches what the server expects

    try {
      const response = await axios.post(`${apiUrl}/api/followups/bulk/eng`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      });

      if (response.data.success) {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 4000);
      } else {
        console.error("Upload failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error uploading Excel data:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="max-w-xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      {/* Follow-up Form */}
      <div className="bg-white rounded-xl shadow p-4 sm:p-7">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Follow-up Form Eng
          </h2>
          <p className="text-sm text-gray-600">Enter your follow-up details here!</p>
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
                  {/* Follow-up form fields */}
                  <div className="w-full">
                    <Field name="studentName" type="text" placeholder="Student Name" className="form-input" />
                    <ErrorMessage name="studentName" component="div" className="error-message" />
                  </div>
                  <div className="w-full">
                    <Field name="parentName" type="text" placeholder="Parent Name" className="form-input" />
                    <ErrorMessage name="parentName" component="div" className="error-message" />
                  </div>
                  <div className="w-full">
                    <Field name="email" type="email" placeholder="Email" className="form-input" />
                    <ErrorMessage name="email" component="div" className="error-message" />
                  </div>
                  <div className="w-full">
                    <Field name="phoneNumber" type="tel" placeholder="Phone Number" className="form-input" />
                    <ErrorMessage name="phoneNumber" component="div" className="error-message" />
                  </div>
                  <div className="w-full">
                    <Field name="collegeName" type="text" placeholder="College/School Name" className="form-input" />
                    <ErrorMessage name="collegeName" component="div" className="error-message" />
                  </div>
                  <div className="w-full">
                    <Field name="salesRefName" type="text" placeholder="Sales Reference Name" className="form-input" />
                    <ErrorMessage name="salesRefName" component="div" className="error-message" />
                  </div>
                  <div className="w-full">
                    <Field name="startDate" type="date" className="form-input" />
                    <ErrorMessage name="startDate" component="div" className="error-message" />
                  </div>
                </div>
              </div>

              <div className="mt-5 flex justify-end gap-x-2">
                <button type="submit" disabled={isSubmitting} className="submit-button">
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

      {/* Excel Import Section */}
      <div className="bg-white rounded-xl shadow p-4 sm:p-7 mt-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Import Follow-up Data from Excel
          </h2>
          <p className="text-sm text-gray-600">Upload an Excel file with follow-up data.</p>
        </div>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              setExcelFile(file); // Update the state with the selected file
            } else {
              console.log("No file selected.");
            }
          }}
          className="file-input"
        />

        <button
          onClick={handleExcelUpload}
          disabled={!excelFile}
          className="mt-4 py-2 px-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
        >
          Upload Excel File
        </button>
      </div>

      {showAlert && <Alert />}
    </div>
  );
};

export default FollowupFormeng;
