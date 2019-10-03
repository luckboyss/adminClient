import React, {Component} from 'react'
import { message} from 'antd'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/login/Login';
import Admin from './pages/admin/Admin';

/*
应用根组件
 */
class App extends Component {

  handleClick = () => {
    message.success('成功啦...');
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/' component={Admin} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
