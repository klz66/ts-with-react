/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-04-07 14:20:26
 */
import { combineReducers } from 'redux-immutable';
import { reducer as headerReduce } from '../common/header/store';
import { reducer as homeReducer } from '../pages/home/store';
import { reducer as loginReducer } from '../pages/login/store';

const reducer = combineReducers({
  header: headerReduce,
	home: homeReducer,
	login: loginReducer
});

export default reducer;
