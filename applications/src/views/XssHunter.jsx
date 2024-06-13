import React, { useState } from "react";
import PageNav from "./../components/PageNav";
import SingleXssResult from "./../components/SingleXssResult";
import styles from "./XssHunter.module.css";
import axios from "axios";

const XssHunter = () => {
  const [domain, setDomain] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleScan = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResults([]);

    try {
      const response = await axios.get(
        `http://localhost:8000/api/xsshunter/test-xss?url=${encodeURIComponent(domain)}`
      );
      setResults(response.data);
    } catch (error) {
      console.error("Error scanning for XSS vulnerabilities:", error);
    } finally {
      setIsLoading(false);
    }
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
