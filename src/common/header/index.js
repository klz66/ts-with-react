/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-03-22 23:58:09
 */

import 'antd/dist/antd.css'
import { connect } from "react-redux";
import  {  actionCreators  }  from "./store";
import { Link } from 'react-router-dom'
import { CSSTransition } from "react-transition-group";
import { actionCreators as loginActionCreators } from '../../pages/login/store'
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
  console.log(props);
  const {login,page,totalPage,focused,mouseIn,list,changeFocusOn,changeFocusOff,handMouseIn,handMouseOut,changePage}=props;
  const getListArea = () => {
    if(focused || mouseIn) {
      let newList = [];
      // let pageList = []
      let jsList = list.toJS();
      // 这里的3,是每页三个
      let RightIndex = Math.min(((page+1)*3),jsList.length);
      for(let i=(page*3);i<RightIndex;i++){
        newList.push(jsList[i])
        // pageList.push(
        //   <SearchInfoItem key={jsList[i]}>{jsList[i]}</SearchInfoItem>
        // )
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
  const ifLogin = () => {
    return (
      <HeaderWrapper>
        <Link to='/'>
          <Logo/>
        </Link>
        <Nav>
         <NavItem className='left'>首页</NavItem>
         <NavItem className='left'>发现</NavItem>
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
            <Button className='reg'>注册</Button>
            {
              login?<NavItem className='right' onClick={()=>props.loginOut()}>退出</NavItem>:<NavItem onClick={()=>props.loginIn()} className='right'>登录</NavItem>
            }
        </Addition>
      </HeaderWrapper>
    );
  }
  return (
    <div>
      {ifLogin()}
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
    console.log(list);
    if(page<totalPage-1){
      dispatch(actionCreators.getPage(page+1))
    } else {
      dispatch(actionCreators.getPage(0))
    }
  },
  loginOut(){
    dispatch(loginActionCreators.logout())
  },
  loginIn(){
    dispatch(loginActionCreators.login())
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(Header);
