import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Header from "../header/header";
const DiaryDetail = ({ authService }) => {
  const history = useHistory();
  const [travelDtl, setTravelDtl] = useState({
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
  });
  useEffect(() => {
    //history.location.state.detailId로 데이터 가져오기
  });

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (!user) {
        history.push({
          pathname: "/",
        });
      }
    });
  });
  return (
    <>
      <Header
        titleName={travelDtl.title}
        buttonName="Logout"
        clickEvent={authService.logout}
      />
    </>
  );
};

export default DiaryDetail;