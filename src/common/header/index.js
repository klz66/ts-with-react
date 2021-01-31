/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-01-31 15:55:43
 */
/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-01-31 13:25:30
 */
/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-01-31 00:02:11
 */

import 'antd/dist/antd.css'
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
  const [state, setState] = useState(false)
  const handleFocus = () => {
    setState(true)
  }
  const handleBlur = () => {
    setState(false)
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
          in={state}
          timeout={300}
          classNames='slide'
        >
          <NavSearch className={state?'focused':''}
            onFocus={handleFocus}
            onBlur={handleBlur}
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
          写文章
        </Button>
      </Addition>
    </HeaderWrapper>
  );
}

export default Header;
