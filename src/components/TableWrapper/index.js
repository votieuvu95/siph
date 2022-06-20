import React from "react";
import { Table } from "antd";
import { Main } from "./styled";

const TableWrapper = (props) => {
  const { scroll = {}, ...rest } = props;
  return (
    <Main >
      <Table
        {...rest}
        bordered
        scroll={{ y: scroll.y || 370, x: scroll.x || 500 }}
        pagination={false}
      />
    </Main>
  );
};
export default TableWrapper;
