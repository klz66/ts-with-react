import React, { useState ,useRef} from 'react';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import {url} from '@/utils/utils'

const Demo = () => {
  const [fileList, setFileList] = useState([
  ]);
  const inputRef = useRef()
  const handSum = () => {
    console.log(inputRef.current.fileList[0].response.data);
    console.log(fileList);
  }

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    console.log(fileList);
  };

  const onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  return (
    <div>
    <ImgCrop rotate>
      <Upload
        action={`${url}/eduoss/fileoss`}
        listType="picture-card"
        fileList={fileList}
        ref={inputRef}
        onChange={onChange}
        onPreview={onPreview}
      >
        {fileList.length < 1 && '+ Upload'}
      </Upload>
    
    </ImgCrop>
      <span onClick={()=>handSum()}>提交
      </span>
      </div>
  );
};

export default Demo
