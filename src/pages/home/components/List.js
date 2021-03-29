/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-03-29 09:01:44
 */
import 'antd/dist/antd.css'
import { useState, useEffect } from 'react';
import { ListItem, ListInfo, LoadMore } from '../style';
import { connect } from "react-redux";
import http from '@/utils/request'
import {demoUrl} from '@/utils/utils';
import { withRouter } from 'react-router-dom';
import { notification  } from 'antd';

import  {  actionCreators  }  from "../store";
var _ = require('lodash');
function List(props) {
  let [current,setCurrent]=useState(1)
  useEffect(() => {
    props.getArticleList(current,5)
  }, []);
  const { articleList }= props
  const openNotificationWithIcon = type => {
    notification[type]({
      message: '删除成功',
      duration: 1,
    });
  };
  const handleDelete = async(id)=>{
    let res = await http.delete(`${demoUrl}/blogservice/blog-curd/delete/${id}`);
    console.log(res);
    if(res.data.code === 20000) {
      openNotificationWithIcon('success')
      props.getArticleList(1,5)
    }
  }

  const goToDetail = async(id)=>{
    window.open('/detail/' + id)
  }

  const getMore = ()=>{
    setCurrent(current+1)
    props.getMoreList(current+1)
  }
  function formatImg(content) {
    // var str = "this is test string <img src=\"http:baidu.com/test.jpg\" width='50' > 1 and the end <img src=\"所有地址也能匹配.jpg\" /> 33! <img src=\"/uploads/attached/image/20120426/20120426225658_92565.png\" alt=\"\" />"
    var imgReg = /<img.*?(?:>|\/>)/gi;
    var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
    var arr = content.match(imgReg);  // arr 为包含所有img标签的数组
    
    if(arr!==null){
        var src = arr[0].match(srcReg);
        console.log(src);
        return src[1];
        //获取图片地址
    } else {
      return null
    }
  }
  function formatContent(content) {
    let reg =/<img.*?src=[\"|\']?(.*?)[\"|\']?\s.*?>/i;
    return content.replace(reg, '')
  }
  return (
    <div>
      {
      articleList.map((item,index) => (
        // <Link key={index} to={'detail/'+item.get('id')}>
          <ListItem key={item.get('id')}>
            <ListInfo>
            {formatImg(item.get('desc'))!==null && <img
                className='pic'
                src={formatImg(item.get('desc'))}
                alt=''
              />}
              {/* <img
                className='pic'
                src={item.get('imgUrl')}
                alt=''
              /> */}
              <h3 className='title'>{item.get('title')}</h3>
              {/* <p className='desc'>{item.get('desc')}</p> */}
              <div className='desc' onClick={()=>goToDetail(item.get('id'))} dangerouslySetInnerHTML={{__html: formatContent(item.get('desc'))}}/>
            </ListInfo>
            {/* <span onClick={()=>handleDelete(item.get('id'))}>删除</span> */}
          </ListItem>
          // </Link>
        ))
      }
      <LoadMore onClick={getMore}>
        加载更多
      </LoadMore>
    </div>
  );
}
const mapStateToProps = (state) => ({
  articleList:state.getIn(['home','articleList']),
})
const mapDispatchToProps = (dispatch) => ({
  getMoreList(current){
    dispatch(actionCreators.getMoreArticleList(current,5))
  },
  getArticleList(current,limit){
    dispatch(actionCreators.getArticleList(current,limit))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(List));
