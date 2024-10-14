import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './batchform.css';
import Alert from "../Alert/Alert";
const apiUrl = process.env.REACT_APP_API_URL;

const BatchLoginForm = () => {
  
  // Initial form values
  const initialValues = {
    batchId: '',
    selectSubject: '',
    nextClassDate: '',
    studentName: '',
    studentEmail: ''
  };
  
  const [showAlert, setShowAlert] = useState(false);

  // Validation schema using Yup
  const validationSchema = Yup.object({
    batchId: Yup.string().required('Batch ID is required'),
    selectSubject: Yup.string().required("Subject is required"),
    nextClassDate: Yup.string().required('Next Class Date is required'),
    studentName: Yup.string().min(2, 'Must be at least 2 characters').required('Student Name is required'),
    studentEmail: Yup.string().email('Invalid email format').required('Student Email is required')
  });

  // Handle form submission
  const handleSubmit = async (values, { resetForm, setSubmitting, setStatus }) => {
    try {
      const selectedDate = new Date(values.nextClassDate);
      const istOffset = 5.5 * 60 * 60 * 1000; 
      const istDate = new Date(selectedDate.getTime() + istOffset);
      const formattedDate = istDate.toISOString().split('T')[0]; 
  
      const updatedValues = {
        ...values,
        nextClassDate: formattedDate,
      };

      // Log the values to check what is being sent
      console.log("Form values:", updatedValues);
  
      const response = await axios.post(`${apiUrl}/api/batches`, updatedValues);
      console.log('Form submitted successfully:', response.data);
      setStatus('Form submitted successfully!');
      setShowAlert(true);
      resetForm(); 
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('Error submitting form.');
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
            Batch Details Form
          </h2>
          <p className="text-sm text-gray-600">Enter your details here!.</p>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, status }) => (
            <>
              <Form>
                <div className="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200">
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row gap-1">
                      <div className="w-full">
                        <Field
                          name="batchId"
                          type="text"
                          className="mt-3 py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500"
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
                          as="select"
                          name="selectSubject"
                          className="mt-3 py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500"
                        >
                          <option value="">Select Subject</option>
                          <option value="python">Python</option>
                          <option value="ai">AI</option>
                          <option value="linux">LINUX</option>
                          <option value="cloudcomputing">CLOUD COMPUTING</option>
                        </Field>
                        <ErrorMessage
                          name="selectSubject"
                          component="div"
                          className="error-message text-[red] text-sm ms-2"
                        />
                      </div>
                      <div className="w-full">
                        <Field
                          name="studentName"
                          type="text"
                          className="mt-3 py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500"
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
                      name="studentEmail"
                      type="text"
                      className="mt-3 py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Email"
                    />
                    <ErrorMessage
                      name="studentEmail"
                      component="div"
                      className="error-message text-[red] text-sm ms-2"
                    />
                  </div>
                  <div className="mt-2 flex flex-col sm:flex-row gap-3">
                    <div className="w-full">
                      <label htmlFor="nextClassDate">
                        <span className="text-sm text-gray-600 font-[500]">Next Class Date</span>
                      </label>  
                      <Field
                        name="nextClassDate"
                        type="date"
                        className="py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500"
                      />
                      <ErrorMessage
                        name="nextClassDate"
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
                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
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
            </>
          )}
        </Formik>
      </div>
      {showAlert && <Alert />}
    </div>
  );
};

export default BatchLoginForm;
