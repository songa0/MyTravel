import styles from "./app.module.css";
import Login from "./components/login/login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Diary from "./components/diary/diary";
import Travel from "./components/travel/travel";
import Schedule from "./components/schedule/schedule";
import DiaryAdd from "./components/diary__add/diary_add";

const App = ({ authService }) => {
  return (
    <Router>
      <div className={styles.app}>
        <Switch>
          <Route exact path="/">
            <Login authService={authService} />
          </Route>
          <Route exact path="/diary">
            <Diary authService={authService} />
          </Route>
          <Route exact path="/diary/detail">
            <Travel authService={authService} />
          </Route>
          <Route path="/diary/detail/:id">
            <Schedule authService={authService} />
          </Route>
          <Route exact path="/diary/add">
            <DiaryAdd />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
