import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <div style={{ height: "100%", width: "100%", margin: 0, padding: 0 }}>
      <App />
    </div>
  </React.StrictMode>
);
