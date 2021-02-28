/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-02-27 11:03:18
 */
import { combineReducers } from 'redux-immutable';
import { reducer as headerReduce } from '../common/header/store';
import { reducer as homeReducer } from '../pages/home/store';
import { reducer as detailReducer } from '../pages/detail/store';
// import { reducer as loginReducer } from '../pages/login/store';

const reducer = combineReducers({
  header: headerReduce,
	home: homeReducer,
	detail: detailReducer,
	// login: loginReducer
});

export default reducer;
