import ActionTypes from '../constants';
import Dispatcher from '../dispatcher';

let current_user = null;

class UserStore {
	
	constructor() {
		Dispatcher.register(this.registerToActions.bind(this));
	}

	registerToActions(action) {
		switch(action.actionType){
			case ActionTypes.USER_LOGIN:
				this.setUser(action.payload);
			break;
		}
	}

	setUser(user){
		window.alert('Logged in');
		current_user = user;
	}

}

export default new UserStore();
