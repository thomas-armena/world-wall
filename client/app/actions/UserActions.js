import Dispatcher from '../dispatcher';
import ActionTypes from '../constants';

class UserActions {
	
	userLogin(user) {
		window.alert('dispatched');
		Dispatcher.dispatch({
			actionType: ActionTypes.USER_LOGIN,
			payload: user
		});
	}
}

export default new UserActions();

