import _ from "lodash";

const ValidationTemplates = {
  REQUIRED: (intl, fieldOptions) => ({
    required: true,
    message: intl.formatMessage(
      { id: "formFields.validations.missingRequiredField" },
      { label: fieldOptions.label }
    )
  }),
  REGEX: (intl, fieldOptions, validation) => ({
    validator: (rule, value, callback) => {
      if (
        value &&
        value.length > 0 &&
        !new RegExp("^[a-zA-Z_][a-zA-Z0-9_]*$").test(value) // TODO: should be dynamic
      ) {
        callback(
          intl.formatMessage(
            { id: "formFields.validations.regexValidationFailed" },
            {
              label: fieldOptions.label,
              patternLabel: _.lowerCase(validation.params.patternLabel)
            }
          )
        );
        return;
      }
      callback();
    }
  }),
  // MIN: (intl, fieldOptions, validation) => ({
  //   validator: (rule, value, callback) => {
  //     if (value) {
  //       callback();
  //       return;
  //     }
  //     callback();
  //   }
  // }),
  // MAX: (intl, fieldOptions, validation) => ({
  //   validator: (rule, value, callback) => {
  //     if (value) {
  //       callback();
  //       return;
  //     }
  //     callback();
  //   }
  // }),
  CUSTOM_VALIDATION: (intl, fieldOptions, validation) => ({
    validator: validation.params.validator
  })
};

export const getAntDValidationRulesFromOptions = (
  fieldOptions,
  intl = { formatMessage: () => "CHANGE ME" } //
) =>
  fieldOptions.validations?.map(validation => {
    // TODO : Give a meaningful error on missing operation
    const template = ValidationTemplates[validation.operation]
      ? ValidationTemplates[validation.operation](
          intl,
          fieldOptions,
          validation
        )
      : [];

    return template;
  });
