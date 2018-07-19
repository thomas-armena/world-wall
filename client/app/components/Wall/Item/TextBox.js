import React from 'react';
import Item from './index';

export default class TextBox extends React.Component {
	constructor(props){
		super(props);
		
	}

	render() {
		return(
			<Item>
				<Rect
					x={this.state.x}
					y={this.state.y}
					width={200}
					height={200}
					fill='red'
				/>
				<Text
					x={this.state.x}
					y={this.state.y}
					text={this.state.text}
				/>
			</Item>
		);
	}
}
