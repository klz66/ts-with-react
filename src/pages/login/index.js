/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-03-25 00:15:43
 */
/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-02-28 14:51:33
 */
/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-02-18 10:32:30
 */
import 'antd/dist/antd.css'
import { connect } from "react-redux";
import  {  actionCreators  }  from "./store";
import { Redirect } from 'react-router-dom';
import { LoginWrapper, LoginBox, Button } from './style';
import { useRef } from 'react';
import { Input } from 'antd';
import './index.less'
import { UserOutlined ,LockFilled } from '@ant-design/icons';
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
