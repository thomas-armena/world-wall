import React from 'react';
import '../styles.scss';
import WallActions from '../../actions/WallActions';
import WallStore from '../../stores/WallStore';
import ImageSVG from '../../assets/Image_Icon.svg';
import SVGInline from "react-svg-inline";


export default class ImageSelector extends React.Component {

	constructor(props){
		super(props);
		this.state={visible: true}
		this.handleDragStart = this.handleDragStart.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
	}

	componentDidMount(){
		WallStore.on('DRAGSTART', this.handleDragStart);
		WallStore.on('UPDATE', this.handleUpdate);
	}

	componentWillUnmount(){
		WallStore.removeListener('DRAGSTART', this.handleDragStart);
		WallStore.removeListener('UPDATE', this.handleUpdate);

	}

	handleDragStart(){
		this.setState({visible:false});
	}

	handleUpdate(){
		this.setState({visible: true});
	}

	handleMouseUp() {
		WallActions.itemAdd({
			itemType: 'IMAGE_BOX',
			x: 400,
			y: 150,
			width: 100,
			height: 100,
			rotation: 0,
			src: '',
			serverSrc: '',
		});
	}

	handleMouseDown(e) {
		e.preventDefault();
		WallStore.dragStartX = e.clientX;
		WallStore.dragStartY = e.clientY;
		WallActions.itemDragStart({
			itemType: 'IMAGE_BOX',
			x: 400,
			y: 150,
			width: 100,
			height: 100,
			rotation: 0,
			src: '',
			serverSrc: '',
		});
	}

	render(){
		return(
			<div className="selector" onMouseUp={this.handleMouseUp}
				onMouseDown={(e)=>this.handleMouseDown(e)}
			>
				<SVGInline id='1' svg={ImageSVG} width='100' height='100'
					style={{display: this.state.visible ? 'block' : 'none'}}
				/>
			</div>

		);
	}

}
