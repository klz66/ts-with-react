/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-02-03 00:05:02
 */

// import { CHANGE_FOCUS_ON, CHANGE_FOCUS_OFF } from '../../../store/actiion-types'
import * as constants from './constants';
import { fromJS } from 'immutable';

const defaultState = fromJS({
  focused: false,
  list:[],
  mouseIn:false,
  page:0,
  totalPage:0,
})

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState,action) => {
  // console.log(state,action);
  switch (action.type) {
    case constants.SEARCH_FOCUS:
      return state.set('focused',true);
    case constants.SEARCH_BLUR:
      return state.set('focused',false);
    case constants.GET_LIST:
      return state.set('list',action.value).set('totalPage',action.totalPage);
    case constants.MOUSE_ENTER:
      return state.set('mouseIn',true);
    case constants.MOUSE_LEAVE:
      return state.set('mouseIn',false);
    case constants.CHANGE_LIST:
      return state.set('page',action.index);
    default:
      return state
  }
}
