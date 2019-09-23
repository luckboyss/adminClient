import React, {Component} from 'react'
import {Button, message} from 'antd'
/*
应用根组件
 */
class App extends Component {

  handleClick = () => {
    message.success('成功啦...');
  }

  render() {
    return (
      <Button type='primary' onClick={this.handleClick}>学习</Button>
    )
  }
}

export default App
