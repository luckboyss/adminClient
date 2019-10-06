import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Input,
  Tree,

} from 'antd';

import menuList from '../../config/menuConfig';

const Item = Form.Item;
const { TreeNode } = Tree;

/* 
设置角色权限的组件
*/

export default class AuthForm extends Component {

  state = {
    checkedKeys: []
  }

  constructor(props) {
    super(props);
    this.treeNodes = this.getTreeNodes(menuList);
    const menus = props.role.menus;
    this.state = {
      ...this.state,
      checkedKeys: menus
    }
  }

  static propTypes = {
    role: PropTypes.object
  }

  getMenus = () => this.state.checkedKeys;

  /* 根据菜单配置生成<TreeNode>的数组 */
  getTreeNodes = (menuList) => {
    return menuList.reduce((pre, item) => {
      pre.push(
        <TreeNode title={item.title} key={item.key} >
          {item.children ? this.getTreeNodes(item.children) : null}
        </TreeNode>
      );
      return pre;
    }, []);
  }

  /* 进行勾选操作时的回调 */
  handleCheck = (checkedKeys) => {
    this.setState({
      checkedKeys
    });
  }

  /* 
  组件接收到新的标签属性时就会执行(初始显示时不会调用)
  nextProps: 接收到的包含新的属性的对象
  */
  UNSAFE_componentWillReceiveProps(nextProps) {
    const menus = nextProps.role.menus;
    this.setState({
      checkedKeys: menus
    });
  }

  render() {
    const { checkedKeys } = this.state;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 15 }
    }
    const { role } = this.props;
    return (
      <div>
        <Item label='角色名称' {...formItemLayout}>
          <Input value={role.name} disabled />
        </Item>
        <Tree
          checkable
          defaultExpandAll
          checkedKeys={checkedKeys}
          onCheck={this.handleCheck}
        >
          <TreeNode title="平台权限" key="all">
            {
              this.treeNodes
            }
          </TreeNode>
        </Tree>
      </div>
    );
  }
}

