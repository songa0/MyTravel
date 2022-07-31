import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";

import styles from "./diary.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import DiaryListItem from "../diary__list__item/diary_list_item";
import Nav from "../nav/nav";
import Header from "../header/header";
import DiaryAdd from "../diary__add/diary_add";
import Travel from "../travel/travel";
import Keyword from "../keyword/keyword";

const Diary = ({ authService, dbService, fileUploader }) => {
  const history = useHistory();
  const [userId, setUserId] = useState(null);
  const [popupClick, setPopupClick] = useState(false);
  const [travel, setTravel] = useState({});
  const [detailClick, setDetailClick] = useState(false);
  const [detailId, setDetailId] = useState(null);

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
      if (detailClick && event.keyCode === 27) {
        setDetailClick(false);
      }
    };
    document.addEventListener("keydown", escPressFunc, false);

    return () => {
      window.removeEventListener("keydown", escPressFunc);
    };
  });

  const searchData = useCallback(
    (text) => {
      const stopSync = dbService.searchData(userId, "title", text, (data) =>
        setTravel(data),
      );
      return () => stopSync();
    },
    [dbService, userId],
  );

  const deleteData = useCallback(
    (diaryId) => {
      dbService.deleteData(userId, diaryId);
    },
    [dbService, userId],
  );

  const filterData = useCallback(
    (text) => {
      const stopSync = dbService.searchDataWithKeyword(
        userId,
        "keyword",
        text,
        (data) => setTravel(data),
      );
      return () => stopSync();
    },
    [dbService, userId],
  );

  const closePopup = useCallback(() => {
    setPopupClick(false);
  }, []);
  const openPopup = useCallback(() => {
    setPopupClick(true);
  }, []);

  const addDiary = useCallback(
    (diary) => {
      dbService.writeData(userId, diary);
      closePopup();
    },
    [dbService, userId, closePopup],
  );

  const updateDiary = useCallback(
    (diary) => {
      dbService.writeData(userId, diary);
    },
    [dbService, userId],
  );
  const openDetailPopup = useCallback((detailId) => {
    setDetailClick(true);
    setDetailId(detailId);
  }, []);

  return (
    <div className={styles.diary}>
      <header className={styles.header}>
        <Nav clickLogout={authService.logout} />
        <Header buttonClick={searchData} searchBar="true" />
      </header>
      <section className={styles.section}>
        <Keyword travel={travel} clickEvent={filterData} />
        <div className={styles.list}>
          {travel &&
            Object.keys(travel).map((key) => (
              <div className={styles.list_item} key={key}>
                <DiaryListItem
                  travelInfo={travel[key]}
                  clickDetail={openDetailPopup}
                  deleteData={deleteData}
                  detailId={key}
                />
              </div>
            ))}
        </div>
      </section>
      {!popupClick && !detailClick && (
        <button className={styles.plus} onClick={openPopup}>
          <FontAwesomeIcon icon={faPlus} size="lg" />
        </button>
      )}

      {popupClick && (
        <div className={styles.popup}>
          <DiaryAdd
            addDiary={addDiary}
            closePopup={closePopup}
            fileUploader={fileUploader}
          />
        </div>
      )}

      {detailClick && (
        <div className={[styles.popup, styles.detail].join(" ")}>
          <Travel
            updateDiary={updateDiary}
            readDetailData={dbService.readDetailData}
            openPopup={setDetailClick}
            detailId={detailId}
            userId={userId}
            fileUploader={fileUploader}
          />
        </div>
      )}
    </div>
  );
};

export default Diary;
