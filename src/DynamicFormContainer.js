import React, { useState, useCallback } from "react";
import _ from "lodash";
import PropTypes from "prop-types";

import DynamicForm from "./DynamicForm";

function DynamicFormContainer({
  fields,
  viewMode,
  handleSubmit,
  handleCancel,
  initialFormData,
  controlled,
  handleChange,
  antProps,
  onErrors
}) {
  const [formValues, setFormValues] = useState(initialFormData || {});

  const onChange = changedFieldValues => {
    // koko
    const newFormValues = _.assign({}, formValues, changedFieldValues);
    setFormValues(newFormValues);
    if (controlled) {
      handleChange(newFormValues);
    }
  };

  return (
    <DynamicForm
      fields={fields}
      viewMode={viewMode}
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
      formValues={formValues}
      onChange={onChange}
      controlled={controlled}
      antProps={antProps}
      onErrors={onErrors}
    />
  );
}

DynamicFormContainer.propTypes = {
  controlled: PropTypes.bool,
  handleChange: PropTypes.func
};

DynamicFormContainer.defaultProps = {
  controlled: false,
  handleChange: () => {}
};

export default DynamicFormContainer;
