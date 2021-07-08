import styles from "./app.module.css";
import Login from "./components/login/login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Diary from "./components/diary/diary";

const App = ({ authService }) => {
  return (
    <Router>
      <div className={styles.app}>
        <Switch>
          <Route exact path="/">
            <Login authService={authService} />
          </Route>
          <Route path="/diary">
            <Diary />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
