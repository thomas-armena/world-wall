import React from 'react';
import '../styles.scss';
import WallActions from '../../actions/WallActions';
import WallStore from '../../stores/WallStore';
import SVGInline from "react-svg-inline";


export default class Selector extends React.Component {

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
		WallActions.itemAdd(this.props.item);
	}

	handleMouseDown(e) {
		e.preventDefault();
		WallStore.dragStartX = e.clientX;
		WallStore.dragStartY = e.clientY;
		WallActions.itemDragStart(this.props.item);
	}

	render(){
		return(
			<div className="selector" onMouseUp={this.handleMouseUp}
				onMouseDown={(e)=>this.handleMouseDown(e)}
			>
				<SVGInline id='1' svg={this.props.svg} width='150' height='150'/>
				<div>{this.props.name}</div>
			</div>

		);
	}

}
