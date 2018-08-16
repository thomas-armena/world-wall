import React from 'react';
import { Group, Rect, Text, Transformer } from 'react-konva';
import WallActions from '../../../actions/WallActions';
import WallStore from '../../../stores/WallStore';

export default class Item extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			opacity: 1,
		}
	}

	componentDidMount() {
		WallStore.emit('MOUNTED');
	}

	updateTransform(e) {
		WallActions.itemMove(this.props.id, e.target.x(), e.target.y(), e.target.width(), e.target.height(), e.target.rotation());
	}

	select() {
		WallActions.itemClick(this.props.id);
	}

	handleDragStart(e) {
		this.select();
		WallStore.emit('TRANSFORM_START');
		this.setState({ opacity: 0.5 });
	}

	handleDragEnd(e) {
		this.updateTransform(e);
		WallStore.emit('TRANSFORM_END');
		this.setState({ opacity: 1 });
	}


	render() {
		return(
			<Group x={this.props.x}
				y={this.props.y}
				width={this.props.width}
				height={this.props.height}
				offsetX={this.props.width/2}
				offsetY={this.props.height/2}
				rotation={this.props.rotation}
				draggable={this.props.edit}
				onDragEnd={(e)=>this.handleDragEnd(e)}
				onClick={()=>this.select()}
				onDragStart={(e)=>this.handleDragStart(e)}
				name={'item'+this.props.id}
				ref="group"
				opacity={this.state.opacity}
			>
				{this.props.children}
			</Group>
		);
	}
}
