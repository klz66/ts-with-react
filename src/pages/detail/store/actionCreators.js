/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-03-22 10:05:21
 */
import http from '@/utils/request'
import {demoUrl} from '@/utils/utils';
import * as constants from './constants';

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
      dispatch(changeDetail(res.data.blogDetail.content.slice(0,5), res.data.blogDetail.content));
    }
	}
};
export const getTrashDetail = (id) => {
	return async(dispatch) => {
    let res = await http.get(`${demoUrl}/blogservice/blog-curd/getBlogDetail/trash/${id}`);
    console.log(res);
    if(res.code === 20000) {
      dispatch(changeDetail(res.data.blogDetail.content.slice(0,5), res.data.blogDetail.content));
    }
	}
};
