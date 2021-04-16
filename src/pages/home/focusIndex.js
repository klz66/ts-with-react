/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-04-16 10:53:31
 */

/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-03-27 23:25:26
 */
import { useState, useEffect } from 'react';
import { List, Typography, Divider } from 'antd';
import http from '@/utils/request'
import Personal from '../personal/focusPersonalIndex'
import { withRouter } from 'react-router-dom'
import {demoUrl} from '@/utils/utils';
import React from 'react';
import './components/less/focusIndex.less'

function FocusIndex(props) {
  let memberInfo = JSON.parse(window.localStorage.getItem('memberInfo'))
  let [data,setData] = useState([])
  let [actice,setActice] = useState(-1);
  let [id,setId] = useState('');
  useEffect(() => {
    getRecommendList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  async function getRecommendList(){ 
    let res = await http.get(`${demoUrl}/blogservice/blog-member/getMemberFocusById/${memberInfo.id}`);
    let rows = res.data.list?.map((ele,index) =>({
      ...ele,
    }))
    console.log(rows);
    setData(rows)
  }
  function handleChange(index) {
    setActice(index)
    setId(data[index].id)
  }
			return (
				<div className='focusContent'>
          <div className='left'>
          <List
            size="large"
            style = {{overflowY:'scroll'}}
            header={<div className='listHeader'><span>全部关注</span><span>添加关注</span></div>}
            // footer={<div>Footer</div>}
            bordered
            dataSource={data}
            renderItem={(item,index) => <List.Item onClick={()=>{handleChange(index)}} style={{display:'flex',justifyContent:'space-between',backgroundColor: index === actice?'#ddd':''}}>{item.nickname}</List.Item>}
          />
          </div>
          <div className='right'>
            <Personal focusId={id}/>
          </div>
        </div>
			)
  
}


export default FocusIndex;
