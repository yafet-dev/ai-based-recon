import React from "react";
import styles from "./SingleXssResult.module.css";

const SingleXssResult = ({ url, payload, status }) => {
  return (
    <div className={styles.result}>
      <div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.url}
        >
          {url}
        </a>
        <div className={styles.payload}>Payload: {payload}</div>
      </div>
      <div className={styles.status}>
        <span className={styles.vulnerable}>{status}</span>
      </div>
    </div>
  );
};

export default SingleXssResult;
