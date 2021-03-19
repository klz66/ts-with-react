/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-03-19 17:15:54
 */
import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
	topicList: [],
	articleList: [],
	recommendList: [],
});

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState, action) => {
  console.log(action);
	switch(action.type) {
    case constants.CHANGE_HOME_DATA:
        return state.merge({
        topicList: fromJS(action.topicList),
        // articleList: fromJS(action.articleList),
        recommendList: fromJS(action.recommendList)
      })
    case constants.GET_MORE_ARTICLE_LIST:
        return state.merge({
        articleList: state.get('articleList').concat(action.articleList),
      })
    case constants.ARTICLE_LIST:
        return state.merge({
        articleList: action.articleList,
      })
      default:
			return state;
	}
}
