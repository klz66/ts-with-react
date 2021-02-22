/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-02-22 14:37:32
 */
import axios from 'axios'
import { fromJS } from 'immutable'
import * as constants from './constants';

const url = 'https://www.fastmock.site/mock/16dd8b350d503885a889413322a127b9/todolist'
 const getList = (value) => ({
    type:constants.CHANGE_HOME_DATA,
    topicList: fromJS(value.topicList),
    articleList: fromJS(value.articleList),
    recommendList: fromJS(value.recommendList)
  //  state里的数据是immutable了的
 })
 export const getHomeInfo = () => {
   return (dispatch) => {
     axios.get(`${url}/api/home/getHomeData`).then((res)=>{
       console.log(res);
       dispatch(getList(res.data))
     }).catch((e)=>{
       console.log(e);
     })
   }
 }
