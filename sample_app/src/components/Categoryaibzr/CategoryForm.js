import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Alert from "../Alert/Alert"; // Assuming you have an Alert component

const apiUrl = process.env.REACT_APP_API_URL;

const CategoryForm = () => {
  const initialValues = {
    categoryId: "",
    description: "",
    suggestion: "",
  };

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [excelFile, setExcelFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [latestSerialNumber, setLatestSerialNumber] = useState(null); // To display the latest serial number

  const validationSchema = Yup.object({
    categoryId: Yup.string().required("Category is required"),
    description: Yup.string().required("Description is required"),
    suggestion: Yup.string().required("Suggestion is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(`${apiUrl}/api/categories`, values);
      if (response.status === 201) {
        setAlertMessage("Category submitted successfully!");
        setShowAlert(true);
        setLatestSerialNumber(response.data.serial_number); // Update serial number
        resetForm();
      } else {
        setAlertMessage("Error: Unable to submit the category.");
        setShowAlert(true);
      }
    } catch (error) {
      console.error("Error submitting category:", error);
      setAlertMessage("An error occurred while submitting the category.");
      setShowAlert(true);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setShowAlert(false), 4000);
    }
  };

  const handleExcelUpload = async () => {
    if (!excelFile) {
      alert("Please choose an Excel file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", excelFile);

    try {
      const response = await axios.post(`${apiUrl}/api/categories`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        setAlertMessage("Excel file uploaded successfully!");
        setShowAlert(true);
      } else {
        setAlertMessage("Error uploading file.");
        setShowAlert(true);
      }
    } catch (error) {
      console.error("Error uploading Excel file:", error);
      setAlertMessage("An error occurred while uploading the file.");
      setShowAlert(true);
    } finally {
      setTimeout(() => setShowAlert(false), 4000);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Category Entry Form</h1>
          <p className="text-md text-gray-500">Enter category details below to get started.</p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div>
                <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <Field
                  name="categoryId"
                  type="text"
                  placeholder="Enter category"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <ErrorMessage
                  name="categoryId"
                  component="div"
                  className="text-sm text-red-600 mt-1"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <Field
                  name="description"
                  type="text"
                  placeholder="Enter description"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-sm text-red-600 mt-1"
                />
              </div>

              <div>
                <label htmlFor="suggestion" className="block text-sm font-medium text-gray-700 mb-2">
                  Suggestion
                </label>
                <Field
                  name="suggestion"
                  type="text"
                  placeholder="Enter suggestion"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <ErrorMessage
                  name="suggestion"
                  component="div"
                  className="text-sm text-red-600 mt-1"
                />
              </div>

              {latestSerialNumber && (
                <div className="text-center text-gray-600 font-medium">
                  Latest Serial Number: {latestSerialNumber}
                </div>
              )}

              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-3 font-medium text-sm rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    isSubmitting
                      ? "bg-gray-400 text-gray-700"
                      : "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500"
                  }`}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 mt-10">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Import Categories from Excel</h2>
          <p className="text-md text-gray-500">Upload an Excel file with category data.</p>
        </div>
        <div className="flex flex-col items-center">
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={(e) => setExcelFile(e.target.files[0])}
            className="block w-full p-2 text-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleExcelUpload}
            disabled={!excelFile}
            className="mt-4 px-6 py-3 bg-green-600 text-white font-medium text-sm rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Upload Excel File
          </button>
        </div>
      </div>

      {showAlert && (
        <div className="mt-4 text-center">
          <Alert message={alertMessage} />
        </div>
      )}
    </div>
  );
};

export default CategoryForm;
