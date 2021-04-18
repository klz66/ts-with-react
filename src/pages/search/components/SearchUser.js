
import 'antd/dist/antd.css'
import { useState, useEffect } from 'react';
import http from '@/utils/request'
import {demoUrl} from '@/utils/utils';
import { withRouter } from 'react-router-dom';
import { Input,DatePicker,Table, Divider, Button ,Space ,Avatar } from 'antd';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import moment from 'moment';
import Item from 'antd/lib/list/Item';

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
function List(props) {
  console.log(props.keyValue);
  let [keyValue,setKeyValue] = useState('')
  let [current,setCurrent] = useState(1)
  let [data,setData] = useState([])
  useEffect(() => {
    handleSearch()
  }, []);
  const goToDetail = async(id)=>{
    window.open('/personal/' + id)
  }
  async function handleSearch() {
    let params = {
      keyValue:props.keyValue,
      searchAuthorId:'',
    }
    let res = await http.post(`${demoUrl}/blogservice/blog-admin/pageMemberList/search`,params);
    
    if(res.code === 20000) {
      let articleList = res.data.list.map((i)=>(
        {
          'key': i.id,
          'isDisabled':i.isDisabled,
          'avatar':i.avatar,
          'nickname': i.nickname,
          'id':i.id,
          'age':i.age,
          'account':i.account,
          'fansNum':i.fansNum,
          'focusNum':i.focusNum,
          'blogNum':i.blogNum,
          'gmtCreate':i.gmtCreate,
          'gmtModified':i.gmtModified,
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
                <div style={{display:'flex'}}>
                  <div style={{display:'flex',alignItems:'center'}}>
                    <Avatar src={record.avatar} style={{width:'60px',height:'60px'}}> </Avatar>
                  </div>

                  <div style={{display:'flex',flexDirection:'column',justifyContent:'space-around',marginLeft:'20px'}}>
                    <div>
                      {record.nickname}
                    </div>
                    <div>
                      <span> 关注&nbsp;{record.focusNum}</span>&nbsp;&nbsp; <span>粉丝&nbsp;{record.fansNum} </span>&nbsp;&nbsp;<span>博客&nbsp;{record.blogNum} </span>
                    </div>
                    {/* {
                      props.history.push( {pathname:'/login',state:{login:false}});
                    } */}
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
  function handleChange(e) {
    setKeyValue(e.target.value);
  }
  function handleClear() {
    setKeyValue('');
  }

  return (
    <div>
      <div>
          {/* <Input placeholder="请输入关键字" value={keyValue} onChange={handleChange} style={{ width: 200 }} /> */}
        {/* <Button onClick={handleSearch} type='primary' style={{ marginLeft:'50px'}} href="#">查询</Button>
        <Button onClick={handleClear} style={{ marginLeft:'20px'}} href="#">重置</Button> */}
      </div>
      {Demo()}
    </div>
  );
}

export default withRouter(List);
