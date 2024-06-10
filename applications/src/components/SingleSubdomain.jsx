import React from "react";
import styles from "./SingleSubdomain.module.css";

const SingleSubdomain = ({ name, status }) => {
  return (
    <div className={styles.subdomain}>
      <a
        href={`http://${name}`}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.name}
      >
        {name}
      </a>
      <div className={styles.status}>Status: {status}</div>
    </div>
  );
};

export default SingleSubdomain;
