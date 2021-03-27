/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-03-27 23:54:04
 */
import 'antd/dist/antd.css'
import {useState } from 'react'
import { connect } from "react-redux";
import  {  actionCreators  }  from "./store";
import Topic from './components/Topic'
import FocusIndex from './focusIndex'
import MessageIndex from './messageIndex'
import List from './components/List'
import Recommend from './components/Recommend'
import Write from './components/Write'
import Header from '@/common/header'
import { 
	HomeWrapper,
	HomeLeft,
	HomeRight,
} from './style';
import homePic from '../../statics/home-pic.jpg';
import { useEffect } from 'react';
function Home(props) {
  // 1 发现  2 关注  3消息
  let [showTab,setShowTab] = useState(1)
  const { changeHomeData } = props
  useEffect(() => {
    changeHomeData();
  });
  function changeShowTab(showTab) {
    setShowTab(showTab)
  }
  function showLook() {
    return (
      <HomeWrapper>
      <HomeLeft>
        <img
          className='banner-img'
          src={homePic}
          alt=''
        />
        
        {/* <Topic /> */}
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
    dispatch(actionCreators.getArticleList(1,3))
  },
})



export default connect(mapStateToProps, mapDispatchToProps)(Home);
