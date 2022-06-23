import { Button, Input } from "antd";
import TableWrapper from "components/TableWrapper";
import React, { useEffect, useRef, useState } from "react";
import { Search } from "@mui/icons-material";
import { Main } from "./styled";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useDispatch, useSelector } from "react-redux";
import { STATUS, STATUS_ID } from "constants/index";
import CellACtion from "components/CellAction";
import Pagination from "components/Pagination";
import ModalHotline from "./ModalHotline";
const Hotline = () => {
  const { listHotlines } = useSelector((state) => state.hotline);
  const { getHotline } = useDispatch().hotline;
  const modalHotlineRef = useRef(null);

  const [state, _setState] = useState({ page: 0, size: 10, totalElements: 0 });
  const setState = (data = {}) => {
    _setState((_state) => ({
      ..._state,
      ...data,
    }));
  };
  useEffect(() => {
    let listHotlines = localStorage.getItem("DATA_ALL_HOTLINE");
    if (!listHotlines) {
      getHotline();
    } else {
      setState({
        listHotlines: JSON.parse(listHotlines),
      });
    }
  }, []);

  useEffect(() => {
    let listHotlines = localStorage.getItem("DATA_ALL_HOTLINE");
    setState({
      listHotlines: JSON.parse(listHotlines),
    });
  }, [listHotlines]);

  const handleEdit = (data) => {
    modalHotlineRef.current && modalHotlineRef.current.show(data);
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
      width: 300,
    },
    {
      title: "Tên nhóm Hotline",
      dataIndex: "hotlineGroupName",
      key: "hotlineGroupName",
      width: 300,
    },
    {
      title: "Số Hotline",
      dataIndex: "hotlines",
      key: "hotlines",
      width: 300,
      render: (item) => {
        return (item || [])
          .filter((x) => x.status === 1)
          .map((x1) => {
            return x1.isdn;
          })
          .join(", ");
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
    if (state?.listHotlines?.length)
      setState({
        listData: state?.listHotlines.slice(
          state.page * state?.size,
          (state.page + 1) * state?.size
        ),
        totalElements: state?.listHotlines?.length,
      });
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
        (item?.hotlines || [])
          .filter((x) => x.status === STATUS_ID.HOAT_DONG)
          .map((x1) => x1.isdn)
          .join(", ")
          .includes(value.trim())
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
            placeholder="Nhập tên Khách hàng, số Hotline"
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
              modalHotlineRef.current && modalHotlineRef.current.show()
            }
          >
            Tạo mới
          </Button>
        </div>
      </div>
      <div className="main-table">
        <TableWrapper
          columns={columns}
          dataSource={state?.listData}
          rowKey={(row) => row.hotlineGroupId}
        />
      </div>
      <Pagination
        onChange={onPageChange}
        current={state?.page + 1}
        pageSize={state?.size}
        total={state?.totalElements}
        listData={state?.listData}
        onShowSizeChange={onSizeChange}
        style={{ flex: 1, justifyContent: "flex-end" }}
      />
      <ModalHotline ref={modalHotlineRef} />
    </Main>
  );
};

export default Hotline;
