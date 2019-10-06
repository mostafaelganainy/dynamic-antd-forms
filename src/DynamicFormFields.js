import React, { useState } from "react";
import _ from "lodash";

import { Form, Input, Switch, InputNumber } from "antd";
import Select from "./FormItems/Select/Select";

import { getAntDValidationRulesFromOptions } from "./FormItems/validationHelpers";

const { TextArea } = Input;

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

      console.log({ targetPropertyValue, condition, formValues });

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
      <Select field={field} {...getInjectedProps(field, formValues)} />
    )
  };
  return (
    <React.Fragment>
      {console.log({ fields })}
      {fields.map(
        fieldOptions =>
          typesMap[fieldOptions.type] &&
          shouldRenderField(fieldOptions, formValues) && (
            <Form.Item key={fieldOptions.name} label={fieldOptions.label}>
              {getFieldDecorator(fieldOptions.name, {
                rules: getAntDValidationRulesFromOptions(fieldOptions, intl),
                initialValue:
                  formValues[(fieldOptions?.name)] || fieldOptions.defaultValue
              })(typesMap[fieldOptions.type](fieldOptions, formValues))}
            </Form.Item>
          )
      )}
    </React.Fragment>
  );
}

export default DynamicFormFields;
