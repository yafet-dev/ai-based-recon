import React, { useState } from "react";
import PageNav from "./../components/PageNav";
import styles from "./ProfilePage.module.css";

const ProfilePage = () => {
  const [name, setName] = useState("Yafet Zerihun");
  const [email, setEmail] = useState("zerihunyafet80@gmail.com");
  return (
    <>
      <PageNav />
      <div className={styles.container}>
        <div className={styles.profileContainer}>
          <div className={styles.photoContainer}>
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className={styles.photo}
            />
          </div>
          <div className={styles.detailsContainer}>
            <form className={styles.form}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={styles.input}
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                />
              </div>
              <button className={styles.button}>Update</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
