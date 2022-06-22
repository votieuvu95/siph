import { Tabs } from "antd";
import React from "react";
import { Main } from "./styled";
import KhachHang from "./KhachHang";
import Hotline from "./Hotline";
import Virtual from "./Virtual";
const { TabPane } = Tabs;

const CustomerManagement = () => {
  return (
    <Main>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Khách hàng" key="1">
          <KhachHang />
        </TabPane>
        <TabPane tab="Số Hotline" key="2">
          <Hotline />
        </TabPane>
        <TabPane tab="Số Virtual" key="3">
          <Virtual />
        </TabPane>
      </Tabs>
    </Main>
  );
};

export default CustomerManagement;
