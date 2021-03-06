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

const ModalTrunkHotlineGroup = (props, ref) => {
  const { createOrEditTrunkToHotline, getHotline } = useDispatch().hotline;
  const { listHotlines } = useSelector((state) => state.hotline);
  const { listCustomer } = useSelector((state) => state.customer);
  const { listTrunkManagement } = useSelector((state) => state.trunkManagement);
  const { getCustomer } = useDispatch().customer;

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
      if (data?.hotlineGroupId) {
        form.setFieldsValue({ ...data, status: data?.groupStatus });
      }
      modalTrunkRef.current && modalTrunkRef.current.show();
    },
  }));

  useEffect(() => {
    getCustomer();
  }, []);

  useEffect(() => {
    setState({
      listCustomer: (listCustomer || []).map((item) => {
        return { id: Number(item.id), ten: item.customerName };
      }),
      listTrunkManagement: (listTrunkManagement || []).map((item) => {
        return { id: Number(item.id), ten: item.trunkName };
      }),
      listHotlines: (listHotlines || []).map((item) => {
        return {
          id: item.hotlineGroupId,
          ten: item.hotlineGroupName,
        };
      }),
    });
  }, [listHotlines, listCustomer, listTrunkManagement]);
  const onCancel = () => {
    modalTrunkRef.current && modalTrunkRef.current.hide();
    form.resetFields();
  };

  const onHandleSubmit = (values) => {
    const payload = {
      ...values,
      id: state?.data?.hotlineGroupId,
    };
    createOrEditTrunkToHotline(payload).then(() => {
      getHotline();
      onCancel();
    });
  };

  const onSave = () => {
    form.submit();
  };

  const onChange = (e) => {
    let listData = (listHotlines || []).map((item) => {
      return {
        id: Number(item.hotlineGroupId),
        ten: item.hotlineGroupName,
        customerId: item.customerId,
      };
    });
    setState({
      listHotlines: (listData || []).filter((x) => x.customerId === e),
    });
  };
  return (
    <ModalTemplate
      ref={modalTrunkRef}
      title={
        <MainHeader>
          <div className="left">
            {state?.data?.hotlineGroupId
              ? "C???p nh???t Trunk cho nh??m Hotline"
              : "T???o Trunk cho nh??m Hotline"}
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
                message: "T??n kh??ch h??ng kh??ng ???????c ????? tr??ng",
              },
            ]}
          >
            <Select
              data={state?.listCustomer}
              onChange={onChange}
              disabled={state?.data?.hotlineGroupId}
              placeholder="Ch???n kh??ch h??ng"
            ></Select>
          </Form.Item>
          <Form.Item
            label="T??n nh??m hotline"
            name="hotlineGroupId"
            rules={[
              {
                required: true,
                message: "T??n nh??m hotline kh??ng ???????c ????? tr???ng",
              },
            ]}
          >
            <Select
              data={state?.listHotlines}
              disabled={state?.data?.hotlineGroupId}
              placeholder="Ch???n t??n nh??m hotline"
            />
          </Form.Item>
          <Form.Item
            label="T??n trunk"
            name="trunkId"
            rules={[
              {
                required: true,
                message: "T??n trunk kh??ng ???????c ????? tr???ng",
              },
            ]}
          >
            <Select
              data={state?.listTrunkManagement}
              placeholder="Ch???n trunk"
            ></Select>
          </Form.Item>
          {state?.data?.hotlineGroupId && (
            <Form.Item
              label="Tr???ng th??i"
              name="status"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng ch???n tr???ng th??i!",
                },
              ]}
            >
              <Select data={STATUS} placeholder="Ch???n tr???ng th??i" />
            </Form.Item>
          )}
        </Form>
        <Button
          className={`${
            !state?.data?.hotlineGroupId ? "button-create" : "button-update"
          }`}
          onClick={() => onSave()}
        >
          {!state?.data?.hotlineGroupId ? "T???o m???i" : "C???p nh???t"}
        </Button>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalTrunkHotlineGroup);
