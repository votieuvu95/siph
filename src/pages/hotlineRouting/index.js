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

const HotlineRouting = () => {
  const { listTrunkManagement } = useSelector((state) => state.trunkManagement);
  const { getTrunkManagement, searchGroup } = useDispatch().trunkManagement;
  const modalTrunkRef = useRef(null);

  const [state, _setState] = useState({ page: 0, size: 10 });
  const setState = (data = {}) => {
    _setState((_state) => ({
      ..._state,
      ...data,
    }));
  };
  useEffect(() => {
    getTrunkManagement();
    searchGroup();
  }, []);

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
    if (listTrunkManagement.length)
      setState({
        listData: listTrunkManagement
          .concat(listTrunkManagement)
          .slice(state.page * state?.size, (state.page + 1) * state?.size),
      });
  }, [listTrunkManagement, state?.page, state?.size]);
  const onPageChange = (page) => {
    setState({ page: page - 1 });
  };
  const onSizeChange = (size) => {
    setState({ size: size });
  };

  const onKeyDown = (e) => {
    let value = e?.target?.value;
    if (e.nativeEvent.code === "Enter") {
      let data = listTrunkManagement
        .concat(listTrunkManagement)
        .filter((item) =>
          item.trunkName.toLowerCase().includes(value.trim().toLowerCase())
        );
      setState({
        listData: data.slice(
          state.page * state?.size,
          (state.page + 1) * state?.size
        ),
      });
    }
  };
  return (
    <Main>
      <div className="search">
        <div className="search__left">
          <Input
            className="searchField"
            prefix={<Search />}
            placeholder="Nhập tên Trunk"
            onKeyDown={onKeyDown}
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
        <div className="main-table"><TableWrapper columns={columns} dataSource={state?.listData} /></div>
        {!!state?.listData?.length && (
          <Pagination
            onChange={onPageChange}
            current={state?.page + 1}
            pageSize={state?.size}
            total={listTrunkManagement.concat(listTrunkManagement).length}
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

export default HotlineRouting;
