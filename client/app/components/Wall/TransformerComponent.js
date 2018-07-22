import React from 'react';
import { Circle, Group, Layer,  Rect } from 'react-konva';
import WallStore from '../../stores/WallStore';
import WallActions from '../../actions/WallActions';

const padding = 10;

export default class TransformerComponent extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			selectedId: null,
			visible: true,
		};	
		this.xRef = 0;
		this.yRef = 0;
		this.wRef = 0;
		this.yRef = 0;
	}

	componentDidMount(){
		WallStore.on('UPDATE', ()=>this.updateCallback());
		WallStore.on('MOUNTED', ()=>this.mountedCallback());
		WallStore.on('TRANSFORM_START', ()=>this.tstartCallback());
		WallStore.on('TRANSFORM_END', ()=>this.tendCallback());
	}

	componentWillUnmount(){
		WallStore.removeListener('UPDATE', ()=>this.updateCallback());
		WallStore.removeListener('MOUNTED', ()=>this.mountedCallback());
	}

	updateCallback(){
		this.setState({ selectedId: WallStore.getSelectedId() });
	}

	mountedCallback(){
		this.setState({ selectedId: WallStore.getSelectedId() });
	}

	tstartCallback(){
		this.setState({ visible: false });
	}

	tendCallback(){
		this.setState({ visible: true });
	}

	updateRef(){
		var node = null;
		if (this.refs.layer != null && this.state.visible){
			var stage = this.refs.layer.getStage();
			var node = stage.findOne('.item'+this.state.selectedId);
		}
		if (node != null){
			//window.alert(node.y());
			this.xRef = node.x();
			this.yRef = node.y();
			this.wRef = node.width();
			this.hRef = node.height();
		}

	}
	transform(e, circle){
		console.log(e)
		var node = null;
		if (this.refs.layer != null && this.state.visible){
			var stage = this.refs.layer.getStage();
			var node = stage.findOne('.item'+this.state.selectedId);
		}
		if (node != null){
			const xx = stage.getPointerPosition().x / WallStore.scale - stage.x() / WallStore.scale; 
			const yy = stage.getPointerPosition().y / WallStore.scale - stage.y() / WallStore.scale;
			switch(circle){
				case 'topleft':
					node.x(xx + padding);
					node.y(yy + padding);
					node.width(this. wRef - (xx - this.xRef) - padding);
					node.height(this.hRef - (yy - this.yRef) - (padding));
					break;
				case 'topright':
					node.y(yy + padding);
					node.width(xx - this.xRef - padding);
					node.height(this.hRef - (yy - this.yRef) - (padding));
					break;
				case 'bottomleft':
					node.x(xx+ (padding));
					node.width(this.wRef - (xx - this.xRef) - padding);
					node.height((yy - this.yRef) - (padding));
					break;
				case 'bottomright':
					node.width(e.target.x() - (padding*2));
					node.height(e.target.y() - (padding*2));
					break;
			}
			stage.batchDraw();
			WallActions.itemMove(
				this.state.selectedId,
				node.x(),
				node.y(),
				node.width(),
				node.height(),
				node.rotation(),
			);
		}
	}

	render() {
		var node = null;
		if (this.refs.layer != null && this.state.visible){
			var stage = this.refs.layer.getStage();
			var node = stage.findOne('.item'+this.state.selectedId);
		}
		if (node != null){
			var transformProps = {
				x : node.x() - padding,	
				y : node.y() - padding,
				width : node.width() + padding * 2,
				height : node.height() + padding * 2,
				rotation : node.rotation(),
			}
			var rectProps = {
				width : transformProps.width,
				height : transformProps.height,
				stroke : 'green',
				strokeWidth : 3,
			}
			var circleProps = {
				fill : 'blue',
				radius : 6, 
				draggable : true,
			}
		} else {
			var transformProps = {
				x : 0,
				y : 0,
				width : 0,
				height : 0,
				rotation : 0,
			}
			var rectProps = {};
			var circleProps = {};
		}
		console.log(transformProps);
		console.log(rectProps);
		return(
			<Group
				ref="layer"
				{ ... transformProps }
			>
				<Rect { ... rectProps } />
				<Circle { ... circleProps }
					x={0}
					y={0}
					ref="topleft"
					onDragMove={(e)=>this.transform(e, 'topleft')}	
					onMouseDown={()=>this.updateRef()}
				/>
				<Circle { ... circleProps }
					x={transformProps.width}
					y={0}
					ref="topright"
					onDragMove={(e)=>this.transform(e, 'topright')}	
					onMouseDown={()=>this.updateRef()}
				/>
				<Circle { ... circleProps }
					x={0}
					y={transformProps.height}
					ref="bottomleft"
					onDragMove={(e)=>this.transform(e, 'bottomleft')}	
					onMouseDown={()=>this.updateRef()}
				/>
				<Circle { ... circleProps }
					x={transformProps.width}
					y={transformProps.height}
					ref="bottomright"
					onDragMove={(e)=>this.transform(e, 'bottomright')}	
				/>
					
			</Group>
		);
	}
}
