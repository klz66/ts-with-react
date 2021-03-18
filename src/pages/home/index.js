/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-03-18 20:43:53
 */
import 'antd/dist/antd.css'
import { connect } from "react-redux";
import  {  actionCreators  }  from "./store";
import Topic from './components/Topic'
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
  const { changeHomeData,getArticleList } = props
  useEffect(() => {
    changeHomeData();
    getArticleList();
  });
  return (
    <div>
      <Header/>
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

    </HomeWrapper>
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
    dispatch(actionCreators.getArticleList())
  },
})



export default connect(mapStateToProps, mapDispatchToProps)(Home);
