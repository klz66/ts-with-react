/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-04-12 10:57:08
 */
import axios from 'axios'

const authedAxios = axios.create({
  timeout: 20000,
})

function noLogin(url) {
  // 这里是没有登录的用户能使用的接口
  if(url.indexOf('blogservice/blog-curd/pageBlogList')>=0 ||
  url.indexOf('blogservice/blog-member/pageMemberList')>=0 ||
  url.indexOf('blogservice/blog-member/getMemberFocusById')>=0 ||
  url.indexOf('blogservice/blog-member/getMemberFansById')>=0 ||
  url.indexOf('blogservice/blog-member/getMemberById')>=0 ||
  url.indexOf('blogservice/blog-curd/pagePersonalBlogList')>=0 ||
  url.indexOf('blogservice/blog-curd/getBlogDetail')>=0 ||
  url.indexOf('blogservice/blog-comment/getCommentList')>=0 ||
  url.indexOf('blogservice/blog-member/login')>=0 ||
  url.indexOf('blogservice/blog-member/register')>=0 ||
  url.indexOf('logservice/blog-like/getLikeBlogMember')>=0
  ) {
    return true
  }
}

// 添加请求拦截器
authedAxios.interceptors.request.use(
  config => {
    if(localStorage.getItem('token')){
      config.headers['token'] = localStorage.getItem('token');
    } else {
      console.log(config.url);
      // blogservice/blog-member/getMemberById/
      if(noLogin(config.url)){
        return config
      } else {
        alert('请登录后操作');
        return;
      }
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)


export {  authedAxios }
