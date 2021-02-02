/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-02-02 22:57:12
 */

import 'antd/dist/antd.css'
import { connect } from "react-redux";
import  {  actionCreators  }  from "./store";

import { CSSTransition } from "react-transition-group";
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
 
import React, { useState, useEffect } from 'react';
function Header(props) {
  console.log(props);
  const {focused,list,changeFocusOn,changeFocusOff}=props;
  const getListArea = () => {
    if(focused) {
      return (
        <SearchInfo>
        <SearchInfoTitle>
          热门搜索
          <SearchInfoSwitch 
          >
            换一批
          </SearchInfoSwitch>
        </SearchInfoTitle>
        <SearchInfoList>
          {list.map(item => {
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
  return (
    <HeaderWrapper>
      <Logo/>
      <Nav>
       <NavItem className='left'>首页</NavItem>
       <NavItem className='left'>下载</NavItem>
       <NavItem className='right'>登录</NavItem>
       <NavItem className='right'>
         <i className="iconfont">&#xe636;</i>
       </NavItem>
       <SearchWrapper>
        <CSSTransition
          in={focused}
          timeout={300}
          classNames='slide'
        >
          <NavSearch className={focused?'focused':''}
            onFocus={changeFocusOn}
            onBlur={changeFocusOff}
          />
        </CSSTransition>
        <i className="iconfont zoom">&#xe6e4;</i>
        {getListArea()}
      </SearchWrapper>
      </Nav>

      <Addition>
        <Button className='reg'>
          注册
        </Button>
        <Button className='writting'>
        <i className="iconfont zoom">&#xe742;</i>
          写文章
        </Button>
      </Addition>
    </HeaderWrapper>
  );
}

const mapStateToProps = (state) => ({
  // focused:state.get('header').get('focused'),
  // redux-immutable 的用法
  focused:state.getIn(['header','focused']),
  list:state.getIn(['header','list'])
})
const mapDispatchToProps = (dispatch) => ({
  changeFocusOn(){
    dispatch(actionCreators.getListApi())
    dispatch(actionCreators.getInputFocusOn(true))
  },
  changeFocusOff(){
    dispatch(actionCreators.getInputFocusOff(false))
  },
})


export default connect(mapStateToProps, mapDispatchToProps)(Header);
