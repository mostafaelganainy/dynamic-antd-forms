import saferEval from 'safer-eval';
import { Field } from '../types';

const shouldRenderField = (field: Field, allFormValues: any) => {
  if (field.dependencyExpression) {
    try {
      return saferEval(field.dependencyExpression, allFormValues);
    } catch {
      if (process.env.NODE_ENV === 'development') {
        console.error(
          'Dependency expression parse failure \n Field will get rendered anyway \n Make sure fields that are depended on have a default value'
        );
      }
      return true;
    }
  }
  return true;
};

export default shouldRenderField;
