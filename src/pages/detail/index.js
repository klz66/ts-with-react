/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-04-08 14:00:41
 */
/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-02-18 10:32:30
 */
import { withRouter } from 'react-router-dom';
import { useRef,useState, useEffect } from 'react';
import http from '@/utils/request'
import { Input,Button,notification,Avatar } from 'antd';
import {demoUrl} from '@/utils/utils';
import { MessageOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css'
import './index.less'

const { TextArea } = Input;

function Detail(props) {
  let [blogDetail,setBlogDetail] = useState({});
  let [memberDetail,setMemberDetail] = useState({});
  let [onFocusComment,setOnFocusComment] = useState(false);
  let [comment,setComment] = useState('');
  let [isAuthor,setIsAuthor] = useState(false);
  useEffect(() => {
    async function init(){
      let id = props.match.params.id;
      let res = await http.get(`${demoUrl}/blogservice/blog-curd/getBlogDetail/${id}`);
      if(res.code === 20000) {
        let memberInfo = JSON.parse(window.localStorage.getItem('memberInfo'))
        console.log(localStorage.getItem('memberInfo').id);
        if(res.data.blogDetail.authorId === memberInfo.id) { 
          setIsAuthor(true)
        }
        setBlogDetail(res.data.blogDetail)
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
  },[blogDetail]);
  function inputChange(e) {
    setComment(e.target.value);
  }
  function handleApply() {
    console.log(comment);
    if(comment === '') {
      notification['error']({
        message: '评论内容不能为空',
        duration: 1,
      });
    }
  }
  function handleEdit() {
    props.history.push( {pathname:'/edit',state:{blogDetail:blogDetail,memberDetail:memberDetail}});
  }

  return (
    <div className='detailContent'>
      <div className='left'>
        <h1>{blogDetail.title}</h1>
        <div className='member'>
          <div style={{display:'flex',position:'relative'}}>
              <Avatar size={56} src={memberDetail.avatar} onClick={()=>{window.open('/personal/' + memberDetail.id)}}/>
              <div style={{display:'flex',flexDirection:'column',justifyContent:'space-around',marginLeft:'10px'}}>
                <div> {memberDetail.nickname}</div>
                <div style={{fontSize:'12px',color:'#969696'}}>{blogDetail.gmtCreate}&nbsp;&nbsp;
                </div>
              </div>
              {
                isAuthor && <div className='edit' onClick={handleEdit}>
                              编辑文章
                            </div>
              }

          </div>
        </div>
        <div className='blogContent' dangerouslySetInnerHTML={{__html:blogDetail.content}}/>
      </div>
      <div className='right'>
        用户信息
        推荐阅读
      </div>
      
      {
        !onFocusComment && 
        <div className='commentBottom1'>
          <div className='input'>
            <TextArea onFocus={()=>{setOnFocusComment(true)}} onBlur={()=>{setOnFocusComment(false)}}
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
        onFocusComment && 
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
          <div className='cancel' onClick={()=>{setOnFocusComment(false)}}>
           <Button type="primary" danger shape="round"  size={16} >
              取消
            </Button>
          </div>
        </div>
      }
    </div>
		// <div dangerouslySetInnerHTML={{__html:props.content}}/>
  );
}
export default (withRouter(Detail));
