import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app";
import reportWebVitals from "./reportWebVitals";
import authService from "./service/auth_service";
import DBService from "./service/db_service";

const auth = new authService();
const db = new DBService();

ReactDOM.render(
  <React.StrictMode>
    <App authService={auth} dbService={db} />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
