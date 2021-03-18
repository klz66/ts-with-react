/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-03-18 16:28:10
 */

import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

class App extends React.Component {
  handleEditorChange = (e) => {
    console.log(
      'Content was updated:',
      e
    );
  }

  render() {
    return (
       <Editor
        apiKey='i24scrj5aegi7posl2kwbygrvkcgywqul11wtqrwoltystrh'
        selecector='editorStateRef'
        init={{
        height: 500,
        width:800,
        language:'zh_CN',
        images_upload_url: '/demo/upimg.php',
        images_upload_base_path: '/demo',
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
          onEditorChange={this.handleEditorChange}
        />
    );
  }
}

export default App;
