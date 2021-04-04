/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-04-04 09:34:15
 */


/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-04-03 23:10:06
 */

import React from 'react';
// import { Avatar } from 'antd';
import { Tabs,Avatar } from 'antd';
import { SnippetsOutlined , BellOutlined,CommentOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import './personal.less'

const { TabPane } = Tabs;
function Personal(props) {
  let memberInfo = JSON.parse(window.localStorage.getItem('memberInfo'))
  console.log(memberInfo);
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
                <div className='bottom'>
                  <div className='item'>
                    <div>
                      {memberInfo.focusNum}
                    </div>
                    <div>
                      关注
                    </div>
                  </div>
                  <div className='item'>
                    <div>
                      {memberInfo.fansNum}
                    </div>
                    <div>
                      粉丝
                    </div>
                  </div>
                  <div className='item'>
                    <div>
                      {memberInfo.focusNum}
                    </div>
                    <div>
                      文章
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='tab'>
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
                  文章
                </TabPane>
                <TabPane
                  tab={
                    <span>
                      <BellOutlined />
                      动态
                    </span>
                  }
                  key="2"
                >
                  动态
                </TabPane>
                <TabPane
                  tab={
                    <span>
                      <CommentOutlined />
                      最新评论
                    </span>
                  }
                  key="3"
                >
                  最新评论
                </TabPane>
              </Tabs>
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

export default connect(mapState, null)(Personal);
