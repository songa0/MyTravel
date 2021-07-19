import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app";
import reportWebVitals from "./reportWebVitals";
import authService from "./service/auth_service";
import DBService from "./service/db_service";
import FileUploader from "./service/file_uploader";

const auth = new authService();
const db = new DBService();
const uploader = new FileUploader();

ReactDOM.render(
  <React.StrictMode>
    <App authService={auth} dbService={db} fileUploader={uploader} />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
