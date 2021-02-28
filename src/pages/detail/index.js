/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-02-27 11:34:31
 */
/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-02-18 10:32:30
 */
import 'antd/dist/antd.css'
import { connect } from "react-redux";
import { DetailWrapper, Header, Content } from './style';
function Detail(props) {
  console.log(props);
  return (
    <DetailWrapper>
				<Header>艾迪康才能覅就是v你</Header>
				<Content dangerouslySetInnerHTML={{__html:props.content}}/>
			</DetailWrapper>
  );
}
const mapStateToProps = (state) => ({
  title:state.getIn(['detail','title']),
  content:state.getIn(['detail','content']),
})
const mapDispatchToProps = (dispatch) => ({
  changeHomeData(){
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
