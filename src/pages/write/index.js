/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-03-17 23:23:12
 */
import React, { useRef} from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { Input,Button,notification  } from 'antd';
import {demoUrl} from '@/utils/utils';
import http from '@/utils/request'
import './index.css';

function Write(props) {
  const openNotificationWithIcon = type => {
    notification[type]({
      message: '发表成功',
      // description:
      //   'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
  };
  const handPost = async() =>{
    // POST /blogservice/blog-curd/addTeacher
    const params = {
      "content": couterRef.current.state.value,
      'name': 'kl'
    }
    let res = await http.post(`${demoUrl}/blogservice/blog-curd/addTeacher`,params);
    console.log(res);
    if(res.code === 20000) {
      openNotificationWithIcon('success')
    }
    
  }
  const couterRef = useRef();
		if (props.loginStatus) {
			return (
				<div className='content'>
          <Input ref={couterRef} placeholder="Basic usage" />
          <div className='footer'>
            <Button type="primary" size={16} onClick={handPost}>发表</Button>
            <Link to='/'><Button type="primary" size={16}>返回主页面</Button></Link>
          </div>
        </div>
			)
		}else {
			return <Redirect to='/login'/>
		}
}

const mapState = (state) => ({
	loginStatus: state.getIn(['login', 'login'])
})

export default connect(mapState, null)(Write);
