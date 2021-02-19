/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-02-18 13:46:09
 */
import 'antd/dist/antd.css'
import { connect } from "react-redux";
import Topic from './components/Topic'
import List from './components/List'
import Recommend from './components/Recommend'
import Write from './components/Write'
import { 
	HomeWrapper,
	HomeLeft,
	HomeRight
} from './style';
import homePic from '../../statics/home-pic.jpg';
function Home(props) {
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
    </HomeWrapper>
  );
}

const mapStateToProps = (state) => ({
  // focused:state.get('header').get('focused'),
  // redux-immutable 的用法
  focused:state.getIn(['header','focused']),
  page:state.getIn(['header','page']),
  list:state.getIn(['header','list']),
  mouseIn:state.getIn(['header','mouseIn']),
  totalPage:state.getIn(['header','totalPage']),
})
const mapDispatchToProps = (dispatch) => ({
  
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
