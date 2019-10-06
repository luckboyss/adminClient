import React, { Component } from 'react';
import {
  Form,
  Input,
  Select,
} from 'antd';
import PropTypes from 'prop-types';

const Item = Form.Item;
const Option = Select.Option;

/*
添加/修改用户的form组件
*/
class UserForm extends Component {

  static propTypes = {
    setForm: PropTypes.func.isRequired, // 用来传递form对象的函数
    roleList: PropTypes.array.isRequired,
    user: PropTypes.object
  }

  constructor(props) {
    super(props);
    props.setForm(props.form);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { roleList, user } = this.props;
    const formItemLayout = {
      labelCol: { span: 4 }, // 左侧label的宽度
      wrapperCol: { span: 15 } // 右侧包裹的宽度
    }
    return (
      <Form {...formItemLayout}>
        <Item label="用户名" >
          {
            getFieldDecorator('username', {
              initialValue: user.username,
              rules: [
                { required: true, whitespace: true, message: '必须输入用户名' },
                { min: 4, message: '用户名不能小于4位' },
                { max: 12, message: '用户名不能大于12位' },
                { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文，数值或下划线组成' }
              ]
            })(<Input type='text' placeholder='请输入用户名' />)
          }
        </Item>
        {
          user._id ? null : (
            <Item label="密码" >
              {
                getFieldDecorator('password', {
                  initialValue: '',
                  rules: [
                    { required: true, whitespace: true, message: '必须输入密码' },
                    { min: 4, message: '密码不能小于4位' },
                    { max: 12, message: '密码不能大于12位' },
                    { pattern: /^[a-zA-Z0-9_]+$/, message: '密码必须是英文，数值或下划线组成' }
                  ]
                })(<Input type='text' placeholder='请输入密码' />)
              }
            </Item>
          )
        }
        <Item label="手机号" >
          {
            getFieldDecorator('phone', {
              initialValue: user.phone,
              rules: [
                { required: true, message: '必须输入手机号' }
              ]
            })(<Input type='text' placeholder='请输入手机号' />)
          }
        </Item>
        <Item label="邮箱" >
          {
            getFieldDecorator('email', {
              initialValue: user.email,
            })(<Input type='text' placeholder='请输入邮箱' />)
          }
        </Item>
        <Item label="角色" >
          {
            getFieldDecorator('role_id', {
              initialValue: user.role_id,
              rules: [
                { required: true, message: '必须指定角色' }
              ]
            })(
              <Select>
                {
                  roleList.map(role => (
                    <Option value={role._id} key={role._id}>{role.name}</Option>
                  ))
                }
              </Select>
            )
          }
        </Item>
      </Form>
    )
  }
}

export default Form.create()(UserForm);
