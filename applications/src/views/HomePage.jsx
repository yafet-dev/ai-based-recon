import React from "react";
import PageNav from "./../components/PageNav";
import styles from "./HomePage.module.css";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <PageNav />
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>Advanced Pentesting Tools</h1>
          <p className={styles.subtitle}>
            Your ultimate tool for discovering vulnerabilities and securing your
            web applications. With Hunter Tool, you can easily identify
            potential security threats, scan for open ports, find subdomains,
            and test for SQLi and XSS vulnerabilities. Empower your security
            team with the best tools to keep your applications safe and secure.
          </p>
          <Link to="/subdomainfinder" className={styles.button}>
            Get Started
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomePage;
