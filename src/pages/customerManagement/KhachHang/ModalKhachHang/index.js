import { Button, Form, Input, Select as SelectAntd } from "antd";
import ModalTemplate from "components/ModalTemplate";
import { Main, MainHeader } from "./styled";
import React, {
  useState,
  useImperativeHandle,
  useRef,
  forwardRef,
  useMemo,
} from "react";
import { useDispatch } from "react-redux";
import { CloseOutlined } from "@ant-design/icons";
const { TextArea } = Input;
const { Option } = SelectAntd;
const ModalKhachHang = (props, ref) => {
  const { createOrEdit, getCustomer } = useDispatch().customer;
  const { getHotline } = useDispatch().hotline;
  const { getVirtualNumber } = useDispatch().virtualNumber;

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
      setState({ data: data, id: data.id });
      if (data?.id) {
        form.setFieldsValue({
          ...data,
          ips: (data?.wlIps || [])
            .filter((x) => x.status === 1)
            .map((x1) => {
              return x1.ip;
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

  const onHandleSubmit = (values) => {
    const payload = {
      ...values,
      id: state?.data?.id,
      dataIp: dataIp,
    };
    createOrEdit(payload).then((s) => {
      getCustomer();
      onCancel();
      if (state?.data?.id) {
        getVirtualNumber();
        getHotline();
      }
    });
  };

  const dataIp = useMemo(() => {
    return (state?.data?.wlIps || []).map((item) => {
      return { value: item?.wlIpId, label: item.ip };
    });
  }, [state?.data?.wlIps]);

  const onSave = () => {
    form.submit();
  };

  const validator = (rule, value, callback) => {
    let regex =
      /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

    let dataArray = [];
    value.map((item) => {
      let data = item.split(",");
      data.map((x) => x.length && dataArray.push(x));
    });
    form.setFieldsValue({ ips: dataArray });
    if (dataArray.length) {
      let datareg = dataArray.filter((x) => !regex.test(String(x)));
      if (datareg.length) {
        setState({ isError: true });
        callback(new Error("Vui l??ng nh???p ????ng ?????nh d???ng IP"));
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
            {state?.data?.id ? "C???p nh???t kh??ch h??ng" : "T???o m???i kh??ch h??ng"}
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
            name="customerName"
            rules={[
              {
                required: true,
                message: "T??n kh??ch h??ng kh??ng ???????c ????? tr???ng",
              },
              {
                max: 35,
                message: "T??n kh??ch h??ng nh??? h??n 35 k?? t???",
              },
            ]}
          >
            <Input placeholder="Nh???p t??n kh??ch h??ng" ></Input>
          </Form.Item>
          <Form.Item
            label="M?? t???"
            name="description"
            rules={[
              {
                required: true,
                message: "Vui l??ng ch???n nh?? m???ng!",
              },
              {
                max: 150,
                message: "M?? t??? nh??? h??n 150 k?? t???",
              },
            ]}
          >
            <TextArea placeholder="Nh???p m?? t???" autoSize/>
          </Form.Item>
          <Form.Item
            label="?????a ch??? IP"
            name="ips"
            className={`${state?.isError ? "select-error" : ""}`}
            rules={[
              {
                required: true,
                message: "?????a ch??? IP kh??ng ???????c ????? tr???ng",
              },
              {
                validator: validator,
              },
            ]}
          >
            <SelectAntd mode="tags" placeholder="Nh???p ?????a ch??? IP">
              {(dataIp || []).map((item) => {
                return <Option value={item.label} key={item.value}></Option>;
              })}
            </SelectAntd>
          </Form.Item>
          {state?.isError && (
            <div className="error">Vui l??ng nh???p ????ng ?????nh d???ng IP</div>
          )}
        </Form>
        <Button
          className={`${!state?.data?.id ? "button-create" : "button-update"}`}
          onClick={() => onSave()}
        >
          {!state?.data?.id ? "T???o m???i" : "C???p nh???t"}
        </Button>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalKhachHang);
