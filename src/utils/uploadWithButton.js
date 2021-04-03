/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-04-03 18:02:23
 */
import React, { useState ,useRef,useEffect} from 'react';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import {uploadUrl} from '@/utils/utils'
import { PlusOutlined } from '@ant-design/icons';

const Demo = (props) => {
  const [fileList, setFileList] = useState([]);
  const [imageUrl, setImageUrl] = useState(props.imageUrl);
  const inputRef = useRef()
  useEffect(() => {
    props.getImageUrl(imageUrl);
  }, [imageUrl])
  // getImageUrl
  const onChange = ({ fileList: newFileList }) => {
    if(newFileList[0].response?.data.url){
      setImageUrl(newFileList[0].response?.data.url)
      newFileList.pop()
    }
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
    <div style={{display:'flex',alignItems:'center'}}>
      <div>

    <ImgCrop rotate>
      <Upload
        action={`${uploadUrl}/eduoss/fileoss`}
        listType="picture-card"
        fileList={fileList}
        ref={inputRef}
        onChange={onChange}
        onPreview={onPreview}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : <PlusOutlined/>}
      </Upload>
    </ImgCrop>
    </div>
      <div style={{cursor:'pointer'}} onClick={()=>{
        setImageUrl('')
      }}>
        删除
      </div>
      </div>
  );
};

export default Demo
