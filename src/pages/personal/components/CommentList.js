/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-04-15 22:35:46
 */
/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-04-15 21:45:53
 */
import 'antd/dist/antd.css'
import moment from 'moment';
import { useState, useEffect } from 'react';
import { ListItem, ListInfo } from '@/pages/home/style';
import { HeartFilled ,MessageFilled} from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import http from '@/utils/request'
import {demoUrl} from '@/utils/utils';
import './less/list.less'
function List(props) {
  let [current,setCurrent]=useState(1)
  let [moreText,setMoreText]=useState(true)
  let [articleList,setArticleList]=useState([])
  useEffect(() => {
    console.log(props);
    getArticleList(props.match.params.id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[props]);
  const goToDetail = async(id)=>{
    window.open('/detail/' + id)
  }
  const getMore = ()=>{
    setCurrent(current+1)
    getMoreList(current+1)
  }

  async function getArticleList(id){
    let res = await http.get(`${demoUrl}/blogservice/blog-comment/pagePersonalCommentList/${id}/${current}/2`);
    
    if(res.code === 20000) {
      console.log(res);
      let articleList = res.data.list.map((i,index)=>(
        {
          "blogAuthorId":i.blogAuthorId,
          "blogId":i.blogId,
          "commentAuthorAvatar":i.commentAuthorAvatar,
          "commentAuthorId":i.commentAuthorId,
          "commentAuthorNickname":i.commentAuthorNickname,
          "content":i.content,
          "reply":i.reply,
          "replyCommentAuthorId":i.replyCommentAuthorId,
          "replyCommentAuthorNickname":i.replyCommentAuthorNickname,
          "replyCommentId":i.replyCommentId,
          "gmtCreate":i.gmtCreate,
        }));
        setArticleList(articleList)
    }
  }
  async function getMoreList(current){
    let res = await http.get(`${demoUrl}/blogservice/blog-comment/pagePersonalCommentList/${props.match.params.id}/${current}/2`);
    
    if(res.code === 20000) {
      console.log(res.data.item);
      if(res.data.list.length === 0) {
        setMoreText(false)
      }
      let list = res.data.list.map((i,index)=>(
        {
          "blogAuthorId":i.blogAuthorId,
          "blogId":i.blogId,
          "commentAuthorAvatar":i.commentAuthorAvatar,
          "commentAuthorId":i.commentAuthorId,
          "commentAuthorNickname":i.commentAuthorNickname,
          "content":i.content,
          "reply":i.reply,
          "replyCommentAuthorId":i.replyCommentAuthorId,
          "replyCommentAuthorNickname":i.replyCommentAuthorNickname,
          "replyCommentId":i.replyCommentId,
          "gmtCreate":i.gmtCreate,
           }));
      setArticleList([...articleList,...list])
    }
  }
  return (
    <div>
      {
      articleList.map((item,index) => (
        // <Link key={index} to={'detail/'+item.get('id')}>
        <div key={item.id}>
          <ListItem >
            <ListInfo>
              <h3 className='title' onClick={()=>goToDetail(item.blogId)}>{item.commentAuthorNickname}</h3>
              <div className='desc'>{item.content}</div>
            </ListInfo>
            
          </ListItem>
          <div className='list'>
            <div>
            {moment(item.gmtCreate).fromNow()}
            </div>
          </div>
          </div>
        ))
      }
      {
        moreText &&       <div onClick={getMore} className='bottom'>
        <span>加载更多</span>
      </div>
      }
      {
        !moreText &&       <div className='bottom'>
        <span>已加载完毕</span>
      </div>
      }

    </div>
  );
}

export default withRouter(List);
