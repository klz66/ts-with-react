/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-04-15 18:09:44
 */

import React,{ useState,useEffect }  from 'react';
import http from '@/utils/request'
import List from './components/List'
import FocusList from './components/FocusList'
import FansList from './components/FansList'
import {demoUrl} from '@/utils/utils';
import { Tabs,Avatar } from 'antd';
import { withRouter } from 'react-router-dom';
import { SnippetsOutlined ,CommentOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import './personal.less'

const { TabPane } = Tabs;
function Personal(props) {
  let [memberInfo,setMemberInfo] = useState({})
  let [showTab,setShowTab] = useState(1)  
  let [actice2,setActice2] = useState(1)  
  let [thisAuthorLikes,setThisAuthorLikes] = useState(0)  
  let [authorId,setAuthorId] = useState('')
  useEffect(()=>{
    getMemberInfo();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  useEffect(()=>{
    setShowTab(2)
    console.log(actice2);
  },[actice2])
  async function getMemberInfo() {
    let id = props.match.params.id;
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
                <div className='item' onClick={()=>{setActice2(1)}}>
                  <div>
                    {memberInfo.focusNum}
                  </div>
                  <div>
                    关注
                  </div>
                </div>
                <div className='item' onClick={()=>{setActice2(2)}}>
                  <div>
                    {memberInfo.fansNum}
                  </div>
                  <div>
                    粉丝
                  </div>
                </div>
                <div className='item' onClick={()=>{setShowTab(1)}}>
                  <div>
                    {memberInfo.blogNum}
                  </div>
                  <div>
                    文章
                  </div>
                </div>
                <div className='item' onClick={()=>{setShowTab(1)}}>
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
          <div className='tab'>
            { showTab===1 && <Tabs defaultActiveKey="1">
              <TabPane
                tab={
                  <span>
                    <SnippetsOutlined  />
                    文章
                  </span>
                }
                key="1"
              >
                <List authorId = {authorId}/>
              </TabPane>
            </Tabs>
        }  
            { showTab===2 && <Tabs onChange={(key)=>{setActice2(key);}} defaultActiveKey='1'>
              <TabPane
                tab={
                  <span>
                    关注({memberInfo.focusNum})
                  </span>
                }
                key="1"
              >
                <FocusList memberInfo={memberInfo} actice={actice2}/>
              </TabPane>
              <TabPane
                tab={
                  <span>
                    粉丝({memberInfo.fansNum})
                  </span>
                }
                key="2"
              >
                <FansList memberInfo={memberInfo} actice={actice2} />
              </TabPane>
            </Tabs>
        }  
          </div>
        <div>
        </div>
      </div>
        <div className='right'>
          
          <div className='rightTop'>
          个人介绍
          </div>
          <div className='rightText'>
          {memberInfo.introduction}
          </div>
          
        </div>
      </div>
    )
  
}

const mapState = (state) => ({
})

export default connect(mapState, null)(withRouter(Personal));
