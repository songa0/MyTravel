import React, { useEffect, useState } from "react";
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
} from "@fortawesome/free-solid-svg-icons";
import TravelListItem from "../travel__list__item/travel_list_item";

const Travel = ({ dbService, openPopup, detailId, userId }) => {
  const [travelDtl, setTravelDtl] = useState({});

  useEffect(() => {
    //history.location.state.detailId로 데이터 가져오기
    dbService.readDetailData(userId, detailId, (data) => {
      setTravelDtl(data);
    });
  }, [dbService, detailId, userId]);

  // const goToDayDetail = (event) => {
  //   history.push({
  //     pathname: `/diary/detail/${event.currentTarget.id}`,
  //     state: { day: event.currentTarget.id },
  //   });
  // };
  const closeWindow = () => openPopup(false);
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
        <div className={styles.travel}>
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
            <ul className={styles.list}>
              {travelDtl.travel &&
                Object.keys(travelDtl.travel).map((key) => (
                  <li key={key} id={key}>
                    <TravelListItem
                      day={key}
                      date={travelDtl.travel[key].date}
                    />
                  </li>
                ))}
            </ul>
          </div>
          <div className={styles.photo}>
            <img src={travelDtl.imgUrl} alt="uploaded" />
          </div>
          <div className={styles.sense}>
            <div>
              <FontAwesomeIcon icon={faEye} className={styles.icon} />
              <span>{travelDtl.sight}</span>
            </div>
            <div>
              <FontAwesomeIcon
                icon={faAssistiveListeningSystems}
                className={styles.icon}
              />
              <span>{travelDtl.hearing}</span>
            </div>
            <div>
              <FontAwesomeIcon icon={faAirFreshener} className={styles.icon} />
              <span>{travelDtl.smell}</span>
            </div>
            <div>
              <FontAwesomeIcon icon={faHandSpock} className={styles.icon} />
              <span>{travelDtl.touch}</span>
            </div>
            <div>
              <FontAwesomeIcon icon={faTeethOpen} className={styles.icon} />
              <span>{travelDtl.taste}</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Travel;
