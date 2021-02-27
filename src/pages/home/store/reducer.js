/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-02-24 11:31:52
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
    case constants.ADD_ARTICLE_LIST:
      return state.merge({
        articlePage: action.nextPage,
        articleList: state.get('articleList').concat(action.articleList)
      })
    case constants.TOGGLE_SCROLL_TOP:
      return state.set('showScroll',action.showScroll)
      default:
			return state;
	}
}
