import React from 'react';
import '../styles.scss';
import WallActions from '../../actions/WallActions';

export default class Selector extends React.Component {

	handleClick() {
		WallActions.itemAdd({
			itemType: 'TEXT_BOX',
			x: 400,
			y: 150,
			width: 100,
			height: 100,
			rotation: 0,
			text: "HELLO WORLD"
		});
	}

	render(){
		return(
			<div className="selector" onClick={this.handleClick} ></div>

		);
	}

}
