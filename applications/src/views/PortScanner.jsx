import React, { useState } from "react";
import PageNav from "./../components/PageNav";
import SinglePort from "./../components/SinglePort";
import styles from "./PortScanner.module.css";
import axios from "axios";

const PortScanner = () => {
  const [domain, setDomain] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [ip, setIp] = useState("");

  const handleScan = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResults([]);
    setIp("");

    try {
      const response = await axios.get(
        `http://localhost:8000/api/portScanner/scan-ports?domain=${encodeURIComponent(domain)}`
      );
      setResults(response.data.results);
      setIp(response.data.ip);
    } catch (error) {
      console.error("Error scanning ports:", error);
    } finally {
      setIsLoading(false);
    }
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
          <h3 className={styles.resultTitle}>Scan Results: {ip}</h3>
          {results.map((result, index) => (
            <SinglePort
              key={index}
              port={result.port}
              status={result.status}
              type={result.name}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PortScanner;
