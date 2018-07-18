import ActionTypes from '../constants';
import Dispatcher from '../dispatcher';
import EventEmitter from 'events';


class UserStore extends EventEmitter{
	
	constructor() {
		super();
		Dispatcher.register(this.registerToActions.bind(this));
		this.current_user = null;
	}

	registerToActions(action) {
		switch(action.actionType){
			case ActionTypes.USER_LOGIN:
				this.setUser(action.payload);
				break;
			case ActionTypes.USER_LOGOUT:
				this.removeUser();
				break;
		}
	}

	setUser(user){
		this.current_user = user;
		this.emit('CHANGE');
	}

	removeUser(){
		this.current_user = null;
		this.emit('CHANGE');
	}

	getUser() {
		return this.current_user;
	}

}

export default new UserStore();
