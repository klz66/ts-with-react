/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-02-28 16:59:42
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
import { LoginWrapper, LoginBox, Input, Button } from './style';
import { useRef } from 'react';
function Login(props) {
  const { loginStatus } = props;
  let accountRef = useRef()
  let pwdRef = useRef()
  console.log(loginStatus);
  return (
    <div>
    { 
      !loginStatus?<LoginWrapper>
      <LoginBox>
        <Input placeholder='账号' ref={accountRef} />
        <Input placeholder='密码' type='password' ref={pwdRef}/>
        <Button onClick={() => props.login(accountRef,pwdRef)}>登陆</Button>
      </LoginBox>
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
