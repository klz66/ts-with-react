/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-04-07 10:53:44
 */

import 'antd/dist/antd.css'
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import  {  actionCreators  }  from "./store";
import { useEffect } from 'react';
function Detail(props) {
  console.log(props);
  const {getDetail}= props;
  useEffect(() => {
    console.log(props.match.params.id);
    getDetail(props.match.params.id);
  });
  return (
				<div dangerouslySetInnerHTML={{__html:props.content}}/>
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
