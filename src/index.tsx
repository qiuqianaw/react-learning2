import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// 引入 antd
import "antd/dist/antd.min.css";
// 引入 sass 文件
import "./index.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
