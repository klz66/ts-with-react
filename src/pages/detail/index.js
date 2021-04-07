/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-04-07 10:54:16
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
import { useEffect } from 'react';
function Detail(props) {
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
    dispatch(actionCreators.getDetail(id))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Detail));
