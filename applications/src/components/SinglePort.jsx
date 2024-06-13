import React from "react";
import styles from "./SinglePort.module.css";

const SinglePort = ({ port, status, type }) => {
  return (
    <div className={styles.port}>
      <div className={styles.portInfo}>
        <span className={styles.portNumber}>Port: {port}</span>
        <span className={styles.portType}>{type}</span>
      </div>
      <div
        className={status === "open" ? styles.statusOpen : styles.statusClosed}
      >
        Status: {status}
      </div>
    </div>
  );
};

export default SinglePort;
