/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-03-21 23:13:07
 */
/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-03-19 17:13:19
 */
import 'antd/dist/antd.css'
import { useState, useEffect } from 'react';
import { connect } from "react-redux";
import http from '@/utils/request'
import {demoUrl} from '@/utils/utils';
import { withRouter } from 'react-router-dom';
import './index.less'
import { notification,Table, Divider, Button ,Space,Popconfirm,message  } from 'antd';
function List(props) {
  let [current,setCurrent] = useState(1)
  let [data,setData] = useState([])
  let [selectedRowIds,SetSelectedRowIds] = useState([])
  useEffect(() => {
    getArticleList()
  }, []);
  const openNotificationWithIcon = type => {
    notification[type]({
      message: '删除成功',
      description:'永久删除成功',
      duration: 1,
    });
  };
  const handleSelectedDelete = async()=>{
    let res = await http.delete(`${demoUrl}/blogservice/blog-curd/delete/forever/selected/${selectedRowIds.join()}`);
    if(res.data.code === 20000) {
      openNotificationWithIcon('success')
      getArticleList()
    }
  }
  const handleSelectedRecovery = async()=>{
    let res = await http.delete(`${demoUrl}/blogservice/blog-curd/recovery/selected/${selectedRowIds.join()}`);
    if(res.data.code === 20000) {
      notification['success']({
        message: '批量恢复成功',
        duration: 1,
      });
      getArticleList()
    }
  }
  const lookDetail = async(id)=>{
    console.log(id);
  }
  const handleDelete = async(id)=>{
    let res = await http.delete(`${demoUrl}/blogservice/blog-curd/delete/forever/${id}`);
    console.log(res);
    if(res.data.code === 20000) {
      openNotificationWithIcon('success')
      getArticleList()
    }
  }
  const handleRecovery = async(id)=>{
    let res = await http.delete(`${demoUrl}/blogservice/blog-curd/recovery/single/${id}`);
    if(res.data.code === 20000) {
      notification['success']({
        message: '恢复成功',
        duration: 1,
      });
      getArticleList()
    }
  }
  const getArticleList = async()=>{
    let res = await http.get(`${demoUrl}/blogservice/blog-curd/findTrashList`);
    console.log(res);
    if(res.code === 20000) {
      let articleList = res.data.item.map((i)=>(
        {
          'key': i.id,
          'title': i.name+'发表的文章',
          'desc': i.content.replace(/<[^>]+>|&[^>]+;/g,"").trim(),
          'detail': i.content,
          'id':i.id,
          
          // 'imgUrl':'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2084631030,3185655172&fm=26&gp=0.jpg'
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
          <Table.Column title="Title" dataIndex="title" />
          <Table.Column title="Desc" dataIndex="desc"  />
          <Table.Column
            title="Action"
            key="action"
            render={(text, record) => (
              <Space size="middle">
                {/* <a>Invite {record.lastName}</a> */}
                <Button onClick={()=>lookDetail(record.id)} type='primary'>详情</Button>
                <Button onClick={()=>handleDelete(record.id)} type='primary' danger>删除</Button>
                <Button onClick={()=>handleRecovery(record.id)} className='green'>恢复</Button>
              </Space>
            )}
          />
          </Table>
          {/* <Pagination defaultCurrent={1} total={50} /> */}
      </div>
    );
  };


  return (
    <div>
      <div  className='header'>
      回收站
      <div>
        <Popconfirm
          title="确定删除吗，将无法恢复"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button href="#">永久删除</Button>
        </Popconfirm>
        <Button onClick={()=>handleSelectedRecovery()} href="#">恢复</Button>
        </div>
      </div>
      {Demo()}
    </div>
  );
}
const mapStateToProps = (state) => ({
})
const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(List));
