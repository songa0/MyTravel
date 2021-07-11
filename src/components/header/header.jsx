import React from "react";
import Button from "../button/button";
import Title from "../title/title";
import styles from "./header.module.css";

const Header = ({ titleName, buttonName, clickEvent }) => {
  return (
    <div className={styles.header}>
      <Title name={titleName} />
      <Button name={buttonName} clickEvent={clickEvent} />
    </div>
  );
};

export default Header;
