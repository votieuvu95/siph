import { Button, Form, Input, Select as SelectAntd } from "antd";
import ModalTemplate from "components/ModalTemplate";
import { Main } from "./styled";
import React, {
  useState,
  useImperativeHandle,
  useRef,
  forwardRef,
  useMemo,
} from "react";
import { useDispatch } from "react-redux";

const { Option } = SelectAntd;
const ModalKhachHang = (props, ref) => {
  const { createOrEdit, getCustomer } = useDispatch().customer;

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
        callback(new Error("Vui lòng nhập đúng định dạng IP"));
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
      onCancel={onCancel}
      title={state?.data?.id ? "Cập nhật khách hàng" : "Tạo mới khách hàng"}
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
            name="customerName"
            rules={[
              {
                required: true,
                message: "Tên khách hàng không được để trống",
              },
              {
                max: 50,
                message: "Tên khách hàng nhỏ hơn 50 kí tự",
              },
            ]}
          >
            <Input placeholder="Nhập tên khách hàng"></Input>
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="description"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn nhà mạng!",
              },
              {
                max: 150,
                message: "Mô tả nhỏ hơn 150 kí tự",
              },
            ]}
          >
            <Input placeholder="Nhập mô tả" />
          </Form.Item>
          <Form.Item
            label="Địa chỉ IP"
            name="ips"
            className={`${state?.isError ? "select-error" : ""}`}
            rules={[
              {
                required: true,
                message: "Địa chỉ IP không được để trống",
              },
              {
                validator: validator,
              },
            ]}
          >
            <SelectAntd mode="tags" placeholder="Nhập địa chỉ IP">
              {(dataIp || []).map((item) => {
                return <Option value={item.label} key={item.value}></Option>;
              })}
            </SelectAntd>
          </Form.Item>
          {state?.isError && (
            <div className="error">Vui lòng nhập đúng định dạng IP</div>
          )}
        </Form>
        <Button
          className={`${!state?.data?.id ? "button-create" : "button-update"}`}
          onClick={() => onSave()}
        >
          {!state?.data?.id ? "Tạo mới" : "Cập nhật"}
        </Button>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalKhachHang);
