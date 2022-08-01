import React from "react";

import styles from "./nav.module.css";

const Nav = ({ clickLogout }) => {

  return (
    <div className={styles.header}>
      <ul className={styles.list}>
        {/* <li onClick={goToHome}>Home</li> */}
        <li onClick={clickLogout}>Logout</li>
      </ul>
    </div>
  );
};

export default Nav;
