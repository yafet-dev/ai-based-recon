import React, { useState } from "react";
import PageNav from "./../components/PageNav";
import styles from "./SignUp.module.css";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/users/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
          }),
          credentials: "include",
        }
      );
      if (response.ok) {
        navigate("/verficationmethod");
      } else {
        const errorData = await response.json();
        toast.error(error.message || "login failed");
      }
    } catch (error) {
      toast.error("Login error:", error);
    }
  };
  return (
    <div className={styles.container}>
      <PageNav />
      <div className={styles.signUpForm}>
        <form className={styles.form} onSubmit={handleSignUp}>
          <h2 className={styles.title}>Sign Up</h2>
          <div className={styles.inputGroup}>
            <input
              type="text"
              id="firstName"
              className={styles.input}
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="text"
              id="lastName"
              className={styles.input}
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="email"
              id="email"
              className={styles.input}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="password"
              id="password"
              className={styles.input}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="password"
              id="confirmPassword"
              className={styles.input}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.button}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
