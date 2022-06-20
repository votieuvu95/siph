import React, { useState } from "react";
import { Layout } from "antd";
import Pages from "pages";
import SideBar from "components/SideBar";
import Header from "components/Header";
import { MainPage } from "./styled";
const { Content } = Layout;

const LayoutLogin = () => {
  const [state, _setState] = useState({ collapsed: true });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const onClickIcon = (data) => {
    setState({ collapsed: !state.collapsed });
  };
  return (
    <MainPage>
      <Layout style={{height:"100%"}}>
        <SideBar collapsed={state.collapsed} />
        <Layout>
          <Header onClickIcon={onClickIcon} />
          <Content className={`gx-layout-content `}>
            <Pages />
          </Content>
        </Layout>
      </Layout>
    </MainPage>
  );
};
export default LayoutLogin;
