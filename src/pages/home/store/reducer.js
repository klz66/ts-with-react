/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-02-21 10:57:28
 */
import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
	topicList: [],
	articleList: [],
	recommendList: [],
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
  console.log(action);
	switch(action.type) {
    case constants.CHANGE_HOME_DATA:
      // return state.set('topicList',action.topicList).set('articleList',action.articleList).set('recommendList',action.recommendList)
		  return state.merge({
        topicList: fromJS(action.topicList),
        articleList: fromJS(action.articleList),
        recommendList: fromJS(action.recommendList)
      })
      default:
			return state;
	}
}
