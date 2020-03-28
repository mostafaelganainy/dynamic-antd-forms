import React from 'react';
import { Form } from 'antd';

import { getAntDValidationRulesFromOptions } from './utils/validationHelpers';
import shouldRenderField from './utils/shouldRenderField';
import typesMap from './utils/typesMap';
import resolveFieldValuePropName from './utils/resolveFieldValuePropName';
import { Field } from './types';

const JSONFormFields = (props: any) => {
  return props.fields.map(
    (field: Field) =>
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
  );
};

export default JSONFormFields;
