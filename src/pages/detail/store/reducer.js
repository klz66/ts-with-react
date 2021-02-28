import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
	title: 'meinv',
	content: '<img src="https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3638833909,3878332730&fm=26&gp=0.jpg" />'
});

export default (state = defaultState, action) => {
	switch(action.type) {
		case constants.CHANGE_DETAIL:
			return state.merge({
				title: action.title,
				content: action.content
			})
		default:
			return state;
	}
}
