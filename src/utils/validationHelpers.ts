import { FieldValidation } from '../types';

const ValidationTemplates: any = {
  REQUIRED: (intl: any, fieldOptions: any) => ({
    required: true,
    message: intl.formatMessage(
      { id: 'formFields.validations.missingRequiredField' },
      { label: fieldOptions.label }
    ),
  }),
  REGEX: (intl: any, fieldOptions: any, validation: FieldValidation) => ({
    validator: (_rule: any, value: any, callback: any) => {
      if (
        value &&
        value.length > 0 &&
        !new RegExp('^[a-zA-Z_][a-zA-Z0-9_]*$').test(value) // TODO: should be dynamic
      ) {
        callback(
          intl.formatMessage(
            { id: 'formFields.validations.regexValidationFailed' },
            {
              label: fieldOptions.label,
              patternLabel: validation.params.patternLabel?.toLowerCase(),
            }
          )
        );
        return;
      }
      callback();
    },
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
  CUSTOM_VALIDATION: (_intl: any, _fieldOptions: any, validation: any) => ({
    validator: validation.params.validator,
  }),
};

export const getAntDValidationRulesFromOptions = (
  fieldOptions: any,
  intl = { formatMessage: () => 'CHANGE ME' } //
) =>
  fieldOptions.validations?.map((validation: FieldValidation) => {
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
