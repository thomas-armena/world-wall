import React from 'react';
import '../styles.scss';
import WallActions from '../../actions/WallActions';

export default class ImageSelector extends React.Component {

	handleClick() {
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

	render(){
		return(
			<div className="selector" onClick={this.handleClick} >
				Image
			</div>

		);
	}

}
