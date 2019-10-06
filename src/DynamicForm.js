import React from "react";

import _ from "lodash";

import { Form, Button } from "antd";

import FormFields from "./DynamicFormFields";

function DynamicForm({
  form,
  fields,
  viewMode,
  handleSubmit,
  handleCancel,
  formValues
}) {
  const excuteAction = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      handleSubmit(values);
    });
  };

  return (
    <Form onSubmit={excuteAction}>
      <FormFields
        form={form}
        fields={fields}
        disableAll={viewMode}
        formValues={formValues}
      />
      <Form.Item>
        <Button type="primary" htmlType="submit" disabled={viewMode}>
          Save
        </Button>
        <Button style={{ marginLeft: 8 }} onClick={handleCancel}>
          Cancellll555
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Form.create({
  name: "data_source_form",
  onValuesChange(props, values) {
    props.onChange(values);
  }
})(DynamicForm);
