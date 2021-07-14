import React from "react";
import styles from "./diary_list_item.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faCalendar,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

const TravelListItem = ({ travelInfo }) => {
  const { title, like, imgUrl, location, startDate, endDate } = travelInfo;
  console.log(travelInfo);
  return (
    <div className={styles.item}>
      <div>
        <img src={imgUrl} className={styles.img} />
      </div>
      <div className={styles.desc}>
        <div>
          <span className={styles.title}>{title}</span>
          <span className={styles.like}>
            <FontAwesomeIcon icon={faHeart} size="xs" />
            <span className={styles.number}>{like}</span>
          </span>
        </div>
        <div className={styles.detail}>
          <FontAwesomeIcon icon={faMapMarkerAlt} size="xs" />
          <span className={styles.desc__text}>{location}</span>
        </div>
        <div className={styles.detail}>
          <FontAwesomeIcon icon={faCalendar} size="xs" />
          <span className={styles.desc__text}>
            {startDate}~{endDate}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TravelListItem;
