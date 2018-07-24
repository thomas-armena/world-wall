import React from 'react';
import { Circle, Group, Layer,  Rect } from 'react-konva';
import WallStore from '../../stores/WallStore';
import WallActions from '../../actions/WallActions';

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

	rotate(e){
		var node = null;
		if (this.refs.layer != null && this.state.visible){
			var stage = this.refs.layer.getStage();
			var node = stage.findOne('.item'+this.state.selectedId);
		}
		if (node != null){
			const pivx = this.xRef;
            const pivy = this.yRef;
			const xx = stage.getPointerPosition().x / WallStore.scale - stage.x() / WallStore.scale; 
			const yy = stage.getPointerPosition().y / WallStore.scale - stage.y() / WallStore.scale;
            const dx = pivx - xx;
            const dy = pivy - yy;
            const angle = Math.atan2(-dy,-dx) * 180 / Math.PI;

            node.rotation(angle);
            console.log(angle); 
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
            const angle = node.rotation() * Math.PI / 180;
            const dx = xx - this.xRef;
            const dy = yy - this.yRef;
            const dxx = dx*Math.cos(angle) + dy*Math.sin(Math.PI - angle); 
            const dyy = dx*Math.sin(angle) + dy*Math.cos(Math.PI - angle); 
			switch(circle){
				case 'topleft':
					node.x(xx);
					node.y(yy);
					node.width(this.wRef - dxx);
					node.height(this.hRef + dyy);
					break;
				case 'topright':
                    node.x(this.xRef + dyy*Math.sin(Math.PI - angle));
					node.y(this.yRef + dyy*Math.cos(Math.PI - angle));
					node.width(dxx);
					node.height(this.hRef + dyy);
					break;
				case 'bottomleft':
					node.x(this.xRef + dxx*Math.cos(angle));
                    node.y(this.yRef + dxx*Math.sin(angle));
					node.width(this.wRef - dxx);
					node.height(-dyy);
					break;
				case 'bottomright':
					node.width(e.target.x());
					node.height(e.target.y());
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
            const angle = node.rotation() * Math.PI / 180;
			var transformProps = {
				x : node.x(),
				y : node.y(),
				width : node.width(),
				height : node.height(),
				rotation : node.rotation(),
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
				<Circle { ... circleProps }
					x={transformProps.width + 20}
					y={0}
					ref="rotater"
					onDragMove={(e)=>this.rotate(e)}	
					onMouseDown={()=>this.updateRef()}
				/>
                
					
			</Group>
		);
	}
}
