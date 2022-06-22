import { Button, Form } from "antd";
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
const ModalTrunkHotlineGroup = (props, ref) => {
  const { createOrEditTrunkToHotline, getHotline } = useDispatch().hotline;

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
    async function fetchData() {
      let listCustomer = await cacheUtils.read(
        "",
        "DATA_ALL_CUSTOMER",
        [],
        false
      );

      let listTrunkManagement = await cacheUtils.read(
        "",
        "DATA_ALL_TRUNK_MANAGEMENT",
        [],
        false
      );

      let listHotlines = await cacheUtils.read(
        "",
        "DATA_ALL_HOTLINE",
        [],
        false
      );

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
    }
    fetchData();
  }, []);
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
      getHotline().then(async (s) => {
        await cacheUtils.save("", "DATA_ALL_HOTLINE", s, false);
        onCancel();
      });
    });
  };

  const onSave = () => {
    form.submit();
  };

  const onChange = (e) => {
    async function fetchData() {
      let listHotlines = await cacheUtils.read(
        "",
        "DATA_ALL_HOTLINE",
        [],
        false
      );
      setState({
        listHotlines: (listHotlines || [])
          .filter((x) => x.customerId === e)
          .map((item) => {
            return {
              id: Number(item.hotlineGroupId),
              ten: item.hotlineGroupName,
            };
          }),
      });
    }
    fetchData();
  };
  return (
    <ModalTemplate
      ref={modalTrunkRef}
      onCancel={onCancel}
      title={
        state?.data?.hotlineGroupId
          ? "Cập nhật Trunk cho nhóm Hotline"
          : "Tạo Trunk cho nhóm Hotline"
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
                message: "Vui lòng nhập tên Trunk!",
              },
            ]}
          >
            <Select
              data={state?.listCustomer}
              onChange={onChange}
              disabled={state?.data?.hotlineGroupId}
            ></Select>
          </Form.Item>
          <Form.Item
            label="Tên nhóm Hotline"
            name="hotlineGroupId"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn nhà mạng!",
              },
            ]}
          >
            <Select
              data={state?.listHotlines}
              disabled={state?.data?.hotlineGroupId}
            />
          </Form.Item>
          <Form.Item
            label="Tên Trunk"
            name="trunkId"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập địa chỉ!",
              },
            ]}
          >
            <Select data={state?.listTrunkManagement}></Select>
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