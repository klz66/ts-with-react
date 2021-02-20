/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-02-20 11:40:16
 */
import 'antd/dist/antd.css'
import { connect } from "react-redux";
// import logoPic from '../../../statics/logo.png';
import { 
	TopicWrapper,
  TopicItem
} from '../style';
function Topic(props) {
  const { list } = props;
  return (
    <div>
     <TopicWrapper>
       {
				list.map((item) => (
						<TopicItem key={item.get('id')}>
							<img
								className='topic-pic'
								src={item.get('imgUrl')}
								alt=''
							/>
							{item.get('title')}
						</TopicItem>
					))
			  }
     </TopicWrapper>
    </div>
  );
}
const mapStateToProps = (state) => ({
  // focused:state.get('header').get('focused'),
  // redux-immutable 的用法
  list:state.getIn(['home','topicList']),
})
export default connect(mapStateToProps, null)(Topic);
