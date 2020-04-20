import React, { useState, useEffect } from 'react';
import { Form } from 'antd';

import { Field } from './types';
import { getAntDValidationRulesFromOptions } from './utils/validationHelpers';
import shouldRenderField from './utils/shouldRenderField';
import typesMap from './utils/typesMap';
import resolveFieldValuePropName from './utils/resolveFieldValuePropName';

export interface JsonFormProps {
  name: string;
  form?: any;
  fields: Field[];
  onSubmit: any;
  onChange?: any;
  formId?: string;
  style?: any;
  defaultValues?: any;
}

const JSONForm = (props: JsonFormProps) => {
  const [form] = Form.useForm();

  //This needs to be done. "form.getFieldsValue()" and others methods that deal with the form's internal state,
  //Must be called after the form is rendered.
  const [fieldsValue, setFieldsValue] = useState({});
  useEffect(() => {
    setFieldsValue(
      props.defaultValues && Object.fromEntries(props.defaultValues)
    );
  }, [props.defaultValues]);

  const onValuesChange = (_changedValues: any, allValues: any) => {
    setFieldsValue(allValues);
    props.onChange?.(allValues);
  };

  return (
    <Form
      name={props.name}
      form={form}
      onValuesChange={onValuesChange}
      onFinish={props.onSubmit}
      id={props.formId}
      style={props.style}
      initialValues={
        props.defaultValues && Object.fromEntries(props.defaultValues)
      }
    >
      {props.fields.map(
        (field: Field) =>
          typesMap[field.type] &&
          shouldRenderField(field, fieldsValue) && (
            <Form.Item
              name={field.name}
              rules={getAntDValidationRulesFromOptions(field)}
              key={field.key || field.name}
              label={field.label}
              style={field.style}
              {...resolveFieldValuePropName(field)}
            >
              {typesMap[field.type](field, fieldsValue)}
            </Form.Item>
          )
      )}
    </Form>
  );
};

export default JSONForm;
