import styled from "styled-components";
export const Main = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 0px;
  justify-content: end;
  border-top: 1px solid rgb(224, 224, 224);
  background: #fff;
  .select-size {
    display: flex;
    align-items: center;
  }
  .patient-paging {
    margin-left: 20px;
    .ant-pagination-item-link {
      border: none !important;
    }
    .ant-pagination-item {
      display: none;
    }
  }
`;
