import React from "react";
import styles from "./title.module.css";

const Title = ({ name }) => {
  return <h2 className={styles.title}>{name}</h2>;
};

export default Title;
