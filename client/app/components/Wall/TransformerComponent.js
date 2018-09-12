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
		this.xClickRef = 0;
		this.yClickRef = 0;
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
		WallStore.removeListener('TRANSFORM_START', ()=>this.tstartCallback());
		WallStore.removeListener('TRANSFORM_END', ()=>this.tendCallback());
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

			this.xClickRef = stage.getPointerPosition().x / WallStore.scale - stage.x() / WallStore.scale;
			this.yClickRef = stage.getPointerPosition().y / WallStore.scale - stage.y() / WallStore.scale;
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
		var node = null;
		if (this.refs.layer != null && this.state.visible){
			var stage = this.refs.layer.getStage();
			var node = stage.findOne('.item'+this.state.selectedId);
		}
		if (node != null){
			const xx = stage.getPointerPosition().x / WallStore.scale - stage.x() / WallStore.scale;
			const yy = stage.getPointerPosition().y / WallStore.scale - stage.y() / WallStore.scale;
			const angle = node.rotation() * Math.PI / 180;
			const dx = xx - this.xClickRef;
			const dy = yy - this.yClickRef;
			const d = Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));
			const beta = -Math.atan2(dy,-dx);
			const theta = beta - angle;
			let newX, newY, newWidth, newHeight;
			newX = this.xRef + dx/2;
			newY = this.yRef + dy/2;

			switch(circle){
				case 'topleft':
					newWidth = this.wRef + d*Math.cos(theta);
					newHeight = this.hRef + d*Math.sin(theta);
					break;
				case 'topright':
					newWidth = this.wRef - d*Math.cos(theta);
					newHeight = this.hRef + d*Math.sin(theta);
					break;
				case 'bottomleft':
					newWidth = this.wRef + d*Math.cos(theta);
					newHeight = this.hRef - d*Math.sin(theta);
					break;
				case 'bottomright':
					newWidth = this.wRef - d*Math.cos(theta);
					newHeight = this.hRef - d*Math.sin(theta);
					break;
			}
			node.x(newX);
			node.y(newY);
			node.width(newWidth);
			node.height(newHeight);

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
			const padding = 10;
			var transformProps = {
				x : node.x(),
				y : node.y(),
				width : node.width() + padding*2,
				height : node.height() + padding*2,
				offsetX : (node.width() + padding*2)/2,
				offsetY : (node.height() + padding*2)/2,
				rotation : node.rotation(),
			}
			var circleProps = {
				fill : '#FE4A49',
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
		return(
			<Group>
				<Rect
					stroke='#FE4A49'
					listening={false}
					{ ... transformProps }
				/>
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
						onMouseDown={()=>this.updateRef()}
					/>
					<Circle { ... circleProps }
						x={transformProps.width + 20}
						y={transformProps.height / 2}
						ref="rotater"
						onDragMove={(e)=>this.rotate(e)}
						onMouseDown={()=>this.updateRef()}
					/>
				</Group>
			</Group>
		);
	}
}
