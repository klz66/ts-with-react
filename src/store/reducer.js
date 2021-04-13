/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-04-13 11:18:40
 */
import { combineReducers } from 'redux-immutable';
import { reducer as headerReduce } from '../common/header/store';
import { reducer as loginReducer } from '../pages/login/store';

const reducer = combineReducers({
  header: headerReduce,
	login: loginReducer
});

export default reducer;
