import React, { memo } from "react";
import styles from "./nav.module.css";
import { useHistory } from "react-router";

const Nav = memo(({ clickLogout }) => {
  const history = useHistory();

  const goToHome = () => {
    history.push({
      pathname: "/diary",
    });
  };
  return (
    <div className={styles.header}>
      <ul className={styles.list}>
        <li onClick={goToHome}>Home</li>
        <li onClick={clickLogout}>Logout</li>
      </ul>
    </div>
  );
});

export default Nav;
