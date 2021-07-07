import styles from "./app.module.css";
import Login from "./components/login/login";

const App = ({ authService }) => {
  return (
    <div className={styles.app}>
      <Login authService={authService} />
    </div>
  );
};

export default App;
