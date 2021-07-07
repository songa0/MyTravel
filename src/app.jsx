import styles from "./app.module.css";
import Login from "./components/login/login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = ({ authService }) => {
  return (
    <Router>
      <Switch>
        <div className={styles.app}>
          <Route path="/">
            <Login authService={authService} />
          </Route>
          <Route path="/diary"></Route>
        </div>
      </Switch>
    </Router>
  );
};

export default App;
