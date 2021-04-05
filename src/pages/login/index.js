/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-04-06 00:02:29
 */

import 'antd/dist/antd.css'
import { connect } from "react-redux";
import  {  actionCreators  }  from "./store";
import { Redirect } from 'react-router-dom';
import { LoginWrapper } from './style';
import { useRef,useState,useEffect } from 'react';
// import { Link, } from 'react-router-dom'
import { useDebounce } from '@/utils/utils';
import { Input,Button,notification } from 'antd';
import Verify from '@/utils/verify'
import { UserOutlined ,LockFilled } from '@ant-design/icons';

import './index.less'

function Login(props) {
  const { loginStatus } = props;
  let accountRef = useRef()
  let pwdRef = useRef()
  let [isVerify,setIsVerify] = useState(false)
  let [isLogin,setIsLogin] = useState(true)
  function sureVerify(bool) {
    setIsVerify(bool)
  }
  function loginOrReagister(bool) {
    setIsLogin(bool)
    accountRef.current.state.value = ''
    pwdRef.current.state.value = ''
  }
  useEffect(()=>{
    if(props.location.state === undefined) {
      return;
    }
    if(props.location.state.login === false){
      setIsLogin(false)
    } 
  },[])
  const loginFn = useDebounce(() => {
    if(!isVerify){
      notification['error']({
        message: '验证码不正确',
        duration: 1,
      });
      return;
    }
    props.login(accountRef,pwdRef);
  }, 500);

  const  register  = useDebounce(() => {
    if(!isVerify){
      notification['error']({
        message: '验证码不正确',
        duration: 1,
      });
      return;
    }
    props.register(accountRef,pwdRef);
  }, 500);
  return (
    <div>
    { 
      !loginStatus?<LoginWrapper>
      <div className='LoginBox'>
        <h4 className='title'>
            <div className='center'>
              <span
                  className={isLogin ? 'active' : 'gray'} 
                  onClick={() => {
                    loginOrReagister(true);
                  }}>
                  登录
              </span>
              <span
                  className={isLogin ? 'gray' : 'active'} 
                  onClick={() => {
                    loginOrReagister(false);
                  }}>
                  注册
              </span>
            </div>
        </h4>
        <div className='LoginInput'>
          <Input size="large" placeholder="账号"  maxLength={12}  ref={accountRef} prefix={<UserOutlined />} />
        </div>
        <div className='LoginInput'>
          <Input size="large" placeholder="密码" type='password' maxLength={18} ref={pwdRef} prefix={<LockFilled />} />   
        </div>
        <div className='verify'>
        {isLogin&&<Verify sureVerify={sureVerify}/>}
        {!isLogin&&<Verify sureVerify={sureVerify}/>}
        </div>
        {isLogin&&<Button className='LoginButton' onClick={() => loginFn()}>登陆</Button>}
        {!isLogin&&<Button className='LoginButton' onClick={() => register()}>注册</Button>}
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
    dispatch(actionCreators.login(accountRef.current.state.value,pwdRef.current.state.value))
  },
  register(accountRef,pwdRef){
    dispatch(actionCreators.register(accountRef.current.state.value,pwdRef.current.state.value))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
