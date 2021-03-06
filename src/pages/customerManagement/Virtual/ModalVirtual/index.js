import { Button, Form, Input, Select as SelectAntd } from "antd";
import ModalTemplate from "components/ModalTemplate";
import Select from "components/Select";
import { Main, MainHeader } from "./styled";
import React, {
  useState,
  useImperativeHandle,
  useRef,
  forwardRef,
  useEffect,
  useMemo,
} from "react";
import { STATUS } from "constants/index";
import { useDispatch, useSelector } from "react-redux";
import { CloseOutlined } from "@ant-design/icons";

const { Option } = SelectAntd;

const ModalVirtual = (props, ref) => {
  const { createOrEdit, getVirtualNumber } = useDispatch().virtualNumber;
  const { listCustomer } = useSelector((state) => state.customer);
  const { getCustomer } = useDispatch().customer;

  const [form] = Form.useForm();
  const refModal = useRef(null);
  const [state, _setState] = useState({ isError: false });
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
          isdns: (data?.virtualNumbers || [])
            .filter((x) => x.status === 1)
            .map((x1) => {
              return x1.isdn;
            }),
        });
      }
      refModal.current && refModal.current.show();
    },
  }));

  const onCancel = () => {
    refModal.current && refModal.current.hide();
    form.resetFields();
  };

  useEffect(() => {
    getCustomer();
  }, []);
  useEffect(() => {
    setState({
      listDataCustomer: (listCustomer || []).map((item) => {
        return { id: Number(item.id), ten: item.customerName };
      }),
    });
  }, [listCustomer]);

  const onHandleSubmit = (values) => {
    const payload = {
      ...values,
      vngId: state?.data?.vngId,
      dataVirtualNumbers,
    };
    createOrEdit(payload).then(() => {
      getVirtualNumber();
      onCancel();
    });
  };

  const onSave = () => {
    form.submit();
  };

  const dataVirtualNumbers = useMemo(() => {
    return (state?.data?.virtualNumbers || []).map((item) => {
      return { value: item?.vnId, label: item.isdn };
    });
  }, [state?.data?.virtualNumbers]);

  const validator = (rule, value, callback) => {
    let regex = /^((?!(0))[0-9]{6})$/;
    let dataArray = [];
    value.map((item) => {
      let data = item.split(",");
      data.map((x) => x.length && dataArray.push(x));
    });
    form.setFieldsValue({ isdns: dataArray });
    if (dataArray.length) {
      let datareg = dataArray.filter((x) => !regex.test(String(x)));
      if (datareg.length) {
        setState({ isError: true });
        callback(new Error("Vui l??ng nh???p ????ng ?????nh d???ng s??? Virtual"));
      } else {
        callback();
        setState({ isError: false });
      }
    } else {
      callback();
      setState({ isError: false });
    }
  };

  return (
    <ModalTemplate
      ref={refModal}
      title={
        <MainHeader>
          <div className="left">
            {state?.data?.vngId
              ? "C???p nh???p nh??m Virtual"
              : "T???o m???i nh??m Virtual"}
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
                message: "T??n Kh??ch h??ngi kh??ng ???????c ????? tr???ng",
              },
            ]}
          >
            <Select
              disabled={state?.data?.vngId}
              data={state?.listDataCustomer}
              placeholder="Ch???n kh??ch h??ng"
            />
          </Form.Item>
          <Form.Item
            label="T??n nh??m Virtual"
            name="vngName"
            rules={[
              {
                required: true,
                message: "T??n nh??m Virtual kh??ng ???????c ????? tr???ng",
              },
              {
                whitespace: true,
                message: "T??n nh??m Virtual kh??ng ???????c ????? tr???ng",
              },
              {
                max: 35,
                message: "T??n nh??m Virtual nh??? h??n 35 k?? t???",
              },
            ]}
          >
            <Input placeholder="Nh???p t??n nh??m virutal" />
          </Form.Item>
          <Form.Item
            label="S??? Virtual"
            name="isdns"
            rules={[
              {
                required: true,
                message: "S??? Virtual kh??ng ???????c ????? tr???ng",
              },
              { validator: validator },
            ]}
          >
            <SelectAntd
              mode="tags"
              placeholder="Nh???p s??? virtual"
              className={`${state?.isError ? "select-error" : ""}`}
            >
              {(dataVirtualNumbers || []).map((item) => {
                return <Option value={item.label} key={item.value}></Option>;
              })}
            </SelectAntd>
          </Form.Item>
          {state?.isError && (
            <div className="error">Vui l??ng nh???p ????ng ?????nh d???ng s??? Virtual</div>
          )}
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

export default forwardRef(ModalVirtual);
