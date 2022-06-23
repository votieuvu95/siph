import { Button, Input } from "antd";
import TableWrapper from "components/TableWrapper";
import React, { useEffect, useRef, useState } from "react";
import { Search } from "@mui/icons-material";
import { Main } from "./styled";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useSelector } from "react-redux";
import { STATUS } from "constants/index";
import CellACtion from "components/CellAction";
import ModalTrunk from "./ModalTrunk";
import Pagination from "components/Pagination";

const TrunkManagement = () => {
  const modalTrunkRef = useRef(null);
  const { listTrunkManagement } = useSelector((state) => state.trunkManagement);
  const [state, _setState] = useState({ page: 0, size: 10 });
  const setState = (data = {}) => {
    _setState((_state) => ({
      ..._state,
      ...data,
    }));
  };
  useEffect(() => {
    let listTrunkManagement = localStorage.getItem("DATA_ALL_TRUNK_MANAGEMENT");
    setState({
      listTrunkManagement: JSON.parse(listTrunkManagement),
    });
  }, [listTrunkManagement]);

  const handleEdit = (data) => {
    modalTrunkRef.current && modalTrunkRef.current.show(data);
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      width: 70,
      render: (item, data, index) => {
        return index + 1;
      },
    },
    {
      title: "Tên Trunk",
      dataIndex: "trunkName",
      key: "trunkName",
      width: 400,
    },
    {
      title: "Nhà mạng",
      dataIndex: "groupName",
      key: "groupName",
      width: 400,
    },
    {
      title: "IP:PORT",
      dataIndex: "ip",
      key: "ip",
      width: 400,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (item) => STATUS.find((x) => x.id === item)?.ten,
    },
    {
      title: "Chức năng",
      dataIndex: "action",
      key: "action",
      width: 100,
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
    if (state?.listTrunkManagement?.length)
      setState({
        listData: state?.listTrunkManagement.slice(
          state.page * state?.size,
          (state.page + 1) * state?.size
        ),
      });
  }, [state?.listTrunkManagement, state?.page, state?.size]);
  const onPageChange = (page) => {
    setState({ page: page - 1 });
  };
  const onSizeChange = (size) => {
    setState({ size: size });
  };

  const onChange = (e) => {
    let value = e?.target?.value;
    let data = state?.listTrunkManagement.filter(
      (item) =>
        item.trunkName.toLowerCase().includes(value.trim().toLowerCase()) ||
        item.groupName.toLowerCase().includes(value.trim().toLowerCase()) ||
        item.ip.toLowerCase().includes(value.trim().toLowerCase())
    );
    setState({
      listData: data.slice(
        state.page * state?.size,
        (state.page + 1) * state?.size
      ),
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
            onChange={onChange()}
            
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
      <div className="table">
        <div className="main-table">
          <TableWrapper columns={columns} dataSource={state?.listData} />
        </div>
        {!!state?.listData?.length && (
          <Pagination
            onChange={onPageChange}
            current={state?.page + 1}
            pageSize={state?.size}
            total={state?.listTrunkManagement?.length}
            listData={state?.listData}
            onShowSizeChange={onSizeChange}
            style={{ flex: 1, justifyContent: "flex-end" }}
          />
        )}
      </div>
      <ModalTrunk ref={modalTrunkRef} />
    </Main>
  );
};

export default TrunkManagement;
