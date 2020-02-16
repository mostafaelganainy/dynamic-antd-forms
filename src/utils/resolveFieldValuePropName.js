const resolveFieldValuePropName = fieldOptions => {
  // We need to do this to avoid antd console error. Upload doesn't accept 'value'(default) as options.valuePropName
  switch (fieldOptions?.type) {
    case "FILE":
      // TODO: should handle it so that we can support file && fileList
      return { valuePropName: "file" };
    case "SWITCH":
      return { valuePropName: "checked" };
    default:
      return {};
  }
};

export default resolveFieldValuePropName;
