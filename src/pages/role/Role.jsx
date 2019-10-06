import React, { Component } from 'react';
import {
  Card,
  Table,
  Button,
  Modal,
  message,
} from 'antd';


import AddForm from './AddForm';
import AuthForm from './AuthForm';
import { PAGE_SIZE } from '../../utils/constants';
import { formateDate } from '../../utils/dateUtils';
import LinkButton from '../../components/LinkButton';
import { reqRoleList, reqAddRole, reqUpdateRole } from '../../api';
import memoryUtils from '../../utils/memoryUtils';

/* 
角色路由
*/
export default class Role extends Component {

  state = {
    roleList: [
      /* {
        "menus": [
          "/role",
          "/charts/bar",
          "/home",
          "/category"
        ],
        "_id": "5ca9eaa1b49ef916541160d3",
        "name": "测试",
        "create_time": 1554639521749,
        "__v": 0,
        "auth_time": 1558679920395,
        "auth_name": "test007"
      } */
    ],
    loading: false,
    isShowAdd: false,
    isShowAuth: false,
  }

  constructor(props) {
    super(props);
    this.initColumns();
    this.authRef = React.createRef()
  }


  /* 
  初始化table列数组
  */
  initColumns = () => {
    this.columns = [
      {
        title: '角色名称',
        dataIndex: 'name'
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        render: (time) => formateDate(new Date(time))
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        render: (time) => formateDate(new Date(time))
      },
      {
        title: '授权人',
        dataIndex: 'auth_name'
      },
      {
        title: '操作',
        render: (role) => <LinkButton onClick={() =>this.showAuth(role)}>设置权限</LinkButton>
      }
    ]
  }

  /* 显示权限设置界面 */
  showAuth = (role) => {
    // 保存角色
    this.role = role;
    this.setState({ isShowAuth: true });
  }

  /* 异步获取角色列表 */
  getRoleList = async () => {
    this.setState({ loading: true });
    const result = await reqRoleList();
    this.setState({ loading: false });
    if (result.status === 0) {
      const roleList = result.data;
      this.setState({
        roleList
      });
    }
  }

  /* 添加角色 */
  addRole = () => {
    this.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({ isShowAdd: false });
        const { roleName } = values;
        const result = await reqAddRole(roleName);
        if (result.status === 0) {
          this.getRoleList();
          message.success('添加角色成功');
        } else {
          message.error(result.msg);
        }
      }
    })
  }

  /* 设置角色权限 */
  updateRole = async () => {
    this.setState({
      isShowAuth: false
    });
    const { role } = this;
    // 更新role对象相关属性
    role.menus = this.authRef.current.getMenus();
    role.auth_time = Date.now();
    role.auth_name = memoryUtils.user.username;
    const result = await reqUpdateRole(role);
    if (result.status===0) {
      message.success('角色授权成功');
    } else {
      message.error(result.msg);
    }
  }

  componentDidMount() {
    this.getRoleList();
  }

  render() {
    const role = this.role || {};
    const { roleList, loading, isShowAdd, isShowAuth } = this.state;

    const title = (
      <Button
        type='primary'
        onClick={() => {
          // 重置Input框为初始值
          if(this.form) this.form.resetFields();
          this.setState({ isShowAdd: true });
        }}
      >
        创建角色
      </Button>
    );

    return (
      <Card
        title={title}
      >
        <Table
          bordered
          loading={loading}
          rowKey='_id'
          columns={this.columns}
          dataSource={roleList}
          pagination={{ defaultPageSize: PAGE_SIZE }}
        />
        <Modal
          title='添加角色'
          visible={isShowAdd}
          onOk={this.addRole}
          onCancel={() => {
            this.setState({ isShowAdd: false });
          }}
        >
          <AddForm setForm={(form) => { this.form = form }} />
        </Modal>

        <Modal
          title="设置角色权限"
          visible={isShowAuth}
          onOk={this.updateRole}
          onCancel={() => {
            this.setState({ isShowAuth: false })
          }}
        >
          <AuthForm ref={this.authRef} role={role} />
        </Modal>
      </Card>

    );
  }
}
