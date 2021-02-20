/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-02-20 17:09:19
 */
import 'antd/dist/antd.css'
import { connect } from 'react-redux';
import { RecommendWrapper, RecommendItem } from '../style';
function Recommend(props) {
  return (
    <div>
     	<RecommendWrapper>
				{
					props.list.map((item) => {
						return <RecommendItem color={item.get('color')} key={item.get('id')}>
              <div className='title'>
                {item.get('title')}
                <i className="iconfont">&#xe637;</i>
              </div>
            </RecommendItem>
					})
				}
			</RecommendWrapper>
    </div>
  );
}
const mapStateToProps = (state) => ({
	list: state.getIn(['home', 'recommendList'])
})

export default connect(mapStateToProps, null)(Recommend);
