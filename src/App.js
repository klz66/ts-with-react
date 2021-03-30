/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-03-31 00:03:13
 */
import 'antd/dist/antd.css'
import { BrowserRouter,Route } from "react-router-dom";
import Login from './pages/login'
import Home from './pages/home'
import Write from './pages/write'
import Recycle from './pages/trash'
import Setting from './pages/setting'
import TrashDetail from './pages/detail/trashIndex'
import Detail from './pages/detail/loadable.js';
import { GlobalIconStyled } from './statics/iconfont/iconfont';
import { GlobalStyled } from './style.js';
import { Provider } from 'react-redux';
import Avatar from '@/utils/upload'
import store from "./store";
import {useEffect} from 'react'

function App(props) {
  useEffect(()=>{
    console.log(2020);
    console.log(window.localStorage.getItem('token'));
  },[])
  return (
    <div>
      <GlobalIconStyled />
      <GlobalStyled />
      <Provider store={store}>
        
        <BrowserRouter>
          <div>
          <Route path='/login' exact component={Login}></Route>
          <Route path='/' exact component={Home}></Route> 
          {localStorage.getItem('token') &&<Route path='/write' exact component={Write}></Route>}
          <Route path='/avatar' exact component={Avatar}></Route> 
          <Route path='/setting' exact component={Setting}></Route> 
          {localStorage.getItem('token') &&<Route path='/recycle' exact component={Recycle}></Route>}
          {localStorage.getItem('token') &&<Route path='/detail/:id' exact component={Detail}></Route>}
          {localStorage.getItem('token') &&<Route path='/TrashDetail/:id' exact component={TrashDetail}></Route>}
          </div>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
