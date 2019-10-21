import { combineReducers } from 'redux';
import storageUtils from '../utils/storageUtils';

import {
  SET_HEADER_TITLE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from './action-types';

/* 
管理应用头部标题的reducer函数
*/

const initHeaderTitle = '';

function headerTitle(state = initHeaderTitle, action) {
  switch (action.type) {
    case SET_HEADER_TITLE:
      return action.data;
    default:
      return state;
  }
}

/* 
管理登录用户的reducer函数
*/

const initUser = storageUtils.getUser();

function user(state = initUser, action) {
  switch (action.type) {
    case LOGOUT:
      return {};
    case LOGIN_SUCCESS:
      return action.user;
    case LOGIN_FAILURE:
      return { ...state, errorMsg: action.msg };
    default:
      return state;
  }
}

export default combineReducers({
  headerTitle,
  user
});