/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-04-16 17:25:51
 */

import React,{ useState,useEffect }  from 'react';
import http from '@/utils/request'
import List from './components/List'
import CommentList from './components/CommentList'
import {demoUrl} from '@/utils/utils';
import { Tabs,Avatar } from 'antd';
import { withRouter } from 'react-router-dom';
import { SnippetsOutlined ,CommentOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import './personal.less'

const { TabPane } = Tabs;
function Personal(props) {
  let [memberInfo,setMemberInfo] = useState({})
  let [thisAuthorLikes,setThisAuthorLikes] = useState(0)  
  let [authorId,setAuthorId] = useState('')
  useEffect(()=>{
    getMemberInfo();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[props])
  async function getMemberInfo() {
    let id = props.focusId || props.match.params.id;
    setAuthorId(id);
    let res = await http.get(`${demoUrl}/blogservice/blog-member/getMemberById/${id}`);
    if(res.code === 20000) {
      setMemberInfo(res.data.memberDetail)
      setThisAuthorLikes(res.data.thisAuthorLikes)
    }
  }
    return (
      <div className='personalContent'>
        <div className='left'>
          <div className='top'>
            <div className='avatar'>
              <Avatar size={64} src={memberInfo.avatar} />
            </div>
            <div className='topRight'>
              <div className='topRightTop'>
                {memberInfo.nickname}
              </div>
              <div className='topRightBottom'>
                <div className='item1'>
                  <div>
                    {memberInfo.focusNum}
                  </div>
                  <div>
                    关注
                  </div>
                </div>
                <div className='item1'>
                  <div>
                    {memberInfo.fansNum}
                  </div>
                  <div>
                    粉丝
                  </div>
                </div>
                <div className='item1'>
                  <div>
                    {memberInfo.blogNum}
                  </div>
                  <div>
                    文章
                  </div>
                </div>
                <div className='item1'>
                  <div>
                    {thisAuthorLikes}
                  </div>
                  <div>
                    收货喜欢
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='tab1'>
            <Tabs defaultActiveKey="1">
              <TabPane
                tab={
                  <span>
                    <SnippetsOutlined  />
                    文章
                  </span>
                }
                key="1"
              >
                <List authorId={authorId}/>
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <CommentOutlined  />
                    最新评论
                  </span>
                }
                key="2"
              >
                <CommentList authorId={authorId}/>
              </TabPane>
            </Tabs>
          </div>
        <div>
        </div>
      </div>
      </div>
    )
  
}

const mapState = (state) => ({
})

export default connect(mapState, null)(withRouter(Personal));
