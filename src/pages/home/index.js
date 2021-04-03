/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-04-03 18:10:10
 */
import 'antd/dist/antd.css'
import {useState,useEffect } from 'react'
import { connect } from "react-redux";
import  {  actionCreators  }  from "./store";
import FocusIndex from './focusIndex'
import MessageIndex from './messageIndex'
import Personal from './personal'
import List from './components/List'
import Recommend from './components/Recommend'
import Write from './components/Write'
import Header from '@/common/header'
import Setting from '@/pages/setting'
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
        <Write />
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
      {showTab === 5 && <Personal/>}
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
