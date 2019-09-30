import React, { useState, useCallback } from "react";

import _ from "lodash";

import DeclarativeForm from "./DeclarativeForm";

function DeclarativeFormContainer({
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
    <DeclarativeForm
      fields={fields}
      viewMode={viewMode}
      handleSubmit={handleSubmit}
      formValues={formValues}
      onChange={onChange}
    />
  );
}

export default DeclarativeFormContainer;
