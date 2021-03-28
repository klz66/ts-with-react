/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-03-28 16:36:43
 */
import http from '@/utils/request'
import {demoUrl} from '@/utils/utils';
import * as constants from './constants';

var _ = require('lodash');
// const url = 'https://www.fastmock.site/mock/16dd8b350d503885a889413322a127b9/todolist'
const changeDetail = (title, content) => ({
	type: constants.CHANGE_DETAIL,
	title,
	content
});

export const getDetail = (id) => {
	return async(dispatch) => {
    let res = await http.get(`${demoUrl}/blogservice/blog-curd/getBlogDetail/${id}`);
    console.log(res);
    if(res.code === 20000) {
      dispatch(changeDetail(res.data.blogDetail.title, res.data.blogDetail.content));
    }
	}
};
export const getTrashDetail = (id) => {
	return async(dispatch) => {
    let res = await http.get(`${demoUrl}/blogservice/blog-curd/getBlogDetail/trash/${id}`);
    console.log(res);
    if(res.code === 20000) {
      dispatch(changeDetail(res.data.blogDetail.title, res.data.blogDetail.content));
    }
	}
};
// const str = '<h1>This is the initial content of the editordd</h1><p>dddd</p>';
//     console.log(str.match(/((?<=<h1>).+?)(?=<\/h1>)/)[0]);
// function formatTitle(content) {
//   if(!_.isEmpty(content.match(/((?<=<h1>).+?)(?=<\/h1>)/))) {
//     return content.match(/((?<=<h1>).+?)(?=<\/h1>)/)[0];
//   }
//   else if(!_.isEmpty(content.match(/((?<=<h2>).+?)(?=<\/h2>)/))) {
//     return content.match(/((?<=<h2>).+?)(?=<\/h2>)/)[0]
//   }
//   else if(!_.isEmpty(content.match(/((?<=<h3>).+?)(?=<\/h3>)/))) {
//     return content.match(/((?<=<h3>).+?)(?=<\/h3>)/)[0]
//   }
//   else if(!_.isEmpty(content.match(/((?<=<h4>).+?)(?=<\/h4>)/))) {
//     return content.match(/((?<=<h4>).+?)(?=<\/h4>)/)[0]
//   }
//   else if(!_.isEmpty(content.match(/((?<=<h5>).+?)(?=<\/h5>)/))) {
//     return content.match(/((?<=<h5>).+?)(?=<\/h5>)/)[0]
//   }
//   else if(!_.isEmpty(content.match(/((?<=<h6>).+?)(?=<\/h6>)/))) {
//     return content.match(/((?<=<h6>).+?)(?=<\/h6>)/)[0]
//   }
//   else{
//     return '无标题'
//   } 
// }
