import React, { useState } from "react";
import _ from "lodash";

import {
  Form,
  Input,
  Switch,
  InputNumber,
  Select,
  Upload,
  Button,
  Icon
} from "antd";

import { getAntDValidationRulesFromOptions } from "./FormItems/validationHelpers";

const { TextArea } = Input;

const dummyRequest = ({ file, onSuccess }) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 0);
};

function DynamicFormFields({ form, fields, disableAll, intl, formValues }) {
  const { getFieldDecorator } = form;

  const getInjectedProps = (field, formValues) => {
    const rootFields = _.chain(field.dependencies?.neededFields)
      .map(path => _.split(path, "."))
      .map(_.first)
      .uniq()
      .value();

    return _.pick(formValues, rootFields);
  };

  const shouldRenderField = field =>
    !field.dependencies?.displayConditions ||
    field.dependencies?.displayConditions?.every(condition => {
      const targetPropertyValue = _.get(formValues, condition.propertyName);

      switch (condition.operation) {
        case "NOT_NULL":
          return targetPropertyValue;
        case "VALUE_IN":
          return condition.params.list.includes(targetPropertyValue);
        case "IS_NULL":
          return !targetPropertyValue;
        case "VALUE_NOT_IN":
          return !condition.params.list.includes(targetPropertyValue);
        default:
          throw new Error(`"${condition.operation}" is not supported`);
      }
    });

  const typesMap = {
    TEXTBOX: (field, formValues) => (
      <Input
        type="text"
        disabled={disableAll}
        {...getInjectedProps(field, formValues)}
      />
    ),
    PASSWORD: (field, formValues) => (
      <Input
        type="password"
        disabled={disableAll}
        {...getInjectedProps(field, formValues)}
      />
    ),
    SPINNER_INPUT: (field, formValues) => (
      <InputNumber
        min={field.fieldParams?.minValue}
        max={field.fieldParams?.maxValue}
        disabled={disableAll}
        {...getInjectedProps(field, formValues)}
      />
    ),
    TEXTAREA: (field, formValues) => (
      <TextArea
        rows={4}
        disabled={disableAll}
        {...getInjectedProps(field, formValues)}
      />
    ),
    BOOLEAN: (field, formValues) => (
      <Switch
        defaultChecked={field.defaultValue}
        disabled={disableAll}
        {...getInjectedProps(field, formValues)}
      />
    ),
    SELECT: (field, formValues) => (
      <Select>
        {field.options?.map(dataOption => (
          <Select.Option key={dataOption.key} value={dataOption.value}>
            {dataOption.label}
          </Select.Option>
        ))}
      </Select>
    ),
    FILE: (field, formValues) => {
      return (
        <Upload
          customRequest={dummyRequest}
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
    CUSTOM: (field, formValues) => {
      return field.renderer;
    }
  };

  const resolveFieldValuePropName = fieldOptions => {
    // We need to do this to avoid antd console error. Upload doesn't accept 'value'(default) as options.valuePropName
    return fieldOptions?.type === "FILE"
      ? {
          valuePropName: "file" // TODO: should handle it so that we can support file && fileList
        }
      : {};
  };

  return (
    <React.Fragment>
      {fields.map(
        fieldOptions =>
          typesMap[fieldOptions.type] &&
          shouldRenderField(fieldOptions, formValues) && (
            <Form.Item key={fieldOptions.name} label={fieldOptions.label}>
              {getFieldDecorator(fieldOptions.name, {
                ...resolveFieldValuePropName(fieldOptions),
                rules: getAntDValidationRulesFromOptions(fieldOptions, intl),
                initialValue:
                  formValues[fieldOptions?.name] || fieldOptions.defaultValue
              })(typesMap[fieldOptions.type](fieldOptions, formValues))}
            </Form.Item>
          )
      )}
    </React.Fragment>
  );
}

export default DynamicFormFields;
