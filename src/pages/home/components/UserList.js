/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-04-13 16:53:24
 */
import 'antd/dist/antd.css'
import { useState, useEffect } from 'react';
import http from '@/utils/request'
import { withRouter } from 'react-router-dom'
import {demoUrl} from '@/utils/utils';
import { List, Avatar } from 'antd';
import { CheckOutlined,PlusOutlined } from '@ant-design/icons';

function UserList(props) {
  let memberInfo = JSON.parse(window.localStorage.getItem('memberInfo'))
  let [current,setCurrent] = useState(1)
  let [data,setData] = useState([])
  useEffect(() => {
    async function getRecommendList(){
      if(localStorage.getItem('token')){
        let res = await http.get(`${demoUrl}/blogservice/blog-member/pageMemberListWithToken/${memberInfo.id}/${current}/1`);
        let rows = res.data.rows.map(ele =>({
          ...ele,
          focus:false
        }))
        if(res.data.total+1 === current) {
          setCurrent(1)
        }
        setData(rows)
      } else {
        let res = await http.get(`${demoUrl}/blogservice/blog-member/pageMemberList/${current}/1`);
        let rows = res.data.rows.map(ele =>({
          ...ele,
          focus:false
        }))
        if(res.data.total+1 === current) {
          setCurrent(1)
        }
        setData(rows)
      }

    }
    getRecommendList();
  }, [current])
  async function handleFocus(by_id){
    if(!localStorage.getItem('token')){
      props.history.push( {pathname:'/login'});
      return
    }
    let id = memberInfo.id;
    if(id) {
      let params = {
        userBeFocusedId:by_id,
      }
      let res = await http.post(`${demoUrl}/blogservice/blog-focus/addFocus`,params) ;
      if(res.code === 20000) {
        let temp = data.map(function(ele){
          if(ele.id === by_id){
            ele.focus = !ele.focus;
          }
          return ele
        })
        setData(temp)
      }
    }

  }
  async function handleCancelFocus(by_id){
    let temp = data.map(function(ele){
      if(ele.id === by_id){
        ele.focus = false;
      }
      return ele
    })
    setData(temp)
    let id = memberInfo.id;
    if(id) {
      let params = {
        userBeFocusedId:by_id,
      }
      let res = await http.delete(`${demoUrl}/blogservice/blog-focus/deleteFocus`,params);
      console.log(res);
    } else {
      props.history.push('/login');
    }

  }
  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between'}}><span>推荐作者</span><span style={{cursor:'pointer'}} onClick={()=>{setCurrent(current+1)}}>换一批</span></div>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <div style={{display:'flex'}}>
              <Avatar size={56} src={item.avatar} onClick={()=>{window.open('/personal/' + item.id)}}/>
              <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',marginLeft:'10px'}}>
                <div> {item.nickname}</div>
                <div style={{fontSize:'12px',color:'#969696'}}>于{item.gmtCreate.slice(0,10)}加入&nbsp;&nbsp;
                  发表了{item.blogNum}篇
                </div>
              </div>
              <div style={{position:'absolute',right:'0px',cursor:'pointer'}}>
                { !item.focus && <span style={{color:'green'}} onClick={()=>{handleFocus(item.id)}}><PlusOutlined />关注</span>}
                { item.focus && <span style={{color:'#999999'}} onClick={()=>{handleCancelFocus(item.id)}}><CheckOutlined />已关注{item.focus}</span>}  
              </div>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
}

export default withRouter(UserList);
