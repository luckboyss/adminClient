import React, { Component } from 'react';
import { Button, Row, Col } from 'antd';
import { connect } from 'react-redux';

import { setHeaderTitle } from '../../redux/actions';
import './not-found.less';

/* 
前台404页面
*/

class NotFound extends Component {
  
  goHome = () => {
    this.props.setHeaderTitle('首页');
    this.props.history.replace('/home');
  }

  componentDidMount() {
    this.props.setHeaderTitle('NOT FOUND');
  }

  render() {
    return (
      <Row className='not-found'>
        <Col span={6}></Col>
        <Col span={12} className='center'>
          <h1>404</h1>
          <h2>抱歉, 你访问的页面不存在</h2>
          <div className='button'>
            <Button type='primary' onClick={this.goHome}>
              回到首页
            </Button>
          </div>
        </Col>
        <Col span={6}></Col>
      </Row>
    );
  }
}

export default connect(
  state => ({}),
  { setHeaderTitle }
)(NotFound);

