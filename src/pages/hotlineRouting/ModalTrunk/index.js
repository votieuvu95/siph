import { Button, Form, Input } from "antd";
import ModalTemplate from "components/ModalTemplate";
import Select from "components/Select";
import { Main } from "./styled";
import React, {
  useState,
  useImperativeHandle,
  useRef,
  forwardRef,
  useMemo,
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

  const onCancel = () => {
    modalTrunkRef.current && modalTrunkRef.current.hide();
    form.resetFields();
  };

  const dataGroup = useMemo(() => {
    return (listGroup || []).map((item) => {
      return { id: item.id, ten: item.groupName };
    });
  }, [listGroup]);

  const onHandleSubmit = (values) => {
    const { trunkName, port, ip, groupName } = values;
    const payload = {
      trunkName: trunkName,
      port: port,
      ip: ip,
      id: state?.data?.id,
      groupCode: (listGroup || []).find((x) => x.id === groupName)
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
                message: "Vui lòng nhập tên Trunk!",
              },
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
                message: "Vui lòng chọn nhà mạng!",
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
                message: "Vui lòng nhập địa chỉ!",
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
                message: "Vui lòng nhập port!",
              },
            ]}
          >
            <Input></Input>
          </Form.Item>
          {state?.data?.id && (
            <Form.Item
              label="Trạng thái"
              name="status"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn trạng thái!",
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
