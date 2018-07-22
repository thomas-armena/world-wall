import React from 'react';
import './wall.css';
import { Stage, Layer, Rect, Text } from 'react-konva';
import Konva from 'konva';
import WallActions from '../../actions/WallActions';
import WallStore from '../../stores/WallStore';
import Item from './Item';
import TextBox from './Item/TextBox';
import TransformerComponent from './TransformerComponent';

export default class Wall extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			stageHeight: 100,
			stageWidth: 100,
			scale: 1,
			canDrag: true,
			items: {},
			selectedId: null,
		};
		this.mouseOverStage = false;
	}

	componentDidMount() {
		this.updateSize()
		window.addEventListener("resize", ()=>this.updateSize());
		WallStore.on('UPDATE', ()=>this.onUpdate());
		WallStore.emit('UPDATE');
	}

	componentWillMount() {
		window.addEventListener("wheel", (e)=>this.zoomStage(e));
	}

	componentWillUnmount() {
		window.removeEventListener("wheel", (e)=>this.zoomStage(e));
		window.removeEventListener("resize", ()=>this.updateSize());
		WallStore.removeListener('UPDATE', ()=>this.onUpdate());
	}

	onUpdate() {
		this.setState({ items: WallStore.getItems() , selectedId: WallStore.getSelectedId() });	
	}

	updateSize() {		
		var container = document.getElementById('wall');
		const width = window.innerWidth;
		const height = window.innerHeight-30;
		console.log(width);
		this.setState( { stageWidth: width, stageHeight: height });
	}


	zoomStage(e) {
		if(this.mouseOverStage == true){
			var scaleBy = 1 + Math.abs(Math.min(e.deltaY, 100)) / 90;
			var stageInst = this.refs.stage.getStage();
			e.preventDefault();
		    	var oldScale = stageInst.scaleX();

		    	var mousePointTo = {
			x: stageInst.getPointerPosition().x / oldScale - stageInst.x() / oldScale,
			y: stageInst.getPointerPosition().y / oldScale - stageInst.y() / oldScale,
		    	};
		    	var newScale = e.deltaY > 0 ? Math.min(oldScale * scaleBy, 4) : Math.max(oldScale / scaleBy, 0.1);
			WallStore.scale = newScale;
		    	stageInst.scale({ x: newScale, y: newScale });

		    	var newPos = {
				x: -(mousePointTo.x - stageInst.getPointerPosition().x / newScale) * newScale,
				y: -(mousePointTo.y - stageInst.getPointerPosition().y / newScale) * newScale
            		};
            		stageInst.position(newPos);
            		stageInst.batchDraw();
		}
	}

	handleClick(e) {

		if(e.target == this.refs.stage.getStage())
			WallActions.itemClick(null);

	}


	render(){	
		console.log(this.state.items);
		//console.log(this.state.selectedId);		
		let itemsJSX = [];
		for (var i in this.state.items){
			const itemData = this.state.items[i];
			let item = null;
			switch(itemData.itemType){
				case 'TEXT_BOX':
					item = <TextBox 
						id = {itemData.id}
						text = {itemData.text}
						x = {itemData.x}
						y = {itemData.y}
						width = {itemData.width}
						height = {itemData.height}
						rotation = {itemData.rotation}
						/>
					break;
			}
			itemsJSX.push(item);
		}
		return (
			<div id="wall" 
				onMouseOver={()=>{this.mouseOverStage = true}}
				onMouseOut={()=>{this.mouseOverStage = false}}
			>
				<Stage width={this.state.stageWidth} 
					height={this.state.stageHeight} 
					draggable={this.state.canDrag}
					ref="stage"
					onClick={(e)=>this.handleClick(e)}
				>
					<Layer>
						<TransformerComponent />
						{itemsJSX}
					</Layer>
				</Stage>
			</div>
		);
	}
}
