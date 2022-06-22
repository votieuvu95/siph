import { Button, Form, Input, Select as SelectAntd } from "antd";
import ModalTemplate from "components/ModalTemplate";
import { Main } from "./styled";
import React, {
  useState,
  useImperativeHandle,
  useRef,
  forwardRef,
} from "react";
import { useDispatch } from "react-redux";
const ModalKhachHang = (props, ref) => {
  const { createOrEdit, getCustomer } = useDispatch().customer;

  const [form] = Form.useForm();
  const refModal = useRef(null);
  const [state, _setState] = useState({});
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
            })
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
    };
    createOrEdit(payload).then(() => {
      getCustomer();
      onCancel();
    });
  };

  const onSave = () => {
    form.submit();
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
                message: "Vui lòng nhập tên Trunk!",
              },
            ]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="description"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn nhà mạng!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Địa chỉ IP"
            name="ips"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập địa chỉ!",
              },
            ]}
          >
            <SelectAntd mode="tags"></SelectAntd>
          </Form.Item>
        </Form>
        <Button
          className={`${!state?.data?.id ? "button-create" : "button-update"}`}
          onClick={() => onSave()}
        >
          {!state?.data?.id ? "Tạo trunk" : "Cập nhật"}
        </Button>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalKhachHang);
