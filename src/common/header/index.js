/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-03-28 23:33:27
 */

import 'antd/dist/antd.css'
import { connect } from "react-redux";
import  {  actionCreators  }  from "./store";
import { Link,withRouter } from 'react-router-dom'
import { CSSTransition } from "react-transition-group";
import { Menu, Dropdown, Avatar } from 'antd';
import { actionCreators as loginActionCreators } from '../../pages/login/store'
import { DownCircleTwoTone } from '@ant-design/icons';
import {
	HeaderWrapper,
	Logo,
	Nav,
	NavItem,
	SearchWrapper,
	NavSearch,
	SearchInfo,
	SearchInfoTitle,
	SearchInfoSwitch,
	SearchInfoList,
	SearchInfoItem,
	Addition,
	Button
} from './style';
 
import React from 'react';
function Header(props) {
  let memberInfo = JSON.parse(window.localStorage.getItem('memberInfo'))
  const {page,totalPage,focused,mouseIn,list,changeFocusOn,changeFocusOff,handMouseIn,handMouseOut,changePage}=props;
  const handleOut = () =>{
    console.log(2020);
    props.history.push( {pathname:'/login',state:{login:false}});
    localStorage.removeItem('token');
    localStorage.removeItem('memberInfo')
  }
  const getListArea = () => {
    if(focused || mouseIn) {
      let newList = [];
      // let pageList = []
      let jsList = list.toJS();
      // 这里的3,是每页三个
      let RightIndex = Math.min(((page+1)*3),jsList.length);
      for(let i=(page*3);i<RightIndex;i++){
        newList.push(jsList[i])
      }

      return (
        <SearchInfo onMouseEnter={handMouseIn} onMouseLeave={handMouseOut}>
        <SearchInfoTitle>
          热门搜索
          <SearchInfoSwitch onClick={()=>changePage(page,totalPage,list)}
          >
            换一批
          </SearchInfoSwitch>
        </SearchInfoTitle>
        <SearchInfoList>
          {newList.map(item => {
            return (
              <SearchInfoItem>{item}</SearchInfoItem>
            )
          })}
        </SearchInfoList>
      </SearchInfo>
      )
    }
    else {
      return null
    }
  }
  const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          个人主页
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          个人设置
        </a>
      </Menu.Item>
      <Menu.Item>
        <span target="_blank" onClick={()=>{handleOut()}}>
          退出
        </span>
      </Menu.Item>
    </Menu>
  );
  const toRegister = () => {
    props.history.push( {pathname:'/login',state:{login:false}});
  }
  const toLogin = () => {
    props.history.push( {pathname:'/login',state:{login:true}});
  }
  const isLogin = ()=>{
    return (
      <>
       <Button onClick={()=>toRegister()} className='reg'>注册</Button>
         <NavItem onClick={()=>toLogin()} className='right'>登录</NavItem>
          {/* <NavItem onClick={()=>props.loginIn()} className='right'>注册</NavItem> */}
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
         <NavItem className='left' style={{color: props.showTab===2 &&'red'}} onClick={()=>{props.changeShowTab(2)}}>关注</NavItem>
         <NavItem className='left' style={{color: props.showTab===1 &&'red'}} onClick={()=>{props.changeShowTab(1)}}>发现</NavItem>
         <NavItem className='left' style={{color: props.showTab===3 &&'red'}} onClick={()=>{props.changeShowTab(3)}}>消息</NavItem>
         <SearchWrapper>
          <CSSTransition
            in={focused}
            timeout={300}
            classNames='slide'
          >
            <NavSearch className={focused?'focused':''}
              onFocus={()=>changeFocusOn(list)}
              onBlur={changeFocusOff}
            />
          </CSSTransition>
          {/* <i className="iconfont zoom">&#xe6e4;</i> */}
          <i className={focused ? 'focused iconfont zoom': 'iconfont zoom'}>
                &#xe6e4;
              </i>
          {getListArea()}
        </SearchWrapper>
        </Nav>
  
        <Addition>
  
          <Link to='/write'>
              <Button className='writting'>
                <i className="iconfont">&#xe742;</i>
                写文章
              </Button>
            </Link>
           
            {
              !localStorage.getItem('token') && isLogin()
            }
            {
              localStorage.getItem('token') &&  
              <Dropdown overlay={menu} placement="bottomCenter">
                <div style={{float:'right',marginTop: '9px'}}>
                <Avatar src={memberInfo?.avatar}></Avatar>
                <DownCircleTwoTone color='red'/>
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
  // focused:state.get('header').get('focused'),
  // redux-immutable 的用法
  focused:state.getIn(['header','focused']),
  page:state.getIn(['header','page']),
  list:state.getIn(['header','list']),
  mouseIn:state.getIn(['header','mouseIn']),
  totalPage:state.getIn(['header','totalPage']),
  login:state.getIn(['login','login']),
})
const mapDispatchToProps = (dispatch) => ({
  changeFocusOn(list){
    list.size === 0 && dispatch(actionCreators.getListApi())
    // dispatch(actionCreators.getListApi())
    dispatch(actionCreators.getInputFocusOn(true))
  },
  changeFocusOff(){
    dispatch(actionCreators.getInputFocusOff(false))
  },
  handMouseIn(){
    dispatch(actionCreators.getMouseIn())
  },
  handMouseOut(){
    dispatch(actionCreators.getMouseOut())
  },
  changePage(page,totalPage,list){
    if(page<totalPage-1){
      dispatch(actionCreators.getPage(page+1))
    } else {
      dispatch(actionCreators.getPage(0))
    }
  },
  // loginOut(){
  //   dispatch(loginActionCreators.logout())
  // },
  loginIn(){
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
