import React, { Component } from 'react';
import {
  Form,
  Input,

} from 'antd';
import PropTypes from 'prop-types';

const Item = Form.Item;

class AddForm extends Component {
  static propTypes = {
    setForm: PropTypes.func
  }

  constructor(props) {
    super(props);
    props.setForm(props.form);
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 }
    }
    return (
      <Form>
        <Item label="角色名称" {...formItemLayout}>
          {
            getFieldDecorator('roleName', {
              initialValue: '',
              rules: [
                { required: true, message: '必须输入角色名' }
              ]
            })(<Input type='text' placeholder='请输入角色名称' />)
          }
        </Item>
      </Form>
    )
  }
}

export default AddForm = Form.create()(AddForm);