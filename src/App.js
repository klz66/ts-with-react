/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-04-12 15:11:40
 */
import 'antd/dist/antd.css'
import { BrowserRouter,Route } from "react-router-dom";
import Login from './pages/login'
import Home from './pages/home'
import Write from './pages/write'
import Edit from './pages/write/edit'
import Personal from './pages/personal'
import TrashDetail from './pages/detail/trashIndex'
import Detail from './pages/detail/loadable.js';
import { GlobalIconStyled } from './statics/iconfont/iconfont';
import { GlobalStyled } from './style.js';
import Avatar from '@/utils/upload'
import store from "./store";
import {useEffect} from 'react'
import { Provider } from 'react-redux';

function App(props) {
  useEffect(()=>{
    console.log(2020);
    console.log(window.localStorage.getItem('token'));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[localStorage.getItem('token')])
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
          {localStorage.getItem('token') &&<Route path='/edit' exact component={Edit}></Route>}
          <Route path='/avatar' exact component={Avatar}></Route>
          <Route path='/personal/:id' exact component={Personal}></Route> 
          <Route path='/detail/:id' exact component={Detail}></Route>
          {localStorage.getItem('token') &&<Route path='/TrashDetail/:id' exact component={TrashDetail}></Route>}
          </div>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
