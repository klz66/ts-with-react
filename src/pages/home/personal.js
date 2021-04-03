/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-04-03 18:38:06
 */

import React from 'react';
import { Tabs } from 'antd';
import { AppleOutlined, AndroidOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';

const { TabPane } = Tabs;
function Personal(props) {
			return (
				<div>
          <Tabs defaultActiveKey="1">
    <TabPane
      tab={
        <span>
          <AppleOutlined />
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
          <AndroidOutlined />
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
          <AndroidOutlined />
          最新评论
        </span>
      }
      key="2"
    >
      最新评论
    </TabPane>
  </Tabs>
        </div>
			)
  
}

const mapState = (state) => ({
})

export default connect(mapState, null)(Personal);
