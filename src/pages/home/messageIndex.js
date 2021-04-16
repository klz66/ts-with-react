/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-04-16 17:29:04
 */

/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-03-27 23:25:26
 */
import { useState, useEffect } from 'react';
import { List, Typography, Divider,Modal } from 'antd';
import http from '@/utils/request'
import { MessageTwoTone,HeartTwoTone, StarTwoTone} from '@ant-design/icons';
import CommentList from '../personal/components/CommentList'
import Personal from '../personal/focusPersonalIndex'
import AddSearchAndFocus from './components/addSearchAndFocus'
import {demoUrl} from '@/utils/utils';
import React from 'react';
import './components/less/messageIndex.less'

const data = ['评论','赞','收藏'
]

function FocusIndex(props) {
  let memberInfo = JSON.parse(window.localStorage.getItem('memberInfo'))
  // let [data,setData] = useState([])
  let [actice,setActice] = useState(0);
  let [id,setId] = useState('');
  useEffect(() => {
    setId(data[actice]?.id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actice])
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
                  收到的评论
                </div>
                <CommentList authorId={memberInfo.id}/>
                </div>
            }
            {
              actice === 1 && <div>
                <div>
                  收到的赞
                </div>
                <CommentList authorId={memberInfo.id}/>
                </div>
            }
          </div>
        </div>
			)
  
}


export default FocusIndex;
