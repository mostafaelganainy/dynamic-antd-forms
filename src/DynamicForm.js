import React from "react";
import { Form } from "antd";

import FormFields from "./DynamicFormFields";

const DynamicForm = props => {
  const [form] = Form.useForm();

  const onValuesChange = (changedValues, allValues) => {
    props.onChange?.(allValues);
  };

  return (
    <Form
      name={props.name || "nameless_json_form"} // TODO : should name be required ?
      form={form}
      onValuesChange={onValuesChange}
      onFinish={props.onSubmit}
      id={props.formId}
      style={props.style}
      initialValues={
        props.defaultValues && Object.fromEntries(props.defaultValues)
      }
    >
      <FormFields form={form} fields={props.fields} />
    </Form>
  );
};

export default DynamicForm;
