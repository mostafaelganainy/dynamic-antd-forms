import React, { useState, useCallback } from "react";

import _ from "lodash";

import DynamicForm from "./DynamicForm";

function DynamicFormContainer({
  fields,
  viewMode,
  handleSubmit,
  handleCancel,
  initialFormData
}) {
  const [formValues, setFormValues] = useState(initialFormData || {});

  const onChange = useCallback(
    changedFieldValues => {
      setFormValues(_.assign(formValues, changedFieldValues));
    },
    [formValues]
  );

  return (
    <DynamicForm
      fields={fields}
      viewMode={viewMode}
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
      formValues={formValues}
      onChange={onChange}
    />
  );
}

export default DynamicFormContainer;
