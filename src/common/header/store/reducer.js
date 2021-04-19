/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-04-19 11:44:17
 */

// import { CHANGE_FOCUS_ON, CHANGE_FOCUS_OFF } from '../../../store/actiion-types'
import * as constants from './constants';
import { fromJS } from 'immutable';

const defaultState = fromJS({
  focused: false,
  mouseIn: false,
})

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState,action) => {
  // console.log(state,action);
  switch (action.type) {
    case constants.SEARCH_FOCUS:
      return state.set('focused',true);
    case constants.SEARCH_BLUR:
      return state.set('focused',false);
    case constants.MOUSE_ENTER:
      return state.set('mouseIn', true);
    case constants.MOUSE_LEAVE:
      return state.set('mouseIn', false);
    default:
    return state
  }
}
