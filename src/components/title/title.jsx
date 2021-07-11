import React from "react";
import styles from "./title.module.css";

const Title = ({ name }) => {
  return <div className={styles.title}>{name}</div>;
};

export default Title;
