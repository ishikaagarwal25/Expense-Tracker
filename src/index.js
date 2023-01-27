import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AppProvider } from "./context/context";
import { SpeechProvider } from "@speechly/react-client";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <SpeechProvider
      appId={process.env.REACT_APP_SPEECHLY_API_KEY}
      language="en-US"
    >
      <AuthProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </AuthProvider>
    </SpeechProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
