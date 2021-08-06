import { firebaseDatabase } from "./firebase";

class DBService {
  writeData(userId, diary) {
    firebaseDatabase.ref(`${userId}/diary/${diary.id}`).set(diary);
  }

  readData(userId, updateData) {
    const starCountRef = firebaseDatabase.ref(`${userId}/diary`);

    starCountRef.on("value", (snapshot) => {
      const data = snapshot.val();
      data && updateData(data);
    });

    return () => starCountRef.off();
  }
  //userId, 기준, 찾을 Text, callback 함수
  searchData(userId, criteria, text, updateData) {
    if (text) {
      let filteredData = {};

      const starCountRef = firebaseDatabase
        .ref(`${userId}/diary`)
        .orderByChild(criteria)
        .startAt(text)
        .endAt(`${text}\uf8ff`)
        .once("value", (snapshot) => {
          const data = snapshot.val();

          data &&
            Object.keys(data).forEach((key) => (filteredData[key] = data[key]));
        });

      filteredData && updateData(filteredData);
      return () => starCountRef.off();
    } else {
      this.readData(userId, updateData);
    }
  }

  //userId, 기준, 찾을 Text, callback 함수
  searchDataWithKeyword(userId, criteria, text, updateData) {
    if (text) {
      let filteredData = {};

      const starCountRef = firebaseDatabase
        .ref(`${userId}/diary`)
        .once("value", (snapshot) => {
          const data = snapshot.val();

          data &&
            Object.keys(data).forEach((key) => {
              data[key].keyword &&
                Object.keys(data[key].keyword).forEach((id) => {
                  if (data[key].keyword[id] === text) {
                    filteredData[key] = data[key];
                    //break;
                  }
                });
            });
        });

      filteredData && updateData(filteredData);
      return () => starCountRef.off();
    } else {
      this.readData(userId, updateData);
    }
  }

  readDetailData(userId, detailId, updateData) {
    const starCountRef = firebaseDatabase.ref(`${userId}/diary/${detailId}`);
    starCountRef.once("value", (snapshot) => {
      const data = snapshot.val();
      data && updateData(data);
    });
  }

  deleteData(userId, detailId) {
    firebaseDatabase.ref(`${userId}/diary/${detailId}`).remove();
  }
}

export default DBService;
