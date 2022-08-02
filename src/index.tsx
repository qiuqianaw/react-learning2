import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// 引入sass文件
import "./index.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
