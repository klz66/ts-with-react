/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-04-13 18:00:44
 */
/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-02-18 10:32:30
 */
import { withRouter } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { Menu, Dropdown,Input,Button,notification,Avatar,Popconfirm ,Comment, Form, List,Statistic,Tooltip } from 'antd';
import moment from 'moment';
import http from '@/utils/request'
import {demoUrl} from '@/utils/utils';
import { MessageOutlined,LikeOutlined,LikeFilled,StarOutlined,StarFilled,PlusOutlined,CheckOutlined,DislikeOutlined ,EllipsisOutlined} from '@ant-design/icons';
import LikeModal from './component/LikeModal'
import ExposeModal from './component/ExposeModal'
import ExposeCommentModal from './component/ExposeCommentModal'
import 'antd/dist/antd.css'
import './index.less'

const { Countdown } = Statistic;

const { TextArea } = Input;

function Detail(props) {
  const deadline = Date.now() + 1000 * 3;
  let memberInfo = JSON.parse(window.localStorage.getItem('memberInfo'))
  let [articleList,setArticleList]=useState([])
  let [commentId,setCommentId] = useState('');
  let [haveArticle,setHaveArticle] = useState(true);
  let [blogDetail,setBlogDetail] = useState({});
  let [memberDetail,setMemberDetail] = useState({});
  let [onFocusComment1,setOnFocusComment1] = useState(false);
  let [onFocusComment2,setOnFocusComment2] = useState(false);
  let [comment,setComment] = useState('');
  let [isAuthor,setIsAuthor] = useState(false);
  // 是否点赞了该文章
  let [isLikeBlog,setIsLikeBlog] = useState(false);
  // 是否收藏了该文章
  let [isCollectBlog,setIsCollectBlog] = useState(false);
  // 是否关闭评论
  let [isCloseComment,setIsCloseComment] = useState(false);
  // 文章下面的评论框
  let [value,setValue] = useState('');
  //  该评论是不是回复某人
  let [reply,setReply] = useState(0);
  //  该用户是不是关注了
  let [isFocus,setIsFocus] = useState(false);

  let [data,setData] = useState([]);
  const menu = (
    <Menu>
      {
        isCollectBlog &&  
        <Menu.Item>
          <span style={{cursor:'pointer'}} onClick={handleRemoveCollect}>
            <StarFilled />已收藏
          </span>
        </Menu.Item>       
      }
      {
        !isCollectBlog &&      
          <Menu.Item>
            <span style={{cursor:'pointer'}} onClick={handleAddCollect}>
              <StarOutlined />收藏文章
            </span>
          </Menu.Item>       
      }
      <Menu.Item>
        <span style={{cursor:'pointer'}}>
          {/* <DislikeOutlined /> */}
          <ExposeModal blogDetail={blogDetail}/>
        </span>
      </Menu.Item>
    </Menu>
  );
  const menuComment = (
    <Menu>
      <Menu.Item>
        <span style={{cursor:'pointer'}}>
          <ExposeCommentModal />
        </span>
      </Menu.Item>
    </Menu>
  );
  useEffect(() => {
    async function init(){
      let id = props.match.params.id;
      getArticleList(id);
      let res = await http.get(`${demoUrl}/blogservice/blog-curd/getBlogDetail/${id}`);
      if(res.code === 20000 && res.data.blogDetail !== null) {
        if(res.data.isLike) {
          setIsLikeBlog(true)
        } else {
          setIsLikeBlog(false)
        }
        if(res.data.isCollected) {
          setIsCollectBlog(true)
        } else {
          setIsCollectBlog(false)
        }
        if(res.data.blogDetail?.authorId === memberInfo?.id) { 
          setIsAuthor(true)
        } else {
          setIsAuthor(false)
        }
        setBlogDetail(res.data.blogDetail)
        setIsCloseComment(res.data.blogDetail.isCloseComment===1?true:false)
        setHaveArticle(true)
      }else {
        setHaveArticle(false)
      }
    }
    init();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  useEffect(() => {
    async function getMemberInfo() {
      let id = blogDetail.authorId;
      let res = await http.get(`${demoUrl}/blogservice/blog-member/getMemberById/${id}`);
      if(res.code === 20000) {
        if(res.data.isFocus) {
          setIsFocus(true)
        } else {
          setIsFocus(false)
        }
        setMemberDetail(res.data.memberDetail)
      }
    }
    getMemberInfo();
    getCommentList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[blogDetail]);
  function handleReply(id) {
    // 回复评论 传参多一些
    setCommentId(id)
    setReply(1)
    setOnFocusComment2(true)
  }
  function inputChange(e) {
    setComment(e.target.value);
  }
  async function getArticleList(){
    let res = await http.get(`${demoUrl}/blogservice/blog-curd/pageBlogList/recommend/1/5`);
    console.log(res,2020);
    if(res.code === 20000) {
      let articleList = res.data.rows.map((i)=>(
        {
          'title': i.title,
          'id':i.id,
        }));
        setArticleList(articleList)
    }
  }
  async function getCommentList() {
    let id = blogDetail.id;
    let res = await http.get(`${demoUrl}/blogservice/blog-comment/getCommentList/${id}`);
    if(res.code === 20000) {
      let arr = res.data.list.map((ele,index) => ({
      actions: [<span onClick={()=>{handleReply(ele.id)}} key="comment-list-reply-to-0">回复 {ele.reply === 1? ele.replyCommentAuthorNickname:''}</span>,
      <Popconfirm
        title="确定删除改评论,这条评论的所有回复也会被删除？"
        onConfirm={()=>handleDeleteComment(ele.id)}
        okText="Yes"
        cancelText="No"
      >
        <span>{res.data.isAuthor[index]&&'删除'}</span>
      </Popconfirm>,        <Dropdown overlay={menuComment} placement="topCenter" arrow>
          <EllipsisOutlined />
        </Dropdown>],
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
  async function handleDirectlyApply() {
    if(value === '') {
      notification['error']({
        message: '评论内容不能为空',
        duration: 1,
      });
      return;
    }
    let params = {
      commentAuthorId: memberInfo?.id,
      content: value,
      blogId: blogDetail.id,
      reply: 0,
    }
    let res = await http.post(`${demoUrl}/blogservice/blog-comment/addComment`,params);
    if(res.code === 20000){
      notification['success']({
        message: '发表成功',
        duration: 1,
      });
      getCommentList();
      setValue('');
    }
  }
  async function handleApply() {
    if(reply === 1){
      console.log('回复评论');
      if(comment === '') {
        notification['error']({
          message: '评论内容不能为空',
          duration: 1,
        });
        return;
      }
      let params = {
        commentAuthorId: memberInfo?.id,
        content: value,
        blogId: blogDetail.id,
        reply: 1,
        replyCommentId: commentId,
      }
      let res = await http.post(`${demoUrl}/blogservice/blog-comment/addComment`,params);
      console.log(res);
      if(res.code === 20000) {
        notification['success']({
          message: '回复成功',
          duration: 1,
        });
        getCommentList();
        setComment('')
      }
    } else {
      console.log('在下面直接评论');
      if(comment === '') {
        notification['error']({
          message: '评论内容不能为空',
          duration: 1,
        });
        return;
      }
      let params = {
        commentAuthorId: memberInfo?.id,
        content: comment,
        blogId: blogDetail.id,
        reply: 0,
      }
      let res = await http.post(`${demoUrl}/blogservice/blog-comment/addComment`,params);
      if(res.code === 20000){
        notification['success']({
          message: '发表成功',
          duration: 1,
        });
        getCommentList();
        setComment('');
      }
    }
  }
  function handleEdit() {
    props.history.push( {pathname:'/edit',state:{blogDetail:blogDetail}});
  }
  function handleChange(e) {
    setValue(e.target.value);
  }
  function onFinish() {
    props.history.push('/')
  }
  async function handleDeleteArticle() {
    // DELETE /blogservice/blog-curd/delete/{id}
    let id = blogDetail.id;
    let res = await http.delete(`${demoUrl}/blogservice/blog-curd/delete/${id}`);
    if(res.data.code === 20000) {
      notification['success']({
        message: '删除成功',
        duration: 1,
      });
      setHaveArticle(false)
    }
  }
  async function handleDeleteComment(id) {
    // DELETE /blogservice/blog-comment/deleteComment/{id}
    let res = await http.delete(`${demoUrl}/blogservice/blog-comment/deleteComment/${id}`);
    console.log(res);
    if(res.data.code === 20000) {
      notification['success']({
        message: '删除成功',
        duration: 1,
      });
    }
    getCommentList();
  }
  async function handleCloseComment() {
    let res = await http.get(`${demoUrl}/blogservice/blog-curd/closeBlogComment/${blogDetail.id}`);
    console.log(res);
    setIsCloseComment(true)
  }
  async function handleOpenComment() {
    // GET /blogservice/blog-curd/openBlogComment/{id
    let res = await http.get(`${demoUrl}/blogservice/blog-curd/openBlogComment/${blogDetail.id}`);
    console.log(res);
    setIsCloseComment(false)
  }
  const goToDetail = async(id)=>{
    window.open('/detail/' + id)
  }
  function noCloseComment() {
    return  <div className='comment'>
    <Comment
      avatar={
        <Avatar
          src={memberDetail.avatar}
          alt="Han Solo"
        />
      }
      content={
        <div className='textArea'>
          <Form.Item>
            <TextArea  value={value} onFocus={()=>{setOnFocusComment1(true)}} style={{backgroundColor:'#F9F9F9'}} showCount='true' rows={4} onChange={handleChange} />
          </Form.Item>
          <div className='bottom'>
          {
            onFocusComment1 && <div>
              <div className='apply'>
            <Button type="primary" onClick={()=>handleDirectlyApply()} shape="round"  size={16} >
              发表
            </Button>
          </div>
          <div className='cancel' onClick={()=>{setOnFocusComment1(false)}}>
            <Button type="primary" danger shape="round"  size={16} >
                取消
              </Button>
          </div>
            </div>
          }
          
        </div>
      </div>
      }
    />
    <List
      className="comment-list"
      header={<div>全部评论{data.length} {isAuthor&&<span onClick={handleCloseComment} style={{color:'#969696',marginLeft:'30px',cursor:'pointer'}}>关闭评论</span>}</div>}
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
  async function handleAddLike() {
    let params = {
      blogId: blogDetail.id
    }
    let res = await http.post(`${demoUrl}/blogservice/blog-like/addLikeBlog`,params);
    if(res.code === 20000) {
      setIsLikeBlog(true);
    }
  }
  
  async function handleRemoveLike() {
    let params = {
      blogId: blogDetail.id,
    }
    let res = await http.delete(`${demoUrl}/blogservice/blog-like/deleteLikeBlog`,params);
    if(res.data.code === 20000) {
      setIsLikeBlog(false)
    }
  }

  async function handleAddCollect() {
    let params = {
      blogId: blogDetail.id
    }
    let res = await http.post(`${demoUrl}/blogservice/blog-collection/addCollect`,params);
    if(res.code === 20000) {
      setIsCollectBlog(true);
    }
  }
  async function handleRemoveCollect() {
    let params = {
      blogId: blogDetail.id,
    }
    let res = await http.delete(`${demoUrl}/blogservice/blog-collection/deleteLikeBlog`,params);
    if(res.data.code === 20000) {
      setIsCollectBlog(false)
    }
  }

  async function handleFocus(){
      let params = {
        userBeFocusedId:memberDetail.id,
      }
      let res = await http.post(`${demoUrl}/blogservice/blog-focus/addFocus`,params) ;
      if(res.code === 20000) {
        setIsFocus(true)
      }

  }
  async function handleCancelFocus(){
      let params = {
        userBeFocusedId:memberDetail.id,
      }
      let res = await http.delete(`${demoUrl}/blogservice/blog-focus/deleteFocus`,params);
      console.log(res);
      if(res.data.code === 20000) {
        setIsFocus(false)
      }

  }
  function yesArticle() {
    return <div className='detailContent'>
    <div className='left'>
      <div className='article'>
        <div className='memberTop'>
          <div style={{display:'flex',position:'relative'}}>
              <Avatar size={56} src={memberDetail.avatar} onClick={()=>{window.open('/personal/' + memberDetail.id)}}/>
              <div style={{display:'flex',flexDirection:'column',justifyContent:'space-around',marginLeft:'10px'}}>
                <div style={{float: 'left'}}> 
                  {memberDetail.nickname} 
                  { !isFocus && !isAuthor && <span style={{color:'green',cursor:'pointer',marginLeft:'20px'}} onClick={()=>{handleFocus()}}><PlusOutlined />关注</span>}
                  { isFocus && !isAuthor && <span style={{color:'#999999',cursor:'pointer',marginLeft:'20px'}} onClick={()=>{handleCancelFocus()}}><CheckOutlined />已关注</span>}
           
                </div>
                <div style={{fontSize:'12px',color:'#969696'}}>{blogDetail.gmtCreate}&nbsp;&nbsp;
                </div>
              </div>
              {
                isAuthor && 
                <div className='edit'>
                  <span onClick={handleEdit}>编辑文章</span>
                  <Popconfirm
                    title="确定删除文章？"
                    onConfirm={()=>handleDeleteArticle()}
                    okText="Yes"
                    cancelText="No"
                  >
                    <span>删除文章</span>
                  </Popconfirm>
                </div>
              }

          </div>
        </div>
        <div className='blogContent' dangerouslySetInnerHTML={{__html:blogDetail.content}}/>
        <div className='blogLike'>
          {isLikeBlog && <LikeFilled onClick={handleRemoveLike}/>}
          {!isLikeBlog && <LikeOutlined onClick={handleAddLike}/>}
          
         <span className='ml-span'> <LikeModal blogId={blogDetail.id} isLikeBlog={isLikeBlog}/> </span>
         
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
      <div className='recommend'>
        <div className='topText'>
          <span>推荐阅读</span>
        </div>
         
        {
          articleList.map((item,index) => (
            <div key={item.id} className='item'>
              <h3 className='title' onClick={()=>goToDetail(item.id)}>{item.title.slice(0,12)}</h3>
            </div>
          ))
        }
      </div> 
    </div>
    
    {
      !onFocusComment2 && !isCloseComment &&
      <div className='commentBottom1'>
        <div className='input'>
          <TextArea  onFocus={()=>{setOnFocusComment2(true)}} 
              placeholder="写下你的评论"
            />
        </div>
        <span style={{cursor:'pointer'}} onClick={()=>{setOnFocusComment2(true)}}>
          
          <MessageOutlined />评论
        </span>
        {
          isLikeBlog &&         <span style={{cursor:'pointer'}} onClick={handleRemoveLike}>
          已赞
        </span>
        }
        {
          !isLikeBlog &&         <span style={{cursor:'pointer'}} onClick={handleAddLike}>
          赞
        </span>
        }

        <Dropdown overlay={menu} placement="topCenter" arrow>
          <EllipsisOutlined />
        </Dropdown>

      </div>
    }
    {
      onFocusComment2 && !isCloseComment &&
      <div className='commentBottom2'>
        <div className='input'>
          <TextArea
              value={comment}
              onChange={(e)=>inputChange(e)}
              autoSize={{ minRows: 3, maxRows: 5 }}
              placeholder="写下你的评论"
            />
        </div>
        <div className='apply'>
          <Button type="primary" onClick={handleApply} shape="round"  size={16} >
            发表
          </Button>
        </div>
        <div className='cancel' onClick={()=>{setOnFocusComment2(false)}}>
         <Button type="primary" danger shape="round"  size={16} >
            取消
          </Button>
        </div>
      </div>
    }
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
export default (withRouter(Detail));
