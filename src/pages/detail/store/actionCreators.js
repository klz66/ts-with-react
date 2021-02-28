/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-02-28 14:47:20
 */
import axios from 'axios';
import * as constants from './constants';

const url = 'https://www.fastmock.site/mock/16dd8b350d503885a889413322a127b9/todolist'
const changeDetail = (title, content) => ({
	type: constants.CHANGE_DETAIL,
	title,
	content
});

export const getDetail = (id) => {
	return (dispatch) => {
    axios.get(`${url}/api/detail?id=`+id).then((res)=>{
			// const result = res.data.data;
      console.log(res.data);
			dispatch(changeDetail(res.data.title, res.data.content));
		}).catch(() => {
			
		})
	}
};
