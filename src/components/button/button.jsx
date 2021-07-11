import React from "react";
import styles from "./button.module.css";
const Button = ({ name, clickEvent }) => {
  return (
    <button className={styles.button} onClick={clickEvent}>
      {name}
    </button>
  );
};

export default Button;
