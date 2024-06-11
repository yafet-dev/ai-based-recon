import React from "react";
import styles from "./SinglePort.module.css";

const SinglePort = ({ port, status, type }) => {
  return (
    <div className={styles.port}>
      <div className={styles.name}>Port {port}</div>
      <div className={styles.status}>Status: {status}</div>
      <div className={styles.type}>Type: {type}</div>
    </div>
  );
};

export default SinglePort;
