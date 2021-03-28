/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-03-28 23:36:59
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

  return (
    <div>
      {
      articleList.map((item,index) => (
        // <Link key={index} to={'detail/'+item.get('id')}>
          <ListItem>
            <ListInfo>
              {/* <img
                className='pic'
                src={item.get('imgUrl')}
                alt=''
              /> */}
              <h3 className='title'>{item.get('title')}</h3>
              {/* <p className='desc'>{item.get('desc')}</p> */}
              <div className='desc' onClick={()=>goToDetail(item.get('id'))} dangerouslySetInnerHTML={{__html: item.get('desc')}}/>
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
