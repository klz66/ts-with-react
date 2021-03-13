/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-03-13 16:27:23
 */
import 'antd/dist/antd.css'
import { connect } from "react-redux";
import  {  actionCreators  }  from "./store";
import Topic from './components/Topic'
import List from './components/List'
import Recommend from './components/Recommend'
import Write from './components/Write'
import {url} from '@/utils/utils'
import { 
	HomeWrapper,
	HomeLeft,
	HomeRight,
  BackTop
} from './style';
import homePic from '../../statics/home-pic.jpg';
import { useEffect } from 'react';
function Home(props) {
  const { showScroll,changeHomeData } = props
  console.log(url,202020);
  useEffect(() => {
    changeHomeData();
    bindEvents();
  });
  useEffect(() => {
    return () => {
      window.removeEventListener('scroll',()=>props.changeShowScroll(showScroll))
    }
})
  const handScrollTop = () =>{
    window.scrollTo(0,0)
  }
  const bindEvents = () =>{
    window.addEventListener('scroll',()=>props.changeShowScroll(showScroll))
  }
  return (
    <HomeWrapper>
      <HomeLeft>
        <img
          className='banner-img'
          src={homePic}
          alt=''
        />
        
        <Topic />
        <List />
      </HomeLeft>
      <HomeRight>
        <Recommend />
        <Write />
      </HomeRight>
      {
        props.showScroll && (
        <BackTop onClick={()=>{handScrollTop()}}>
          回到顶部
        </BackTop>
        )
      }

    </HomeWrapper>
  );
}

const mapStateToProps = (state) => ({
  // focused:state.get('header').get('focused'),
  // redux-immutable 的用法
  showScroll:state.getIn(['home','showScroll']),
})
const mapDispatchToProps = (dispatch) => ({
  changeHomeData(){
    dispatch(actionCreators.getHomeInfo())
  },
  changeShowScroll(){
    if(document.documentElement.scrollTop>100){
      dispatch(actionCreators.toggleTopShow(true))
    } else {
      dispatch(actionCreators.toggleTopShow(false))
    }
  }
})



export default connect(mapStateToProps, mapDispatchToProps)(Home);
