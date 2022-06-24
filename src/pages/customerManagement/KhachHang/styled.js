import styled from "styled-components";

export const Main = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  .search {
    display: flex;
    margin-bottom: 32px;
    align-items: center;
    &__left {
      display: flex;
      .searchField {
        padding: 11px 14px 11px 0px;
        border-radius: 15px 0 0 15px;
        width: 350px;
        background: #f0f2f5;
        border-color: rgba(0, 0, 0, 0.23);
        .ant-input {
          background: #f0f2f5;
          font-size: 16px;
          line-height: 22px;
        }
        .ant-input-prefix {
          padding-left: 14px;
        }
      }
      .button-search {
        min-height: 48px;
        border-radius: 0px 15px 15px 0px;
        background-color: rgb(25, 118, 210);
      }
    }
    &__right {
      margin-left: auto;
      .admin-button {
        display: flex;
        span {
          margin-left: 8px;
        }
      }
      button {
        background-color: #2f80ed;
        border-radius: 4px;
        font-size: 14px;
        height: 37px;
        min-width: 64px;
        padding: 6px 16px;
      }
    }
  }
  
  .item {
    width: 400px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    &__center {
      justify-content: center;
      align-items: center;
      display: flex;
    }
  }
`;
