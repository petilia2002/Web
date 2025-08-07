import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthProvider from "./hoc/AuthProvider";
import ApiRouter from "./router/AppRouter";

function App() {
  return (
    <>
      <AuthProvider>
        <ApiRouter />
      </AuthProvider>
    </>
  );
}

export default App;
