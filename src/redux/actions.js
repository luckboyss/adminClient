import { reqLogin } from '../api';
import {
  SET_HEADER_TITLE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from './action-types';
import storageUtils from '../utils/storageUtils';



/* 
设置头部标题的action
*/
export const setHeaderTitle = (headTitle) => ({
  type: SET_HEADER_TITLE,
  data: headTitle
});

/* 
登录成功的action
*/
export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  user,
});

/* 
登录失败的action
*/
export const loginFailure = (msg) => ({
  type: LOGIN_FAILURE,
  msg,
});

/* 
退出登录的action
*/
export const logout = () => {
  // 删除local中的user
  storageUtils.removeUser();
  return { type: LOGOUT }
};

/* 
登录的异步action
*/
export function login(username, password) {
  return async dispatch => {
    // 1. 发登录的异步请求
    const result = await reqLogin(username, password);
    // 2. 请求结束,分发同步action
    if (result.status===0) {
      const user = result.data;
      storageUtils.saveUser(user);
      dispatch(loginSuccess(user));
    } else {
      const msg = result.msg;
      dispatch(loginFailure(msg));
    }
  }
}