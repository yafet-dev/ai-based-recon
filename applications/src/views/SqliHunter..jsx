import React, { useState } from "react";
import PageNav from "./../components/PageNav";
import SingleSqliResult from "./../components/SingleSqliResult";
import styles from "./SqliHunter.module.css";

const SqliHunter = () => {
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
          endpoint: "http://aait.edu.et?search=' OR '1'='1",
          payload: "' OR '1'='1",
          status: "vulnerable",
        },
        {
          endpoint: "http://aait.edu.et?search=' UNION SELECT NULL,NULL",
          payload: "' UNION SELECT NULL,NULL",
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
          <h2 className={styles.title}>SQLi Hunter</h2>
          <div className={styles.inputGroup}>
            <input
              type="text"
              className={styles.input}
              placeholder="Enter domain"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.button}>
            {isLoading ? "Scanning..." : "Scan for SQLi"}
          </button>
        </form>
      </div>
      {results.length > 0 && (
        <div className={styles.resultsBox}>
          <h3 className={styles.resultTitle}>Vulnerabilities Found:</h3>
          {results.map((result, index) => (
            <SingleSqliResult
              key={index}
              endpoint={result.endpoint}
              payload={result.payload}
              status={result.status}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SqliHunter;
