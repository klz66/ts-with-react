/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-04-09 23:48:37
 */
/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-02-18 10:32:30
 */
import { withRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';
import http from '@/utils/request'
import { Input,Button,notification,Avatar,Popconfirm ,Comment, Form, List,Statistic,Tooltip } from 'antd';
import moment from 'moment';
import {demoUrl} from '@/utils/utils';
import { MessageOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css'
import './index.less'

const { Countdown } = Statistic;

const { TextArea } = Input;

function Detail(props) {
  const deadline = Date.now() + 1000 * 3;
  let memberInfo = JSON.parse(window.localStorage.getItem('memberInfo'))
  let [haveArticle,setHaveArticle] = useState(true);
  let [blogDetail,setBlogDetail] = useState({});
  let [memberDetail,setMemberDetail] = useState({});
  let [onFocusComment1,setOnFocusComment1] = useState(false);
  let [onFocusComment2,setOnFocusComment2] = useState(false);
  let [comment,setComment] = useState('');
  let [isAuthor,setIsAuthor] = useState(false);
  // 文章下面的评论框
  let [value,setValue] = useState('');
  //  该评论是不是回复某人
  let [reply,setReply] = useState(0);

  let [data,setData] = useState([]);
  // const data = [
  //   {
  //     actions: [<span onClick={handleReply} key="comment-list-reply-to-0">Reply to</span>],
  //     author: 'Han Solo',
  //     avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  //     content: (
  //       <p>
  //         We supply a series of design principles, practical patterns and high quality design
  //         resources (Sketch and Axure), to help people create their product prototypes beautifully and
  //         efficiently.
  //       </p>
  //     ),
  //     datetime: (
  //       <Tooltip title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}>
  //         <span>{moment().subtract(1, 'days').fromNow()}</span>
  //       </Tooltip>
  //     ),
  //   },
  // ];
  useEffect(() => {
    async function init(){
      let id = props.match.params.id;
      let res = await http.get(`${demoUrl}/blogservice/blog-curd/getBlogDetail/${id}`);
      if(res.code === 20000 && res.data.blogDetail !== null) {
        if(res.data.blogDetail?.authorId === memberInfo.id) { 
          setIsAuthor(true)
        }
        setBlogDetail(res.data.blogDetail)
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
  function handleReply() {
    // 回复评论 传参多一些
    setReply(1)
    setOnFocusComment2(true)
  }
  function inputChange(e) {
    setComment(e.target.value);
  }
  async function getCommentList() {
    // GET /blogservice/blog-comment/getCommentList/{id
    let id = blogDetail.id;
    let res = await http.get(`${demoUrl}/blogservice/blog-comment/getCommentList/${id}`);
    if(res.code === 20000) {
      let arr = res.data.list.map(ele => ({
      actions: [<span onClick={handleReply} key="comment-list-reply-to-0">Reply to</span>],
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
  async function handleApply(flag) {
    if(flag === 0) {
      setReply(0);
      console.log('单纯发评论');
      let params = {
        commentAuthorId: memberInfo.id,
        content: comment,
        blogId: blogDetail.id,
        reply: 0,
      }
      let res = await http.post(`${demoUrl}/blogservice/blog-comment/addComment`,params);
      console.log(res);
    } else if(reply === 1){
      console.log('回复评论');
    }
    console.log(comment);
    console.log(reply);
    if(comment === '') {
      notification['error']({
        message: '评论内容不能为空',
        duration: 1,
      });
    }
    // @ApiModelProperty(value = "评论作者id")
    // private String commentAuthorId;

    // @ApiModelProperty(value = "评论作者头像")
    // private String commentAuthorAvatar;

    // @ApiModelProperty(value = "评论内容")
    // private String content;

    // @ApiModelProperty(value = "博客id")
    // private String blogId;

    // @ApiModelProperty(value = "博客作者id")
    // private String blogAuthorId;

    // @ApiModelProperty(value = "0就是单纯评论，1回复某人")
    // private Integer reply;

    // @ApiModelProperty(value = "被回复的评论id")
    // private String replyCommentId;

    // @ApiModelProperty(value = "被回复的评论的作者id")
    // private String replyCommentAuthorId;
    // let params = {
    //   commentAuthorId: memberInfo.id,
    //   commentAuthorAvatar: memberInfo.avatar,
    //   content: comment,
    //   blogId: blogDetail.id,
    //   blogAuthorId: blogDetail.authorId,
    //   reply: reply,
    // }
    // let res = await http.post(`${demoUrl}/blogservice/blog-comment/addComment`,params);
  }
  function handleEdit() {
    props.history.push( {pathname:'/edit',state:{blogDetail:blogDetail,memberDetail:memberDetail}});
  }
  function handleChange(e) {
    setValue(e.target.value);
  }
  function handleSubmit() {
    console.log(value);
  }
  function onFinish() {
    props.history.push('/')
  }
  async function handleDelete() {
    // DELETE /blogservice/blog-curd/delete/{id}
    let id = blogDetail.id;
    let res = await http.delete(`${demoUrl}/blogservice/blog-curd/delete/${id}`);
    console.log(res);
    if(res.data.code === 20000) {
      notification['success']({
        message: '删除成功',
        duration: 1,
      });
      setHaveArticle(false)
    }
  }
  function yesArticle() {
    return <div className='detailContent'>
    <div className='left'>
      <div className='article'>
        <h1>{blogDetail.title}</h1>
        <div className='memberTop'>
          <div style={{display:'flex',position:'relative'}}>
              <Avatar size={56} src={memberDetail.avatar} onClick={()=>{window.open('/personal/' + memberDetail.id)}}/>
              <div style={{display:'flex',flexDirection:'column',justifyContent:'space-around',marginLeft:'10px'}}>
                <div> {memberDetail.nickname}</div>
                <div style={{fontSize:'12px',color:'#969696'}}>{blogDetail.gmtCreate}&nbsp;&nbsp;
                </div>
              </div>
              {
                isAuthor && 
                <div className='edit'>
                  <span onClick={handleEdit}>编辑文章</span>
                  <Popconfirm
                    title="确定删除文章？"
                    onConfirm={()=>handleDelete()}
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
      </div>
     
      <div className='comment'>
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
                <TextArea onFocus={()=>{setOnFocusComment1(true)}} style={{backgroundColor:'#F9F9F9'}} showCount='true' rows={4} onChange={handleChange} />
              </Form.Item>
              <div className='bottom'>
              {/* <Button htmlType="submit" onClick={handleSubmit} type="primary">
                Add Comment
              </Button> */}
              {
                onFocusComment1 && <div>
                  <div className='apply' onClick={()=>{handleApply(0);}}>
                <Button type="primary" shape="round"  size={16} >
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
          header={`${data.length} replies`}
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
        推荐阅读    
      </div> 
    </div>
    
    {
      !onFocusComment2 && 
      <div className='commentBottom1'>
        <div className='input'>
          <TextArea onFocus={()=>{setOnFocusComment2(true)}} 
              placeholder="写下你的评论"
            />
        </div>
        <span>
          
          <MessageOutlined />评论
        </span>
        <span>
        赞
        </span>
      </div>
    }
    {
      onFocusComment2 && 
      <div className='commentBottom2'>
        <div className='input'>
          <TextArea
              onChange={(e)=>inputChange(e)}
              autoSize={{ minRows: 3, maxRows: 5 }}
              placeholder="写下你的评论"
            />
        </div>
        <div className='apply' onClick={handleApply}>
          <Button type="primary" shape="round"  size={16} >
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
