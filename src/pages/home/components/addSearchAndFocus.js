/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-04-16 11:40:06
 */
/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-04-13 14:19:24
 */
import React, { useState,useEffect } from 'react';
import { Modal,Avatar } from 'antd';
import http from '@/utils/request'
import {demoUrl} from '@/utils/utils';
import { withRouter } from 'react-router-dom';

function LikeModal(props) {
  let memberInfo = JSON.parse(window.localStorage.getItem('memberInfo'))
  let [current,setCurrent]=useState(1)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [likeBlogList, setLikeBlogList] = useState([]);
  useEffect(() => {
    getMemberList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[props]);
  async function getMemberList() {
    let res = await http.get(`${demoUrl}/blogservice/blog-member/pageMemberListSearchWithToken/${memberInfo.id}/${current}/3`);
    if(res.code === 20000) {
      console.log(res);
      setLikeBlogList(res.data.rows)
    }
  }


  const showModal = () => {
    getMemberList();
    setIsModalVisible(true);
  };


  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
          <span type="primary" onClick={showModal}>
        添加关注
      </span>
            <Modal
      title={`用户搜索`}
      visible={isModalVisible}
      onCancel={handleCancel}
      width={800}
      hight={600}
      footer={
      [] // 设置footer为空，去掉 取消 确定默认按钮
      }
      >
        {
          likeBlogList.map(ele=>(
            <div style={{display:'flex',alignItems:'center',fontSize:'16px',fontWeight:'500',cursor:'pointer'}}>
              {ele.nickname}
            </div>
          ))
        }
       
      </Modal>
    </>
  );
};

export default withRouter(LikeModal);
