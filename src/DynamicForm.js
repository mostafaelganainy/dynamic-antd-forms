import React from "react";
import _ from "lodash";
import { Form } from "antd";

import FormFields from "./DynamicFormFields";
import shouldSubmit from "./utils/shouldSubmit";

const DynamicForm = props => {
  const handleSubmit = e => {
    e.preventDefault(); // TODO: should we assume this ??
    props.form.validateFields();

    if (shouldSubmit(props.form.getFieldsError()))
      props.onSubmit?.(props.form.getFieldsValue());
  };

  return (
    <Form onSubmit={handleSubmit} id={props.formId}>
      <FormFields
        form={props.form}
        fields={props.fields}
        defaultValues={props.defaultValues}
      />
    </Form>
  );
};

export default Form.create({
  name: "data_source_form",
  onValuesChange: (props, changedValues, allValues) => {
    props.onChange?.(allValues);
  },
  onFieldsChange: (props, changedFields, allFields) => {
    const fieldsKeyValue = Object.entries(allFields);
    const predicate = field => _.get(field, "[1].errors.length") > 0;
    props.onErrors?.(fieldsKeyValue.filter(predicate).map(field => field[1]));
  }
})(DynamicForm);
