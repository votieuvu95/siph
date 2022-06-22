import { Button, Input } from "antd";
import TableWrapper from "components/TableWrapper";
import React, { useEffect, useRef, useState } from "react";
import { Search } from "@mui/icons-material";
import { Main } from "./styled";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {  useSelector } from "react-redux";
import { STATUS } from "constants/index";
import CellACtion from "components/CellAction";
import Pagination from "components/Pagination";
import ModalKhachHang from "./ModalKhachHang";

const KhachHang = () => {
  const { listCustomer } = useSelector((state) => state.customer);
  const modalKhachHangRef = useRef(null);

  const [state, _setState] = useState({ page: 0, size: 10 });
  const setState = (data = {}) => {
    _setState((_state) => ({
      ..._state,
      ...data,
    }));
  };

  useEffect(() => {
    let listCustomer = localStorage.getItem("DATA_ALL_CUSTOMER");
    setState({
      listCustomer: JSON.parse(listCustomer),
    });
  }, [listCustomer]);

  const handleEdit = (data) => {
    modalKhachHangRef.current && modalKhachHangRef.current.show(data);
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
      title: "IP",
      dataIndex: "wlIps",
      key: "wlIps",
      width: 400,
      render: (item) => {
        return (item || [])
          .filter((x) => x.status === 1)
          .map((x1) => {
            return x1.ip;
          })
          .join(", ");
      },
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
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
    if (state?.listCustomer?.length)
      setState({
        listData: state?.listCustomer.slice(
          state.page * state?.size,
          (state.page + 1) * state?.size
        ),
      });
  }, [state?.listCustomer, state?.page, state?.size]);
  const onPageChange = (page) => {
    setState({ page: page - 1 });
  };
  const onSizeChange = (size) => {
    setState({ size: size });
  };

  const onChange = () => (e) => {
    let value = e?.target?.value;
    let data = state?.listCustomer.filter((item) =>
      item.customerName.toLowerCase().includes(value.trim().toLowerCase())
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
            placeholder="Nhập tên khách hàng"
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
              modalKhachHangRef.current && modalKhachHangRef.current.show()
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
            total={state?.listCustomer?.length}
            listData={state?.listData}
            onShowSizeChange={onSizeChange}
            style={{ flex: 1, justifyContent: "flex-end" }}
          />
        )}
      </div>
      <ModalKhachHang ref={modalKhachHangRef} />
    </Main>
  );
};

export default KhachHang;
