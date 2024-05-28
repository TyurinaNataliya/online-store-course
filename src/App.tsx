import React, { FC, useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { observer } from "mobx-react-lite";
import { Context } from "./index";
import { check } from "./http/userApi";
import { Spinner } from "react-bootstrap";
import BpmnEditor from "./components/Bpmn";
import DataTables from "./pages/DataTables";

const App: FC = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    check()
      .then((data) => {
        user.setUser(true);
        user.setIsAuth(true);
      })
      .finally(() => setLoading(false));
  }, [user]);
  if (loading) {
    return <Spinner animation="grow" />;
  }

  return (
    <BrowserRouter>
      <BpmnEditor />
      <NavBar />
      {/* <AppRouter /> */}
    </BrowserRouter>
  );
});

export default App;
