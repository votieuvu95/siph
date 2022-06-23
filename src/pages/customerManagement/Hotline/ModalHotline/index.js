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
    let listDataCustomer = localStorage.getItem("DATA_ALL_CUSTOMER");
    setState({
      listDataCustomer: (JSON.parse(listDataCustomer) || []).map((item) => {
        return { id: Number(item.id), ten: item.customerName };
      }),
    });
  }, []);

  const onCancel = () => {
    refModal.current && refModal.current.hide();
    form.resetFields();
  };
  const dataHotlines = useMemo(() => {
    return (state?.data?.hotlines || []).map((item) => {
      return { value: item?.hotlineId, label: item.isdn };
    });
  }, [state?.data?.hotlines]);
  const onHandleSubmit = (values) => {
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
    let regex = /^(\+?84|0|\(\+?84\))[1-9]\d{8,9}$/g;
    if (value.length) {
      let datareg = value.filter((x) => {
        return (
          (!regex.test(String(x)) && x.charAt(0) === 0) ||
          (x.length !== 4 && x.charAt(0) != 0)
        );
      });
      if (datareg.length) {
        callback(new Error("Vui lòng nhập đúng định dạng số hotline"));
      } else {
        callback();
      }
    } else {
      callback();
    }
  };

  return (
    <ModalTemplate
      ref={refModal}
      onCancel={onCancel}
      title={
        state?.data?.hotlineGroupId
          ? "Cập nhập nhóm Hotline"
          : "Tạo mới nhóm Hotline"
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
                message: "Tên Khách hàng không được để trống",
              },
            ]}
          >
            <Select
              disabled={state?.data?.hotlineGroupId}
              data={state?.listDataCustomer}
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
                message: "Số Hotline không được để trống",
              },
              // {
              //   pattern: new RegExp(/^(\+?84|0|\(\+?84\))[1-9]\d{8,9}$/g),
              //   message: "Vui lòng nhập đúng định dạng số hotline",
              // },
              { validator: validator },
            ]}
          >
            <SelectAntd mode="tags">
              {(dataHotlines || []).map((item) => {
                return <Option value={item.label} key={item.value}></Option>;
              })}
            </SelectAntd>
          </Form.Item>
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
              <Select data={STATUS} />
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
