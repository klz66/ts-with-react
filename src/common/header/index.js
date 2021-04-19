/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-04-19 12:16:31
 */

import 'antd/dist/antd.css'
import http from '@/utils/request'
import {demoUrl} from '@/utils/utils';
import React, {  useEffect,useState } from 'react';
import { connect } from "react-redux";
import  {  actionCreators  }  from "./store";
import { Link,withRouter } from 'react-router-dom'
import { CSSTransition } from "react-transition-group";
import {CloseOutlined} from '@ant-design/icons';

import { Menu, Dropdown, Avatar,List } from 'antd';
import { FolderOpenOutlined,CaretDownFilled ,SettingOutlined,UserOutlined,HeartOutlined,InteractionOutlined ,PoweroffOutlined} from '@ant-design/icons';
import {
	HeaderWrapper,
	Logo,
	Nav,
	NavItem,
	SearchWrapper,
  SearchInfo,
	NavSearch,
	Addition,
	Button
} from './style';
 
function Header(props) {

  const [keyValue, setKeyValue] = useState('');
  const [searchList, setSearchList] = useState([]);
  let memberInfo= JSON.parse(window.localStorage.getItem('memberInfo'))
  const {focused,changeFocusOn,changeFocusOff,mouseIn, handleMouseEnter, handleMouseLeave}=props;

  useEffect(() => {
    getSearchList();
  },[]);


  async function getSearchList() {
    let res = await http.get(`${demoUrl}/blogservice/blog-search/searchList`);
    if(res.code === 20000) {
      setSearchList(res.data.list.map(i=>({
        id: i.id,
        keyValue: i.keyValue
      })))
    }
  }
   
  const handleOut = () =>{
    window.location.href='login'
  }
  const menu = (
    <Menu>
      <Menu.Item>
      <span onClick={()=>{window.open('/personal/' + memberInfo.id)}}>
        <UserOutlined/>
          个人主页
        </span>
      </Menu.Item>
      <Menu.Item>
        <span onClick={()=>{props.changeShowTab(4)}}>
          <SettingOutlined />
          个人信息
        </span>
      </Menu.Item>
      <Menu.Item>
        <span onClick={()=>{props.changeShowTab(5)}}>
        <HeartOutlined/>
          收藏文章
        </span>
      </Menu.Item>
      <Menu.Item>
        <span onClick={()=>{props.changeShowTab(6)}}>
        <FolderOpenOutlined/>
          管理博客
        </span>
      </Menu.Item>

      <Menu.Item onClick={()=>{props.changeShowTab(7)}}>
          <InteractionOutlined/>
          回收站
      </Menu.Item>
      <Menu.Item onClick={()=>{handleOut()}}>
        <span>
          <PoweroffOutlined/>
          退出
        </span>
      </Menu.Item>
    </Menu>
  );
  const toRegister = () => {
    props.history.push( {pathname:'/login',state:{login:false}});
  }
  const handWrite = () => {
    if(localStorage.getItem('token')){
      window.open('/write')
    } else {
      props.history.push('/login');
    }
    
  }
  const toLogin = () => {
    props.history.push( {pathname:'/login',state:{login:true}});
  }
  const isLogin = ()=>{
    return (
      <>
       <Button onClick={()=>toRegister()} className='reg'>注册</Button>
        <NavItem onClick={()=>toLogin()} className='right'>登录</NavItem>
      </>   
    )
  }
  async function handleKeySearch (e){
    if(e.keyCode === 13) {
      if(keyValue.trim() === ''){
        return; 
      }
      let params =  {
        keyValue:keyValue.trim()
      }
      await http.post(`${demoUrl}/blogservice/blog-search/addSearch`,params);
      props.history.push( {pathname:'/search/'+keyValue.trim()});
      getSearchList();
    }
  }
  async function handleSearch (){
    if(keyValue.trim() === ''){
      return; 
    }
    else {
      let params =  {
        keyValue:keyValue.trim()
      }
      await http.post(`${demoUrl}/blogservice/blog-search/addSearch`,params);
      props.history.push( {pathname:'/search/'+keyValue.trim()});
      getSearchList();
    }
  }
  function handleClickSearch (e){
    props.history.push( {pathname:'/search/'+e});
    handleMouseLeave();
  }
  async function handleDeleteSearch (e){
    let res = await http.delete(`${demoUrl}/blogservice/blog-search/deleteSearch/${e}`);
    if(res.data.code === 20000) {
      getSearchList();
    }
  }
  const Header = () => {
    return (
      <HeaderWrapper>
        <Link to='/'>
          <Logo/>
        </Link>
        <Nav>
          {localStorage.getItem('token') && <NavItem className='left' style={{color: props.showTab===2 &&'red'}} onClick={()=>{props.changeShowTab(2)}}>关注</NavItem>}
          <NavItem className='left' style={{color: props.showTab===1 &&'red'}} onClick={()=>{props.changeShowTab(1)}}>发现</NavItem>
          {localStorage.getItem('token') && <NavItem className='left' style={{color: props.showTab===3 &&'red'}} onClick={()=>{props.changeShowTab(3)}}>消息</NavItem>}
         <SearchWrapper>
          <CSSTransition
            in={focused}
            timeout={300}
            classNames='slide'
          >
            <NavSearch className={focused?'focused':''}
              onFocus={()=>changeFocusOn()}
              onBlur={changeFocusOff}
              onKeyDown={(e)=>{handleKeySearch(e)}}
              onChange={(e)=>{setKeyValue(e.target.value)}}
              value={keyValue}
            />
 
          </CSSTransition>
          <i className={focused ? 'focused iconfont zoom': 'iconfont zoom'} onClick={()=>{handleSearch()}}>
                &#xe6e4;
              </i>
              {
          (focused || mouseIn) &&         <SearchInfo
          onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
          >
          <List
        itemLayout="horizontal"
        dataSource={searchList}
        renderItem={item => (
          <List.Item>
            <div style={{display:'flex',justifyContent:'space-between'}}>
             
                <div onClick={()=>{handleClickSearch(item.keyValue)}} style={{overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',width:'160px',cursor:'pointer'}}> {item.keyValue}</div>
                <div onClick={()=>{handleDeleteSearch(item.id)}} style={{position:'absolute',right:'0px',cursor:'pointer'}}>
<CloseOutlined />
                </div>
            </div>
          </List.Item>
        )}
      />
          </SearchInfo>
        }
        </SearchWrapper>

        </Nav>
  
        <Addition>
            <Button className='writting' onClick={handWrite}> 
              <i className="iconfont" style={{cursor:'pointer'}}>&#xe742;</i>
              写文章
            </Button>
            {
              !localStorage.getItem('token') && isLogin()
            }
            {
              localStorage.getItem('token') &&  
              <Dropdown overlay={menu} placement="bottomCenter">
                <div style={{float:'right',marginTop: '9px',marginRight:'10px'}}>
                <Avatar src={memberInfo?.avatar}></Avatar>
                <CaretDownFilled  color='red'/>
                </div>
              </Dropdown>
            }
           
        </Addition>
      </HeaderWrapper>
    );
  }
  return (
    <div>
      {Header()}
    </div>
  );
}

const mapStateToProps = (state) => ({
  mouseIn: state.getIn(['header', 'mouseIn']),
  focused:state.getIn(['header','focused']),
})
const mapDispatchToProps = (dispatch) => ({
  changeFocusOn(){
    dispatch(actionCreators.getInputFocusOn(true))
  },
  changeFocusOff(){
    dispatch(actionCreators.getInputFocusOff(false))
  },
  handleMouseEnter() {
    dispatch(actionCreators.mouseEnter());
  },
  handleMouseLeave() {
    dispatch(actionCreators.mouseLeave());
  },
})


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
