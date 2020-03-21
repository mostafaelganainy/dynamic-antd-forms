import safeEval from "safe-eval";

export const shouldRenderField = (field, allFormValues) => {
  if (field.dependencyExpression) {
    try {
      return safeEval(field.dependencyExpression, allFormValues);
    } catch {
      console.error(
        "dependency expression parse failure \n make sure fields that are depended on have 'defaultValue'"
      );
      return true;
    }
  }
  return true;
};
