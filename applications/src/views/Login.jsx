import React, { useState } from "react";
import PageNav from "../components/PageNav";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/users/signin`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email, password: password }),
          credentials: "include",
        }
      );
      if (response.ok) {
        const userData = await response.json();

        // Save user ID in localStorage
        localStorage.setItem("userId", userData.data.userId);

        navigate("/subdomainfinder");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "login failed");
      }
    } catch (error) {
      toast.error("Login error:", error);
    }
  };

  return (
    <div className={styles.container}>
      <PageNav />
      <div className={styles.loginForm}>
        <form className={styles.form} onSubmit={handleLogin}>
          <h2 className={styles.title}>Login</h2>
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
          <button type="submit" className={styles.button}>
            Login
          </button>
          <div className={styles.forgetPassword}>
            <a href="#" className={styles.forgetPasswordLink}>
              Forget Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
