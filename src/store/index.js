/*
 * @Description: yarn 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-01-31 16:51:50
 */

import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'
// store是唯一的 只有store能够改变自己
// reducer必须是纯函数 reducer既固定的输入，固定的输出可以接收state,但是绝不能修改state
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(
	applyMiddleware(thunk)
));

export default store;
