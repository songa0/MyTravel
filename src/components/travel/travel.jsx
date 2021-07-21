import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Nav from "../nav/nav";
import styles from "./travel.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faCalendar } from "@fortawesome/free-solid-svg-icons";
import TravelListItem from "../travel__list__item/travel_list_item";

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
    <section className={styles.section}>
      <Nav clickEvent={authService.logout} />
      <div className={styles.schedule}>
        <FontAwesomeIcon icon={faMapMarkerAlt} />
        <span className={styles.text}> {travelDtl.location}</span>
      </div>
      <div className={styles.schedule}>
        <FontAwesomeIcon icon={faCalendar} />
        <span className={styles.text}>
          {travelDtl.startDate} ~ {travelDtl.endDate}
        </span>
      </div>
      <div className={styles.map}>google map api</div>
      <ul className={styles.list}>
        {travelDtl.travel &&
          Object.keys(travelDtl.travel).map((key) => (
            <li key={key} id={key} onClick={goToDayDetail}>
              <TravelListItem day={key} date={travelDtl.travel[key].date} />
            </li>
          ))}
      </ul>
    </section>
  );
};

export default DiaryDetail;
