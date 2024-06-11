import React from "react";
import styles from "./SingleSqliResult.module.css";

const SingleSqliResult = ({ endpoint, payload, status }) => {
  return (
    <div className={styles.result}>
      <div>
        <a
          href={endpoint}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.endpoint}
        >
          {endpoint}
        </a>
        <div className={styles.payload}>Payload: {payload}</div>
      </div>
      <div className={styles.status}>
        <span className={styles.vulnerable}>{status}</span>
      </div>
    </div>
  );
};

export default SingleSqliResult;
