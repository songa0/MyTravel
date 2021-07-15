import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faStar,
  faMapMarkerAlt,
  faHashtag,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./diary_add.module.css";

const DiaryAdd = ({ closePopup }) => {
  return (
    <>
      <section className={styles.section}>
        <div className={styles.header}>
          <FontAwesomeIcon
            icon={faTimes}
            className={styles.close}
            onClick={closePopup}
          />
        </div>
        <form className={styles.form}>
          <div className={styles.title}>
            <FontAwesomeIcon icon={faStar} className={styles.icon} />
            Title
          </div>
          <input type="text" className={styles.input} />
          <div>
            <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.icon} />
            Location
          </div>
          <input type="text" className={styles.input} />
          <div>
            <FontAwesomeIcon icon={faCalendar} className={styles.icon} />
            Date
          </div>
          <div className={styles.dates}>
            <input
              type="date"
              className={[styles.input, styles.date].join(" ")}
              placeholder="YYYY-MM-DD"
            />
            &nbsp;&nbsp; ~ &nbsp;&nbsp;
            <input
              type="date"
              className={[styles.input, styles.date].join(" ")}
              placeholder="YYYY-MM-DD"
            />
          </div>
          <div>
            <FontAwesomeIcon icon={faHashtag} className={styles.icon} />
            Keyword
          </div>
          <input type="text" className={styles.input} />
          <div>
            <button>Submit</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default DiaryAdd;
