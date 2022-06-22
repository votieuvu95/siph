import { Button, Input } from "antd";
import TableWrapper from "components/TableWrapper";
import React, { useEffect, useRef, useState } from "react";
import { Search } from "@mui/icons-material";
import { Main } from "./styled";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useDispatch, useSelector } from "react-redux";
import { STATUS } from "constants/index";
import CellACtion from "components/CellAction";
import Pagination from "components/Pagination";
import ModalVirtual from "./ModalVirtual";
const Virtual = () => {
  const { listVirtualNumber } = useSelector((state) => state.virtualNumber);
  const { getVirtualNumber } = useDispatch().virtualNumber;
  const modalVirtualkRef = useRef(null);
  const [state, _setState] = useState({ page: 0, size: 10 });
  const setState = (data = {}) => {
    _setState((_state) => ({
      ..._state,
      ...data,
    }));
  };
  useEffect(() => {
    getVirtualNumber();
  }, []);

  const handleEdit = (data) => {
    modalVirtualkRef.current && modalVirtualkRef.current.show(data);
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
      title: "Tên nhóm Virtual",
      dataIndex: "vngName",
      key: "vngName",
      width: 400,
    },
    {
      title: "Số Virtual",
      dataIndex: "virtualNumbers",
      key: "virtualNumbers",
      width: 400,
      render:(item) => {
        return (item || [])
          .filter((x) => x.status === 1)
          .map((x1) => {
            return x1.isdn;
          })
          .join(", ");   
      }
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
    if (listVirtualNumber.length)
      setState({
        listData: listVirtualNumber
          
          .slice(state.page * state?.size, (state.page + 1) * state?.size),
      });
  }, [listVirtualNumber, state?.page, state?.size]);
  const onPageChange = (page) => {
    setState({ page: page - 1 });
  };
  const onSizeChange = (size) => {
    setState({ size: size });
  };

  const onKeyDown = (e) => {
    let value = e?.target?.value;
    if (e.nativeEvent.code === "Enter") {
      let data = listVirtualNumber
        
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
              modalVirtualkRef.current && modalVirtualkRef.current.show()
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
            total={listVirtualNumber.length}
            listData={state?.listData}
            onShowSizeChange={onSizeChange}
            style={{ flex: 1, justifyContent: "flex-end" }}
          />
        )}
      </div>
      <ModalVirtual ref={modalVirtualkRef}/> 
    </Main>
  );
};

export default Virtual;
