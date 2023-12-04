/* eslint-disable semi */
import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
const Spinner = () => (
  <Spin
    indicator={
      <LoadingOutlined
        style={{
          marginTop: '50px',
          fontSize: 50,
        }}
        spin
      />
    }
  />
);
export default Spinner;
