/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-04-16 16:21:20
 */
/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-04-16 15:06:29
 */

/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-04-16 14:39:40
 */
import React from 'react';
import 'antd/dist/antd.css'
import { useState, useEffect } from 'react';
import http from '@/utils/request'
import {demoUrl} from '@/utils/utils';
import { withRouter } from 'react-router-dom';
import { Input,DatePicker,notification,Table, Button ,Space } from 'antd';
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
      duration: 1,
    });
  };
  const handleSelectedDelete = async()=>{
    if(selectedRowIds.length === 0) {
      notification['error']({
        message: '请至少选择一条数据',
        duration: 1,
      });
      return
    }
    let res = await http.delete(`${demoUrl}/blogservice/blog-report/deleteReport/selected/${selectedRowIds.join()}`);
    if(res.data.code === 20000) {
      openNotificationWithIcon('success')
      handleSearch()
    }
  }
  // const handleDelete = async(id)=>{
  //   let res = await http.delete(`${demoUrl}/blogservice/blog-report/deleteReport/${id}`);
  //   if(res.data.code === 20000) {
  //     openNotificationWithIcon('success')
  //     handleSearch()
  //   }
  // }
  async function handleFocus(by_id){
    let params = {
      userBeFocusedId:by_id,
    }
    let res = await http.post(`${demoUrl}/blogservice/blog-focus/addFocus`,params) ;
    if(res.code === 20000) {
      let temp = data.map(function(ele){
        if(ele.id === by_id){
          ele.focus = !ele.focus;
        }
        return ele
      })
      setData(temp)
    }
  }
  async function handleCancelFocus(by_id){
    let temp = data.map(function(ele){
      if(ele.id === by_id){
        ele.focus = false;
      }
      return ele
    })
    setData(temp)
    let params = {
      userBeFocusedId:by_id,
    }
    let res = await http.delete(`${demoUrl}/blogservice/blog-focus/deleteFocus`,params) ;
    console.log(res);
  }
  function handleClear() {
    setKeyValue('');
    setRangeTime([]);
  }
  async function handleSearch() {
      let params = {
        keyValue:keyValue,
        startTime:rangeTime[0]?.format('YYYY-MM-DD HH:mm:ss'),
        endTime:rangeTime[1]?.format('YYYY-MM-DD HH:mm:ss'),
      }
      let res = await http.post(`${demoUrl}/blogservice/blog-member/pageMemberListSearchWithToken/search`,params);
      if(res.code === 20000) {
        console.log(res);
        let articleList = res.data.list.map((i,index)=>(
          {

            'nickname': i.nickname,
            'key': i.id,
            'id': i.id,
            'gmtCreate':i.gmtCreate,
            'gmtModified':i.gmtModified,
            'focus':res.data.focus[index]

           }));
        setData(articleList)
      }
    // }

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
  
  const Demo = () => {
    return (
      <div>
        <Table
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
          pagination={pagination()}
          dataSource={data}
          onChange={handleTableChange}
        >
          <Table.Column title="昵称" dataIndex="nickname"  />
          <Table.Column title="创建时间" dataIndex="gmtCreate"  />
          <Table.Column
            title="操作"
            key="action"
            render={(text, record) => (
              <Space size="middle">
                {/* <Button danger onClick={()=>{handleDelete(record.id)}} style={{ marginLeft:'20px',color:'green'}}>已处理</Button> */}
                { record.focus && <Button danger onClick={()=>{handleCancelFocus(record.id)}} style={{ marginLeft:'20px',color:'green'}}>已关注</Button> }
                { !record.focus && <Button danger onClick={()=>{handleFocus(record.id)}} style={{ marginLeft:'20px',color:'green'}}>关注</Button> }
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


  return (
    <div>
      <div className="header">
          <div className="item">
          <Input placeholder="请输入关键字" value={keyValue} onChange={handleChange} style={{ width: 200 }} />
          </div>
            <RangePicker
              value={rangeTime}
              onChange={handleChangeTime}
              locale={locale}
              format={dateFormat}
              style={{ width: 300,marginLeft:'50px'}}
            />
        <Button onClick={handleSearch} type="primary" style={{ marginLeft:'50px'}}>查询</Button>
        <Button onClick={handleClear} style={{ marginLeft:'20px'}} className="green">重置</Button>
        <Button onClick={handleSelectedDelete} type="primary" danger style={{ marginLeft:'20px'}}>删除</Button>
      </div>
      {Demo()}
    </div>
  );
}

export default withRouter(List);
