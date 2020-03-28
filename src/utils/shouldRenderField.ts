import saferEval from 'safer-eval';
import { Field } from '../types';

const shouldRenderField = (field: Field, allFormValues: any) => {
  if (field.dependencyExpression) {
    try {
      return saferEval(field.dependencyExpression, allFormValues);
    } catch {
      console.error(
        "dependency expression parse failure \n make sure fields that are depended on have 'defaultValue'"
      );
      return true;
    }
  }
  return true;
};

export default shouldRenderField;
