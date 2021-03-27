/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-03-27 23:25:26
 */
import React, { useRef } from 'react';
import { connect } from 'react-redux';
import http from '@/utils/request'
import { notification  } from 'antd';
import {demoUrl,uploadUrl} from '@/utils/utils';
// import './index.css';
import { Editor } from '@tinymce/tinymce-react';
import './index.less'


function Write(props) {
  console.log(localStorage);
  let editorRef = useRef()
  const handleEditorChange = (content, editor) => {
    console.log('Content was updated:', content);
  };
  const openNotificationWithIcon = type => {
    notification[type]({
      message: '发表成功',
    });
  };
  const handPost = async(content) =>{
    if(content.length === 0) {
      notification['error']({
        message: '内容不能为空'
      })
      return
    }
    let memberInfo = JSON.parse(window.localStorage.getItem('memberInfo'))
    const params = {
      "content": content,
      'name': 'kl',
      'authorId': memberInfo.id
    }
    let res = await http.post(`${demoUrl}/blogservice/blog-curd/addBlog`,params);
    if(res.code === 20000) {
      openNotificationWithIcon('success')
    }
    
  }
			return (
				<div className='content'>
          <Editor
            ref={editorRef}
            initialValue="<p>请输入</p>"
            apiKey='i24scrj5aegi7posl2kwbygrvkcgywqul11wtqrwoltystrh'
            selecector='editorStateRef'
            init={{
            height: 500,
            width:1000,
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
                bullist numlist outdent indent fullscreen save sumbit back',
              setup: (editor) => {
                editor.ui.registry.addButton('save', {
                  text: '保存',
                  icon: 'new-document',
                  onAction: function(){
                    console.log('保存');
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
			)
  
}

const mapState = (state) => ({
})

export default connect(mapState, null)(Write);
