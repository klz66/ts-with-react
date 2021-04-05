/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-04-06 01:22:23
 */
import 'antd/dist/antd.css'
import { useState, useEffect } from 'react';
import { ListItem, ListInfo } from '@/pages/home/style';
import { HeartFilled } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import http from '@/utils/request'
import {demoUrl} from '@/utils/utils';
import './less/list.less'
function List(props) {
  let [current,setCurrent]=useState(1)
  let [articleList,setArticleList]=useState([])
  useEffect(() => {
    console.log(props);
    getArticleList(props.authorId)
  },[]);
  const goToDetail = async(id)=>{
    window.open('/detail/' + id)
  }

  async function getArticleList(id){
    let res = await http.get(`${demoUrl}/blogservice/blog-curd/pagePersonalBlogList/${id}`);
    
    if(res.code === 20000) {
      let articleList = res.data.list.map((i)=>(
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
              <h3 className='title'>{item.title}</h3>
              {/* <p className='desc'>{item.get('desc')}</p> */}
              <div className='desc' onClick={()=>goToDetail(item.id)} dangerouslySetInnerHTML={{__html: formatContent(item.desc)}}/>
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
    </div>
  );
}

export default withRouter(List);
