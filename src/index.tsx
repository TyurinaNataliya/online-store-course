import React, { createContext } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import UserStore from "./store/UserStore";
import DeviceStore from "./store/DeviceStore";
import DiagrammStore from "./store/DiagrammStore";

interface AppContextData {
  user: Record<string, any>;
  device: Record<string, any>;
  diagramm: Record<string, any>;
}

export const Context = createContext<AppContextData>({
  device: {},
  user: {},
  diagramm: {},
});

ReactDOM.render(
  <Context.Provider
    value={{
      user: new UserStore(),
      device: new DeviceStore(),
      diagramm: new DiagrammStore(),
    }}
  >
    <App />
  </Context.Provider>,
  document.getElementById("root")
);
