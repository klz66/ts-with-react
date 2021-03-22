/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-03-22 23:56:21
 */
import 'antd/dist/antd.css'
import { List, Avatar } from 'antd';
const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];

function Write(props) {
  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between'}}><span>推荐作者</span><span>换一批</span></div>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              title={<a href="https://ant.design">{item.title}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </List.Item>
        )}
      />
    </div>
  );
}

export default Write;
