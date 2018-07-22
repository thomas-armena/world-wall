import ActionTypes from '../constants';
import Dispatcher from '../dispatcher';
import EventEmitter from 'events';

class WallStore extends EventEmitter {
	
	constructor() {
		super();
		Dispatcher.register(this.registerToAction.bind(this));
		this.items = {};	
		this.nextId = 0;
		this.selectedId = null;
		this.scale = 1;
	}

	registerToAction(action) {
		switch(action.actionType){
			case ActionTypes.ITEM_ADD:
				this.addItem(action.payload);
				this.selectItem(this.nextId-1);
				break;
			case ActionTypes.ITEM_REMOVE:
				this.removeItem(action.payload);
				break;
			case ActionTypes.ITEM_MOVE:
				this.moveItem(action.payload.id, 
					action.payload.x, 
					action.payload.y,
					action.payload.width,
					action.payload.height,
					action.payload.rotation);
				break;
			case ActionTypes.ITEM_CLICK:
				this.selectItem(action.payload);
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

	moveItem(id, x, y, width, height, rotation){
		this.items["item_"+id].x = x;
		this.items["item_"+id].y = y;
		this.items["item_"+id].width = width;
		this.items["item_"+id].height = height;
		this.items["item_"+id].rotation = rotation;
		this.emit('UPDATE');
	}

	selectItem(id){
		this.selectedId = id;
		this.emit('UPDATE');
	}

	getItems(){
		return this.items;
	}

	getSelectedId(){
		return this.selectedId;
	}
	

}

export default new WallStore();
