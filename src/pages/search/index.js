/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-04-17 22:39:29
 */

/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-03-27 23:25:26
 */
import { useState, useEffect } from 'react';
import { List } from 'antd';
import { MessageTwoTone,HeartTwoTone, StarTwoTone} from '@ant-design/icons';
import CommentList from '../personal/components/CommentList'
import LikeList from './components/LikeList'
import CollectionList from './components/CollectionList'
import React from 'react';
import './components/less/messageIndex.less'

const data = ['用户','博客'
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
                <LikeList authorId={memberInfo.id}/>
                </div>
            }
            {
              actice === 2 && <div>
                <div>
                  收到的收藏
                </div>
                <CollectionList authorId={memberInfo.id}/>
                </div>
            }
          </div>
        </div>
			)
  
}


export default FocusIndex;
