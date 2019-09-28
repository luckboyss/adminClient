import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu, Icon } from 'antd';

import menuList from '../../config/menuConfig';
import logo from '../../assets/images/logo.png'
import './index.less';

const { SubMenu } = Menu;

/* 
左侧导航
*/
class LeftNav extends Component {
  
  getMenuNodes = (menuList) => {
    // 请求的路径
    const path = this.props.location.pathname;
    
    return menuList.map(item => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        )
      }
      if (item.children.find(citem => citem.key === path)) {
        this.openKey = item.key;
      }
      return (
        <SubMenu
          key={item.key}
          title={
            <span>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </span>
          }
        >
          {
            this.getMenuNodes(item.children)
          }
        </SubMenu>
      );
    });
  }
  /* 
  第一次render()之前执行
  为第一次render()做一些同步的准备工作
  */
  UNSAFE_componentWillMount() {
    this.menuNodes = this.getMenuNodes(menuList);
  }

  render() {

    // 得到当前请求的路由路径
    const selectKey = this.props.location.pathname;
    return (
      <div className='left-nav'>
        <Link to='/home' className='left-nav-link'>
          <img src={logo} alt="logo"/>
          <h1>硅谷后台</h1>
        </Link>
        {/* 
          defaultSelectedKeys: 总是根据第一次指定的key进行显示
          selectedKeys: 总是根据最新指定的key进行显示
        */}
        <Menu
          selectedKeys={[selectKey]}
          defaultOpenKeys={[this.openKey]}
          mode='inline'
          theme='dark'
        >
          {
            this.menuNodes
          }
          {/* 
          <Menu.Item key='/home'>
            <Link to='/home'>
              <Icon type='home' />
              <span>首页</span>
            </Link>
          </Menu.Item>
          <SubMenu
            key='/products'
            title={
              <span>
                <Icon type='appstore' />
                <span>商品</span> 
              </span>
            }
          >
            <Menu.Item key='/category'>
              <Link to='/category'>
                <Icon type='menu' />
                <span>品类管理</span>
              </Link>
            </Menu.Item>
            <Menu.Item key='/product'>
              <Link to='/product'>
                <Icon type='tool' />
                <span>商品管理</span>
              </Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key='/user'>
            <Link to='/user'>
              <Icon type='user' />
              <span>用户管理</span>
            </Link>
          </Menu.Item>
          <Menu.Item key='/role'>
            <Link to='role'>
              <Icon type='safety-certificate' />
              <span>角色管理</span>
            </Link>
          </Menu.Item>
          <SubMenu
            key='/charts'
            title={
              <span>
                <Icon type='area-chart' />
                <span>图形图表</span> 
              </span>
            }
          >
            <Menu.Item key='/charts/bar'>
              <Link to='/charts/bar'>
                <Icon type='bar-chart' />
                <span>柱形图</span>
              </Link>
            </Menu.Item>
            <Menu.Item key='/charts/line'>
              <Link to='/charts/line'>
                <Icon type='line-chart' />
                <span>折线图</span>
              </Link>
            </Menu.Item>
            <Menu.Item key='/charts/pie'>
              <Link to='/charts/pie'>
                <Icon type='pie-chart' />
                <span>饼状图</span>
              </Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key='/order'>
            <Link to='order'>
              <Icon type='windows' />
              <span>订单管理</span>
            </Link>
          </Menu.Item> 
        */}
        </Menu>
      </div>
    )
  }
}

/* 
向外暴露 使用高阶组件withRouter()来包装非路由组件
新组件向LeftNav传递3个特别属性: history/location/match
结果: LeftNav可以操作路由相关语法了
*/
export default withRouter(LeftNav);