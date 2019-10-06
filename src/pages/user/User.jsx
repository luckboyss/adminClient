import React, { Component } from 'react';
import {
  Card,
  Table,
  Button,
  Modal,
  message,
} from 'antd';
import UserForm from './UserForm';
import { PAGE_SIZE } from '../../utils/constants';
import { formateDate } from '../../utils/dateUtils';
import LinkButton from '../../components/LinkButton';
import { reqUserList, reqDeleteUser, reqAddUpdateUser } from '../../api';


/* 
用户路由
*/
export default class User extends Component {

  state = {
    userList: [],
    roleList: [],
    isShow: false,
    loading: false,
  }

  constructor(props) {
    super(props);
    this.initColumns();
  }


  /* 
  初始化table列数组
  */
  initColumns = () => {
    this.columns = [
      {
        title: '用户名',
        dataIndex: 'username'
      },
      {
        title: '邮箱',
        dataIndex: 'email'
      },
      {
        title: '电话',
        dataIndex: 'phone'
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        render: (time) => formateDate(new Date(time))
      },
      {
        title: '所属角色',
        dataIndex: 'role_id',
        // render: role_id => this.state.roleList.find(role => role._id === role_id).name
        render: role_id => this.roleNames[role_id]
      },
      {
        title: '操作',
        render: (user) => (
          <span>
            <LinkButton onClick={() => this.showUpdate(user)}>修改</LinkButton>
            <LinkButton onClick={() => this.deleteUser(user)}>删除</LinkButton>
          </span>
        )
      }
    ]
  }

  /*
  显示添加界面
  */
  showAdd = () => {
    this.user = null // 去除前面保存的user
    // 重置Input框为初始值
    if (this.form) this.form.resetFields();
    this.setState({
      isShow: true
    })
  }

  /*
  显示修改界面
  */
  showUpdate = (user) => {
    this.user = user // 保存user
    if (this.form) this.form.resetFields();
    this.setState({
      isShow: true
    });
  }

  /*
  删除指定用户
  */
  deleteUser = (user) => {
    Modal.confirm({
      title: `确认删除用户${user.username}吗?`,
      onOk: async () => {
        const result = await reqDeleteUser(user._id);
        if (result.status === 0) {
          message.success(`删除用户${user.name}成功`);
          this.getUserList();
        } else {
          message.error(result.msg);
        }
      }
    });
  }

  /* 异步获取用列表 */
  getUserList = async () => {
    this.setState({ loading: true });
    const result = await reqUserList();
    this.setState({ loading: false });
    if (result.status === 0) {
      const userList = result.data.users;
      const roleList = result.data.roles;

      // 生成一个对象容器(属性名：角色的ID值, 属性值:角色的名称)
      this.roleNames = roleList.reduce((pre, role) => {
        pre[role._id] = role.name;
        return pre;
      }, {})

      this.setState({
        userList,
        roleList,
      });
    }
  }

  /* 
  添加/更新用户
  */
  addUpdateUser = () => {
    this.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({ isShow: false });
        // 如果this有user
        if (this.user) {
          values._id = this.user._id;
        }
        const result = await reqAddUpdateUser(values);
        if (result.status === 0) {
          message.success('添加/更新用户成功');
          this.getUserList();
        } else {
          message.error(result.msg);
        }
      }
    })
  }

  componentDidMount() {
    this.getUserList();
  }

  render() {
    const { userList, roleList, loading, isShow } = this.state;
    const user = this.user || {};

    const title = (
      <Button
        type='primary'
        onClick={this.showAdd}
      >
        创建用户
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
          dataSource={userList}
          pagination={{ defaultPageSize: PAGE_SIZE }}
        />
        <Modal
          title={user._id ? '修改用户' : '添加用户'}
          visible={isShow}
          onOk={this.addUpdateUser}
          onCancel={() => {
            this.setState({ isShow: false });
          }}
        >
          <UserForm
            setForm={(form) => { this.form = form }}
            roleList={roleList}
            user={user}
          />
        </Modal>
      </Card>
    );
  }
}
