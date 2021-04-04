/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-04-03 20:38:04
 */
import React, { useState } from 'react';
import { Form, Input, InputNumber, Button,Radio,notification } from 'antd';
import http from '@/utils/request'
import {demoUrl} from '@/utils/utils';
import UploadImg from '@/utils/upload' 
import UploadImgButton from '@/utils/uploadWithButton' 
import './index.less'
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: '请输入${label}',
  number: {
    range: '彭祖，是你吗？',
  },
  string: {
    range: '太长了',
  },
};
/* eslint-enable no-template-curly-in-string */

function Demo() {
  const [avatarImageUrl, setAvatarImageUrl] = useState('');
  const [qrCodeImageUrl, setQrCodeImageUrl] = useState('');


  let memberInfo = JSON.parse(window.localStorage.getItem('memberInfo'))
  const onFinish = async(values) => {
    let params = {
      id: memberInfo.id,
      age:values.age,
      introduction:values.introduction,
      nickname:values.nickname,
      personalWebsite:values.personalWebsite,
      sex:values.sex,
      avatar:avatarImageUrl,
      weChatQrCode:qrCodeImageUrl,
    }
    let res = await http.post(`${demoUrl}/blogservice/blog-member/updateUserSetting`,params);
    if(res.code === 20000) {
      let resp = await http.get(`${demoUrl}/blogservice/blog-member/getMemberInfo`);
      localStorage.setItem('memberInfo',JSON.stringify(resp.data.userInfo))
      notification['success']({
        message: '设置成功',
      });
      window.location.reload()
    }
  };
  function getAvatarImageUrl(img){
    console.log(img);
    setAvatarImageUrl(img)
  }
  function getQrCodeImageUrl(img){
    setQrCodeImageUrl(img)
  }

  return (
    <div className='setting-content'>
    
    <Form {...layout} name="nest-messages" 
    onFinish={onFinish} 
    validateMessages={validateMessages}
    initialValues={{
      
      nickname: memberInfo.nickname,
      age: memberInfo.age,
      sex: memberInfo.sex,
      introduction: memberInfo.introduction,
      personalWebsite: memberInfo.personalWebsite,
     }}>
      
      <Form.Item
        name='avatar'
        label="头像"
      >
        <div style={{width:'300px',marginLeft:'20px'}}>
           <UploadImg imageUrl={memberInfo.avatar} getImageUrl={getAvatarImageUrl}/>
        </div>
      </Form.Item>
      <Form.Item
        name='nickname'
        label="昵称"
        rules={[
          {
            required: true,
            min: 0,
            max: 20,
          },
        ]}
      >
        <Input size="middle" style={{width:'200px',marginLeft:'20px'}} />

      </Form.Item>
      <Form.Item
        name='age'
        label="年龄"
        rules={[
          {
            type: 'number',
            min: 0,
            max: 800,
          },
        ]}
      >
        <InputNumber style={{marginLeft:'20px'}} />
      </Form.Item>
      <Form.Item name='sex' label="性别">
          <Radio.Group  style={{marginLeft:'20px'}}  initialValues={memberInfo.sex}>
            <Radio value={1}>女</Radio>
            <Radio value={2}>男</Radio>
            <Radio value={3}>保密</Radio>
          </Radio.Group>
      </Form.Item>
      <Form.Item name='introduction' label="个人介绍"
        rules={[
          {
            type: 'string',
            min: 0,
            max: 200,
          },
        ]}>
        <Input.TextArea  style={{marginLeft:'20px'}} rows={5} size="large"/>
      </Form.Item>
      
      <Form.Item name='personalWebsite' label="个人网站">
          <Input style={{marginLeft:'20px'}}/>
      </Form.Item>  
      <Form.Item
        name='we_chat_qr_code'
        label="微信"
      >
        <div style={{width:'300px',marginLeft:'20px'}}>
           <UploadImgButton imageUrl={memberInfo.weChatQrCode} getImageUrl={getQrCodeImageUrl}/>

        </div>
      </Form.Item>
      <Form.Item wrapperCol={{
          span: 12,
          offset: 4,
        }}>
        <Button type="primary" htmlType="submit">
          保存
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};


export default Demo;
