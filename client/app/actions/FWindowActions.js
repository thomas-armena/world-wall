import Dispatcher from '../dispatcher';
import ActionTypes from '../constants';
import React from 'react';

class FWindowActions {
    fWindowShow(){
        Dispatcher.dispatch({
            actionType: ActionTypes.FWINDOW_SHOW,
        });
    }

    fWindowHide(){
        Dispatcher.dispatch({
            actionType: ActionTypes.FWINDOW_HIDE,
        });
    }

    fWindowContent(content){
        Dispatcher.dispatch({
            actionType: ActionTypes.FWINDOW_CONTENT,
            payload: content,
        });
    }
}

export default new FWindowActions();
