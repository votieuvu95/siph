import styled, { createGlobalStyle } from "styled-components";
export const Main = styled.div`
  .header {
    background-color: #fff;
    padding: 0 24px;
    display: flex;
    box-shadow: rgb(0 0 0 / 20%) 0px 2px 4px -1px,
      rgb(0 0 0 / 14%) 0px 4px 5px 0px, rgb(0 0 0 / 12%) 0px 1px 10px 0px;
    &__left {
      display: flex;
      align-items: center;
      .icon {
        cursor: pointer;
        display: flex;
        padding: 8px;
      }
      .title {
        color: #000000;
        font-weight: 500;
        font-size: 1.25rem;
        line-height: 1.6;
      }
    }
    &__right {
      margin-left: auto;
      margin-right: 20px;
      img {
        cursor: pointer;
        width: 50px;
      }
      .logout {
        display: flex;
        align-items: center;
      }
    }
  }
`;

export const GlobalStyle = createGlobalStyle`
.ant-popover-placement-bottomRight {
  padding-top: 0px;
}
.logout {
  display: flex;
  align-items: center;
  width: 150px;
  cursor: pointer;
  .title{
    margin-left: 12px;
    font-size: 16px;
  }
}
`