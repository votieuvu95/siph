import styled from "styled-components";
export const Main = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
  .ant-table-wrapper {
    height: 100%;
    & .ant-spin-nested-loading {
      height: 100%;
      & .ant-spin-container {
        height: 100%;
        & .ant-table {
          height: 100%;
          & .ant-table-container {
            height: 100%;
            display: flex;
            flex-direction: column;
            & .ant-table-header{
              overflow: unset !important;
              & .ant-table-thead {
              th.ant-table-cell {
                background-color: #c4eaf8;
              }
            }
            }
           
            & .ant-table-body {
              min-height: unset !important;
              max-height: unset !important;
              & .ant-table-tbody {
                & .ant-table-row {
                  &:nth-child(2n) {
                    td {
                      background-color: #e3e9ec;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
