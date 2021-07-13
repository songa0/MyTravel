import React from "react";
import styles from "./diary_list_item.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const TravelListItem = ({ travelInfo }) => {
  const { title, like } = travelInfo;
  return (
    <>
      <span className={styles.title}>{title}</span>
      <span className={styles.like}>
        <FontAwesomeIcon icon={faHeart} size="xs" />
        <span className={styles.number}>{like}</span>
      </span>
    </>
  );
};

export default TravelListItem;
