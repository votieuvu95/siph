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
import { useDispatch, useSelector } from "react-redux";
import cacheUtils from "utils/cache-utils";
const ModalTrunk = (props, ref) => {
  const { createOrEditToTrunk, getVirtualNumber } = useDispatch().virtualNumber;

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
      if (data?.vngId) {
        console.log("data.vngTrunks", data.vngTrunks);
        form.setFieldsValue({
          ...data,
          viettelTrunkId: (data.vngTrunks || []).find(
            (x) => x.groupCode === "11"
          )?.trunkId,
          mobiTrunkId: (data.vngTrunks || []).find((x) => x.groupCode === "22")
            ?.trunkId,
          vinaTrunkId: (data.vngTrunks || []).find((x) => x.groupCode === "33")
            ?.trunkId,
          defaultTrunkId: (data.vngTrunks || []).find(
            (x) => x.groupCode === "44"
          )?.trunkId,
          virtualGroupId: data?.vngId,
        });
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

      let listVirtualNumber = await cacheUtils.read(
        "",
        "DATA_ALL_VITURALNUMBER",
        [],
        false
      );
      setState({
        listCustomer: (listCustomer || []).map((item) => {
          return { id: Number(item.id), ten: item.customerName };
        }),
        listTrunkManagement: (listTrunkManagement || []).map((item) => {
          return {
            id: Number(item.id),
            ten: item.trunkName,
            groupCode: item.groupCode,
          };
        }),
        listHotlines: (listHotlines || []).map((item) => {
          return {
            id: item.hotlineGroupId,
            ten: item.hotlineGroupName,
          };
        }),
        listVirtualNumber: (listVirtualNumber || []).map((item) => {
          return {
            id: item.vngId,
            ten: item.vngName,
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

  const onChange = (e) => {
    setState({
      listVirtualNumber: (state?.listVirtualNumber || [])
        .filter((x) => x.customerId === e)
        .map((item) => {
          return {
            id: item.vngId,
            ten: item.vngName,
          };
        }),
    });
    form.setFieldsValue({ virtualGroupId: null });
  };

  const onHandleSubmit = (values) => {
    const payload = {
      ...values,
      vngId: values.virtualGroupId,
      vngTrunks: state.data?.vngTrunks,
    };
    createOrEditToTrunk(payload).then(() => {
      getVirtualNumber();
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
      title={
        state?.data?.vngId
          ? "Cập nhật Trunk cho nhóm Virtual"
          : "Tạo Trunk cho nhóm Virtual"
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
            <Select data={state?.listCustomer} onChange={onChange}></Select>
          </Form.Item>
          <Form.Item
            label="Tên nhóm Virtual"
            name="virtualGroupId"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn nhà mạng!",
              },
            ]}
          >
            <Select
              disabled={state?.data?.id}
              data={state?.listVirtualNumber}
            />
          </Form.Item>
          <Form.Item
            label="Viettel Trunk"
            name="viettelTrunkId"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập địa chỉ!",
              },
            ]}
          >
            <Select
              data={(state?.listTrunkManagement || []).filter(
                (x) => x.groupCode === "11"
              )}
            ></Select>
          </Form.Item>
          <Form.Item
            label="Mobiphone Trunk"
            name="mobiTrunkId"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập port!",
              },
            ]}
          >
            <Select
              data={(state?.listTrunkManagement || []).filter(
                (x) => x.groupCode === "22"
              )}
            ></Select>
          </Form.Item>
          <Form.Item
            label="Vinaphone Trunk"
            name="vinaTrunkId"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập port!",
              },
            ]}
          >
            <Select
              data={(state?.listTrunkManagement || []).filter(
                (x) => x.groupCode === "33"
              )}
            ></Select>
          </Form.Item>
          <Form.Item
            label="Default Trunk"
            name="defaultTrunkId"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập port!",
              },
            ]}
          >
            <Select
              data={(state?.listTrunkManagement || []).filter(
                (x) => x.groupCode === "44"
              )}
            ></Select>
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
          className={`${
            !state?.data?.vngId ? "button-create" : "button-update"
          }`}
          onClick={() => onSave()}
        >
          {!state?.data?.vngId ? "Tạo trunk" : "Cập nhật"}
        </Button>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalTrunk);
