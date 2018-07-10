import React from 'react';
import './Wall/wall.css';
import { Stage, Layer, Rect, Text } from 'react-konva';
import Konva from 'konva';
import TextBox from './Wall/TextBox';

export default class Wall extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			mouseOverStage: false,
			scale: 1
		};
	}

	componentWillMount() {
		window.addEventListener("wheel", (e)=>this.zoomStage(e));
	}

	componentWillUnmount() {
		window.removeEventListener("wheel", (e)=>this.zoomStage(e));
	}

	zoomStage(e) {
		if(this.state.mouseOverStage == true){
			var scaleBy = 1 + Math.abs(Math.min(e.deltaY, 100)) / 90;
			var stageInst = this.refs.stage.getStage();
			e.preventDefault();
		    	var oldScale = stageInst.scaleX();

		    	var mousePointTo = {
			x: stageInst.getPointerPosition().x / oldScale - stageInst.x() / oldScale,
			y: stageInst.getPointerPosition().y / oldScale - stageInst.y() / oldScale,
		    	};
		    	var newScale = e.deltaY > 0 ? Math.min(oldScale * scaleBy, 4) : Math.max(oldScale / scaleBy, 0.1);
		    	stageInst.scale({ x: newScale, y: newScale });

		    	var newPos = {
				x: -(mousePointTo.x - stageInst.getPointerPosition().x / newScale) * newScale,
				y: -(mousePointTo.y - stageInst.getPointerPosition().y / newScale) * newScale
            		};
			console.log(e.deltaY);
            		stageInst.position(newPos);
            		stageInst.batchDraw();
		}
	}

	render(){
		return (
			<div className="wall" 
				onMouseOver={()=>{this.setState({mouseOverStage: true})}}
				onMouseOut={()=>{this.setState({mouseOverStage: false})}}
			>
				<Stage width={window.innerWidth} 
					height={window.innerHeight} 
					draggable={true}
					ref="stage"
				>
					<Layer>
						<TextBox text="Hello World" x={300} y={300} />
						<TextBox text="FUCK BITCHEZZZ" x={500} y={300} />
					</Layer>
				</Stage>
			</div>
		);
	}
}
