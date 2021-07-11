import React, { useEffect } from "react";
import { useHistory } from "react-router";
import styles from "./login.module.css";

const Login = ({ authService }) => {
  const history = useHistory();
  const onLogin = (event) => {
    authService //
      .login(event.currentTarget.textContent)
      .then(({ user }) => {
        //result가 있으면 화면 이동
        if (user) {
          goToDiary(user.uid);
        } else {
        }
      });
  };

  const goToDiary = (userId) => {
    history.push({
      pathname: "./diary",
      state: { id: userId },
    });
  };

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      user && goToDiary(user.uid);
    });
  });
  return (
    <section className={styles.login}>
      <div className={styles.header}>Travel Diary</div>
      <div className={styles.content}>
        <div className={styles.text}>Login</div>
        <button className={styles.button} onClick={onLogin}>
          Google
        </button>
        <button className={styles.button} onClick={onLogin}>
          Github
        </button>
      </div>
    </section>
  );
};

export default Login;
