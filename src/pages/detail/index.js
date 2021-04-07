/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-04-07 14:00:00
 */
/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-02-18 10:32:30
 */
import http from '@/utils/request'
import {demoUrl} from '@/utils/utils';
import 'antd/dist/antd.css'
import { withRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';
function Detail(props) {
  let [blogDetail,setBlogDetail] = useState({});
  useEffect(() => {
    async function init(){
      let id = props.match.params.id;
      let res = await http.get(`${demoUrl}/blogservice/blog-curd/getBlogDetail/${id}`);
      if(res.code === 20000) {
        console.log(res);
        setBlogDetail(res.data.blogDetail)
      }
    }
    init();
    console.log(blogDetail);
  },[]);
  return (
    <div className='detailContent'>
      2020
      <div dangerouslySetInnerHTML={{__html:blogDetail.content}}/>
    </div>
		// <div dangerouslySetInnerHTML={{__html:props.content}}/>
  );
}
export default (withRouter(Detail));
