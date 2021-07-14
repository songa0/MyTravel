import React from "react";
import styles from "./nav.module.css";

const Nav = ({ clickEvent }) => {
  return (
    <div className={styles.header}>
      <ul className={styles.list}>
        <li>Home</li>
        <li onClick={clickEvent}>Logout</li>
      </ul>
    </div>
  );
};

export default Nav;
