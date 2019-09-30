import React from 'react';
import { Select } from 'antd';

const Option = Select.Option;

const List = ({ handleChange, dataSource }) => (
  <Select defaultValue={dataSource.defaultValue} onChange={handleChange}>
    {dataSource.possibleValues.map(dataOption => (
      <Option value={dataOption.value}>{dataOption.label}</Option>
    ))}
  </Select>
);

export default List;
