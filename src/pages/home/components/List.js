/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-02-28 15:03:49
 */
import 'antd/dist/antd.css'
import { ListItem, ListInfo, LoadMore } from '../style';
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import  {  actionCreators  }  from "../store";
function List(props) {
  const { articlePage,articleList }= props

  return (
    <div>
      {
      articleList.map((item,index) => (
        <Link key={index} to={'detail/'+item.get('id')}>
          <ListItem>
            <ListInfo>
              <img
                className='pic'
                src={item.get('imgUrl')}
                alt=''
              />
              <h3 className='title'>{item.get('title')}</h3>
              <p className='desc'>{item.get('desc')}</p>
            </ListInfo>
          </ListItem>
          </Link>
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
})

export default connect(mapStateToProps, mapDispatchToProps)(List);
