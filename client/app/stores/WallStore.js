import ActionTypes from '../constants';
import Dispatcher from '../dispatcher';
import EventEmitter from 'events';
import axios from 'axios';

class WallStore extends EventEmitter {

	constructor() {
		super();
		Dispatcher.register(this.registerToAction.bind(this));
		this.items = {title: 'New Wall', nextId: 0,};
        this.loadedItems = [];
		this.storedItem = {};
		this.selectedId = null;
		this.scale = 1;
		this.dragStartX = 0;
		this.dragStartY = 0;
		this.x = 0;
		this.y = 0;
	}

	registerToAction(action) {
		switch(action.actionType){
			case ActionTypes.ITEM_ADD:
				this._addItem(action.payload);
				this._selectItem(this.items.nextId-1);
				break;
			case ActionTypes.ITEM_DRAG_START:
				this._storeItem(action.payload);
				break;
			case ActionTypes.ITEM_REMOVE:
				this._removeItem(action.payload);
				break;
			case ActionTypes.ITEM_MOVE:
				this._moveItem(action.payload.id,
				action.payload.x,
				action.payload.y,
				action.payload.width,
				action.payload.height,
				action.payload.rotation);
				break;
			case ActionTypes.ITEM_CLICK:
				this._selectItem(action.payload);
                break;
		    case ActionTypes.WALL_LOAD:
		        this._loadWall(action.payload);
		        this._selectItem(null);
		        break;
		    case ActionTypes.WALL_RENAME:
		        this._renameWall(action.payload);
          		break;

		}
	}

	_addItem(item){
		//window.alert('add item');
		this.items["item_"+this.items.nextId] = item;
		this.items["item_"+this.items.nextId].id = this.items.nextId
		this.items.nextId++;
		this.emit('UPDATE');
		console.log('ADDITEM')
	}

	_storeItem(item){
		this.storedItem = item;
		this.emit('DRAGSTART');
	}

	_removeItem(index){
		window.alert('rm item');
		//place remove logic here
		this.emit('UPDATE');
		console.log('REMOVEITEM')
	}

	_moveItem(id, x, y, width, height, rotation){
		this.items["item_"+id].x = x;
		this.items["item_"+id].y = y;
		this.items["item_"+id].width = width;
		this.items["item_"+id].height = height;
		this.items["item_"+id].rotation = rotation;
		this.emit('UPDATE');
		console.log('MOVEITEM')
	}


	_selectItem(id){
		this.selectedId = id;
		this.emit('UPDATE');
		console.log('SELECT')
	}

	_loadWall(loadData){
	  this.items = loadData;
	  axios.defaults.withCredentials = true;

	  //For each image item, retrieve the image from the server
	  for(let key in this.items){
		  if (this.items[key]['serverSrc']){ //check if the item has a server source
			  axios.post(process.env.IMAGE_GET,{src:this.items[key]['serverSrc']},{responseType:'arraybuffer'})
			  	.then(response => {
					console.log(response);
				    const arrayBufferView = new Uint8Array( response.data );
				    const blob = new Blob( [ arrayBufferView ], { type: "image/png" } );
				    const urlCreator = window.URL || window.webkitURL;
				    const imageUrl = urlCreator.createObjectURL( blob );

					let image = new window.Image();
			        image.src = imageUrl;
			        image.onload = () => {
						console.log(image)
			            this.items[key].src = image;
			            this.emit('UPDATE');
			        }
				})
		  }
	  }
	  //axios.get('/imageupload',{src: })

	  this.emit('UPDATE');
	  console.log('LOAD')
	}

	_renameWall(name){
	  this.items.title = name;
	  this.emit('UPDATE');
	  console.log('RENAME')
	}

	getItems(){
		return this.items;
	}

	getScale(){
		return this.scale;
	}

	getX() {
		return this.x;
	}

	getY() {
		return this.y;
	}

	getSelectedId(){
		return this.selectedId;
	}

	setLoadData(loadedItems){
	  this.loadedItems = loadedItems;
	  this.emit('DATA_LOADED');
	}

	getLoadData(){
	  return this.loadedItems;
	}

	getStoredItem(){
		return this.storedItem;
	}

}

export default new WallStore();
