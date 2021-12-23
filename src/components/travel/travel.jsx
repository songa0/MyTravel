import React, { useEffect, useRef, useState } from "react";
import styles from "./travel.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faCalendar,
  faStar,
  faTimes,
  faEye,
  faAssistiveListeningSystems,
  faHandSpock,
  faTeethOpen,
  faAirFreshener,
  faExclamation,
  faComment,
} from "@fortawesome/free-solid-svg-icons";

const Travel = ({
  updateDiary,
  openPopup,
  detailId,
  userId,
  readDetailData,
}) => {
  const formRef = useRef();

  const [travelDtl, setTravelDtl] = useState({});
  const [clickEdit, setClickEdit] = useState(false);

  useEffect(() => {
    //history.location.state.detailId로 데이터 가져오기
    readDetailData(userId, detailId, (data) => {
      setTravelDtl(data);
    });
  }, [readDetailData, detailId, userId]);

  const closeWindow = () => openPopup(false);
  const setEditBtn = () => {
    if (clickEdit) {
      return;
    }
    setClickEdit(true);
    formRef.current[0].value = travelDtl.title || "";
    formRef.current[1].value = travelDtl.location || "";
    formRef.current[2].value = travelDtl.startDate || "";
    formRef.current[3].value = travelDtl.endDate   || "";

    formRef.current[5].value = travelDtl.sight     || "";
    formRef.current[6].value = travelDtl.smell     || "";
    formRef.current[7].value = travelDtl.taste   || "";
    formRef.current[8].value = travelDtl.hearing     || "";
    formRef.current[9].value = travelDtl.touch    || "";
    formRef.current[10].value = travelDtl.comment ||"";

  };
  const saveData = (e) => {
    e.preventDefault();

    if (!clickEdit) {
      alert("Please click this button after editing.");
      return;
    }

    const diary = {
      ...travelDtl,
      title:     e.target[0].value || "",
      location:  e.target[1].value || "",
      startDate: e.target[2].value || "",
      endDate:   e.target[3].value || "",
      sight:     e.target[5].value || "",
      smell:     e.target[6].value || "",
      hearing:   e.target[7].value || "",
      touch:     e.target[8].value || "",
      taste:     e.target[9].value || "",
      comment:   e.target[10].value || "",
    };
    
    updateDiary(diary);
    setClickEdit(false);

    readDetailData(userId, detailId, (data) => {
      setTravelDtl(data);
    });
  };
  return (
    <>
      <header className={styles.header}>
        <FontAwesomeIcon
          icon={faTimes}
          size="lg"
          className={styles.close__icon}
          onClick={closeWindow}
        />
      </header>
      <section className={styles.section}>
        <div className={clickEdit ? styles.hide : styles.travel}>
          <div className={styles.textArea}>
            <div className={styles.title}>
              <FontAwesomeIcon icon={faStar} className={styles.title__icon} />
              <span>{travelDtl.title}</span>
            </div>
            <div className={styles.schedule}>
              <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.icon} />
              <span className={styles.text}> {travelDtl.location}</span>
            </div>
            <div className={styles.schedule}>
              <FontAwesomeIcon icon={faCalendar} className={styles.icon} />
              <span className={styles.text}>
                {travelDtl.startDate} ~ {travelDtl.endDate}
              </span>
            </div>
          </div>
          <div className={styles.photo}>
            {travelDtl.imgUrl ? (
              <img src={travelDtl.imgUrl[0]} alt="uploaded" />
            ) : (
              <div className={styles.noImage}>
                <FontAwesomeIcon
                  icon={faExclamation}
                  className={styles.exclamation}
                />
                <div>
                  No Image <br /> Available
                </div>
              </div>
            )}
          </div>
          <div className={styles.sense}>
            {travelDtl.sight && (
              <div>
                <div className={styles.sense__name}>
                  <FontAwesomeIcon icon={faEye} className={styles.icon} />
                  Sight
                </div>
                <span>{travelDtl.sight}</span>
              </div>
            )}
            {travelDtl.smell && (
              <div>
                <div className={styles.sense__name}>
                  <FontAwesomeIcon
                    icon={faAirFreshener}
                    className={styles.icon}
                  />
                  Smell
                </div>
                <span>{travelDtl.smell}</span>
              </div>
            )}
            {travelDtl.taste && (
              <div>
                <div className={styles.sense__name}>
                  <FontAwesomeIcon icon={faTeethOpen} className={styles.icon} />
                  Taste
                </div>
                <span>{travelDtl.taste}</span>
              </div>
            )}
            {travelDtl.hearing && (
              <div>
                <div className={styles.sense__name}>
                  <FontAwesomeIcon
                    icon={faAssistiveListeningSystems}
                    className={styles.icon}
                  />
                  Hearing
                </div>
                <span>{travelDtl.hearing}</span>
              </div>
            )}
            {travelDtl.touch && (
              <div>
                <div className={styles.sense__name}>
                  <FontAwesomeIcon icon={faHandSpock} className={styles.icon} />
                  Touch
                </div>
                <span>{travelDtl.touch}</span>
              </div>
            )}
            {travelDtl.comment && (
              <div>
                <div className={styles.comment}>
                  <FontAwesomeIcon
                    icon={faComment}
                    className={styles.icon}
                    size="1x"
                  />
                  General Comment
                </div>
                <br />
                <div>{travelDtl.comment}</div>
              </div>
            )}
            
          </div>
          <button className={styles.button} onClick={setEditBtn}> 
              Edit
            </button>
        </div>

        <form className={clickEdit ? styles.travel : styles.hide} onSubmit={saveData} ref={formRef} onKeyPress={e=> {if(e.key==='Enter'){e.preventDefault();}}} >
          <div className={styles.textArea}>
            <div className={styles.title}>
              <FontAwesomeIcon icon={faStar} className={styles.title__icon} />
              <input type="text" className={styles.input} />
            </div>
            <div className={styles.schedule}>
              <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.icon} />
              <input type="text" className={styles.input} />
            </div>
            <div className={styles.schedule}>
              <FontAwesomeIcon icon={faCalendar} className={styles.icon} />
              <input
                type="date"
                className={[styles.input, styles.date].join(" ")}
              />
              ~
              <input
                type="date"
                className={[styles.input, styles.date].join(" ")}
              />
            </div>
          </div>
          <div className={styles.photo}>
            <input type="file" />
            {travelDtl.imgUrl ? (
              <img src={travelDtl.imgUrl} alt="uploaded" />
            ) : (
              <div className={styles.noImage}>
                <FontAwesomeIcon
                  icon={faExclamation}
                  className={styles.exclamation}
                />
                <div>
                  No Image <br /> Available
                </div>
              </div>
            )}
          </div>
          <div className={styles.sense}>
            <div>
              <div className={styles.sense__name}>
                <FontAwesomeIcon icon={faEye} className={styles.icon} />
                Sight
              </div>
              <input type="text" className={styles.input} />
            </div>

            <div>
              <div className={styles.sense__name}>
                <FontAwesomeIcon
                  icon={faAirFreshener}
                  className={styles.icon}
                />
                Smell
              </div>
              <input type="text" className={styles.input} />
            </div>
            <div>
              <div className={styles.sense__name}>
                <FontAwesomeIcon icon={faTeethOpen} className={styles.icon} />
                Taste
              </div>
              <input type="text" className={styles.input} />
            </div>
            <div>
              <div className={styles.sense__name}>
                <FontAwesomeIcon
                  icon={faAssistiveListeningSystems}
                  className={styles.icon}
                />
                Hearing
              </div>
              <input type="text" className={styles.input} />
            </div>
            <div>
              <div className={styles.sense__name}>
                <FontAwesomeIcon icon={faHandSpock} className={styles.icon} />
                Touch
              </div>
              <input type="text" className={styles.input} />
            </div>
            
            <div>
              <div className={styles.comment}>
                <FontAwesomeIcon
                  icon={faComment}
                  className={styles.icon}
                  size="1x"
                />
                General Comment
              </div>
              <br />
              <textarea className={styles.textarea}></textarea>
            </div>
          </div>
          <button className={styles.button}> 
            Save
          </button>
        </form>
      </section>
    </>
  );
};

export default Travel;
