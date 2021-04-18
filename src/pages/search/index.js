/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-04-18 17:27:25
 */

/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-03-27 23:25:26
 */
import { useState, useEffect } from 'react';
import { List } from 'antd';
import { TeamOutlined,SnippetsOutlined, StarTwoTone} from '@ant-design/icons';
import SearchBlog from './components/SearchBlog'
import SearchUser from './components/SearchUser'
import React from 'react';
import './index.less'

const data = ['用户','博客'
]

function FocusIndex(props) {
  let memberInfo = JSON.parse(window.localStorage.getItem('memberInfo'))
  let [actice,setActice] = useState(0);
  function handleChange(index) {
    setActice(index)
  }
			return (
				<div className='messageContent'>
          <div className='left'>
          <List
            size="large"
            style = {{overflowY:'scroll'}}
            bordered
            dataSource={data}
            renderItem={(item,index) => <List.Item onClick={()=>{handleChange(index)}} style={{display:'flex',justifyContent:'space-between',backgroundColor: index === actice?'#ddd':''}}>
              
              {
                index === 0 && 
                <span><TeamOutlined /><span style={{marginLeft:'20px'}}>{item}</span></span>
              }
              {
                index === 1 && 
                <span><SnippetsOutlined /><span style={{marginLeft:'20px'}}>{item}</span></span>
              }
            </List.Item>}
          />
          </div>
          <div className='right'>
            {
              actice === 0 && <div>
                <div>
                  用户
                </div>
                <SearchUser authorId={memberInfo.id}/>
                </div>
            }
            {
              actice === 1 && <div>
                <div>
                  博客
                </div>
                <SearchBlog authorId={memberInfo.id}/>
                </div>
            }
          </div>
        </div>
			)
  
}


export default FocusIndex;
