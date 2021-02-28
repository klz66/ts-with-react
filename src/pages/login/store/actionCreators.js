/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-02-28 16:57:25
 */
import axios from 'axios';
import * as constants from './constants';

const url = 'https://www.fastmock.site/mock/16dd8b350d503885a889413322a127b9/todolist'
const changeLogin = () => ({
	type: constants.CHANGE_LOGIN,
	value: true
})

export const logout = () => ({
	type: constants.LOGOUT,
	value: false
})

export const login = (accout, password) => {
	return (dispatch) => {
    
		axios.get(`${url}/api/login?account=' + accout + '&password=' + password`).then((res) => {
			const result = res.data;
      console.log(result.accout);
      console.log(result);
			if (result) {
				dispatch(changeLogin())
			}else {
				alert('登陆失败')
			}
		})
	}
}
