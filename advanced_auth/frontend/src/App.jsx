import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/index";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ApiRouter from "./router/AppRouter";

function App() {
  return (
    <Provider store={store}>
      <ApiRouter />
    </Provider>
  );
}

export default App;
