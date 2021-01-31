/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-01-31 14:52:10
 */
/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-01-31 00:02:11
 */

import 'antd/dist/antd.css'
import Header from './common/header/index'
import {GlobalIconStyled} from './statics/iconfont/iconfont';
import {GlobalStyled} from './style.js';

function App(props) {
  return (
    <div>
      <GlobalIconStyled />
      <GlobalStyled />
      <div>
      <Header />
      </div>
    </div>
  );
}

export default App;
