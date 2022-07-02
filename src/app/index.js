import React, { useEffect } from "react";

// import Layout from "app/Layout";
import LayoutLogin from "./LayoutLogin";
import { ConfigProvider } from "antd";
import { Switch, Route } from "react-router-dom";
import { pink } from "themes";
import { ThemeProvider } from "styled-components";
import Layout from "./Layout";
import { useSelector } from "react-redux";
import { GlobalStyle } from "./styled";

const App = ({ ...props }) => {
  const { auth } = useSelector((state) => state.auth);
  useEffect(() => {
    if (
      window.location.pathname !== "/login" &&
      window.location.pathname !== "/logout" &&
      (!auth || !auth?.accessToken)
    ) {
      window.location.href =
        "/login?redirect=" + encodeURIComponent(window.location.href);
    }
  }, []);
  return (
    <ThemeProvider theme={pink}>
      <GlobalStyle/>
      <ConfigProvider>
        <Switch>
          {window.location.pathname.indexOf("login") >= 0 ? (
            <Route exact path={"/login"} component={LayoutLogin} />
          ) : (
            <Route path={"/"} component={Layout} />
          )}
        </Switch>
      </ConfigProvider>
    </ThemeProvider>
  );
};

export default App;
