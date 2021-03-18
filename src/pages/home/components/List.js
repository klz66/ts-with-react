/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-03-18 20:58:33
 */
import 'antd/dist/antd.css'
import { ListItem, ListInfo, LoadMore } from '../style';
import { connect } from "react-redux";
import http from '@/utils/request'
import {demoUrl} from '@/utils/utils';
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom';
import { Input,Button,notification  } from 'antd';
import  {  actionCreators  }  from "../store";
import  {  actionCreators as actionHomeCreators  }  from "../../home/store";
function List(props) {
  const { articlePage,articleList }= props
  const openNotificationWithIcon = type => {
    notification[type]({
      message: '发表成功',
      // description:
      //   'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
  };
  const handleDelete = async(id)=>{
    let res = await http.delete(`${demoUrl}/blogservice/blog-curd/${id}`);
    console.log(res);
    if(res.data.code === 20000) {
      openNotificationWithIcon('success')
      props.getArticleList()
    }
  }

  const goToDetail = async(id)=>{
    console.log(2020,id);
    props.history.push('/detail/' + id)

    // props.dispatch
  }

  return (
    <div>
      {
      articleList.map((item,index) => (
        // <Link key={index} to={'detail/'+item.get('id')}>
          <ListItem>
            <ListInfo>
              <img
                className='pic'
                src={item.get('imgUrl')}
                alt=''
              />
              <h3 className='title'>{item.get('title')}</h3>
              {/* <p className='desc'>{item.get('desc')}</p> */}
              <div className='desc' onClick={()=>goToDetail(item.get('id'))} dangerouslySetInnerHTML={{__html: item.get('desc')}}/>
            </ListInfo>
            <span onClick={()=>handleDelete(item.get('id'))}>删除</span>
          </ListItem>
          // </Link>
        ))
      }
      <LoadMore onClick={()=>{props.getMoreList(articlePage)}}>
        加载更多
      </LoadMore>
    </div>
  );
}
const mapStateToProps = (state) => ({
  articlePage:state.getIn(['home','articlePage']),
  articleList:state.getIn(['home','articleList']),
})
const mapDispatchToProps = (dispatch) => ({
  getMoreList(articlePage){
    dispatch(actionCreators.getMoreList(articlePage+1))
  },
  getArticleList(){
    dispatch(actionHomeCreators.getArticleList())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(List));
