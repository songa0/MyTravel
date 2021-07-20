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

  searchData(userId, text, updateData) {
    if (text) {
      let filteredData = {};
      const starCountRef = firebaseDatabase
        .ref(`${userId}/diary`)
        .orderByChild("title")
        .startAt(text)
        .endAt(`${text}\uf8ff`)
        .once("value", (snapshot) => {
          const data = snapshot.val();
          Object.keys(data).forEach((key) => (filteredData[key] = data[key]));
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
      console.log(data);
      data && updateData(data);
    });
  }
}

export default DBService;