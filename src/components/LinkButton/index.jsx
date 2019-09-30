import React from 'react';
import './index.less';

/* 
自定义看似链接的button组件
1. {...props}: 将接受到的所有属性传递给子标签
2. children标签属性:
  字符串
  标签对象
  标签对象数组
*/
export default function LinkButton(props) {
  return <button className='link-button' {...props} />
}