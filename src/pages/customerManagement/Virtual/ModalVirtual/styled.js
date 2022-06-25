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
      padding: 0 0 24px !important;
      margin: 0px !important;
    }
    .ant-input {
      min-height: 48px;
      font-size: 16px;
    }
    .ant-select-selector {
      min-height: 48px;
      line-height: 50px;
      & .ant-select-selection-item {
        font-size: 16px;
        line-height: 50px;
      }
      .ant-select-selection-search {
        input {
          min-height: 48px;
          font-size: 16px;
          display: flex;
          align-items: center;
        }
      }
      & .ant-select-selection-overflow {
        & .ant-select-selection-overflow-item {
          & .ant-select-selection-item {
            line-height: 24px !important;
          }
        }
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
  .error {
    color: #ff4d4f;
    margin-top: -24px;
  }
  .select-error {
    .ant-select-selector {
      border-color: #ff4d4f !important;
    }
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