import React from "react";
import { Select as AntSelect } from "antd";

const AntOption = AntSelect.Option;

const Select = ({ handleChange, field }) => (
  <AntSelect defaultValue={field.defaultValue} onChange={handleChange}>
    {field.options.map(dataOption => (
      <AntOption value={dataOption.value}>{dataOption.label}</AntOption>
    ))}
  </AntSelect>
);

export default Select;
