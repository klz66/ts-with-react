/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-03-29 22:02:23
 */
import http from '@/utils/request'
import {demoUrl} from '@/utils/utils';
import * as constants from './constants';

// var _ = require('lodash');
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
