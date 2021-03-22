/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-03-22 23:36:10
 */
import 'antd/dist/antd.css'
import { connect } from 'react-redux';
import { RecommendWrapper, RecommendItem } from '../style';
function Recommend(props) {
  let list = [{
      id: 1,
      title: '新闻网站',
      color: 'rgb(183,211,236)',
      target: 'http://www.xinhuanet.com/'
    },
    {
      id: 2,
      title: '大牛博客',
      color: 'rgb(255,184,79)',
      target: 'http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html',
    },
    {
      id: 3,
      title: '优选连载',
      color: 'rgb(244,244,189)',
      target: 'https://www.jianshu.com/mobile/books?category_id=284',
    },
    {
      id: 4,
      title: '菜鸟工具',
      color: 'rgb(193,228,222)',
      target: 'https://c.runoob.com/',
    }
  ]
  return (
    <div>
     	<RecommendWrapper>
				{
					list.map((item) => {
						return <RecommendItem color={item.color} key={item.id}>
              <div className='title' onClick={()=>{window.open(item.target)}}>
                {item.title}
                <i className="iconfont">&#xe637;</i>
              </div>
            </RecommendItem>
					})
				}
			</RecommendWrapper>
    </div>
  );
}
const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, null)(Recommend);
