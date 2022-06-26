import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Main, Modal } from "./styled";
const ModalTemplate = (
  { children, title, width = 12000, closable = true, virtual = false, ...props },
  ref
) => {
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((_state) => ({
      ..._state,
      ...data,
    }));
  };

  useImperativeHandle(ref, () => ({
    show: () => {
      setState({
        show: true,
      });
    },
    hide: () => {
      setState({
        show: false,
      });
    },
  }));
  const onCancel = () => {
    setState({ show: false });
    props.onCancel && props.onCancel();
  };

  return (
    <Modal
      visible={state.show}
      // onCancel={closable && onCancel}
      footer={null}
      closable={closable}
      width={width}
      virtual={virtual}
      title={
        <div className="title">
          <h2>
            <b>{title}</b>
          </h2>
        </div>
      }
    >
      <Main>{children}</Main>
    </Modal>
  );
};

export default forwardRef(ModalTemplate);
