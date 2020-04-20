export type FieldType =
  | 'TEXTBOX'
  | 'FILE'
  | 'SELECT'
  | 'TREE_SELECT'
  | 'SPINNER_INPUT'
  | 'RADIO_BUTTON'
  | 'SWITCH'
  | 'CUSTOM'
  | 'SUBMIT_BUTTON';

export type ValidationOperation = 'REQUIRED' | 'REGEX' | 'CUSTOM_VALIDATION';

export type FieldValidation = {
  operation: ValidationOperation;
  params?: any;
};

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  validations?: FieldValidation[];
  fieldParams?: any;
  dependencyExpression?: string;
  defaultValue?: any; // TODO: should be removed
  style?: any;
  options?: any;
  mode?: any; // TODO: should be moved to options
  treeData?: any; // TODO: ??
  placeholder?: string;
  renderer?: any;
  key?: string;
};
