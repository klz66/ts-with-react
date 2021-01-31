/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-01-31 14:10:24
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
function header(props) {
  return (
    <HeaderWrapper>
      <Logo/>
      <Nav>
       <NavItem className='left'>首页</NavItem>
       <NavItem className='left'>下载</NavItem>
       <NavItem className='right'>登录</NavItem>
       <NavItem className='right'>注册</NavItem>
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

export default header;
