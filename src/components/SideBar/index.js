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
                    <Menu.Item
                      key={item2.key}
                      title={""}
                    >
                      <Link to={`${item2.link}`}>
                        <div className="item">
                          <label>{item2.icon} </label>
                          <span style={{ opacity: `${collapsed ? 1 : 0}` }}>
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
