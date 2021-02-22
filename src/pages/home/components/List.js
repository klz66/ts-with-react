/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-02-21 10:23:51
 */
import 'antd/dist/antd.css'
import { ListItem, ListInfo, LoadMore } from '../style';
import { connect } from "react-redux";
function List(props) {
  const { articleList }= props

  return (
    <div>
            {
				articleList.map((item) => (
            <ListItem key={item.get('id')}>
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
					))
			  }
    </div>
    // <ListItem>
    //   <ListInfo>

    //     <img className='pic' src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3183234132,536203321&fm=26&gp=0.jpg" />
    //     <h3 className='title'>2222</h3>
    //     <p className='desc'>2222</p>
    //   </ListInfo>
    // </ListItem>
  );
}
const mapStateToProps = (state) => ({
  // focused:state.get('header').get('focused'),
  // redux-immutable 的用法
  articleList:state.getIn(['home','articleList']),
})
export default connect(mapStateToProps, null)(List);
