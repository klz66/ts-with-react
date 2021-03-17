/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-03-17 22:56:58
 */
import * as constants from './constants';
// import http from '@/utils/request'
// import {url} from '@/utils/utils'

// const url = 'https://www.fastmock.site/mock/16dd8b350d503885a889413322a127b9/todolist'
// const url = 'http://localhost:8000'
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
    dispatch(changeLogin())
    // http.get(`${url}/eduservice/user/info`).then(res=>{
    //   console.log(res)
    //   if (res) {
    //     dispatch(changeLogin())
    //   }else {
    //     alert('登陆失败')
    //   }
    // })
	}
}
