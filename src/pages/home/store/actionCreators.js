/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-03-27 19:06:18
 */
import axios from 'axios'
import { fromJS } from 'immutable'
import http from '@/utils/request'
import {demoUrl} from '@/utils/utils';
import * as constants from './constants';

const url = 'https://www.fastmock.site/mock/16dd8b350d503885a889413322a127b9/todolist'
 const getList = (value) => ({
    type:constants.CHANGE_HOME_DATA,
    topicList: fromJS(value.topicList),
  //  state里的数据是immutable了的
 })
 const getArticleContentList = (value) => ({
    type:constants.ARTICLE_LIST,
    articleList: fromJS(value),
  //  state里的数据是immutable了的
 })
 const getMoreArticleContentList = (value) => ({
    type:constants.GET_MORE_ARTICLE_LIST,
    articleList: fromJS(value),
  //  state里的数据是immutable了的
 })

 export const getHomeInfo = () => {
   return (dispatch) => {
     axios.get(`${url}/api/home/getHomeData`).then((res)=>{
       dispatch(getList(res.data))
     }).catch((e)=>{
       console.log(e);
     })
   }
 }
 export const getArticleList = (current,limit) => {
   return async(dispatch) => {
    let res = await http.get(`${demoUrl}/blogservice/blog-curd/pageBlogList/${current}/${limit}`);
    
    if(res.code === 20000) {
      let articleList = res.data.rows.map((i)=>(
        {
          'title': i.name+'发表的文章',
          'desc': i.content,
          'id':i.id,
          // 'imgUrl':'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2084631030,3185655172&fm=26&gp=0.jpg'
        }));
      dispatch(getArticleContentList(articleList))
    }
  }
 }
 export const getMoreArticleList = (current,limit) => {
   return async(dispatch) => {
    let res = await http.get(`${demoUrl}/blogservice/blog-curd/pageBlogList/${current}/${limit}`);
    
    if(res.code === 20000) {
      console.log(res.data.item);
      let articleList = res.data.rows.map((i)=>(
        {
          'title': i.name+'发表的文章',
          'desc': i.content,
          'id':i.id,
          // 'imgUrl':'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2084631030,3185655172&fm=26&gp=0.jpg'
        }));
      dispatch(getMoreArticleContentList(articleList))
    }
  }
 }
 const getAddArticleList = (value,nextPage) => ({
  type:constants.ADD_ARTICLE_LIST,
  nextPage,
  articleList: fromJS(value.articleList),
//  state里的数据是immutable了的
})
