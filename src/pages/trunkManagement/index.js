import { Button, Input } from "antd";
import TableWrapper from "components/TableWrapper";
import React, { useEffect, useRef, useState } from "react";
import { Search } from "@mui/icons-material";
import { Main } from "./styled";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useDispatch, useSelector } from "react-redux";
import { STATUS } from "constants/index";
import CellACtion from "components/CellAction";
import ModalTrunk from "./ModalTrunk";
import Pagination from "components/Pagination";

const TrunkManagement = () => {
  const modalTrunkRef = useRef(null);
  const { listTrunkManagement } = useSelector((state) => state.trunkManagement);
  const { getTrunkManagement } = useDispatch().trunkManagement;

  const [state, _setState] = useState({ page: 0, size: 10, totalElements: 0 });
  const setState = (data = {}) => {
    _setState((_state) => ({
      ..._state,
      ...data,
    }));
  };
  useEffect(() => {
    getTrunkManagement();
  }, []);

  const handleEdit = (data) => {
    modalTrunkRef.current && modalTrunkRef.current.show(data);
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      width: "40px",
      align: "center",
      render: (item, data, index) => {
        return index + 1 + state?.page * state?.size;
      },
    },
    {
      title: "Tên trunk",
      dataIndex: "trunkName",
      key: "trunkName",
      width: "300px",
      render:(item) => <div className="item">{item}</div>
    },
    {
      title: "Nhà mạng",
      dataIndex: "groupName",
      key: "groupName",
      width: "300px",
      render:(item) => <div className="item">{item}</div>
    },
    {
      title: "IP:PORT",
      dataIndex: "ip",
      key: "ip",
      width: "200px",
      render: (item, data) => `${data.ip}:${data.port}` 
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: "120px",
      align: "center",
      render: (item) => STATUS.find((x) => x.id === item)?.ten,
    },
    {
      title: "Chức năng",
      dataIndex: "action",
      key: "action",
      width: "120px",
      align: "center",
      render: (item, data) => {
        return (
          <CellACtion
            viewAble={false}
            deleteAble={false}
            handleEdit={() => handleEdit(data)}
          />
        );
      },
    },
  ];

  useEffect(() => {
    if (listTrunkManagement?.length)
      setState({
        listData: listTrunkManagement.slice(
          state.page * state?.size,
          (state.page + 1) * state?.size
        ),
        totalElements: listTrunkManagement?.length,
      });
  }, [listTrunkManagement, state?.page, state?.size]);
  const onPageChange = (page) => {
    setState({ page: page - 1 });
  };
  const onSizeChange = (size) => {
    setState({ size: size, page: 0 });
  };
  const onChange = (e) => {
    let value = e?.target?.value;
    let data = listTrunkManagement?.filter(
      (item) =>
        item.trunkName.toLowerCase().includes(value.trim().toLowerCase()) ||
        item.groupName.toLowerCase().includes(value.trim().toLowerCase()) ||
        item.ip.toLowerCase().includes(value.trim().toLowerCase())
    );
    setState({
      listData: data?.slice(
        state.page * state?.size,
        (state.page + 1) * state?.size
      ),
      totalElements: data.length,
    });
  };
  return (
    <Main>
      <div className="search">
        <div className="search__left">
          <Input
            className="searchField"
            prefix={<Search />}
            placeholder="Nhập tên Trunk"
            onChange={onChange}
          />

          <Button type="primary" className="button-search">
            Tìm kiếm
          </Button>
        </div>
        <div className="search__right">
          <Button
            type="primary"
            className="admin-button"
            icon={<AddCircleIcon />}
            onClick={() =>
              modalTrunkRef.current && modalTrunkRef.current.show()
            }
          >
            Tạo mới
          </Button>
        </div>
      </div>
      <TableWrapper
        columns={columns}
        dataSource={state?.listData}
        rowKey={(row) => row.id}
      />
      <Pagination
        onChange={onPageChange}
        current={state?.page + 1}
        pageSize={state?.size}
        total={state?.totalElements}
        listData={state?.listData}
        onShowSizeChange={onSizeChange}
        style={{ flex: 1, justifyContent: "flex-end" }}
      />
      <ModalTrunk ref={modalTrunkRef} />
    </Main>
  );
};

export default TrunkManagement;
