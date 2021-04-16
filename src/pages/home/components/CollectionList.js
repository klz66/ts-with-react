/*
 * @Description: 用于消息的收藏
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-04-17 00:17:34
 */
import 'antd/dist/antd.css'
import { List, Avatar } from 'antd';
import { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import http from '@/utils/request'
import {demoUrl} from '@/utils/utils';
import './less/list.less'
function LikeList(props) {
  let [current,setCurrent]=useState(1)
  let [moreText,setMoreText]=useState(true)
  let [articleList,setArticleList]=useState([])
  useEffect(() => {
    console.log(props);
    getArticleList(props.authorId)
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
    let res = await http.get(`${demoUrl}/blogservice/blog-collection/getCollectBlogMember/${id}/${current}/5`);
    
    if(res.code === 20000) {
      console.log(res);
      let articleList = res.data.list.map((i,index)=>(
        {
          "id":i.id,
          "blogAuthorId":i.blogAuthorId,
          "blogId":i.blogId,
          "memberId":i.memberId,
          "memberAvatar":i.memberAvatar,
          "memberNickname":i.memberNickname,
          "blogTitle":res.data.blogTitle[index],
          "gmtCreate":i.gmtCreate,
        }));
        setArticleList(articleList)
    }
  }
  async function getMoreList(current){
    let res = await http.get(`${demoUrl}/blogservice/blog-collection/getCollectBlogMember/${props.authorId}/${current}/5`);
    console.log(res);
    if(res.code === 20000) {
      console.log(res.data.item);
      if(res.data.list.length === 0) {
        setMoreText(false)
      }
      let list = res.data.list.map((i,index)=>(
        {
          "id":i.id,
          "blogAuthorId":i.blogAuthorId,
          "blogId":i.blogId,
          "memberId":i.memberId,
          "memberAvatar":i.memberAvatar,
          "memberNickname":i.memberNickname,
          "blogTitle":res.data.blogTitle[index],
          "gmtCreate":i.gmtCreate,
           }));
      setArticleList([...articleList,...list])
    }
  }
  return (
    <div>
            <List
        itemLayout="horizontal"
        dataSource={articleList}
        renderItem={item => (
          <List.Item>
            <div style={{display:'flex'}}>
              <Avatar size={56} src={item.memberAvatar} onClick={()=>{window.open('/personal/' + item.memberId)}}/>
              <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',marginLeft:'10px'}}>
                <div> {item.memberNickname} 收藏了你的文章 <span onClick={()=>{window.open('/detail/' + item.blogId)}} style={{color:'blue'}}>{item.blogTitle}</span></div>
                <div>{item.gmtCreate}</div>
              </div>
            </div>
          </List.Item>
        )}
      />
      {
        moreText &&       <div onClick={getMore} className='getmore-bottom'>
        <span>加载更多</span>
      </div>
      }
      {
        !moreText &&       <div className='getmore-bottom'>
        <span>已加载完毕</span>
      </div>
      }

    </div>
  );
}

export default withRouter(LikeList);
