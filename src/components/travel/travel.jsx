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
  faEdit,
  faCheckSquare,
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
  const titleRef = useRef();
  const locationRef = useRef();
  const startDtRef = useRef();
  const endDtRef = useRef();
  //const keywordRef = useRef();
  const sightRef = useRef();
  const smellRef = useRef();
  const hearingRef = useRef();
  const tasteRef = useRef();
  const touchRef = useRef();
  const commentRef = useRef();

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
    setClickEdit(true);
    titleRef.current.value = travelDtl.title || "";
    locationRef.current.value = travelDtl.location || "";
    startDtRef.current.value = travelDtl.startDate || "";
    endDtRef.current.value = travelDtl.endDate || "";
    //keywordRef.current.value =travelDtl.
    sightRef.current.value = travelDtl.sight || "";
    smellRef.current.value = travelDtl.smell || "";
    hearingRef.current.value = travelDtl.hearing || "";
    tasteRef.current.value = travelDtl.taste || "";
    touchRef.current.value = travelDtl.touch || "";
  };
  const saveData = () => {
    const diary = {
      ...travelDtl,
      title: titleRef.current.value || "",
      location: locationRef.current.value || "",
      startDate: startDtRef.current.value || "",
      endDate: endDtRef.current.value || "",
      sight: sightRef.current.value || "",
      smell: smellRef.current.value || "",
      hearing: hearingRef.current.value || "",
      taste: tasteRef.current.value || "",
      touch: touchRef.current.value || "",
      comment: commentRef.current.value || "",
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
              <span>{travelDtl.sight}</span>
            </div>

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

            <div>
              <div className={styles.sense__name}>
                <FontAwesomeIcon icon={faTeethOpen} className={styles.icon} />
                Taste
              </div>
              <span>{travelDtl.taste}</span>
            </div>
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
            <div>
              <div className={styles.sense__name}>
                <FontAwesomeIcon icon={faHandSpock} className={styles.icon} />
                Touch
              </div>
              <span>{travelDtl.touch}</span>
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
              <div>{travelDtl.comment}</div>
            </div>
          </div>
        </div>

        <div className={clickEdit ? styles.travel : styles.hide}>
          <div className={styles.textArea}>
            <div className={styles.title}>
              <FontAwesomeIcon icon={faStar} className={styles.title__icon} />
              <input type="text" ref={titleRef} />
            </div>
            <div className={styles.schedule}>
              <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.icon} />
              <input type="text" className={styles.text} ref={locationRef} />
            </div>
            <div className={styles.schedule}>
              <FontAwesomeIcon icon={faCalendar} className={styles.icon} />
              <input type="date" ref={startDtRef} className={styles.text} />
              ~
              <input type="date" ref={endDtRef} className={styles.text} />
            </div>
          </div>
          <div className={styles.photo}>
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
              <input type="text" ref={sightRef} />
            </div>

            <div>
              <div className={styles.sense__name}>
                <FontAwesomeIcon
                  icon={faAirFreshener}
                  className={styles.icon}
                />
                Smell
              </div>
              <input type="text" ref={smellRef} />
            </div>

            <div>
              <div className={styles.sense__name}>
                <FontAwesomeIcon icon={faTeethOpen} className={styles.icon} />
                Taste
              </div>
              <input type="text" ref={tasteRef} />
            </div>
            <div>
              <div className={styles.sense__name}>
                <FontAwesomeIcon icon={faHandSpock} className={styles.icon} />
                Touch
              </div>
              <input type="text" ref={touchRef} />
            </div>
            <div>
              <div className={styles.sense__name}>
                <FontAwesomeIcon
                  icon={faAssistiveListeningSystems}
                  className={styles.icon}
                />
                Hearing
              </div>
              <input type="text" ref={hearingRef} />
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
              <textarea className={styles.textarea} ref={commentRef}></textarea>
            </div>
          </div>
        </div>
        <div className={styles.buttons}>
          <FontAwesomeIcon
            icon={faEdit}
            className={styles.edit}
            onClick={setEditBtn}
            size="lg"
          />
          <FontAwesomeIcon icon={faCheckSquare} size="lg" onClick={saveData} />
        </div>
      </section>
    </>
  );
};

export default Travel;
