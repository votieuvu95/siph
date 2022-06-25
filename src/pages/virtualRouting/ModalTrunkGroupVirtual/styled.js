import styled from "styled-components";

export const Main = styled.div`
  .form-custom {
    .ant-row {
      label {
        margin-bottom: 4px;
        line-height: 16px;
        font-size: 14px;
        font-weight: 600;
        color: #172b4d;
        &.ant-form-item-required {
          &:after {
            display: inline-block;
            margin-right: 4px;
            color: red;
            font-size: 16px;
            font-weight: 600;
            font-family: inherit;
            line-height: 1;
            content: "*";
          }
          &:before {
            display: none;
          }
        }
      }
    }
    .ant-form-item {
      margin-bottom: 14px;
    }
    .ant-input {
      min-height: 48px;
      font-size: 16px;
    }
    .ant-select-selector {
      min-height: 48px;
      .ant-select-selection-search {
        input {
          min-height: 48px;
          font-size: 16px;
          display: flex;
          align-items: center;
        }
      }
      .ant-select-selection-item {
        font-size: 16px;
        display: flex;
        align-items: center;
      }
    }
  }
  .button-create {
    min-height: 48px;
    border-radius: 20px;
    width: 100%;
    background: linear-gradient(270deg, #2f80ed, #a1e1f7);
    color: #fff;
    font-size: 20px;
    margin-top: 20px;
  }
  .button-update {
    min-height: 48px;
    border-radius: 20px;
    width: 100%;
    background: linear-gradient(270deg, #f0f797, #ff9d22);
    color: #fff;
    font-size: 20px;
    margin-top: 20px;
  }
  .ant-btn {
    border: 1px solid #fff !important;
  }
`;

export const MainHeader = styled.div`
  display: flex;
  width: 100%;
  .right {
    margin-left: auto;
    cursor: pointer;
  }
`;