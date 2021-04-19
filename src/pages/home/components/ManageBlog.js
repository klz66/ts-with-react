
import 'antd/dist/antd.css'
import { useState, useEffect } from 'react';
import http from '@/utils/request'
import {demoUrl} from '@/utils/utils';
import { withRouter } from 'react-router-dom';
import { Input,DatePicker,notification,Table, Divider, Button ,Space,Popconfirm,message  } from 'antd';
import './less/manageBlog.less'
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import moment from 'moment';

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
function List(props) {
  let [keyValue,setKeyValue] = useState('')
  let [rangeTime,setRangeTime] = useState('')
  let [current,setCurrent] = useState(1)
  let [data,setData] = useState([])
  let [selectedRowIds,SetSelectedRowIds] = useState([])
  useEffect(() => {
    handleSearch()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const openNotificationWithIcon = type => {
    notification[type]({
      message: '删除成功',
      description:'删除成功',
      duration: 1,
    });
  };
  const handleSelectedDelete = async()=>{
    let res = await http.delete(`${demoUrl}/blogservice/blog-curd/delete/selected/${selectedRowIds.join()}`);
    if(res.data.code === 20000) {
      openNotificationWithIcon('success')
      handleSearch()
    }
  }
  const goToDetail = async(id)=>{
    window.open('/detail/' + id)
  }
  const handleDelete = async(id)=>{
    let res = await http.delete(`${demoUrl}/blogservice/blog-curd/delete/${id}`);
    if(res.data.code === 20000) {
      openNotificationWithIcon('success')
      handleSearch()
    }
  }
  async function handleSearch() {
    let params = {
      keyValue:keyValue,
      startTime:rangeTime[0]?.format('YYYY-MM-DD HH:mm:ss'),
      endTime:rangeTime[1]?.format('YYYY-MM-DD HH:mm:ss'),
    }
    let res = await http.post(`${demoUrl}/blogservice/blog-curd/pagePersonalBlogList/search`,params);
    
    if(res.code === 20000) {
      let articleList = res.data.list.map((i)=>(
        {
          'key': i.id,
          'title': i.title.slice(0,10),
          'desc': i.content.replace(/<[^>]+>|&[^>]+;/g,"").trim().slice(0,20),
          'detail': i.content,
          'id':i.id,
          'gmtCreate':i.gmtCreate,
          'gmtModified':i.gmtModified,
          'collectedNum':i.collectedNum,
          'zangNum':i.zangNum,
          }));
      setData(articleList)
    }
  }
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      SetSelectedRowIds(selectedRowKeys);
    },
  };
  const pagination = ()=>({
    current: current,
    pageSize: 10,
  })
  const handleTableChange = (pagination) => {
    setCurrent(pagination.current)
  };
  function confirm(e) {
    handleSelectedDelete();
  }
  
  function cancel(e) {
    message.error('已取消');
  }
  const Demo = () => {
    return (
      <div>
        <Divider />
        <Table
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
          pagination={pagination()}
          dataSource={data}
          onChange={handleTableChange}
        >
          <Table.Column title="标题" dataIndex="title" />
          <Table.Column title="内容" dataIndex="desc"  />
          <Table.Column title="点赞" dataIndex="collectedNum"  />
          <Table.Column title="收藏" dataIndex="zangNum"  />
          <Table.Column title="创建时间" dataIndex="gmtCreate"  />
          <Table.Column title="修改时间" dataIndex="gmtModified"  />
          <Table.Column
            title="操作"
            key="action"
            render={(text, record) => (
              <Space size="middle">
                <Button onClick={()=>goToDetail(record.id)} type='primary'>详情</Button>
                <Button onClick={()=>handleDelete(record.id)} type='primary' danger>删除</Button>
              </Space>
            )}
          />
          </Table>
      </div>
    );
  };
  function handleChange(e) {
    setKeyValue(e.target.value);
  }
  function handleChangeTime(e) {
    console.log(e[0].format('YYYY-MM-DD HH:mm:ss'));
    console.log(e[1].format('YYYY-MM-DD HH:mm:ss'));
    setRangeTime([moment(e[0].format('YYYY-MM-DD HH:mm:ss'), dateFormat), moment(e[1].format('YYYY-MM-DD HH:mm:ss'), dateFormat)])
  }
  function handleClear() {
    setKeyValue('');
    setRangeTime([]);
  }

  return (
    <div>
      <div className='header'>
          <Input placeholder="请输入关键字" value={keyValue} onChange={handleChange} style={{ width: 200 }} />
            <RangePicker
              value={rangeTime}
              onChange={handleChangeTime}
              locale={locale}
              format={dateFormat}
              style={{ width: 300,marginLeft:'50px'}}
            />
        <Button onClick={handleSearch} type='primary' style={{ marginLeft:'50px'}} href="#">查询</Button>
        <Button onClick={handleClear} style={{ marginLeft:'20px'}} className='green' href="#">重置</Button>
        <Popconfirm
          title="确定删除吗"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button type='primary' danger style={{ marginLeft:'20px'}} href="#">删除</Button>
        </Popconfirm>
      </div>
      {Demo()}
    </div>
  );
}

export default withRouter(List);
