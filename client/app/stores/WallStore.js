import ActionTypes from '../constants';
import Dispatcher from '../dispatcher';
import EventEmitter from 'events';

class WallStore extends EventEmitter {
	
	constructor() {
		super();
		Dispatcher.register(this.registerToAction.bind(this));
		this.items = {};	
		this.nextId = 0;
	}

	registerToAction(action) {
		switch(action.actionType){
			case ActionTypes.ITEM_ADD:
				this.addItem(action.payload);
				break;
			case ActionTypes.ITEM_REMOVE:
				this.removeItem(action.payload);
				break;
			case ActionTypes.ITEM_MOVE:
				this.moveItem(action.payload);
				break;
		}
	}

	addItem(item){
		//window.alert('add item');
		this.items[this.nextId.toString()] = item;
		this.items[this.nextId.toString()].id = this.nextId
		this.nextId++;
		this.emit('UPDATE');
	}

	_removeItem(index){
		window.alert('rm item');
		//place remove logic here
		this.emit('UPDATE');
	}

	_moveItem(id, x, y){
		window.alert('mv item');
		//place move logic here
		this.emit('UPDATE');
	}

	getItems(){
		return this.items;
	}

	

}

export default new WallStore();
