import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import Subdomain from "./views/Subdomain";
import XssHunter from "./views/XssHunter";
import SqliHunter from "./views/SqliHunter.";
import ProfilePage from "./views/ProfilePage";
import HomePage from "./views/HomePage";
import VerificationMessage from "./views/VerificationMessage";
// import PortScanner from "./views/PortScanner";
// import XssHunter from "./views/XssHunter";
// import SqliHunter from "./views/SqliHunter.";
// import HomePage from "./views/HomePage";
// import XssHunter from "./views/XssHunter";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate replace to="subdomainfinder" />} />
          <Route path="subdomainfinder" element={<Subdomain />} />
          <Route path="signin" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "39px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </>
  );
}

export default App;
