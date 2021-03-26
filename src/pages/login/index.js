/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-03-26 09:52:10
 */

import 'antd/dist/antd.css'
import { connect } from "react-redux";
import  {  actionCreators  }  from "./store";
import { Redirect } from 'react-router-dom';
import { LoginWrapper } from './style';
import { useRef,useState } from 'react';
import { useDebounceFn } from '@umijs/hooks';
import { Input,Button } from 'antd';
import Verify from '@/utils/verify'
import { UserOutlined ,LockFilled } from '@ant-design/icons';

import './index.less'

function Login(props) {
  const { loginStatus } = props;
  let accountRef = useRef()
  let pwdRef = useRef()
  let [isVerify,setIsVerify] = useState(false)
  function sureVerify(bool) {
    setIsVerify(bool)
  }
  const { run } = useDebounceFn(() => {
    props.login(accountRef,pwdRef);
  }, 500);
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
        <div className='verify'>
          <Verify sureVerify={sureVerify}/>
        </div>
        
        <Button className='LoginButton' onClick={() => run()}>登陆</Button>
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
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
