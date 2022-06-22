import React from "react";
import { Layout, Menu } from "antd";
import { Link, useHistory } from "react-router-dom";
import logo from "assets/images/leeon-logo.png";
import { Main } from "./styled";
import {
  ListAlt,
  ManageAccounts,
  PhoneForwarded,
  Route,
} from "@mui/icons-material";
import miniLogo from "assets/images/mini-logo.png";
import { PageName } from "constants/index";

const { Sider } = Layout;

const SideBar = (props) => {
  const { collapsed } = props;
  const history = useHistory();

  const dataMenu = [
    {
      key: "1",
      title: "MANAGEMENT",
      menu: [
        {
          key: "trunk-management",
          title: "Trunk Management",
          link: "/admin/trunk-management",
          icon: <ListAlt fontSize="small" />,
        },
        {
          key: "customer-management",
          title: "Customer Management",
          link: "/admin/customer-management",
          icon: <ManageAccounts fontSize="small" />,
        },
      ],
    },
    {
      key: "2",
      title: "ROUTING",
      menu: [
        {
          key: "hotline-routing",
          title: "Hotline Routing",
          link: "/admin/hotline-routing",
          icon: <PhoneForwarded fontSize="small" />,
        },
        {
          key: "virtual-routing",
          title: "Virtual Number Routing",
          link: "/admin/virtual-routing",
          icon: <Route fontSize="small" />,
        },
      ],
    },
  ];
  const onPageHome = () => {
    history.push("/admin/home");
  };
 
  const getTitlePage = () => {
    const url = window.location.pathname;
    switch (true) {
      case url.includes("home"):
        return PageName.HOME;
      case url.includes("trunk-management/detail"):
        return PageName.TRUNK_DETAIL;
      case url.includes("trunk-management"):
        return PageName.TRUNK_MANAGEMENT;
      case url.includes("customer-management/hotline-detail"):
        return PageName.HOTLINE_DETAIL;
      case url.includes("customer-management/virtual-detail"):
        return PageName.VIRTUAL_DETAIL;
      case url.includes("customer-management"):
        return PageName.CUSTOMER_MANAGEMENT;
      case url.includes("hotline-routing"):
        return PageName.HOTLINE_ROUTING;
      case url.includes("virtual-routing"):
        return PageName.VIRTUAL_ROUTING;
      default:
        return "";
    }
  };

  return (
    <Main style={{ width: `${collapsed ? "250px" : "80px"}` }}>
      <Sider trigger={null} collapsible collapsed={!collapsed}>
        <div className={collapsed ? "logo" : "miniLogo"}>
          <img
            src={collapsed ? logo : miniLogo}
            alt=""
            width={collapsed ? 120 : 25}
            height={collapsed ? 60 : 25}
            onClick={() => onPageHome()}
          />
        </div>
        <Menu>
          {(dataMenu || []).map((item) => {
            return (
              <Menu.ItemGroup
                key={item.key}
                title={collapsed ? item.title : ""}
              >
                {(item.menu || []).map((item2) => {
                  return (
                    <Menu.Item key={item2.key} title={""}>
                      <Link to={`${item2.link}`}>
                        <div
                          className={`item ${
                            getTitlePage() === item2.title ? "color" : ""
                          }`}
                        >
                          <label style={{ lineHeight: "15px" }}>
                            {item2.icon}{" "}
                          </label>
                          <span
                            style={{
                              opacity: `${collapsed ? 1 : 0}`,
                              paddingLeft: "10px",
                            }}
                          >
                            {item2.title}
                          </span>
                        </div>
                      </Link>
                    </Menu.Item>
                  );
                })}
              </Menu.ItemGroup>
            );
          })}
        </Menu>
      </Sider>
    </Main>
  );
};

export default SideBar;
