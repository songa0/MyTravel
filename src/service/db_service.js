import { firebaseDatabase } from "./firebase";

class DBService {
  writeData(userId, diary) {
    console.log(userId, diary);
    firebaseDatabase.ref(userId).set(diary);
  }

  readData(userId) {}
}

export default DBService;
