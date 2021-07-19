import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router";
import styles from "./login.module.css";

const Login = ({ authService }) => {
  const history = useHistory();
  const googleLogin = useRef();
  const onLogin = (event) => {
    authService //
      .login(event.target.alt)
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
    <section className={styles.section}>
      <div className={styles.title}>Sign in</div>
      <div className={styles.email}>
        <input type="email" placeholder="Email" className={styles.text} />
        <input type="password" placeholder="Password" className={styles.text} />
        <button className={styles.login}>Login</button>
      </div>
      <div className={styles.or}>or</div>
      <div className={styles.social}>
        <button className={styles.button} onClick={onLogin} ref={googleLogin}>
          <img src="./images/google_signin_dark.png" alt="Google" />
        </button>
        <button className={styles.button} onClick={onLogin}>
          <img src="./images/github_signin_dark.png" alt="Github" />
        </button>
      </div>
    </section>
  );
};

export default Login;
