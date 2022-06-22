import styled from "styled-components";

export const Main = styled.div`
  padding: 0 24px;
  height: 100%;
  display: flex;
  flex-direction: column;
  .ant-tabs {
    height: 100%;
    .ant-tabs-content {
      height: 100%;
    }
    .ant-tabs-tab {
      font-size: 18px;
      font-weight: bold;
    }
  }
`;
