import React, { useState } from "react";
import PageNav from "./../components/PageNav";
import SingleXssResult from "./../components/SingleXssResult";
import styles from "./XssHunter.module.css";

const XssHunter = () => {
  const [domain, setDomain] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleScan = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResults([]);

    // Simulate API call
    setTimeout(() => {
      setResults([
        {
          url: "http://aait.edu.et?search=<script>alert('XSS1')</script>",
          payload: "<script>alert('XSS1')</script>",
          status: "vulnerable",
        },
        {
          url: "http://aait.edu.et?search=<img src=x onerror=alert('XSS2')>",
          payload: "<img src=x onerror=alert('XSS2')>",
          status: "vulnerable",
        },
      ]);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <PageNav />
      <div className={styles.scannerForm}>
        <form className={styles.form} onSubmit={handleScan}>
          <h2 className={styles.title}>XSS Hunter</h2>
          <div className={styles.inputGroup}>
            <input
              type="text"
              className={styles.input}
              placeholder="Enter domain with query"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.button}>
            {isLoading ? "Scanning..." : "Scan for XSS"}
          </button>
        </form>
      </div>
      {results.length > 0 && (
        <div className={styles.resultsBox}>
          {results.map((result, index) => (
            <SingleXssResult
              key={index}
              url={result.url}
              payload={result.payload}
              status={result.status}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default XssHunter;
