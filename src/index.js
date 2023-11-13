import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import "bulma/css/bulma.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Router>
      <App />
    </Router>
);