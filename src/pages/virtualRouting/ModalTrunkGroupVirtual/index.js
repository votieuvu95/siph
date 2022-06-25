import { Button, Form } from "antd";
import ModalTemplate from "components/ModalTemplate";
import Select from "components/Select";
import { Main, MainHeader } from "./styled";
import React, {
  useState,
  useImperativeHandle,
  useRef,
  forwardRef,
  useEffect,
} from "react";
import { STATUS } from "constants/index";
import { useDispatch } from "react-redux";
import { CloseOutlined } from "@ant-design/icons";

const ModalTrunk = (props, ref) => {
  const { createOrEditToTrunk, getVirtualNumber } = useDispatch().virtualNumber;

  const [form] = Form.useForm();
  const modalTrunkRef = useRef(null);
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((_state) => ({
      ..._state,
      ...data,
    }));
  };

  useImperativeHandle(ref, () => ({
    show: (data = {}) => {
      setState({ data: data });
      if (data?.vngId) {
        form.setFieldsValue({
          ...data,
          viettelTrunkId: (data.vngTrunks || []).find(
            (x) => x.groupCode === "11"
          )?.trunkId,
          mobiTrunkId: (data.vngTrunks || []).find((x) => x.groupCode === "22")
            ?.trunkId,
          vinaTrunkId: (data.vngTrunks || []).find((x) => x.groupCode === "33")
            ?.trunkId,
          defaultTrunkId: (data.vngTrunks || []).find(
            (x) => x.groupCode === "44"
          )?.trunkId,
          virtualGroupId: data?.vngId,
        });
      }
      modalTrunkRef.current && modalTrunkRef.current.show();
    },
  }));

  useEffect(() => {
    let listCustomer = localStorage.getItem("DATA_ALL_CUSTOMER");
    let listTrunkManagement = localStorage.getItem("DATA_ALL_TRUNK_MANAGEMENT");
    let listHotlines = localStorage.getItem("DATA_ALL_HOTLINE");
    let listVirtualNumber = localStorage.getItem("DATA_ALL_VITURALNUMBER");
    setState({
      listCustomer: (JSON.parse(listCustomer) || []).map((item) => {
        return { id: Number(item.id), ten: item.customerName };
      }),
      listTrunkManagement: (JSON.parse(listTrunkManagement) || []).map(
        (item) => {
          return {
            id: Number(item.id),
            ten: item.trunkName,
            groupCode: item.groupCode,
          };
        }
      ),
      listHotlines: (JSON.parse(listHotlines) || []).map((item) => {
        return {
          id: item.hotlineGroupId,
          ten: item.hotlineGroupName,
        };
      }),
      listVirtualNumber: (JSON.parse(listVirtualNumber) || []).map((item) => {
        return {
          id: item.vngId,
          ten: item.vngName,
          customerId: item.customerId,
        };
      }),
    });
  }, []);
  const onCancel = () => {
    modalTrunkRef.current && modalTrunkRef.current.hide();
    form.resetFields();
  };

  const onChange = (e) => {
    setState({
      listVirtualNumber: (state?.listVirtualNumber || [])
        .filter((x) => x.customerId === e)
        .map((item) => {
          return {
            id: item.id,
            ten: item.ten,
          };
        }),
    });
    form.setFieldsValue({ virtualGroupId: null });
  };

  const onHandleSubmit = (values) => {
    const payload = {
      ...values,
      vngId: values.virtualGroupId,
      vngTrunks: state.data?.vngTrunks,
    };
    createOrEditToTrunk(payload).then(() => {
      getVirtualNumber();
      onCancel();
    });
  };

  const onSave = () => {
    form.submit();
  };
  return (
    <ModalTemplate
      ref={modalTrunkRef}
      title={
        <MainHeader>
          <div className="left">
            {state?.data?.vngId
              ? "Cập nhật Trunk cho nhóm Virtual"
              : "Tạo Trunk cho nhóm Virtual"}
          </div>
          <div className="right" onClick={() => onCancel()}>
            <CloseOutlined />
          </div>
        </MainHeader>
      }
      closable={false}
      width={600}
    >
      <Main>
        <Form
          layout="vertical"
          form={form}
          className="form-custom"
          onFinish={onHandleSubmit}
        >
          <Form.Item
            label="Tên khách hàng"
            name="customerId"
            rules={[
              {
                required: true,
                message: "Tên khách hàng không được để trống",
              },
            ]}
          >
            <Select
              data={state?.listCustomer}
              onChange={onChange}
              placeholder="Chọn khách hàng"
              disabled={state?.data}
            ></Select>
          </Form.Item>
          <Form.Item
            label="Tên nhóm Virtual"
            name="virtualGroupId"
            rules={[
              {
                required: true,
                message: "Tên nhóm Virtual không được để trống",
              },
            ]}
          >
            <Select
              disabled={state?.data}
              data={state?.listVirtualNumber}
              placeholder="Chọn nhóm virtual"
            />
          </Form.Item>
          <Form.Item
            label="Viettel Trunk"
            name="viettelTrunkId"
            rules={[
              {
                required: true,
                message: "Viettel Trunk không được để trống",
              },
            ]}
          >
            <Select
              data={(state?.listTrunkManagement || []).filter(
                (x) => x.groupCode === "11"
              )}
              placeholder="Chọn viettel trunk"
            ></Select>
          </Form.Item>
          <Form.Item
            label="Mobiphone Trunk"
            name="mobiTrunkId"
            rules={[
              {
                required: true,
                message: "Mobiphone Trunk không được để trống",
              },
            ]}
          >
            <Select
              data={(state?.listTrunkManagement || []).filter(
                (x) => x.groupCode === "22"
              )}
              placeholder="Chọn mobiphone trunk"
            ></Select>
          </Form.Item>
          <Form.Item
            label="Vinaphone Trunk"
            name="vinaTrunkId"
            rules={[
              {
                required: true,
                message: "Vinaphone Trunk không được để trống",
              },
            ]}
          >
            <Select
              data={(state?.listTrunkManagement || []).filter(
                (x) => x.groupCode === "33"
              )}
              placeholder="Chọn vinaphone trunk"
            ></Select>
          </Form.Item>
          <Form.Item
            label="Default Trunk"
            name="defaultTrunkId"
            rules={[
              {
                required: true,
                message: "Default Trunk không được để trống",
              },
            ]}
          >
            <Select
              data={(state?.listTrunkManagement || []).filter(
                (x) => x.groupCode === "44"
              )}
              placeholder="Chọn default trunk"
            ></Select>
          </Form.Item>
          {state?.data?.vngId && (
            <Form.Item
              label="Trạng thái"
              name="status"
              rules={[
                {
                  required: true,
                  message: "Trạng thái không được để trống",
                },
              ]}
            >
              <Select data={STATUS} placeholder="Chọn trạng thái" />
            </Form.Item>
          )}
        </Form>
        <Button
          className={`${
            !state?.data?.vngId ? "button-create" : "button-update"
          }`}
          onClick={() => onSave()}
        >
          {!state?.data?.vngId ? "Tạo mới" : "Cập nhật"}
        </Button>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalTrunk);
