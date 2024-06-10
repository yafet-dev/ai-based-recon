import React, { useState, useEffect } from "react";
import SingleSubdomain from "./SingleSubdomain";
import Loading from "./Loading";
import styles from "./Subdomains.module.css";

const Subdomains = () => {
  const [subdomains, setSubdomains] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setSubdomains([
        { name: "ns1.aait.edu.et", status: "404" },
        { name: "ns2.aait.edu.et", status: "200" },
        { name: "www.aait.edu.et", status: "200" },
        { name: "isims.aait.edu.et", status: "404" },
        { name: "portal.aait.edu.et", status: "200" },
        { name: "sub1.aait.edu.et", status: "200" },
        { name: "sub2.aait.edu.et", status: "404" },
        { name: "sub3.aait.edu.et", status: "200" },
        { name: "sub4.aait.edu.et", status: "404" },
        { name: "sub5.aait.edu.et", status: "200" },
        { name: "sub6.aait.edu.et", status: "200" },
        { name: "sub7.aait.edu.et", status: "404" },
        { name: "sub8.aait.edu.et", status: "200" },
        { name: "sub9.aait.edu.et", status: "404" },
        { name: "sub10.aait.edu.et", status: "200" },
        { name: "sub11.aait.edu.et", status: "200" },
        { name: "sub12.aait.edu.et", status: "404" },
        { name: "sub13.aait.edu.et", status: "200" },
        { name: "sub14.aait.edu.et", status: "404" },
        { name: "sub15.aait.edu.et", status: "200" },
        { name: "sub16.aait.edu.et", status: "200" },
        { name: "sub17.aait.edu.et", status: "404" },
        { name: "sub18.aait.edu.et", status: "200" },
        { name: "sub19.aait.edu.et", status: "404" },
        { name: "sub20.aait.edu.et", status: "200" },
        { name: "sub21.aait.edu.et", status: "200" },
        { name: "sub22.aait.edu.et", status: "404" },
        { name: "sub23.aait.edu.et", status: "200" },
        { name: "sub24.aait.edu.et", status: "404" },
        { name: "sub25.aait.edu.et", status: "200" },
        { name: "sub26.aait.edu.et", status: "200" },
        { name: "sub27.aait.edu.et", status: "404" },
        { name: "sub28.aait.edu.et", status: "200" },
        { name: "sub29.aait.edu.et", status: "404" },
        { name: "sub30.aait.edu.et", status: "200" },
      ]);
      setIsLoading(false);
    }, 2000); // Simulate 2 seconds delay for API call
  }, []);

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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        Subdomains matching the domain name: {subdomains.length}
      </h2>
      {currentSubdomains.map((subdomain) => (
        <SingleSubdomain
          key={subdomain.name}
          name={subdomain.name}
          status={subdomain.status}
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
