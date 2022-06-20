import React, { useMemo } from "react";
import T from "prop-types";
import { Main} from "./styled";
import { Select } from "antd";
// import DoubleRight from "assets/images/his-core/double-right.svg";
// import DoubleLeft from "assets/images/his-core/double-left.svg";
import { Pagination } from "antd";

const { Option } = Select;
const AppPagination = (props) => {
  const {
    current,
    total,
    onChange = () => {},
    pageSizeOptions,
    onShowSizeChange = () => {},
    pageSize = 10,
    defaultPageSize,
    listData = [],
  } = props;
  // let currentPage = current * pageSize;
  // currentPage = Math.min(currentPage, total);
  let totalPage = parseInt(total / pageSize);
  if (totalPage * pageSize < total) totalPage += 1;

  const selectItem = () => (item) => {
    onShowSizeChange(item);
  };
  let countStart = (current - 1) * pageSize + 1;
  let countEnd = useMemo(() => {
    if (listData?.length === pageSize) {
      return current * pageSize;
    } else {
      return pageSize * current + listData?.length - pageSize;
    }
  });
  console.log("pageSize", pageSize);
  const dataPage = [10, 25, 50, 75, 100];
  return (
    <Main className="pagination-current">
      <div className="select-size">
        Rows per page:
        <Select defaultValue={10} bordered={false} onChange={selectItem()}>
          {dataPage.map((item) => {
            return (
              <Option key={item} value={item}>
                {item}
              </Option>
            );
          })}
        </Select>
        {countStart}-{countEnd} of {total}
      </div>
      <Pagination
        current={current}
        className="patient-paging"
        pageSize={pageSize}
        defaultPageSize={defaultPageSize}
        pageSizeOptions={pageSizeOptions}
        total={total}
        onChange={onChange}
        showLessItems={true}
      />
    </Main>
  );
};

AppPagination.defaultProps = {
  pageSizeOptions: ["10", "20", "50", "100"],
};

AppPagination.propTypes = {
  pageSizeOptions: T.array,
};

export default AppPagination;
