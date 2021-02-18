/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-02-18 10:35:27
 */
import 'antd/dist/antd.css'
import { BrowserRouter,Route } from "react-router-dom";
import Header from './common/header/index'
import Home from './pages/home'
import Deatil from './pages/detail'
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
        <div>
        <Header />
        <BrowserRouter>
          <div>
          <Route path='/' exact component={Home}></Route>
          <Route path='/detail' exact component={Deatil}></Route>
          </div>
        </BrowserRouter>
        </div>
      </Provider>
    </div>
  );
}

export default App;
