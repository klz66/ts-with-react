/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-01-31 16:12:35
 */
/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-01-31 00:02:11
 */

import 'antd/dist/antd.css'
import Header from './common/header/index'
import { GlobalIconStyled } from './statics/iconfont/iconfont';
import { GlobalStyled } from './style.js';
import { Provider } from 'react-redux';
import store from "./store";

function App(props) {
  return (
    <div>
      <GlobalIconStyled />
      <GlobalStyled />
      <Provider store={store}>
      <Header />
      </Provider>
    </div>
  );
}

export default App;
