import React from 'react';
import { Form } from 'antd';

import JSONFormFields from './JSONFormFields';
import { Field } from './types';

export interface JsonFormProps {
  name: string;
  form: any;
  fields: Field[];
  onSubmit: any;
  onChange: any;
  formId: string;
  style: any;
  defaultValues: any;
}

const DynamicForm = (props: JsonFormProps) => {
  const [form] = Form.useForm();

  const onValuesChange = (_changedValues: any, allValues: any) => {
    props.onChange?.(allValues);
  };

  return (
    <Form
      name={props.name || 'nameless_json_form'} // TODO : should name be required ?
      form={form}
      onValuesChange={onValuesChange}
      onFinish={props.onSubmit}
      id={props.formId}
      style={props.style}
      initialValues={
        props.defaultValues && Object.fromEntries(props.defaultValues)
      }
    >
      <JSONFormFields form={form} fields={props.fields} />
    </Form>
  );
};

export default DynamicForm;
