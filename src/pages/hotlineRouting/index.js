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
import { useDispatch, useSelector } from "react-redux";
import ModalHotline from "pages/customerManagement/Hotline/ModalHotline";
import ModalTrunk from "pages/trunkManagement/ModalTrunk";
const HotlineRouting = () => {
  const modalTrunkHotlineRef = useRef(null);
  const modalHotlineRef = useRef(null);
  const modalTrunkRef = useRef(null);
  const { listHotlines } = useSelector((state) => state.hotline);
  const { getHotline } = useDispatch().hotline;
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
    let listHotlines = localStorage.getItem("DATA_ALL_HOTLINE");
    let listTrunkManagement = localStorage.getItem("DATA_ALL_TRUNK_MANAGEMENT");
    if (!listHotlines) {
      getHotline();
    }
    if (!listTrunkManagement) {
      getTrunkManagement();
    }
    setState({
      listHotlines: (JSON.parse(listHotlines) || []).filter(
        (item) => item.trunkName
      ),
      listTrunkManagement: JSON.parse(listTrunkManagement),
    });
  }, []);

  useEffect(() => {
    let listHotlines = localStorage.getItem("DATA_ALL_HOTLINE");
    let listTrunkManagement = localStorage.getItem("DATA_ALL_TRUNK_MANAGEMENT");

    setState({
      listHotlines: (JSON.parse(listHotlines) || []).filter(
        (item) => item.trunkName
      ),
      listTrunkManagement: JSON.parse(listTrunkManagement),
    });
  }, [listHotlines, listTrunkManagement]);

  const handleEdit = (data) => {
    modalTrunkHotlineRef.current && modalTrunkHotlineRef.current.show(data);
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
      title: "Tên khách hàng",
      dataIndex: "customerName",
      key: "customerName",
      width: "300px",
      render: (item) => <div className="customer">{item}</div>,
    },
    {
      title: "Tên nhóm hotline",
      dataIndex: "hotlineGroupName",
      key: "hotlineGroupName",
      width: "300px",
      render: (item, data) => (
        <div className="customer">
          <a
            onClick={() =>
              modalHotlineRef.current && modalHotlineRef.current.show(data)
            }
          >
            {item}
          </a>
        </div>
      ),
    },
    {
      title: "Tên trunk",
      dataIndex: "trunkName",
      key: "trunkName",
      width: "300px",
      render: (item, data) => {
        let payload = (state?.listTrunkManagement || []).find(
          (x) => x.id == data?.trunkId
        );
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
      width: "130px",
      align: "center",
      render: (item) => STATUS.find((x) => x.id === item)?.ten,
    },
    {
      title: "Chức năng",
      dataIndex: "action",
      key: "action",
      width: "140px",
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
    if (state?.listHotlines?.length) {
      setState({
        listData: state?.listHotlines.slice(
          state.page * state?.size,
          (state.page + 1) * state?.size
        ),
        totalElements: state?.listHotlines?.length,
      });
    }
  }, [state?.listHotlines, state?.page, state?.size]);
  const onPageChange = (page) => {
    setState({ page: page - 1 });
  };
  const onSizeChange = (size) => {
    setState({ size: size, page: 0 });
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
            placeholder="Nhập tên Khách hàng, Trunk, Hotline"
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
      <TableWrapper
        columns={columns}
        dataSource={state?.listData}
        rowKey={(row) => row.hotlineGroupId}
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
      <ModalTrunkHotlineGroup ref={modalTrunkHotlineRef} />
      <ModalHotline ref={modalHotlineRef} />
      <ModalTrunk ref={modalTrunkRef} />
    </Main>
  );
};

export default HotlineRouting;
