import React from "react";
import styles from "./PageNav.module.css";

const PageNav = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        🌐 Hunter <span className={styles.lookup}>Tool</span>
      </div>
      <nav className={styles.nav}>
        <a href="#findsubdomains">Blind XSS</a>
        <a href="#findsubdomains">Subdomain Finder</a>
        <a href="#portscanner">Port Scanner</a>
        <a href="#XssHunter">XSSHunter</a>
        <a href="#signup">Sign up</a>
        <a href="#login" className={styles.login}>
          Login
        </a>
        <div className={styles.dropdown}></div>
      </nav>
    </header>
  );
};

export default PageNav;
