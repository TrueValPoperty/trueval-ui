import React from "react";
import ReactDOM from "react-dom/client";
import LogForm from "./LogForm";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="p-6">
      <h1 className="text-2xl mb-4">Log a Property Valuation</h1>
      <LogForm />
    </div>
  </React.StrictMode>
);
