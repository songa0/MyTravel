import React, { useEffect, useState } from "react";
import Keyword from "../keyword/keyword";
import styles from "./diary.module.css";
import { useHistory } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import DiaryListItem from "../diary__list__item/diary_list_item";
import Nav from "../nav/nav";
import Header from "../header/header";
import DiaryAdd from "../diary__add/diary_add";

const Diary = ({ authService, dbService, fileUploader }) => {
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
  }, [userId, dbService]);

  useEffect(() => {
    const escPressFunc = (event) => {
      if (popupClick && event.keyCode === 27) {
        closePopup();
      }
    };
    document.addEventListener("keydown", escPressFunc, false);

    return () => {
      window.removeEventListener("keydown", escPressFunc);
    };
  });

  const searchData = (text) => {
    const stopSync = dbService.searchData(userId, "title", text, (data) =>
      setTravel(data)
    );
    return () => stopSync();
  };

  const clickSearchBtn = (searchText) => {
    searchData(searchText);
  };

  const goToDetail = (event) => {
    // console.dir(event.currentTarget);
    history.push({
      pathname: "/diary/detail",
      state: { detailId: event.currentTarget.id },
    });
  };

  const filterData = (text) => {
    const stopSync = dbService.searchDataWithKeyword(
      userId,
      "keyword",
      text,
      (data) => setTravel(data)
    );
    return () => stopSync();
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
        <Header buttonClick={clickSearchBtn} searchBar="true" />
      </header>
      <section className={styles.section}>
        <Keyword travel={travel} clickEvent={filterData} />
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
        <FontAwesomeIcon icon={faPlus} size="lg" />
      </button>
      {popupClick && (
        <div className={styles.popup}>
          <DiaryAdd
            addDiary={addDiary}
            closePopup={closePopup}
            fileUploader={fileUploader}
          />
        </div>
      )}
    </div>
  );
};

export default Diary;
