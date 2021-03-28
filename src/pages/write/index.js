/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-03-28 18:25:25
 */
import React, { useRef,useEffect,useState } from 'react';
import { connect } from 'react-redux';
import http from '@/utils/request'
import { notification,List  } from 'antd';
import {demoUrl,uploadUrl} from '@/utils/utils';
// import './index.css';
import { Editor } from '@tinymce/tinymce-react';
import './index.less'
var _ = require('lodash');


function Write(props) {
  let editorRef = useRef()
  let [draftList,setDraftList] = useState([]);
  useEffect(() => {
    async function fn(){
      let res = await http.get(`${demoUrl}/blogservice/blog-curd/getBlogDraftList`);
      if(res.code === 20000) {
        console.log(res,'获取相应用户的草稿箱');
        console.log(res.data.list);
      }
    }
    fn();
  },[]);
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
      "title": formatTitle(content),
      "content": content,
      'name': 'kl',
      'authorId': memberInfo.id
    }
    let res = await http.post(`${demoUrl}/blogservice/blog-curd/addBlog`,params);
    if(res.code === 20000) {
      openNotificationWithIcon('success')
    }
    
  }
  function formatTitle(content) {
    if(!_.isEmpty(content.match(/((?<=<h1>).+?)(?=<\/h1>)/))) {
      return content.match(/((?<=<h1>).+?)(?=<\/h1>)/)[0];
    }
    else if(!_.isEmpty(content.match(/((?<=<h2>).+?)(?=<\/h2>)/))) {
      return content.match(/((?<=<h2>).+?)(?=<\/h2>)/)[0]
    }
    else if(!_.isEmpty(content.match(/((?<=<h3>).+?)(?=<\/h3>)/))) {
      return content.match(/((?<=<h3>).+?)(?=<\/h3>)/)[0]
    }
    else if(!_.isEmpty(content.match(/((?<=<h4>).+?)(?=<\/h4>)/))) {
      return content.match(/((?<=<h4>).+?)(?=<\/h4>)/)[0]
    }
    else if(!_.isEmpty(content.match(/((?<=<h5>).+?)(?=<\/h5>)/))) {
      return content.match(/((?<=<h5>).+?)(?=<\/h5>)/)[0]
    }
    else if(!_.isEmpty(content.match(/((?<=<h6>).+?)(?=<\/h6>)/))) {
      return content.match(/((?<=<h6>).+?)(?=<\/h6>)/)[0]
    }
    else{
      return '无标题'
    } 
  }
  
			return (
        <div style={{display:'flex'}}>
          <div style={{width:'180px',marginRight:'50px'}}>
            <List
              size="small"
              header={<div>新建文章</div>}
              footer={<div>清除草稿箱</div>}
              bordered
              dataSource={draftList}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </div>
				<div className='content'>
          <Editor
            ref={editorRef}
            initialValue="<p>请输入</p>"
            apiKey='i24scrj5aegi7posl2kwbygrvkcgywqul11wtqrwoltystrh'
            selecector='editorStateRef'
            init={{
            height: 500,
            width:900,
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

        </div>
			)
  
}

const mapState = (state) => ({
})

export default connect(mapState, null)(Write);
