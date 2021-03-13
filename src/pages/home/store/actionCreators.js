/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-03-13 13:13:59
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
 const getAddArticleList = (value,nextPage) => ({
  type:constants.ADD_ARTICLE_LIST,
  nextPage,
  articleList: fromJS(value.articleList),
//  state里的数据是immutable了的
})
 export const getMoreList = (articlePage) => {
  return (dispatch) => {
    axios.get(`${url}/api/home/getMoreList?page=`+articlePage).then((res)=>{
      console.log(res);
      dispatch(getAddArticleList(res.data,articlePage))
    }).catch((e)=>{
      console.log(e);
    })
  }
}
// TOGGLE_SCROLL_TOP
 export const toggleTopShow = (flag) => ({
  type:constants.TOGGLE_SCROLL_TOP,
  showScroll:flag
//  state里的数据是immutable了的
})
