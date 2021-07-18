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
      //updateStarCount(data);
    });
    return () => starCountRef.off();
  }
}

export default DBService;
