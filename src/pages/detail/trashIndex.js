/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-04-15 17:23:23
 */
/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-02-18 10:32:30
 */
import { withRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button,Avatar,Comment, List,Statistic,Tooltip } from 'antd';
import moment from 'moment';
import http from '@/utils/request'
import {demoUrl} from '@/utils/utils';
import LikeModal from './component/LikeModal'
import 'antd/dist/antd.css'
import './index.less'

const { Countdown } = Statistic;


function TrashDetail(props) {
  const deadline = Date.now() + 1000 * 3;
  let [haveArticle,setHaveArticle] = useState(true);
  let [blogDetail,setBlogDetail] = useState({});
  let [memberDetail,setMemberDetail] = useState({});
  // 是否关闭评论
  let [isCloseComment,setIsCloseComment] = useState(false);

  let [data,setData] = useState([]);
  useEffect(() => {
    async function init(){
      let id = props.match.params.id;
      let res = await http.get(`${demoUrl}/blogservice/blog-curd/getBlogDetail/trash/${id}`);
      if(res.code === 20000 && res.data.blogDetail !== null) {
        setBlogDetail(res.data.blogDetail)
        setIsCloseComment(res.data.blogDetail.isCloseComment===1?true:false)
        setHaveArticle(true)
      }else {
        setHaveArticle(false)
      }
    }
    init();
  },[]);
  useEffect(() => {
    async function getMemberInfo() {
      let id = blogDetail.authorId;
      let res = await http.get(`${demoUrl}/blogservice/blog-member/getMemberById/${id}`);
      if(res.code === 20000) {
        setMemberDetail(res.data.memberDetail)
      }
    }
    getMemberInfo();
    getCommentList();
  },[blogDetail]);
  async function getCommentList() {
    let id = blogDetail.id;
    let res = await http.get(`${demoUrl}/blogservice/blog-comment/getCommentList/${id}`);
    if(res.code === 20000) {
      let arr = res.data.list.map((ele,index) => ({
      author: ele.commentAuthorNickname,
      avatar: ele.commentAuthorAvatar,
      content: (
        <p>
          {ele.content}
        </p>
      ),
      datetime: (
        <Tooltip title={moment(ele.gmtCreate).format('YYYY-MM-DD HH:mm:ss')}>
          <span>{moment(ele.gmtCreate).fromNow()}</span>
        </Tooltip>
      )
      }))
      setData(arr)
    }
  }
  function onFinish() {
    props.history.push('/')
  }
  async function handleOpenComment() {
    // GET /blogservice/blog-curd/openBlogComment/{id
    let res = await http.get(`${demoUrl}/blogservice/blog-curd/openBlogComment/${blogDetail.id}`);
    console.log(res);
    setIsCloseComment(false)
  }
  function noCloseComment() {
    return  <div className='comment'>
    <List
      className="comment-list"
      header={<div>全部评论{data.length}</div>}
      itemLayout="horizontal"
      dataSource={data}
      renderItem={item => (
        <li>
          <Comment
            actions={item.actions}
            author={item.author}
            avatar={item.avatar}
            content={item.content}
            datetime={item.datetime}
          />
        </li>
      )}
    />
  </div>
  }
  function yesCloseComment() {
    return <div className='no-comment'>
      <div>评论已关闭</div>
      <div><Button danger onClick={()=>handleOpenComment()}>打开评论</Button></div>
      </div>
  }

  function yesArticle() {
    return <div className='detailContent'>
    <div className='left'>
      <div className='article'>
        <div className='memberTop'>
          <div style={{display:'flex',position:'relative'}}>
              <Avatar size={56} src={memberDetail.avatar} onClick={()=>{window.open('/personal/' + memberDetail.id)}}/>
              <div style={{display:'flex',flexDirection:'column',justifyContent:'space-around',marginLeft:'10px'}}>
                <div> {memberDetail.nickname}</div>
                <div style={{fontSize:'12px',color:'#969696'}}>{blogDetail.gmtCreate}&nbsp;&nbsp;
                </div>
              </div>
          </div>
        </div>
        <div className='blogContent' dangerouslySetInnerHTML={{__html:blogDetail.content}}/>
        <div className='blogLike'>
          
         <span className='ml-span'> <LikeModal blogId={blogDetail.id} /> </span>
         
        </div>
      </div>
      {
        !isCloseComment && noCloseComment()
      }
      {
        isCloseComment && yesCloseComment()
      }
    </div>
    <div className='right'>
      <div className='people'>
      <div style={{display:'flex',position:'relative'}}>
              <Avatar size={56} src={memberDetail.avatar} onClick={()=>{window.open('/personal/' + memberDetail.id)}}/>
              <div style={{display:'flex',flexDirection:'column',justifyContent:'space-around',marginLeft:'10px'}}>
                <div> {memberDetail.nickname}</div>
                <div style={{fontSize:'12px',color:'#969696'}}>  发表{memberDetail.blogNum}篇文章&nbsp;&nbsp;拥有{memberDetail.fansNum}粉丝
                </div>
              </div>
          </div>
      </div>
    </div>
    
  </div>
  
  }
  return (
    <div>
      {
        haveArticle && yesArticle()
      }
      {
        !haveArticle && <div className='noActice'>
          <Countdown title="该文章已被删除,即将跳转到主页面" value={deadline} onFinish={onFinish} />
        </div>
      }
    </div>

  );
}
export default (withRouter(TrashDetail))
