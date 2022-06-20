import styled from "styled-components";

export const Main = styled("div")`
  & .app-header {
    background-color: #125872;
    height: 60px;
  }

  & .language-contain {
    display: flex;
    align-items: center;
  }

  & .language-title {
    color: rgba(255, 255, 255, 0.85);
    margin-left: 6px;
  }

  & .app-sider {
    background-color: #094359;

    & .ant-layout-sider-trigger {
      background-color: #125872;
    }
  }

  & .inpatient-sider {
    background-color: transparent;
  }

  & .layout-header {
    border-bottom: 3px solid #dedede;
  }
  & .ant-layout-content {
    height: calc(100vh - 60px);
  }

  .transition-ease {
    transition: all 0.5s ease;
    will-change: auto;
  }

  .d-flex {
    display: flex;
  }

  .justify-content-center {
    justify-content: center;
  }

  .align-items-center {
    align-items: center;
  }

  .justify-content-flex-end {
    justify-content: flex-end;
  }

  .justify-content-flex-start {
    justify-content: flex-start;
  }

  .text-center {
    text-align: center;
  }

  .text-left {
    text-align: left;
  }

  .text-right {
    text-align: right;
  }
`;

export const MainPage = styled("div")`
  height: 100vh;
  .gx-layout-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
`;
