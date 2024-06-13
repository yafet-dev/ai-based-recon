import React, { useState } from "react";
import styles from "./Subdomain.module.css";
import PageNav from "./../components/PageNav";
import Subdomains from "../components/Subdomains";
import Loading from "../components/Loading";

const Subdomain = () => {
  const [domain, setDomain] = useState("");
  const [subdomains, setSubdomains] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSubdomains = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8000/api/subdomainfinder/find-subdomains?domain=${domain}`
      );
      const data = await response.json();
      setSubdomains(
        data.subdomains.map((subdomain) => ({
          subdomain: subdomain.subdomain,
          statusCode: subdomain.statusCode,
          takeoverStatus: subdomain.takeoverStatus,
        }))
      );
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching subdomains:", error);
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchSubdomains();
  };

  return (
    <div className={styles.container}>
      <PageNav />
      <div className={styles.mainContent}>
        <div className={styles.detailsContainer}>
          <h2 className={styles.domainDetails}>Domain Details for {domain}</h2>
          <div className={styles.inputContainer}>
            <input
              type="text"
              placeholder="Domain name"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className={styles.input}
            />
            <button onClick={handleSubmit} className={styles.button}>
              Search
            </button>
          </div>
        </div>
        {isLoading ? <Loading /> : <Subdomains subdomains={subdomains} />}
      </div>
    </div>
  );
};

export default Subdomain;
