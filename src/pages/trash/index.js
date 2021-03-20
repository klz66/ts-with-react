/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-03-20 12:24:15
 */
/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-03-19 17:13:19
 */
import 'antd/dist/antd.css'
import { useState, useEffect } from 'react';
import { ListItem, ListInfo } from './style';
import { connect } from "react-redux";
import http from '@/utils/request'
import {demoUrl} from '@/utils/utils';
import { withRouter } from 'react-router-dom';
import { notification  } from 'antd';
function List(props) {
  let [articleList,setArticleList] = useState([])
  useEffect(() => {
    getArticleList()
  }, []);
  const openNotificationWithIcon = type => {
    notification[type]({
      message: '删除成功',
       description:'永久删除成功'
    });
  };
  const handleDelete = async(id)=>{
    let res = await http.delete(`${demoUrl}/blogservice/blog-curd/delete/forever/${id}`);
    console.log(res);
    if(res.data.code === 20000) {
      openNotificationWithIcon('success')
      getArticleList()
    }
  }
  const getArticleList = async()=>{
    let res = await http.get(`${demoUrl}/blogservice/blog-curd/findTrashList`);
    console.log(res);
    if(res.code === 20000) {
      let articleList = res.data.item.map((i)=>(
        {
          'title': i.name+'发表的文章',
          'desc': i.content,
          'id':i.id,
          // 'imgUrl':'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2084631030,3185655172&fm=26&gp=0.jpg'
        }));
      setArticleList(articleList)
      // console.log();
    }
    console.log(articleList);
  }


  return (
    <div>
      <h1>回收站</h1>
      {
      articleList.map((item,index) => (
          <ListItem>
            <ListInfo>
              <h3 className='title'>{item.title}</h3>
              <div className='desc' dangerouslySetInnerHTML={{__html: item.desc}}/>
            </ListInfo>
            <span onClick={()=>handleDelete(item.id)}>永久删除</span>
          </ListItem>
        ))
      }
    </div>
  );
}
const mapStateToProps = (state) => ({
})
const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(List));
