import React from "react";
import { Select } from "antd";
import PropTypes from "prop-types";
const { Option } = Select;

const Index = (props) => {
  const {
    data = [],
    showEnums = false,
    value,
    onChange,
    allowClear,
    placeholder,
    loading,
    className,
    autoFocus = false,
    ...rest
  } = props;
  return (
    <Select
      onChange={onChange}
      value={value}
      showSearch
      optionFilterProp="children"
      filterOption={(input, option) =>
        option &&
        option.children &&
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      allowClear={!allowClear}
      loading={loading}
      placeholder={placeholder}
      className={className}
      autoFocus={autoFocus}
      {...rest}
    >
      {showEnums &&
        data.map((option) => (
          <Option key={option.value} value={option.value}>
            {option.ten}
          </Option>
        ))}
      {!showEnums &&
        data.map((option) => {
          return (
            <Option
              lists={option}
              key={option[`${props.id}`] ? option[`${props.id}`] : option.id}
              value={option[`${props.id}`] ? option[`${props.id}`] : option.id}
              ref={option}
            >
              {option[`${props.ten}`] ? option[`${props.ten}`] : option.ten}
            </Option>
          );
        })}
    </Select>
  );
};

Index.propTypes = {
  showEnums: PropTypes.bool,
  data: PropTypes.array,
  onChange: PropTypes.func,
};

export default Index;
