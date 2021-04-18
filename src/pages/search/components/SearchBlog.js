
import 'antd/dist/antd.css'
import moment from 'moment';
import { LikeFilled ,MessageFilled} from '@ant-design/icons';
import { useState, useEffect } from 'react';
import http from '@/utils/request'
import {demoUrl} from '@/utils/utils';
import { withRouter } from 'react-router-dom';
import { Table, Divider, Button,Avatar } from 'antd';
import 'moment/locale/zh-cn';
function List(props) {
  // let [keyValue,setKeyValue] = useState('')
  let [current,setCurrent] = useState(1)
  let [data,setData] = useState([])
  useEffect(() => {
    handleSearch()
  }, []);
  const goToDetail = async(id)=>{
    window.open('/detail/' + id)
  }
  async function handleSearch() {
    let params = {
      keyValue:props.match.params.keyValue,
      searchAuthorId:'',
      searchBlogId:'',
    }
    let res = await http.post(`${demoUrl}/blogservice/blog-admin/pageBlogList/search`,params);
    if(res.code === 20000) {
      let articleList = res.data.list.map((i,index)=>(
        {
          'key': i.id,
          'avatar':res.data.avatarList[index],
          'name': i.name,
          'title': i.title.slice(0,10),
          'desc': i.content.replace(/<[^>]+>|&[^>]+;/g,"").trim().slice(0,20),
          'detail': i.content,
          'id':i.id,
          'authorId': i.authorId,
          'gmtCreate':i.gmtCreate,
          'gmtModified':i.gmtModified,
          'collectedNum':i.collectedNum,
          'commentNums':res.data.commentNums[index],
          'zangNum':i.zangNum,
          }));
      setData(articleList)
    }
  }
  const pagination = ()=>({
    current: current,
    pageSize: 5,
  })
  const handleTableChange = (pagination) => {
    setCurrent(pagination.current)
  };
  
  const Demo = () => {
    return (
      <div>
        <Divider />
        <Table
          pagination={pagination()}
          dataSource={data}
          showHeader={false}
          onChange={handleTableChange}
        >
          <Table.Column
            title="操作"
            key="action"
            render={(text, record) => (

              <div size="large" style={{display:'flex',justifyContent:'space-between'}}>
 

                  <div style={{display:'flex',flexDirection:'column',justifyContent:'space-around',marginLeft:'20px'}}>
                    <div style={{display:'flex',alignItems:'center'}}>
                      <Avatar src={record.avatar} style={{width:'20px',height:'20px'}}> </Avatar>
                      <div>
                        <span style={{marginLeft:'20px'}}>{record.name}</span >
                      </div>
                      <div>
                        <span style={{marginLeft:'20px'}}> {moment(record.gmtCreate).fromNow()}</span >
                      </div>
                    </div>
   
                    <div>
                      {record.desc}
                    </div>
                    <div style={{marginTop:'20px',color:'#b4b4b4',fontSize:'12px'}}>
                      <span>
                        <LikeFilled/>
                        {record.zangNum}
                      </span>
                      <span style={{marginLeft:'20px'}}>
                        <MessageFilled/>
                        {record.commentNums}
                      </span>
                    </div>
                             
                </div>

                <Button onClick={()=>goToDetail(record.id)} type='primary'>详情</Button>
              </div>
            )}
          />
          </Table>
      </div>
    );
  };

  return (
    <div>
      {Demo()}
    </div>
  );
}

export default withRouter(List);
