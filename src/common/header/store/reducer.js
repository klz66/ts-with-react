/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-02-02 23:02:31
 */

// import { CHANGE_FOCUS_ON, CHANGE_FOCUS_OFF } from '../../../store/actiion-types'
import * as constants from './constants';
import { fromJS } from 'immutable';

const defaultState = fromJS({
  focused: false,
  list:[],
  page:0,
  totalPage:0,
})

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState,action) => {
  console.log(state,action);
  if(action.type === constants.SEARCH_FOCUS){
    return state.set('focused',true);
  }
  // immutable对象的set方法会返回一个全新的对象
  if(action.type === constants.SEARCH_BLUR){
    return state.set('focused',false);
  }
  if(action.type === constants.GET_LIST){
    return state.set('list',action.value).set('totalPage',action.totalPage);
  }
  return state;
}
