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
  const { getVirtualNumber } = useDispatch().virtualNumber;
  const { getHotline } = useDispatch().hotline;

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
      status,
    };
    createOrEdit(payload).then(() => {
      getTrunkManagement();
      if (state?.data?.id) {
        getVirtualNumber();
        getHotline();
      }
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
            {state?.data?.id ? "C???p nh???t Trunk" : "T???o m???i Trunk"}
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
            label="T??n trunk"
            name="trunkName"
            rules={[
              {
                required: true,
                message: "T??n trunk kh??ng ???????c ????? tr???ng",
              },
              {
                whitespace: true,
                message: "T??n trunk kh??ng ???????c ????? tr???ng",
              },
              {
                max: 20,
                message: "T??n trunk nh??? h??n 20 k?? t???",
              },
            ]}
          >
            <Input placeholder="Nh???p t??n trunk"></Input>
          </Form.Item>
          <Form.Item
            label="Nh?? m???ng"
            name="groupCode"
            rules={[
              {
                required: true,
                message: "Nh?? m???ng kh??ng ???????c ????? tr???ng",
              },
              {
                whitespace: true,
                message: "Nh?? m???ng kh??ng ???????c ????? tr???ng",
              },
            ]}
          >
            <Select
              disabled={state?.data?.id}
              data={dataGroup}
              placeholder="Ch???n nh?? m???ng"
            />
          </Form.Item>
          <Form.Item
            label="?????a ch??? IP"
            name="ip"
            rules={[
              {
                required: true,
                message: "?????a ch??? IP kh??ng ???????c ????? tr???ng",
              },
              {
                pattern: new RegExp(
                  /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/g
                ),
                message: "Vui l??ng nh???p ????ng ?????nh d???ng IP",
              },
            ]}
          >
            <Input placeholder="Nh???p ?????a ch??? IP"></Input>
          </Form.Item>
          <Form.Item
            label="Port"
            name="port"
            rules={[
              {
                required: true,
                message: "Port kh??ng ???????c ????? tr???ng",
              },
            ]}
          >
            <Input type={"number"} placeholder="Nh???p port"></Input>
          </Form.Item>
          {state?.data?.id && (
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
          className={`${!state?.data?.id ? "button-create" : "button-update"}`}
          onClick={() => onSave()}
        >
          {!state?.data?.id ? "T???o trunk" : "C???p nh???t"}
        </Button>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalTrunk);
