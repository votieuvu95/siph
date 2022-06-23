import { Button, Input } from "antd";
import TableWrapper from "components/TableWrapper";
import React, { useEffect, useRef, useState } from "react";
import { Search } from "@mui/icons-material";
import { Main } from "./styled";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { STATUS } from "constants/index";
import CellACtion from "components/CellAction";
import Pagination from "components/Pagination";
import ModalTrunkHotlineGroup from "./ModalTrunkHotlineGroup";
import { useSelector } from "react-redux";
import ModalHotline from "pages/customerManagement/Hotline/ModalHotline";
import ModalTrunk from "pages/trunkManagement/ModalTrunk";
const HotlineRouting = () => {
  const modalTrunkHotlineRef = useRef(null);
  const modalHotlineRef = useRef(null);
  const modalTrunkRef = useRef(null);
  const { listHotlines } = useSelector((state) => state.hotline);
  const [state, _setState] = useState({ page: 0, size: 10 });
  const setState = (data = {}) => {
    _setState((_state) => ({
      ..._state,
      ...data,
    }));
  };

  useEffect(() => {
    let listHotlines = localStorage.getItem("DATA_ALL_HOTLINE");
    let listTrunkManagement = localStorage.getItem("DATA_ALL_TRUNK_MANAGEMENT");

    setState({
      listHotlines: (JSON.parse(listHotlines) || []).filter(
        (item) => item.trunkName
      ),
      listTrunkManagement: JSON.parse(listTrunkManagement),
    });
  }, [listHotlines]);
  const handleEdit = (data) => {
    modalTrunkHotlineRef.current && modalTrunkHotlineRef.current.show(data);
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
      title: "Tên khách hàng",
      dataIndex: "customerName",
      key: "customerName",
      width: 400,
    },
    {
      title: "Tên nhóm hotline",
      dataIndex: "hotlineGroupName",
      key: "hotlineGroupName",
      width: 400,
      render: (item, data) => (
        <a
          onClick={() =>
            modalHotlineRef.current && modalHotlineRef.current.show(data)
          }
        >
          {item}
        </a>
      ),
    },
    {
      title: "Tên trunk",
      dataIndex: "trunkName",
      key: "trunkName",
      width: 400,
      render: (item, data) => {
        let payload = (state?.listTrunkManagement || []).find(
          (x) => x.id == data?.trunkId
        );
        debugger;
        return (
          <a
            onClick={() =>
              modalTrunkRef.current && modalTrunkRef.current.show(payload)
            }
          >
            {item}
          </a>
        );
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "groupStatus",
      key: "groupStatus",
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
    if (state?.listHotlines?.length) {
      setState({
        listData: state?.listHotlines.slice(
          state.page * state?.size,
          (state.page + 1) * state?.size
        ),
      });
    }
  }, [state?.listHotlines, state?.page, state?.size]);
  const onPageChange = (page) => {
    setState({ page: page - 1 });
  };
  const onSizeChange = (size) => {
    setState({ size: size });
  };
  const onChange = (e) => {
    let value = e?.target?.value;
    let data = state?.listHotlines.filter(
      (item) =>
        item.customerName.toLowerCase().includes(value.trim().toLowerCase()) ||
        item.hotlineGroupName
          .toLowerCase()
          .includes(value.trim().toLowerCase()) ||
        item.trunkName.toLowerCase().includes(value.trim().toLowerCase())
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
              modalTrunkHotlineRef.current &&
              modalTrunkHotlineRef.current.show()
            }
          >
            Tạo mới
          </Button>
        </div>
      </div>
      <div className="table">
        <div className="main-table">
          <TableWrapper
            columns={columns}
            dataSource={state?.listData}
            rowKey={(row) => row.hotlineGroupId}
          />
        </div>
        {!!state?.listData?.length && (
          <Pagination
            onChange={onPageChange}
            current={state?.page + 1}
            pageSize={state?.size}
            total={state?.listHotlines.length}
            listData={state?.listData}
            onShowSizeChange={onSizeChange}
            style={{ flex: 1, justifyContent: "flex-end" }}
          />
        )}
      </div>
      <ModalTrunkHotlineGroup ref={modalTrunkHotlineRef} />
      <ModalHotline ref={modalHotlineRef} />
      <ModalTrunk ref={modalTrunkRef} />
    </Main>
  );
};

export default HotlineRouting;
