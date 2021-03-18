/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-03-18 19:34:30
 */
import React, { useRef} from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import http from '@/utils/request'
import { Link } from 'react-router-dom'
import { Input,Button,notification  } from 'antd';
import {demoUrl,uploadUrl} from '@/utils/utils';
import './index.css';
// import Tinymce from './component/tinymce'
import { Editor } from '@tinymce/tinymce-react';
import styles from './index.less'

function Write(props) {
  const handleEditorChange = (content, editor) => {
    console.log('Content was updated:', content);
    // setContent(content);
    console.log(content);
  };
  const openNotificationWithIcon = type => {
    notification[type]({
      message: '发表成功',
      // description:
      //   'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
  };
  const handPost = async() =>{
    // POST /blogservice/blog-curd/addTeacher
    const params = {
      "content": couterRef.current.state.value,
      'name': 'kl'
    }
    let res = await http.post(`${demoUrl}/blogservice/blog-curd/addTeacher`,params);
    console.log(res);
    if(res.code === 20000) {
      openNotificationWithIcon('success')
    }
    
  }
  const couterRef = useRef();
		if (props.loginStatus) {
			return (
				<div className='content'>
          <Editor
            apiKey='i24scrj5aegi7posl2kwbygrvkcgywqul11wtqrwoltystrh'
            selecector='editorStateRef'
            init={{
            height: 500,
            width:800,
            language:'zh_CN',
            images_upload_handler: async function (blobInfo, succFun, failFun) {
              let formData = new FormData();
              formData.append('file',blobInfo.blob())
              let res = await http.post(`${uploadUrl}/eduoss/fileoss`,formData)
              console.log(res);
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
            toolbar:
              'undo redo image| formatselect | bold italic backcolor | \
              alignleft aligncenter alignright alignjustify | \
              bullist numlist outdent indent | removeformat | help'
          }}
          onEditorChange={handleEditorChange}
        />
          <Input ref={couterRef} placeholder="Basic usage" />
          <div>
            <Button type="primary" size={16} onClick={handPost}>发表</Button>
            <Link to='/'><Button type="primary" size={16}>返回主页面</Button></Link>
          </div>
        </div>
			)
		}else {
			return <Redirect to='/login'/>
		}
}

const mapState = (state) => ({
	loginStatus: state.getIn(['login', 'login'])
})

export default connect(mapState, null)(Write);
