/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-03-28 20:05:14
 */

import tinyMce from 'tinymce/tinymce';
import 'tinymce/themes/silver/theme'//编辑器主题
import 'tinymce/icons/default';
import 'tinymce/plugins/advlist'  //高级列表
import 'tinymce/plugins/autolink'  //自动链接
import 'tinymce/plugins/link'  //超链接
import 'tinymce/plugins/lists' //列表插件
import 'tinymce/plugins/charmap'  //特殊字符
import 'tinymce/plugins/media' //插入编辑媒体
import 'tinymce/plugins/wordcount'// 字数统计
import { Editor } from '@tinymce/tinymce-react';
import zh_CN from '../../assets//tinymce/zh_CN';
import 'tinymce/skins/ui/oxide/skin.min.css'
import 'tinymce/skins/ui/oxide/content.inline.min.css'
 
 <Editor
              initialValue={editorHtml}
              init={{
                height: '100%',
                menubar: false,
                language_url: zh_CN,
                language: 'zh_CN',
                content_css: false,
                // skin_url: '/tinymce/skins/ui/oxide',
                plugins:'advlist autolink link  lists charmap  media wordcount',
                toolbar:
                  'undo redo | formatselect | bold italic backcolor | \
                   alignleft aligncenter alignright alignjustify | \
                   bullist numlist outdent indent | removeformat',
              }}
              onEditorChange={handleEditorChange}
              onBlur={editorBlur}
            />
