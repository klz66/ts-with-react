/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-03-18 21:05:53
 */
/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-02-18 10:32:30
 */
import 'antd/dist/antd.css'
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import  {  actionCreators  }  from "./store";
import { DetailWrapper, Header, Content } from './style';
import { useEffect } from 'react';
function Detail(props) {
  console.log(props);
  const {getDetail}= props;
  useEffect(() => {
    console.log(props.match.params.id);
    getDetail(props.match.params.id);
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
  getDetail(id){
    dispatch(actionCreators.getDetail(id))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Detail));
