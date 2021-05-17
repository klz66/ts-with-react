/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-05-15 18:54:55
 */
import 'antd/dist/antd.css'
import {useState } from 'react'
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

export default Home;
