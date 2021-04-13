/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-04-13 14:32:57
 */
/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-04-12 10:36:39
 */
import 'antd/dist/antd.css'
import { useState, useEffect } from 'react';
import { HeartFilled,MessageFilled } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import http from '@/utils/request'
import collectPic from '@/statics/collect.png'
import {demoUrl} from '@/utils/utils';
import './less/collection.less'


function Collection(props) {
  let [articleList,setArticleList]=useState([])
  useEffect(() => {
    getArticleList()
  },[]);
  const goToDetail = async(id)=>{
    window.open('/detail/' + id)
  }

  async function getArticleList(){
    let res = await http.get(`${demoUrl}/blogservice/blog-curd/pageBlogList/collected`);
    
    if(res.code === 20000) {
      let articleList = res.data.rows?.map((i,index)=>(
        {
          'title': i?.title,
          'desc': i.content,
          'id':i.id,
          'name':i.name,
          'zangNum':i.zangNum,
          'commentNums':res.data.commentNums[index]
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
    <div className='content'>
      <img src={collectPic} alt="avatar" style={{ width: '100%' }} />
      {
      articleList.map((item,index) => (
        <div>
          <div className='listItem' key={item.id}>
            <div className='listInfo'>
            {formatImg(item.desc)!==null && <img
                className='pic'
                src={formatImg(item.desc)}
                alt=''
              />}
              <h3 className='title' onClick={()=>goToDetail(item.id)}>{item.title}</h3>
              <div className='desc' dangerouslySetInnerHTML={{__html: formatContent(item.desc)}}/>
            </div>
            
          </div>
          <div className='bottom'>
            
            {item.name}
            
            <div>
              <HeartFilled/>
              {item.zangNum}
            </div>
            <div>
              <MessageFilled/>
              {item.commentNums}
            </div>
          </div>
          </div>
        ))
      }
    </div>
  );
}

export default withRouter(Collection);
