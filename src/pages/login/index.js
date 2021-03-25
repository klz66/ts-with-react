/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-03-25 10:45:18
 */

import 'antd/dist/antd.css'
import { connect } from "react-redux";
import  {  actionCreators  }  from "./store";
import { Redirect } from 'react-router-dom';
import { LoginWrapper } from './style';
import { useRef } from 'react';
import { Input,Button } from 'antd';
import Verify from '@/utils/verify'
import { UserOutlined ,LockFilled } from '@ant-design/icons';

import './index.less'

function Login(props) {
  const { loginStatus } = props;
  let accountRef = useRef()
  let pwdRef = useRef()
  console.log(loginStatus);
  return (
    <div>
    { 
      !loginStatus?<LoginWrapper>
      <div className='LoginBox'>
        <div className='LoginInput'>
          <Input size="large" placeholder="账号"  maxLength={12}  ref={accountRef} prefix={<UserOutlined />} />
        </div>
        <div className='LoginInput'>
          <Input size="large" placeholder="密码" type='password' maxLength={18} ref={pwdRef} prefix={<LockFilled />} />   
        </div>
        <Button onClick={() => props.login(accountRef,pwdRef)}>登陆</Button>
        <Verify/>
      </div>
    </LoginWrapper>:<Redirect to='/'/>

    }
    </div>
  );
}
const mapStateToProps = (state) => ({
  loginStatus: state.getIn(['login', 'login'])
})
const mapDispatchToProps = (dispatch) => ({
  login(accountRef,pwdRef){
    dispatch(actionCreators.login())
    console.log(accountRef.current.value,pwdRef.current.value);
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
