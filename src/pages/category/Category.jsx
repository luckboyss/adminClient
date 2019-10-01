import React, { Component } from 'react';
import {
  Modal,
  Button,
  Icon,
  Card,
  Table,
  message,
} from 'antd';


import AddUpdateForm from './AddUpdateForm';
import LinkButton from '../../components/LinkButton';
import { reqCategoryList ,reqAddCategory, reqUpdateCategory } from '../../api';


/* 
*分类管理*
*/

export default class Category extends Component {
  constructor(props) {
    super(props);
    this.initColumns();
  }

  state = {
    categoryList: [], // 所有分类的数组
    loading: false, // 是否在请求加载中
    actionType: 'ADD', // 对话框种类, 'ADD': 添加分类, 'Update': 修改分类
    isShow: false, // 是否显示对话框 
  }

  /* 
  初始化table的所有列信息的数组
  */
  initColumns = () => {
    this.columns = [
      {
        title: '分类的名称',
        dataIndex: 'name',
      },
      {
        title: '操作',
        width: 300,
        render: (category) => <LinkButton onClick={() => {
          this.category = category; // 保存当前分类, 其他地方都可以读取到
          if (this.form) this.form.resetFields();
          this.setState({
            actionType: 'Update',
            isShow: true,
          });
        }}>修改分类</LinkButton>
      },
    ];
  }

  /* 
  异步获取分类列表显示
  */
  getCategoryList = async () => {
    // 显示loading
    this.setState({ loading: true });
    const { status, data } = await reqCategoryList();
    // 隐藏loading
    this.setState({ loading: false });
    if (status === 0) {
      this.setState({
        categoryList: data
      });
    } else {
      message.error('获取分类列表失败');
    }
  }

  /*
  点击确定的回调: 去添加/修改分类
  */
  handleOk = () => {
    this.form.validateFields(async (err, values) => {
      if (!err) {
        
        const { categoryName } = values;
        
        let {actionType} = this.state;
        if (actionType==='ADD') {
          // 发添加分类的请求
          const result = await reqAddCategory(categoryName);
          if (result.status === 0) {
            this.getCategoryList();
            message.success(`添加分类${result.data.name}成功`);
          } else {
            message.error(result.msg);
          }
        } else if (actionType==='Update'){
          // 发更新分类的请求
          const categoryId = this.category._id;
          const result = await reqUpdateCategory({categoryId, categoryName});
          if (result.status === 0) {
            this.getCategoryList();
            message.success('修改分类成功');
          } else {
            message.error('修改分类失败');
          }
        }
        this.setState({ isShow: false });
      } else {
        message.error('验证失败')
      }
    });
  }

  /*
  点击取消的回调: 
  */
  handleCancel = () => {
    //this.form.resetFields();
    this.setState({
      isShow: false
    });
  }

  componentDidMount() {
    this.getCategoryList();
  }

  render() {
    const { categoryList, loading, actionType, isShow } = this.state;

    // 读取更新的分类名称
    const category = this.category || {};

    // card右上角的结构
    const extra = (
      <Button type='primary' onClick={() => {
        this.category = {};
        if (this.form) this.form.resetFields();
        this.setState({
          actionType: 'ADD',
          isShow: true,
        });
        
      }}>
        <Icon type='plus' />
        添加
      </Button>
    );

    return (
      <div>
        <Card extra={extra}>
          <Table
            bordered
            loading={loading}
            rowKey='_id'
            columns={this.columns}
            dataSource={categoryList}
            pagination={{ defaultPageSize: 5, showQuickJumper: true }}
          />
        </Card>

        <Modal
          title={actionType === 'ADD' ? '添加分类' : '修改分类'}
          visible={isShow}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {/* 将子组件传递过来的form对象保存到当前组件对象上 */}
          <AddUpdateForm setForm={form => {this.form = form}} categoryName={category.name} />
        </Modal>
      </div>
    )
  }
}
