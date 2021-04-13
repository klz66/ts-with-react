/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-04-13 15:36:10
 */
import React, { useState } from 'react';
import { Modal, Radio, Form,Input } from 'antd';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
const { TextArea } = Input;
const ExposeModal = () => {
  const [chooseRadio, setChooseRadio] = useState('a');
  const [detailContent, setDetailContent] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    let chooseRadioMeaning;
    if(chooseRadio === 'a') {
      chooseRadioMeaning = '广告或垃圾信息'
    }else if(chooseRadio === 'b'){
      chooseRadioMeaning = '挑拨引战'
    }else {
      chooseRadioMeaning = '抄袭'
    }
    let params = {
      detailContent,
      chooseRadioMeaning,
    }
    console.log(params);
    setDetailContent('')
    setChooseRadio('a')
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <span type="primary" onClick={showModal}>
        举报文章
      </span>
      <Modal title={<h1>举报文章</h1>} visible={isModalVisible} onOk={handleOk} locale={locale} 
                okText="确认"
                cancelText="取消"
                onCancel={handleCancel}>
        <p>
          <Form.Item name="radio-group" label="">
            <Radio.Group value={chooseRadio} onChange={(e)=>setChooseRadio(e.target.value)}>
              <Radio value="a">广告或垃圾信息</Radio>
              <Radio value="b">挑拨引战</Radio>
              <Radio value="c">抄袭</Radio>
            </Radio.Group>
            <TextArea onChange={(e)=>{setDetailContent(e.target.value)}} rows={4} placeholder="写举报的详细情况 (选填)" style={{marginTop:'20px'}}/>
          </Form.Item>
        </p>
      </Modal>
    </>
  );
};


export default ExposeModal;
