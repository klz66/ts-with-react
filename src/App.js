/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-02-28 17:01:08
 */
import 'antd/dist/antd.css'
import { BrowserRouter,Route } from "react-router-dom";
import Header from './common/header/index'
import Login from './pages/login'
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
        <BrowserRouter>
          <div>
          <Header />
          <Route path='/login' exact component={Login}></Route>
          <Route path='/' exact component={Home}></Route>
          <Route path='/detail/:id' exact component={Deatil}></Route>
          </div>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
