function shouldRenderField(field, allFormValues) {
  // console.log(field, allFormValues);
  if (field.dependencyExpression) {
    with (allFormValues) {
      try {
        return eval(field.dependencyExpression);
      } catch {
        console.error(
          "dependency expression parse failure \n make sure fields that are depended on have 'defaultValue'"
        );
        return true;
      }
    }
  }
  return true;
}

module.exports = shouldRenderField;
