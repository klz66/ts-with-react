/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-05-15 19:05:26
 */
import React, { useRef,useEffect,useState } from 'react';
import http from '@/utils/request'
import { notification,List,Popconfirm ,Input } from 'antd';
import {demoUrl,uploadUrl} from '@/utils/utils';

import zh_CN from '../../../public/tinymce/langs/zh_CN';
import tinyMce from 'tinymce/tinymce';
import { Editor } from '@tinymce/tinymce-react';
import { StopOutlined,CheckCircleOutlined } from '@ant-design/icons';
import './index.less'
var _ = require('lodash');



function Write(props) {
  let memberInfo = JSON.parse(window.localStorage.getItem('memberInfo'))
  let editorRef = useRef()
  let [draftList,setDraftList] = useState([]);
  let [actice,setActice] = useState(-1);
  let [title,setTitle] = useState('');

  useEffect(() => {
    updateDraftList(); 
    if(actice<0){
      localStorage.removeItem('blogId')
    }
    setTitle(draftList[actice]?.title)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[actice]);
  function changeContent(index,item) {
    setActice(index)
    setTitle(item.title)
    if(draftList.length>0){
      let item = draftList[index]
      
      let trialDom=tinyMce.activeEditor.contentDocument
      if(trialDom){
        let dom=trialDom.getElementById('tinymce')
        if(item){
            console.log(item);
            localStorage.setItem('blogId',item.id)
            dom.innerHTML=item.content
        }
      }
    }
  }
  async function updateDraftList(){
    let res = await http.get(`${demoUrl}/blogservice/blog-curd/getBlogDraftList`);
    if(res.code === 20000) {
      setDraftList(res.data.list.map(i=>({
        id: i.id,
        title: i.title==='无标题'? i.gmtCreate.slice(0,10):i.title.slice(0,10),
        content: i.content
      })))
    }
    if(res.data.list?.length === 0){
      setTimeout(function(){
        let trialDom=tinyMce.activeEditor.contentDocument
        let dom=trialDom.getElementById('tinymce')
        dom.innerHTML=null
        editorRef.current.currentContent = null
        localStorage.setItem('blogId',null)
        setActice(-1);
      },400)
    }
    
  }
  const handleEditorChange = (content, editor) => {
    console.log('Content was updated:', content);
  };
  const openNotificationWithIcon = type => {
    notification[type]({
      message: '发表成功',
    });
    let trialDom=tinyMce.activeEditor.contentDocument
    let dom=trialDom.getElementById('tinymce')
    dom.innerHTML=''
  };
  const handAdd = async() =>{
    const params = {
      'title':'无标题',
      'name': memberInfo.nickname,
      'authorId': memberInfo.id
    }
    let res = await http.post(`${demoUrl}/blogservice/blog-curd/saveDraftBlog`,params);
    if(res.code === 20000) {
      notification['success']({
        message: '新增成功',
      });
      let params = {
        ...res.data.item,
        title: res.data.item.gmtCreate.slice(0,10)
      }
        let list = [params,...draftList]
        setDraftList(list)
        setActice(0)
        setTimeout(function(){
          let trialDom=tinyMce.activeEditor.contentDocument
          let dom=trialDom.getElementById('tinymce')
          dom.innerHTML=null
          editorRef.current.currentContent = null
          localStorage.setItem('blogId',res.data.item.id)
        },400)

    }
  }
  async function handleSave(content){
    if(localStorage.getItem('blogId')?.length!==19){
      notification['error']({
        message: '请先选择文章'
      })
      return
    } else {
      console.log(localStorage.getItem('blogId'));
    }
    let blogId = localStorage.getItem('blogId')
    if(content.length === 0) {
      notification['error']({
        message: '内容不能为空'
      })
      return
    }
    if(title.trim() === '') {
      notification['error']({
        message: '必须要有标题'
      })
      return;
    }
    const params = {
      "id": blogId,
      "title": title,
      "content": content,
      'name': memberInfo.nickname,
      'authorId': memberInfo.id
    }
    let res = await http.post(`${demoUrl}/blogservice/blog-curd/saveDraftBlog`,params);
    if(res.code === 20000) {
      notification['success']({
        message: '保存成功',
      });
      updateDraftList();
    }
  }
  const handSave = async() =>{
    handleSave(editorRef.current.currentContent)
  }
  const handPost = async(content) =>{
    if(localStorage.getItem('blogId')?.length!==19){
      notification['error']({
        message: '请先选择文章'
      })
      return
    } else {
      console.log(localStorage.getItem('blogId'));
    }
    if(content === null || content.length === 0) {
      notification['error']({
        message: '内容不能为空'
      })
      return
    }
    if(title.trim() === '') {
      notification['error']({
        message: '必须要有标题'
      })
      return;
    }
    if(title.trim().length>30){
      notification['error']({
        message: '标题长度太长'
      })
      return
    } 
    if(localStorage.getItem('blogId')){
      const params = {
        "id": localStorage.getItem('blogId'),
        "title": title,
        "content": content,
        'authorId': memberInfo.id
      }
      let res = await http.post(`${demoUrl}/blogservice/blog-curd/updateDraftBlog`,params);
      if(res.code === 20000) {
        openNotificationWithIcon('success')
        updateDraftList();
        setTitle('');
        setActice(-1)
      } else {
        notification['error']({
          message: `${res.data.message}`,
        });
      }
    }else {
      const params = {
        "title": title,
        "content": content,
        'name': memberInfo.nickname,
        'authorId': memberInfo.id
      }
      let res = await http.post(`${demoUrl}/blogservice/blog-curd/addBlog`,params);
      if(res.code === 20000) {
        openNotificationWithIcon('success')
      } else {
        notification['error']({
          message: `${res.data.message}`,
        });
      }
    }
  }
  async function confirmDelete(id){
    let res = await http.delete(`${demoUrl}/blogservice/blog-curd/delete/forever/${id}`);
    if(res.data.code === 20000) {
      notification['success']({
        message: '删除成功',
      });
      setTimeout(function(){
        let trialDom=tinyMce.activeEditor.contentDocument
        let dom=trialDom.getElementById('tinymce')
        dom.innerHTML=null
        editorRef.current.currentContent = null
        localStorage.setItem('blogId',null)
        setActice(-1);
      },400)
      updateDraftList()
    }
  }
  async function confirmDeleteAll(){
    let res = await http.delete(`${demoUrl}/blogservice/blog-curd/delete/draft/all/${memberInfo.id}`);
    if(res.data.code === 20000) {
      notification['success']({
        message: '清除成功',
      });
      setTimeout(function(){
        let trialDom=tinyMce.activeEditor.contentDocument
        let dom=trialDom.getElementById('tinymce')
        dom.innerHTML=null
        localStorage.setItem('blogId',null)
        editorRef.current.currentContent = null
        setActice(-1);
      },400)
      updateDraftList()
    }
  }
  function formatTitle(content) {
    var re1 = new RegExp("<.+?>","g");//匹配html标签的正则表达式，"g"是搜索匹配多个符合的内容
    if(!_.isEmpty(content.match(/((?<=<h.>).+?)(?=<\/h.>)/))) {
      return content.match(/((?<=<h.>).+?)(?=<\/h.>)/)[0].replace(re1,'');
    }
    else{
      return ''
    } 
  }
  
			return (
        <div style={{display:'flex',height:'100vh',paddingLeft:'100px'}}>
          <div style={{width:'180px',marginRight:'50px'}}>
            <div className='goHome' onClick={()=>{ props.history.push('/')}}>
              回首页
            </div>
            <List
              size="small"
              style = {{overflowY:'scroll'}}
              header={<div onClick={()=>handAdd()} style={{cursor:'pointer'}}>新建文章</div>}
              footer={
                <Popconfirm
                title="确定清除草稿箱？"
                onConfirm={()=>confirmDeleteAll()}
                okText="Yes"
                cancelText="No"
              ><div>             
              清除草稿箱
              </div>
              </Popconfirm>
              }
              bordered
              dataSource={draftList}
              renderItem={(item,index) => <List.Item style={{display:'flex',justifyContent:'space-between',backgroundColor: index === actice?'#ddd':'',cursor: 'pointer'}} onClick={()=>{
                changeContent(index,item);
              }}>{item.title}
              <div className='icon-margin'>
              <Popconfirm
                title="确认直接发表"
                onConfirm={()=>handPost(item.content)}
                okText="Yes"
                cancelText="No"
              >
              <CheckCircleOutlined  />
              </Popconfirm>
              <Popconfirm
                title="确认删除此草稿"
                onConfirm={()=>confirmDelete(item.id)}
                okText="Yes"
                cancelText="No"
              >
                <StopOutlined />
              </Popconfirm>
              </div>
              </List.Item>}
            />
          </div>
				<div>
          <Input placeholder="标题" value={title} onChange={(e)=>{setTitle(e.target.value)}} style={{ width: 800 }} />
          <span onClick={()=>{handSave()}} style={{marginLeft:'20px',cursor:'pointer',color:'green'}}>保存</span>
          <span onClick={()=>{handPost(editorRef.current.currentContent)}} style={{marginLeft:'20px',cursor:'pointer',color:'blue'}}>发表</span>
          <Editor
            ref={editorRef}
            initialValue={''}
            apiKey='i24scrj5aegi7posl2kwbygrvkcgywqul11wtqrwoltystrh'
            selecector='editorStateRef'
            init={{
            height: 700,
            width:1100,
            language_url: zh_CN,
            language:'zh_CN',
            images_upload_handler: async function (blobInfo, succFun, failFun) {
              let formData = new FormData();
              formData.append('file',blobInfo.blob())
              let res = await http.post(`${uploadUrl}/eduoss/fileoss`,formData)
              if(res.code === 20000) {
                succFun(res.data.url);
              }
            },
            // menubar: false,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount'
            ],
            
            toolbar: 'undo redo image| formatselect | bold italic backcolor | \
               alignleft aligncenter alignright alignjustify | \
                fullscreen save sumbit back',
              setup: (editor) => {
                editor.ui.registry.addButton('back', {
                  text: '返回主页面',
                  icon: 'chevron-left',
                  onAction: function(){
                    props.history.push('/')
                  }
                })
              }
          }}
          onEditorChange={handleEditorChange}
        />
        </div>

        </div>
			)
  
}


export default Write;
