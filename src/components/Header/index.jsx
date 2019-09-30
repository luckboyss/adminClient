import React, { Component } from 'react';
import { Modal } from 'antd';
import { withRouter } from 'react-router-dom';

import menuList from '../../config/menuConfig';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import { formateDate } from '../../utils/dateUtils';
import { reqWeather } from '../../api';
import LinkButton from '../LinkButton';

import './index.less';



class Header extends Component {

  state = {
    currentTime: new Date(),
    dayPictureUrl: '', 
    weather: ''
  }

  logout = () => {
    Modal.confirm({
      title: '确认退出吗？',
      onOk: () => {
        console.log('Ok');
        storageUtils.removeUser();
        memoryUtils.user = {};
        this.props.history.replace('/login');
      },
      onCancel() {
        console.log('Cancel');
      }
    });
  }
  /* 
  退出登录
  */
  getList = () => {
    let title = '';
    const path = this.props.location.pathname;
    menuList.forEach(item => {
      if (item.key === path) {
        title = item.title;
      } else if (item.children) {
        const cItem = item.children.find(cItem => cItem.key === path);
        if (cItem) {
          title = cItem.title;
        }
      }
    });
    return title;
  }

  /* 
  获取天气信息显示
  */
  getWeather = async () => {
    // 发请求
    const { dayPictureUrl, weather } = await reqWeather('丽水');
    // 更新状态
    this.setState({
      dayPictureUrl, 
      weather
    });
  }


  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState({
        currentTime: new Date()
      });
    }, 1000);
    // 发送jsonp请求, 获取天气信息显示
    this.getWeather();
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {

    const { currentTime, dayPictureUrl, weather } = this.state;
    
    const user = memoryUtils.user;

    return (
      <div className='header'>
        <div className="header-top">
          欢迎, {user.username}
          <LinkButton onClick={this.logout}>退出</LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">
            {this.getList()}
          </div>
          <div className="header-bottom-right">
            <span>{formateDate(currentTime)}</span>
            <img src={dayPictureUrl} alt="weather"/>
            <span>{weather}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Header);
