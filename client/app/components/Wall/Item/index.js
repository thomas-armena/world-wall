import React from 'react';
import { Group, Rect, Text } from 'react-konva';
import WallActions from '../../../actions/WallActions';

export default class Item extends React.Component {

	constructor(props) {
		super(props);
	}

	handleDragEnd(e) {
		WallActions.itemMove(this.props.id, e.target.x(), e.target.y());
	}

	render() {
		return(
			<Group x={this.props.x} y={this.props.y} draggable={true} onDragEnd={(e)=>this.handleDragEnd(e)}>
				{this.props.children}
			</Group>
		);
	}
}

