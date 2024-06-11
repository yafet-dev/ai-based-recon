import React from "react";
import styles from "./Subdomain.module.css";
import PageNav from "./../components/PageNav";
import Subdomains from "../components/Subdomains";
const Subdomain = () => {
  return (
    <div className={styles.container}>
      <PageNav />
      <div className={styles.mainContent}>
        <div className={styles.detailsContainer}>
          <h2 className={styles.domainDetails}>aait.edu.et domain details</h2>
          <div className={styles.inputContainer}>
            <input
              type="text"
              placeholder="Domain name"
              className={styles.input}
            />
            <button className={styles.button}>Search</button>
          </div>
        </div>
        <Subdomains />
      </div>
    </div>
  );
};s

export default Subdomain;
