/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-04-18 15:41:17
 */
import 'antd/dist/antd.css'
import moment from 'moment';
import { useState, useEffect } from 'react';
import { ListItem, ListInfo } from '@/pages/home/style';
import { LikeFilled ,MessageFilled} from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import http from '@/utils/request'
import {demoUrl} from '@/utils/utils';
import './less/list.less'
function List(props) {
  let [current,setCurrent]=useState(1)
  let [moreText,setMoreText]=useState(true)
  let [articleList,setArticleList]=useState([])
  useEffect(() => {
    console.log(props);
    getArticleList(props.authorId)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[props]);
  const goToDetail = async(id)=>{
    window.open('/detail/' + id)
  }
  const getMore = ()=>{
    setCurrent(current+1)
    getMoreList(current+1)
  }

  async function getArticleList(id){
    let res = await http.get(`${demoUrl}/blogservice/blog-curd/pagePersonalBlogList/${id}/${current}/3`);
    
    if(res.code === 20000) {
      if(res.data.list.length === 0) {
        setMoreText(false)
      }
      let articleList = res.data.list.map((i,index)=>(
        {
          'title': i.title,
          'desc': i.content,
          'id':i.id,
          'name':i.name,
          'zangNum':i.zangNum,
          'gmtCreate':i.gmtCreate,
          'commentNums':res.data.commentNums[index]
        }));
        setArticleList(articleList)
    }
  }
  async function getMoreList(current){
    let res = await http.get(`${demoUrl}/blogservice/blog-curd/pagePersonalBlogList/${props.match.params.id}/${current}/3`);
    
    if(res.code === 20000) {
      if(res.data.list.length === 0) {
        setMoreText(false)
      }
      let list = res.data.list.map((i,index)=>(
        {
          'title': i.title,
          'desc': i.content,
          'id':i.id,
          'name':i.name,
          'zangNum':i.zangNum,
          'commentNums':res.data.commentNums[index]
           }));
      setArticleList([...articleList,...list])
    }
  }
  function formatImg(content) {
    // var str = "this is test string <img src=\"http:baidu.com/test.jpg\" width='50' > 1 and the end <img src=\"所有地址也能匹配.jpg\" /> 33! <img src=\"/uploads/attached/image/20120426/20120426225658_92565.png\" alt=\"\" />"
    var imgReg = /<img.*?(?:>|\/>)/gi;
    var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
    var arr = content.match(imgReg);  // arr 为包含所有img标签的数组
    
    if(arr!==null){
        var src = arr[0].match(srcReg);
        console.log(src);
        return src[1];
        //获取图片地址
    } else {
      return null
    }
  }
  function formatContent(content) {
    let reg =/<img.*?src=[\"|\']?(.*?)[\"|\']?\s.*?>/i;
    return content.replace(reg, '')
  }
  return (
    <div>
      {
      articleList.map((item,index) => (
        // <Link key={index} to={'detail/'+item.get('id')}>
        <div key={item.id}>
          <ListItem >
            <ListInfo>
            {formatImg(item.desc)!==null && <img
                className='pic'
                src={formatImg(item.desc)}
                alt=''
              />}
              <h3 className='title' onClick={()=>goToDetail(item.id)}>{item.title}</h3>
              <div className='desc' dangerouslySetInnerHTML={{__html: formatContent(item.desc)}}/>
            </ListInfo>
            
          </ListItem>
          <div className='list'>
            
            {item.name}
            
            <div>
              <LikeFilled/>
              {item.zangNum}
            </div>
            <div>
              <MessageFilled/>
              {item.commentNums}
            </div>
            <div>
            {moment(item.gmtCreate).fromNow()}
            </div>
          </div>
          </div>
        ))
      }
      {
        moreText &&       <div onClick={getMore} className='getmore-bottom' style={{color:'#fff'}}>
        <span>加载更多</span>
      </div>
      }
      {
        !moreText &&       <div className='getmore-bottom' style={{color:'#fff'}}>
        <span>已加载完毕</span>
      </div>
      }
    </div>
  );
}

export default withRouter(List);
