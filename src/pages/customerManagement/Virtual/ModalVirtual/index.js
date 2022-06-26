import { Button, Form, Input, Select as SelectAntd } from "antd";
import ModalTemplate from "components/ModalTemplate";
import Select from "components/Select";
import { Main, MainHeader } from "./styled";
import React, {
  useState,
  useImperativeHandle,
  useRef,
  forwardRef,
  useEffect,
  useMemo,
} from "react";
import { STATUS } from "constants/index";
import { useDispatch, useSelector } from "react-redux";
import { CloseOutlined } from "@ant-design/icons";

const { Option } = SelectAntd;

const ModalVirtual = (props, ref) => {
  const { createOrEdit, getVirtualNumber } = useDispatch().virtualNumber;
  const { listCustomer } = useSelector((state) => state.customer);
  const { getCustomer } = useDispatch().customer;

  const [form] = Form.useForm();
  const refModal = useRef(null);
  const [state, _setState] = useState({ isError: false });
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
    getCustomer();
  }, []);
  useEffect(() => {
    setState({
      listDataCustomer: (listCustomer || []).map((item) => {
        return { id: Number(item.id), ten: item.customerName };
      }),
    });
  }, [listCustomer]);

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

  const validator = (rule, value, callback) => {
    let regex = /^((?!(0))[0-9]{6})$/;
    let dataArray = [];
    value.map((item) => {
      let data = item.split(",");
      data.map((x) => x.length && dataArray.push(x));
    });
    form.setFieldsValue({ isdns: dataArray });
    if (dataArray.length) {
      let datareg = dataArray.filter((x) => !regex.test(String(x)));
      if (datareg.length) {
        setState({ isError: true });
        callback(new Error("Vui lòng nhập đúng định dạng số Virtual"));
      } else {
        callback();
        setState({ isError: false });
      }
    } else {
      callback();
      setState({ isError: false });
    }
  };

  return (
    <ModalTemplate
      ref={refModal}
      title={
        <MainHeader>
          <div className="left">
            {state?.data?.vngId
              ? "Cập nhập nhóm Virtual"
              : "Tạo mới nhóm Virtual"}
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
                message: "Tên Khách hàngi không được để trống",
              },
            ]}
          >
            <Select
              disabled={state?.data?.vngId}
              data={state?.listDataCustomer}
              placeholder="Chọn khách hàng"
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
              {
                whitespace: true,
                message: "Tên nhóm Virtual không được để trống",
              },
              {
                max: 35,
                message: "Tên nhóm Virtual nhỏ hơn 35 kí tự",
              },
            ]}
          >
            <Input placeholder="Nhập tên nhóm virutal" />
          </Form.Item>
          <Form.Item
            label="Số Virtual"
            name="isdns"
            rules={[
              {
                required: true,
                message: "Số Virtual không được để trống",
              },
              { validator: validator },
            ]}
          >
            <SelectAntd
              mode="tags"
              placeholder="Nhập số virtual"
              className={`${state?.isError ? "select-error" : ""}`}
            >
              {(dataVirtualNumbers || []).map((item) => {
                return <Option value={item.label} key={item.value}></Option>;
              })}
            </SelectAntd>
          </Form.Item>
          {state?.isError && (
            <div className="error">Vui lòng nhập đúng định dạng số Virtual</div>
          )}
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
              <Select data={STATUS} placeholder="Chọn trạng thái" />
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
