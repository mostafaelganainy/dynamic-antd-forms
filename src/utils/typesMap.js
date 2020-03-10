import React from "react";
import {
  Input,
  Switch,
  InputNumber,
  Select,
  TreeSelect,
  Upload,
  Button,
  Icon
} from "antd";
import _ from "lodash";

import dummyRequest from "./dummyRequest";

const typesMap = {
  TEXTBOX: () => <Input type="text" />,
  PASSWORD: () => <Input type="password" />,
  SPINNER_INPUT: field => (
    <InputNumber
      min={_.get(field, "fieldParams[0].minValue")}
      max={_.get(field, "fieldParams[0].maxValue")}
    />
  ),
  TEXTAREA: () => <Input.TextArea rows={4} />,
  SWITCH: () => <Switch />,
  SELECT: field => (
    <Select mode={field.mode}>
      {field.options?.map(dataOption => (
        <Select.Option key={dataOption.key} value={dataOption.value}>
          {dataOption.label}
        </Select.Option>
      ))}
    </Select>
  ),
  TREE_SELECT: field => (
    <TreeSelect
      treeData={field.treeData}
      placeholder={field.placeholder}
      treeDefaultExpandAll
    />
  ),
  FILE: field => {
    return (
      <Upload
        customRequest={dummyRequest} // TODO: leave that for the user to decide
        name={field.name}
        accept=".csv" // TODO
        beforeUpload={() => true} // TODO
        multiple={false}
      >
        <Button>
          <Icon type="upload" /> Upload CSV
        </Button>
      </Upload>
    );
  },
  CUSTOM: (field, fieldsValue) => {
    return field.renderer(field, fieldsValue);
  },
  SUBMIT_BUTTON: () => {
    return (
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    );
  }
};

export default typesMap;
