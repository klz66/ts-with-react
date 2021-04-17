/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-04-17 22:23:48
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

function FocusIndex(props) {
  let memberInfo = JSON.parse(window.localStorage.getItem('memberInfo'))
  let [data,setData] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false);
  let [actice,setActice] = useState(-1);
  let [id,setId] = useState('');
  useEffect(() => {
    getRecommendList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    setId(data[actice]?.id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actice])
  async function getRecommendList(){ 
    let res = await http.get(`${demoUrl}/blogservice/blog-member/getMemberFocusById/${memberInfo.id}`);
    let rows = res.data.list?.map((ele,index) =>({
      ...ele,
    }))

    setData(rows)
    if(rows?.length>0){
      setActice(0)
    }
  }
  function handleChange(index) {
    setActice(index)
  }
  const handleCancel = () => {
    getRecommendList();
    setIsModalVisible(false);
    console.log(2020);
    Modal.destroyAll();
  };
			return (
				<div className='focusContent'>
          <div className='left'>
          <List
            size="large"
            style = {{overflowY:'scroll'}}
            header={<div className='listHeader'><span>全部关注</span><span onClick={()=>setIsModalVisible(true)}>添加关注</span></div>}
            // footer={<div>Footer</div>}
            bordered
            dataSource={data}
            renderItem={(item,index) => <List.Item onClick={()=>{handleChange(index)}} style={{display:'flex',justifyContent:'space-between',backgroundColor: index === actice?'#ddd':''}}>{item.nickname}</List.Item>}
          />
          </div>
          <div className='right'>
            {
              id && <Personal focusId={id}/>
            }
            
          </div>
          <Modal
            title={`搜索更多用户`}
            visible={isModalVisible}
            onCancel={handleCancel}
            width={900}
            height={600}
            footer={
            [] // 设置footer为空，去掉 取消 确定默认按钮
            }
          >
            <AddSearchAndFocus />
          </Modal>
        </div>
			)
  
}


export default FocusIndex;
