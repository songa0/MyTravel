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

  const fileRef = useRef();
  const addDiaryData = async (event) => {
    
    event.preventDefault();
    
    if (!event.target[0].value) {
      alert("Please enter Title");
      return;
    }
    let fileInfo;
    if (fileRef.current.files) {
      fileInfo = await fileUploader.upload(fileRef.current.files[0]);
    }
    console.dir(event.target);
    const diary = {
      id: Date.now(),
      title: event.target[0].value || "",
      location: event.target[1].value.split(","),
      startDate: event.target[2].value || "",
      endDate: event.target[3].value || "",
      keyword: event.target[4].value || "",
      like: 0,
      travel: "",
      imgUrl: [fileInfo?.secure_url || ""],
      sight: event.target[6].value || "",
      smell: event.target[7].value || "",
      taste: event.target[8].value || "",
      hearing: event.target[9].value || "",
      touch: event.target[10].value || "",
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
      <form className={styles.form} onSubmit={addDiaryData} onKeyPress={e=> {if(e.key==='Enter'){e.preventDefault();}}}>
        <div className={styles.item}>
          <div className={styles.left}>
            <div className={styles.title}>
              <FontAwesomeIcon icon={faStar} className={styles.icon} />
              Title
            </div>
            <input type="text" className={styles.input}/>
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
            <input
              type="text"
              className={styles.input}
              
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
            <input type="text" className={styles.input} />

            <div>
              <FontAwesomeIcon icon={faAirFreshener} className={styles.icon} />
              Smell
            </div>
            <input type="text" className={styles.input} />

            <div>
              <FontAwesomeIcon icon={faTeethOpen} className={styles.icon} />
              Taste
            </div>
            <input type="text" className={styles.input}/>

            <div>
              <FontAwesomeIcon
                icon={faAssistiveListeningSystems}
                className={styles.icon}
              />
              Hearing
            </div>
            <input type="text" className={styles.input} />

            <div>
              <FontAwesomeIcon icon={faHandSpock} className={styles.icon} />
              Touch
            </div>
            <input type="text" className={styles.input}/>
          </div>
        </div>
        <div className={styles.button}>
          <button className={styles.submit}> 
            Submit
          </button>
        </div>
      </form>
    </section>
  );
});

export default DiaryAdd;
