import styled from "styled-components";
export const Main = styled.div`
  background: #151529;
  min-height: 100vh;
  .logo {
    display: flex;
    justify-content: center;
    background: #151529;
    img {
      cursor: pointer;
    }
  }
  .ant-layout-sider {
    width: 100% !important;
    min-width: 100% !important;
    max-width: 100% !important;
  }
  .miniLogo {
    display: flex;
    justify-content: center;
    background: #151529;
    img {
      cursor: pointer;
      margin-top: 20px;
    }
  }
  .ant-menu {
    background: #151529;
    color: #fff;
    .ant-menu-item-group-title {
      color: #6d7080;
      font-size: 13px;
    }
    .ant-menu-item {
      font-size: 16px;
      padding: 0 16px 0 28px !important;
      a {
        color: #6d7080;
      }
      a:hover {
        color: #fff;
      }

      .item {
        display: flex;
        align-items: center;
        &.color {
          color: #fff;
        }
      }

      .ant-menu-title-content {
        width: 100%;
      }
    }
    .ant-tooltip {
      display: none !important;
    }
  }
  .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
    color: #fff;
    background-color: transparent;
    span {
      color: #fff;
    }
  }
  .ant-menu-vertical {
    border: none;
  }
  .group-item {
    color: #fff;
    .ant-menu-item-group-title {
      color: #6d7080;
      font-size: 13px;
      color: #fff;
    }
  }
`;
