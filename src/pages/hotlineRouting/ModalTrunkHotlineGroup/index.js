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
              ? "Cập nhật Trunk cho nhóm Hotline"
              : "Tạo Trunk cho nhóm Hotline"}
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
            label="Tên khách hàng"
            name="customerId"
            rules={[
              {
                required: true,
                message: "Tên khách hàng không được để trông",
              },
            ]}
          >
            <Select
              data={state?.listCustomer}
              onChange={onChange}
              disabled={state?.data?.hotlineGroupId}
              placeholder="Chọn khách hàng"
            ></Select>
          </Form.Item>
          <Form.Item
            label="Tên nhóm hotline"
            name="hotlineGroupId"
            rules={[
              {
                required: true,
                message: "Tên nhóm hotline không được để trống",
              },
            ]}
          >
            <Select
              data={state?.listHotlines}
              disabled={state?.data?.hotlineGroupId}
              placeholder="Chọn tên nhóm hotline"
            />
          </Form.Item>
          <Form.Item
            label="Tên trunk"
            name="trunkId"
            rules={[
              {
                required: true,
                message: "Tên trunk không được để trống",
              },
            ]}
          >
            <Select
              data={state?.listTrunkManagement}
              placeholder="Chọn trunk"
            ></Select>
          </Form.Item>
          {state?.data?.hotlineGroupId && (
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
              <Select data={STATUS} placeholder="Chọn trạng thái" />
            </Form.Item>
          )}
        </Form>
        <Button
          className={`${
            !state?.data?.hotlineGroupId ? "button-create" : "button-update"
          }`}
          onClick={() => onSave()}
        >
          {!state?.data?.hotlineGroupId ? "Tạo mới" : "Cập nhật"}
        </Button>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalTrunkHotlineGroup);
