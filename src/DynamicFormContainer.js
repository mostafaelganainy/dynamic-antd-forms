import React, { useState, useCallback } from "react";

import _ from "lodash";

import DynamicForm from "./DynamicForm";

function DynamicFormContainer({
  fields,
  viewMode,
  handleSubmit,
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
      formValues={formValues}
      onChange={onChange}
    />
  );
}

export default DynamicFormContainer;
