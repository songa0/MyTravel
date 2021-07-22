import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Nav from "../nav/nav";
import styles from "./travel.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faCalendar,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import TravelListItem from "../travel__list__item/travel_list_item";
import Header from "../header/header";

const DiaryDetail = ({ authService, dbService }) => {
  const history = useHistory();
  const [userId, setUserId] = useState(null);
  const [travelDtl, setTravelDtl] = useState({});
  useEffect(() => {
    //history.location.state.detailId로 데이터 가져오기
    dbService.readDetailData(
      userId,
      history.location.state.detailId,
      (data) => {
        setTravelDtl(data);
      }
    );
  }, [userId, history.location.state.detailId, dbService]);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        history.push({
          pathname: "/",
        });
      }
    });
  });

  const goToDayDetail = (event) => {
    history.push({
      pathname: `/diary/detail/${event.currentTarget.id}`,
      state: { day: event.currentTarget.id },
    });
  };

  return (
    <div className={styles.travel}>
      <header>
        <Nav clickEvent={authService.logout} />
        <Header />
      </header>
      <section className={styles.section}>
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
                <li key={key} id={key} onClick={goToDayDetail}>
                  <TravelListItem day={key} date={travelDtl.travel[key].date} />
                </li>
              ))}
          </ul>
        </div>

        <div className={styles.map}>
          <img src="/images/map.png" alt="google map api" />
        </div>
      </section>
    </div>
  );
};

export default DiaryDetail;
