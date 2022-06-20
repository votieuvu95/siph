import React, { useState } from "react";
import { Layout, Popover } from "antd";
import avatar from "assets/images/avatar-demo.png";
import { Main, GlobalStyle } from "./styled";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import MenuIcon from "@mui/icons-material/Menu";
import { PageName } from "constants";
import {
  Logout
} from '@mui/icons-material';
import { useDispatch } from "react-redux";
const { Header } = Layout;
const Index = (props) => {
  const {  onClickIcon } = props;
  const [state, _setState] = useState({ collapsed: false });
  const { onLogout } = useDispatch().auth;

  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const onChangeCollapsed = () => {
    setState({ collapsed: !state.collapsed });
    onClickIcon(!state.collapsed)
  };

  const getTitlePage = () => {
    const url = window.location.pathname;
    switch (true) {
      case url.includes('home'):
        return PageName.HOME;
      case url.includes('trunk-management/detail'):
        return PageName.TRUNK_DETAIL;
      case url.includes('trunk-management'):
        return PageName.TRUNK_MANAGEMENT;
      case url.includes('customer-management/hotline-detail'):
        return PageName.HOTLINE_DETAIL;
      case url.includes('customer-management/virtual-detail'):
        return PageName.VIRTUAL_DETAIL;
      case url.includes('customer-management'):
        return PageName.CUSTOMER_MANAGEMENT;
      case url.includes('hotline-routing'):
        return PageName.HOTLINE_ROUTING;
      case url.includes('virtual-routing'):
        return PageName.VIRTUAL_ROUTING;
      default:
        return '';
    }
  };
  const logout = () => {
    onLogout();
    window.location.href = "/login";
  }
  const content  = (
    <div className="logout" onClick={() => logout()}>
    <Logout fontSize="small" color="action"/>
      <span className="title">Đăng xuất</span>
    </div>
  )
  return (
    <Main>
      <GlobalStyle/>
      <Header className="header">
        <div className="header__left">
          <div className="icon" onClick={() => onChangeCollapsed()}>
            {!state.collapsed ? <ArrowForwardIosIcon /> : <MenuIcon />}
          </div>
          <div className="title">{getTitlePage()}</div>
        </div>
        <div className="header__right">
          <Popover content={content} placement="bottomLeft" trigger={"click"}>
          <img src={avatar} alt="" />
          </Popover>
        </div>
      </Header>
    </Main>
  );
};
export default Index;
