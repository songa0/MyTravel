import React, { useEffect, useRef, useState } from "react";
import Keyword from "../keyword/keyword";
import styles from "./diary.module.css";
import { useHistory } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import DiaryListItem from "../diary__list__item/diary_list_item";
import Nav from "../nav/nav";
import Search from "../search/search";
import DiaryAdd from "../diary__add/diary_add";

const Diary = ({ authService, dbService }) => {
  const history = useHistory();
  const [userId, setUserId] = useState(null);
  const [popupClick, setPopupClick] = useState(false);
  const [travel, setTravel] = useState({});
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

  useEffect(() => {
    const stopSync = dbService.readData(userId, (data) => {
      setTravel(data);
    });

    return () => stopSync();
  });

  const readLatestData = () => {
    dbService.readData(userId, (data) => {
      setTravel(data);
    });
    console.log("ReadLatest");
  };
  const clickSearchBtn = (searchText) => {
    //다시 읽어오기
    readLatestData();

    if (searchText) {
      setTravel((travel) => {
        const filteredTravel = Object.keys(travel)
          .filter((key) => travel[key].title.includes(searchText))
          .map((key) => travel[key]);
        return filteredTravel;
      });
    }
  };

  const goToDetail = (event) => {
    history.push({
      pathname: "/diary/detail",
      state: { detailId: event.target.id },
    });
  };

  const closePopup = () => {
    setPopupClick(false);
  };
  const openPopup = () => {
    setPopupClick(true);
  };

  const addDiary = (diary) => {
    dbService.writeData(userId, diary);
    closePopup();
  };
  return (
    <div className={styles.diary}>
      <header className={styles.header}>
        <Nav clickEvent={authService.logout} />
        <Search buttonClick={clickSearchBtn} />
      </header>
      <section className={styles.section}>
        <Keyword travel={travel} />
        <div className={styles.list}>
          {travel &&
            Object.keys(travel).map((key) => (
              <div
                className={styles.list_item}
                key={key}
                id={key}
                onClick={goToDetail}
              >
                <DiaryListItem travelInfo={travel[key]} />
              </div>
            ))}
        </div>
      </section>
      <button className={styles.plus} onClick={openPopup}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
      {popupClick && (
        <div className={styles.popup}>
          <DiaryAdd addDiary={addDiary} closePopup={closePopup} />
        </div>
      )}
    </div>
  );
};

export default Diary;
