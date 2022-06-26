import styled from "styled-components";
export const Main = styled.div`
  max-width: 100%;
  .ant-table-wrapper {
    & .ant-spin-nested-loading {
      & .ant-spin-container {
        & .ant-table {
          & .ant-table-container {
            display: flex;
            flex-direction: column;

            & .ant-table-thead {
              th.ant-table-cell {
                background-color: #c4eaf8;
                border-right: 1px solid #e0e0e0;
                font-weight: bold;
              }
            }

            & .ant-table-tbody {
              & .ant-table-row {
                &:nth-child(2n) {
                  td {
                    background-color: #e3e9ec;
                    border-right: 1px solid #e0e0e0;
                  }
                }
                th.ant-table-cell {
                  border-right: 1px solid #e0e0e0;
                  padding: 8px !important;
                }
              }
              .ant-table-cell {
                padding: 12px !important;
              }
            }
          }
        }
      }
    }
  }
`;
