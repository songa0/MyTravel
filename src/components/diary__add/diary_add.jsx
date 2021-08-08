import React, { memo, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faStar,
  faMapMarkerAlt,
  faHashtag,
  faTimes,
  faCamera,
  faEye,
  faAssistiveListeningSystems,
  faHandSpock,
  faTeethOpen,
  faAirFreshener,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./diary_add.module.css";

const DiaryAdd = memo(({ closePopup, addDiary, fileUploader }) => {
  const titleRef = useRef();
  const locationRef = useRef();
  const startDtRef = useRef();
  const endDtRef = useRef();
  const keywordRef = useRef();
  const fileRef = useRef();
  const sightRef = useRef();
  const smellRef = useRef();
  const hearingRef = useRef();
  const tasteRef = useRef();
  const touchRef = useRef();

  const addDiaryData = async (event) => {
    event.preventDefault();
    let fileInfo;
    if (fileRef.current.files) {
      fileInfo = await fileUploader.upload(fileRef.current.files[0]);
    }

    const diary = {
      id: Date.now(),
      title: titleRef.current.value || "",
      keyword: keywordRef.current.value.split(","),
      location: locationRef.current.value || "",
      startDate: startDtRef.current.value || "",
      endDate: endDtRef.current.value || "",
      like: 0,
      travel: "",
      imgUrl: fileInfo?.secure_url || "",
      sight: sightRef.current.value || "",
      smell: smellRef.current.value || "",
      hearing: hearingRef.current.value || "",
      taste: tasteRef.current.value || "",
      touch: touchRef.current.value || "",
    };

    addDiary(diary);
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
        <div className={styles.item}>
          <div className={styles.left}>
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
            <input
              type="text"
              className={styles.input}
              ref={keywordRef}
              placeholder="드라이브, 바다"
            />
            <div>
              <FontAwesomeIcon icon={faCamera} className={styles.icon} />
              Main Photo
            </div>
            <input type="file" className={styles.input} ref={fileRef} />
          </div>
          <hr />
          <div className={styles.right}>
            <div>
              <FontAwesomeIcon icon={faEye} className={styles.icon} />
              Sight
            </div>
            <input type="text" className={styles.input} ref={sightRef} />

            <div>
              <FontAwesomeIcon icon={faAirFreshener} className={styles.icon} />
              Smell
            </div>
            <input type="text" className={styles.input} ref={smellRef} />

            <div>
              <FontAwesomeIcon icon={faTeethOpen} className={styles.icon} />
              Taste
            </div>
            <input type="text" className={styles.input} ref={tasteRef} />

            <div>
              <FontAwesomeIcon
                icon={faAssistiveListeningSystems}
                className={styles.icon}
              />
              Hearing
            </div>
            <input type="text" className={styles.input} ref={hearingRef} />

            <div>
              <FontAwesomeIcon icon={faHandSpock} className={styles.icon} />
              Touch
            </div>
            <input type="text" className={styles.input} ref={touchRef} />
          </div>
        </div>
        <div className={styles.button}>
          <button className={styles.submit} onClick={addDiaryData}>
            Submit
          </button>
        </div>
      </form>
    </section>
  );
});

export default DiaryAdd;
