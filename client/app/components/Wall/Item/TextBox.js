import React from 'react';
import Item from './index';
import { Rect, Text } from 'react-konva';

export default class TextBox extends React.Component {
	render() {
		return(
			<Item x={this.props.x} 
				y={this.props.y} 
				width={this.props.width}
				height={this.props.height}
				rotation={this.props.rotation}
                edit={this.props.edit}
				id={this.props.id}
			>
				<Rect
					width={this.props.width}
					height={this.props.height}
					fill='red'
				/>
				<Text
					text={this.props.text}
				/>
			</Item>
		);
	}
}
