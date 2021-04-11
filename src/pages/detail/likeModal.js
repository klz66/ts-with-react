/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-04-11 16:05:47
 */
import React, { useState,useEffect } from 'react';
import { Modal,Avatar } from 'antd';
import http from '@/utils/request'
import {demoUrl} from '@/utils/utils';
import { withRouter } from 'react-router-dom';

function LikeModal(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [likeBlogList, setLikeBlogList] = useState([]);
  useEffect(() => {
    getMemberList();
  },[props]);
  async function getMemberList() {
    let id = props.blogId;
    let res = await http.get(`${demoUrl}/blogservice/blog-like/getLikeBlogMember/${id}`);
    if(res.code === 20000) {
      setLikeBlogList(res.data.list)
    }
  }
  // /blogservice/blog-like/getLikeBlogMember/{id


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
        {`共${likeBlogList.length}人点赞`}
      </span>
            <Modal
      title={`${likeBlogList.length}人点赞`}
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
              <Avatar size={56} src={ele.memberAvatar} onClick={()=>{window.open('/personal/' + ele.memberId)}}/>
              <div style={{marginLeft:'20px'}}> {ele.memberNickname}</div>
            </div>
          ))
        }
       
      </Modal>
    </>
  );
};

export default withRouter(LikeModal);
