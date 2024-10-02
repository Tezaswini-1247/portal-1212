// import React, { useState } from 'react';
// import axios from 'axios';
// import './UpdateServerForm.css'; // Import the CSS file

// const UpdateServerForm = () => {
//     const [serverId, setServerId] = useState('');
//     const [serverName, setServerName] = useState('');
//     const [active, setActive] = useState(false);
//     const [studentName, setStudentName] = useState('');
//     const [studentEmail, setStudentEmail] = useState('');
//     const [message, setMessage] = useState('');

//     const handleUpdate = async (e) => {
//         e.preventDefault();
//         setMessage('');

//         try {
//             const response = await axios.post('http://localhost:5000/api/servers', {
//                 serverId,
//                 serverName,
//                 active,
//                 studentName,
//                 studentEmail
//             });

//             setMessage(response.data);
//         } catch (error) {
//             console.error('Error:', error);
//             setMessage('Error inserting server data');
//         }
//     };

//     return (
//         <div className="update-server-form">
//             <h2>Update Server Information</h2>
//             <form onSubmit={handleUpdate}>
//                 <div className="form-group">
//                     <label htmlFor="serverId">Server ID:</label>
//                     <input
//                         id="serverId"
//                         type="text"
//                         value={serverId}
//                         onChange={(e) => setServerId(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="serverName">Server Name:</label>
//                     <input
//                         id="serverName"
//                         type="text"
//                         value={serverName}
//                         onChange={(e) => setServerName(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="active">Active:</label>
//                     <input
//                         id="active"
//                         type="checkbox"
//                         checked={active}
//                         onChange={() => setActive(!active)}
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="studentName">Student Name:</label>
//                     <input
//                         id="studentName"
//                         type="text"
//                         value={studentName}
//                         onChange={(e) => setStudentName(e.target.value)}
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="studentEmail">Student Email:</label>
//                     <input
//                         id="studentEmail"
//                         type="email"
//                         value={studentEmail}
//                         onChange={(e) => setStudentEmail(e.target.value)}
//                     />
//                 </div>
//                 <button type="submit">Update Server</button>
//                 {message && <p className="message">{message}</p>}
//             </form>
//         </div>
//     );
// };

// export default UpdateServerForm;
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./UpdateServerForm.css";
import Alert from "../Alert/Alert";
const apiUrl = process.env.REACT_APP_API_URL;


export function UpdateServerForm() {
  const initialValues = {
    serverId: "",
    serverName: "",
    active: false,
    studentName: "",
    studentEmail: "",
  };

  const [showAlert, setShowAlert] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const validationSchema = Yup.object({
    serverId: Yup.string().required("Server ID is required"),
    serverName: Yup.string().required("Server Name is required"),
    studentName: Yup.string().required("Student Name is required"),
    studentEmail: Yup.string()
      .email("Invalid email format")
      .required("Student Email is required"),
  });

  const handleSubmit = async (
    values,
    { resetForm, setSubmitting, setStatus }
  ) => {
    console.log(values);
    try {
      const response = await axios.post(
        `${apiUrl}/api/servers`,
        values
      );
      console.log("Form submitted successfully", response.data);
      setStatus("Server data updated successfully!");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 4000);

      resetForm();
    } catch (error) {
      console.error("Error updating server data", error);
      setStatus("Failed to update server data.");
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
            Update Server Information
          </h2>
          <p className="text-sm text-gray-600">
            Enter server details to update!
          </p>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, status }) => (
            <Form>
              <div className="py-6 border-t border-gray-200">
                <div className="space-y-3">
                  <div className="flex flex-col gap-1">
                    <div className="w-full">
                      <Field
                        name="serverId"
                        type="text"
                        className="mt-3 py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg"
                        placeholder="Server ID"
                      />
                      <ErrorMessage
                        name="serverId"
                        component="div"
                        className="error-message text-[red] text-sm ms-2"
                      />
                    </div>
                    <div className="w-full">
                      <Field
                        name="serverName"
                        type="text"
                        className="mt-3 py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg"
                        placeholder="Server Name"
                      />
                      <ErrorMessage
                        name="serverName"
                        component="div"
                        className="error-message text-[red] text-sm ms-2"
                      />
                    </div>
                    <div className="w-full mt-3 flex items-center">
                      <Field
                        type="checkbox"
                        id="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                      />
                      <label htmlFor="checkbox" className="ml-2 text-gray-700">
                        Active
                      </label>
                    </div>
                  </div>
                </div>
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
                    className="error-message text-[red] text-sm ms-2"
                  />
                </div>
                <div className="w-full">
                  <Field
                    name="studentEmail"
                    type="email"
                    className="mt-3 py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg"
                    placeholder="Student Email"
                  />
                  <ErrorMessage
                    name="studentEmail"
                    component="div"
                    className="error-message text-[red] text-sm ms-2"
                  />
                </div>
              </div>

              <div className="mt-5 flex justify-end gap-x-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-2 px-3 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none"
                >
                  {isSubmitting ? "Updating..." : "Update Server"}
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

export default UpdateServerForm;
