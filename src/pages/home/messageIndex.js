/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-04-16 16:48:59
 */

/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-03-27 23:25:26
 */
import { useState, useEffect } from 'react';
import { List, Typography, Divider,Modal } from 'antd';
import http from '@/utils/request'
import { RedoOutlined } from '@ant-design/icons';
import Personal from '../personal/focusPersonalIndex'
import AddSearchAndFocus from './components/addSearchAndFocus'
import {demoUrl} from '@/utils/utils';
import React from 'react';
import './components/less/focusIndex.less'

const data = ['评论','赞','收藏'
]

function FocusIndex(props) {
  let memberInfo = JSON.parse(window.localStorage.getItem('memberInfo'))
  // let [data,setData] = useState([])
  let [actice,setActice] = useState(-1);
  let [id,setId] = useState('');
  useEffect(() => {
    setId(data[actice]?.id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actice])
  function handleChange(index) {
    setActice(index)
  }
			return (
				<div className='focusContent'>
          <div className='left'>
          <List
            size="large"
            style = {{overflowY:'scroll'}}
            bordered
            dataSource={data}
            renderItem={(item,index) => <List.Item onClick={()=>{handleChange(index)}} style={{display:'flex',justifyContent:'space-between',backgroundColor: index === actice?'#ddd':''}}>
              {item}
            </List.Item>}
          />
          </div>
          <div className='right'>
            {/* <Personal focusId={id}/> */}
          </div>
        </div>
			)
  
}


export default FocusIndex;
