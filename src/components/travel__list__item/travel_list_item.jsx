import React from "react";

import styles from "./travel_list_item.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const TravelDateItem = ({ day, date }) => {
  return (
    <div className={styles.date__item}>
      <span className={styles.day}>{day}일차</span>
      <span className={styles.date}>{date}</span>
      <span className={styles.icon}>
        <FontAwesomeIcon icon={faPencilAlt} />
      </span>
    </div>
  );
};

export default TravelDateItem;
