import React, { useRef } from "react";
import styles from "./header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Header = ({ buttonClick, searchBar }) => {
  const searchInput = useRef();

  const handelKeyPress = (event) => {
    if (event.charCode === 13) {
      handleClick();
    }
  };

  const handleClick = () => {
    buttonClick(searchInput.current.value);
  };

  return (
    <div className={styles.search}>
      <img
        src="/images/background.jpg"
        className={styles.img}
        alt="background"
      />
      {searchBar && (
        <div className={styles.input}>
          <input
            className={styles.searchInput}
            type="text"
            ref={searchInput}
            onKeyPress={handelKeyPress}
          />
          <FontAwesomeIcon icon={faSearch} onClick={handleClick} />
        </div>
      )}
    </div>
  );
};

export default Header;
