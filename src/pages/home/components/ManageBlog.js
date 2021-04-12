/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-04-12 15:04:49
 */

/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-04-09 15:39:52
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
    let res = await http.delete(`${demoUrl}/blogservice/blog-curd/delete/selected/${selectedRowIds.join()}`);
    if(res.data.code === 20000) {
      openNotificationWithIcon('success')
      getArticleList()
    }
  }
  const goToDetail = async(id)=>{
    props.history.push('/TrashDetail/' + id)
  }
  const handleDelete = async(id)=>{
    let res = await http.delete(`${demoUrl}/blogservice/blog-curd/delete/${id}`);
    if(res.data.code === 20000) {
      openNotificationWithIcon('success')
      getArticleList()
    }
  }
  const getArticleList = async()=>{
    let memberInfo = JSON.parse(window.localStorage.getItem('memberInfo'))
    let res = await http.get(`${demoUrl}/blogservice/blog-curd/pagePersonalBlogList/${memberInfo.id}`);
    // let res = await http.get(`${demoUrl}/blogservice/blog-curd/findTrashList`);
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
    // console.log();
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
            title="Action"
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


  return (
    <div>
      <div  className='header'>
      <div>
        <Popconfirm
          title="确定删除吗"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button href="#">删除</Button>
        </Popconfirm>
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
