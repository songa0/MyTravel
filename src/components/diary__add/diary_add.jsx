import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faStar,
  faMapMarkerAlt,
  faHashtag,
  faTimes,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./diary_add.module.css";

const DiaryAdd = ({ closePopup, addDiary, fileUploader }) => {
  const titleRef = useRef();
  const locationRef = useRef();
  const startDtRef = useRef();
  const endDtRef = useRef();
  const keywordRef = useRef();

  const addDiaryData = (event) => {
    event.preventDefault();

    const diary = {
      id: Date.now(),
      title: titleRef.current.value || "",
      keyword: "",
      location: locationRef.current.value || "",
      startDate: startDtRef.current.value || "",
      endDate: endDtRef.current.value || "",
      like: 0,
      travel: "",
    };
    addDiary(diary);
  };

  const onFileChange = (event) => {
    fileUploader.upload(event.target.files[0]);
  };
  return (
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
        <input type="text" className={styles.input} ref={titleRef} />
        <div>
          <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.icon} />
          Location
        </div>
        <input type="text" className={styles.input} ref={locationRef} />
        <div>
          <FontAwesomeIcon icon={faCalendar} className={styles.icon} />
          Date
        </div>
        <div className={styles.dates}>
          <input
            type="date"
            className={[styles.input, styles.date].join(" ")}
            placeholder="YYYY-MM-DD"
            ref={startDtRef}
          />
          &nbsp;&nbsp; ~ &nbsp;&nbsp;
          <input
            type="date"
            className={[styles.input, styles.date].join(" ")}
            placeholder="YYYY-MM-DD"
            ref={endDtRef}
          />
        </div>
        <div>
          <FontAwesomeIcon icon={faHashtag} className={styles.icon} />
          Keyword
        </div>
        <input type="text" className={styles.input} ref={keywordRef} />
        <div>
          <FontAwesomeIcon icon={faCamera} className={styles.icon} />
          Main Photo
        </div>
        <input type="file" className={styles.input} onChange={onFileChange} />
        <div className={styles.button}>
          <button className={styles.submit} onClick={addDiaryData}>
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default DiaryAdd;
