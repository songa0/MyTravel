import React, { useEffect } from "react";
import { useHistory } from "react-router";

import styles from "./login.module.css";

const Login = ({ authService }) => {
  const history = useHistory();

  const onLogin = (event) => {
    authService //
      .login(event.target.alt)
      .then(({ user }) => {
        if (user) {
          goToDiary(user.uid);
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
    <div className={styles.bg}>
      <section className={styles.section}>
        <div className={styles.login}>
          <div className={styles.title}>Login</div>
          <div className={styles.subTitle}>
            The journey not the arrival matters.
          </div>
          <div className={styles.social}>
            <button
              className={styles.button}
              onClick={onLogin}
            >
              <img src="./images/google_signin_dark.png" alt="Google" />
            </button>
            <button className={styles.button} onClick={onLogin}>
              <img src="./images/github_signin_dark.png" alt="Github" />
            </button>
          </div>
        </div>
        <div className={styles.main__img}>
          <img src="./images/login_img.png" alt="login" />
        </div>
      </section>
    </div>
  );
};

export default Login;
