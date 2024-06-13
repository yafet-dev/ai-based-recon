import React from "react";
import styles from "./SingleSubdomain.module.css";

const SingleSubdomain = ({ name, statusCode, takeoverStatus }) => {
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
      <div className={styles.status}>Status Code: {statusCode}</div>
      <div className={styles.takeoverStatus}>[{takeoverStatus}]</div>
    </div>
  );
};

export default SingleSubdomain;
