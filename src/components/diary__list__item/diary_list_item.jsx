import React, { useState } from "react";

import styles from "./diary_list_item.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faCalendar,
  faMapMarkerAlt,
  faExclamation,
  faInfo,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

const TravelListItem = ({ travelInfo, clickDetail, deleteData, detailId }) => {
  const { title, imgInfo, location, startDate, endDate } = travelInfo;
  const [isMouseOn, setIsMouseOn] = useState(false);

  const mouseOver = () => {
    setIsMouseOn(true);
  };
  const mouseOut = () => {
    setIsMouseOn(false);
  };

  const onClickItem = (event) => {
    const id = event.currentTarget.dataset.id;
    if (
      event.target.dataset.type === "delete" ||
      event.target.parentNode.dataset.type === "delete" ||
      event.target.parentNode.parentNode.dataset.type === "delete"
    ) {
      deleteData(id);
    } else {
      clickDetail(id);
    }
  };
  return (
    <div
      className={styles.item}
      onMouseOver={mouseOver}
      onMouseOut={mouseOut}
      onClick={onClickItem}
      data-id={detailId}
    >
      <div className={styles.imgArea}>
        {imgInfo && imgInfo.filter(item => item.use === "Y").length ? (
          <img src={imgInfo.filter(item => item.use === "Y")[0].url} className={styles.img} alt="main" />
        ) : (
          <div className={[styles.noimage, styles.img].join(" ")}>
            <FontAwesomeIcon
              icon={faExclamation}
              className={styles.exclamation}
            />
            <div>
              No Image <br /> Available
            </div>
          </div>
        )}
        <div
          className={
            isMouseOn ? [styles.btn__area, styles.show].join(" ") : styles.hide
          }
        >
          <button data-type="detail">
            <FontAwesomeIcon icon={faInfo} size="1x" />
          </button>
          <button data-type="delete">
            <FontAwesomeIcon icon={faTrashAlt} size="1x" />
          </button>
        </div>
      </div>
      <div className={styles.desc}>
        <div>
          <span className={styles.title}>{title}</span>
          <span className={styles.like}>
            <FontAwesomeIcon icon={faHeart} size="xs" />
            <span className={styles.number}></span>
          </span>
        </div>
        <div className={styles.detail}>
          <FontAwesomeIcon icon={faMapMarkerAlt} size="xs" />
          <span className={styles.desc__text}>{location}</span>
        </div>
        <div className={styles.detail}>
          <FontAwesomeIcon icon={faCalendar} size="xs" />
          <span className={styles.desc__text}>
            {startDate}~{endDate}
          </span>
        </div>
      </div>
    </div>
  );
};
export default TravelListItem;
