/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-04-17 22:28:16
 */

import 'antd/dist/antd.css'
import React, { useState } from 'react';
import { connect } from "react-redux";
import  {  actionCreators  }  from "./store";
import { Link,withRouter } from 'react-router-dom'
import { CSSTransition } from "react-transition-group";
import { Menu, Dropdown, Avatar,List } from 'antd';
import { FolderOpenOutlined,CaretDownFilled ,SettingOutlined,UserOutlined,HeartOutlined,InteractionOutlined ,PoweroffOutlined} from '@ant-design/icons';
import {
	HeaderWrapper,
	Logo,
	Nav,
	NavItem,
	SearchWrapper,
  SearchInfo,
	NavSearch,
	Addition,
	Button
} from './style';
 
function Header(props) {
  const [keyValue, setKeyValue] = useState('');
  let memberInfo= JSON.parse(window.localStorage.getItem('memberInfo'))
  const {focused,changeFocusOn,changeFocusOff}=props;
  const handleOut = () =>{
    props.history.push('login');
  }
  const menu = (
    <Menu>
      <Menu.Item>
      <span onClick={()=>{window.open('/personal/' + memberInfo.id)}}>
        <UserOutlined/>
          个人主页
        </span>
      </Menu.Item>
      <Menu.Item>
        <span onClick={()=>{props.changeShowTab(4)}}>
          <SettingOutlined />
          个人信息
        </span>
      </Menu.Item>
      <Menu.Item>
        <span onClick={()=>{props.changeShowTab(5)}}>
        <HeartOutlined/>
          收藏文章
        </span>
      </Menu.Item>
      <Menu.Item>
        <span onClick={()=>{props.changeShowTab(6)}}>
        <FolderOpenOutlined/>
          管理博客
        </span>
      </Menu.Item>

      <Menu.Item onClick={()=>{props.changeShowTab(7)}}>
          <InteractionOutlined/>
          回收站
      </Menu.Item>
      <Menu.Item onClick={()=>{handleOut()}}>
        <span>
          <PoweroffOutlined/>
          退出
        </span>
      </Menu.Item>
    </Menu>
  );
  const toRegister = () => {
    props.history.push( {pathname:'/login',state:{login:false}});
  }
  const handWrite = () => {
    if(localStorage.getItem('token')){
      window.open('/write')
    } else {
      props.history.push('/login');
    }
    
  }
  const toLogin = () => {
    props.history.push( {pathname:'/login',state:{login:true}});
  }
  const isLogin = ()=>{
    return (
      <>
       <Button onClick={()=>toRegister()} className='reg'>注册</Button>
        <NavItem onClick={()=>toLogin()} className='right'>登录</NavItem>
      </>   
    )
  }
  const Header = () => {
    return (
      <HeaderWrapper>
        <Link to='/'>
          <Logo/>
        </Link>
        <Nav>
          {localStorage.getItem('token') && <NavItem className='left' style={{color: props.showTab===2 &&'red'}} onClick={()=>{props.changeShowTab(2)}}>关注</NavItem>}
          <NavItem className='left' style={{color: props.showTab===1 &&'red'}} onClick={()=>{props.changeShowTab(1)}}>发现</NavItem>
          {localStorage.getItem('token') && <NavItem className='left' style={{color: props.showTab===3 &&'red'}} onClick={()=>{props.changeShowTab(3)}}>消息</NavItem>}
         <SearchWrapper>
          <CSSTransition
            in={focused}
            timeout={300}
            classNames='slide'
          >
            <NavSearch className={focused?'focused':''}
              onFocus={()=>changeFocusOn()}
              onBlur={changeFocusOff}
              onKeyDown={()=>{console.log(keyValue);}}
              onChange={(e)=>{setKeyValue(e.target.value)}}
              value={keyValue}
            />
 
          </CSSTransition>
          <i className={focused ? 'focused iconfont zoom': 'iconfont zoom'} onClick={()=>{console.log(2020)}}>
                &#xe6e4;
              </i>
              {
          focused &&         <SearchInfo>
          <List
        itemLayout="horizontal"
        dataSource={['1','2']}
        renderItem={item => (
          <List.Item>
            <div style={{display:'flex',justifyContent:'space-between'}}>
             
                <div> {item}</div>
                <div style={{position:'absolute',right:'0px',cursor:'pointer'}}>
2020
                </div>
            </div>
          </List.Item>
        )}
      />
          </SearchInfo>
        }
        </SearchWrapper>

        </Nav>
  
        <Addition>
            <Button className='writting' onClick={handWrite}> 
              <i className="iconfont" style={{cursor:'pointer'}}>&#xe742;</i>
              写文章
            </Button>
            {
              !localStorage.getItem('token') && isLogin()
            }
            {
              localStorage.getItem('token') &&  
              <Dropdown overlay={menu} placement="bottomCenter">
                <div style={{float:'right',marginTop: '9px',marginRight:'10px'}}>
                <Avatar src={memberInfo?.avatar}></Avatar>
                <CaretDownFilled  color='red'/>
                </div>
              </Dropdown>
            }
           
        </Addition>
      </HeaderWrapper>
    );
  }
  return (
    <div>
      {Header()}
    </div>
  );
}

const mapStateToProps = (state) => ({
  focused:state.getIn(['header','focused']),
})
const mapDispatchToProps = (dispatch) => ({
  changeFocusOn(){
    dispatch(actionCreators.getInputFocusOn(true))
  },
  changeFocusOff(){
    dispatch(actionCreators.getInputFocusOff(false))
  },
})


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
