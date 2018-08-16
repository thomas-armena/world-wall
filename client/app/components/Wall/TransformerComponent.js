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
		console.log('update');
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

			/*
			const xx = stage.getPointerPosition().x / WallStore.scale - stage.x() / WallStore.scale;
			const yy = stage.getPointerPosition().y / WallStore.scale - stage.y() / WallStore.scale;

      const angle = node.rotation() * Math.PI / 180;
      const dx = xx - this.xClickRef;
      const dy = yy - this.yClickRef;

      const dxx = dx*Math.cos(angle) + dy*Math.sin(Math.PI - angle);
      const dyy = - (dx*Math.sin(angle) + dy*Math.cos(Math.PI - angle));
			const ww = node.width()*Math.cos(angle) + node.height()*Math.sin(Math.PI - angle);
      const hh = - node.width()*Math.sin(angle) + node.height()*Math.cos(Math.PI - angle);

			switch(circle){
				case 'topleft':
					const ww = (this.wRef - dxx)*Math.cos(angle);
					const hh = - (this.hRef - dyy)*Math.cos(Math.PI - angle);
					node.width(this.wRef - dxx);
					node.height(this.hRef - dyy);
					node.x(xx + ww/2);
					node.y(yy + hh/2);
					break;
				case 'topright':
          node.x(this.xRef - dyy*Math.sin(Math.PI - angle));
					node.y(this.yRef - dyy*Math.cos(Math.PI - angle));
					node.width(dxx);
					node.height(this.hRef - dyy);
					break;
				case 'bottomleft':
					node.x(this.xRef + dxx*Math.cos(angle));
                    node.y(this.yRef + dxx*Math.sin(angle));
					node.width(this.wRef - dxx);
					node.height(dyy);
					break;
				case 'bottomright':
					node.width(e.target.x());
					node.height(e.target.y());
					break;
			}
			*/
			const xx = stage.getPointerPosition().x / WallStore.scale - stage.x() / WallStore.scale;
			const yy = stage.getPointerPosition().y / WallStore.scale - stage.y() / WallStore.scale;
			const angle = node.rotation() * Math.PI / 180;
			const dx = xx - this.xClickRef;
			const dy = yy - this.yClickRef;



			const d = Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));

			console.log(this.xClickRef + ' -> ' + xx);
			console.log(d);

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


			/*
			const xOffset = newWidth/2 * Math.cos(angle);
			const yOffset = newHeight/2 * Math.cos(angle);

			console.log(theta)
			//console.log('d '+d);
			console.log('w '+this.wRef+ ' -> '+ newWidth);
			console.log('h '+this.hRef+ ' -> '+ newHeight);



			let x1 = node.x()-xOffset;
			let y1 = node.y()-yOffset;

			let x2 = node.x()+xOffset;
			let y2 = node.y()-yOffset;

			let x3 = node.x()-xOffset;
			let y3 = node.y()+yOffset;

			let x4 = node.x()+xOffset;
			let y4 = node.y()+yOffset;

			switch(circle){
				case 'topleft':
					x1 = xx;
					y1 = yy;

					x2 = x1 + newWidth*Math.cos(angle);
					y2 = y1 + newHeight*Math.sin(angle);

					x3 = x1 - newWidth*Math.sin(angle);
					y3 = y1 + newHeight*Math.cos(angle);
					break;
				case 'topright':
					x2 = xx;
					y2 = yy;

					y1 = yy;
					x4 = xx;
					break;
				case 'bottomleft':
					x3 = xx;
					y3 = yy;

					x1 = xx;
					y4 = yy;
					break;
				case 'bottomright':
					x4 = xx;
					y4 = yy;

					y3 = yy;
					x2 = xx;
					break;
			}

			//node.width(x2 - x1);
			//node.height()


			console.log('------')
			console.log(x1 + ' ' + x2);
			console.log(x4 + ' ' + x3);
			console.log('------')

			console.log(angle);

			node.x( x1 );
			node.y( y1 );
			node.width( newWidth );
			node.height( newHeight );
			*/

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
				offsetX : node.width()/2,
				offsetY : node.height()/2,
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
		);
	}
}
