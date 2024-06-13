import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import Subdomain from "./views/Subdomain";
import XssHunter from "./views/XssHunter";
import VerificationMessage from "./views/VerificationMessage";
import BlindXssResults from "./views/BlindXssResults";
import PortScanner from "./views/PortScanner";
import { Toaster } from "react-hot-toast";
import Verify from "./views/Verify";
import HomePage from "./views/HomePage";
import PrivateRoute from "./components/PrivateRoute"; // Import the PrivateRoute component

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate replace to="homepage" />} />
          <Route
            path="subdomainfinder"
            element={
              <PrivateRoute>
                <Subdomain />
              </PrivateRoute>
            }
          />
          <Route path="signin" element={<Login />} />
          <Route path="homepage" element={<HomePage />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="verify/:token" element={<Verify />} />
          <Route path="verficationmethod" element={<VerificationMessage />} />
          <Route
            path="xsshunter"
            element={
              <PrivateRoute>
                <XssHunter />
              </PrivateRoute>
            }
          />
          <Route
            path="portscanner"
            element={
              <PrivateRoute>
                <PortScanner />
              </PrivateRoute>
            }
          />
          <Route
            path="blindxsshunter"
            element={
              <PrivateRoute>
                <BlindXssResults />
              </PrivateRoute>
            }
          />
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
