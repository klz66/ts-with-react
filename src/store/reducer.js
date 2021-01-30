/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-01-30 22:56:07
 */
import { CHANGE_IPUT, ADD_ITEM, DELETE_ITEM, INIT_LIST } from './actiion-types';
const defaultState = {
  inputValue: 'hello World',
  list: ['test 1','test 1','test 1','test 1']
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState,action) => {
  console.log(state,action);
  console.log(action.type);
  if(action.type === CHANGE_IPUT){
    const newState = JSON.parse(JSON.stringify(state))
    newState.inputValue = action.value
    return newState
  }
  if(action.type === ADD_ITEM){
    const newState = JSON.parse(JSON.stringify(state))
    newState.inputValue = ''
    newState.list.push(action.value)
    return newState
  }
  if(action.type === DELETE_ITEM){
    const newState = JSON.parse(JSON.stringify(state))
    newState.list.splice(action.index,1)
    return newState
  }
  if(action.type === INIT_LIST){
    const newState = JSON.parse(JSON.stringify(state))
    newState.list = action.value
    return newState
  }
  return state;
}
