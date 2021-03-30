/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-03-31 01:23:42
 */
import React, { useRef,useEffect,useState } from 'react';
import { connect } from 'react-redux';
import http from '@/utils/request'
import { notification,List,Popconfirm  } from 'antd';
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

  useEffect(() => {
    updateDraftList(); 
  },[]);
  useEffect(() => {
    if(draftList.length===1){
      setActice(0)
      changeContent(0)
    }
  },[draftList]);
  function changeContent(index,item) {
    setActice(index)
    console.log(draftList);
    if(draftList.length>0){
      let item = draftList[index]
      localStorage.setItem('blogId',item.id)
      let trialDom=tinyMce.activeEditor.contentDocument
      if(trialDom){
        let dom=trialDom.getElementById('tinymce')
        dom.innerHTML=item.content
      } else{
        setTimeout(function(){
          let trialDom=tinyMce.activeEditor.contentDocument
          let dom=trialDom.getElementById('tinymce')
          dom.innerHTML=item.content
        },1000)
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
    if(res.data.list.length === 0){
      setTimeout(function(){
        let trialDom=tinyMce.activeEditor.contentDocument
        let dom=trialDom.getElementById('tinymce')
        dom.innerHTML=null
        localStorage.setItem('blogId',null)
      },400)
    }
    
    changeContent(actice)
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
    let trialDom=tinyMce.activeEditor.contentDocument
    let dom=trialDom.getElementById('tinymce')
    dom.innerHTML=null
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
      setActice(0)
      let list = [params,...draftList]
      setDraftList(list)
    }
  }
  async function handleSave(content){
    console.log(draftList)
    if(localStorage.getItem('blogId').length!==19){
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
    const params = {
      "id": blogId,
      "title": formatTitle(content),
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
  const handSave = async(content) =>{
    handleSave(content)
  }
  const handPost = async(content) =>{
    console.log(localStorage.getItem('blogId'));
    if(localStorage.getItem('blogId')===null){
      notification['error']({
        message: '请先选择文章'
      })
      return
    }
    if(content === null || content.length === 0) {
      notification['error']({
        message: '内容不能为空'
      })
      return
    }
    if(formatTitle(content).length>30){
      notification['error']({
        message: '标题长度太长'
      })
      return
    } 
    if(localStorage.getItem('blogId')){
      const params = {
        "id": localStorage.getItem('blogId'),
        "title": formatTitle(content),
        "content": content,
        'authorId': memberInfo.id
      }
      let res = await http.post(`${demoUrl}/blogservice/blog-curd/updateDraftBlog`,params);
      if(res.code === 20000) {
        openNotificationWithIcon('success')
        updateDraftList();
      }
    }else {


      const params = {
        "title": formatTitle(content),
        "content": content,
        'name': memberInfo.nickname,
        'authorId': memberInfo.id
      }
      let res = await http.post(`${demoUrl}/blogservice/blog-curd/addBlog`,params);
      if(res.code === 20000) {
        openNotificationWithIcon('success')
      }
    }
  }
  async function confirmDelete(id){
    let res = await http.delete(`${demoUrl}/blogservice/blog-curd/delete/forever/${id}`);
    if(res.data.code === 20000) {
      notification['success']({
        message: '删除成功',
      });
      updateDraftList()
    }
  }
  async function confirmDeleteAll(){
    let res = await http.delete(`${demoUrl}/blogservice/blog-curd/delete/draft/all/${memberInfo.id}`);
    if(res.data.code === 20000) {
      notification['success']({
        message: '清除成功',
      });
      localStorage.setItem('blogId',null)
      setTimeout( updateDraftList(),200)
      // updateDraftList()
    }
  }
  function formatTitle(content) {
    var re1 = new RegExp("<.+?>","g");//匹配html标签的正则表达式，"g"是搜索匹配多个符合的内容
    if(!_.isEmpty(content.match(/((?<=<h1>).+?)(?=<\/h1>)/))) {
      return content.match(/((?<=<h1>).+?)(?=<\/h1>)/)[0].replace(re1,'');
    }
    else if(!_.isEmpty(content.match(/((?<=<h2>).+?)(?=<\/h2>)/))) {
      return content.match(/((?<=<h2>).+?)(?=<\/h2>)/)[0].replace(re1,'');
    }
    else if(!_.isEmpty(content.match(/((?<=<h3>).+?)(?=<\/h3>)/))) {
      return content.match(/((?<=<h3>).+?)(?=<\/h3>)/)[0].replace(re1,'');
    }
    else if(!_.isEmpty(content.match(/((?<=<h4>).+?)(?=<\/h4>)/))) {
      return content.match(/((?<=<h4>).+?)(?=<\/h4>)/)[0].replace(re1,'');
    }
    else if(!_.isEmpty(content.match(/((?<=<h5>).+?)(?=<\/h5>)/))) {
      return content.match(/((?<=<h5>).+?)(?=<\/h5>)/)[0].replace(re1,'');
    }
    else if(!_.isEmpty(content.match(/((?<=<h6>).+?)(?=<\/h6>)/))) {
      return content.match(/((?<=<h6>).+?)(?=<\/h6>)/)[0].replace(re1,'');
    }
    else{
      return '无标题'
    } 
  }
  
			return (
        <div style={{display:'flex',height:'100vh'}}>
          <div style={{width:'180px',marginRight:'50px'}}>
            
            <List
              size="small"
              style = {{overflowY:'scroll'}}
              header={<div onClick={()=>handAdd()}>新建文章</div>}
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
              renderItem={(item,index) => <List.Item style={{display:'flex',justifyContent:'space-between',backgroundColor: index === actice?'#ddd':''}} onClick={()=>{
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
          <Editor
            ref={editorRef}
            initialValue={''}
            apiKey='i24scrj5aegi7posl2kwbygrvkcgywqul11wtqrwoltystrh'
            selecector='editorStateRef'
            init={{
            height: 500,
            width:900,
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
                editor.ui.registry.addButton('save', {
                  text: '保存',
                  icon: 'new-document',
                  onAction: function(){
                    let content = editorRef.current.currentContent?editorRef.current.currentContent:editorRef.current.props.initialValue;
                    handSave(content)
                  }
                })
                editor.ui.registry.addButton('sumbit', {
                  text: '发表文章',
                  icon: 'redo',
                  onAction: function(){
                    let content = editorRef.current.currentContent?editorRef.current.currentContent:editorRef.current.props.initialValue;
                    handPost(content)
                  }
                })
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

const mapState = (state) => ({
})

export default connect(mapState, null)(Write);
