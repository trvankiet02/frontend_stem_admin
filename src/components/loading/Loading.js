import React from 'react';
import { Spin } from 'antd';
import './Loading.scss';

export default function Loading(props) {
  return (
    <div className="Loading">
    <Spin tip="Loading" size="large" spinning={props.Loading}></Spin>
  </div>
  );
}