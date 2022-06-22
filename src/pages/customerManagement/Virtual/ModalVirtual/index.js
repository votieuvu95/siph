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
  useMemo,
} from "react";
import { STATUS } from "constants/index";
import { useDispatch } from "react-redux";
const { Option } = SelectAntd;

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
      setState({ data: data });
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
    let listDataCustomer = localStorage.getItem("DATA_ALL_CUSTOMER");
    setState({
      listDataCustomer: (JSON.parse(listDataCustomer) || []).map((item) => {
        return { id: Number(item.id), ten: item.customerName };
      }),
    });
  }, []);

  const onHandleSubmit = (values) => {
    const payload = {
      ...values,
      vngId: state?.data?.vngId,
      dataVirtualNumbers,
    };
    createOrEdit(payload).then(() => {
      getVirtualNumber();
      onCancel();
    });
  };

  const onSave = () => {
    form.submit();
  };

  const dataVirtualNumbers = useMemo(() => {
    return (state?.data?.virtualNumbers || []).map((item) => {
      return { value: item?.vnId, label: item.isdn };
    });
  }, [state?.data?.virtualNumbers]);

  return (
    <ModalTemplate
      ref={refModal}
      onCancel={onCancel}
      title={
        state?.data?.vngId ? "Cập nhập nhóm Virtual" : "Tạo mới nhóm Virtual"
      }
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
                message: "Tên Khách hàngi không được để trống",
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
                message: "Tên nhóm Virtual không được để trống",
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
                message: "Số Virtual không được để trống",
              },
            ]}
          >
            <SelectAntd mode="tags">
              {(dataVirtualNumbers || []).map((item) => {
                return <Option value={item.label} key={item.value}></Option>;
              })}
            </SelectAntd>
          </Form.Item>
          {state?.data?.vngId && (
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
          className={`${
            !state?.data?.vngId ? "button-create" : "button-update"
          }`}
          onClick={() => onSave()}
        >
          {!state?.data?.vngId ? "Tạo mới" : "Cập nhật"}
        </Button>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalVirtual);
