import { Button, Form, Input, InputNumber } from "antd";
import ModalTemplate from "components/ModalTemplate";
import Select from "components/Select";
import { Main } from "./styled";
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
const ModalTrunk = (props, ref) => {
  const { listGroup } = useSelector((state) => state.trunkManagement);
  const { createOrEdit, getTrunkManagement } = useDispatch().trunkManagement;

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
    let listGroup = localStorage.getItem("DATA_ALL_GROUPS");
    setState({ listGroup: JSON.parse(listGroup) });
  }, [listGroup]);
  const onCancel = () => {
    modalTrunkRef.current && modalTrunkRef.current.hide();
    form.resetFields();
  };

  const dataGroup = useMemo(() => {
    return (state?.listGroup || []).map((item) => {
      return { id: item.id, ten: item.groupName };
    });
  }, [state?.listGroup]);

  const onHandleSubmit = (values) => {
    const { trunkName, port, ip, groupName } = values;
    const payload = {
      trunkName: trunkName,
      port: port,
      ip: ip,
      id: state?.data?.id,
      groupCode: (state?.listGroup || []).find((x) => x.groupName === groupName)
        ?.groupCode,
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
      onCancel={onCancel}
      title={state?.data?.id ? "Cập nhật Trunk" : "Tạo mới Trunk"}
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
            label="Tên Trunk"
            name="trunkName"
            rules={[
              {
                required: true,
                message: "Tên Trunk không được để trống",
              },
              {
                whitespace: true,
                message: "Tên Trunk không được để trống",
              },
              {
                max:20,
                message: "Tên Trunk nhỏ hơn 20 kí tự",
              }
            ]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            label="Nhà mạng"
            name="groupName"
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
            <Select disabled={state?.data?.id} data={dataGroup} />
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
            <Input></Input>
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
            <Input type={"number"}></Input>
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
              <Select data={STATUS} />
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
