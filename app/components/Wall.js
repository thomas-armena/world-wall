import React from 'react';
import './Wall/wall.css';
import { Stage, Layer, Rect, Text } from 'react-konva';
import Konva from 'konva';

export default class Wall extends React.Component {
	
	render(){
		return (
			<div className="wall">
				<Stage width={window.innerWidth} height={window.innerHeight}>
					<Layer>
						<Rect
							x={300}
							y={300}
							width={100}
							height={100}
							fill={Konva.Util.getRandomColor()}
							shadowBlur={5}
						/>
					</Layer>
				</Stage>
			</div>
		);
	}
}
