import React, { Component } from 'react';
import {
  Card,
  Icon,
  Form,
  Input,
  Select,
  Button,
  message,
} from 'antd';

import { reqAddUpdateProduct } from '../../api';
import RichTextEditor from './RichTextEditor';
import PictureWall from './PictureWall';
import { reqCategoryList } from '../../api';
import LinkButton from '../../components/LinkButton';
import memoryUtils from '../../utils/memoryUtils';
const Item = Form.Item;
const Option = Select.Option;


/* 
商品详情路由组件
*/
class ProductAddUpdate extends Component {
  constructor(props) {
    super(props);
    this.product = memoryUtils.product;
    this.isUpdate = !!this.product._id;
    // 创建ref容器, 并保存到组件对象
    this.pwRef = React.createRef();
    this.editorRef = React.createRef();
    this.state = {
      categoryList: []
    }
  }

  getCategoryList = async () => {
    const result = await reqCategoryList();
    if (result.status === 0) {
      const categoryList = result.data;
      this.setState({
        categoryList
      });
    }
  }

  /* 
  对价格进行自定义验证
  */
  validatePrice = (rule, value, callback) => {
    if (value === '') {
      callback();
    } else if (value * 1 <= 0) {
      callback('价格必须大于0');
    } else {
      callback();
    }
  }

  /* 
  处理提交的回调
  */
  handleSubmit = (e) => {
    e.preventDefault();
    // 进行统一的表单验证
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const { name, desc, price, categoryId } = values;
        // 收集上传的图片文件名数组
        const imgs = this.pwRef.current.getImgs();
        // 输入的商品详情的标签字符串
        const detail = this.editorRef.current.getDetail();

        // 封装product对象
        const product = {
          categoryId,
          name,
          desc,
          price,
          detail,
          imgs,
        }
        if (this.isUpdate) {
          product._id = this.product._id;
        }

        // 发请求添加或修改
        const result = await reqAddUpdateProduct(product);
        if (result.status === 0) {
          message.success(`${this.isUpdate ? '修改' : '添加'}商品成功`);
          this.props.history.replace('/product');
        } else {
          message.error(result.msg);
        }
      } else {
        message.error('验证失败');
      }
    })
  }

  componentDidMount() {
    this.getCategoryList();
  }

  /* componentWillUnmount() {
    memoryUtils.product = {};
  } */

  render() {
    const { categoryList } = this.state;
    const { isUpdate, product } = this;
    /* let categoryName;
    if (isUpdate && categoryList.length > 0) {
      categoryName = categoryList.find((c) => c._id === product.categoryId).name;
    } */

    const { getFieldDecorator } = this.props.form;

    const title = (
      <span>
        <LinkButton onClick={this.props.history.goBack}>
          <Icon type='arrow-left' />
        </LinkButton>
        <span>{isUpdate ? '修改商品' : '添加商品'}</span>
      </span>
    );

    // 指定form中所有item的布局
    const formLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 8 }
    }


    return (
      <Card title={title} className='detail'>
        <Form {...formLayout} onSubmit={this.handleSubmit}>
          <Item label='商品名称'>
            {getFieldDecorator('name', {
              initialValue: product.name,
              rules: [{ required: true, message: '必须输入商品名称!' }],
            })(<Input placeholder='商品名称' />)}
          </Item>
          <Item label='商品描述'>
            {getFieldDecorator('desc', {
              initialValue: product.desc,
              rules: [{ required: true, message: '必须输入商品描述!' }],
            })(<Input placeholder='商品描述' />)}
          </Item>
          <Item label='商品价格'>
            {getFieldDecorator('price', {
              initialValue: product.price,
              rules: [
                { required: true, message: '必须输入价格!' },
                { validator: this.validatePrice }
              ],
            })(<Input type='number' placeholder='商品价格' addonAfter='元' />)}
          </Item>
          <Item label='商品分类'>
            {getFieldDecorator('categoryId', {
              initialValue: (categoryList.length > 0 ? product.categoryId : '') || '',
              rules: [{ required: true, message: '必须输入商品分类!' }],
            })(
              <Select>
                <Option value=''>未选择</Option>
                {
                  categoryList.map(c => <Option value={c._id} key={c._id}>{c.name}</Option>)
                }
              </Select>
            )}
          </Item>
          <Item label='商品图片'>
            {/* 将容器交给需要标记的标签对象, 
            在解析时自动将标签对象保存到容器中
            (属性名为: currrent, 属性值为标签对象) */}
            <PictureWall ref={this.pwRef} imgs={product.imgs} />
          </Item>
          <Item label='商品详情' wrapperCol={{ span: 20 }}>
            <RichTextEditor ref={this.editorRef} detail={product.detail} />
          </Item>
          <Item>
            <Button type='primary' htmlType='submit'>提交</Button>
          </Item>
        </Form>
      </Card>
    );
  }
}
export default Form.create()(ProductAddUpdate);