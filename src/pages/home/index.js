/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-04-12 21:01:44
 */
import 'antd/dist/antd.css'
import {useState,useEffect } from 'react'
import { connect } from "react-redux";
import  {  actionCreators  }  from "./store";
import FocusIndex from './focusIndex'
import MessageIndex from './messageIndex'
import List from './components/List'
import Recommend from './components/Recommend'
import UserList from './components/UserList'
import Header from '@/common/header'
import Setting from '@/pages/setting'
import Collection from './components/Collection'
import ManageBlog from './components/ManageBlog'
import Recycle from './components/Recycle'
import { 
	HomeWrapper,
	HomeLeft,
	HomeRight,
} from './style';
function Home(props) {
  // 1 发现  2 关注  3消息
  let [showTab,setShowTab] = useState(1)
  const { changeHomeData } = props
  useEffect(() => {
    // if(!localStorage.getItem('token')){
      
    // }
    // if(props.location.state.showTab === 6){
    //   setShowTab(props.location.state.showTab)
    // }
    
    // console.log(props.location.state.showTab ===6);
    changeHomeData();
  });
  function changeShowTab(showTab) {
    setShowTab(showTab)
  }
  function showLook() {
    return (
      <HomeWrapper>
      <HomeLeft>
        <List />
      </HomeLeft>
      <HomeRight>
        <Recommend />
        <UserList />
      </HomeRight>

    </HomeWrapper>
    
    )
  }

  return (
    <div>
      <Header changeShowTab={changeShowTab} showTab={showTab} />
      {showTab === 1 && showLook()}
      {showTab === 2 && <FocusIndex/>}
      {showTab === 3 && <MessageIndex/>}
      {showTab === 4 && <Setting/>}
      {showTab === 5 && <Collection/>}
      {showTab === 6 && <ManageBlog/>}
      {showTab === 7 && <Recycle/>}
      </div>
  );
}

const mapStateToProps = (state) => ({
  // focused:state.get('header').get('focused'),
  // redux-immutable 的用法
})
const mapDispatchToProps = (dispatch) => ({
  changeHomeData(){
    dispatch(actionCreators.getHomeInfo())
  },
  getArticleList(){
    dispatch(actionCreators.getArticleList(1,5))
  },
})



export default connect(mapStateToProps, mapDispatchToProps)(Home);
