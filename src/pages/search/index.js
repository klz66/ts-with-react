/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-04-18 14:15:09
 */

/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-03-27 23:25:26
 */
import { useState, useEffect } from 'react';
import { List } from 'antd';
import { MessageTwoTone,HeartTwoTone, StarTwoTone} from '@ant-design/icons';
import SearchBlog from './components/SearchUser'
import SearchUser from './components/SearchUser'
import React from 'react';
import './index.less'

const data = ['用户','博客'
]

function FocusIndex(props) {
  console.log(props.location.query.keyValue);
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
                <span><MessageTwoTone /><span style={{marginLeft:'20px'}}>{item}</span></span>
              }
              {
                index === 1 && 
                <span><HeartTwoTone /><span style={{marginLeft:'20px'}}>{item}</span></span>
              }
              {
                index === 2 && 
                <span><StarTwoTone /><span style={{marginLeft:'20px'}}>{item}</span></span>
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
                <SearchUser authorId={memberInfo.id} keyValue = {props.location.query.keyValue}/>
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
