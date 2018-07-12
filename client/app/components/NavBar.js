import React from 'react';
import './NavBar/NavBar.css';

export default class NavBar extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div className="nav-bar">
				{this.props.children}
			</div>
		);
	}	

}
