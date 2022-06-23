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
            ]}
          >
            <Input placeholder="Nhập mô tả" />
          </Form.Item>
          <Form.Item
            label="Địa chỉ IP"
            name="ips"
            rules={[
              {
                required: true,
                message: "Địa chỉ IP không được để trống",
              },
            ]}
          >
            <SelectAntd mode="tags" placeholder="Nhập địa chỉ IP">
              {(dataIp || []).map((item) => {
                return <Option value={item.label} key={item.value}></Option>;
              })}
            </SelectAntd>
          </Form.Item>
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
