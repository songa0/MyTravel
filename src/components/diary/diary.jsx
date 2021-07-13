import React, { useEffect, useRef, useState } from "react";
import Keyword from "../keyword/keyword";
import Title from "../title/title";
import styles from "./diary.module.css";
import { useHistory } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import TravelListItem from "../travel__list__item/travel_list_item";
import Button from "../button/button";
import Header from "../header/header";

const Diary = ({ authService }) => {
  const history = useHistory();
  const searchInput = useRef();
  const [userId, setUserId] = useState(null);
  const [travel, setTravel] = useState({
    1: {
      id: 1,
      title: "개굴이의 맛집 기행-!",
      keyword: ["드라이브", "벚꽃여행"],
      location: "제주도",
      startDate: "2021.04.20",
      endDate: "2021.04.22",
      like: 3,
      travel: {
        1: {
          date: "2021.04.20",
          spot: {
            1: {
              name: "협재해변",
              latitude: 33.39402420202895,
              longitude: 126.23959922229415,
              imgUrl: "",
              content: "바다색 예쁘고 좋아요 역시 제주도 대표해변!!",
            },
            2: {
              name: "협재식물원",
              latitude: 33.39942900703703,
              longitude: 126.24491326932427,
              imgUrl: "",
              content:
                "커피도 있지만, tea 전문 카페네요. 시원하고 새콤달콤한 봄차가 맛있네요",
            },
          },
        },
        2: {
          date: "2021.04.21",
          spot: {
            1: {
              name: "해녀세자매",
              latitude: 33.41410821325944,
              longitude: 126.26071655555737,
              imgUrl: "",
              content: "한림항 인근에 위치한 제주 해산물 음식 전문점",
            },
            2: {
              name: "협재식물원",
              latitude: 33.39942900703703,
              longitude: 126.24491326932427,
              imgUrl: "",
              content:
                "커피도 있지만, tea 전문 카페네요. 시원하고 새콤달콤한 봄차가 맛있네요",
            },
          },
        },
      },
    },
    2: {
      id: 2,
      title: "개굴이의 우정 여행-!",
      location: "서울",
      startDate: "2021.05.20",
      endDate: "2021.05.21",
      keyword: ["뷰맛집", "벚꽃여행"],
      like: 5,
      travel: {
        1: {
          date: "2021.05.20",
          spot: {
            1: {
              name: "남산타워",
              latitude: 37.55129696841767,
              longitude: 126.98823732686407,
              imgUrl: "",
              content:
                "남산!  N서울타워! 오늘은 날씨 덕분인지 뷰가 굉장히 좋네요.",
            },
            2: {
              name: "남대문 시장",
              latitude: 37.55942522450706,
              longitude: 126.97767992686425,
              imgUrl: "",
              content: "가격 저렴하고 좋은 물건 많은 곳",
            },
          },
        },
        2: {
          date: "2021.05.21",
          spot: {
            1: {
              name: "롯데월드",
              latitude: 37.5112093950493,
              longitude: 127.09815626919173,
              imgUrl: "",
              content: "아틀란티스가 제일 재미있다. ",
            },
            2: {
              name: "석촌호수",
              latitude: 37.51029905767279,
              longitude: 127.10309629397291,
              imgUrl: "",
              content:
                "인공호수 하지만 너무 예쁘게 잘 꾸며둔 공간이라고 생각합니다.",
            },
          },
        },
      },
    },
  });
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

  const readLatestData = () => {
    setTravel({
      1: {
        id: 1,
        title: "개굴이의 맛집 기행-!",
        keyword: ["드라이브", "벚꽃여행"],
        location: "제주도",
        startDate: "2021.04.20",
        endDate: "2021.04.22",
        like: 3,
        travel: {
          1: {
            date: "2021.04.20",
            spot: {
              1: {
                name: "협재해변",
                latitude: 33.39402420202895,
                longitude: 126.23959922229415,
                imgUrl: "",
                content: "바다색 예쁘고 좋아요 역시 제주도 대표해변!!",
              },
              2: {
                name: "협재식물원",
                latitude: 33.39942900703703,
                longitude: 126.24491326932427,
                imgUrl: "",
                content:
                  "커피도 있지만, tea 전문 카페네요. 시원하고 새콤달콤한 봄차가 맛있네요",
              },
            },
          },
          2: {
            date: "2021.04.21",
            spot: {
              1: {
                name: "해녀세자매",
                latitude: 33.41410821325944,
                longitude: 126.26071655555737,
                imgUrl: "",
                content: "한림항 인근에 위치한 제주 해산물 음식 전문점",
              },
              2: {
                name: "협재식물원",
                latitude: 33.39942900703703,
                longitude: 126.24491326932427,
                imgUrl: "",
                content:
                  "커피도 있지만, tea 전문 카페네요. 시원하고 새콤달콤한 봄차가 맛있네요",
              },
            },
          },
        },
      },
      2: {
        id: 2,
        title: "개굴이의 우정 여행-!",
        location: "서울",
        startDate: "2021.05.20",
        endDate: "2021.05.21",
        keyword: ["뷰맛집", "벚꽃여행"],
        like: 5,
        travel: {
          1: {
            date: "2021.05.20",
            spot: {
              1: {
                name: "남산타워",
                latitude: 37.55129696841767,
                longitude: 126.98823732686407,
                imgUrl: "",
                content:
                  "남산!  N서울타워! 오늘은 날씨 덕분인지 뷰가 굉장히 좋네요.",
              },
              2: {
                name: "남대문 시장",
                latitude: 37.55942522450706,
                longitude: 126.97767992686425,
                imgUrl: "",
                content: "가격 저렴하고 좋은 물건 많은 곳",
              },
            },
          },
          2: {
            date: "2021.05.21",
            spot: {
              1: {
                name: "롯데월드",
                latitude: 37.5112093950493,
                longitude: 127.09815626919173,
                imgUrl: "",
                content: "아틀란티스가 제일 재미있다. ",
              },
              2: {
                name: "석촌호수",
                latitude: 37.51029905767279,
                longitude: 127.10309629397291,
                imgUrl: "",
                content:
                  "인공호수 하지만 너무 예쁘게 잘 꾸며둔 공간이라고 생각합니다.",
              },
            },
          },
        },
      },
    });
  };
  const clickSearchBtn = () => {
    //다시 읽어오기
    readLatestData();
    if (searchInput.current.value) {
      setTravel((travel) => {
        const filteredTravel = Object.keys(travel)
          .filter((key) =>
            travel[key].title.includes(searchInput.current.value)
          )
          .map((key) => travel[key]);
        return filteredTravel;
      });
    }
  };

  const handelKeyPress = (event) => {
    if (event.charCode === 13) {
      clickSearchBtn();
    }
  };
  const goToDetail = (event) => {
    history.push({
      pathname: "/diary/detail",
      state: { detailId: event.target.id },
    });
  };

  return (
    <section className={styles.diary}>
      <Header
        titleName="여행 일기"
        buttonName="Logout"
        clickEvent={authService.logout}
      />
      <div className={styles.search}>
        <input
          className={styles.searchInput}
          type="text"
          ref={searchInput}
          onKeyPress={handelKeyPress}
        />
        <FontAwesomeIcon icon={faSearch} onClick={clickSearchBtn} />
      </div>
      <Keyword travel={travel} />
      <ul className={styles.list} onClick={goToDetail}>
        {Object.keys(travel).map((key) => (
          <li className={styles.list_item} key={key} id={key}>
            <TravelListItem travelInfo={travel[key]} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Diary;
