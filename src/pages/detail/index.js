/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-02-28 14:51:33
 */
/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-02-18 10:32:30
 */
import 'antd/dist/antd.css'
import { connect } from "react-redux";
import  {  actionCreators  }  from "./store";
import { DetailWrapper, Header, Content } from './style';
import { useEffect } from 'react';
function Detail(props) {
  console.log(props);
  const {getDetail}= props;
  useEffect(() => {
    getDetail();
  });
  return (
    <DetailWrapper>
				<Header>{props.title}</Header>
				<Content dangerouslySetInnerHTML={{__html:props.content}}/>
			</DetailWrapper>
  );
}
const mapStateToProps = (state) => ({
  title:state.getIn(['detail','title']),
  content:state.getIn(['detail','content']),
})
const mapDispatchToProps = (dispatch) => ({
  getDetail(){
    dispatch(actionCreators.getDetail())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
