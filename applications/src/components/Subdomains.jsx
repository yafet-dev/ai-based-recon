import React from "react";
import SingleSubdomain from "./SingleSubdomain";
import styles from "./Subdomains.module.css";
import { useState } from "react";

const Subdomains = ({ subdomains }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const subdomainsPerPage = 10;
  const startIndex = currentPage * subdomainsPerPage;
  const endIndex = startIndex + subdomainsPerPage;
  const currentSubdomains = subdomains.slice(startIndex, endIndex);

  const totalPages = Math.ceil(subdomains.length / subdomainsPerPage);

  const nextPage = () => {
    if (endIndex < subdomains.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (subdomains.length === 0) {
    return null; // Return null if there are no subdomains
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        Subdomains matching the domain name: {subdomains.length}
      </h2>
      {currentSubdomains.map((subdomain) => (
        <SingleSubdomain
          key={subdomain.subdomain}
          name={subdomain.subdomain}
          statusCode={subdomain.statusCode}
          takeoverStatus={subdomain.takeoverStatus}
        />
      ))}
      {subdomains.length > subdomainsPerPage && (
        <div className={styles.pagination}>
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className={styles.button}
          >
            Back
          </button>
          <span className={styles.pageNumber}>
            Page {currentPage + 1} of {totalPages}
          </span>
          <button
            onClick={nextPage}
            disabled={endIndex >= subdomains.length}
            className={styles.button}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Subdomains;
