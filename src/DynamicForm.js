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
  formValues,
  controlled,
  antProps
}) {
  const excuteAction = e => {
    e.preventDefault();
    if (!controlled) {
      form.validateFields((err, values) => {
        handleSubmit(values);
      });
    }
  };

  return (
    <Form onSubmit={excuteAction} {...antProps}>
      <FormFields
        form={form}
        fields={fields}
        disableAll={viewMode}
        formValues={formValues}
      />
      {!controlled ? (
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={viewMode}>
            Save
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={handleCancel}>
            Cancel
          </Button>
        </Form.Item>
      ) : null}
    </Form>
  );
}

export default Form.create({
  name: "data_source_form",
  onValuesChange(props, values) {
    props.onChange(values);
  }
})(DynamicForm);
