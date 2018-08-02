import Dispatcher from '../dispatcher';
import ActionTypes from '../constants';

class UserActions {
    
    userLogin(user) {
        Dispatcher.dispatch({
            actionType: ActionTypes.USER_LOGIN,
            payload: user
        });
    }

    userLogout() {
        Dispatcher.dispatch({
            actionType: ActionTypes.USER_LOGOUT,
            payload: null,
        });
    }
}

export default new UserActions();

