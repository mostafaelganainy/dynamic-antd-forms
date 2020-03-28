import React from 'react';
import {
  Input,
  Switch,
  InputNumber,
  Select,
  TreeSelect,
  Upload,
  Button,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import dummyRequest from './dummyRequest';
import { Field } from '../types';

const typesMap: any = {
  TEXTBOX: () => <Input type="text" />,
  PASSWORD: () => <Input type="password" />,
  SPINNER_INPUT: () => <InputNumber />,
  TEXTAREA: () => <Input.TextArea rows={4} />, // TODO: consider supporting resizable and/or dynamic rows
  SWITCH: () => <Switch />,
  SELECT: (field: Field) => (
    // TODO: field.mode is awful and should be moved to field.params or something
    <Select mode={field.mode}>
      {field.options?.map((dataOption: any) => (
        <Select.Option key={dataOption.value} value={dataOption.value}>
          {dataOption.label}
        </Select.Option>
      ))}
    </Select>
  ),
  TREE_SELECT: (field: Field) => (
    <TreeSelect
      treeData={field.treeData}
      placeholder={field.placeholder}
      treeDefaultExpandAll // TODO
    />
  ),
  FILE: (field: Field) => {
    return (
      <Upload
        name={field.name}
        customRequest={dummyRequest} // TODO: leave that for the user to decide ?
        accept=".csv" // TODO
        beforeUpload={() => true} // TODO
        multiple={false} // TODO
      >
        <Button>
          <UploadOutlined /> Upload CSV
        </Button>
      </Upload>
    );
  },
  CUSTOM: (field: Field, fieldsValue: any) => {
    return field.renderer(field, fieldsValue);
  },
  SUBMIT_BUTTON: () => {
    return (
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    );
  },
};

export default typesMap;
