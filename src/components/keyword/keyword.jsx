import React from "react";
import styles from "./keyword.module.css";

const Keyword = ({ travel }) => {
  const keywords = new Set();
  Object.keys(travel).map(
    (tKey) =>
      travel[tKey].keyword &&
      Object.keys(travel[tKey].keyword).map((kKey) =>
        keywords.add(travel[tKey].keyword[kKey])
      )
  );

  const keywordsArray = Array.from(keywords);

  return (
    <div className={styles.keywords}>
      {keywordsArray &&
        Object.keys(keywordsArray).map((key) => (
          <span key={key} className={styles.keyword}>
            {keywordsArray[key]}
          </span>
        ))}
    </div>
  );
};

export default Keyword;
