/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-02-28 16:38:02
 */
import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
	login: false
});

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState, action) => {
	switch(action.type) {
		case constants.CHANGE_LOGIN:
			return state.set('login', action.value);
		case constants.LOGOUT:
			return state.set('login', action.value);
		default:
			return state;
	}
}
