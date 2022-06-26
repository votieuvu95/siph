import { Button, Form, Input } from "antd";
import ModalTemplate from "components/ModalTemplate";
import Select from "components/Select";
import { Main, MainHeader } from "./styled";
import React, {
  useState,
  useImperativeHandle,
  useRef,
  forwardRef,
  useMemo,
  useEffect,
} from "react";
import { STATUS } from "constants/index";
import { useDispatch, useSelector } from "react-redux";
import { CloseOutlined } from "@ant-design/icons";

const ModalTrunk = (props, ref) => {
  const { listGroup } = useSelector((state) => state.trunkManagement);
  const { createOrEdit, getTrunkManagement, searchGroup } =
    useDispatch().trunkManagement;

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
      setState({ data: data, id: data.id });
      if (data?.id) {
        form.setFieldsValue(data);
      }
      modalTrunkRef.current && modalTrunkRef.current.show();
    },
  }));
  useEffect(() => {
    searchGroup();
  }, []);
  const onCancel = () => {
    modalTrunkRef.current && modalTrunkRef.current.hide();
    form.resetFields();
  };

  const dataGroup = useMemo(() => {
    return (listGroup || []).map((item) => {
      return { id: item.groupCode, ten: item.groupName };
    });
  }, [listGroup]);

  const onHandleSubmit = (values) => {
    const { trunkName, port, ip, groupCode, status } = values;
    const payload = {
      trunkName: trunkName,
      port: port,
      ip: ip,
      id: state?.data?.id,
      groupCode: groupCode,
      status
    };
    createOrEdit(payload).then(() => {
      getTrunkManagement();
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
            {state?.data?.id ? "Cập nhật Trunk" : "Tạo mới Trunk"}
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
            label="Tên trunk"
            name="trunkName"
            rules={[
              {
                required: true,
                message: "Tên trunk không được để trống",
              },
              {
                whitespace: true,
                message: "Tên trunk không được để trống",
              },
              {
                max: 20,
                message: "Tên trunk nhỏ hơn 20 kí tự",
              },
            ]}
          >
            <Input placeholder="Nhập tên trunk"></Input>
          </Form.Item>
          <Form.Item
            label="Nhà mạng"
            name="groupCode"
            rules={[
              {
                required: true,
                message: "Nhà mạng không được để trống",
              },
              {
                whitespace: true,
                message: "Nhà mạng không được để trống",
              },
            ]}
          >
            <Select
              disabled={state?.data?.id}
              data={dataGroup}
              placeholder="Chọn nhà mạng"
            />
          </Form.Item>
          <Form.Item
            label="Địa chỉ IP"
            name="ip"
            rules={[
              {
                required: true,
                message: "Địa chỉ IP không được để trống",
              },
              {
                pattern: new RegExp(
                  /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/g
                ),
                message: "Vui lòng nhập đúng định dạng IP",
              },
            ]}
          >
            <Input placeholder="Nhập địa chỉ IP"></Input>
          </Form.Item>
          <Form.Item
            label="Port"
            name="port"
            rules={[
              {
                required: true,
                message: "Port không được để trống",
              },
            ]}
          >
            <Input type={"number"} placeholder="Nhập port"></Input>
          </Form.Item>
          {state?.data?.id && (
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
          className={`${!state?.data?.id ? "button-create" : "button-update"}`}
          onClick={() => onSave()}
        >
          {!state?.data?.id ? "Tạo trunk" : "Cập nhật"}
        </Button>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalTrunk);
