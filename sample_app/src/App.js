import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import "./App.css";
import "./index.css";
import RetrieveStudentForm from "./components/retrivestudentloginform/retrivestudentloginform";
import Studentloginform from "./components/studentloginform/studentloginform";
import RetrieveBatchLoginForm from "./components/retrivebatchloginmanagement/RetrievebatchForm";
import TutorRetrieveForm from "./components/retrivetutorloginform/TutorRetrieveForm";
import Tutorinsform from "./components/tutorloginfrom/Tutorinsform";
import BatchLoginForm from "./components/batchloginmanagement/batchform";
import Loginform from "./components/Loginform/Loginform";
import InstitutionForm from "./components/institutionform/InstitutionForm";
import RetrieveForm from "./components/retriveform/RetrieveForm";
import UpdateServerForm from "./components/updateserverform/UpdateServerForm";
import RetrieveBusinessOpportunity from "./components/retrivebusinessopportunity/RetrieveBusinessOpportunity";
import BusinessOpportunityForm from "./components/businessopportunity/BusinessOpportunityForm";
import RetrieveServerForm from "./components/retriveupdateserverform/RetrieveServerForm";
import Retrivestudentloginform from "./components/retrivestudentloginform/retrivestudentloginform";
import FollowupsAllForm from "./components/Part3ALLforms/ALLFollowups";
import FollowupForm from "./components/followupform/FollowupForm";
import PaymentForm from "./components/payment/PaymentForm";
import RetrievePayments from "./components/retrivepayment/RetrievePayments";
import Home from "./components/homecomponent/home";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import StudentsAllForm from "./components/part2Allforms/studentAllretrieves";
import RetrieveFollowups from "./components/retrivefollowupform/RetrieveFollowups";
import FollowupsAllFormeng from "./components/part4allreports/engallrecords";
import RetrieveFollowupsEng from "./components/retrivefollowup-eng/RetrieveFollowups-eng";
import RetrievePaymentsENG from "./components/retrivepayment-eng/RetrievePayments-eng";
import FollowupFormENG from "./components/followupform-eng/FollowupForm-eng";
import PaymentFormENG from "./components/paymentform-eng/PaymentForm-eng";
import Pages from "./components/pagescomponent/pages";
import RetrieveAllForm from "./components/integratedRetrieve/integratedRetrieveForm";
import Contact from "./components/contactcomponent/contact";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onHandleLogin = () => {
    setIsLoggedIn(true);
    console.log("Login function is triggered!");
  };

  const onHandleLogout = () => {
    setIsLoggedIn(false);
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleOffCanvas = () => {
    setIsOpen(!isOpen);
  };

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <Router>
      <div className="App">
        <div className={`main-content ${isOpen ? "resized" : ""}`}>
          <div class="bg-gray-50 transition-all duration-300 lg:hs-overlay-layout-open:ps-[260px] ">
            <main id="content">
              <div class="sticky top-0 inset-x-0 z-20 bg-white border-y px-4 sm:px-6 lg:px-8">
                <div class="flex items-center py-2 ">
                  {isLoggedIn && (
                    <button
                      type="button"
                      class="bg-white  flex justify-center items-center z-[999]  text-gray-800 hover:text-gray-500 rounded-lg focus:outline-none focus:text-gray-500 p-0"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasExample"
                      onClick={toggleOffCanvas}
                      aria-controls="offcanvasExample"
                    >
                      <div class="no-underline m-1 py-3 px-4 inline-flex items-center gap-x-2 text-sm text-black font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700">
                        <span>Menu</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-three-dots-vertical"
                          viewBox="0 0 16 16"
                        >
                          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                        </svg>
                      </div>
                    </button>
                  )}

                  <header class="no-underline boder-0 p-0 sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-[48] w-full bg-white text-sm py-2.5 lg:ps-[260px]">
                    <nav class=" relative max-w-full w-full mx-auto md:flex md:items-center md:justify-between md:gap-3 py-0   px-4 sm:px-6 lg:px-8">
                      <div class="flex justify-between items-center gap-x-1">
                        <Link
                          class="flex-none font-semibold text-xl text-black focus:outline-none focus:opacity-80"
                          to="/home"
                          aria-label="Brand"
                        >
                          <img
                            class="w-full size-12 object-cover"
                            src="https://cloud4coolkids.com/assets/admin_image/image/20240513194409.png"
                            alt="logo"
                          />
                        </Link>
                      </div>

                      <div
                        id="hs-header-base"
                        class="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block "
                        aria-labelledby="hs-header-base-collapse"
                      >
                        <div class="overflow-hidden overflow-y-auto max-h-[75vh] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
                          <div class="py-2 md:py-0  flex flex-col md:flex-row md:items-center gap-0.5 md:gap-1">
                            <div class="grow">
                              <div class="flex flex-col md:flex-row md:justify-end md:items-center gap-0.5 md:gap-1">
                                <Link
                                  to="/home"
                                  class="p-2 flex items-center text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 no-underline"
                                  href="#"
                                  aria-current="page"
                                >
                                  HOME
                                </Link>

                                {/* <Link
                                  to="/pages"
                                  class="p-2 flex items-center text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 no-underline"
                                  href="#"
                                >
                                  PAGES
                                </Link> */}

                                <Link
                                  class="p-2 flex items-center text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 no-underline"
                                  to="/contact"
                                >
                                  CONTACT US
                                </Link>
                              </div>
                            </div>

                            <div class="my-2 md:my-0 md:mx-2">
                              <div class="w-full h-px md:w-px md:h-4 bg-gray-100 md:bg-gray-300"></div>
                            </div>

                            <div class=" flex flex-wrap items-center gap-x-1.5">
                              <Link
                                class="px-4 py-[10px] inline-flex items-center font-medium text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none  no-underline"
                                to="/"
                                onClick={onHandleLogout}
                              >
                                {isLoggedIn ? "Logout" : "Login"}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </nav>
                  </header>
                </div>
              </div>

              <div
                id="hs-application-sidebar"
                class="hs-overlay [--body-scroll:true]
                          hs-overlay-open:translate-x-0
                         -translate-x-full transition-all duration-300 transform
                           w-[260px] h-full
                          hidden
                         fixed inset-y-0 start-0 z-[60]
                         bg-white border-e border-gray-200
"
                role="dialog"
                tabindex="-1"
                aria-label="Sidebar"
              >
                <div class="relative flex flex-col h-full max-h-full">
                  <div class="px-6 pt-4">
                    <a
                      class="flex-none rounded-xl text-xl inline-block font-semibold focus:outline-none focus:opacity-80"
                      aria-label="Preline"
                    >
                      <svg
                        class="w-28 h-auto"
                        width="116"
                        height="32"
                        viewBox="0 0 116 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M33.5696 30.8182V11.3182H37.4474V13.7003H37.6229C37.7952 13.3187 38.0445 12.9309 38.3707 12.5369C38.7031 12.1368 39.134 11.8045 39.6634 11.5398C40.1989 11.2689 40.8636 11.1335 41.6577 11.1335C42.6918 11.1335 43.6458 11.4044 44.5199 11.946C45.3939 12.4815 46.0926 13.291 46.6158 14.3743C47.139 15.4515 47.4006 16.8026 47.4006 18.4276C47.4006 20.0095 47.1451 21.3452 46.6342 22.4347C46.1295 23.518 45.4401 24.3397 44.5661 24.8999C43.6982 25.4538 42.7256 25.7308 41.6484 25.7308C40.8852 25.7308 40.2358 25.6046 39.7003 25.3523C39.1709 25.0999 38.737 24.7829 38.3984 24.4013C38.0599 24.0135 37.8014 23.6226 37.6229 23.2287H37.5028V30.8182H33.5696ZM37.4197 18.4091C37.4197 19.2524 37.5367 19.9879 37.7706 20.6158C38.0045 21.2436 38.343 21.733 38.7862 22.0838C39.2294 22.4285 39.768 22.6009 40.402 22.6009C41.0421 22.6009 41.5838 22.4254 42.027 22.0746C42.4702 21.7176 42.8056 21.2251 43.0334 20.5973C43.2673 19.9633 43.3842 19.2339 43.3842 18.4091C43.3842 17.5904 43.2704 16.8703 43.0426 16.2486C42.8149 15.6269 42.4794 15.1406 42.0362 14.7898C41.593 14.4389 41.0483 14.2635 40.402 14.2635C39.7618 14.2635 39.2202 14.4328 38.777 14.7713C38.34 15.1098 38.0045 15.59 37.7706 16.2116C37.5367 16.8333 37.4197 17.5658 37.4197 18.4091ZM49.2427 25.5V11.3182H53.0559V13.7926H53.2037C53.4622 12.9124 53.8961 12.2476 54.5055 11.7983C55.1149 11.3428 55.8166 11.1151 56.6106 11.1151C56.8076 11.1151 57.02 11.1274 57.2477 11.152C57.4754 11.1766 57.6755 11.2105 57.8478 11.2536V14.7436C57.6632 14.6882 57.4077 14.639 57.0815 14.5959C56.7553 14.5528 56.4567 14.5312 56.1859 14.5312C55.6073 14.5312 55.0903 14.6574 54.6348 14.9098C54.1854 15.156 53.8284 15.5007 53.5638 15.9439C53.3052 16.3871 53.176 16.898 53.176 17.4766V25.5H49.2427ZM64.9043 25.777C63.4455 25.777 62.1898 25.4815 61.1373 24.8906C60.0909 24.2936 59.2845 23.4503 58.7182 22.3608C58.1519 21.2652 57.8688 19.9695 57.8688 18.4737C57.8688 17.0149 58.1519 15.7346 58.7182 14.6328C59.2845 13.531 60.0816 12.6723 61.1096 12.0568C62.1437 11.4413 63.3563 11.1335 64.7474 11.1335C65.683 11.1335 66.5539 11.2843 67.3603 11.5859C68.1728 11.8814 68.8806 12.3277 69.4839 12.9247C70.0932 13.5218 70.5672 14.2727 70.9057 15.1776C71.2443 16.0762 71.4135 17.1288 71.4135 18.3352V19.4155H59.4384V16.978H67.7111C67.7111 16.4117 67.588 15.91 67.3418 15.473C67.0956 15.036 66.754 14.6944 66.317 14.4482C65.8861 14.1958 65.3844 14.0696 64.812 14.0696C64.2149 14.0696 63.6856 14.2081 63.2239 14.4851C62.7684 14.7559 62.4114 15.1222 62.1529 15.5838C61.8944 16.0393 61.762 16.5471 61.7559 17.1072V19.4247C61.7559 20.1264 61.8851 20.7327 62.1437 21.2436C62.4083 21.7545 62.7807 22.1484 63.2608 22.4254C63.741 22.7024 64.3103 22.8409 64.9689 22.8409C65.406 22.8409 65.8061 22.7794 66.1692 22.6562C66.5324 22.5331 66.8432 22.3485 67.1018 22.1023C67.3603 21.8561 67.5572 21.5545 67.6927 21.1974L71.3304 21.4375C71.1458 22.3116 70.7672 23.0748 70.1948 23.7273C69.6285 24.3736 68.896 24.8783 67.9974 25.2415C67.1048 25.5985 66.0738 25.777 64.9043 25.777ZM77.1335 6.59091V25.5H73.2003V6.59091H77.1335ZM79.5043 25.5V11.3182H83.4375V25.5H79.5043ZM81.4801 9.49006C80.8954 9.49006 80.3937 9.29616 79.9752 8.90838C79.5628 8.51444 79.3566 8.04356 79.3566 7.49574C79.3566 6.95407 79.5628 6.48935 79.9752 6.10156C80.3937 5.70762 80.8954 5.51065 81.4801 5.51065C82.0649 5.51065 82.5635 5.70762 82.9759 6.10156C83.3944 6.48935 83.6037 6.95407 83.6037 7.49574C83.6037 8.04356 83.3944 8.51444 82.9759 8.90838C82.5635 9.29616 82.0649 9.49006 81.4801 9.49006ZM89.7415 17.3011V25.5H85.8083V11.3182H89.5569V13.8203H89.723C90.037 12.9955 90.5632 12.343 91.3019 11.8629C92.0405 11.3767 92.9361 11.1335 93.9887 11.1335C94.9735 11.1335 95.8322 11.349 96.5647 11.7798C97.2971 12.2107 97.8665 12.8262 98.2728 13.6264C98.679 14.4205 98.8821 15.3684 98.8821 16.4702V25.5H94.9489V17.1719C94.9551 16.304 94.7335 15.6269 94.2841 15.1406C93.8348 14.6482 93.2162 14.402 92.4283 14.402C91.8989 14.402 91.4311 14.5159 91.0249 14.7436C90.6248 14.9714 90.3109 15.3037 90.0831 15.7408C89.8615 16.1716 89.7477 16.6918 89.7415 17.3011ZM107.665 25.777C106.206 25.777 104.951 25.4815 103.898 24.8906C102.852 24.2936 102.045 23.4503 101.479 22.3608C100.913 21.2652 100.63 19.9695 100.63 18.4737C100.63 17.0149 100.913 15.7346 101.479 14.6328C102.045 13.531 102.842 12.6723 103.87 12.0568C104.905 11.4413 106.117 11.1335 107.508 11.1335C108.444 11.1335 109.315 11.2843 110.121 11.5859C110.934 11.8814 111.641 12.3277 112.245 12.9247C112.854 13.5218 113.328 14.2727 113.667 15.1776C114.005 16.0762 114.174 17.1288 114.174 18.3352V19.4155H102.199V16.978H110.472C110.472 16.4117 110.349 15.91 110.103 15.473C109.856 15.036 109.515 14.6944 109.078 14.4482C108.647 14.1958 108.145 14.0696 107.573 14.0696C106.976 14.0696 106.446 14.2081 105.985 14.4851C105.529 14.7559 105.172 15.1222 104.914 15.5838C104.655 16.0393 104.523 16.5471 104.517 17.1072V19.4247C104.517 20.1264 104.646 20.7327 104.905 21.2436C105.169 21.7545 105.542 22.1484 106.022 22.4254C106.502 22.7024 107.071 22.8409 107.73 22.8409C108.167 22.8409 108.567 22.7794 108.93 22.6562C109.293 22.5331 109.604 22.3485 109.863 22.1023C110.121 21.8561 110.318 21.5545 110.454 21.1974L114.091 21.4375C113.907 22.3116 113.528 23.0748 112.956 23.7273C112.389 24.3736 111.657 24.8783 110.758 25.2415C109.866 25.5985 108.835 25.777 107.665 25.777Z"
                          class="fill-blue-600"
                          fill="currentColor"
                        />
                        <path
                          d="M1 29.5V16.5C1 9.87258 6.37258 4.5 13 4.5C19.6274 4.5 25 9.87258 25 16.5C25 23.1274 19.6274 28.5 13 28.5H12"
                          class="stroke-blue-600 "
                          stroke="currentColor"
                          stroke-width="2"
                        />
                        <path
                          d="M5 29.5V16.66C5 12.1534 8.58172 8.5 13 8.5C17.4183 8.5 21 12.1534 21 16.66C21 21.1666 17.4183 24.82 13 24.82H12"
                          class="stroke-blue-600 "
                          stroke="currentColor"
                          stroke-width="2"
                        />
                        <circle
                          cx="13"
                          cy="16.5214"
                          r="5"
                          class="fill-blue-600"
                          fill="currentColor"
                        />
                      </svg>
                    </a>
                  </div>

                  <div class="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
                    <nav
                      class="hs-accordion-group p-3 w-full flex flex-col flex-wrap"
                      data-hs-accordion-always-open
                    ></nav>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        {isLoggedIn && (
          <>
            <div
              className="offcanvas offcanvas-start "
              style={{ width: "16rem" }}
              id="offcanvasExample"
            >
              <div
                id="hs-application-sidebar"
                class={`side-content ${
                  isOpen ? "resized" : "notresized"
                } hs-overlay  [--auto-close:lg]
                hs-overlay-open:translate-x-0
                transition-all duration-300 transform
                w-screen md:w-[16rem] h-full
                fixed inset-y-0 start-0 z-[60]
                bg-primary border-e border-gray-200
                lg:block lg:translate-x-0 lg:end-auto lg:bottom-0
              `}
                role="dialog"
                tabindex="-1"
                aria-label="Sidebar"
              >
                <div class="relative flex flex-col h-full max-h-full">
                  <div class="px-6 pt-4">
                    <div class="flex items-center gap-x-3  ">
                      <div class="shrink-0">
                        {/* <img
                          class="shrink-0 size-12 rounded-full"
                          src="https://img.freepik.com/premium-photo/happy-man-ai-generated-portrait-user-profile_1119669-1.jpg"
                          alt="Avatar"
                        /> */}
                      </div>
                      <div class="grow">
                        <button
                          type="button"
                          class="btn-close btn-light position-absolute top-2 end-2 "
                          data-bs-toggle="offcanvas"
                          data-bs-target="#offcanvasExample"
                          onClick={toggleOffCanvas}
                          aria-controls="offcanvasExample"
                          data-bs-dismiss="offcanvas"
                          aria-label="Close"
                        ></button>
                        <h1 class="text-lg m-0 text-white font-medium text-gray-800 text-left">
                          Hello team...
                        </h1>
                        <p class="text-sm text-white mb-0">
                          Visyscloudtech@gmail.com
                        </p>
                      </div>
                    </div>
                  </div>

                  <div class="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
                    <nav
                      class="hs-accordion-group p-3 w-full flex flex-col flex-wrap"
                      data-hs-accordion-always-open
                    >
                      <ul className="p-0">
                        {/* Sales & Business */}
                        <li className="mb-[0.1rem]">
                          <div>
                            <div>
                              <h2 className="accordion-header" id="headingOne">
                                <button
                                  className="accordion-button text-sm px-2 py-2 hover:bg-white bg-white focus:bg-white no-outline"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target="#collapseOne"
                                  aria-expanded="true"
                                  aria-controls="collapseOne"
                                >
                                  <i class="bi bi-person-fill-down pe-1"></i>{" "}
                                  Sales & Business
                                </button>
                              </h2>
                              <div
                                id="collapseOne"
                                className="accordion-collapse collapse"
                                aria-labelledby="headingOne"
                                data-bs-parent="#accordionExample"
                              >
                                <div className="accordion-body text-black p-0">
                                  <ul className="list-group list-group-flush text-sm">
                                    <li className="list-group-item d-flex">
                                      <Link
                                        className="dropdown-item"
                                        to="/institution-form"
                                      >
                                        <p
                                          className="p-0"
                                          style={{ width: "100%" }}
                                          data-bs-toggle="offcanvas"
                                          data-bs-target="#offcanvasExample"
                                          onClick={toggleOffCanvas}
                                          aria-controls="offcanvasExample"
                                        >
                                          <i className="bi bi-journal-medical pe-2"></i>{" "}
                                          Institution Form
                                        </p>
                                      </Link>
                                    </li>
                                    <li className="list-group-item d-flex">
                                      <Link
                                        className="dropdown-item"
                                        to="/retrieve-form"
                                      >
                                        <p
                                          className="p-0"
                                          style={{ width: "100%" }}
                                          data-bs-toggle="offcanvas"
                                          data-bs-target="#offcanvasExample"
                                          onClick={toggleOffCanvas}
                                          aria-controls="offcanvasExample"
                                        >
                                          <i className="bi bi-box-arrow-down pe-2"></i>{" "}
                                          Retrieve Form
                                        </p>
                                      </Link>
                                    </li>
                                    <li className="list-group-item d-flex">
                                      <Link
                                        className="dropdown-item"
                                        to="/business-opportunity-form"
                                      >
                                        <p
                                          className="p-0"
                                          style={{ width: "100%" }}
                                          data-bs-toggle="offcanvas"
                                          data-bs-target="#offcanvasExample"
                                          onClick={toggleOffCanvas}
                                          aria-controls="offcanvasExample"
                                        >
                                          <i className="bi bi-journal-medical pe-2"></i>{" "}
                                          Business Opportunity
                                        </p>
                                      </Link>
                                    </li>
                                    <li className="list-group-item d-flex">
                                      <Link
                                        className="dropdown-item"
                                        to="/retrieve-business-opportunity"
                                      >
                                        <p
                                          className="p-0"
                                          style={{ width: "100%" }}
                                          data-bs-toggle="offcanvas"
                                          data-bs-target="#offcanvasExample"
                                          onClick={toggleOffCanvas}
                                          aria-controls="offcanvasExample"
                                        >
                                          <i className="bi bi-box-arrow-down pe-2"></i>{" "}
                                          Retrieve Business Opportunity
                                        </p>
                                      </Link>
                                    </li>
                                    <li className="list-group-item d-flex">
                                      <Link
                                        className="dropdown-item"
                                        to="/update-server-form"
                                      >
                                        <p
                                          className="p-0"
                                          style={{ width: "100%" }}
                                          data-bs-toggle="offcanvas"
                                          data-bs-target="#offcanvasExample"
                                          onClick={toggleOffCanvas}
                                          aria-controls="offcanvasExample"
                                        >
                                          <i className="bi bi-journal-medical pe-2"></i>{" "}
                                          Update Server Form
                                        </p>
                                      </Link>
                                    </li>
                                    <li className="list-group-item d-flex">
                                      <Link
                                        className="dropdown-item"
                                        to="/retrieve-server-form"
                                      >
                                        <p
                                          className="p-0"
                                          style={{ width: "100%" }}
                                          data-bs-toggle="offcanvas"
                                          data-bs-target="#offcanvasExample"
                                          onClick={toggleOffCanvas}
                                          aria-controls="offcanvasExample"
                                        >
                                          <i className="bi bi-box-arrow-down pe-2"></i>{" "}
                                          Retrieve Update Server Form
                                        </p>
                                      </Link>
                                    </li>
                                    <li className="list-group-item d-flex">
                                      <Link
                                        className="dropdown-item"
                                        to="/retrieve-all-forms"
                                      >
                                        <p
                                          className="p-0"
                                          style={{ width: "100%" }}
                                          data-bs-toggle="offcanvas"
                                          data-bs-target="#offcanvasExample"
                                          onClick={toggleOffCanvas}
                                          aria-controls="offcanvasExample"
                                        >
                                          <i className="bi bi-box-arrow-down pe-2"></i>{" "}
                                          Retrieve All Forms
                                        </p>
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>

                        {/* Student & Batch */}
                        <li className="mb-[0.1rem]">
                          <div className="accordion" id="accordionExample">
                            <div className="accordion-item border-0">
                              <h2 className="accordion-header" id="headingTwo">
                                <button
                                  className="accordion-button text-sm px-2 py-2 hover:bg-white bg-white focus:bg-white no-outline"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target="#collapseTwo"
                                  aria-expanded="false"
                                  aria-controls="collapseTwo"
                                >
                                  <i class="bi bi-person-fill-down pe-1"></i>{" "}
                                  Student & Batch
                                </button>
                              </h2>
                              <div
                                id="collapseTwo"
                                className="accordion-collapse collapse"
                                aria-labelledby="headingTwo"
                                data-bs-parent="#accordionExample"
                              >
                                <div className="accordion-body text-black p-0">
                                  <ul className="list-group list-group-flush text-sm">
                                    <li className="list-group-item d-flex">
                                      <Link
                                        className="dropdown-item"
                                        to="/student-login-form"
                                      >
                                        <p
                                          className="p-0"
                                          style={{ width: "100%" }}
                                          data-bs-toggle="offcanvas"
                                          data-bs-target="#offcanvasExample"
                                          onClick={toggleOffCanvas}
                                          aria-controls="offcanvasExample"
                                        >
                                          <i className="bi bi-journal-medical pe-2"></i>{" "}
                                          Student Login
                                        </p>
                                      </Link>
                                    </li>
                                    <li className="list-group-item d-flex">
                                      <Link
                                        className="dropdown-item"
                                        to="/retrive-student-login-form"
                                      >
                                        <p
                                          className="p-0"
                                          style={{ width: "100%" }}
                                          data-bs-toggle="offcanvas"
                                          data-bs-target="#offcanvasExample"
                                          onClick={toggleOffCanvas}
                                          aria-controls="offcanvasExample"
                                        >
                                          <i className="bi bi-box-arrow-down pe-2"></i>{" "}
                                          Retrieve Student Login
                                        </p>
                                      </Link>
                                    </li>
                                    <li className="list-group-item d-flex">
                                      <Link
                                        className="dropdown-item"
                                        to="/batch-login-form"
                                      >
                                        <p
                                          className="p-0"
                                          style={{ width: "100%" }}
                                          data-bs-toggle="offcanvas"
                                          data-bs-target="#offcanvasExample"
                                          onClick={toggleOffCanvas}
                                          aria-controls="offcanvasExample"
                                        >
                                          <i className="bi bi-journal-medical pe-2"></i>{" "}
                                          Batch Login
                                        </p>
                                      </Link>
                                    </li>
                                    <li className="list-group-item d-flex">
                                      <Link
                                        className="dropdown-item"
                                        to="/retrive-batch-login-form"
                                      >
                                        <p
                                          className="p-0"
                                          style={{ width: "100%" }}
                                          data-bs-toggle="offcanvas"
                                          data-bs-target="#offcanvasExample"
                                          onClick={toggleOffCanvas}
                                          aria-controls="offcanvasExample"
                                        >
                                          <i className="bi bi-box-arrow-down pe-2"></i>{" "}
                                          Retrieve Batch Login
                                        </p>
                                      </Link>
                                    </li>
                                    <li className="list-group-item d-flex">
                                      <Link
                                        className="dropdown-item"
                                        to="/tutorins-form"
                                      >
                                        <p
                                          className="p-0"
                                          style={{ width: "100%" }}
                                          data-bs-toggle="offcanvas"
                                          data-bs-target="#offcanvasExample"
                                          onClick={toggleOffCanvas}
                                          aria-controls="offcanvasExample"
                                        >
                                          <i className="bi bi-journal-medical pe-2"></i>{" "}
                                          Tutor Login
                                        </p>
                                      </Link>
                                    </li>
                                    <li className="list-group-item d-flex">
                                      <Link
                                        className="dropdown-item"
                                        to="/tutorins-retrive-form"
                                      >
                                        <p
                                          className="p-0"
                                          style={{ width: "100%" }}
                                          data-bs-toggle="offcanvas"
                                          data-bs-target="#offcanvasExample"
                                          onClick={toggleOffCanvas}
                                          aria-controls="offcanvasExample"
                                        >
                                          <i className="bi bi-box-arrow-down pe-2"></i>{" "}
                                          Retrieve Tutor Login
                                        </p>
                                      </Link>
                                    </li>
                                    <li className="list-group-item d-flex">
                                      <Link
                                        className="dropdown-item"
                                        to="/all-student-records"
                                      >
                                        <p
                                          className="p-0"
                                          style={{ width: "100%" }}
                                          data-bs-toggle="offcanvas"
                                          data-bs-target="#offcanvasExample"
                                          onClick={toggleOffCanvas}
                                          aria-controls="offcanvasExample"
                                        >
                                          <i className="bi bi-box-arrow-down pe-2"></i>{" "}
                                          ALL RECORDS
                                        </p>
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>

                        {/* Feedback School / Degree */}
                        <li className="mb-[0.1rem]">
                          <div className="accordion" id="accordionExample">
                            <div className="accordion-item border-0">
                              <h2
                                className="accordion-header"
                                id="headingThree"
                              >
                                <button
                                  className="accordion-button text-sm px-2 py-2 hover:bg-white bg-white focus:bg-white no-outline"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target="#collapseThree"
                                  aria-expanded="false"
                                  aria-controls="collapseThree"
                                >
                                  <i class="bi bi-person-fill-down pe-1"></i>{" "}
                                  Feedback School / Degree
                                </button>
                              </h2>
                              <div
                                id="collapseThree"
                                className="accordion-collapse collapse"
                                aria-labelledby="headingThree"
                                data-bs-parent="#accordionExample"
                              >
                                <div className="accordion-body text-black p-0">
                                  <ul className="list-group list-group-flush text-sm">
                                    <li className="list-group-item d-flex">
                                      <Link
                                        className="dropdown-item"
                                        to="/followup-form"
                                      >
                                        <p
                                          className="p-0"
                                          style={{ width: "100%" }}
                                          data-bs-toggle="offcanvas"
                                          data-bs-target="#offcanvasExample"
                                          onClick={toggleOffCanvas}
                                          aria-controls="offcanvasExample"
                                        >
                                          <i className="bi bi-journal-medical pe-2"></i>{" "}
                                          Follow-up Form
                                        </p>
                                      </Link>
                                    </li>
                                    <li className="list-group-item d-flex">
                                      <Link
                                        className="dropdown-item"
                                        to="/retrive-followups"
                                      >
                                        <p
                                          className="p-0"
                                          style={{ width: "100%" }}
                                          data-bs-toggle="offcanvas"
                                          data-bs-target="#offcanvasExample"
                                          onClick={toggleOffCanvas}
                                          aria-controls="offcanvasExample"
                                        >
                                          <i className="bi bi-box-arrow-down pe-2"></i>{" "}
                                          Retrieve Follow-up Form
                                        </p>
                                      </Link>
                                    </li>
                                    <li className="list-group-item d-flex">
                                      <Link
                                        className="dropdown-item"
                                        to="/payment-form"
                                      >
                                        <p
                                          className="p-0"
                                          style={{ width: "100%" }}
                                          data-bs-toggle="offcanvas"
                                          data-bs-target="#offcanvasExample"
                                          onClick={toggleOffCanvas}
                                          aria-controls="offcanvasExample"
                                        >
                                          <i className="bi bi-journal-medical pe-2"></i>{" "}
                                          Payment Form
                                        </p>
                                      </Link>
                                    </li>
                                    <li className="list-group-item d-flex">
                                      <Link
                                        className="dropdown-item"
                                        to="/retrive-payment-form"
                                      >
                                        <p
                                          className="p-0"
                                          style={{ width: "100%" }}
                                          data-bs-toggle="offcanvas"
                                          data-bs-target="#offcanvasExample"
                                          onClick={toggleOffCanvas}
                                          aria-controls="offcanvasExample"
                                        >
                                          <i className="bi bi-box-arrow-down pe-2"></i>{" "}
                                          Retrieve Payment Form
                                        </p>
                                      </Link>
                                    </li>
                                    <li className="list-group-item d-flex">
                                      <Link
                                        className="dropdown-item"
                                        to="followups-all-forms"
                                      >
                                        <p
                                          className="p-0"
                                          style={{ width: "100%" }}
                                          data-bs-toggle="offcanvas"
                                          data-bs-target="#offcanvasExample"
                                          onClick={toggleOffCanvas}
                                          aria-controls="offcanvasExample"
                                        >
                                          <i className="bi bi-box-arrow-down pe-2"></i>{" "}
                                          All School/Deg Records
                                        </p>
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>

                        {/* Feedback Engineering */}
                        <li className="mb-[0.1rem]">
                          <div className="accordion" id="accordionExample">
                            <div className="accordion-item border-0">
                              <h2 className="accordion-header" id="headingFour">
                                <button
                                  className="accordion-button text-sm px-2 py-2 hover:bg-white bg-white focus:bg-white no-outline"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target="#collapseFour"
                                  aria-expanded="false"
                                  aria-controls="collapseFour"
                                >
                                  <i class="bi bi-person-fill-down pe-1"></i>{" "}
                                  Feedback Engineering
                                </button>
                              </h2>
                              <div
                                id="collapseFour"
                                className="accordion-collapse collapse"
                                aria-labelledby="headingFour"
                                data-bs-parent="#accordionExample"
                              >
                                <div className="accordion-body text-black p-0">
                                  <ul className="list-group list-group-flush text-sm">
                                    <li className="list-group-item d-flex">
                                      <Link
                                        className="dropdown-item"
                                        to="/follups-ENG"
                                      >
                                        <p
                                          className="p-0"
                                          style={{ width: "100%" }}
                                          data-bs-toggle="offcanvas"
                                          data-bs-target="#offcanvasExample"
                                          onClick={toggleOffCanvas}
                                          aria-controls="offcanvasExample"
                                        >
                                          <i className="bi bi-journal-medical pe-2"></i>{" "}
                                          Follow-up Form (ENG)
                                        </p>
                                      </Link>
                                    </li>
                                    <li className="list-group-item d-flex">
                                      <Link
                                        className="dropdown-item"
                                        to="/retrive-follups-ENG"
                                      >
                                        <p
                                          className="p-0"
                                          style={{ width: "100%" }}
                                          data-bs-toggle="offcanvas"
                                          data-bs-target="#offcanvasExample"
                                          onClick={toggleOffCanvas}
                                          aria-controls="offcanvasExample"
                                        >
                                          <i className="bi bi-box-arrow-down pe-2"></i>{" "}
                                          Retrieve Follow-up Form (ENG)
                                        </p>
                                      </Link>
                                    </li>
                                    <li className="list-group-item d-flex">
                                      <Link
                                        className="dropdown-item"
                                        to="/payment-ENG"
                                      >
                                        <p
                                          className="p-0"
                                          style={{ width: "100%" }}
                                          data-bs-toggle="offcanvas"
                                          data-bs-target="#offcanvasExample"
                                          onClick={toggleOffCanvas}
                                          aria-controls="offcanvasExample"
                                        >
                                          <i className="bi bi-journal-medical pe-2"></i>{" "}
                                          Payment (ENG)
                                        </p>
                                      </Link>
                                    </li>
                                    <li className="list-group-item d-flex">
                                      <Link
                                        className="dropdown-item"
                                        to="/retrive-payment-ENG"
                                      >
                                        <p
                                          className="p-0"
                                          style={{ width: "100%" }}
                                          data-bs-toggle="offcanvas"
                                          data-bs-target="#offcanvasExample"
                                          onClick={toggleOffCanvas}
                                          aria-controls="offcanvasExample"
                                        >
                                          <i className="bi bi-box-arrow-down pe-2"></i>{" "}
                                          Retrieve Payment (ENG)
                                        </p>
                                      </Link>
                                    </li>
                                    <li className="list-group-item d-flex">
                                      <Link
                                        className="dropdown-item"
                                        to="/All-eng-records"
                                      >
                                        <p
                                          className="p-0"
                                          style={{ width: "100%" }}
                                          data-bs-toggle="offcanvas"
                                          data-bs-target="#offcanvasExample"
                                          onClick={toggleOffCanvas}
                                          aria-controls="offcanvasExample"
                                        >
                                          <i className="bi bi-box-arrow-down pe-2"></i>{" "}
                                          All Engineering Records
                                        </p>
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        <section className={`section-content ${isOpen ? "resized  px-4" : ""}`}>
          <Routes>
            <Route
              path="/"
              element={<Loginform onHandleLogin={onHandleLogin} />}
            />

            <Route
              path="/student-login-form"
              element={isLoggedIn ? <Studentloginform /> : <Navigate to="/" />}
            />
            <Route
              path="/retrieve-student"
              element={
                isLoggedIn ? <RetrieveStudentForm /> : <Navigate to="/" />
              }

            />
            <Route
              path="/batch-login"
              element={isLoggedIn ? <BatchLoginForm /> : <Navigate to="/" />}
            />
            <Route
              path="/all-student-records"
              element={isLoggedIn ? <StudentsAllForm /> : <Navigate to="/" />}
            />
            <Route
              path="/retrieve-batch"
              element={
                isLoggedIn ? <RetrieveBatchLoginForm /> : <Navigate to="/" />
              }
            />
            <Route
              path="/tutor-login-form"
              element={isLoggedIn ? <Tutorinsform /> : <Navigate to="/" />}
            />
            <Route
              path="/All-eng-records"
              element={isLoggedIn ? <FollowupsAllFormeng /> : <Navigate to="/" />}
            />
            <Route
              path="/retrieve-tutor-form"
              element={isLoggedIn ? <TutorRetrieveForm /> : <Navigate to="/" />}
            />
            <Route
              path="/institution-form"
              element={isLoggedIn ? <InstitutionForm /> : <Navigate to="/" />}
            />
            <Route
              path="/retrieve-form"
              element={isLoggedIn ? <RetrieveForm /> : <Navigate to="/" />}
            />
            <Route
              path="/update-server-form"
              element={isLoggedIn ? <UpdateServerForm /> : <Navigate to="/" />}
            />
            <Route
              path="/retrieve-server-form"
              element={
                isLoggedIn ? <RetrieveServerForm /> : <Navigate to="/" />
              }
            />
            <Route
              path="/retrieve-all-forms"
              element={
                isLoggedIn ? <RetrieveAllForm /> : <Navigate to="/" />
              }
            />
            <Route
              path="/student-login-form"
              element={isLoggedIn ? <Studentloginform /> : <Navigate to="/" />}
            />
            <Route
              path="/retrive-student-login-form"
              element={
                isLoggedIn ? <Retrivestudentloginform /> : <Navigate to="/" />
              }
            />
            <Route
              path="/batch-login-form"
              element={isLoggedIn ? <BatchLoginForm /> : <Navigate to="/" />}
            />
            <Route
              path="/retrive-batch-login-form"
              element={
                isLoggedIn ? <RetrieveBatchLoginForm /> : <Navigate to="/" />
              }
            />
            <Route
              path="/tutorins-form"
              element={isLoggedIn ? <Tutorinsform /> : <Navigate to="/" />}
            />
            <Route
              path="/tutorins-retrive-form"
              element={isLoggedIn ? <TutorRetrieveForm /> : <Navigate to="/" />}
            />
           
            
            <Route
              path="/followups-all-forms"
              element={
                isLoggedIn ? <FollowupsAllForm /> : <Navigate to="/" />
              }
            />
            
            <Route
              path="/retrive-followups"
              element={isLoggedIn ? <RetrieveFollowups /> : <Navigate to="/" />}
            />
            <Route
              path="/followup-form"
              element={isLoggedIn ? <FollowupForm /> : <Navigate to="/" />}
            />
            <Route
              path="/payment-form"
              element={isLoggedIn ? <PaymentForm /> : <Navigate to="/" />}
            />

            
            
            <Route
              path="/retrive-follups-ENG"
              element={
                isLoggedIn ? <RetrieveFollowupsEng /> : <Navigate to="/" />
              }
            />

           
            <Route
              path="/retrive-payment-ENG"
              element={
                isLoggedIn ? <RetrievePaymentsENG /> : <Navigate to="/" />
              }
            />
            <Route
              path="/retrive-payment-form"
              element={isLoggedIn ? <RetrievePayments /> : <Navigate to="/" />}
            />

            <Route
              path="/follups-ENG"
              element={isLoggedIn ? <FollowupFormENG /> : <Navigate to="/" />}
            />

            <Route
              path="/payment-ENG"
              element={isLoggedIn ? <PaymentFormENG /> : <Navigate to="/" />}
            />
            <Route
              path="/retrieve-business-opportunity"
              element={
                isLoggedIn ? (
                  <RetrieveBusinessOpportunity />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/business-opportunity-form"
              element={
                isLoggedIn ? <BusinessOpportunityForm /> : <Navigate to="/" />
              }
            />
            <Route
              path="/home"
              element={isLoggedIn ? <Home /> : <Navigate to="/" />}
            />
            {/* <Route
              path="/pages"
              element={isLoggedIn ? <Pages /> : <Navigate to="/" />}
            /> */}
            <Route
              path="/contact"
              element={isLoggedIn ? <Contact /> : <Navigate to="/" />}
            />
          </Routes>
        </section>
      </div>
    </Router>
  );
}

export default App;
