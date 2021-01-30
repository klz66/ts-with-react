/*
 * @Description: yarn 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-01-30 22:51:59
 */

import { createStore } from "redux";
import reducer from './reducer'
// store是唯一的 只有store能够改变自己
// reducer必须是纯函数 reducer既固定的输入，固定的输出可以接收state,但是绝不能修改state

// 关键方法 创造store-> createStore 
// 关键方法 触发action-> store.dispatch(action) 
// 关键方法 获取store的数据-> store.getState() 
// 关键方法 订阅store改变-> store.subscribe(function)

const store = createStore(reducer)

export default store;
