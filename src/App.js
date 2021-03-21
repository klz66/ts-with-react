/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-03-21 20:45:36
 */
import 'antd/dist/antd.css'
import { BrowserRouter,Route } from "react-router-dom";
import Login from './pages/login'
import Home from './pages/home'
import Write from './pages/write'
import Trash from './pages/trash'
// import Deatil from './pages/detail'
import Detail from './pages/detail/loadable.js';
import { GlobalIconStyled } from './statics/iconfont/iconfont';
import { GlobalStyled } from './style.js';
import { Provider } from 'react-redux';
import Avatar from '@/utils/upload'
import store from "./store";

function App(props) {
  return (
    <div>
      <GlobalIconStyled />
      <GlobalStyled />
      <Provider store={store}>
        <BrowserRouter>
          <div>
          <Route path='/login' exact component={Login}></Route>
          <Route path='/' exact component={Home}></Route> 
          <Route path='/write' exact component={Write}></Route> 
          <Route path='/avatar' exact component={Avatar}></Route> 
          <Route path='/trash' exact component={Trash}></Route> 
          <Route path='/detail/:id' exact component={Detail}></Route>
          </div>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
