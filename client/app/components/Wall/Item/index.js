import React from 'react';
import { Group, Rect, Text } from 'react-konva';

export default class Item extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			x: this.props.x,
			y: this.props.y,
			width: 100,
			height: 100,
		};
	}

	handleDragEnd(e) {
		this.setState({
			x: e.target.x,
			y: e.target.y,
		});
	}

	render() {
		return(
			<Group draggable={true} onDragEnd={this.handleDragEnd}>
				{props.children}
				{"x: " + this.state.x}
				{"y: " + this.state.y}
			</Group>
		);
	}
}

