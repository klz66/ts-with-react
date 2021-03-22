/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-03-22 09:57:17
 */

import 'antd/dist/antd.css'
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import  {  actionCreators  }  from "./store";
import { DetailWrapper, Header } from './style';
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
				<div dangerouslySetInnerHTML={{__html:props.content}}/>
			</DetailWrapper>
  );
}
const mapStateToProps = (state) => ({
  title:state.getIn(['detail','title']),
  content:state.getIn(['detail','content']),
})
const mapDispatchToProps = (dispatch) => ({
  getDetail(id){
    dispatch(actionCreators.getTrashDetail(id))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Detail));
