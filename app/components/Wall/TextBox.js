import React from 'react';
import { Group, Rect, Text } from 'react-konva';

export default class TextBox extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			text: this.props.text,
			edit: false
		};
	}

	render() {
		return(
			<Group draggable={true}>
				<Rect
					x={this.state.x}
					y={this.state.y}
					width={200}
					height={200}
					fill={Konva.Util.getRandomColor()}
				/>
				<Text
					x={this.state.x}
					y={this.state.y}
					text={this.state.text}
				/>
			</Group>
		);
	}
}

