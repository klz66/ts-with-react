/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-03-31 16:05:49
 */
import React, { useRef,useState } from 'react';
import { Form, Input, InputNumber, Button,Radio } from 'antd';
import UploadImg from '@/utils/upload' 
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
  const onFinish = (values) => {
    console.log(values);
    console.log(avatarImageUrl);
    console.log(qrCodeImageUrl);
  };
  function getAvatarImageUrl(img){
    setAvatarImageUrl(img)
  }
  function getQrCodeImageUrl(img){
    setQrCodeImageUrl(img)
  }
  
  return (
    <div className='content'>
    
    <Form {...layout} name="nest-messages" 
    onFinish={onFinish} 
    validateMessages={validateMessages}
    initialValues={{
      sex: memberInfo.sex
     }}>
      
      <Form.Item
        name={['user', 'avatar']}
        label="头像"
      >
        <div style={{width:'300px',marginLeft:'20px'}}>
           <UploadImg imageUrl={memberInfo.avatar} getImageUrl={getAvatarImageUrl}/>
        </div>
      </Form.Item>
      <Form.Item
        name={['user', 'nickname']}
        label="昵称"
        rules={[
          {
            required: true,
            min: 0,
            max: 20,
          },
        ]}
      >
        <div style={{width:'200px',marginLeft:'20px'}}>
        <Input size="middle" defaultValue={memberInfo.nickname}/>
        </div>
      </Form.Item>
      <Form.Item
        name={['user', 'age']}
        label="年龄"
        rules={[
          {
            type: 'number',
            min: 0,
            max: 800,
          },
        ]}
      >
        <div style={{marginLeft:'20px'}}>
        <InputNumber defaultValue={memberInfo.age}/>
        </div>
      </Form.Item>
      <Form.Item name={['user', 'sex']} label="性别">
        <div style={{marginLeft:'20px'}}>
          <Radio.Group>
            <Radio value="1">女</Radio>
            <Radio value="2">男</Radio>
            <Radio value="3">保密</Radio>
          </Radio.Group>
        </div>
      </Form.Item>
      <Form.Item name={['user', 'introduction']} label="个人介绍"
        rules={[
          {
            type: 'string',
            min: 0,
            max: 200,
          },
        ]}>
          <div style={{marginLeft:'20px'}}>
        <Input.TextArea defaultValue={memberInfo.introduction} rows={5} size="large"/>
        </div>
      </Form.Item>
      
      <Form.Item name={['user', 'website']} label="个人网站">
        <div style={{marginLeft:'20px'}}>
          <Input defaultValue={memberInfo.personalWebsite}/>
        </div>
      </Form.Item>  
      <Form.Item
        name={['user', 'we_chat_qr_code']}
        label="微信二维码"
      >
        <div style={{width:'300px',marginLeft:'20px'}}>
           <UploadImg imageUrl={memberInfo.weChatQrCode} getImageUrl={getQrCodeImageUrl}/>

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
