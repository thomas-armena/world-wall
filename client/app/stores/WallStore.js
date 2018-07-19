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
				this.moveItem(action.payload.id, action.payload.x, action.payload.y);
				break;
		}
	}

	addItem(item){
		//window.alert('add item');
		this.items["item_"+this.nextId] = item;
		this.items["item_"+this.nextId].id = this.nextId
		this.nextId++;
		this.emit('UPDATE');
	}

	removeItem(index){
		window.alert('rm item');
		//place remove logic here
		this.emit('UPDATE');
	}

	moveItem(id, x, y){
		this.items["item_"+id].x = x;
		this.items["item_"+id].y = y;
		this.emit('UPDATE');
	}

	getItems(){
		return this.items;
	}

	

}

export default new WallStore();
