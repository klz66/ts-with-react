/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-02-20 16:27:19
 */
import { fromJS } from 'immutable';
// import * as constants from './constants';

const defaultState = fromJS({
	topicList: [
    {
      id: 1,
      title: '社会热点',
      imgUrl: 'https://browser9.qhimg.com/bdm/1000_618_80/t019fd908f724f51900.jpg'
    },
    {
      id: 2,
      title: '后仰跳投',
      imgUrl: 'https://browser9.qhimg.com/bdm/1000_618_80/t01b85e62ab512342e5.jpg'
    }
  ],
	articleList: [
    {
      id: 1,
      title: '母猪上树',
      desc: '震惊！！！',
      imgUrl: 'https://browser9.qhimg.com/bdm/1000_618_80/t019fd908f724f51900.jpg'
    },
    {
      id: 1,
      title: '窝窝头',
      desc: '一块钱8个',
      imgUrl: 'https://browser9.qhimg.com/bdm/1000_618_80/t019fd908f724f51900.jpg'
    },
  ],
	recommendList: [
    {
      id: 1,
      title: '前端必备',
      color: '#AEDD81'
    },
    {
      id: 2,
      title: '好书推荐',
      color: '#00CCFF'
    },
  ],
	articlePage: 1,
	showScroll: false
});

// const changeHomeData = (state, action) => {
// 	return state.merge({
// 		topicList: fromJS(action.topicList),
// 		articleList: fromJS(action.articleList),
// 		recommendList: fromJS(action.recommendList)
// 	});
// };

// const addArticleList = (state, action) => {
// 	return state.merge({
// 		'articleList': state.get('articleList').concat(action.list),
// 		'articlePage': action.nextPage
// 	});
// };

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState, action) => {
	switch(action.type) {
		default:
			return state;
	}
}
