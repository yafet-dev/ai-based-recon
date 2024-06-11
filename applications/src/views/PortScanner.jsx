import React, { useState } from "react";
import PageNav from "./../components/PageNav";
import SinglePort from "./../components/SinglePort";
import styles from "./PortScanner.module.css";

const PortScanner = () => {
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
        { port: 80, status: "open", type: "tcp" },
        { port: 443, status: "open", type: "tcp" },
        { port: 21, status: "closed", type: "tcp" },
      ]);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <PageNav />
      <div className={styles.scannerForm}>
        <form className={styles.form} onSubmit={handleScan}>
          <h2 className={styles.title}>Port Scanner</h2>
          <div className={styles.inputGroup}>
            <input
              type="text"
              className={styles.input}
              placeholder="Enter domain or IP"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.button}>
            {isLoading ? "Scanning..." : "Scan Ports"}
          </button>
        </form>
      </div>
      {results.length > 0 && (
        <div className={styles.resultsBox}>
          <h3 className={styles.resultTitle}>Scan Results:</h3>
          {results.map((result, index) => (
            <SinglePort
              key={index}
              port={result.port}
              status={result.status}
              type={result.type}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PortScanner;
