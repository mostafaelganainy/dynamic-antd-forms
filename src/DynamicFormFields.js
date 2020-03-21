import React from "react";
import { Form } from "antd";

import { getAntDValidationRulesFromOptions } from "./utils/validationHelpers";
import shouldRenderField from "./utils/shouldRenderField";
import typesMap from "./utils/typesMap";
import resolveFieldValuePropName from "./utils/resolveFieldValuePropName";

const DynamicFormFields = props => {
  return (
    <React.Fragment>
      {props.fields.map(
        field =>
          typesMap[field.type] &&
          shouldRenderField(field, props.form.getFieldsValue()) && (
            <Form.Item
              name={field.name}
              rules={getAntDValidationRulesFromOptions(field)}
              key={field.name}
              label={field.label}
              style={field.style}
              {...resolveFieldValuePropName(field)}
            >
              {typesMap[field.type](field, props.form.getFieldsValue())}
            </Form.Item>
          )
      )}
    </React.Fragment>
  );
};

export default DynamicFormFields;
