import { Button, Form, Input, Select as SelectAntd } from "antd";
import ModalTemplate from "components/ModalTemplate";
import Select from "components/Select";
import { Main } from "./styled";
import React, {
  useState,
  useImperativeHandle,
  useRef,
  forwardRef,
  useEffect,
} from "react";
import { STATUS } from "constants/index";
import { useDispatch } from "react-redux";
import cacheUtils from "utils/cache-utils";

const ModalHotline = (props, ref) => {
  const { createOrEdit, getHotline } = useDispatch().hotline;

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
      setState({ data: data });
      debugger
      if (data?.hotlineGroupId) {
        form.setFieldsValue({
          ...data,
          groupHotlineName : data?.hotlineGroupName,
          status: data?.groupStatus,
          isdns: (data?.hotlines || [])
            .filter((x) => x.status === 1)
            .map((x1) => {
              return x1.isdn;
            }),
        });
      }
      refModal.current && refModal.current.show();
    },
  }));
  useEffect(() => {
    async function fetchData() {
      let listDataCustomer = await cacheUtils.read(
        "",
        "DATA_ALL_CUSTOMER",
        [],
        false
      );
      setState({
        listDataCustomer: (listDataCustomer || []).map((item) => {
          return { id: Number(item.id), ten: item.customerName };
        }),
      });
    }
    fetchData();
  }, []);
  const onCancel = () => {
    refModal.current && refModal.current.hide();
    form.resetFields();
  };

  const onHandleSubmit = (values) => {
    const payload = {
      ...values,
      hotlineGroupId: state?.data?.hotlineGroupId,
    };
    createOrEdit(payload).then(() => {
      getHotline();
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
      title={state?.data?.hotlineGroupId ? "Cập nhập nhóm Hotline" : "Tạo mới nhóm Hotline"}
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
            label="Tên Khách hàng"
            name="customerId"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên Trunk!",
              },
            ]}
          >
            <Select disabled={state?.data?.hotlineGroupId} data={state?.listDataCustomer} />
          </Form.Item>
          <Form.Item
            label="Tên nhóm Hotline"
            name="groupHotlineName"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn nhà mạng!",
              },
            ]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            label="Số Hotline"
            name="isdns"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập địa chỉ!",
              },
            ]}
          >
            <SelectAntd mode="tags" />
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
              <Select data={STATUS} />
            </Form.Item>
          )}
        </Form>
        <Button
          className={`${!state?.data?.hotlineGroupId ? "button-create" : "button-update"}`}
          onClick={() => onSave()}
        >
          {!state?.data?.hotlineGroupId ? "Tạo trunk" : "Cập nhật"}
        </Button>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalHotline);
