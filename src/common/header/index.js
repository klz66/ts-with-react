/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-01-31 17:04:20
 */

import 'antd/dist/antd.css'
import { connect } from "react-redux";
import { getInputFocusOn,getInputFocusOff } from "../../store/actionCreators";
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
          in={props.focused}
          timeout={300}
          classNames='slide'
        >
          <NavSearch className={props.focused?'focused':''}
            onFocus={props.changeFocusOn}
            onBlur={props.changeFocusOff}
          />
        </CSSTransition>
        <i className="iconfont zoom">&#xe6e4;</i>
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
  focused:state.header.focused,
})
const mapDispatchToProps = (dispatch) => ({
  changeFocusOn(){
    const action = getInputFocusOn(true);
    dispatch(action)
  },
  changeFocusOff(){
    const action = getInputFocusOff(false);
    dispatch(action)
  },
})


export default connect(mapStateToProps, mapDispatchToProps)(Header);
