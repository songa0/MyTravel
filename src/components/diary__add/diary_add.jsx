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
  const isValid = (e) =>{
    
    if (!e.target[0].value) {
      alert("Please enter Title.");
      return false;
    }

    if(fileRef.current.files.length>5){
      alert("You can select up to 5 files.");
      return false;
    }

    return true;
  }
  const addDiaryData = async (event) => {
    event.preventDefault();
    if(!isValid(event))return;
   
    let fileInfo = new Array();
    for(const item of fileRef.current.files){
      const uploadedImg = await fileUploader.upload(item);
      fileInfo.push({url : uploadedImg.secure_url, name : uploadedImg.original_filename});
      
    }
    
    const diary = {
      id: Date.now(),
      title: event.target[0].value || "",
      location: event.target[1].value|| "",
      startDate: event.target[2].value || "",
      endDate: event.target[3].value || "",
      keyword: event.target[4].value.split(","),
      like: 0,
      travel: "",
      imgInfo: fileInfo || "",
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
              Photo
            </div>
            <input type="file" className={styles.input} ref={fileRef} multiple="multiple" />
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
