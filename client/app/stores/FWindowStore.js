import React from 'react';
import ActionTypes from '../constants';
import Dispatcher from '../dispatcher';
import EventEmitter from 'events';

class FWindowStore extends EventEmitter {
    
    constructor(){
        super();
		Dispatcher.register(this.registerToAction.bind(this));
        this.content = <div/>;
        this.show = false;
    }

    registerToAction(action){
        switch(action.actionType){
            case ActionTypes.FWINDOW_SHOW:
                this.showWindow();
                break;
            case ActionTypes.FWINDOW_HIDE:
                this.hideWindow();
                break;
            case ActionTypes.FWINDOW_CONTENT:
                this.setContent(action.payload);
                break;
        }
    }

    showWindow(){
        this.show = true;
        this.emit('FWINDOW_UPDATE');
    }

    hideWindow(){
        this.show = false;
        this.emit('FWINDOW_UPDATE');
    }

    setContent(content){
        this.content = content;
        this.emit('FWINDOW_UPDATE');
        this.emit('FWINDOW_SWITCH');
    }

    isShowing(){
        return this.show;
    }

    getContent(){
        return this.content;
    }

}

export default new FWindowStore();
