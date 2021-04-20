/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-04-20 23:13:34
 */
import React, { useRef,useEffect,useState } from 'react';
import http from '@/utils/request'
import { notification,Input } from 'antd';
import {demoUrl,uploadUrl} from '@/utils/utils';
import tinyMce from 'tinymce/tinymce';
import zh_CN from '../../../public/tinymce/langs/zh_CN';
import { Editor } from '@tinymce/tinymce-react';
import './index.less'
var _ = require('lodash');



function Edit(props) {
  let [title,setTitle] = useState('');
  let blogDetail = props.location.state.blogDetail
  
  let editorRef = useRef()
  useEffect(() => {
    
    setTitle(blogDetail.title)
    setTimeout(function(){
      let trialDom=tinyMce.activeEditor.contentDocument
      if(trialDom) {
        let dom=trialDom.getElementById('tinymce')
        dom.innerHTML=blogDetail.content
      }
    },400)
  }, [])
  
  const handleEditorChange = (content, editor) => {
    console.log('Content was updated:', content);
  };
  const openNotificationWithIcon = type => {
    notification[type]({
      message: '发表成功',
    });
  };
  const handPost = async(content) =>{
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
    console.log(blogDetail);
      const params = {
        "id": blogDetail.id,
        "title": title,
        "content": content,
        'authorId': blogDetail.authorId,
      }
      let res = await http.post(`${demoUrl}/blogservice/blog-curd/updateDraftBlog`,params);
      if(res.code === 20000) {
        openNotificationWithIcon('success')
      }
  }
  
			return (
        <div style={{display:'flex',height:'100vh'}}>
				<div>
        <Input placeholder="标题" value={title} onChange={(e)=>{setTitle(e.target.value)}} style={{ width: 800 }} />
        <span onClick={()=>{handPost(editorRef.current.currentContent)}} style={{marginLeft:'20px',cursor:'pointer',color:'green'}}>保存</span>
          <Editor
            ref={editorRef}
            initialValue={''}
            apiKey='i24scrj5aegi7posl2kwbygrvkcgywqul11wtqrwoltystrh'
            selecector='editorStateRef'
            init={{
            height: 600,
            width:1200,
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
                fullscreen sumbit back',
              setup: (editor) => {
                // editor.ui.registry.addButton('sumbit', {
                //   text: '确认',
                //   icon: 'redo',
                //   onAction: function(){
                //     let content = editorRef.current.currentContent?editorRef.current.currentContent:editorRef.current.props.initialValue;
                //     handPost(content)
                //   }
                // })
                editor.ui.registry.addButton('back', {
                  text: '返回',
                  icon: 'chevron-left',
                  onAction: function(){
                    props.history.goBack()
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

export default Edit;
