import React from 'react';
import './Wall/wall.css';
import { Stage, Layer, Rect, Text } from 'react-konva';
import Konva from 'konva';
import TextBox from './Wall/TextBox';

export default class Wall extends React.Component {
	
	render(){
		return (
			<div className="wall">
				<Stage width={window.innerWidth} height={window.innerHeight} draggable={true} >
					<Layer>
						<TextBox text="Hello World" x={300} y={300} />
						<TextBox text="FUCK BITCHEZZZ" x={500} y={300} />
					</Layer>
				</Stage>
			</div>
		);
	}
}
