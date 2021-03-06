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
import { useDispatch, useSelector } from "react-redux";
import { CloseOutlined } from "@ant-design/icons";

const ModalTrunk = (props, ref) => {
  const { createOrEditToTrunk, getVirtualNumber } = useDispatch().virtualNumber;
  const { getHotline } = useDispatch().hotline;
  const { getCustomer } = useDispatch().customer;

  const { listHotlines } = useSelector((state) => state.hotline);
  const { listCustomer } = useSelector((state) => state.customer);
  const { listTrunkManagement } = useSelector((state) => state.trunkManagement);
  const { listVirtualNumber } = useSelector((state) => state.virtualNumber);

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
    getCustomer();
    getHotline();
  }, []);
  useEffect(() => {
    setState({
      listCustomer: (listCustomer || []).map((item) => {
        return { id: Number(item.id), ten: item.customerName };
      }),
      listTrunkManagement: (listTrunkManagement || []).map((item) => {
        return {
          id: Number(item.id),
          ten: item.trunkName,
          groupCode: item.groupCode,
        };
      }),
      listHotlines: (listHotlines || []).map((item) => {
        return {
          id: item.hotlineGroupId,
          ten: item.hotlineGroupName,
        };
      }),
      listVirtualNumber: (listVirtualNumber || []).map((item) => {
        return {
          id: item.vngId,
          ten: item.vngName,
          customerId: item.customerId,
        };
      }),
    });
  }, [listHotlines, listCustomer, listTrunkManagement, listVirtualNumber]);
  const onCancel = () => {
    modalTrunkRef.current && modalTrunkRef.current.hide();
    form.resetFields();
  };

  const onChange = (e) => {
    let listData = (listVirtualNumber|| []).map((item) => {
      return {
        id: item.vngId,
        ten: item.vngName,
        customerId: item.customerId,
      };
    });
    setState({
      listVirtualNumber: (listData || []).filter((x) => x.customerId === e),
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
      virtual={state.data?.vngTrunks ? true : false}
      title={
        <MainHeader>
          <div className="left">
            {state?.data?.vngId
              ? "C???p nh???t Trunk cho nh??m Virtual"
              : "T???o Trunk cho nh??m Virtual"}
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
            label="T??n kh??ch h??ng"
            name="customerId"
            rules={[
              {
                required: true,
                message: "T??n kh??ch h??ng kh??ng ???????c ????? tr???ng",
              },
            ]}
          >
            <Select
              data={state?.listCustomer}
              onChange={onChange}
              placeholder="Ch???n kh??ch h??ng"
              disabled={state?.data?.vngTrunks}
            ></Select>
          </Form.Item>
          <Form.Item
            label="T??n nh??m Virtual"
            name="virtualGroupId"
            rules={[
              {
                required: true,
                message: "T??n nh??m Virtual kh??ng ???????c ????? tr???ng",
              },
            ]}
          >
            <Select
              disabled={state?.data?.vngTrunks}
              data={state?.listVirtualNumber}
              placeholder="Ch???n nh??m virtual"
            />
          </Form.Item>
          <Form.Item
            label="Viettel Trunk"
            name="viettelTrunkId"
            rules={[
              {
                required: true,
                message: "Viettel Trunk kh??ng ???????c ????? tr???ng",
              },
            ]}
          >
            <Select
              data={(state?.listTrunkManagement || []).filter(
                (x) => x.groupCode === "11"
              )}
              placeholder="Ch???n viettel trunk"
            ></Select>
          </Form.Item>
          <Form.Item
            label="Mobiphone Trunk"
            name="mobiTrunkId"
            rules={[
              {
                required: true,
                message: "Mobiphone Trunk kh??ng ???????c ????? tr???ng",
              },
            ]}
          >
            <Select
              data={(state?.listTrunkManagement || []).filter(
                (x) => x.groupCode === "22"
              )}
              placeholder="Ch???n mobiphone trunk"
            ></Select>
          </Form.Item>
          <Form.Item
            label="Vinaphone Trunk"
            name="vinaTrunkId"
            rules={[
              {
                required: true,
                message: "Vinaphone Trunk kh??ng ???????c ????? tr???ng",
              },
            ]}
          >
            <Select
              data={(state?.listTrunkManagement || []).filter(
                (x) => x.groupCode === "33"
              )}
              placeholder="Ch???n vinaphone trunk"
            ></Select>
          </Form.Item>
          <Form.Item
            label="Default Trunk"
            name="defaultTrunkId"
            rules={[
              {
                required: true,
                message: "Default Trunk kh??ng ???????c ????? tr???ng",
              },
            ]}
          >
            <Select
              data={(state?.listTrunkManagement || []).filter(
                (x) => x.groupCode === "44"
              )}
              placeholder="Ch???n default trunk"
            ></Select>
          </Form.Item>
          {state?.data?.vngId && (
            <Form.Item
              label="Tr???ng th??i"
              name="status"
              rules={[
                {
                  required: true,
                  message: "Tr???ng th??i kh??ng ???????c ????? tr???ng",
                },
              ]}
            >
              <Select data={STATUS} placeholder="Ch???n tr???ng th??i" />
            </Form.Item>
          )}
        </Form>
        <Button
          className={`${
            !state?.data?.vngId ? "button-create" : "button-update"
          }`}
          onClick={() => onSave()}
        >
          {!state?.data?.vngId ? "T???o m???i" : "C???p nh???t"}
        </Button>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalTrunk);
