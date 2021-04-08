/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-04-07 17:03:12
 */
import 'antd/dist/antd.css'
import { useState, useEffect } from 'react';
import { ListItem, ListInfo, LoadMore } from '../style';
import { HeartFilled } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import http from '@/utils/request'
import {demoUrl} from '@/utils/utils';
import './less/list.less'


function List(props) {
  let [current,setCurrent]=useState(1)
  let [articleList,setArticleList]=useState([])
  useEffect(() => {
    getArticleList(current,5)
  },[]);
  const goToDetail = async(id)=>{
    window.open('/detail/' + id)
  }

  const getMore = ()=>{
    setCurrent(current+1)
    getMoreList(current+1)
  }
  async function getArticleList(current,limit){
    let res = await http.get(`${demoUrl}/blogservice/blog-curd/pageBlogList/${current}/${limit}`);
    
    if(res.code === 20000) {
      let articleList = res.data.rows.map((i)=>(
        {
          'title': i.title,
          'desc': i.content,
          'id':i.id,
          'name':i.name,
          'zangNum':i.zangNum,
        }));
        setArticleList(articleList)
    }
  }
  async function getMoreList(current){
    let res = await http.get(`${demoUrl}/blogservice/blog-curd/pageBlogList/${current}/5`);
    
    if(res.code === 20000) {
      console.log(res.data.item);
      let list = res.data.rows.map((i)=>(
        {
          'title': i.title,
          'desc': i.content,
          'id':i.id,
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
        <div>
          <ListItem key={item.id}>
            <ListInfo>
            {formatImg(item.desc)!==null && <img
                className='pic'
                src={formatImg(item.desc)}
                alt=''
              />}
              <h3 className='title' onClick={()=>goToDetail(item.id)}>{item.title}</h3>
              {/* <p className='desc'>{item.get('desc')}</p> */}
              <div className='desc' dangerouslySetInnerHTML={{__html: formatContent(item.desc)}}/>
            </ListInfo>
            
          </ListItem>
          <div className='list'>
            
            {item.name}
            
            <div>
          <HeartFilled/>
            {item.zangNum}
          </div>
          </div>
          </div>
        ))
      }
      <LoadMore onClick={getMore}>
        加载更多
      </LoadMore>
    </div>
  );
}

export default withRouter(List);
