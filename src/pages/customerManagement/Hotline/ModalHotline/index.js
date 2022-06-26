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

const ModalHotline = (props, ref) => {
  const { createOrEdit, getHotline } = useDispatch().hotline;
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
      if (data?.hotlineGroupId) {
        form.setFieldsValue({
          ...data,
          groupHotlineName: data?.hotlineGroupName,
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
    getCustomer();
  }, []);
  useEffect(() => {
    setState({
      listDataCustomer: (listCustomer || []).map((item) => {
        return { id: Number(item.id), ten: item.customerName };
      }),
    });
  }, [listCustomer]);

  const onCancel = () => {
    setState({ isError: false });
    refModal.current && refModal.current.hide();
    form.resetFields();
  };
  const dataHotlines = useMemo(() => {
    return (state?.data?.hotlines || []).map((item) => {
      return { value: item?.hotlineId, label: item.isdn };
    });
  }, [state?.data?.hotlines]);
  const onHandleSubmit = (values) => {
    if (state?.isError) return null;
    const payload = {
      ...values,
      hotlineGroupId: state?.data?.hotlineGroupId,
      dataHotlines: dataHotlines,
    };
    createOrEdit(payload).then(() => {
      getHotline();
      onCancel();
    });
  };

  const onSave = () => {
    form.submit();
  };

  const validator = (rule, value, callback) => {
    let regex = /^(\+?84|0|\(\+?84\))[1-9]\d{8,9}$/;

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
        callback(new Error("Vui lòng nhập đúng định dạng số hotline"));
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
            {state?.data?.hotlineGroupId
              ? "Cập nhập nhóm Hotline"
              : "Tạo mới nhóm Hotline"}
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
                message: "Tên khách hàng không được để trống",
              },
            ]}
          >
            <Select
              disabled={state?.data?.hotlineGroupId}
              data={state?.listDataCustomer}
              placeholder="Chọn khách hàng"
            />
          </Form.Item>
          <Form.Item
            label="Tên nhóm Hotline"
            name="groupHotlineName"
            rules={[
              {
                required: true,
                message: "Tên nhóm Hotline không được để trống",
              },
              {
                max: 35,
                message: "Tên nhóm Hotline nhỏ hơn 35 kí tự",
              },
            ]}
          >
            <Input placeholder="Nhập tên nhóm hotline"></Input>
          </Form.Item>
          <Form.Item
            label="Số Hotline"
            name="isdns"
            rules={[
              {
                required: true,
                message: "Số Hotline không được để trống",
              },
              { validator: validator },
            ]}
          >
            <SelectAntd
              mode="tags"
              placeholder="Nhập sô hotline"
              className={`${state?.isError ? "select-error" : ""}`}
            >
              {(dataHotlines || []).map((item) => {
                return <Option value={item.label} key={item.value}></Option>;
              })}
            </SelectAntd>
          </Form.Item>
          {state?.isError && (
            <div className="error">Vui lòng nhập đúng định dạng số hotline</div>
          )}
          {state?.data?.hotlineGroupId && (
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

export default forwardRef(ModalHotline);
