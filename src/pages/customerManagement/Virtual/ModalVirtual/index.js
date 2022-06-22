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
const ModalVirtual = (props, ref) => {
  const { createOrEdit, getVirtualNumber } = useDispatch().virtualNumber;

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
      setState({ data: data});
      if (data?.vngId) {
        form.setFieldsValue({
          ...data,
          isdns: (data?.virtualNumbers || [])
            .filter((x) => x.status === 1)
            .map((x1) => {
              return x1.isdn;
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

  const onHandleSubmit = (values) => {
    const payload = {
      ...values,
      vngId: state?.data?.vngId,
    };
    createOrEdit(payload).then(() => {
      getVirtualNumber();
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
      title={state?.data?.vngId ? "Cập nhập nhóm Virtual" : "Tạo mới nhóm Virtual"}
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
            <Select
              disabled={state?.data?.vngId}
              data={state?.listDataCustomer}
            />
          </Form.Item>
          <Form.Item
            label="Tên nhóm Virtual"
            name="vngName"
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
            label="Số Virtual"
            name="isdns"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập địa chỉ!",
              },
            ]}
          >
            <SelectAntd mode="tags"></SelectAntd>
          </Form.Item>
          {state?.data?.vngId && (
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
          className={`${!state?.data?.vngId ? "button-create" : "button-update"}`}
          onClick={() => onSave()}
        >
          {!state?.data?.vngId ? "Tạo trunk" : "Cập nhật"}
        </Button>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalVirtual);
