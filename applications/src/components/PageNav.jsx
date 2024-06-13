import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./PageNav.module.css";

const PageNav = () => {
  const isLoggedIn = localStorage.getItem("userId") !== null;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/signin");
  };

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        🌐 Hunter <span className={styles.lookup}>Tool</span>
      </Link>
      <nav className={styles.nav}>
        <Link to="/blindxsshunter">Blind XSS</Link>
        <Link to="/subdomainfinder">Subdomain Finder</Link>
        <Link to="/portscanner">Port Scanner</Link>
        <Link to="/xsshunter">XSS Hunter</Link>
        {!isLoggedIn && <Link to="/signup">Sign Up</Link>}
        {!isLoggedIn && (
          <Link to="/signin" className={styles.login}>
            Login
          </Link>
        )}
        {isLoggedIn && (
          <button onClick={handleLogout} className={styles.login}>
            Logout
          </button>
        )}
      </nav>
    </header>
  );
};

export default PageNav;
