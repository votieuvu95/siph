import { Button, Input } from "antd";
import TableWrapper from "components/TableWrapper";
import React, { useEffect, useRef, useState } from "react";
import { Search } from "@mui/icons-material";
import { Main } from "./styled";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { STATUS } from "constants/index";
import CellACtion from "components/CellAction";
import ModalTrunk from "../trunkManagement/ModalTrunk";
import Pagination from "components/Pagination";
import ModalVirtual from "pages/customerManagement/Virtual/ModalVirtual";
import ModalTrunkGroupVirtual from "./ModalTrunkGroupVirtual";
import { useDispatch, useSelector } from "react-redux";
const VirtualRouting = () => {
  const modalTrunkRef = useRef(null);
  const modalVirtualRef = useRef(null);
  const modalTrunkGroupVirtualRef = useRef(null);
  const [state, _setState] = useState({ page: 0, size: 10, totalElements: 0 });

  const { listTrunkManagement } = useSelector((state) => state.trunkManagement);
  const { listVirtualNumber } = useSelector((state) => state.virtualNumber);
  const { getTrunkManagement } = useDispatch().trunkManagement;
  const { getVirtualNumber } = useDispatch().virtualNumber;

  const setState = (data = {}) => {
    _setState((_state) => ({
      ..._state,
      ...data,
    }));
  };

  useEffect(() => {
    let listVirtualNumber = localStorage.getItem("DATA_ALL_VITURALNUMBER");
    let listTrunkManagement = localStorage.getItem("DATA_ALL_TRUNK_MANAGEMENT");
    if (!listTrunkManagement) {
      getTrunkManagement();
    }
    if (!listVirtualNumber) {
      getVirtualNumber();
    }
    setState({
      listVirtualNumber: (JSON.parse(listVirtualNumber) || []).filter(
        (item) => item.vngTrunks.length
      ),
      listTrunkManagement: JSON.parse(listTrunkManagement),
    });
  }, []);

  useEffect(() => {
    let listVirtualNumber = localStorage.getItem("DATA_ALL_VITURALNUMBER");
    let listTrunkManagement = localStorage.getItem("DATA_ALL_TRUNK_MANAGEMENT");
    setState({
      listVirtualNumber: (JSON.parse(listVirtualNumber) || []).filter(
        (item) => item.vngTrunks.length
      ),
      listTrunkManagement: JSON.parse(listTrunkManagement),
    });
  }, [listTrunkManagement, listVirtualNumber]);

  const handleEdit = (data) => {
    modalTrunkGroupVirtualRef.current &&
      modalTrunkGroupVirtualRef.current.show(data);
  };

  const onShowModal = (item) => {
    let data = (state?.listTrunkManagement || []).find(
      (x) => x.id == item?.trunkId
    );
    modalTrunkRef.current && modalTrunkRef.current.show(data);
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      width: "30px",
      align: "center",
      render: (item, data, index) => {
        return index + 1 + state?.page * state?.size;
      },
    },
    {
      title: "Tên khách hàng",
      dataIndex: "customerName",
      key: "customerName",
      width: "220px",
      render: (item) => <div className="customer">{item}</div>,
    },
    {
      title: "Tên nhóm Virtual",
      dataIndex: "vngName",
      key: "vngName",
      width: "220px",
      render: (item, data) => (
        <div className="customer">
          {" "}
          <a
            onClick={() =>
              modalVirtualRef.current && modalVirtualRef.current.show(data)
            }
          >
            {item}
          </a>
        </div>
      ),
    },
    {
      title: "Viettel Trunk",
      dataIndex: "vngTrunks",
      key: "vngTrunks",
      width: "130px",
      render: (item) => {
        let data = (item || []).find((x) => x.groupCode === "11");
        return <a onClick={() => onShowModal(data)}>{data?.trunkName} </a>;
      },
    },
    {
      title: "Mobiphone Trunk",
      dataIndex: "vngTrunks",
      key: "vngTrunks",
      width: "160px",
      render: (item) => {
        let data = (item || []).find((x) => x.groupCode === "22");
        return <a onClick={() => onShowModal(data)}>{data?.trunkName} </a>;
      },
    },
    {
      title: "Vinaphone Trunk",
      dataIndex: "vngTrunks",
      key: "vngTrunks",
      width: "160px",
      render: (item) => {
        let data = (item || []).find((x) => x.groupCode === "33");
        return <a onClick={() => onShowModal(data)}>{data?.trunkName} </a>;
      },
    },
    {
      title: "Default Trunk",
      dataIndex: "vngTrunks",
      key: "vngTrunks",
      width: "130px",
      render: (item) => {
        let data = (item || []).find((x) => x.groupCode === "44");
        return <a onClick={() => onShowModal(data)}>{data?.trunkName} </a>;
      },
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
    if (state?.listVirtualNumber?.length)
      setState({
        listData: state?.listVirtualNumber.slice(
          state.page * state?.size,
          (state.page + 1) * state?.size
        ),
        totalElements: state?.listVirtualNumber?.length,
      });
  }, [state?.listVirtualNumber, state?.page, state?.size]);
  const onPageChange = (page) => {
    setState({ page: page - 1 });
  };
  const onSizeChange = (size) => {
    setState({ size: size, page: 0 });
  };

  const onChange = (e) => {
    let value = e?.target?.value;
    let data = state?.listVirtualNumber.filter(
      (item) =>
        item.customerName.toLowerCase().includes(value.trim().toLowerCase()) ||
        item.vngName.toLowerCase().includes(value.trim().toLowerCase()) ||
        !!item.vngTrunks.find((trunk) =>
          trunk.trunkName.toLowerCase().includes(value.trim().toLowerCase())
        )
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
            placeholder="Nhập tên Khách hàng, Trunk, Virtual"
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
              modalTrunkGroupVirtualRef.current &&
              modalTrunkGroupVirtualRef.current.show()
            }
          >
            Tạo mới
          </Button>
        </div>
      </div>
      <TableWrapper
        columns={columns}
        dataSource={state?.listData}
        rowKey={(row) => row.vngId}
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
      <ModalVirtual ref={modalVirtualRef} />
      <ModalTrunkGroupVirtual ref={modalTrunkGroupVirtualRef} />
    </Main>
  );
};

export default VirtualRouting;
