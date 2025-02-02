import { useState } from "react";
import Router from "./routes/Router";
import { AuthProvider } from "./auth/AuthProvider";
import "./App.css";

function App() {
  return (
    <>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </>
  );
}

export default App;
