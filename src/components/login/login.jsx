import React from "react";
//import useHistory from "react-router";
import styles from "./login.module.css";

const Login = ({ authService }) => {
  //const history = useHistory();
  const onLogin = (event) => {
    authService //
      .login(event.currentTarget.textContent)
      .then((result) => {
        //result가 있으면 화면 이동
      });
  };
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
