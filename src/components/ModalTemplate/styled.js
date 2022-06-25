import styled from "styled-components";
import { Modal as MD } from "antd";

export const Main = styled.div`
  background: #ffffff;
  border-radius: 16px;
  .main__container {
    margin-top: 0px;
  }
  .title-box {
    justify-content: center;
  }
  .row-actived {
    background: #c1f0db !important;
  }
  .header {
    padding: 13px 16px;
    flex-flow: initial;
    align-items: center;
    color: #ffffff;
  }
`;

export const Modal = styled(MD)`
  margin-top: -60px;
  .ant-modal-content {
    /* shadow-khung */

    box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07);
    border-radius: 8px;
    overflow: hidden;
    & .ant-modal-close-x {
      height: 80px;
      width: 80px;
      line-height: 80px;
      font-size: 25px;
    }
  }
  .ant-modal-header {
    padding: 0;
    display: flex;
    align-items: center;
    padding: 0 16px;
    height: 80px;
    display: flex;
    align-items: center;
    .title {
      line-height: 24px;
      font-style: normal;
      font-weight: bold;
      font-size: 20px;
      width: 100%;
      h2 {
        margin-bottom: 0;
      }
    }
  }
  .ant-modal-title {
    width: 100%;
    justify-content: center;
    display: flex;
  }
  .ant-modal-body {
    padding: 48px !important;
  }
`;
