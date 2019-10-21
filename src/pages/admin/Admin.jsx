import React, { Component } from 'react'
import { Redirect, Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import { connect } from 'react-redux';

import LeftNav from '../../components/LeftNav';
import Header from '../../components/Header';

import Home from '../home/home';
import NotFound from '../not-found/not-found';
import Category from '../category/Category';
import Product from '../product/Product';
import Role from '../role/Role';
import User from '../user/User';
import Bar from '../charts/Bar';
import Line from '../charts/Line';
import Pie from '../charts/Pie';
import Order from '../order/Order';



const { Footer, Sider, Content } = Layout;

class Admin extends Component {
  render() {
    // const user = JSON.parse(localStorage.getItem('user_key') || '{}');
    const { user } = this.props;
    if (!user._id) {
      return <Redirect to='/login' />
    }
    return (
      <Layout style={{ height: '100%' }}>
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <Header />
          <Content style={{ background: 'white', margin: `20px` }}>
            <Switch>
              <Redirect exact from='/' to='/home' />
              <Route path='/home' component={Home} />
              <Route path='/category' component={Category} />
              <Route path='/product' component={Product} />
              <Route path='/role' component={Role} />
              <Route path='/user' component={User} />
              <Route path='/charts/bar' component={Bar} />
              <Route path='/charts/line' component={Line} />
              <Route path='/charts/pie' component={Pie} />
              <Route path='/order' component={Order} />
              <Route component={NotFound} />
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center', color: 'rgba(0,0,0,.5)' }}>推荐使用谷歌浏览器，可以获得更加页面操作体验</Footer>
        </Layout>
      </Layout>
    )
  }
}
export default connect(
  state => ({ user: state.user }),
  {}
)(Admin);