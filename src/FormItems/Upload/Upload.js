import React from 'react';
import { Upload, message, Button, Icon } from 'antd';

const UploadFile = ({ handleChange, dataSource }) => (
  <Upload>
    <Button>
      <Icon type="upload" /> Click to Upload
    </Button>
  </Upload>
);

export default UploadFile;
