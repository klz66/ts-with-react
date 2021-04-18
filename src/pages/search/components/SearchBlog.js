
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
  let [keyValue,setKeyValue] = useState('')
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
      keyValue:keyValue,
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

              <div size="middle">
                <Avatar src={record.avatar}>
                </Avatar>
                              <span>
                {record.nickname}
              </span>
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
          <Input placeholder="请输入关键字" value={keyValue} onChange={handleChange} style={{ width: 200 }} />
        <Button onClick={handleSearch} type='primary' style={{ marginLeft:'50px'}} href="#">查询</Button>
        <Button onClick={handleClear} style={{ marginLeft:'20px'}} href="#">重置</Button>
      </div>
      {Demo()}
    </div>
  );
}

export default withRouter(List);
