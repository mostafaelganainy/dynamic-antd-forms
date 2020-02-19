import React from "react";
import { Form } from "antd";
import _ from "lodash";

import { getAntDValidationRulesFromOptions } from "./utils/validationHelpers";
import shouldRenderField from "./utils/shouldRenderField";
import typesMap from "./utils/typesMap";
import resolveFieldValuePropName from "./utils/resolveFieldValuePropName";

function DynamicFormFields(props) {
  return (
    <React.Fragment>
      {props.fields.map(
        field =>
          typesMap[field.type] &&
          shouldRenderField(field, props.form.getFieldsValue()) && (
            <Form.Item key={field.name} label={field.label} style={field.style}>
              {props.form.getFieldDecorator(field.name, {
                ...resolveFieldValuePropName(field),
                rules: getAntDValidationRulesFromOptions(field),
                initialValue:
                  _.get(props, `defaultValues.${field.name}`) ||
                  field.defaultValue
              })(typesMap[field.type](field, props.form.getFieldsValue()))}
            </Form.Item>
          )
      )}
    </React.Fragment>
  );
}

export default DynamicFormFields;
