/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-03-31 00:35:01
 */
import { Form, Input, InputNumber, Button } from 'antd';
const layout = {
  labelCol: {
    span: 8,
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
  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <Form.Item
        name={['user', 'name']}
        label="昵称"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
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
        <InputNumber />
      </Form.Item>
      <Form.Item name={['user', 'introduction']} label="个人介绍"
        rules={[
          {
            type: 'string',
            min: 0,
            max: 10,
          },
        ]}>
        <Input.TextArea />
      </Form.Item>
      
      <Form.Item name={['user', 'website']} label="个人网站">
        <Input />
      </Form.Item>  
      <Form.Item name={['user', 'we_chat_qr_code']} label="微信二维码">
        <Input />
      </Form.Item>  
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};


export default Demo;
